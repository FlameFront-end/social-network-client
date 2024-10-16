import {
    type Dispatch,
    type FC,
    type SetStateAction,
    memo,
    useEffect,
    useRef,
    useState,
    type ChangeEvent
} from 'react'
import { StyledChatBottom } from './ChatBottom.styled.tsx'
import { AudioMutedOutlined, AudioOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import { Flex } from '@/kit'
import { io, type Socket } from 'socket.io-client'
import { useAppSelector } from '@/hooks'
import { BACKEND_URL } from '@/core'

interface Props {
    setReplyToMessage: Dispatch<SetStateAction<Collections.Message | null>>
    replyToMessage: Collections.Message | null
    senderId: number | string | null
    receiverId: number | string | null
    scrollToBottom: (behavior: 'smooth' | 'auto') => void
}

interface Emoji {
    native: string
}

const ChatBottom: FC<Props> = ({ replyToMessage, setReplyToMessage, senderId, receiverId, scrollToBottom }) => {
    const userId = useAppSelector(state => state.auth.user.id)

    const [content, setContent] = useState('')
    const [isRecording, setIsRecording] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
    const [audioUrl, setAudioUrl] = useState<string | null>(null)

    const [typingUserName, setTypingUserName] = useState<string | null>(null)
    const [typingUserId, setTypingUserId] = useState<number | null>(null)

    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const socketRef = useRef<Socket | null>(null)
    const typingTimerRef = useRef<NodeJS.Timeout | null>(null)

    const notifyTyping = (): void => {
        if (socketRef.current && content) {
            socketRef.current.emit('typing', { senderId: userId })
        }
    }

    const notifyTypingStopped = (): void => {
        if (socketRef.current) {
            socketRef.current.emit('typingStopped', { senderId: userId })
        }
    }

    const handleMouseEnter = (): void => {
        setIsHovered(true)
    }

    const handleMouseLeave = (): void => {
        setIsHovered(false)
    }

    const addEmoji = (emoji: Emoji): void => {
        setContent(content + emoji.native)
    }

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
        notifyTypingStopped()

        if (senderId != null && receiverId != null) {
            if (audioBlob != null) {
                void audioBlob.arrayBuffer().then((arrayBuffer) => {
                    socketRef.current?.emit('sendMessage', {
                        audio: arrayBuffer,
                        senderId,
                        receiverId,
                        content: content.trim() !== '' ? content : null,
                        replyToMessageId: replyToMessage?.id
                    })
                }).then(() => {
                    setAudioUrl(null)
                    setAudioBlob(null)
                    setContent('')
                    setReplyToMessage(null)
                    scrollToBottom('smooth')
                })
            } else if (content.trim() !== '') {
                socketRef.current?.emit('sendMessage', {
                    senderId: senderId.toString(),
                    receiverId: receiverId.toString(),
                    content,
                    replyToMessageId: replyToMessage?.id
                })
                setContent('')
                setReplyToMessage(null)
                scrollToBottom('smooth')
            }
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setContent(e.target.value)
        notifyTyping()

        if (typingTimerRef.current) {
            clearTimeout(typingTimerRef.current)
        }

        typingTimerRef.current = setTimeout(() => {
            notifyTypingStopped()
        }, 3000)
    }

    useEffect(() => {
        socketRef.current = io(BACKEND_URL)

        return () => {
            socketRef.current?.disconnect()
            if (typingTimerRef.current) {
                clearTimeout(typingTimerRef.current)
            }
        }
    }, [])

    useEffect(() => {
        if (audioBlob != null) {
            const url = URL.createObjectURL(audioBlob)
            setAudioUrl(url)
        }
    }, [audioBlob])

    useEffect(() => {
        socketRef.current?.on('typing', (data: any) => {
            setTypingUserName(data.senderName)
            setTypingUserId(data.senderId)
        })

        socketRef.current?.on('typingStopped', () => {
            setTypingUserName(null)
            setTypingUserId(null)
        })

        return () => {
            socketRef.current?.off('typing')
            socketRef.current?.off('typingStopped')
        }
    }, [])

    return (
        <StyledChatBottom direction='column'>
            {(replyToMessage != null) && (
                <Flex justifyContent='space-between' alignItems='center' className='reply'>
                    <Flex>
                        <div className="separator" />
                        <Flex direction='column' gap={0}>
                            <div className='author'>{replyToMessage.sender.name} {replyToMessage.sender.surname}</div>
                            {replyToMessage.content !== null && <div>{replyToMessage.content}</div>}
                            {replyToMessage.audioUrl !== null && <div>Голосовое сообщение</div>}
                        </Flex>
                    </Flex>
                    <button onClick={() => { setReplyToMessage(null) }}>
                        <CloseOutlined />
                    </button>
                </Flex>
            )}

            {typingUserId && (userId !== typingUserId) && <div className='typing'>{typingUserName} печатает...</div>}

            <Flex alignItems='center' className='wrapper'>
                <Input
                    value={content}
                    onChange={handleChange}
                    onPressEnter={sendMessage}
                    placeholder="Напишите сообщение..."
                />
                <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <button className="btn">😊</button>
                    {isHovered && (
                        <div className="emoji-picker">
                            <Picker data={data} onEmojiSelect={addEmoji} />
                        </div>
                    )}
                </div>
                {isRecording ? (
                    <button className='btn' onClick={stopRecording}>
                        <AudioMutedOutlined className='icon' />
                    </button>
                ) : (
                    <button className='btn' onClick={startRecording}>
                        <AudioOutlined className='icon' />
                    </button>
                )}
                {audioUrl != null && <audio controls src={audioUrl} />}
                <button className='btn send' onClick={sendMessage}>
                    <SendOutlined />
                </button>
            </Flex>
        </StyledChatBottom>
    )
}

export default memo(ChatBottom, (prevProps, nextProps) => {
    return (
        prevProps.senderId === nextProps.senderId &&
        prevProps.receiverId === nextProps.receiverId &&
        prevProps.replyToMessage === nextProps.replyToMessage &&
        prevProps.scrollToBottom === nextProps.scrollToBottom
    )
})
