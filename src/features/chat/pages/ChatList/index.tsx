import { type FC, useEffect, useState } from 'react'
import ChatListSidebar from '../../components/ChatListSidebar'
import Chat from '../../components/Chat'
import Flex from '../../../kit/components/Flex'
import type { Styles } from '../../../../types/global.types.ts'
import { useAppSelector } from '../../../../hooks/useAppSelector.ts'
import { useGetChatsListQuery } from '../../api/chat.api.ts'
import { useLocation } from 'react-router-dom'

const styles: Styles = {
    wrapper: {
        width: '100%',
        height: 'calc(100vh - 32px - 50px)'
    }
}

const findOtherUserInChat = (activeChat: Collections.Chat | undefined, userId: number): Collections.User | undefined => {
    return activeChat?.user1.id === userId ? activeChat?.user2 : activeChat?.user1
}

const ChatList: FC = () => {
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
        <Flex style={styles.wrapper} gap={0}>
            <ChatListSidebar
                setActiveChatId={setActiveChatId}
                activeChatId={activeChatId}
                chatList={chatsList ?? []}
                isFetching={isFetching}
            />
            <Chat
                senderId={userId ?? null}
                receiverId={findOtherUserInChat(activeChat, userId ?? 0)?.id ?? null}
            />
        </Flex>
    )
}

export default ChatList
