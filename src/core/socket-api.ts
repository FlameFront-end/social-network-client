import { io, type Socket } from 'socket.io-client'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class SocketApi {
    static socket: null | Socket = null

    static createConnection(): void {
        this.socket = io('http://localhost:3000')

        this.socket.on('connect', () => {
            console.log('socket connect')
        })

        this.socket.on('disconnect', () => {
            console.log('socket disconnect')
        })

        this.socket.on('connect_error', () => {
            console.log('socket connect_error')
        })
    }
}

export default SocketApi
