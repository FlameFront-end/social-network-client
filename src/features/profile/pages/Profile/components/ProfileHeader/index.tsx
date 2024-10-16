import { type FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFullName } from '@/utils'
import { profilePaths } from '../../../../routes/profile.paths.ts'
import { Flex, Avatar, GreyButton } from '@/kit'
import { StyledProfileHeader } from './ProfileHeader.styled.tsx'
import { SocketApi } from '@/core'
import { useAppSelector } from '@/hooks'
import { EnvironmentOutlined, InfoCircleOutlined } from '@ant-design/icons'
import MySkeleton from '../../../../../kit/components/MySkeleton'
import { USER_STATUS, USER_STATUS_RESPONSE } from '@/constants'

interface Props {
    user: Collections.User | undefined
    isMyProfile: boolean
    isFetchingUser: boolean
}

const ProfileHeader: FC<Props> = ({ user, isMyProfile, isFetchingUser }) => {
    const navigate = useNavigate()

    const [onlineStatus, setOnlineStatus] = useState(false)
    const [lastSeen, setLastSeen] = useState('')
    const isOnlineMy = useAppSelector(state => state.auth.user.isOnline)
    const lastSeenMy = useAppSelector(state => state.auth.user.lastSeen)

    useEffect(() => {
        if (isMyProfile) {
            setOnlineStatus(isOnlineMy)
            setLastSeen(lastSeenMy ?? '')
        } else {
            const userId = user?.id

            if (!SocketApi?.socket || !userId) return

            SocketApi.socket.emit(USER_STATUS, { userId })

            const handleUserStatusResponse = (data: any): void => {
                if (data.userId === userId) {
                    const { isOnline, lastSeen } = data.data
                    setOnlineStatus(!!isOnline)
                    setLastSeen(lastSeen)
                }
            }

            SocketApi.socket.on(USER_STATUS, handleUserStatusResponse)

            return () => {
                SocketApi.socket?.off(USER_STATUS_RESPONSE, handleUserStatusResponse)
            }
        }
    }, [isMyProfile, isOnlineMy, lastSeenMy, user?.id])

    return (
        <>
            {!isFetchingUser ? (
                <StyledProfileHeader>
                    <div className='left'>
                        <Avatar size='large' ava={user?.ava} status={onlineStatus} lastSeen={lastSeen}/>
                        <div className='info'>
                            <h2 className='name'>{getFullName(user?.surname ?? '', user?.name ?? '', null)}</h2>
                            <div className='status'>тут статус</div>
                            <div className='list'>
                                <Flex alignItems='center' gap={4} className="item">
                                    <EnvironmentOutlined/>
                                    Калуга
                                </Flex>
                                <Flex alignItems='center' gap={4} className="item">
                                    <EnvironmentOutlined/>
                                    BSO
                                </Flex>
                                <Flex alignItems='center' gap={4} className="item detail">
                                    <InfoCircleOutlined/>
                                    Подробнее
                                </Flex>
                            </div>
                            <GreyButton
                                onClick={() => { console.log('опубликовать') }}
                                className='public'
                            >
                                Опубликовать
                            </GreyButton>
                        </div>
                    </div>

                    <div className="right">
                        {isMyProfile &&
                            <button
                                className='edit'
                                onClick={() => { navigate(profilePaths.edit, { state: { userId: user?.id } }) }}
                            >
                                Редактировать профиль
                            </button>
                        }
                    </div>
                </StyledProfileHeader>
            ) : <MySkeleton height={170} />}
        </>
    )
}

export default ProfileHeader
