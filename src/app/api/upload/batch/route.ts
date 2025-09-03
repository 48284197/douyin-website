import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
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

// 单个文件的验证schema
const fileSchema = z.object({
  fileName: z.string().min(1, '文件名不能为空'),
  fileType: z.string().min(1, '文件类型不能为空'),
  fileSize: z.number().positive('文件大小必须大于0').max(10 * 1024 * 1024, '文件大小不能超过10MB'),
});

// 批量上传的验证schema
const batchUploadSchema = z.object({
  files: z.array(fileSchema).min(1, '至少需要一个文件').max(10, '最多支持10个文件同时上传'),
});

// 批量获取预签名URL
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

      // 调试日志：输出当前使用的Access Key ID
    console.log('当前使用的 Access Key ID:', process.env.AWS_ACCESS_KEY_ID);
    console.log('当前使用的 Region:', process.env.AWS_REGION);
    console.log('当前使用的 Bucket:', bucketName);


    // 解析请求体
    const body = await request.json();
    const validatedData = batchUploadSchema.parse(body);

    const timestamp = Date.now();
    const uploadResults = [];

    // 为每个文件生成预签名URL
    for (let i = 0; i < validatedData.files.length; i++) {
      const file = validatedData.files[i];
      
      // 生成唯一的文件名（匿名上传）
      const fileExtension = file.fileName.split('.').pop();
      const uniqueFileName = `uploads/${timestamp}-${i}-${Math.random().toString(36).substring(2)}.${fileExtension}`;

      try {
        // 生成预签名URL
        const putObjectCommand = new PutObjectCommand({
          Bucket: bucketName,
          Key: uniqueFileName,
          ContentType: file.fileType,
          ACL: 'public-read', // 私有文件
        });

        const uploadUrl = await getSignedUrl(s3Client, putObjectCommand, {
          expiresIn: 300, // 5分钟过期
        });
        
        // 生成文件访问URL
        const fileUrl = `https://${bucketName}.s3.bitiful.net/${uniqueFileName}`;

        uploadResults.push({
          originalFileName: file.fileName,
          uploadUrl,
          fileUrl,
          fileName: uniqueFileName,
          fileSize: file.fileSize,
          fileType: file.fileType,
        });
      } catch (error) {
        console.error(`为文件 ${file.fileName} 生成上传URL失败:`, error);
        uploadResults.push({
          originalFileName: file.fileName,
          error: '生成上传URL失败',
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        uploads: uploadResults,
        expiresIn: 300,
        totalFiles: validatedData.files.length,
        successCount: uploadResults.filter(r => !r.error).length,
        errorCount: uploadResults.filter(r => r.error).length,
      },
    });

  } catch (error) {
    console.error('批量生成上传URL失败:', error);

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

// 批量删除文件
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
    const { fileNames } = body;

    if (!Array.isArray(fileNames) || fileNames.length === 0) {
      return NextResponse.json(
        { success: false, message: '文件名列表不能为空' },
        { status: 400 }
      );
    }

    if (fileNames.length > 100) {
      return NextResponse.json(
        { success: false, message: '一次最多删除100个文件' },
        { status: 400 }
      );
    }

    const deleteResults = [];

    // 批量删除文件
    for (const fileName of fileNames) {
      try {
        // 检查文件是否属于匿名上传目录
        if (!fileName.startsWith(`uploads/`)) {
          deleteResults.push({
            fileName,
            success: false,
            error: '无权限删除此文件',
          });
          continue;
        }

        // 删除文件
        const deleteCommand = new DeleteObjectCommand({
          Bucket: bucketName,
          Key: fileName,
        });

        await s3Client.send(deleteCommand);
        
        deleteResults.push({
          fileName,
          success: true,
        });
      } catch (error) {
        console.error(`删除文件 ${fileName} 失败:`, error);
        deleteResults.push({
          fileName,
          success: false,
          error: '删除失败',
        });
      }
    }

    const successCount = deleteResults.filter(r => r.success).length;
    const errorCount = deleteResults.filter(r => !r.success).length;

    return NextResponse.json({
      success: true,
      data: {
        results: deleteResults,
        totalFiles: fileNames.length,
        successCount,
        errorCount,
      },
      message: `成功删除 ${successCount} 个文件，${errorCount} 个文件删除失败`,
    });

  } catch (error) {
    console.error('批量删除文件失败:', error);
    return NextResponse.json(
      { success: false, message: '服务器内部错误' },
      { status: 500 }
    );
  }
}