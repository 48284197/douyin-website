import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { registerSchema } from '@/lib/validations'
import { createUser, getUserByEmail } from '@/lib/db'

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input data
    const validatedFields = registerSchema.safeParse(body)

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          error: 'VALIDATION_ERROR',
          message: '输入数据无效',
          details: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { email, password, name } = validatedFields.data

    // Check if user already exists
    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      return NextResponse.json(
        {
          error: 'USER_EXISTS',
          message: '该邮箱已被注册',
        },
        { status: 409 }
      )
    }

    // Hash password
    const saltRounds = 12
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Create user
    const user = await createUser({
      email,
      name,
      passwordHash,
    })

    // Return user data (without password hash)
    return NextResponse.json(
      {
        message: '注册成功',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    
    return NextResponse.json(
      {
        error: 'SERVER_ERROR',
        message: '服务器内部错误，请稍后重试',
      },
      { status: 500 }
    )
  }
}