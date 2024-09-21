import { type JSX, useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { FloatButton } from 'antd'
import { pathsConfig } from './entities/paths.config.ts'
import { useAppSelector } from '../hooks/useAppSelector.ts'
import { useAppAction } from '../hooks/useAppAction.ts'
import { useNotification } from '../features/notification/hooks/useNotification.tsx'
import { useAuth } from '../features/auth/hooks/useAuth'
import { useConnectSocket } from '../hooks/useConnectSocket.ts'

const RouterProtect = (): JSX.Element => {
    const { isAuth } = useAuth()
    const { pathname } = useLocation()

    const notify = useAppSelector(state => state.notification.notify)
    const { setNotify } = useAppAction()
    const { contextHolder, openNotification } = useNotification()

    useConnectSocket()

    useEffect(() => {
        if (notify?.open === true) {
            openNotification(notify)

            setNotify({ open: false })
        }
    }, [notify?.open])

    if (!isAuth && (pathname !== pathsConfig.login && pathname !== pathsConfig.register)) {
        return <Navigate to={pathsConfig.login} replace />
    }
    if (isAuth && (pathname === pathsConfig.login)) {
        return <Navigate to={pathsConfig.root} replace />
    }

    return (
        <>
            {contextHolder}
            <Outlet />
            <FloatButton.BackTop />
        </>
    )
}

export default RouterProtect
