import { type FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ChatListSidebar from '../../components/ChatListSidebar'
import Chat from '../../components/Chat'
import { useGetChatsListQuery } from '../../api/chat.api.ts'
import { useAppSelector, useWindowWidth } from '@/hooks'
import { ChatListStyledWrapper } from './ChatList.styled.tsx'

const findOtherUserInChat = (activeChat: Collections.Chat | undefined, userId: number): Collections.User | undefined => {
    return activeChat?.user1.id === userId ? activeChat?.user2 : activeChat?.user1
}

const ChatList: FC = () => {
    const windowWidth = useWindowWidth()
    const { state } = useLocation()
    const userId = useAppSelector(state => state.auth.user.id)
    const [activeChatId, setActiveChatId] = useState(0)
    const { data: chatsList, isFetching, refetch } = useGetChatsListQuery(null)

    useEffect(() => {
        void refetch()
    }, [])

    useEffect(() => {
        if (chatsList != null && (Boolean(state?.senderId)) && (Boolean(state?.receiverId))) {
            setActiveChatId(getChatByUsersId())
        }
    }, [state?.senderId, state?.receiverId])

    const activeChat = chatsList?.find(chat => chat.id === activeChatId)

    const getChatByUsersId = (): number => {
        if (chatsList != null) {
            const chat = chatsList.find(
                (chat) => chat.user1Id === state.senderId && chat.user2Id === state.receiverId
            )
            return chat?.id ?? 0
        }
        return 0
    }

    return (
        <ChatListStyledWrapper gap={0}>
            <ChatListSidebar
                setActiveChatId={setActiveChatId}
                activeChatId={activeChatId}
                chatList={chatsList ?? []}
                isFetching={isFetching}
            />

            {windowWidth >= 800 &&
                <Chat
                    senderId={userId ?? null}
                    receiverId={findOtherUserInChat(activeChat, userId ?? 0)?.id ?? null}
                />
            }
        </ChatListStyledWrapper>
    )
}

export default ChatList
