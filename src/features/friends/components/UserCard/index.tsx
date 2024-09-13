import { type FC, useEffect, useState } from 'react'
import { Avatar } from 'antd'
import Flex from '../../../kit/components/Flex'
import ava from '../../../../../public/ava.png'
import { useSendFriendRequestMutation } from '../../api/friends.api.ts'
import { useAppSelector } from '../../../../hooks/useAppSelector.ts'

import { StyledUserCard } from './UserCard.styled.tsx'
import AccentButton from '../../../kit/components/Buttons/AccentButton'
import { useCreateChatMutation, useGetChatsListQuery } from '../../../chat/api/chat.api.ts'
import TextButton from '../../../kit/components/Buttons/TextButton'
import { useNavigate } from 'react-router-dom'
import { chatPaths } from '../../../chat/routes/chat.paths.ts'

interface Props {
    user: Collections.User
}

const UserCard: FC<Props> = ({ user }) => {
    const navigate = useNavigate()
    const myUserId = useAppSelector(state => state.auth.user.id)
    const [sendFriendRequest] = useSendFriendRequestMutation()
    const [createChat] = useCreateChatMutation()
    const { data: chatsList } = useGetChatsListQuery(null)

    const [isAlreadySent, setIsAlreadySent] = useState(false)

    useEffect(() => {
        if (myUserId != null) {
            setIsAlreadySent(user.incomingFriendRequests?.includes(myUserId))
        }
    }, [])

    const handleSendFriendRequest = async (): Promise<void> => {
        await sendFriendRequest(user.id).then(() => {
            setIsAlreadySent(true)
        })
    }

    const handleCreateChat = async (): Promise<void> => {
        await createChat({ senderId: myUserId ?? 0, receiverId: user.id })
    }

    const isUserInChat = (userId: number): boolean => {
        return chatsList?.some((chat) => chat.user1Id === userId || chat.user2Id === userId) ?? false
    }

    return (
        <StyledUserCard>
            <Flex alignItems='center' >
                <Avatar size={64} src={user.ava ?? ava}/>
                <Flex direction='column'>
                    <div className='full_name'>
                        {user.name} {user.surname}
                    </div>
                    {!isAlreadySent ? <AccentButton onClick={() => { void handleSendFriendRequest() }}>
                        Добавить в друзья
                    </AccentButton> : <AccentButton onClick={() => { void handleSendFriendRequest() }}>
                       Отозвать запрос
                    </AccentButton>}

                    {!isUserInChat(user.id) ? <TextButton onClick={() => { void handleCreateChat() }}>
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

export default UserCard
