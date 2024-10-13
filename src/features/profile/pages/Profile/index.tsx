import { type FC } from 'react'
import { useGetUserQuery } from '../../api/profile.api.ts'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from '../../../../hooks/useAppSelector.ts'
import ProfileHeader from '../../components/ProfileHeader'
import { QRCodeSVG } from 'qrcode.react'
import Cookies from 'js-cookie'
import { FRONTEND_URL } from '../../../../core/variables.ts'

const Profile: FC = () => {
    const { state } = useLocation()
    const userId = useAppSelector(state => state.auth.user.id)
    const { data: user } = useGetUserQuery(state.userId)

    const isMyProfile = state.userId === userId
    const token = Cookies.get('token')

    return (
        <>
            {user && (
                <ProfileHeader user={user} isMyProfile={isMyProfile}/>
            )}
            {(isMyProfile && token) && (
                <QRCodeSVG value={`${FRONTEND_URL}/auth/login?token=${token}`} />
            )}
        </>
    )
}

export default Profile
