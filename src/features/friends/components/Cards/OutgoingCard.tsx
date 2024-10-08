import { type FC, useEffect, useState } from 'react'
import { Avatar } from 'antd'
import Flex from '../../../kit/components/Flex'
import ava from '../../../../../public/ava.png'
import { useRemoveFriendRequestMutation } from '../../api/friends.api.ts'
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
    refetchPossible: () => void
    refetchOutgoing: () => void
}

const OutgoingCard: FC<Props> = ({ user, refetchPossible, refetchOutgoing }) => {
    const navigate = useNavigate()
    const myUserId = useAppSelector(state => state.auth.user.id)
    const [removeFriendRequest] = useRemoveFriendRequestMutation()
    const [createChat] = useCreateChatMutation()
    const { data: chatsList } = useGetChatsListQuery(null)

    const [isUserInChat, setIsUserInChat] = useState(false)

    useEffect(() => {
        setIsUserInChat(chatsList?.some((chat) => chat.user1Id === user.id || chat.user2Id === user.id) ?? false)
    }, [])

    const handleRemoveFriendRequest = async (): Promise<void> => {
        await removeFriendRequest(user.id).then(() => {
            refetchPossible()
            refetchOutgoing()
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
                        void handleRemoveFriendRequest()
                    }}>
                        Отозвать запрос
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

export default OutgoingCard
