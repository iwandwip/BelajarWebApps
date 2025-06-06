import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
  try {
    const dbDir = path.join(process.cwd(), 'database')
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true })
      console.log('✅ Database directory created')
    }

    await prisma.$connect()
    console.log('✅ Database connected successfully')
    
    console.log('✅ Database initialization completed')
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()