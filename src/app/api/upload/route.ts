import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

// 配置AWS S3 (缤纷云S4)
const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  region: process.env.AWS_REGION,
  endpoint: 'https://s3.bitiful.net',
  forcePathStyle: true,
});

const bucketName = process.env.AWS_S3_BUCKET_NAME;

// 验证上传参数的schema
const uploadSchema = z.object({
  fileName: z.string().min(1, '文件名不能为空'),
  fileType: z.string().min(1, '文件类型不能为空'),
  fileSize: z.number().positive('文件大小必须大于0').max(10 * 1024 * 1024, '文件大小不能超过10MB'),
});

// 获取预签名URL用于上传
export async function POST(request: NextRequest) {
  try {
    // 验证环境变量
    if (!bucketName || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      console.error('AWS S3 配置缺失');
      return NextResponse.json(
        { success: false, message: '服务器配置错误' },
        { status: 500 }
      );
    }

  
    // 解析请求体
    const body = await request.json();
    const validatedData = uploadSchema.parse(body);

    // 生成唯一的文件名（匿名上传）
    const timestamp = Date.now();
    const fileExtension = validatedData.fileName.split('.').pop();
    const uniqueFileName = `uploads/anonymous/${timestamp}-${Math.random().toString(36).substring(2)}.${fileExtension}`;

    // 生成预签名URL
    const putObjectCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: uniqueFileName,
      ContentType: validatedData.fileType,
      ACL: 'private', // 私有文件
    });

    const uploadUrl = await getSignedUrl(s3Client, putObjectCommand, {
      expiresIn: 300, // 5分钟过期
    });

    // 生成文件访问URL（用于后续下载）
    const fileUrl = `https://${bucketName}.s3.bitiful.net/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      data: {
        uploadUrl,
        fileUrl,
        fileName: uniqueFileName,
        expiresIn: 300,
      },
    });

  } catch (error) {
    console.error('生成上传URL失败:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: '请求参数错误',
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: '服务器内部错误' },
      { status: 500 }
    );
  }
}

// 获取文件下载URL
export async function GET(request: NextRequest) {
  try {
    // 验证环境变量
    if (!bucketName) {
      return NextResponse.json(
        { success: false, message: '服务器配置错误' },
        { status: 500 }
      );
    }

    // 获取查询参数
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('fileName');

    if (!fileName) {
      return NextResponse.json(
        { success: false, message: '文件名参数缺失' },
        { status: 400 }
      );
    }

    // 检查文件是否属于匿名上传目录
    if (!fileName.startsWith(`uploads/anonymous/`)) {
      return NextResponse.json(
        { success: false, message: '无权限访问此文件' },
        { status: 403 }
      );
    }

    // 生成预签名下载URL
    const getObjectCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileName,
    });

    const downloadUrl = await getSignedUrl(s3Client, getObjectCommand, {
      expiresIn: 3600, // 1小时过期
    });

    return NextResponse.json({
      success: true,
      data: {
        downloadUrl,
        expiresIn: 3600,
      },
    });

  } catch (error) {
    console.error('生成下载URL失败:', error);
    return NextResponse.json(
      { success: false, message: '服务器内部错误' },
      { status: 500 }
    );
  }
}

// 删除文件
export async function DELETE(request: NextRequest) {
  try {
    // 验证环境变量
    if (!bucketName) {
      return NextResponse.json(
        { success: false, message: '服务器配置错误' },
        { status: 500 }
      );
    }

    // 解析请求体
    const body = await request.json();
    const { fileName } = body;

    if (!fileName) {
      return NextResponse.json(
        { success: false, message: '文件名参数缺失' },
        { status: 400 }
      );
    }

    // 检查文件是否属于匿名上传目录
    if (!fileName.startsWith(`uploads/anonymous/`)) {
      return NextResponse.json(
        { success: false, message: '无权限删除此文件' },
        { status: 403 }
      );
    }

    // 删除文件
    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: fileName,
    });

    await s3Client.send(deleteObjectCommand);

    return NextResponse.json({
      success: true,
      message: '文件删除成功',
    });

  } catch (error) {
    console.error('删除文件失败:', error);
    return NextResponse.json(
      { success: false, message: '服务器内部错误' },
      { status: 500 }
    );
  }
}