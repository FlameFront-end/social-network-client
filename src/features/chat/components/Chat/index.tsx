import { type FC, type MutableRefObject, useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { List } from 'antd'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { chatActions, fetchMessages } from '../../store/chat.slice.ts'
import { StyledChatWrapper } from './Chat.styled.tsx'
import { SocketApi } from '@/core'
import { Flex } from '@/kit'
import Message from '../Message'
import ChatBottom from '../ChatBottom'
import ChatHeader from '../ChatHeader'

interface Props {
    senderId: number | string | null
    receiverId: number | string | null
}

const Chat: FC<Props> = ({ senderId, receiverId }) => {
    const dispatch = useAppDispatch()
    const messages = useAppSelector((state) => state.chat.messages)

    const [isLoading, setIsLoading] = useState(true)
    const [replyToMessage, setReplyToMessage] = useState<Collections.Message | null>(null)

    const wrapper: MutableRefObject<HTMLDivElement | null> = useRef(null)
    const [scrollPosition, setScrollPosition] = useState(0)

    const handleScroll = useCallback((): void => {
        const list = wrapper.current?.querySelector('.list')

        if (list) {
            const scrollHeight = list.scrollHeight
            const scrollTop = list.scrollTop
            const clientHeight = list.clientHeight
            const maxScrollPosition = scrollHeight - clientHeight

            const newScrollPosition = maxScrollPosition - scrollTop

            setScrollPosition(newScrollPosition)
        }
    }, [])

    const scrollToBottom = useCallback((behavior: 'smooth' | 'auto'): void => {
        const list = wrapper.current?.querySelector('.list')
        list?.scrollTo({ top: document.body.scrollHeight, behavior })
    }, [])

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
        const list = wrapper.current?.querySelector('.list')
        list?.addEventListener('scroll', handleScroll)

        return () => {
            list?.removeEventListener('scroll', handleScroll)
        }
    }, [wrapper?.current])

    useEffect(() => {
        if (wrapper?.current) {
            scrollToBottom('auto')
        }
    }, [messages, scrollToBottom, wrapper?.current])

    const memoizedMessages = useMemo(() => {
        return messages.map((message) => (
            <Message key={message.id} message={message} setReplyToMessage={setReplyToMessage} />
        ))
    }, [messages, setReplyToMessage])

    return (
        <StyledChatWrapper>
            <ChatHeader receiverId={receiverId} senderId={senderId}/>
            {receiverId !== null ? <>
                <Flex direction="column" justifyContent="space-between" className='wrapper-chat' ref={wrapper}>
                    <List
                        className='list'
                        loading={isLoading}
                        dataSource={messages}
                        renderItem={() => null}
                    >
                        {memoizedMessages}
                    </List>

                    <ChatBottom
                        setReplyToMessage={setReplyToMessage}
                        replyToMessage={replyToMessage}
                        senderId={senderId}
                        receiverId={receiverId}
                        scrollToBottom={scrollToBottom}
                    />
                </Flex>

                {scrollPosition > 600 && (
                    <button onClick={() => { scrollToBottom('smooth') }} className='btn scroll-btn'/>
                )}
            </> : <div className='no_select_chat'><h3>Выберите кому <br/> вы хотите написать</h3></div>}
        </StyledChatWrapper>
    )
}

export default Chat
