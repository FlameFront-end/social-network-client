import { type FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateChatMutation, useGetChatsListQuery } from '../../../chat/api/chat.api.ts'
import { chatPaths } from '../../../chat/routes/chat.paths.ts'
import { StyledUserCard } from './UserCard.styled.tsx'
import { useRemoveFriendMutation } from '../../api/friends.api.ts'
import { useAppSelector, useWindowWidth } from '@/hooks'
import { Avatar, Flex, TextButton } from '@/kit'
import { MessageOutlined } from '@ant-design/icons'
import { profilePaths } from '../../../profile/routes/profile.paths.ts'
import { io } from 'socket.io-client'
import { BACKEND_URL } from '@/core'
import { USER_STATUS } from '@/constants'
import { getFullName } from '@/utils'
import { type OnlineStatusResponse } from '../../../../types/global.types.ts'

interface Props {
    user: Collections.User
    refetchPossible: () => void
    refetchFriends: () => void
}

const FriendCard: FC<Props> = ({ user, refetchPossible, refetchFriends }) => {
    const navigate = useNavigate()
    const windowWidth = useWindowWidth()
    const myUserId = useAppSelector(state => state.auth.user.id)
    const [createChat] = useCreateChatMutation()
    const [removeFriend] = useRemoveFriendMutation()
    const { data: chatsList } = useGetChatsListQuery(null)

    const [isUserInChat, setIsUserInChat] = useState(false)

    const [onlineStatus, setOnlineStatus] = useState(false)

    useEffect(() => {
        setIsUserInChat(chatsList?.some((chat) => chat.user1Id === user.id || chat.user2Id === user.id) ?? false)
    }, [])

    const handleCreateChat = (): void => {
        void createChat(user.id).then(() => {
            setIsUserInChat(true)
        }).then(() => {
            if (windowWidth >= 800) {
                navigate(chatPaths.chat_list, { state: { senderId: myUserId, receiverId: user.id } })
            } else {
                navigate(chatPaths.chat, { state: { senderId: myUserId, receiverId: user.id } })
            }
        })
    }

    const handleRedirectToChat = (): void => {
        if (windowWidth >= 800) {
            navigate(chatPaths.chat_list, { state: { senderId: myUserId, receiverId: user.id } })
        } else {
            navigate(chatPaths.chat, { state: { senderId: myUserId, receiverId: user.id } })
        }
    }

    const handleDeleteFriend = async (): Promise<void> => {
        await removeFriend(user.id).then(() => {
            refetchPossible()
            refetchFriends()
        })
    }

    useEffect(() => {
        const socket = io(BACKEND_URL)
        const userId = user?.id

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
        }
    }, [user?.id])

    return (
        <StyledUserCard>
            <Flex alignItems='center' >
                <Avatar ava={user.ava} size='small' status={onlineStatus} showStatus />
                <div className='info'>
                    <div className='full_name' onClick={() => { navigate(profilePaths.profile, { state: { userId: user.id } }) }}>
                        {getFullName(user?.surname ?? '', user?.name ?? '', null)}
                    </div>

                    {!isUserInChat ? <TextButton onClick={handleCreateChat}>
                        <MessageOutlined className='icon'/>
                    </TextButton> : <TextButton onClick={handleRedirectToChat}>
                        <MessageOutlined className='icon'/>
                    </TextButton>}

                    <button style={{ display: 'none' }} onClick={() => { void handleDeleteFriend() }}></button>
                </div>
            </Flex>
        </StyledUserCard>
    )
}

export default FriendCard
