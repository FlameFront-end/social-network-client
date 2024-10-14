import { type FC, useEffect, useState } from 'react'
import { Avatar } from 'antd'
import { useAcceptFriendRequestMutation, useDeclineFriendRequestMutation } from '../../api/friends.api.ts'
import { StyledUserCard } from './UserCard.styled.tsx'
import { useCreateChatMutation, useGetChatsListQuery } from '../../../chat/api/chat.api.ts'
import { useNavigate } from 'react-router-dom'
import { chatPaths } from '../../../chat/routes/chat.paths.ts'
import { profilePaths } from '../../../profile/routes/profile.paths.ts'
import { useAppSelector, useWindowWidth } from '@/hooks'
import { AccentButton, Flex, TextButton } from '@/kit'
import ava from '../../../../../public/ava.png'
import { MessageOutlined } from '@ant-design/icons'

interface Props {
    user: Collections.User
    refetchFriends: () => void
    refetchIncoming: () => void
    refetchPossible: () => void
}

const IncomingCard: FC<Props> = ({ user, refetchFriends, refetchIncoming, refetchPossible }) => {
    const navigate = useNavigate()
    const windowWidth = useWindowWidth()
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

    return (
        <StyledUserCard>
            <Flex alignItems='center' >
                <div><Avatar size={64} src={user.ava ?? ava}/></div>
                <div className='info'>
                    <div className="column">
                        <div className='full_name' onClick={() => {
                            navigate(profilePaths.profile, { state: { userId: user.id } })
                        }}>
                            {user.name} {user.surname}
                        </div>
                        <Flex>
                            <AccentButton onClick={() => {
                                void handleAcceptFriendRequest()
                            }}>
                                Принять
                            </AccentButton>
                            <AccentButton onClick={() => {
                                void handleDeclineFriendRequest()
                            }}>
                                Отклонить
                            </AccentButton>
                        </Flex>
                    </div>

                    {!isUserInChat ? <TextButton onClick={handleCreateChat}>
                        <MessageOutlined className='icon'/>
                    </TextButton> : <TextButton onClick={handleRedirectToChat}>
                        <MessageOutlined className='icon'/>
                    </TextButton>}
                </div>
            </Flex>
        </StyledUserCard>
    )
}

export default IncomingCard
