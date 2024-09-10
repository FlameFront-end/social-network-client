import { configureStore } from '@reduxjs/toolkit'
import chatSlice from '../features/chat/reducers/chatSlice.ts'

export const store = configureStore({
    reducer: {
        chat: chatSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
