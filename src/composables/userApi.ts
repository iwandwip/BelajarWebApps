import { ref } from 'vue'
import api from '@/lib/api'
import type { AxiosResponse, AxiosError } from 'axios'

export function useApi() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const execute = async <T>(
    apiCall: () => Promise<AxiosResponse<T>>
  ): Promise<T | null> => {
    loading.value = true
    error.value = null

    try {
      const response = await apiCall()
      return response.data
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>
      error.value = axiosError.response?.data?.message || axiosError.message || 'An error occurred'
      return null
    } finally {
      loading.value = false
    }
  }

  const get = async <T>(url: string): Promise<T | null> => {
    return execute(() => api.get<T>(url))
  }

  const post = async <T>(url: string, data?: any): Promise<T | null> => {
    return execute(() => api.post<T>(url, data))
  }

  const put = async <T>(url: string, data?: any): Promise<T | null> => {
    return execute(() => api.put<T>(url, data))
  }

  const del = async <T>(url: string): Promise<T | null> => {
    return execute(() => api.delete<T>(url))
  }

  const patch = async <T>(url: string, data?: any): Promise<T | null> => {
    return execute(() => api.patch<T>(url, data))
  }

  return {
    loading,
    error,
    execute,
    get,
    post,
    put,
    delete: del,
    patch
  }
}