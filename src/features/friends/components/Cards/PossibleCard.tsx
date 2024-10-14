import { type FC, useEffect, useState } from 'react'
import { Avatar } from 'antd'
import ava from '../../../../../public/ava.png'
import { useRemoveFriendRequestMutation, useSendFriendRequestMutation } from '../../api/friends.api.ts'
import { StyledUserCard } from './UserCard.styled.tsx'
import { useCreateChatMutation, useGetChatsListQuery } from '../../../chat/api/chat.api.ts'
import { useNavigate } from 'react-router-dom'
import { chatPaths } from '../../../chat/routes/chat.paths.ts'
import { profilePaths } from '../../../profile/routes/profile.paths.ts'
import { useAppSelector, useWindowWidth } from '@/hooks'
import { AccentButton, Flex, TextButton } from '@/kit'
import { MessageOutlined } from '@ant-design/icons'

interface Props {
    user: Collections.User
    refetchPossible: () => void
    refetchOutgoing: () => void
}

const PossibleCard: FC<Props> = ({ user, refetchPossible, refetchOutgoing }) => {
    const navigate = useNavigate()
    const windowWidth = useWindowWidth()
    const myUserId = useAppSelector(state => state.auth.user.id)
    const [sendFriendRequest] = useSendFriendRequestMutation()
    const [removeFriendRequest] = useRemoveFriendRequestMutation()
    const [createChat] = useCreateChatMutation()
    const { data: chatsList } = useGetChatsListQuery(null)

    const [isAlreadySent, setIsAlreadySent] = useState(false)
    const [isUserInChat, setIsUserInChat] = useState(false)

    useEffect(() => {
        if (myUserId != null) {
            setIsAlreadySent(user.incomingFriendRequests?.includes(myUserId))
        }
    }, [])

    useEffect(() => {
        setIsUserInChat(chatsList?.some((chat) => chat.user1Id === user.id || chat.user2Id === user.id) ?? false)
    }, [])

    const handleSendFriendRequest = async (): Promise<void> => {
        await sendFriendRequest(user.id).then(() => {
            setIsAlreadySent(true)
            refetchPossible()
            refetchOutgoing()
        })
    }

    const handleRemoveFriendRequest = async (): Promise<void> => {
        await removeFriendRequest(user.id).then(() => {
            setIsAlreadySent(false)
            refetchPossible()
            refetchOutgoing()
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
                <div><Avatar size={72} src={user.ava ?? ava}/></div>
                <div className='info'>
                    <div className="column">
                        <div className='full_name' onClick={() => {
                            navigate(profilePaths.profile, { state: { userId: user.id } })
                        }}>
                            {user.name} {user.surname}
                        </div>
                        {!isAlreadySent ? <AccentButton onClick={() => {
                            void handleSendFriendRequest()
                        }}>
                            Добавить
                        </AccentButton> : <AccentButton onClick={() => {
                            void handleRemoveFriendRequest()
                        }}>
                            Отозвать
                        </AccentButton>}
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

export default PossibleCard
