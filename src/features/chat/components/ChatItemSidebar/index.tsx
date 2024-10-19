import { type Dispatch, type FC, type SetStateAction, useEffect, useState } from 'react'
import { useAppSelector, useWindowWidth } from '@/hooks'
import { StyledChatItemSidebarWrapper } from './ChatItemSidebar.styled.tsx'
import { Avatar, Flex } from '@/kit'
import { useNavigate } from 'react-router-dom'
import { chatPaths } from '../../routes/chat.paths.ts'
import { getFullName } from '@/utils'
import { BACKEND_URL, USER_STATUS } from '@/constants'

import { io } from 'socket.io-client'
import { type OnlineStatusResponse } from '../../../../types/global.types.ts'

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

    const getInterlocutor = (user1: Collections.User, user2: Collections.User): Collections.User => {
        return user1.id === user.id ? user2 : user1
    }

    const handleClick = (): void => {
        if (windowWidth >= 800) {
            setActiveChatId(chat.id)
        } else {
            navigate(chatPaths.chat, { state: { receiverId: getInterlocutor(chat.user1, chat.user2).id, senderId: user.id, chatId: chat.id } })
        }
    }

    const interlocutor = getInterlocutor(chat.user1, chat.user2)

    useEffect(() => {
        const socket = io(BACKEND_URL, {
            query: {
                userId: user.id
            }
        })

        const userId = interlocutor?.id

        if (!userId) return

        const handleUserStatus = (data: OnlineStatusResponse): void => {
            if (data.userId === userId) {
                setOnlineStatus(!!data.data.isOnline)
            }
        }
        socket.emit(USER_STATUS, { userId })
        socket.on(USER_STATUS, handleUserStatus)

        return () => {
            socket?.off(USER_STATUS, handleUserStatus)
            socket?.disconnect()
        }
    }, [interlocutor?.id, chat.id])

    return (
        <StyledChatItemSidebarWrapper className={(isActive ? 'active ' : '') + (isLastItem ? 'last' : '') } onClick={handleClick}>
            <Flex alignItems='center'>
                <Avatar
                    ava={interlocutor.ava}
                    size='small'
                    status={onlineStatus}
                    showStatus
                />
                <Flex direction='column'>
                    <div className='full_name'>
                        {getFullName(interlocutor?.surname ?? '', interlocutor?.name ?? '', null)}
                    </div>
                    {chat.lastMessage !== null && <div className='last_message'>
                        <strong>{chat.lastSenderId === user.id ? 'Вы' : chat.lastSenderName}: </strong>
                        {chat.lastMessage}
                    </div>}
                </Flex>
            </Flex>
            {!isActive && chat.unreadCount > 0 && <div className='unread-count'>{chat.unreadCount}</div>}
        </StyledChatItemSidebarWrapper>
    )
}

export default ChatItemSidebar
