import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-config'
import { prisma } from '@/lib/db'
import { USER_ROLES, USER_STATUS } from '@/lib/constants'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== USER_ROLES.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const pendingUsers = await prisma.user.findMany({
      where: {
        status: USER_STATUS.PENDING,
        role: USER_ROLES.CUSTOMER
      },
      include: {
        customer: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ users: pendingUsers })
  } catch (error) {
    console.error('Error fetching pending users:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== USER_ROLES.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { userId, action } = await request.json()

    if (!userId || !action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    if (action === 'approve') {
      const customerCount = await prisma.customer.count()
      const customerNo = `PDAM-${String(customerCount + 1).padStart(3, '0')}`

      await prisma.user.update({
        where: { id: userId },
        data: {
          status: USER_STATUS.ACTIVE,
          approvedAt: new Date(),
          approvedBy: session.user.id
        }
      })

      await prisma.customer.update({
        where: { userId },
        data: {
          customerNo,
          isActive: true
        }
      })

      return NextResponse.json({ message: 'User approved successfully' })
    } else {
      await prisma.user.delete({
        where: { id: userId }
      })

      return NextResponse.json({ message: 'User rejected and removed' })
    }
  } catch (error) {
    console.error('Error processing user approval:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}