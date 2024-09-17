import { type JSX } from 'react'
import { notification } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'

interface OpenNotification {
    key?: string
    instance?: 'success' | 'error' | 'info' | 'warning' | 'open'
    message?: string
    description?: string
    duration?: number
    placement?: NotificationPlacement
}

interface UseNotificationReturn {
    contextHolder: JSX.Element
    openNotification: (payload: OpenNotification) => void
}

export const useNotification = (): UseNotificationReturn => {
    const [api, contextHolder] = notification.useNotification()
    const openNotification = ({ instance = 'open', ...args }: OpenNotification): void => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        api[instance]({
            ...args
        })
    }

    return {
        contextHolder,
        openNotification
    }
}
