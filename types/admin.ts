export interface PendingUser {
  id: string
  name: string
  email: string
  createdAt: string
  customer?: {
    phone: string
    address: string
  }
}

export interface PendingPayment {
  id: string
  amount: number
  quotaRequested: number
  method: string
  createdAt: string
  customer: {
    customerNo: string
    user: {
      name: string
    }
  }
}

export interface SensorNode {
  nodeId: string
  location: string
  type: 'DISTRIBUTOR' | 'CUSTOMER'
  customer?: string
  flowRate: number
  pressure: number
  status: 'ONLINE' | 'OFFLINE'
  lastUpdate: string
}

export interface LeakDetection {
  distributorFlow: number
  customerTotalFlow: number
  flowDifference: number
  status: 'NO_LEAK' | 'LEAK_DETECTED'
  threshold: number
}

export interface Customer {
  id: string
  customerNo: string
  name: string
  email: string
  phone: string
  address: string
  waterQuota: number
  status: 'ACTIVE' | 'INACTIVE'
  nodeStatus: 'ONLINE' | 'OFFLINE'
}

export interface DailyUsage {
  date: string
  usage: number
  cost: number
}

export interface MonthlyUsage {
  month: string
  usage: number
  cost: number
}

export interface MonthlyStats {
  month: string
  usage: number
  customers: number
  leaks: number
}

export interface Report {
  title: string
  description: string
  icon: any
  data: string
  action: string
}

export interface SystemSetting {
  key: string
  label: string
  value: string
  unit: string
  description: string
  icon: any
  category: string
}