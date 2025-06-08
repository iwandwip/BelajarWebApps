import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-config'
import { prisma } from '@/lib/db'
import { USER_ROLES } from '@/lib/constants'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== USER_ROLES.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const [totalCustomers, activeCustomers, totalQuota] = await Promise.all([
      prisma.customer.count(),
      prisma.customer.count({
        where: { isActive: true }
      }),
      prisma.customer.aggregate({
        _sum: { waterQuota: true }
      })
    ])

    return NextResponse.json({
      totalCustomers,
      activeCustomers,
      totalQuota: totalQuota._sum.waterQuota || 0
    })

  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}