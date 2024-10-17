import { type FC, useEffect, useState } from 'react'
import { useRemoveFriendRequestMutation } from '../../../../../api/friends.api.ts'
import { useNavigate } from 'react-router-dom'
import { profilePaths } from '../../../../../../profile/routes/profile.paths.ts'
import { AccentButton, Avatar, Flex } from '@/kit'
import { StyledOutgoingCard } from './OutgoingCard.styled.tsx'
import { io } from 'socket.io-client'
import { BACKEND_URL, USER_STATUS } from '@/constants'
import type { OnlineStatusResponse } from '../../../../../../../types/global.types.ts'
import { getFullName } from '@/utils'

interface Props {
    user: Collections.User
    refetchPossible: () => void
    refetchOutgoing: () => void
}

const OutgoingCard: FC<Props> = ({ user, refetchPossible, refetchOutgoing }) => {
    const navigate = useNavigate()
    const [removeFriendRequest] = useRemoveFriendRequestMutation()

    const [onlineStatus, setOnlineStatus] = useState(false)

    const handleRemoveFriendRequest = async (): Promise<void> => {
        await removeFriendRequest(user.id).then(() => {
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
        <StyledOutgoingCard>
            <Flex alignItems='center' >
                <Avatar ava={user.ava} size='medium' status={onlineStatus} showStatus />
                <Flex direction='column'>
                    <div className='full_name' onClick={() => { navigate(profilePaths.profile, { state: { userId: user.id } }) }}>
                        {getFullName(user?.surname ?? '', user?.name ?? '', null)}
                    </div>
                    <AccentButton onClick={() => { void handleRemoveFriendRequest() }}>
                        Отменить заявку
                    </AccentButton>
                </Flex>
            </Flex>
        </StyledOutgoingCard>
    )
}

export default OutgoingCard
