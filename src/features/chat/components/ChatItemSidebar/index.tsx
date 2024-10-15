import type { Dispatch, FC, SetStateAction } from 'react'
import { useAppSelector, useWindowWidth } from '@/hooks'
import { Avatar } from 'antd'
import ava from '../../../../../public/ava.png'
import { StyledChatItemSidebarWrapper } from './ChatItemSidebar.styled.tsx'
import { Flex } from '@/kit'
import { useNavigate } from 'react-router-dom'
import { chatPaths } from '../../routes/chat.paths.ts'

interface Props {
    chat: Collections.Chat
    isActive: boolean
    setActiveChatId: Dispatch<SetStateAction<number>>
    isLastItem: boolean
}

const ChatItemSidebar: FC<Props> = ({ chat, isActive, setActiveChatId, isLastItem }) => {
    const navigate = useNavigate()
    const windowWidth = useWindowWidth()
    const user = useAppSelector(state => state.auth.user)

    const getInterlocutor = (user1: Collections.User, user2: Collections.User): Collections.User => {
        return user1.id === user.id ? user2 : user1
    }

    const handleClick = (): void => {
        if (windowWidth >= 800) {
            setActiveChatId(chat.id)
        } else {
            navigate(chatPaths.chat, { state: { receiverId: chat.user1Id, senderId: chat.user2Id } })
        }
    }

    const interlocutor = getInterlocutor(chat.user1, chat.user2)

    return (
        <StyledChatItemSidebarWrapper className={(isActive ? 'active ' : '') + (isLastItem ? 'last' : '') } onClick={handleClick}>
            <Flex alignItems='center'>
                <div><Avatar src={interlocutor.ava ?? ava} size={50}/></div>
                <Flex direction='column' gap={0}>
                    <div className='full_name'>{interlocutor.surname} {interlocutor.name}</div>
                    <div className='last_message'>{chat.lastMessage}</div>
                </Flex>
            </Flex>
        </StyledChatItemSidebarWrapper>
    )
}

export default ChatItemSidebar
