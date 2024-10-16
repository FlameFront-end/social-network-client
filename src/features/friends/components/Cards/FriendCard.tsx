import { type FC, useEffect, useState } from 'react'
import { Avatar } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useCreateChatMutation, useGetChatsListQuery } from '../../../chat/api/chat.api.ts'
import { chatPaths } from '../../../chat/routes/chat.paths.ts'
import { StyledUserCard } from './UserCard.styled.tsx'
import { useRemoveFriendMutation } from '../../api/friends.api.ts'
import { useAppSelector, useWindowWidth } from '@/hooks'
import { Flex, TextButton } from '@/kit'
import ava from '../../../../../public/ava.png'
import { MessageOutlined } from '@ant-design/icons'
import { profilePaths } from '../../../profile/routes/profile.paths.ts'

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

    return (
        <StyledUserCard>
            <Flex alignItems='center' >
                <div><Avatar size={44} src={user.ava ?? ava}/></div>
                <div className='info'>
                    <div className='full_name' onClick={() => { navigate(profilePaths.profile, { state: { userId: user.id } }) }}>
                        {user.name} {user.surname}
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
