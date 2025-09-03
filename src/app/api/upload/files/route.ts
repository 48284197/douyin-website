import { NextRequest, NextResponse } from 'next/server';
import { S3Client, ListObjectsV2Command, GetObjectCommand, DeleteObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
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

// 查询参数验证schema
const querySchema = z.object({
  page: z.string().optional().transform(val => val ? parseInt(val) : 1),
  limit: z.string().optional().transform(val => val ? Math.min(parseInt(val), 100) : 20),
  prefix: z.string().nullable().optional(),
});

// 获取用户文件列表
export async function GET(request: NextRequest) {
  try {
    // 验证环境变量
    if (!bucketName) {
      return NextResponse.json(
        { success: false, message: '服务器配置错误' },
        { status: 500 }
      );
    }

    // 解析查询参数
    const { searchParams } = new URL(request.url);
    const queryParams = {
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
      prefix: searchParams.get('prefix'),
    };
    
    const validatedQuery = querySchema.parse(queryParams);
    
    // 构建S3查询参数（匿名上传）
    const anonymousPrefix = `uploads/anonymous/`;
    const searchPrefix = validatedQuery.prefix 
      ? `${anonymousPrefix}${validatedQuery.prefix}` 
      : anonymousPrefix;

    // 获取文件列表
    const listCommand = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: searchPrefix,
      MaxKeys: validatedQuery.limit * validatedQuery.page, // 获取更多数据用于分页
    });

    const result = await s3Client.send(listCommand);
    
    if (!result.Contents) {
      return NextResponse.json({
        success: true,
        data: {
          files: [],
          pagination: {
            page: validatedQuery.page,
            limit: validatedQuery.limit,
            total: 0,
            totalPages: 0,
          },
        },
      });
    }

    // 处理文件信息
    const allFiles = result.Contents
      .filter(obj => obj.Key && obj.Key !== anonymousPrefix) // 排除目录本身
      .map(obj => ({
        fileName: obj.Key!,
        displayName: obj.Key!.replace(anonymousPrefix, ''), // 移除匿名前缀
        size: obj.Size || 0,
        lastModified: obj.LastModified?.toISOString() || '',
        etag: obj.ETag?.replace(/"/g, '') || '',
        url: `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${obj.Key}`,
      }))
      .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());

    // 分页处理
    const startIndex = (validatedQuery.page - 1) * validatedQuery.limit;
    const endIndex = startIndex + validatedQuery.limit;
    const paginatedFiles = allFiles.slice(startIndex, endIndex);
    
    const totalPages = Math.ceil(allFiles.length / validatedQuery.limit);

    // 为每个文件生成临时访问URL（可选）
    const filesWithUrls = await Promise.all(
      paginatedFiles.map(async (file) => {
        try {
          // 生成1小时有效的预签名URL
          const getObjectCommand = new GetObjectCommand({
            Bucket: bucketName,
            Key: file.fileName,
          });

          const signedUrl = await getSignedUrl(s3Client, getObjectCommand, {
            expiresIn: 3600,
          });
          
          return {
            ...file,
            signedUrl,
          };
        } catch (error) {
          console.error(`为文件 ${file.fileName} 生成签名URL失败:`, error);
          return file;
        }
      })
    );

    return NextResponse.json({
      success: true,
      data: {
        files: filesWithUrls,
        pagination: {
          page: validatedQuery.page,
          limit: validatedQuery.limit,
          total: allFiles.length,
          totalPages,
          hasNext: validatedQuery.page < totalPages,
          hasPrev: validatedQuery.page > 1,
        },
      },
    });

  } catch (error) {
    console.error('获取文件列表失败:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: '查询参数错误',
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

// 获取文件详细信息
export async function POST(request: NextRequest) {
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
        { success: false, message: '无权限访问此文件' },
        { status: 403 }
      );
    }

    // 获取文件元数据
    const headObjectCommand = new HeadObjectCommand({
      Bucket: bucketName,
      Key: fileName,
    });

    const metadata = await s3Client.send(headObjectCommand);
    
    // 生成预签名下载URL
    const getObjectCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileName,
    });

    const downloadUrl = await getSignedUrl(s3Client, getObjectCommand, {
      expiresIn: 3600, // 1小时有效
    });

    return NextResponse.json({
      success: true,
      data: {
        fileName,
        displayName: fileName.replace(`uploads/anonymous/`, ''),
        size: metadata.ContentLength || 0,
        contentType: metadata.ContentType || 'application/octet-stream',
        lastModified: metadata.LastModified?.toISOString() || '',
        etag: metadata.ETag?.replace(/"/g, '') || '',
        downloadUrl,
        metadata: metadata.Metadata || {},
      },
    });

  } catch (error: any) {
    console.error('获取文件信息失败:', error);
    
    if (error.code === 'NotFound') {
      return NextResponse.json(
        { success: false, message: '文件不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: '服务器内部错误' },
      { status: 500 }
    );
  }
}