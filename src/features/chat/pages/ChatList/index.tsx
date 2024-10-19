import { type FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ChatListSidebar from '../../components/ChatListSidebar'
import Chat from '../../components/Chat'
import { useGetChatsListQuery } from '../../api/chat.api.ts'
import { useAppSelector } from '@/hooks'
import { ChatListStyledWrapper } from './ChatList.styled.tsx'

const findOtherUserId = (activeChat: Collections.Chat | undefined, userId: number): number | undefined => {
    return activeChat?.user1Id === userId ? activeChat?.user2Id : activeChat?.user1Id
}

const ChatList: FC = () => {
    const { state } = useLocation()
    const userId = useAppSelector(state => state.auth.user.id)
    const [activeChatId, setActiveChatId] = useState(0)
    const { data, isFetching } = useGetChatsListQuery(null)
    const [chatsList, setChatsList] = useState<Collections.Chat[]>([])

    useEffect(() => {
        if (data != null && (Boolean(state?.senderId)) && (Boolean(state?.receiverId))) {
            setActiveChatId(getChatByUsersId())
        }

        if (data != null) {
            setChatsList(data)
        }
    }, [data, state?.senderId, state?.receiverId])

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
                chatsList={chatsList}
                setChatsList={setChatsList}
                isFetching={isFetching}
            />

            <div className='chat'>
                <Chat
                    activeChatId={activeChatId}
                    senderId={userId ?? null}
                    receiverId={findOtherUserId(activeChat, userId ?? 0) ?? null}
                />
            </div>

        </ChatListStyledWrapper>
    )
}

export default ChatList
