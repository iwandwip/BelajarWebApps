import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-config'
import { prisma } from '@/lib/db'
import { USER_ROLES, PAYMENT_STATUS } from '@/lib/constants'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== USER_ROLES.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const pendingPayments = await prisma.payment.findMany({
      where: {
        status: PAYMENT_STATUS.PENDING
      },
      include: {
        customer: {
          include: {
            user: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ payments: pendingPayments })
  } catch (error) {
    console.error('Error fetching pending payments:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== USER_ROLES.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { paymentId, action } = await request.json()

    if (!paymentId || !action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: { customer: true }
    })

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
    }

    if (action === 'approve') {
      await prisma.payment.update({
        where: { id: paymentId },
        data: {
          status: PAYMENT_STATUS.COMPLETED,
          quotaAdded: payment.quotaRequested,
          approvedAt: new Date(),
          approvedBy: session.user.id
        }
      })

      await prisma.customer.update({
        where: { id: payment.customerId },
        data: {
          waterQuota: {
            increment: payment.quotaRequested
          }
        }
      })

      return NextResponse.json({ message: 'Payment approved successfully' })
    } else {
      await prisma.payment.update({
        where: { id: paymentId },
        data: {
          status: PAYMENT_STATUS.REJECTED,
          approvedBy: session.user.id
        }
      })

      return NextResponse.json({ message: 'Payment rejected' })
    }
  } catch (error) {
    console.error('Error processing payment approval:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}