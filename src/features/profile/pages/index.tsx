import { type FC } from 'react'
import { useGetUserQuery } from '../api/profile.api.ts'
import { useLocation } from 'react-router-dom'
import { Card, Avatar, Typography } from 'antd'
import dayjs from 'dayjs'

const { Title, Text } = Typography

const Profile: FC = () => {
    const { state } = useLocation()
    const { data: user } = useGetUserQuery(state.userId)

    return (
        <Card style={{ width: 300, margin: 'auto', textAlign: 'center' }}>
            {(user != null) && (
                <>
                    <Avatar size={64} src={user.ava} />
                    <Title level={4}>{user.nick}</Title>
                    <Text>Email: {user.email}</Text>
                    <br />
                    <Text>Account Created: {dayjs(user.createdAt)?.format('DD.MM.YYYY')}</Text>
                    <br />
                    {user.isAdmin && <Text>Admin User</Text>}
                </>
            )}
        </Card>
    )
}

export default Profile
