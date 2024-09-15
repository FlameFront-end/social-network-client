import { type FC, useEffect, useState } from 'react'
import { Avatar } from 'antd'
import Flex from '../../../kit/components/Flex'
import ava from '../../../../../public/ava.png'
import { useAppSelector } from '../../../../hooks/useAppSelector.ts'
import AccentButton from '../../../kit/components/Buttons/AccentButton'
import { useCreateChatMutation, useGetChatsListQuery } from '../../../chat/api/chat.api.ts'
import TextButton from '../../../kit/components/Buttons/TextButton'
import { useNavigate } from 'react-router-dom'
import { chatPaths } from '../../../chat/routes/chat.paths.ts'
import { StyledUserCard } from './UserCard.styled.tsx'
import { useRemoveFriendMutation } from '../../api/friends.api.ts'

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
                <Avatar size={64} src={user.ava ?? ava}/>
                <Flex direction='column'>
                    <div className='full_name'>
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
