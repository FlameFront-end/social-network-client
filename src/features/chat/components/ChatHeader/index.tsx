import { type FC, memo, useEffect, useMemo, useState } from 'react'
import { StyledChatHeader } from './ChatHeader.styled.tsx'
import { useGetUserQuery } from '../../../profile/api/profile.api.ts'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Avatar, Flex } from '@/kit'
import { useNavigate } from 'react-router-dom'
import { pathsConfig } from '@/pathsConfig'
import { getFullName } from '@/utils'
import { BACKEND_URL } from '@/core'
import { USER_STATUS } from '@/constants'
import { useAppSelector } from '@/hooks'
import { io } from 'socket.io-client'
import { type OnlineStatusResponse } from '../../../../types/global.types.ts'

interface Props {
    senderId: number | string | null
    receiverId: number | string | null
}

const ChatHeader: FC<Props> = ({ senderId, receiverId }) => {
    const navigate = useNavigate()
    const myId = useAppSelector(state => state.auth.user.id)

    const [onlineStatus, setOnlineStatus] = useState(false)

    const interlocutorId = useMemo(() => {
        return Number(receiverId === senderId ? senderId : receiverId)
    }, [receiverId, senderId])

    const { data: user, isFetching } = useGetUserQuery(interlocutorId)

    useEffect(() => {
        const socket = io(BACKEND_URL)

        if (!receiverId || !senderId || !myId) return

        const userId = myId === receiverId ? Number(senderId) : Number(receiverId)

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
    }, [receiverId, senderId, myId])

    useEffect(() => {
        setOnlineStatus(!!user?.isOnline)
    }, [user?.isOnline])

    return (
        <StyledChatHeader>
            {!isFetching && <Flex gap={12}>
                <button className='back-mobile' onClick={() => { navigate(pathsConfig.chat_list) }}>
                    <ArrowLeftOutlined/>
                </button>

                <Flex alignItems='center'>
                    {!!user && <Avatar
                        ava={user?.ava}
                        size='ultraSmall'
                        status={onlineStatus}
                        lastSeen={null}
                        showLastSeen={false}
                    />}

                    <div className='name'>
                        {getFullName(user?.surname ?? '', user?.name ?? '', null)}
                    </div>
                </Flex>
            </Flex>}
        </StyledChatHeader>
    )
}

export default memo(ChatHeader, (prevProps, nextProps) => {
    return prevProps.senderId === nextProps.senderId && prevProps.receiverId === nextProps.receiverId
})
