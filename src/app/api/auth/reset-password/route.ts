import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { resetPasswordSchema } from '@/lib/validations'
import { getUserByEmail, createPasswordResetToken } from '@/lib/db'

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input data
    const validatedFields = resetPasswordSchema.safeParse(body)

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

    const { email } = validatedFields.data

    // Find user by email
    const user = await getUserByEmail(email)

    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json(
        {
          message: '如果该邮箱存在，我们已发送重置密码的链接',
        },
        { status: 200 }
      )
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now

    // Save reset token to database
    await createPasswordResetToken({
      token: resetToken,
      userId: user.id,
      expiresAt,
    })

    // TODO: Send email with reset link
    // For now, we'll just return the token (in production, this should be sent via email)
    console.log(`Password reset token for ${email}: ${resetToken}`)

    return NextResponse.json(
      {
        message: '如果该邮箱存在，我们已发送重置密码的链接',
        // Remove this in production - only for development
        ...(process.env.NODE_ENV === 'development' && { resetToken }),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Password reset request error:', error)
    
    return NextResponse.json(
      {
        error: 'SERVER_ERROR',
        message: '服务器内部错误，请稍后重试',
      },
      { status: 500 }
    )
  }
}