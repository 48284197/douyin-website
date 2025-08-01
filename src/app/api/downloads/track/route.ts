import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// 下载跟踪请求验证模式
const trackDownloadSchema = z.object({
  platform: z.enum(['windows', 'mac-intel', 'mac-m1']),
  version: z.string().min(1, '版本号不能为空'),
  userAgent: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const body = await request.json();
    const validatedData = trackDownloadSchema.parse(body);

    // 获取用户会话（如果已登录）
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id ? parseInt(session.user.id) : null;

    // 获取客户端IP地址
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip');
    
    // 记录下载统计
    await prisma.download.create({
      data: {
        platform: validatedData.platform,
        version: validatedData.version,
        userAgent: validatedData.userAgent,
        ipAddress: ip,
        userId: userId,
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        message: '下载统计已记录' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('下载跟踪错误:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: '请求数据格式错误',
          errors: error.issues 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: '服务器内部错误' 
      },
      { status: 500 }
    );
  }
}