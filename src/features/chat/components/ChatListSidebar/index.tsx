import { type Dispatch, type FC, type SetStateAction, useEffect } from 'react'
import { CSpinner } from '@coreui/react-pro'
import ChatItemSidebar from '../ChatItemSidebar'
import { StyledChatListWrapper } from './ChatListSidebar.styled.tsx'
import { BACKEND_URL, UPDATE_CHAT } from '@/constants'
import { io } from 'socket.io-client'

interface ChatListSidebarProps {
    activeChatId: number
    setActiveChatId: Dispatch<SetStateAction<number>>
    chatsList: Collections.Chat[]
    setChatsList: Dispatch<SetStateAction<Collections.Chat[]>>
    isFetching: boolean
}

const ChatListSidebar: FC<ChatListSidebarProps> = ({ activeChatId, setActiveChatId, chatsList, setChatsList, isFetching }) => {
    useEffect(() => {
        if (chatsList.length !== 0) {
            setActiveChatId(chatsList[0]?.id)
        }
    }, [chatsList])

    useEffect(() => {
        const socket = io(BACKEND_URL)

        socket.on(UPDATE_CHAT, (updatedChat: Collections.Chat) => {
            setChatsList(prevChats =>
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
                {chatsList.length !== 0 ? chatsList?.map((chat, index) => (
                    <ChatItemSidebar
                        chat={chat}
                        key={index}
                        isActive={activeChatId === chat.id}
                        setActiveChatId={setActiveChatId}
                        isLastItem={index === chatsList.length - 1}
                    />
                )) : <div className='no_chats'><h3>Чатов нет</h3></div>}
            </> : <div className='spinner-wrapper'><CSpinner color="secondary"/></div>}
        </StyledChatListWrapper>
    )
}

export default ChatListSidebar
