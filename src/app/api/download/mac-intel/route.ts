import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 获取最新的Mac Intel版本
    const latestVersion = await prisma.softwareVersion.findFirst({
      where: {
        platform: 'mac-intel',
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!latestVersion) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Mac Intel版本暂不可用' 
        },
        { status: 404 }
      );
    }

    // 重定向到实际的下载链接
    return NextResponse.redirect(latestVersion.downloadUrl);

  } catch (error) {
    console.error('Mac Intel下载错误:', error);

    return NextResponse.json(
      { 
        success: false, 
        message: '下载服务暂时不可用' 
      },
      { status: 500 }
    );
  }
}