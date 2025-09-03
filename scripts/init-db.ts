import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function initDatabase() {
  try {
    console.log('开始初始化数据库...');
    
    // 读取迁移文件
    const migrationsDir = path.join(process.cwd(), 'prisma', 'migrations');
    const migrationFiles = [
      '001_initial_schema.sql',
      '002_add_password_reset_tokens.sql', 
      '003_add_idea_tags.sql'
    ];
    
    for (const file of migrationFiles) {
      const filePath = path.join(migrationsDir, file);
      if (fs.existsSync(filePath)) {
        console.log(`执行迁移文件: ${file}`);
        const sql = fs.readFileSync(filePath, 'utf8');
        
        // 清理 SQL 内容，移除注释
        const cleanSql = sql
          .split('\n')
          .filter(line => !line.trim().startsWith('--') && line.trim().length > 0)
          .join('\n');
          
        // 分割 SQL 语句并执行
        const statements = cleanSql
          .split(';')
          .map(s => s.trim())
          .filter(s => s.length > 0);
          
        console.log(`找到 ${statements.length} 条 SQL 语句`);
          
        for (const statement of statements) {
          if (statement.trim()) {
            console.log(`执行 SQL: ${statement.substring(0, 100)}...`);
            try {
              await prisma.$executeRawUnsafe(statement);
              console.log(`✓ 执行成功`);
            } catch (error: any) {
              if (error.code === 'P2010' || error.message.includes('already exists') || error.message.includes('relation') && error.message.includes('already exists')) {
                console.log(`⚠ 跳过已存在的对象`);
              } else {
                console.error(`✗ 执行失败:`, error.message);
                // 继续执行其他语句，不要中断
              }
            }
          }
        }
      }
    }
    
    console.log('数据库初始化完成!');
    
    // 验证表是否创建成功
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
    `;
    
    console.log('当前数据库表:', tables);
    
  } catch (error) {
    console.error('数据库初始化失败:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

initDatabase();