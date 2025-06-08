import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-config'
import { prisma } from '@/lib/db'
import { USER_ROLES, PAYMENT_STATUS } from '@/lib/constants'
import { z } from 'zod'

const topupSchema = z.object({
  amount: z.number().min(10000, "Minimum amount is Rp 10,000"),
  quotaRequested: z.number().min(100, "Minimum quota is 100L"),
  method: z.string().min(1, "Payment method is required")
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== USER_ROLES.CUSTOMER) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = topupSchema.parse(body)

    const customer = await prisma.customer.findFirst({
      where: { userId: session.user.id }
    })

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 })
    }

    const payment = await prisma.payment.create({
      data: {
        customerId: customer.id,
        amount: validatedData.amount,
        quotaRequested: validatedData.quotaRequested,
        method: validatedData.method,
        status: PAYMENT_STATUS.PENDING
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Top-up request submitted successfully. Please wait for admin approval.',
      paymentId: payment.id
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Top-up request error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== USER_ROLES.CUSTOMER) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const customer = await prisma.customer.findFirst({
      where: { userId: session.user.id }
    })

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 })
    }

    const payments = await prisma.payment.findMany({
      where: { customerId: customer.id },
      orderBy: { createdAt: 'desc' },
      take: 10
    })

    return NextResponse.json({ payments })
  } catch (error) {
    console.error('Error fetching payment history:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}