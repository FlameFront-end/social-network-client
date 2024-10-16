import { type FC } from 'react'
import { StyledProfileFriendsMobileWrapper } from './ProfileFriendsMobile.styled.tsx'
import { useGetFriendsByIdQuery } from '../../../../../friends/api/friends.api.ts'
import { Avatar, MySkeleton } from '@/kit'

interface Props {
    userId: number
}

const ProfileFriendsMobile: FC<Props> = ({ userId }) => {
    const { data: friendsList, isFetching: isFriendsFetching } = useGetFriendsByIdQuery(userId)

    return (
        <>
            {!isFriendsFetching ? <StyledProfileFriendsMobileWrapper>
                <div className="left-friends-mobile">
                    <div className="count">{friendsList?.length} {friendsList?.length === 1 ? 'друг' : 'друга'}</div>
                    <div className='mutual'>Нет общих</div>
                </div>
                <div className="right-friends-mobile">
                    {friendsList?.map((user, index) => <Avatar key={index} ava={user.ava} size='ultraSmall' />)}
                </div>
            </StyledProfileFriendsMobileWrapper> : <MySkeleton height={63}/>}
        </>
    )
}

export default ProfileFriendsMobile
