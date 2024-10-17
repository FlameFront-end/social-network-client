import { type FC, useEffect, useState } from 'react'
import { useGetUserQuery } from '../../api/profile.api.ts'
import { useLocation } from 'react-router-dom'
import { useAppSelector, useWindowWidth } from '@/hooks'
import ProfileHeader from './components/ProfileHeader'
import { QRCodeSVG } from 'qrcode.react'
import Cookies from 'js-cookie'
import { FRONTEND_URL, TINYURL_TOKEN } from '@/core'
import { useAuth } from '../../../auth/hooks/useAuth.ts'
import { LogoutButton, LogoutButtonLabel } from '../../../../components/Sidebar/Sidebar.styled.tsx'
import { Flex } from '@/kit'
import ProfilePhotos from './components/ProfilePhotos'
import { StyledProfileWrapper } from './Profile.styled.tsx'
import ProfileFriendsMobile from './components/ProfileFriendsMobile'
import ProfileFriendsDesktop from './components/ProfileFriendsDesktop'
import Post from '../../../posts/components/Post/Post.tsx'
import { CSpinner } from '@coreui/react-pro'
import CreatePost from '../../../posts/components/CreatePost/CreatePost.tsx'
import { useGetUserPostsQuery } from '../../../posts/api/posts.api.ts'
import axios from 'axios'

const Profile: FC = () => {
    const { state } = useLocation()
    const { logout } = useAuth()
    const windowWidth = useWindowWidth()

    const userId = useAppSelector(state => state.auth.user.id)
    const { data: user, isFetching: isFetchingUser } = useGetUserQuery(state?.userId)
    const { data: postsList, isFetching: isFetchingPostsList } = useGetUserPostsQuery(state?.userId)

    const [shortenedUrl, setShortenedUrl] = useState('')

    const isMyProfile = state?.userId === userId
    const token = Cookies.get('token')

    const url = `${FRONTEND_URL}/auth/login?token=${token ?? ''}`

    const shortenUrl = async (): Promise<void> => {
        await axios.post(
            'https://api.tinyurl.com/create',
            { url },
            {
                headers: {
                    Authorization: `Bearer ${TINYURL_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        ).then((r) => {
            setShortenedUrl(r.data.data.tiny_url)
        })
    }

    useEffect(() => {
        void shortenUrl()
    }, [token])

    return (
        <StyledProfileWrapper>
            <Flex direction='column' gap={12}>
                <ProfileHeader user={user} isMyProfile={isMyProfile} isFetchingUser={isFetchingUser}/>
                {windowWidth < 800 && <ProfileFriendsMobile userId={state?.userId}/> }
                <div className="grid">
                    <div className="left">
                        <ProfilePhotos/>
                        <CreatePost/>
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

            {(isMyProfile && token && shortenedUrl) && (
                <>
                    <LogoutButton collapsed={false} onClick={logout}>
                        <LogoutButtonLabel collapsed={false}>Выход</LogoutButtonLabel>
                    </LogoutButton>
                    <QRCodeSVG value={shortenedUrl}/>
                </>
            )}
        </StyledProfileWrapper>
    )
}

export default Profile
