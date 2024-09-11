import { useState, useEffect, type FC } from 'react'
import { Input, Button, List } from 'antd'
import { useAppDispatch } from '../../../../hooks/useAppDispatch.ts'
import { useAppSelector } from '../../../../hooks/useAppSelector.ts'
import { chatActions, fetchMessages } from '../../store/chat.slice.ts'
import socket from '../../../../core/socket.ts'
import { type Styles } from '../../../../types/global.types.ts'
import Flex from '../../../kit/components/Flex'
import Message = Collections.Message
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { profilePaths } from '../../../profile/routes/profile.paths.ts'
import { SendOutlined } from '@ant-design/icons'
import { CSpinner } from '@coreui/react-pro'

interface Props {
    senderId: number | string
    receiverId: number | string
}

const styles: Styles = {
    wrapper: {
        width: '100%',
        height: 'calc(100vh - 30px)',
        overflowY: 'auto'
    },
    nick: {
        cursor: 'pointer',
        color: 'blue'
    },
    input: {
        marginBottom: '10px'
    }
}

const Chat: FC<Props> = ({ senderId, receiverId }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const messages = useAppSelector((state) => state.chat.messages)
    const [content, setContent] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchChatMessages = async (): Promise<void> => {
            if (senderId != null && receiverId != null) {
                await dispatch(fetchMessages({ userId1: Number(senderId), userId2: Number(receiverId) })).then(() => {
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 300)
                })
            }
        }

        void fetchChatMessages()

        socket.on('receiveMessage', (message: Message) => {
            dispatch(chatActions.addMessage(message))
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
        <>
            {!isLoading ? <Flex direction='column' justifyContent='space-between' style={styles.wrapper}>
                <List
                    bordered
                    dataSource={messages}
                    renderItem={(message: Message) => (
                        <List.Item>
                            <Flex direction='column'>
                                <div>
                                    <strong
                                        style={styles.nick}
                                        onClick={() => { navigate(profilePaths.profile, { state: { userId: message.senderId } }) }}
                                    >
                                        {message?.sender?.name}
                                    </strong>
                                    <span> {dayjs(message?.createdAt)?.format('HH:mm')}</span>
                                </div>
                                <p>{message?.content}</p>
                            </Flex>
                        </List.Item>
                    )}
                />
                <Flex>
                    <Input
                        style={styles.input}
                        value={content}
                        onChange={(e) => { setContent(e.target.value) }}
                        onPressEnter={sendMessage}
                        placeholder="Напишите сообщение..."
                    />
                    <Button onClick={sendMessage} type="primary" icon={<SendOutlined />}>
                        Отправить
                    </Button>
                </Flex>
            </Flex> : <Flex justifyContent='center' alignItems='center' style={styles.wrapper}>
                <CSpinner color="secondary"/>
            </Flex>}
        </>
    )
}

export default Chat
