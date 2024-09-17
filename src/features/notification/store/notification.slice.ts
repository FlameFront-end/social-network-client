import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { NotificationPlacement } from 'antd/es/notification/interface'

interface NotificationState {
    notify: {
        key?: string
        instance?: 'success' | 'error' | 'info' | 'warning' | 'open'
        message?: string
        description?: string
        duration?: number
        placement?: NotificationPlacement
        open?: boolean
    }
}

const initialState: NotificationState = {
    notify: {
        instance: 'open',
        message: 'Default',
        description: 'Default',
        duration: 4.5,
        placement: 'topLeft',
        open: false
    }
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotify(state, { payload }: PayloadAction<NotificationState['notify']>) {
            if ('key' in payload) state.notify.key = payload.key
            state.notify.instance = payload?.instance ?? 'open'
            state.notify.message = payload?.message ?? 'Default'
            state.notify.description = payload?.description ?? 'Default'
            state.notify.duration = payload?.duration ?? 4.5
            state.notify.placement = payload?.placement ?? 'topLeft'
            state.notify.open = payload?.open ?? true
        }
    }
})

export const { reducer: notificationReducer, actions: notificationActions } = notificationSlice
