import { io, type Socket } from 'socket.io-client'
import { BACKEND_URL } from './variables.ts'
import Cookies from 'js-cookie'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class SocketApi {
    static socket: null | Socket = null

    static createConnection(): void {
        const token = Cookies.get('token')

        if (token) {
            this.socket = io(BACKEND_URL, {
                query: { token }
            })

            this.socket.on('connect', () => {
                console.log('socket connect')
            })

            this.socket.on('disconnect', () => {
                console.log('socket disconnect')
            })

            this.socket.on('connect_error', () => {
                console.log('socket connect_error')
            })
        } else {
            console.log('No token found')
        }
    }
}
