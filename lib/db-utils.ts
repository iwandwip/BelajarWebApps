import { prisma } from './db'
import bcrypt from 'bcryptjs'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: {
      customer: true,
    },
  })
}

export async function getCustomerWithUser(customerId: string) {
  return prisma.customer.findUnique({
    where: { id: customerId },
    include: {
      user: true,
      node: true,
    },
  })
}

export async function getLatestSensorData(nodeId: string, limit: number = 10) {
  return prisma.sensorData.findMany({
    where: { nodeId },
    orderBy: { timestamp: 'desc' },
    take: limit,
    include: {
      node: true,
      customer: true,
    },
  })
}

export async function getSystemSetting(key: string) {
  const setting = await prisma.systemSetting.findUnique({
    where: { settingKey: key },
  })
  return setting?.settingValue
}

export async function updateSystemSetting(key: string, value: string, updatedBy: string) {
  return prisma.systemSetting.upsert({
    where: { settingKey: key },
    update: {
      settingValue: value,
      updatedBy,
    },
    create: {
      settingKey: key,
      settingValue: value,
      description: '',
      updatedBy,
    },
  })
}

export async function getPendingUsers() {
  return prisma.user.findMany({
    where: { 
      status: 'PENDING',
      role: 'CUSTOMER',
    },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getPendingPayments() {
  return prisma.payment.findMany({
    where: { status: 'PENDING' },
    include: {
      customer: {
        include: {
          user: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getActiveLeaks() {
  return prisma.leakDetection.findMany({
    where: { status: 'DETECTED' },
    orderBy: { detectionTime: 'desc' },
  })
}