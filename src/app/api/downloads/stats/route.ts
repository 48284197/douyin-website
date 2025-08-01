import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    // 检查用户权限（可选：只允许管理员查看统计）
    // const session = await getServerSession(authOptions);
    
    // 获取总下载数
    const totalDownloads = await prisma.download.count();

    // 获取平台分布统计
    const platformStats = await prisma.download.groupBy({
      by: ['platform'],
      _count: {
        platform: true,
      },
      orderBy: {
        _count: {
          platform: 'desc',
        },
      },
    });

    // 转换为更友好的格式
    const platformBreakdown = platformStats.reduce((acc, stat) => {
      acc[stat.platform] = stat._count.platform;
      return acc;
    }, {} as Record<string, number>);

    // 获取版本分布统计
    const versionStats = await prisma.download.groupBy({
      by: ['version'],
      _count: {
        version: true,
      },
      orderBy: {
        _count: {
          version: 'desc',
        },
      },
    });

    const versionBreakdown = versionStats.reduce((acc, stat) => {
      acc[stat.version] = stat._count.version;
      return acc;
    }, {} as Record<string, number>);

    // 获取最近7天的下载趋势
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentDownloads = await prisma.download.findMany({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        createdAt: true,
        platform: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // 按日期分组统计
    const dailyStats = recentDownloads.reduce((acc, download) => {
      const date = download.createdAt.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date]++;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      success: true,
      data: {
        totalDownloads,
        platformBreakdown,
        versionBreakdown,
        dailyStats,
        recentDownloadsCount: recentDownloads.length,
      },
    });

  } catch (error) {
    console.error('获取下载统计错误:', error);

    return NextResponse.json(
      { 
        success: false, 
        message: '获取统计数据失败' 
      },
      { status: 500 }
    );
  }
}