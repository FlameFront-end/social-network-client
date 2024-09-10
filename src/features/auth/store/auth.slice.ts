import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import type { LoginResponse } from '../types/login.types'

interface AuthState {
    user: {
        isAuth: boolean
        jwt: string | undefined | null
        id: number | undefined
        username: string | undefined
        category: string | undefined
    }
}

const user = JSON.parse(Cookies.get('user') ?? '{}') as {
    jwt?: string
    id?: number
    username?: string
    category?: string
}

const initialState: AuthState = {
    user: {
        isAuth: user?.jwt != null,
        jwt: user?.jwt,
        id: user?.id,
        username: user?.username,
        category: user?.category
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, { payload }: PayloadAction<LoginResponse>) {
            Cookies.set('jwt', payload.jwt)
            Cookies.set('user', JSON.stringify(payload))

            state.user = {
                ...payload,
                isAuth: true
            }
        },
        removeUser(state) {
            Cookies.remove('jwt')
            Cookies.remove('user')

            state.user.jwt = null
            state.user.id = undefined
            state.user.username = undefined
            state.user.category = undefined
            state.user.isAuth = false
        }
    }
})

export const { reducer: authReducer, actions: authActions } = authSlice
