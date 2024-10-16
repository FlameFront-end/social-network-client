import { type Dispatch, type FC, type SetStateAction, useEffect, useState } from 'react'
import { useAppSelector, useWindowWidth } from '@/hooks'
import { StyledChatItemSidebarWrapper } from './ChatItemSidebar.styled.tsx'
import { Avatar, Flex } from '@/kit'
import { useNavigate } from 'react-router-dom'
import { chatPaths } from '../../routes/chat.paths.ts'
import { getFullName } from '@/utils'
import { SocketApi } from '@/core'
import { USER_STATUS, USER_STATUS_RESPONSE } from '@/constants'

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

    const [onlineStatus, setOnlineStatus] = useState(false)
    const [lastSeen, setLastSeen] = useState('')

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

    useEffect(() => {
        const socket = SocketApi?.socket
        const userId = interlocutor?.id

        if (!socket || !userId) return

        socket.emit(USER_STATUS, { userId })

        const handleUserStatusResponse = (data: any): void => {
            if (data.userId === userId) {
                const { isOnline, lastSeen } = data.data
                setOnlineStatus(!!isOnline)
                setLastSeen(lastSeen)
            }
        }

        socket.on(USER_STATUS_RESPONSE, handleUserStatusResponse)

        return () => {
            socket?.off(USER_STATUS_RESPONSE, handleUserStatusResponse)
        }
    }, [interlocutor?.id, SocketApi?.socket])

    return (
        <StyledChatItemSidebarWrapper className={(isActive ? 'active ' : '') + (isLastItem ? 'last' : '') } onClick={handleClick}>
            <Flex alignItems='center'>
                <Avatar
                    ava={interlocutor.ava}
                    size='small'
                    showLastSeen={true}
                    showStatus={true}
                    status={onlineStatus}
                    lastSeen={lastSeen}
                />
                <Flex direction='column'>
                    <div className='full_name'>
                        {getFullName(interlocutor?.surname ?? '', interlocutor?.name ?? '', null)}
                    </div>
                    <div className='last_message'>{chat.lastMessage}</div>
                </Flex>
            </Flex>
        </StyledChatItemSidebarWrapper>
    )
}

export default ChatItemSidebar
