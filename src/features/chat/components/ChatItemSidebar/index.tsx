import type { Dispatch, FC, SetStateAction } from 'react'
import { useAppSelector } from '../../../../hooks/useAppSelector.ts'
import Flex from '../../../kit/components/Flex'
import { Avatar } from 'antd'
import ava from '../../../../../public/ava.png'
import { StyledChatItemSidebarWrapper } from './ChatItemSidebar.styled.tsx'

interface Props {
    chat: Collections.Chat
    isActive: boolean
    setActiveChatId: Dispatch<SetStateAction<number>>
    isLastItem: boolean
}

const ChatItemSidebar: FC<Props> = ({ chat, isActive, setActiveChatId, isLastItem }) => {
    const user = useAppSelector(state => state.auth.user)

    const getInterlocutor = (user1: Collections.User, user2: Collections.User): Collections.User => {
        return user1.id === user.id ? user2 : user1
    }

    const interlocutor = getInterlocutor(chat.user1, chat.user2)

    return (
        <StyledChatItemSidebarWrapper className={(isActive ? 'active ' : '') + (isLastItem ? 'last' : '') } onClick={() => { setActiveChatId(chat.id) }}>
            <Flex alignItems='center'>
                <div><Avatar src={interlocutor.ava ?? ava} size={60}/></div>
                <Flex direction='column' gap={0}>
                    <div className='full_name'>{interlocutor.surname} {interlocutor.name}</div>
                    <div className='last_message'>{chat.lastMessage}</div>
                </Flex>
            </Flex>
        </StyledChatItemSidebarWrapper>
    )
}

export default ChatItemSidebar
