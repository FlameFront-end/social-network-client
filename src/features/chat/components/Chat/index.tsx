import { useState, useEffect, type FC, useRef, type MutableRefObject } from 'react'
import { List, Input } from 'antd'
import { useAppDispatch } from '../../../../hooks/useAppDispatch.ts'
import { useAppSelector } from '../../../../hooks/useAppSelector.ts'
import { chatActions, fetchMessages } from '../../store/chat.slice.ts'
import socket from '../../../../core/socket.ts'
import Flex from '../../../kit/components/Flex'
import { SendOutlined, AudioOutlined, AudioMutedOutlined, CloseOutlined } from '@ant-design/icons'
import { CSpinner } from '@coreui/react-pro'
import { StyledChatWrapper } from './Chat.styled.tsx'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import Message from '../Message'

interface Props {
    senderId: number | string | null
    receiverId: number | string | null
}

interface Emoji {
    native: string
}

const Chat: FC<Props> = ({ senderId, receiverId }) => {
    const dispatch = useAppDispatch()
    const messages = useAppSelector((state) => state.chat.messages)
    const [content, setContent] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isRecording, setIsRecording] = useState(false)
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [replyToMessage, setReplyToMessage] = useState<Collections.Message | null>(null)
    const [scrollPosition, setScrollPosition] = useState(0)

    const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
    const [audioUrl, setAudioUrl] = useState<string | null>(null)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const bottomWrapper: MutableRefObject<HTMLDivElement | null> = useRef(null)
    const wrapper: MutableRefObject<HTMLDivElement | null> = useRef(null)

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
            }
        }
    }

    const addEmoji = (emoji: Emoji): void => {
        setContent(content + emoji.native)
    }

    const handleScroll = (): void => {
        if (wrapper?.current != null) {
            const scrollHeight = wrapper.current.scrollHeight
            const scrollTop = wrapper.current.scrollTop
            const maxScrollPosition = scrollHeight - wrapper.current.clientHeight
            setScrollPosition(maxScrollPosition - scrollTop)
        }
    }

    const scrollToBottom = (behavior: 'smooth' | 'auto'): void => {
        bottomWrapper.current?.scrollIntoView({ behavior, block: 'end' })
    }

    useEffect(() => {
        const fetchChatMessages = async (): Promise<void> => {
            if (senderId != null && receiverId != null) {
                await dispatch(fetchMessages({ userId1: Number(senderId), userId2: Number(receiverId) })).then(() => {
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 600)
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

    useEffect(() => {
        if (wrapper.current != null) {
            wrapper.current.addEventListener('scroll', handleScroll)
        }

        return () => {
            wrapper?.current?.removeEventListener('scroll', handleScroll)
        }
    }, [wrapper?.current])

    useEffect(() => {
        scrollToBottom('auto')
    }, [messages])

    return (
        <StyledChatWrapper>
            {receiverId !== null ? <>
                {!isLoading ? (
                    <Flex direction="column" justifyContent="space-between" className='wrapper' ref={wrapper}>
                        <List
                            className='list'
                            dataSource={messages}
                            renderItem={(message: Collections.Message) => <Message message={message} setReplyToMessage={setReplyToMessage}/>}
                        />

                        <Flex direction='column' className='bottom_wrapper' ref={bottomWrapper}>
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
                            <Flex alignItems='center' >
                                <Input
                                    value={content}
                                    onChange={(e) => {
                                        setContent(e.target.value)
                                    }}
                                    onPressEnter={sendMessage}
                                    placeholder="Напишите сообщение..."
                                />
                                <button className='btn emoji-btn' onClick={() => { setShowEmojiPicker(!showEmojiPicker) }}>😊</button>
                                {showEmojiPicker && <div className='emoji-picker'><Picker data={data} onEmojiSelect={addEmoji}/></div>}
                                {isRecording ? (
                                    <button className='btn' onClick={stopRecording}>
                                        <AudioMutedOutlined className='icon' />
                                    </button>
                                ) : (
                                    <button className='btn' onClick={startRecording}>
                                        <AudioOutlined className='icon'/>
                                    </button>
                                )}
                                {audioUrl != null && <audio controls src={audioUrl}/>}
                                <button className='btn send' onClick={sendMessage}>
                                    <SendOutlined />
                                </button>
                            </Flex>
                        </Flex>
                    </Flex>
                ) : (
                    <Flex justifyContent="center" alignItems="center" className='wrapper'>
                        <CSpinner color="secondary" />
                    </Flex>
                )}

                {scrollPosition > 1000 && (
                    <button onClick={() => { scrollToBottom('smooth') }} className='btn scroll-btn'/>
                )}
            </> : <div className='no_select_chat'><h3>Выберите кому <br/> вы хотите написать</h3></div>}
        </StyledChatWrapper>
    )
}

export default Chat
