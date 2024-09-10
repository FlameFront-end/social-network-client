import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { reducers } from '../store'

export const store = configureStore({
    reducer: reducers,
    devTools: true
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
