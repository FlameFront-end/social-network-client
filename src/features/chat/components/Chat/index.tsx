import { useState, useEffect, type FC, useRef } from 'react'
import { Input, Button, List, Avatar, Typography } from 'antd'
import { useAppDispatch } from '../../../../hooks/useAppDispatch.ts'
import { useAppSelector } from '../../../../hooks/useAppSelector.ts'
import { chatActions, fetchMessages } from '../../store/chat.slice.ts'
import socket from '../../../../core/socket.ts'
import { type Styles } from '../../../../types/global.types.ts'
import Flex from '../../../kit/components/Flex'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { profilePaths } from '../../../profile/routes/profile.paths.ts'
import { SendOutlined, AudioOutlined, AudioMutedOutlined } from '@ant-design/icons'
import { CSpinner } from '@coreui/react-pro'
import ava from '../../../../../public/ava.png'

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
    bottomWrapper: {
        marginBottom: '10px'
    }
}

const Chat: FC<Props> = ({ senderId, receiverId }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const messages = useAppSelector((state) => state.chat.messages)
    const [content, setContent] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const [isRecording, setIsRecording] = useState(false)
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
    const [audioUrl, setAudioUrl] = useState<string | null>(null)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)

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

        socket.on('receiveMessage', (message: Collections.Message) => {
            dispatch(chatActions.addMessage(message))
        })

        return () => {
            socket.off('receiveMessage')
        }
    }, [dispatch, senderId, receiverId])

    useEffect(() => {
        if (audioBlob != null) {
            const url = URL.createObjectURL(audioBlob)
            setAudioUrl(url)
        }
    }, [audioBlob])

    const startRecording = (): void => {
        setIsRecording(true)
        void navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            const mediaRecorder = new MediaRecorder(stream)
            mediaRecorderRef.current = mediaRecorder
            const chunks: Blob[] = []

            mediaRecorder.addEventListener('dataavailable', (event) => {
                chunks.push(event.data)
            })

            mediaRecorder.addEventListener('stop', () => {
                const blob = new Blob(chunks, { type: 'audio/webm' })
                setAudioBlob(blob)
            })

            mediaRecorder.start()
        })
    }

    const stopRecording = (): void => {
        setIsRecording(false)
        if (mediaRecorderRef.current != null) {
            mediaRecorderRef.current.stop()
        }
    }

    const sendMessage = (): void => {
        if (audioBlob != null) {
            void audioBlob.arrayBuffer().then((arrayBuffer) => {
                socket.emit('voice-message', {
                    audio: arrayBuffer,
                    senderId,
                    receiverId,
                    content: content.trim() !== '' ? content : null
                })
            }).then(() => {
                setAudioUrl(null)
                setAudioBlob(null)
                setContent('')
            })
        } else if (content.trim() !== '') {
            socket.emit('sendMessage', {
                senderId: senderId.toString(),
                receiverId: receiverId.toString(),
                content
            })
            setContent('')
        }
    }

    return (
        <>
            {!isLoading ? (
                <Flex direction="column" justifyContent="space-between" style={styles.wrapper}>
                    <List
                        bordered
                        dataSource={messages}
                        renderItem={(message: Collections.Message) => (
                            <List.Item>
                                <div>
                                    <Flex>
                                        <Avatar size={32} src={message.sender.ava ?? ava} style={{ height: 'max-content' }}/>
                                        <strong
                                            style={styles.nick}
                                            onClick={() => {
                                                navigate(profilePaths.profile, { state: { userId: message.senderId } })
                                            }}
                                        >
                                            {message.sender.name}
                                        </strong>
                                        <span> {dayjs(message.createdAt)?.format('HH:mm')}</span>
                                    </Flex>
                                    <Flex direction="column">
                                        {message.content !== null && <Typography.Text style={{ marginTop: '10px' }}>{message.content}</Typography.Text>}
                                        {message.audioUrl !== null && <audio controls src={message.audioUrl}/>}
                                    </Flex>
                                </div>
                            </List.Item>
                        )}
                    />
                    <Flex alignItems='center' style={styles.bottomWrapper}>
                        <Input
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value)
                            }}
                            onPressEnter={sendMessage}
                            placeholder="Напишите сообщение..."
                        />
                        <div>
                            {isRecording ? (
                                <AudioMutedOutlined onClick={stopRecording}>Stop</AudioMutedOutlined>
                            ) : (
                                <AudioOutlined onClick={startRecording}>Start</AudioOutlined>
                            )}
                        </div>
                        {audioUrl != null && <audio controls src={audioUrl} />}
                        <Button onClick={sendMessage} type="primary" icon={<SendOutlined />}>
                            Отправить
                        </Button>
                    </Flex>
                </Flex>
            ) : (
                <Flex justifyContent="center" alignItems="center" style={styles.wrapper}>
                    <CSpinner color="secondary" />
                </Flex>
            )}
        </>
    )
}

export default Chat
