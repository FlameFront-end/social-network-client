import { chatPaths } from './chat.paths.ts'
import ChatList from '../pages/ChatList'

export const chatRoutes = [
    {
        path: chatPaths.chat_list,
        element: <ChatList/>
    }
]
