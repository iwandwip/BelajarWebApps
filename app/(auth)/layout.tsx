import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication - PDAM Management System",
  description: "Login, register, and manage your PDAM account",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {children}
      </div>
    </div>
  )
}