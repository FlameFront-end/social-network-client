import { type FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFullName } from '@/utils'
import { profilePaths } from '../../routes/profile.paths.ts'
import { Flex, Avatar, GreyButton } from '@/kit'
import { StyledProfileHeader } from './ProfileHeader.styled.tsx'
import { SocketApi } from '@/core'
import Cookies from 'js-cookie'
import { useAppSelector } from '@/hooks'
import { EnvironmentOutlined, InfoCircleOutlined } from '@ant-design/icons'

interface Props {
    user: Collections.User
    isMyProfile: boolean
}

const ProfileHeader: FC<Props> = ({ user, isMyProfile }) => {
    const navigate = useNavigate()

    const [onlineStatus, setOnlineStatus] = useState(false)
    const [lastSeen, setLastSeen] = useState('')
    const isOnlineMy = useAppSelector(state => state.auth.user.isOnline)
    const lastSeenMy = useAppSelector(state => state.auth.user.lastSeen)

    const token = Cookies.get('token')

    useEffect(() => {
        if (isMyProfile) {
            setOnlineStatus(isOnlineMy)
            setLastSeen(lastSeenMy ?? '')
        } else {
            SocketApi?.socket?.on('user-status', (data) => {
                if (data.userId === user.id) {
                    setOnlineStatus(Boolean(data.data.isOnline))
                    setLastSeen(data.data.lastSeen)
                }
            })
        }
    }, [isMyProfile, token, isOnlineMy, lastSeenMy])

    return (
        <>
            {(user != null) && (
                <StyledProfileHeader>
                    <div className='left'>
                        <Avatar size='large' ava={user.ava} status={onlineStatus} lastSeen={lastSeen}/>
                        <div className='info'>
                            <h2 className='name'>{getFullName(user.surname, user.name, null)}</h2>
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
                                onClick={() => { navigate(profilePaths.edit, { state: { userId: user.id } }) }}
                            >
                                Редактировать профиль
                            </button>
                        }
                    </div>
                </StyledProfileHeader>
            )}
        </>
    )
}

export default ProfileHeader
