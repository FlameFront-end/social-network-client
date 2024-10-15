import { type FC } from 'react'
import { useGetUserQuery } from '../../api/profile.api.ts'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from '@/hooks'
import ProfileHeader from '../../components/ProfileHeader'
import { QRCodeSVG } from 'qrcode.react'
import Cookies from 'js-cookie'
import { FRONTEND_URL } from '@/core'
import { useAuth } from '../../../auth/hooks/useAuth.ts'
import { LogoutButton, LogoutButtonLabel } from '../../../../components/Sidebar/Sidebar.styled.tsx'

const Profile: FC = () => {
    const { state } = useLocation()
    const { logout } = useAuth()
    const userId = useAppSelector(state => state.auth.user.id)
    const { data: user } = useGetUserQuery(state?.userId)

    const isMyProfile = state?.userId === userId
    const token = Cookies.get('token')

    return (
        <>
            {user && (
                <ProfileHeader user={user} isMyProfile={isMyProfile}/>
            )}

            {(isMyProfile && token) && (
                <>
                    <LogoutButton collapsed={false} onClick={logout}>
                        <LogoutButtonLabel collapsed={false}>Выход</LogoutButtonLabel>
                    </LogoutButton>
                    <QRCodeSVG value={`${FRONTEND_URL}/auth/login?token=${token}`} />
                </>
            )}
        </>
    )
}

export default Profile
