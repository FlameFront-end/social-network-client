import { type FC, memo, useEffect, useMemo, useState } from 'react'
import { StyledChatHeader } from './ChatHeader.styled.tsx'
import { useGetUserQuery } from '../../../profile/api/profile.api.ts'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Avatar, Flex } from '@/kit'
import { useNavigate } from 'react-router-dom'
import { pathsConfig } from '@/pathsConfig'
import { getFullName } from '@/utils'
import { SocketApi } from '@/core'
import { USER_STATUS, USER_STATUS_RESPONSE } from '@/constants'

interface Props {
    senderId: number | string | null
    receiverId: number | string | null
}

const ChatHeader: FC<Props> = ({ senderId, receiverId }) => {
    const navigate = useNavigate()

    const [onlineStatus, setOnlineStatus] = useState(false)
    const [lastSeen, setLastSeen] = useState('')

    const interlocutorId = useMemo(() => {
        return Number(receiverId === senderId ? senderId : receiverId)
    }, [receiverId, senderId])

    const { data: user, isFetching } = useGetUserQuery(interlocutorId)

    useEffect(() => {
        const socket = SocketApi?.socket
        const userId = user?.id

        if (!socket || !userId) return

        socket.emit(USER_STATUS, { userId })

        const handleUserStatusResponse = (data: any): void => {
            if (data.userId === userId) {
                const { isOnline, lastSeen } = data.data
                setOnlineStatus(!!isOnline)
                setLastSeen(lastSeen)
            }
        }

        socket.on(USER_STATUS_RESPONSE, handleUserStatusResponse)

        return () => {
            socket?.off(USER_STATUS_RESPONSE, handleUserStatusResponse)
        }
    }, [user?.id, SocketApi?.socket])

    return (
        <StyledChatHeader>
            {!isFetching && <Flex gap={12}>
                <button className='back-mobile' onClick={() => { navigate(pathsConfig.chat_list) }}>
                    <ArrowLeftOutlined/>
                </button>

                <Flex alignItems='center'>
                    <Avatar
                        ava={user?.ava}
                        size='ultraSmall'
                        showLastSeen={false}
                        showStatus={true}
                        status={onlineStatus}
                        lastSeen={lastSeen}
                    />
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
