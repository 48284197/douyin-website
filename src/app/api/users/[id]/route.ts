import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// 获取单个用户信息
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const userId = parseInt(resolvedParams.id)
    
    if (isNaN(userId)) {
      return NextResponse.json(
        { success: false, error: '无效的用户ID' },
        { status: 400 }
      )
    }
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
        ideas: {
          select: {
            id: true,
            title: true,
            status: true,
            createdAt: true
          }
        },
        downloads: {
          select: {
            id: true,
            platform: true,
            createdAt: true
          }
        }
      }
    })
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: '用户不存在' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: user
    })
  } catch (error) {
    console.error('获取用户信息失败:', error)
    return NextResponse.json(
      { success: false, error: '获取用户信息失败' },
      { status: 500 }
    )
  }
}

// 更新用户信息
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const userId = parseInt(resolvedParams.id)
    const body = await request.json()
    
    if (isNaN(userId)) {
      return NextResponse.json(
        { success: false, error: '无效的用户ID' },
        { status: 400 }
      )
    }
    
    const { name, email, avatarUrl } = body
    
    // 检查用户是否存在
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    })
    
    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: '用户不存在' },
        { status: 404 }
      )
    }
    
    // 如果更新邮箱，检查邮箱是否已被其他用户使用
    if (email && email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email }
      })
      
      if (emailExists) {
        return NextResponse.json(
          { success: false, error: '邮箱已被使用' },
          { status: 400 }
        )
      }
    }
    
    // 更新用户信息
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(avatarUrl && { avatarUrl })
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true
      }
    })
    
    return NextResponse.json({
      success: true,
      data: updatedUser
    })
  } catch (error) {
    console.error('更新用户信息失败:', error)
    return NextResponse.json(
      { success: false, error: '更新用户信息失败' },
      { status: 500 }
    )
  }
}

// 删除用户
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const userId = parseInt(resolvedParams.id)
    
    if (isNaN(userId)) {
      return NextResponse.json(
        { success: false, error: '无效的用户ID' },
        { status: 400 }
      )
    }
    
    // 检查用户是否存在
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    })
    
    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: '用户不存在' },
        { status: 404 }
      )
    }
    
    // 删除用户（相关的ideas和downloads会根据schema设置自动处理）
    await prisma.user.delete({
      where: { id: userId }
    })
    
    return NextResponse.json({
      success: true,
      message: '用户删除成功'
    })
  } catch (error) {
    console.error('删除用户失败:', error)
    return NextResponse.json(
      { success: false, error: '删除用户失败' },
      { status: 500 }
    )
  }
}