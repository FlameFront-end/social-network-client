import { useEffect } from 'react'
import { SocketApi } from '@/core'

export const useConnectSocket = (): void => {
    const connectSocket = (): void => {
        SocketApi.createConnection()
    }

    useEffect(() => {
        connectSocket()
    }, [])
}
