export interface User {
  id: string
  email: string
  name: string
  emailVerified: boolean
  emailVerifiedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface ForgotPasswordData {
  email: string
}

export interface ResetPasswordData {
  token: string
  password: string
  confirmPassword: string
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: User
  token?: string
}

export interface ApiError {
  success: false
  message: string
  errors?: Record<string, string[]>
}