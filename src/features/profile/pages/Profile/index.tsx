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
import Post from '../../../posts/components/Post/Post.tsx'
import { useGetMyPostsQuery } from '../../../posts/api/posts.api.ts'
import { CSpinner } from '@coreui/react-pro'

const Profile: FC = () => {
    const { state } = useLocation()
    const { logout } = useAuth()
    const userId = useAppSelector(state => state.auth.user.id)

    const { data: user, isFetching: isFetchingUser } = useGetUserQuery(state?.userId)
    const { data: postsList, isFetching: isFetchingPostsList } = useGetMyPostsQuery(null)

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

                        {!isFetchingPostsList ? <Flex direction='column' gap={12}>
                            {postsList?.map((post) => <Post post={post} key={post.id}/>)}</Flex> : <Flex justifyContent='center' alignItems='center'>
                            <div><CSpinner color="secondary"/></div>
                        </Flex>}

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
