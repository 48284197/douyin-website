import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Database connection test function
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$connect()
    console.log('✅ Database connection successful')
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return false
  } finally {
    await prisma.$disconnect()
  }
}

// Database health check
export async function getDatabaseHealth() {
  try {
    const start = Date.now()
    await prisma.$queryRaw`SELECT 1`
    const end = Date.now()
    
    return {
      status: 'healthy',
      responseTime: end - start,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }
  }
}

// Graceful shutdown
export async function disconnectDatabase() {
  await prisma.$disconnect()
}

// User operations
export async function createUser(data: {
  email: string
  name: string
  passwordHash: string
  avatarUrl?: string
}) {
  return await prisma.user.create({
    data,
  })
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  })
}

export async function getUserById(id: number) {
  return await prisma.user.findUnique({
    where: { id },
  })
}

// Idea operations
export async function createIdea(data: {
  title: string
  description: string
  category: string
  userId?: number
  contactEmail?: string
}) {
  return await prisma.idea.create({
    data,
  })
}

export async function getIdeas(options?: {
  skip?: number
  take?: number
  where?: any
  orderBy?: any
}) {
  return await prisma.idea.findMany({
    ...options,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  })
}

export async function getIdeaById(id: number) {
  return await prisma.idea.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  })
}

// Download operations
export async function trackDownload(data: {
  platform: string
  version: string
  userAgent?: string
  ipAddress?: string
  userId?: number
}) {
  return await prisma.download.create({
    data,
  })
}

export async function getDownloadStats() {
  const totalDownloads = await prisma.download.count()
  
  const platformStats = await prisma.download.groupBy({
    by: ['platform'],
    _count: {
      platform: true,
    },
  })

  const versionStats = await prisma.download.groupBy({
    by: ['version'],
    _count: {
      version: true,
    },
  })

  return {
    totalDownloads,
    platformBreakdown: platformStats.reduce((acc: Record<string, number>, stat: { platform: string | number; _count: { platform: number } }) => {
      acc[stat.platform] = stat._count.platform
      return acc
    }, {} as Record<string, number>),
    versionBreakdown: versionStats.reduce((acc: Record<string, number>, stat: { version: string | number; _count: { version: number } }) => {
      acc[stat.version] = stat._count.version
      return acc
    }, {} as Record<string, number>),
  }
}

// Software version operations
export async function getActiveSoftwareVersions() {
  return await prisma.softwareVersion.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getSoftwareVersionByPlatform(platform: string) {
  return await prisma.softwareVersion.findFirst({
    where: { 
      platform,
      isActive: true,
    },
    orderBy: { createdAt: 'desc' },
  })
}

export async function createSoftwareVersion(data: {
  version: string
  platform: string
  downloadUrl: string
  fileSize: bigint
  checksum: string
  releaseNotes?: string
}) {
  return await prisma.softwareVersion.create({
    data,
  })
}

// Password reset token operations
export async function createPasswordResetToken(data: {
  token: string
  userId: number
  expiresAt: Date
}) {
  return await prisma.passwordResetToken.create({
    data,
  })
}

export async function getPasswordResetToken(token: string) {
  return await prisma.passwordResetToken.findUnique({
    where: { token },
    include: {
      user: true,
    },
  })
}

export async function markPasswordResetTokenAsUsed(token: string) {
  return await prisma.passwordResetToken.update({
    where: { token },
    data: { used: true },
  })
}

export async function deleteExpiredPasswordResetTokens() {
  return await prisma.passwordResetToken.deleteMany({
    where: {
      OR: [
        { expiresAt: { lt: new Date() } },
        { used: true },
      ],
    },
  })
}

export async function updateUserPassword(userId: number, passwordHash: string) {
  return await prisma.user.update({
    where: { id: userId },
    data: { 
      passwordHash,
      updatedAt: new Date(),
    },
  })
}