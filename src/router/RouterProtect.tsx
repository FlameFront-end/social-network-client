import { type JSX, useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { App, Button, Typography, FloatButton } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { pathsConfig } from './entities/paths.config.ts'
import { useAppSelector } from '../hooks/useAppSelector.ts'
import { useAppAction } from '../hooks/useAppAction.ts'
import { useNotification } from '../features/notification/hooks/useNotification.tsx'
import { useAuth } from '../features/auth/hooks/useAuth'
import Flex from '../features/kit/components/Flex'
import socket from '../core/socket.ts'

const RouterProtect = (): JSX.Element => {
    const { isAuth } = useAuth()
    const { pathname } = useLocation()

    const notify = useAppSelector(state => state.notification.notify)
    const { setNotify } = useAppAction()
    const { contextHolder, openNotification } = useNotification()

    const { message } = App.useApp()

    const messageReconnect = (): void => {
        message.destroy('webSocketReconnect')

        void message.open({
            key: 'webSocketReconnect',
            duration: 0,
            style: {
                position: 'absolute',
                top: 8,
                right: 15
            },
            content: (
                <div style={{ textAlign: 'left', width: 380 }}>
                    <Flex gap={0}>
                        <InfoCircleOutlined style={{ color: 'orange', fontSize: 22, marginRight: 12 }} />
                        <Typography.Title level={5} style={{ margin: 0 }}>Websocket fail</Typography.Title>
                    </Flex>
                    <div style={{ padding: '10px 0px 8px 34px' }}>
                        <Typography.Text>
                            <strong>Websocket</strong> has disconnected, you will no longer be able to receive updates, please reconnect.
                        </Typography.Text>
                    </div>

                    <Flex justifyContent={'end'}>
                        <Button
                            type={'primary'}
                            onClick={() => {
                                location.reload()
                            }}
                        >
                            Reconnect
                        </Button>
                    </Flex>
                </div>
            )
        })
    }

    useEffect(() => {
        if (notify?.open === true) {
            openNotification(notify)

            setNotify({ open: false })
        }
    }, [notify?.open])

    useEffect(() => {
        const handleDisconnect = (): void => {
            messageReconnect()
        }

        const handleError = (e: any): void => {
            console.error('Socket error:', e)
            socket.disconnect()
            messageReconnect()
        }

        socket.on('disconnect', handleDisconnect)
        socket.on('error', handleError)

        return () => {
            socket.off('disconnect', handleDisconnect)
            socket.off('error', handleError)
        }
    }, [])

    if (!isAuth && (pathname !== pathsConfig.login && pathname !== pathsConfig.register)) {
        return <Navigate to={pathsConfig.login} replace />
    }
    if (isAuth && (pathname === pathsConfig.login)) {
        return <Navigate to={pathsConfig.root} replace />
    }

    return (
        <>
            {contextHolder}
            <Outlet/>
            <FloatButton.BackTop />
        </>
    )
}

export default RouterProtect
