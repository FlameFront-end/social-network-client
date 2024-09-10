import { useState, useEffect, type FC } from 'react'
import { addMessage, fetchMessages } from '../../../../store/chatSlice'
import { Input, Button, List } from 'antd'
import socket from '../../../../core/socket'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { type Message } from '../../../../store/chatSlice'
import { useParams } from 'react-router-dom'

const Chat: FC = () => {
    const { senderId, receiverId } = useParams<{ senderId: string, receiverId: string }>()
    const [content, setContent] = useState('')
    const dispatch = useAppDispatch()
    const messages = useAppSelector((state) => state.chat.messages)

    useEffect(() => {
        const fetchChatMessages = async (): Promise<void> => {
            if (senderId != null && receiverId != null) {
                try {
                    await dispatch(fetchMessages({ userId1: Number(senderId), userId2: Number(receiverId) }))
                } catch (error) {
                    console.error('Failed to fetch messages:', error)
                }
            }
        }

        void fetchChatMessages()

        socket.on('receiveMessage', (message: Message) => {
            dispatch(addMessage(message))
        })

        return () => {
            socket.off('receiveMessage')
        }
    }, [dispatch, senderId, receiverId])

    const sendMessage = (): void => {
        if (content.trim() !== '') {
            socket.emit('sendMessage', {
                senderId: Number(senderId),
                receiverId: Number(receiverId),
                content
            })
            setContent('')
        }
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
