import { type FC, useEffect, useState } from 'react'
import { Avatar } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useCreateChatMutation, useGetChatsListQuery } from '../../../chat/api/chat.api.ts'
import { chatPaths } from '../../../chat/routes/chat.paths.ts'
import { StyledUserCard } from './UserCard.styled.tsx'
import { useRemoveFriendMutation } from '../../api/friends.api.ts'
import { profilePaths } from '../../../profile/routes/profile.paths.ts'
import { useAppSelector } from '@/hooks'
import { AccentButton, Flex, TextButton } from '@/kit'

import ava from '../../../../../public/ava.png'

interface Props {
    user: Collections.User
    refetchPossible: () => void
    refetchFriends: () => void
}

const FriendCard: FC<Props> = ({ user, refetchPossible, refetchFriends }) => {
    const navigate = useNavigate()
    const myUserId = useAppSelector(state => state.auth.user.id)
    const [createChat] = useCreateChatMutation()
    const [removeFriend] = useRemoveFriendMutation()
    const { data: chatsList } = useGetChatsListQuery(null)

    const [isUserInChat, setIsUserInChat] = useState(false)

    useEffect(() => {
        setIsUserInChat(chatsList?.some((chat) => chat.user1Id === user.id || chat.user2Id === user.id) ?? false)
    }, [])

    const handleCreateChat = async (): Promise<void> => {
        await createChat(user.id).then(() => {
            setIsUserInChat(true)
        })
    }
    const handleDeleteFriend = async (): Promise<void> => {
        await removeFriend(user.id).then(() => {
            refetchPossible()
            refetchFriends()
        })
    }

    return (
        <StyledUserCard>
            <Flex alignItems='center' >
                <div><Avatar size={64} src={user.ava ?? ava}/></div>
                <Flex direction='column'>
                    <div className='full_name' onClick={() => {
                        navigate(profilePaths.profile, { state: { userId: user.id } })
                    }}>
                        {user.name} {user.surname}
                    </div>
                    <AccentButton onClick={() => { void handleDeleteFriend() }}>
                       Удалить из друзей
                    </AccentButton>

                    {!isUserInChat ? <TextButton onClick={() => { void handleCreateChat() }}>
                        Создать чат
                    </TextButton> : <TextButton onClick={() => {
                        navigate(chatPaths.chat_list, { state: { senderId: myUserId, receiverId: user.id } })
                    }}>
                        Перейти в чат
                    </TextButton>}
                </Flex>
            </Flex>
        </StyledUserCard>
    )
}

export default FriendCard
