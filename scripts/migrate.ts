#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
import { join } from 'path'

const prisma = new PrismaClient()

async function runMigration(migrationFile: string) {
  try {
    console.log(`🔄 Running migration: ${migrationFile}`)
    
    const migrationPath = join(process.cwd(), 'prisma', 'migrations', migrationFile)
    const migrationSQL = readFileSync(migrationPath, 'utf-8')
    
    // Split SQL by statements and execute each one
    const statements = migrationSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'))
    
    for (const statement of statements) {
      if (statement.trim()) {
        await prisma.$executeRawUnsafe(statement)
      }
    }
    
    console.log(`✅ Migration completed: ${migrationFile}`)
  } catch (error) {
    console.error(`❌ Migration failed: ${migrationFile}`, error)
    throw error
  }
}

async function main() {
  try {
    console.log('🚀 Starting database migration...')
    
    // Test connection first
    await prisma.$connect()
    console.log('✅ Database connection established')
    
    // Run initial migration
    await runMigration('001_initial_schema.sql')
    
    console.log('🎉 All migrations completed successfully!')
  } catch (error) {
    console.error('💥 Migration process failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

if (require.main === module) {
  main()
}

export { runMigration }