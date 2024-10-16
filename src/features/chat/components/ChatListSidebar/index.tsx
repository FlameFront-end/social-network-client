import { type Dispatch, type FC, type SetStateAction, useEffect, useState } from 'react'
import { CSpinner } from '@coreui/react-pro'
import ChatItemSidebar from '../ChatItemSidebar'
import { StyledChatListWrapper } from './ChatListSidebar.styled.tsx'
import { BACKEND_URL, UPDATE_CHAT } from '@/constants'
import { io } from 'socket.io-client'

interface ChatListSidebarProps {
    activeChatId: number
    setActiveChatId: Dispatch<SetStateAction<number>>
    chatList: Collections.Chat[]
    isFetching: boolean
    senderId: number | null
    receiverId: number | null
}

const ChatListSidebar: FC<ChatListSidebarProps> = ({ activeChatId, setActiveChatId, chatList, isFetching, senderId, receiverId }) => {
    const [chats, setChats] = useState<Collections.Chat[]>(chatList)

    useEffect(() => {
        if (chatList.length !== 0) {
            setActiveChatId(chatList[0]?.id)
        }
        setChats(chatList)
    }, [chatList])

    useEffect(() => {
        const socket = io(BACKEND_URL)

        socket.on(UPDATE_CHAT, (updatedChat: Collections.Chat) => {
            setChats(prevChats =>
                prevChats.map(chat =>
                    chat.id === updatedChat.id
                        ? { ...chat, lastMessage: updatedChat.lastMessage }
                        : chat
                )
            )
        })

        return () => {
            socket.off(UPDATE_CHAT)
        }
    }, [])

    return (
        <StyledChatListWrapper>
            {!isFetching ? <>
                {chats.length !== 0 ? chats?.map((chat, index) => (
                    <ChatItemSidebar
                        chat={chat}
                        key={index}
                        isActive={activeChatId === chat.id}
                        setActiveChatId={setActiveChatId}
                        chatId={activeChatId}
                        isLastItem={index === chats.length - 1}
                        senderId={senderId}
                        receiverId={receiverId}
                    />
                )) : <div className='no_chats'><h3>Чатов нет</h3></div>}
            </> : <div className='spinner-wrapper'><CSpinner color="secondary"/></div>}
        </StyledChatListWrapper>
    )
}

export default ChatListSidebar
