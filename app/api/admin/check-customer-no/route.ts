import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-config'
import { prisma } from '@/lib/db'
import { USER_ROLES } from '@/lib/constants'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== USER_ROLES.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { customerNo } = await request.json()

    if (!customerNo || customerNo.trim() === '') {
      return NextResponse.json({ available: false, error: 'Customer number is required' })
    }

    const existingCustomer = await prisma.customer.findUnique({
      where: { customerNo: customerNo.trim() }
    })

    return NextResponse.json({ 
      available: !existingCustomer,
      message: existingCustomer ? 'Customer number already exists' : 'Customer number is available'
    })
  } catch (error) {
    console.error('Error checking customer number:', error)
    return NextResponse.json({ available: false, error: 'Internal server error' })
  }
}