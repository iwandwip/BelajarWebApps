import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { hashPassword } from '@/lib/db-utils'
import { USER_ROLES, USER_STATUS } from '@/lib/constants'
import { z } from 'zod'

const registerSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone must be at least 8 characters").max(15, "Phone too long"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await hashPassword(validatedData.password)

    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.fullName,
        role: USER_ROLES.CUSTOMER,
        status: USER_STATUS.PENDING
      }
    })

    await prisma.customer.create({
      data: {
        userId: user.id,
        address: validatedData.address,
        phone: validatedData.phone,
        waterQuota: 0.0,
        isActive: false
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Registration successful. Please wait for admin approval.'
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}