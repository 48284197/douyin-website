import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedSoftwareVersions() {
  console.log('开始添加软件版本数据...');

  try {
    // 清除现有的软件版本数据
    await prisma.softwareVersion.deleteMany();

    // 添加示例软件版本
    const versions = [
      {
        version: '1.2.3',
        platform: 'windows',
        downloadUrl: 'https://example.com/downloads/douyin-live-interaction-windows-1.2.3.exe',
        fileSize: BigInt(47185920), // 45MB in bytes
        checksum: 'sha256:a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
        releaseNotes: '修复了直播间连接稳定性问题，优化了用户界面，新增了自定义快捷键功能。',
        isActive: true,
      },
      {
        version: '1.2.3',
        platform: 'mac-intel',
        downloadUrl: 'https://example.com/downloads/douyin-live-interaction-mac-intel-1.2.3.dmg',
        fileSize: BigInt(54525952), // 52MB in bytes
        checksum: 'sha256:f6e5d4c3b2a1098765432109876543210987654321fedcba0987654321fedcba',
        releaseNotes: '修复了直播间连接稳定性问题，优化了用户界面，新增了自定义快捷键功能。',
        isActive: true,
      },
      {
        version: '1.2.3',
        platform: 'mac-m1',
        downloadUrl: 'https://example.com/downloads/douyin-live-interaction-mac-m1-1.2.3.dmg',
        fileSize: BigInt(51118080), // 48.7MB in bytes
        checksum: 'sha256:1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
        releaseNotes: '修复了直播间连接稳定性问题，优化了用户界面，新增了自定义快捷键功能。原生支持Apple Silicon芯片。',
        isActive: true,
      },
      // 添加一些旧版本作为示例
      {
        version: '1.2.2',
        platform: 'windows',
        downloadUrl: 'https://example.com/downloads/douyin-live-interaction-windows-1.2.2.exe',
        fileSize: BigInt(46137344), // 44MB in bytes
        checksum: 'sha256:b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef12345678',
        releaseNotes: '修复了一些已知问题，提升了软件稳定性。',
        isActive: false,
      },
      {
        version: '1.2.2',
        platform: 'mac-intel',
        downloadUrl: 'https://example.com/downloads/douyin-live-interaction-mac-intel-1.2.2.dmg',
        fileSize: BigInt(53477376), // 51MB in bytes
        checksum: 'sha256:e5d4c3b2a1098765432109876543210987654321fedcba0987654321fedcba09',
        releaseNotes: '修复了一些已知问题，提升了软件稳定性。',
        isActive: false,
      },
      {
        version: '1.2.2',
        platform: 'mac-m1',
        downloadUrl: 'https://example.com/downloads/douyin-live-interaction-mac-m1-1.2.2.dmg',
        fileSize: BigInt(50069504), // 47.7MB in bytes
        checksum: 'sha256:2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef123456789012',
        releaseNotes: '修复了一些已知问题，提升了软件稳定性。原生支持Apple Silicon芯片。',
        isActive: false,
      },
    ];

    for (const version of versions) {
      await prisma.softwareVersion.create({
        data: version,
      });
      console.log(`✅ 已添加 ${version.platform} ${version.version}`);
    }

    console.log('✅ 软件版本数据添加完成！');

  } catch (error) {
    console.error('❌ 添加软件版本数据时出错:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  seedSoftwareVersions()
    .then(() => {
      console.log('🎉 数据库种子数据添加完成');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 种子数据添加失败:', error);
      process.exit(1);
    });
}

export { seedSoftwareVersions };