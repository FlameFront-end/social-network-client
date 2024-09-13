import { type FC } from 'react'
import { Avatar } from 'antd'
import Flex from '../../../kit/components/Flex'
import ava from '../../../../../public/ava.png'
import { useAppSelector } from '../../../../hooks/useAppSelector.ts'
import { StyledFriendCard } from './UserCard.styled.tsx'
import { useCreateChatMutation, useGetChatsListQuery } from '../../../chat/api/chat.api.ts'
import TextButton from '../../../kit/components/Buttons/TextButton'
import { useNavigate } from 'react-router-dom'
import { chatPaths } from '../../../chat/routes/chat.paths.ts'

interface Props {
    user: Collections.User
}

const FriendCard: FC<Props> = ({ user }) => {
    const navigate = useNavigate()
    const myUserId = useAppSelector(state => state.auth.user.id)
    const [createChat] = useCreateChatMutation()
    const { data: chatsList } = useGetChatsListQuery(null)

    const handleCreateChat = async (): Promise<void> => {
        await createChat({ senderId: myUserId ?? 0, receiverId: user.id })
    }

    const isUserInChat = (userId: number): boolean => {
        return chatsList?.some((chat) => chat.user1Id === userId || chat.user2Id === userId) ?? false
    }

    return (
        <StyledFriendCard>
            <Flex alignItems='center' >
                <Avatar size={64} src={user.ava ?? ava}/>
                <Flex direction='column'>
                    <div className='full_name'>
                        {user.name} {user.surname}
                    </div>
                    {!isUserInChat(user.id) ? <TextButton onClick={() => { void handleCreateChat() }}>
                        Создать чат
                    </TextButton> : <TextButton onClick={() => {
                        navigate(chatPaths.chat_list, { state: { senderId: myUserId, receiverId: user.id } })
                    }}>
                        Перейти в чат
                    </TextButton>}
                </Flex>
            </Flex>
        </StyledFriendCard>
    )
}

export default FriendCard
