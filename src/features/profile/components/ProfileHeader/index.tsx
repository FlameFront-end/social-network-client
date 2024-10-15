import { type FC, useEffect, useState } from 'react'
import { Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
// import { EnvironmentOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { getFullName } from '@/utils'
import { profilePaths } from '../../routes/profile.paths.ts'
import { Flex, Avatar } from '@/kit'
import { StyledProfileHeader } from './ProfileHeader.styled.tsx'
import { SocketApi } from '@/core'
import Cookies from 'js-cookie'
import { useAppSelector } from '@/hooks'

const { Title } = Typography

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
        <StyledProfileHeader>
            {(user != null) && (
                <Flex alignItems='center' justifyContent='space-between'>
                    <Flex alignItems='center'>
                        <Avatar size='large' ava={user.ava} status={onlineStatus} lastSeen={lastSeen}/>
                        <Flex direction='column' gap={4}>
                            <Title level={4}>{getFullName(user.surname, user.name, null)}</Title>
                            {/* <Flex> */}
                            {/*    <Flex alignItems='center' gap={4} className="item"> */}
                            {/*        <EnvironmentOutlined/> */}
                            {/*        Калуга */}
                            {/*    </Flex> */}
                            {/*    <Flex alignItems='center' gap={4} className="item"> */}
                            {/*        <EnvironmentOutlined/> */}
                            {/*        BSO Real Estate Management (Dubai) */}
                            {/*    </Flex> */}
                            {/*    <Flex alignItems='center' gap={4} className="item detail"> */}
                            {/*        <InfoCircleOutlined/> */}
                            {/*        Подробнее */}
                            {/*    </Flex> */}
                            {/* </Flex> */}
                        </Flex>
                    </Flex>
                    {isMyProfile &&
                        <button
                            className='edit'
                            onClick={() => { navigate(profilePaths.edit, { state: { userId: user.id } }) }}
                        >
                            Редактировать профиль
                        </button>
                    }
                </Flex>
            )}
        </StyledProfileHeader>
    )
}

export default ProfileHeader
