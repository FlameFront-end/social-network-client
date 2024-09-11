import { useState, useEffect, type FC } from 'react'
import { Input, Button, List } from 'antd'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts'
// import socket from '../../../core/socket.ts'
import { chatActions, fetchMessages, type Message } from '../store/chat.slice.ts'

const Chat: FC = () => {
    const { senderId, receiverId } = useParams<{ senderId: string, receiverId: string }>()
    const [content, setContent] = useState('')
    const dispatch = useAppDispatch()
    const messages = useAppSelector((state) => state.chat.messages)

    // useEffect(() => {
    //     const fetchChatMessages = async (): Promise<void> => {
    //         if (senderId != null && receiverId != null) {
    //             await dispatch(fetchMessages({ userId1: Number(senderId), userId2: Number(receiverId) }))
    //         }
    //     }
    //
    //     void fetchChatMessages()
    //
    //     socket.on('receiveMessage', (message: Message) => {
    //         dispatch(chatActions.addMessage(message))
    //     })
    //
    //     return () => {
    //         socket.off('receiveMessage')
    //     }
    // }, [dispatch, senderId, receiverId])

    const sendMessage = (): void => {
        // if (content.trim() !== '') {
        //     socket.emit('sendMessage', {
        //         senderId: Number(senderId),
        //         receiverId: Number(receiverId),
        //         content
        //     })
        //     setContent('')
        // }
    }

    return (
        <div>
            <List
                bordered
                dataSource={messages}
                renderItem={(message: Message) => (
                    <List.Item>
                        <strong>{message.senderId === Number(senderId) ? 'You' : 'Other'}:</strong> {message.content}
                    </List.Item>
                )}
            />
            <Input
                value={content}
                onChange={(e) => { setContent(e.target.value) }}
                onPressEnter={sendMessage}
                placeholder="Type a message..."
            />
            <Button onClick={sendMessage} type="primary">
                Send
            </Button>
        </div>
    )
}

export default Chat
