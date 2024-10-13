import { type FC } from 'react'
import { Avatar, Typography } from 'antd'
import Flex from '../../../kit/components/Flex'
import ava from '../../../../../public/ava.png'
import { getFullName } from '../../../../utils/getFullName.ts'
import { StyledProfileHeader } from './ProfileHeader.styled.tsx'
import { useNavigate } from 'react-router-dom'

import { EnvironmentOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { profilePaths } from '../../routes/profile.paths.ts'

const { Title } = Typography

interface Props {
    user: Collections.User
    isMyProfile: boolean
}

const ProfileHeader: FC<Props> = ({ user, isMyProfile }) => {
    const navigate = useNavigate()
    return (
        <StyledProfileHeader>
            {(user != null) && (
                <Flex alignItems='center' justifyContent='space-between'>
                    <Flex alignItems='center'>
                        <div><Avatar size={128} src={user.ava ?? ava}/></div>
                        <Flex direction='column' gap={4}>
                            <Title level={4}>{getFullName(user.surname, user.name, null)}</Title>
                            <Flex>
                                <Flex alignItems='center' gap={4} className="item">
                                    <EnvironmentOutlined/>
                                    Калуга
                                </Flex>
                                <Flex alignItems='center' gap={4} className="item">
                                    <EnvironmentOutlined/>
                                    BSO Real Estate Management (Dubai)
                                </Flex>
                                <Flex alignItems='center' gap={4} className="item detail">
                                    <InfoCircleOutlined/>
                                    Подробнее
                                </Flex>
                            </Flex>
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
