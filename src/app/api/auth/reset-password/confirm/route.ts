import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { 
  getPasswordResetToken, 
  markPasswordResetTokenAsUsed, 
  updateUserPassword 
} from '@/lib/db'
import { USER_CONSTRAINTS, REGEX_PATTERNS } from '@/lib/constants'

const confirmResetPasswordSchema = z.object({
  token: z.string().min(1, '重置令牌不能为空'),
  password: z
    .string()
    .min(USER_CONSTRAINTS.PASSWORD_MIN_LENGTH, `密码至少需要${USER_CONSTRAINTS.PASSWORD_MIN_LENGTH}个字符`)
    .regex(REGEX_PATTERNS.PASSWORD_STRONG, '密码需要包含大小写字母和数字'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input data
    const validatedFields = confirmResetPasswordSchema.safeParse(body)

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

    const { token, password } = validatedFields.data

    // Find reset token
    const resetTokenRecord = await getPasswordResetToken(token)

    if (!resetTokenRecord) {
      return NextResponse.json(
        {
          error: 'INVALID_TOKEN',
          message: '无效的重置令牌',
        },
        { status: 400 }
      )
    }

    // Check if token is expired
    if (resetTokenRecord.expiresAt < new Date()) {
      return NextResponse.json(
        {
          error: 'TOKEN_EXPIRED',
          message: '重置令牌已过期',
        },
        { status: 400 }
      )
    }

    // Check if token is already used
    if (resetTokenRecord.used) {
      return NextResponse.json(
        {
          error: 'TOKEN_USED',
          message: '重置令牌已被使用',
        },
        { status: 400 }
      )
    }

    // Hash new password
    const saltRounds = 12
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Update user password
    await updateUserPassword(resetTokenRecord.userId, passwordHash)

    // Mark token as used
    await markPasswordResetTokenAsUsed(token)

    return NextResponse.json(
      {
        message: '密码重置成功',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Password reset confirmation error:', error)
    
    return NextResponse.json(
      {
        error: 'SERVER_ERROR',
        message: '服务器内部错误，请稍后重试',
      },
      { status: 500 }
    )
  }
}