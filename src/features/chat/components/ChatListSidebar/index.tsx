import { type Dispatch, type FC, type SetStateAction, useEffect } from 'react'
import Chat = Collections.Chat
import { CSpinner } from '@coreui/react-pro'
import ChatItemSidebar from '../ChatItemSidebar'
import { StyledChatListWrapper } from './ChatListSidebar.styled.tsx'

interface ChatListSidebarProps {
    activeChatId: number
    setActiveChatId: Dispatch<SetStateAction<number>>
    chatList: Chat[]
    isFetching: boolean
}

const ChatListSidebar: FC<ChatListSidebarProps> = ({ activeChatId, setActiveChatId, chatList, isFetching }) => {
    useEffect(() => {
        if (chatList != null) {
            setActiveChatId(chatList[0]?.id)
        }
    }, [chatList])

    return (
        <StyledChatListWrapper>
            {!isFetching ? chatList?.map((chat, index) => (
                <ChatItemSidebar
                    chat={chat}
                    key={index}
                    isActive={activeChatId === chat.id}
                    setActiveChatId={setActiveChatId}
                    isLastItem={index === chatList.length - 1}
                />
            )) : <div className='spinner-wrapper'><CSpinner color="secondary"/></div>}
        </StyledChatListWrapper>
    )
}

export default ChatListSidebar
