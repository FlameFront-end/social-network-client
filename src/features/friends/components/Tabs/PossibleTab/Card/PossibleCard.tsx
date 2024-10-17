import { type FC, useEffect, useState } from 'react'
import { useSendFriendRequestMutation } from '../../../../api/friends.api.ts'
import { useNavigate } from 'react-router-dom'
import { profilePaths } from '../../../../../profile/routes/profile.paths.ts'
import { AccentButton, Avatar, Flex } from '@/kit'
import { StyledPossibleCard } from './PossibleCard.styled.tsx'
import { getFullName } from '@/utils'
import { io } from 'socket.io-client'
import { BACKEND_URL, USER_STATUS } from '@/constants'
import type { OnlineStatusResponse } from '../../../../../../types/global.types.ts'

interface Props {
    user: Collections.User
    refetchPossible: () => void
    refetchOutgoing: () => void
}

const PossibleCard: FC<Props> = ({ user, refetchPossible, refetchOutgoing }) => {
    const navigate = useNavigate()
    const [sendFriendRequest] = useSendFriendRequestMutation()

    const [onlineStatus, setOnlineStatus] = useState(false)

    const handleSendFriendRequest = async (): Promise<void> => {
        await sendFriendRequest(user.id).then(() => {
            refetchPossible()
            refetchOutgoing()
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
        <StyledPossibleCard>
            <Flex alignItems='center' >
                <Avatar ava={user.ava} size='medium' status={onlineStatus} showStatus />
                <div className='info'>
                    <div className="column">
                        <div className='full_name' onClick={() => { navigate(profilePaths.profile, { state: { userId: user.id } }) }}>
                            {getFullName(user?.surname ?? '', user?.name ?? '', null)}
                        </div>

                        <AccentButton onClick={() => { void handleSendFriendRequest() }}>
                            Добавить в друзья
                        </AccentButton>
                    </div>
                </div>
            </Flex>
        </StyledPossibleCard>
    )
}

export default PossibleCard
