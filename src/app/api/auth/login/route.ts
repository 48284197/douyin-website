import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { loginSchema } from '@/lib/validations'
import { getUserByEmail } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input data
    const validatedFields = loginSchema.safeParse(body)

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

    const { email, password } = validatedFields.data

    // Find user by email
    const user = await getUserByEmail(email)

    if (!user) {
      return NextResponse.json(
        {
          error: 'INVALID_CREDENTIALS',
          message: '邮箱或密码错误',
        },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          error: 'INVALID_CREDENTIALS',
          message: '邮箱或密码错误',
        },
        { status: 401 }
      )
    }

    // Return success (actual session management is handled by NextAuth.js)
    return NextResponse.json(
      {
        message: '登录成功',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Login error:', error)
    
    return NextResponse.json(
      {
        error: 'SERVER_ERROR',
        message: '服务器内部错误，请稍后重试',
      },
      { status: 500 }
    )
  }
}