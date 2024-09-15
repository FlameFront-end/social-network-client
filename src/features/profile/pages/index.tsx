import { type FC } from 'react'
import { useGetUserQuery } from '../api/profile.api.ts'
import { useLocation } from 'react-router-dom'
import { Card, Avatar, Typography } from 'antd'
import dayjs from 'dayjs'
import Flex from '../../kit/components/Flex'
import ava from '../../../../public/ava.png'
import { getFullName } from '../../../utils/getFullName.ts'

const { Title, Text } = Typography

const Profile: FC = () => {
    const { state } = useLocation()
    const { data: user } = useGetUserQuery(state.userId)

    return (
        <Card style={{ width: 500, margin: 'auto', textAlign: 'center' }}>
            {(user != null) && (
                <Flex direction='column' alignItems='center'>
                    <Avatar size={64} src={user.ava ?? ava} />
                    <Title level={4}>{getFullName(user.surname, user.name, user.patronymic ?? '')}</Title>
                    <Text>Email: {user.email}</Text>
                    <Text>Account Created: {dayjs(user.createdAt)?.format('DD.MM.YYYY')}</Text>
                    {user.isAdmin && <Text>Admin User</Text>}
                </Flex>
            )}
        </Card>
    )
}

export default Profile
