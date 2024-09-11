import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import type { LoginResponse } from '../types/login.types'

interface AuthState {
    user: {
        isAuth: boolean
        token: string | undefined | null
        id: number | undefined
        nick: string | undefined
        ava: string | undefined
    }
}

const user = JSON.parse(Cookies.get('user') ?? '{}') as {
    token?: string
    id?: number
    nick?: string
    ava?: string
}

const initialState: AuthState = {
    user: {
        isAuth: user?.token != null,
        token: user?.token,
        id: user?.id,
        nick: user?.nick,
        ava: user?.ava
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, { payload }: PayloadAction<LoginResponse>) {
            Cookies.set('token', payload.token)
            Cookies.set('user', JSON.stringify(payload))

            state.user = {
                ...payload,
                isAuth: true
            }
        },
        removeUser(state) {
            Cookies.remove('token')
            Cookies.remove('user')

            state.user.token = null
            state.user.id = undefined
            state.user.nick = undefined
            state.user.isAuth = false
            state.user.ava = undefined
        }
    }
})

export const { reducer: authReducer, actions: authActions } = authSlice
