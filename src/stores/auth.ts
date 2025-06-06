import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginCredentials, RegisterData, ForgotPasswordData, ResetPasswordData } from '@/types/auth'
import { authApi } from '@/lib/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!user.value && !!token.value)
  const isEmailVerified = computed(() => user.value?.emailVerified ?? false)

  const login = async (credentials: LoginCredentials) => {
    loading.value = true
    try {
      const response = await authApi.login(credentials)
      if (response.success && response.user && response.token) {
        user.value = response.user
        token.value = response.token
        return response
      }
      throw new Error(response.message)
    } finally {
      loading.value = false
    }
  }

  const register = async (data: RegisterData) => {
    loading.value = true
    try {
      const response = await authApi.register(data)
      return response
    } finally {
      loading.value = false
    }
  }

  const forgotPassword = async (data: ForgotPasswordData) => {
    loading.value = true
    try {
      const response = await authApi.forgotPassword(data)
      return response
    } finally {
      loading.value = false
    }
  }

  const resetPassword = async (data: ResetPasswordData) => {
    loading.value = true
    try {
      const response = await authApi.resetPassword(data)
      return response
    } finally {
      loading.value = false
    }
  }

  const verifyEmail = async (token: string) => {
    loading.value = true
    try {
      const response = await authApi.verifyEmail(token)
      if (response.success && response.user) {
        user.value = response.user
      }
      return response
    } finally {
      loading.value = false
    }
  }

  const resendVerification = async () => {
    loading.value = true
    try {
      const response = await authApi.resendVerification()
      return response
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } finally {
      user.value = null
      token.value = null
    }
  }

  const checkAuth = async () => {
    try {
      const response = await authApi.me()
      if (response.success && response.user) {
        user.value = response.user
        return true
      }
      return false
    } catch {
      return false
    }
  }

  return {
    user,
    token,
    loading,
    isAuthenticated,
    isEmailVerified,
    login,
    register,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendVerification,
    logout,
    checkAuth
  }
})