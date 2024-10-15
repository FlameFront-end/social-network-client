import { type JSX, useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { FloatButton } from 'antd'
import { useAuth } from '../features/auth/hooks/useAuth'
import MobileNavBottom from '../components/MobileNavBottom'
import { useAppAction, useAppSelector, useConnectSocket } from '@/hooks'
import { pathsConfig } from '@/pathsConfig'
import Cookies from 'js-cookie'
import { io } from 'socket.io-client'
import { BACKEND_URL } from '@/core'

const RouterProtect = (): JSX.Element => {
    const { isAuth } = useAuth()
    const { pathname } = useLocation()
    const { setUser } = useAppAction()

    const userData = useAppSelector(state => state.auth.user)

    useConnectSocket()

    const token = Cookies.get('token')

    useEffect(() => {
        if (token) {
            const socket = io(BACKEND_URL, {
                query: { token }
            })

            socket.on('user-status', (data) => {
                setUser({
                    ...userData,
                    isOnline: data.data.isOnline,
                    lastSeen: data.data.lastSeen
                })
            })

            return () => {
                socket.off('user-status')
            }
        }
    }, [token])

    console.log('userData', userData)

    if (!isAuth && (pathname !== pathsConfig.login && pathname !== pathsConfig.register)) {
        return <Navigate to={pathsConfig.login} replace />
    }

    if (isAuth && (pathname === pathsConfig.login)) {
        return <Navigate to={pathsConfig.root} replace />
    }

    const showNavBottom = pathname !== pathsConfig.login && pathname !== pathsConfig.register && pathname !== pathsConfig.chat

    return (
        <>
            <Outlet />
            <FloatButton.BackTop />
            {showNavBottom && <MobileNavBottom/>}
        </>
    )
}

export default RouterProtect
