#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  try {
    // Create sample software versions
    const softwareVersions = await prisma.softwareVersion.createMany({
      data: [
        {
          version: '1.0.0',
          platform: 'windows',
          downloadUrl: 'https://example.com/downloads/douyin-live-v1.0.0-windows.exe',
          fileSize: 52428800, // 50MB
          checksum: 'sha256:abcd1234...',
          releaseNotes: '初始版本发布，支持基础直播互动功能',
          isActive: true,
        },
        {
          version: '1.0.0',
          platform: 'mac-intel',
          downloadUrl: 'https://example.com/downloads/douyin-live-v1.0.0-mac-intel.dmg',
          fileSize: 48234496, // 46MB
          checksum: 'sha256:efgh5678...',
          releaseNotes: '初始版本发布，支持基础直播互动功能',
          isActive: true,
        },
        {
          version: '1.0.0',
          platform: 'mac-m1',
          downloadUrl: 'https://example.com/downloads/douyin-live-v1.0.0-mac-m1.dmg',
          fileSize: 45088768, // 43MB
          checksum: 'sha256:ijkl9012...',
          releaseNotes: '初始版本发布，支持基础直播互动功能，针对Apple Silicon优化',
          isActive: true,
        },
      ],
      skipDuplicates: true,
    })

    console.log(`✅ Created ${softwareVersions.count} software versions`)

    // Create sample admin user
    const hashedPassword = await bcrypt.hash('admin123456', 12)
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        name: '管理员',
        passwordHash: hashedPassword,
      },
    })

    console.log(`✅ Created admin user: ${adminUser.email}`)

    // Create sample ideas
    const sampleIdeas = await prisma.idea.createMany({
      data: [
        {
          title: '增加自动回复功能',
          description: '希望能够设置自动回复消息，当观众发送特定关键词时自动回复相应内容',
          category: '功能建议',
          status: 'pending',
          contactEmail: 'user1@example.com',
        },
        {
          title: '支持更多直播平台',
          description: '除了抖音，希望能支持快手、B站等其他直播平台',
          category: '新功能',
          status: 'under_review',
          contactEmail: 'user2@example.com',
        },
        {
          title: '界面优化建议',
          description: '希望能够自定义界面主题色彩，提供暗色模式',
          category: '界面优化',
          status: 'pending',
          contactEmail: 'user3@example.com',
        },
      ],
      skipDuplicates: true,
    })

    console.log(`✅ Created ${sampleIdeas.count} sample ideas`)

    console.log('🎉 Database seeding completed successfully!')
  } catch (error) {
    console.error('💥 Seeding failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

export { main as seedDatabase }