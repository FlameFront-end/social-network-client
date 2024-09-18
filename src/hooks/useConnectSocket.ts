import { useEffect } from 'react'
import SocketApi from '../core/socket-api.ts'

export const useConnectSocket = (): void => {
    const connectSocket = (): void => {
        SocketApi.createConnection()
    }

    useEffect(() => {
        connectSocket()
    }, [])
}
