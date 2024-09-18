import { type FC, useEffect, useState } from 'react'
import { Avatar } from 'antd'
import Flex from '../../../kit/components/Flex'
import ava from '../../../../../public/ava.png'
import { useAcceptFriendRequestMutation, useDeclineFriendRequestMutation } from '../../api/friends.api.ts'
import { useAppSelector } from '../../../../hooks/useAppSelector.ts'
import { StyledUserCard } from './UserCard.styled.tsx'
import AccentButton from '../../../kit/components/Buttons/AccentButton'
import { useCreateChatMutation, useGetChatsListQuery } from '../../../chat/api/chat.api.ts'
import TextButton from '../../../kit/components/Buttons/TextButton'
import { useNavigate } from 'react-router-dom'
import { chatPaths } from '../../../chat/routes/chat.paths.ts'
import { profilePaths } from '../../../profile/routes/profile.paths.ts'

interface Props {
    user: Collections.User
    refetchFriends: () => void
    refetchIncoming: () => void
    refetchPossible: () => void
}

const IncomingCard: FC<Props> = ({ user, refetchFriends, refetchIncoming, refetchPossible }) => {
    const navigate = useNavigate()
    const myUserId = useAppSelector(state => state.auth.user.id)
    const [declineFriendRequest] = useDeclineFriendRequestMutation()
    const [acceptFriendRequest] = useAcceptFriendRequestMutation()
    const [createChat] = useCreateChatMutation()
    const { data: chatsList } = useGetChatsListQuery(null)

    const [isUserInChat, setIsUserInChat] = useState(false)

    useEffect(() => {
        setIsUserInChat(chatsList?.some((chat) => chat.user1Id === user.id || chat.user2Id === user.id) ?? false)
    }, [])

    const handleDeclineFriendRequest = async (): Promise<void> => {
        await declineFriendRequest(user.id).then(() => {
            refetchFriends()
            refetchIncoming()
            refetchPossible()
        })
    }

    const handleAcceptFriendRequest = async (): Promise<void> => {
        await acceptFriendRequest(user.id).then(() => {
            refetchFriends()
            refetchIncoming()
        })
    }

    const handleCreateChat = async (): Promise<void> => {
        await createChat(user.id).then(() => {
            setIsUserInChat(true)
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
                    <AccentButton onClick={() => {
                        void handleAcceptFriendRequest()
                    }}>
                        Принять запрос
                    </AccentButton>
                    <AccentButton onClick={() => {
                        void handleDeclineFriendRequest()
                    }}>
                        Отклонить запрос
                    </AccentButton>

                    {!isUserInChat ? <TextButton onClick={() => {
                        void handleCreateChat()
                    }}>
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

export default IncomingCard
