import { type FC } from 'react'
import { useGetUserQuery } from '../../api/profile.api.ts'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from '../../../../hooks/useAppSelector.ts'
import ProfileHeader from '../../components/ProfileHeader'

const Profile: FC = () => {
    const { state } = useLocation()
    const userId = useAppSelector(state => state.auth.user.id)
    const { data: user } = useGetUserQuery(state.userId)

    const isMyProfile = state.userId === userId

    return (
        <>
            {(user != null) && (
                <ProfileHeader user={user} isMyProfile={isMyProfile}/>
            )}
        </>
    )
}

export default Profile
