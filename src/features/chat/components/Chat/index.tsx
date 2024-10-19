import { type FC, type MutableRefObject, useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { List } from 'antd'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { chatActions, fetchChatMessages } from '../../store/chat.slice.ts'
import { StyledChatWrapper } from './Chat.styled.tsx'
import { BACKEND_URL, RECEIVE_MESSAGE } from '@/constants'
import { Flex } from '@/kit'
import Message from '../Message'
import ChatBottom from '../ChatBottom'
import ChatHeader from '../ChatHeader'
import { io } from 'socket.io-client'

interface Props {
    activeChatId: number
    senderId: number | string | null
    receiverId: number | string | null
}

const Chat: FC<Props> = ({ activeChatId, senderId, receiverId }) => {
    const dispatch = useAppDispatch()
    const messages = useAppSelector((state) => state.chat.messages)

    const [replyToMessage, setReplyToMessage] = useState<Collections.Message | null>(null)
    const [selectedMessages, setSelectedMessages] = useState<Collections.Message[]>([])
    const [scrollPosition, setScrollPosition] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const wrapper: MutableRefObject<HTMLDivElement | null> = useRef(null)

    const handleSelectMessage = (message: Collections.Message): void => {
        setSelectedMessages((prevMessages) => {
            const isAlreadySelected = prevMessages.some((msg) => msg.id === message.id)

            if (isAlreadySelected) {
                return prevMessages.filter((msg) => msg.id !== message.id)
            } else {
                return [...prevMessages, message]
            }
        })
    }

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
        list?.scrollTo({ top: list.scrollHeight, behavior })
    }, [])

    useEffect(() => {
        return () => {
            setReplyToMessage(null)
        }
    }, [receiverId])

    useEffect(() => {
        const socket = io(BACKEND_URL)

        const fetch = async (): Promise<void> => {
            if (activeChatId) {
                setIsLoading(true)
                await dispatch(fetchChatMessages(activeChatId)).then(() => {
                    setIsLoading(false)
                })
            }
        }

        void fetch()

        socket.on(RECEIVE_MESSAGE, (message: Collections.Message) => {
            if (message.chatId === activeChatId) {
                dispatch(chatActions.addMessage(message))
            }
        })

        return () => {
            socket.off(RECEIVE_MESSAGE)
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
        if (wrapper?.current && messages.length) {
            scrollToBottom('auto')
        }
    }, [wrapper?.current, messages?.length])

    const memoizedMessages = useMemo(() => {
        return messages.map((message) => (
            <Message key={message.id} message={message} handleSelectMessage={handleSelectMessage} selectedMessages={selectedMessages}/>
        ))
    }, [messages, handleSelectMessage, selectedMessages])

    return (
        <StyledChatWrapper>
            <ChatHeader receiverId={receiverId} senderId={senderId}/>
            {activeChatId !== null ? <>
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
                        chatId={activeChatId}
                        selectedMessages={selectedMessages}
                        setSelectedMessages={setSelectedMessages}
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
