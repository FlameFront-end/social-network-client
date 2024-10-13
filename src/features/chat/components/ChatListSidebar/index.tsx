import { type Dispatch, type FC, type SetStateAction, useEffect, useState } from 'react'
import { CSpinner } from '@coreui/react-pro'
import ChatItemSidebar from '../ChatItemSidebar'
import { StyledChatListWrapper } from './ChatListSidebar.styled.tsx'
import { useAppSelector } from '@/hooks'
import { SocketApi } from '@/core'

interface ChatListSidebarProps {
    activeChatId: number
    setActiveChatId: Dispatch<SetStateAction<number>>
    setIsShowSidebar: Dispatch<SetStateAction<boolean>>
    chatList: Collections.Chat[]
    isFetching: boolean
}

const ChatListSidebar: FC<ChatListSidebarProps> = ({ activeChatId, setActiveChatId, chatList, isFetching, setIsShowSidebar }) => {
    const userID = useAppSelector(state => state.auth.user.id)
    const [chats, setChats] = useState<Collections.Chat[]>(chatList)

    useEffect(() => {
        if (chatList.length !== 0) {
            setActiveChatId(chatList[0]?.id)
        }
        setChats(chatList)
    }, [chatList])

    useEffect(() => {
        SocketApi.socket?.emit('join', userID)

        SocketApi.socket?.on('updateChats', (updatedChats: Collections.Chat[]) => {
            setChats(updatedChats)
        })
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
                        setIsShowSidebar={setIsShowSidebar}
                        isLastItem={index === chats.length - 1}
                    />
                )) : <div className='no_chats'><h3>Чатов нет</h3></div>}
            </> : <div className='spinner-wrapper'><CSpinner color="secondary"/></div>}
        </StyledChatListWrapper>
    )
}

export default ChatListSidebar
