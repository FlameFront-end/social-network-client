import { type JSX } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { FloatButton } from 'antd'
import { useAuth } from '../features/auth/hooks/useAuth'
import MobileNavBottom from '../components/MobileNavBottom'
import { useConnectSocket } from '@/hooks'
import { pathsConfig } from '@/pathsConfig'

const RouterProtect = (): JSX.Element => {
    const { isAuth } = useAuth()
    const { pathname } = useLocation()

    useConnectSocket()

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
