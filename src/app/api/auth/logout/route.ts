import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // 获取当前会话
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: '用户未登录' },
        { status: 401 }
      )
    }

    // NextAuth会自动处理会话清除，这里只需要返回成功响应
    return NextResponse.json(
      { 
        success: true, 
        message: '退出登录成功' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('退出登录失败:', error)
    return NextResponse.json(
      { success: false, error: '退出登录失败' },
      { status: 500 }
    )
  }
}