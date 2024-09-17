import { api } from '../core/api.ts'
import { authActions, authReducer } from '../features/auth/store/auth.slice'
import { chatReducer } from '../features/chat/store/chat.slice.ts'
import { notificationActions, notificationReducer } from '../features/notification/store/notification.slice.ts'

export const reducers = {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    chat: chatReducer,
    notification: notificationReducer
}

export const actions = {
    ...authActions,
    ...notificationActions
}
