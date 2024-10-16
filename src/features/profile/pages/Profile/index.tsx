import { type FC } from 'react'
import { useGetUserQuery } from '../../api/profile.api.ts'
import { useLocation } from 'react-router-dom'
import { useAppSelector, useWindowWidth } from '@/hooks'
import ProfileHeader from './components/ProfileHeader'
import { QRCodeSVG } from 'qrcode.react'
import Cookies from 'js-cookie'
import { FRONTEND_URL } from '@/core'
import { useAuth } from '../../../auth/hooks/useAuth.ts'
import { LogoutButton, LogoutButtonLabel } from '../../../../components/Sidebar/Sidebar.styled.tsx'
import { Flex } from '@/kit'
import ProfilePhotos from './components/ProfilePhotos'
import { StyledProfileWrapper } from './Profile.styled.tsx'
import ProfileFriendsMobile from './components/ProfileFriendsMobile'
import ProfileFriendsDesktop from './components/ProfileFriendsDesktop'

const Profile: FC = () => {
    const { state } = useLocation()
    const { logout } = useAuth()
    const userId = useAppSelector(state => state.auth.user.id)
    const { data: user, isFetching: isFetchingUser } = useGetUserQuery(state?.userId)

    const isMyProfile = state?.userId === userId
    const token = Cookies.get('token')

    const windowWidth = useWindowWidth()

    return (
        <StyledProfileWrapper>
            <Flex direction='column' gap={12}>
                <ProfileHeader user={user} isMyProfile={isMyProfile} isFetchingUser={isFetchingUser}/>
                {windowWidth < 800 && <ProfileFriendsMobile userId={state?.userId}/> }
                <div className="grid">
                    <div className="left">
                        <ProfilePhotos/>
                    </div>

                    <div className="right">
                        <ProfileFriendsDesktop userId={state?.userId}/>
                    </div>
                </div>
            </Flex>

            {(isMyProfile && token) && (
                <>
                    <LogoutButton collapsed={false} onClick={logout}>
                        <LogoutButtonLabel collapsed={false}>Выход</LogoutButtonLabel>
                    </LogoutButton>
                    <QRCodeSVG value={`${FRONTEND_URL}/auth/login?token=${token}`} />
                </>
            )}
        </StyledProfileWrapper>
    )
}

export default Profile
