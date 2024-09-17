import { type Dispatch, type FC, type MutableRefObject, type SetStateAction, useEffect, useRef, useState } from 'react'
import { StyledChatBottom } from './ChatBottom.styled.tsx'
import Flex from '../../../kit/components/Flex'
import { AudioMutedOutlined, AudioOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import socket from '../../../../core/socket.ts'

interface Props {
    setReplyToMessage: Dispatch<SetStateAction<Collections.Message | null>>
    replyToMessage: Collections.Message | null
    senderId: number | string | null
    receiverId: number | string | null
    scrollBottom: MutableRefObject<HTMLDivElement | null>
}

interface Emoji {
    native: string
}

const ChatBottom: FC<Props> = ({ replyToMessage, setReplyToMessage, senderId, receiverId, scrollBottom }) => {
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

    const scrollToBottom = (behavior: 'smooth' | 'auto'): void => {
        scrollBottom.current?.scrollIntoView({ behavior, block: 'end' })
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
        if ((senderId != null) && (receiverId != null)) {
            if (audioBlob != null) {
                void audioBlob.arrayBuffer().then((arrayBuffer) => {
                    socket.emit('voice-message', {
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
                socket.emit('sendMessage', {
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
        <StyledChatBottom>
            {(replyToMessage != null) && (
                <Flex justifyContent='space-between' alignItems='center' className='reply'>
                    <Flex>
                        <div className="separator"/>
                        <Flex direction='column' gap={0}>
                            <div className='author'>{replyToMessage.sender.name} {replyToMessage.sender.surname}</div>
                            <div>{replyToMessage.content }</div>
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

export default ChatBottom
