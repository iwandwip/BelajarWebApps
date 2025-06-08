"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

interface SignOutButtonProps {
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  showIcon?: boolean
}

export function SignOutButton({ 
  variant = "outline", 
  size = "default",
  className,
  showIcon = true 
}: SignOutButtonProps) {
  const handleSignOut = () => {
    const currentPort = window.location.port
    const currentProtocol = window.location.protocol
    const currentHostname = window.location.hostname
    const baseUrl = `${currentProtocol}//${currentHostname}${currentPort ? `:${currentPort}` : ''}`
    
    signOut({ 
      callbackUrl: `${baseUrl}/signin`,
      redirect: true 
    })
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleSignOut}
      className={className}
    >
      {showIcon && <LogOut className="mr-2 h-4 w-4" />}
      Sign Out
    </Button>
  )
}