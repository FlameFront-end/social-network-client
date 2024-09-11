import { type Dispatch, type FC, type SetStateAction, useEffect } from 'react'
import { useAppSelector } from '../../../../hooks/useAppSelector.ts'
import User = Collections.User
import Chat = Collections.Chat
import styled from 'styled-components'
import Flex from '../../../kit/components/Flex'
import { Typography } from 'antd'
import { CSpinner } from '@coreui/react-pro'
import ava from '../../../../../public/ava.png'

const { Title, Text } = Typography

interface ChatItemProps {
    chat: Chat
    isActive: boolean
    setActiveChatId: Dispatch<SetStateAction<number>>
    isLastItem: boolean
}

const ChatItem: FC<ChatItemProps> = ({ chat, isActive, setActiveChatId, isLastItem }) => {
    const user = useAppSelector(state => state.auth.user)

    const getInterlocutor = (user1: User, user2: User): User => {
        return user1.id === user.id ? user2 : user1
    }

    const interlocutor = getInterlocutor(chat.user1, chat.user2)

    return (
        <ChatItemWrapper className={(isActive ? 'active ' : '') + (isLastItem ? 'last' : '') } onClick={() => { setActiveChatId(chat.id) }}>
            <Flex alignItems='center'>
                <img className='image' src={interlocutor.ava ?? ava} alt="ava"/>
                <Flex direction='column' gap={0}>
                    <Title level={4}>{interlocutor.surname} {interlocutor.name}</Title>
                    <Text>{chat.lastMessage}</Text>
                </Flex>
            </Flex>
        </ChatItemWrapper>
    )
}

const ChatItemWrapper = styled.div`
    padding: 20px;
    cursor: pointer;
    
    border-bottom: 1px solid gray;
    
    &.last {
        border-bottom: none;
    }
    
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
    isFetching: boolean
}

const ChatListSidebar: FC<ChatListSidebarProps> = ({ activeChatId, setActiveChatId, chatList, isFetching }) => {
    useEffect(() => {
        if (chatList != null) {
            setActiveChatId(chatList[0]?.id)
        }
    }, [chatList])

    return (
        <ChatListWrapper>
            {!isFetching ? chatList?.map((chat, index) => (
                <ChatItem
                    chat={chat}
                    key={index}
                    isActive={activeChatId === chat.id}
                    setActiveChatId={setActiveChatId}
                    isLastItem={index === chatList.length - 1}
                />
            )) : <div className='spinner-wrapper'><CSpinner color="secondary"/></div>}
        </ChatListWrapper>
    )
}

const ChatListWrapper = styled.div`
    height: calc(100vh - 30px);
    overflow-y: auto;
    width: 500px;
    border: 1px solid rgba(5, 5, 5, 0.06);
    border-radius: 10px;
    
    .spinner-wrapper {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

export default ChatListSidebar
