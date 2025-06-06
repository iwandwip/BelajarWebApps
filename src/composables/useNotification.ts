import { ref } from 'vue'

export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  duration?: number
}

const notifications = ref<Notification[]>([])

export function useNotification() {
  const show = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString()
    const newNotification: Notification = {
      id,
      ...notification,
      duration: notification.duration || 5000
    }

    notifications.value.push(newNotification)

    if (newNotification.duration > 0) {
      setTimeout(() => {
        remove(id)
      }, newNotification.duration)
    }

    return id
  }

  const remove = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clear = () => {
    notifications.value = []
  }

  const success = (title: string, message: string = '', duration?: number) => {
    return show({ type: 'success', title, message, duration })
  }

  const error = (title: string, message: string = '', duration?: number) => {
    return show({ type: 'error', title, message, duration })
  }

  const warning = (title: string, message: string = '', duration?: number) => {
    return show({ type: 'warning', title, message, duration })
  }

  const info = (title: string, message: string = '', duration?: number) => {
    return show({ type: 'info', title, message, duration })
  }

  return {
    notifications,
    show,
    remove,
    clear,
    success,
    error,
    warning,
    info
  }
}