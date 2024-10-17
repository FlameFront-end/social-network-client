import { type FC, useEffect, useState } from 'react'
import { useAcceptFriendRequestMutation, useDeclineFriendRequestMutation } from '../../../../../api/friends.api.ts'
import { useNavigate } from 'react-router-dom'
import { profilePaths } from '../../../../../../profile/routes/profile.paths.ts'
import { AccentButton, Avatar, Flex } from '@/kit'
import { StyledIncomingCard } from './IncomingCard.styled.tsx'
import TransparentButton from '../../../../../../kit/components/Buttons/TransparentButton'
import { getFullName } from '@/utils'
import { io } from 'socket.io-client'
import { BACKEND_URL, USER_STATUS } from '@/constants'
import type { OnlineStatusResponse } from '../../../../../../../types/global.types.ts'

interface Props {
    user: Collections.User
    refetchFriends: () => void
    refetchIncoming: () => void
    refetchPossible: () => void
}

const IncomingCard: FC<Props> = ({ user, refetchFriends, refetchIncoming, refetchPossible }) => {
    const navigate = useNavigate()
    const [declineFriendRequest] = useDeclineFriendRequestMutation()
    const [acceptFriendRequest] = useAcceptFriendRequestMutation()

    const [onlineStatus, setOnlineStatus] = useState(false)

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
        <StyledIncomingCard>
            <Flex alignItems='center' >
                <Avatar ava={user.ava} size='medium' status={onlineStatus} showStatus />
                <div className='info'>
                    <div className="column">
                        <div className='full_name' onClick={() => { navigate(profilePaths.profile, { state: { userId: user.id } }) }}>
                            {getFullName(user?.surname ?? '', user?.name ?? '', null)}
                        </div>
                        <div className='buttons'>
                            <AccentButton onClick={() => { void handleAcceptFriendRequest() }}>
                                Принять заявку
                            </AccentButton>
                            <TransparentButton onClick={() => { void handleDeclineFriendRequest() }}>
                                Оставить в подписчиках
                            </TransparentButton>
                        </div>
                    </div>
                </div>
            </Flex>
        </StyledIncomingCard>
    )
}

export default IncomingCard
