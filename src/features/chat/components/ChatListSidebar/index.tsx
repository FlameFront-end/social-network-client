import { type Dispatch, type FC, type SetStateAction, useEffect } from 'react'
import { useAppSelector } from '../../../../hooks/useAppSelector.ts'
import User = Collections.User
import Chat = Collections.Chat
import styled from 'styled-components'
import Flex from '../../../kit/components/Flex'
import { Typography } from 'antd'

const { Title, Text } = Typography

interface ChatItemProps {
    chat: Chat
    isActive: boolean
    setActiveChatId: Dispatch<SetStateAction<number>>
}

const ChatItem: FC<ChatItemProps> = ({ chat, isActive, setActiveChatId }) => {
    const user = useAppSelector(state => state.auth.user)

    const getInterlocutor = (user1: User, user2: User): User => {
        return user1.id === user.id ? user2 : user1
    }

    const interlocutor = getInterlocutor(chat.user1, chat.user2)

    return (
        <ChatItemWrapper className={isActive ? 'active' : ''} onClick={() => { setActiveChatId(chat.id) }}>
            <Flex alignItems='center'>
                <img className='image' src={interlocutor.ava} alt="ava"/>
                <Flex direction='column' gap={0}>
                    <Title level={4}>{interlocutor.nick}</Title>
                    <Text>{chat.lastMessage}</Text>
                </Flex>
            </Flex>
        </ChatItemWrapper>
    )
}

const ChatItemWrapper = styled.div`
    padding: 20px;
    cursor: pointer;
    
    &.active {
        background-color: #91caff;
    }
    
    .image {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
`

interface ChatListSidebarProps {
    activeChatId: number
    setActiveChatId: Dispatch<SetStateAction<number>>
    chatList: Chat[]
}

const ChatListSidebar: FC<ChatListSidebarProps> = ({ activeChatId, setActiveChatId, chatList }) => {
    useEffect(() => {
        if (chatList != null) {
            setActiveChatId(chatList[0]?.id)
        }
    }, [chatList])

    return (
        <ChatListWrapper>
            {chatList?.map((chat, index) => (
                <ChatItem
                    chat={chat}
                    key={index}
                    isActive={activeChatId === chat.id}
                    setActiveChatId={setActiveChatId}
                />
            ))}
        </ChatListWrapper>
    )
}

const ChatListWrapper = styled.div`
    height: calc(100vh - 30px);
    overflow-y: auto;
    width: 500px;
    border: 1px solid rgba(5, 5, 5, 0.06);
    border-radius: 10px;
`

export default ChatListSidebar
