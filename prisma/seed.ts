import { PrismaClient } from '@prisma/client'
import { USER_ROLES, USER_STATUS, NODE_TYPES, SENSOR_TYPES } from '../lib/constants'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10)
  const customerPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      email: 'admin@gmail.com',
      password: adminPassword,
      name: 'PDAM Administrator',
      role: USER_ROLES.ADMIN,
      status: USER_STATUS.ACTIVE,
      approvedAt: new Date(),
    },
  })

  const customer1 = await prisma.user.upsert({
    where: { email: 'user1@gmail.com' },
    update: {},
    create: {
      email: 'user1@gmail.com',
      password: customerPassword,
      name: 'Budi Santoso',
      role: USER_ROLES.CUSTOMER,
      status: USER_STATUS.ACTIVE,
      approvedAt: new Date(),
      approvedBy: admin.id,
    },
  })

  const customer2 = await prisma.user.upsert({
    where: { email: 'user2@gmail.com' },
    update: {},
    create: {
      email: 'user2@gmail.com',
      password: customerPassword,
      name: 'Sari Dewi',
      role: USER_ROLES.CUSTOMER,
      status: USER_STATUS.ACTIVE,
      approvedAt: new Date(),
      approvedBy: admin.id,
    },
  })

  const customerData1 = await prisma.customer.upsert({
    where: { userId: customer1.id },
    update: {},
    create: {
      userId: customer1.id,
      customerNo: 'PDAM-001',
      address: 'Jl. Merdeka No. 123, Malang',
      phone: '08123456789',
      waterQuota: 1000.0,
      isActive: true,
    },
  })

  const customerData2 = await prisma.customer.upsert({
    where: { userId: customer2.id },
    update: {},
    create: {
      userId: customer2.id,
      customerNo: 'PDAM-002',
      address: 'Jl. Sudirman No. 456, Malang',
      phone: '08987654321',
      waterQuota: 750.0,
      isActive: true,
    },
  })

  const distributorNode = await prisma.node.upsert({
    where: { nodeId: 'DIST-001' },
    update: {},
    create: {
      nodeId: 'DIST-001',
      nodeType: NODE_TYPES.DISTRIBUTOR,
      location: 'Main Distribution Pipe - Central',
      isOnline: true,
      lastSeen: new Date(),
    },
  })

  const customerNode1 = await prisma.node.upsert({
    where: { nodeId: 'USER-001' },
    update: {},
    create: {
      nodeId: 'USER-001',
      nodeType: NODE_TYPES.CUSTOMER,
      location: 'Customer PDAM-001 House',
      customerId: customerData1.id,
      isOnline: true,
      lastSeen: new Date(),
    },
  })

  const customerNode2 = await prisma.node.upsert({
    where: { nodeId: 'USER-002' },
    update: {},
    create: {
      nodeId: 'USER-002',
      nodeType: NODE_TYPES.CUSTOMER,
      location: 'Customer PDAM-002 House',
      customerId: customerData2.id,
      isOnline: true,
      lastSeen: new Date(),
    },
  })

  const settings = [
    {
      settingKey: 'leak_flow_threshold_percent',
      settingValue: '10',
      description: 'Flow difference percentage to trigger leak alert',
    },
    {
      settingKey: 'leak_pressure_threshold_bar',
      settingValue: '0.5',
      description: 'Pressure difference in Bar to trigger leak alert',
    },
    {
      settingKey: 'sensor_data_frequency_seconds',
      settingValue: '5',
      description: 'How often ESP32 sends sensor data (seconds)',
    },
    {
      settingKey: 'auto_valve_close_quota_limit',
      settingValue: '0',
      description: 'Water quota limit to auto-close valve (Liter)',
    },
  ]

  for (const setting of settings) {
    await prisma.systemSetting.upsert({
      where: { settingKey: setting.settingKey },
      update: {},
      create: {
        ...setting,
        updatedBy: admin.id,
      },
    })
  }

  const now = new Date()
  const sampleSensorData = [
    {
      nodeId: distributorNode.id,
      sensorType: SENSOR_TYPES.FLOW_METER,
      sensorIndex: 1,
      value: 15.5,
      unit: 'L/min',
      timestamp: now,
    },
    {
      nodeId: distributorNode.id,
      sensorType: SENSOR_TYPES.FLOW_METER,
      sensorIndex: 2,
      value: 12.3,
      unit: 'L/min',
      timestamp: now,
    },
    {
      nodeId: distributorNode.id,
      sensorType: SENSOR_TYPES.PRESSURE,
      sensorIndex: 1,
      value: 2.5,
      unit: 'Bar',
      timestamp: now,
    },
    {
      nodeId: customerNode1.id,
      customerId: customerData1.id,
      sensorType: SENSOR_TYPES.FLOW_METER,
      sensorIndex: 1,
      value: 14.8,
      unit: 'L/min',
      timestamp: now,
    },
    {
      nodeId: customerNode1.id,
      customerId: customerData1.id,
      sensorType: SENSOR_TYPES.PRESSURE,
      sensorIndex: 1,
      value: 2.2,
      unit: 'Bar',
      timestamp: now,
    },
    {
      nodeId: customerNode2.id,
      customerId: customerData2.id,
      sensorType: SENSOR_TYPES.FLOW_METER,
      sensorIndex: 1,
      value: 11.9,
      unit: 'L/min',
      timestamp: now,
    },
    {
      nodeId: customerNode2.id,
      customerId: customerData2.id,
      sensorType: SENSOR_TYPES.PRESSURE,
      sensorIndex: 1,
      value: 2.1,
      unit: 'Bar',
      timestamp: now,
    },
  ]

  for (const data of sampleSensorData) {
    await prisma.sensorData.create({
      data,
    })
  }

  console.log('✅ Database seeded successfully!')
  console.log('👤 Admin: admin@gmail.com / admin123')
  console.log('👤 Customer 1: user1@gmail.com / admin123 (PDAM-001)')
  console.log('👤 Customer 2: user2@gmail.com / admin123 (PDAM-002)')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })