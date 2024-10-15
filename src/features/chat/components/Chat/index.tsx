import { type FC, type MutableRefObject, useEffect, useRef, useState } from 'react'
import { List } from 'antd'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { chatActions, fetchMessages } from '../../store/chat.slice.ts'
import { StyledChatWrapper } from './Chat.styled.tsx'
import Message from '../Message'
import ChatBottom from '../ChatBottom'
import { SocketApi } from '@/core'
import { Flex } from '@/kit'

interface Props {
    senderId: number | string | null
    receiverId: number | string | null
}

const Chat: FC<Props> = ({ senderId, receiverId }) => {
    const dispatch = useAppDispatch()
    const messages = useAppSelector((state) => state.chat.messages)

    const [isLoading, setIsLoading] = useState(true)
    const [replyToMessage, setReplyToMessage] = useState<Collections.Message | null>(null)

    const [scroll, setScroll] = useState(0)

    const scrollBottom: MutableRefObject<HTMLDivElement | null> = useRef(null)
    const wrapper: MutableRefObject<HTMLDivElement | null> = useRef(null)

    const handleScroll = (): void => {
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
        const scrollTop = window.scrollY || window.pageYOffset
        const clientHeight = document.documentElement.clientHeight || window.innerHeight
        const maxScrollPosition = scrollHeight - clientHeight

        const newScrollPosition = maxScrollPosition - scrollTop

        if (Math.abs(scroll - newScrollPosition) > 50) {
            setScroll(newScrollPosition)
        }
    }

    const scrollToBottom = (behavior: 'smooth' | 'auto'): void => {
        window.scrollTo({ top: document.body.scrollHeight, behavior })
    }

    useEffect(() => {
        return () => {
            setReplyToMessage(null)
        }
    }, [receiverId])

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

        SocketApi.socket?.on('receiveMessage', (message: Collections.Message) => {
            dispatch(chatActions.addMessage(message))
        })

        return () => {
            SocketApi.socket?.off('receiveMessage')
        }
    }, [dispatch, senderId, receiverId])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        scrollToBottom('auto')
    }, [messages])

    return (
        <StyledChatWrapper ref={wrapper}>
            {receiverId !== null ? <>
                <Flex direction="column" justifyContent="space-between" className='wrapper-chat'>
                    <List
                        loading={isLoading}
                        className='list'
                        dataSource={messages}
                        renderItem={(message: Collections.Message) => <Message message={message} setReplyToMessage={setReplyToMessage}/>}
                        pagination={false}
                        extra={[]}
                        footer={[]}
                    />

                    <ChatBottom
                        setReplyToMessage={setReplyToMessage}
                        replyToMessage={replyToMessage}
                        senderId={senderId}
                        receiverId={receiverId}
                        scrollBottom={scrollBottom}
                    />
                </Flex>

                {scroll > 300 && (
                    <button onClick={() => { scrollToBottom('smooth') }} className='btn scroll-btn'/>
                )}
            </> : <div className='no_select_chat'><h3>Выберите кому <br/> вы хотите написать</h3></div>}
        </StyledChatWrapper>
    )
}

export default Chat
