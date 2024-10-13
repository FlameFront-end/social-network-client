import { type FC } from 'react'
import { useGetUserQuery } from '../../api/profile.api.ts'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from '../../../../hooks/useAppSelector.ts'
import ProfileHeader from '../../components/ProfileHeader'
import { QRCodeSVG } from 'qrcode.react'
import Cookies from 'js-cookie'
import { FRONTEND_URL } from '../../../../core/variables.ts'
import { useAuth } from '../../../auth/hooks/useAuth.ts'
import { LogoutButton, LogoutButtonLabel } from '../../../../components/Sider/Sidebar.styled.tsx'

const Profile: FC = () => {
    const { state } = useLocation()
    const { logout } = useAuth()
    const userId = useAppSelector(state => state.auth.user.id)
    const { data: user } = useGetUserQuery(state?.userId)

    const isMyProfile = state?.userId === userId
    const token = Cookies.get('token')

    const handleLogoutClick = (): void => {
        logout()
    }

    return (
        <>
            {user && (
                <ProfileHeader user={user} isMyProfile={isMyProfile}/>
            )}
            <LogoutButton collapsed={false} onClick={handleLogoutClick}>
                <LogoutButtonLabel collapsed={false} >Выход</LogoutButtonLabel>
            </LogoutButton>
            {(isMyProfile && token) && (
                <QRCodeSVG value={`${FRONTEND_URL}/auth/login?token=${token}`} />
            )}
        </>
    )
}

export default Profile
