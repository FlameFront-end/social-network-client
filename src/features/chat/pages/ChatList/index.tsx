import { type FC, useState } from 'react'
import ChatListSidebar from '../../components/ChatListSidebar'
import Chat from '../../components/Chat'
import Flex from '../../../kit/components/Flex'
import type { Styles } from '../../../../types/global.types.ts'
import { useAppSelector } from '../../../../hooks/useAppSelector.ts'
import { useGetChatsListQuery } from '../../api/chat.api.ts'

const styles: Styles = {
    wrapper: {
        width: '100%',
        height: 'calc(100vh  - 30px)'
    }
}

const findOtherUserInChat = (activeChat: Collections.Chat | undefined, userId: number): Collections.User | undefined => {
    return activeChat?.user1.id === userId ? activeChat?.user2 : activeChat?.user1
}

const ChatList: FC = () => {
    const userId = useAppSelector(state => state.auth.user.id)
    const [activeChatId, setActiveChatId] = useState(0)
    const { data: chatsList, isFetching } = useGetChatsListQuery(null)

    const activeChat = chatsList?.find(chat => chat.id === activeChatId)

    return (
        <Flex style={styles.wrapper} gap={0}>
            <ChatListSidebar
                setActiveChatId={setActiveChatId}
                activeChatId={activeChatId}
                chatList={chatsList ?? []}
                isFetching={isFetching}
            />
            <Chat
                senderId={userId ?? 0}
                receiverId={findOtherUserInChat(activeChat, userId ?? 0)?.id ?? 0}
            />
        </Flex>
    )
}

export default ChatList
