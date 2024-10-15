import {
    type Dispatch,
    type FC,
    type SetStateAction,
    memo,
    useEffect,
    useRef,
    useState
} from 'react'
import { StyledChatBottom } from './ChatBottom.styled.tsx'
import { AudioMutedOutlined, AudioOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import { Flex } from '@/kit'
import { SocketApi } from '@/core'

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
    const [content, setContent] = useState('')
    const [isRecording, setIsRecording] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
    const [audioUrl, setAudioUrl] = useState<string | null>(null)

    const mediaRecorderRef = useRef<MediaRecorder | null>(null)

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

    useEffect(() => {
        if (audioBlob != null) {
            const url = URL.createObjectURL(audioBlob)
            setAudioUrl(url)
        }
    }, [audioBlob])

    const sendMessage = (): void => {
        if (senderId != null && receiverId != null) {
            if (audioBlob != null) {
                void audioBlob.arrayBuffer().then((arrayBuffer) => {
                    SocketApi.socket?.emit('sendMessage', {
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
                SocketApi.socket?.emit('sendMessage', {
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

    return (
        <StyledChatBottom direction='column'>
            {(replyToMessage != null) && (
                <Flex justifyContent='space-between' alignItems='center' className='reply'>
                    <Flex>
                        <div className="separator"/>
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
            <Flex alignItems='center' className='wrapper'>
                <Input
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value)
                    }}
                    onPressEnter={sendMessage}
                    placeholder="Напишите сообщение..."
                />
                <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <button className="btn">😊</button>
                    {isHovered && (
                        <div className="emoji-picker">
                            <Picker data={data} onEmojiSelect={addEmoji}/>
                        </div>
                    )}
                </div>
                {isRecording ? (
                    <button className='btn' onClick={stopRecording}>
                        <AudioMutedOutlined className='icon'/>
                    </button>
                ) : (
                    <button className='btn' onClick={startRecording}>
                        <AudioOutlined className='icon'/>
                    </button>
                )}
                {audioUrl != null && <audio controls src={audioUrl}/>}
                <button className='btn send' onClick={sendMessage}>
                    <SendOutlined/>
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
