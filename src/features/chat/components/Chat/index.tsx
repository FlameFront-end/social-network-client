import { useState, useEffect, type FC, useRef, type MutableRefObject, type Dispatch, type SetStateAction } from 'react'
import { List } from 'antd'
import { useAppDispatch } from '../../../../hooks/useAppDispatch.ts'
import { useAppSelector } from '../../../../hooks/useAppSelector.ts'
import { chatActions, fetchMessages } from '../../store/chat.slice.ts'
import socketApi from '../../../../core/socket-api.ts'
import Flex from '../../../kit/components/Flex'
import { CSpinner } from '@coreui/react-pro'
import { StyledChatWrapper } from './Chat.styled.tsx'
import Message from '../Message'
import ChatBottom from '../ChatBottom'
import PrimaryButton from '../../../kit/components/Buttons/PrimaryButton'

interface Props {
    senderId: number | string | null
    receiverId: number | string | null
    setIsShowSidebar: Dispatch<SetStateAction<boolean>>
}

const Chat: FC<Props> = ({ senderId, receiverId, setIsShowSidebar }) => {
    const dispatch = useAppDispatch()
    const messages = useAppSelector((state) => state.chat.messages)

    const [isLoading, setIsLoading] = useState(true)
    const [replyToMessage, setReplyToMessage] = useState<Collections.Message | null>(null)

    const scrollPosition = useRef(0)

    const scrollBottom: MutableRefObject<HTMLDivElement | null> = useRef(null)
    const wrapper: MutableRefObject<HTMLDivElement | null> = useRef(null)

    const handleScroll = (): void => {
        if (wrapper?.current != null) {
            const scrollHeight = wrapper.current.scrollHeight
            const scrollTop = wrapper.current.scrollTop
            const maxScrollPosition = scrollHeight - wrapper.current.clientHeight

            const newScrollPosition = maxScrollPosition - scrollTop

            if (Math.abs(scrollPosition.current - newScrollPosition) > 50) {
                scrollPosition.current = newScrollPosition
            }
        }
    }

    const scrollToBottom = (behavior: 'smooth' | 'auto'): void => {
        scrollBottom.current?.scrollIntoView({ behavior, block: 'end' })
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

        socketApi.socket?.on('receiveMessage', (message: Collections.Message) => {
            dispatch(chatActions.addMessage(message))
        })

        return () => {
            socketApi.socket?.off('receiveMessage')
        }
    }, [dispatch, senderId, receiverId])

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
            <PrimaryButton onClick={() => { setIsShowSidebar(true) }}>Назад</PrimaryButton>
            {receiverId !== null ? <>
                {!isLoading ? (
                    <Flex direction="column" justifyContent="space-between" className='wrapper-chat' ref={wrapper}>
                        <List
                            className='list'
                            dataSource={messages}
                            renderItem={(message: Collections.Message) => <Message message={message} setReplyToMessage={setReplyToMessage}/>}
                        />

                        <ChatBottom
                            setReplyToMessage={setReplyToMessage}
                            replyToMessage={replyToMessage}
                            senderId={senderId}
                            receiverId={receiverId}
                            scrollBottom={scrollBottom}
                        />

                        <div className='bottom' ref={scrollBottom}/>
                    </Flex>
                ) : (
                    <Flex justifyContent="center" alignItems="center" className='wrapper'>
                        <CSpinner color="secondary"/>
                    </Flex>
                )}

                {scrollPosition.current > 1000 && (
                    <button onClick={() => { scrollToBottom('smooth') }} className='btn scroll-btn'/>
                )}
            </> : <div className='no_select_chat'><h3>Выберите кому <br/> вы хотите написать</h3></div>}
        </StyledChatWrapper>
    )
}

export default Chat
