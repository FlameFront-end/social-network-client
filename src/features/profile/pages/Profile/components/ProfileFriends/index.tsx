import { type FC } from 'react'
import { StyledProfileFriendsWrapper } from './ProfileFriends.styled.tsx'
import { useGetFriendsByIdQuery } from '../../../../../friends/api/friends.api.ts'
import { Avatar } from 'antd'
import defaultAva from '../../../../../../../public/ava.png'
import { MySkeleton } from '@/kit'

interface Props {
    userId: number
}

const ProfileFriends: FC<Props> = ({ userId }) => {
    const { data: friendsList, isFetching: isFriendsFetching } = useGetFriendsByIdQuery(userId)

    return (
        <>
            {!isFriendsFetching ? <StyledProfileFriendsWrapper>
                <div className="left">
                    <div className="count">{friendsList?.length} {friendsList?.length === 1 ? 'друг' : 'друга'}</div>
                    <div className='mutual'>Нет общих</div>
                </div>
                <div className="right">
                    {friendsList?.map((item, index) => (
                        <Avatar
                            key={index}
                            src={item.ava ?? defaultAva}
                            size={30}
                            className="avatar"
                            style={{ right: `${index * 25}px` }}
                        />
                    ))}
                </div>

            </StyledProfileFriendsWrapper> : <MySkeleton height={63}/>}
        </>
    )
}

export default ProfileFriends
