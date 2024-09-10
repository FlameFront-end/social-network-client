import { chatPaths } from './chat.paths.ts'
import Chat from '../pages/index.tsx'

export const chatRoutes = [
    {
        path: chatPaths.chat,
        element: <Chat/>
    }
]
