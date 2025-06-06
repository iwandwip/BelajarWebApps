import axios from 'axios'
import type { 
  LoginCredentials, 
  RegisterData, 
  ForgotPasswordData, 
  ResetPasswordData, 
  AuthResponse 
} from '@/types/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post('/auth/login', credentials)
    return data
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const { data } = await api.post('/auth/register', userData)
    return data
  },

  async forgotPassword(emailData: ForgotPasswordData): Promise<AuthResponse> {
    const { data } = await api.post('/auth/forgot-password', emailData)
    return data
  },

  async resetPassword(resetData: ResetPasswordData): Promise<AuthResponse> {
    const { data } = await api.post('/auth/reset-password', resetData)
    return data
  },

  async verifyEmail(token: string): Promise<AuthResponse> {
    const { data } = await api.post('/auth/verify-email', { token })
    return data
  },

  async resendVerification(): Promise<AuthResponse> {
    const { data } = await api.post('/auth/resend-verification')
    return data
  },

  async logout(): Promise<AuthResponse> {
    const { data } = await api.post('/auth/logout')
    return data
  },

  async me(): Promise<AuthResponse> {
    const { data } = await api.get('/auth/me')
    return data
  }
}

export default api