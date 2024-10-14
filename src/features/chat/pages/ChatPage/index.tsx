import { type FC } from 'react'
import Chat from '../../components/Chat'
import { useLocation } from 'react-router-dom'

const ChatPage: FC = () => {
    const { state } = useLocation()

    return (
        <Chat receiverId={state?.receiverId} senderId={state?.senderId}/>
    )
}

export default ChatPage
