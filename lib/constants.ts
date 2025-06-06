export const USER_ROLES = {
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER'
} as const

export const USER_STATUS = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
} as const

export const NODE_TYPES = {
  DISTRIBUTOR: 'DISTRIBUTOR',
  CUSTOMER: 'CUSTOMER'
} as const

export const SENSOR_TYPES = {
  FLOW_METER: 'FLOW_METER',
  PRESSURE: 'PRESSURE'
} as const

export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  REJECTED: 'REJECTED'
} as const

export const LEAK_SEVERITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH'
} as const

export const LEAK_STATUS = {
  DETECTED: 'DETECTED',
  RESOLVED: 'RESOLVED',
  FALSE_ALARM: 'FALSE_ALARM'
} as const

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]
export type UserStatus = typeof USER_STATUS[keyof typeof USER_STATUS]
export type NodeType = typeof NODE_TYPES[keyof typeof NODE_TYPES]
export type SensorType = typeof SENSOR_TYPES[keyof typeof SENSOR_TYPES]
export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS]
export type LeakSeverity = typeof LEAK_SEVERITY[keyof typeof LEAK_SEVERITY]
export type LeakStatus = typeof LEAK_STATUS[keyof typeof LEAK_STATUS]