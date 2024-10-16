import { type FC } from 'react'
import { StyledProfileFriendsDesktopWrapper } from './ProfileFriendsDesktop.styled.tsx'
import { useGetFriendsByIdQuery } from '../../../../../friends/api/friends.api.ts'
import { Avatar, MySkeleton } from '@/kit'
import { useNavigate } from 'react-router-dom'
import { profilePaths } from '../../../../routes/profile.paths.ts'

interface Props {
    userId: number
}

const ProfileFriendsDesktop: FC<Props> = ({ userId }) => {
    const navigate = useNavigate()
    const { data: friendsList, isFetching: isFriendsFetching } = useGetFriendsByIdQuery(userId)

    return (
        <>
            {!isFriendsFetching ? <StyledProfileFriendsDesktopWrapper>
                <div className="count"><span>Друзья</span> {friendsList?.length}</div>
                <ul className="list">
                    {friendsList?.map((user, index) => (
                        <li key={index} className='friend' onClick={() => { navigate(profilePaths.profile, { state: { userId: user.id } }) }}>
                            <Avatar
                                ava={user.ava}
                                size='medium'
                                status={null}
                                showStatus={false}
                                lastSeen={null}
                                showLastSeen={false}
                            />
                            <div className="name">{user.name}</div>
                        </li>
                    ))}
                </ul>
            </StyledProfileFriendsDesktopWrapper> : <MySkeleton height={260} width={345}/>}
        </>
    )
}

export default ProfileFriendsDesktop
