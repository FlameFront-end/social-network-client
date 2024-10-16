import { type FC } from 'react'
import { StyledProfileFriendsMobileWrapper } from './ProfileFriendsMobile.styled.tsx'
import { useGetFriendsByIdQuery } from '../../../../../friends/api/friends.api.ts'
import { Avatar } from 'antd'
import { MySkeleton } from '@/kit'

interface Props {
    userId: number
}

const ProfileFriendsMobile: FC<Props> = ({ userId }) => {
    const { data: friendsList, isFetching: isFriendsFetching } = useGetFriendsByIdQuery(userId)

    return (
        <>
            {!isFriendsFetching ? <StyledProfileFriendsMobileWrapper>
                <div className="left">
                    <div className="count">{friendsList?.length} {friendsList?.length === 1 ? 'друг' : 'друга'}</div>
                    <div className='mutual'>Нет общих</div>
                </div>
                <div className="right">
                    {friendsList?.map((item, index) => (
                        <Avatar
                            key={index}
                            src={item.ava}
                            size={30}
                            className="avatar"
                            style={{ right: `${index * 25}px` }}
                        />
                    ))}
                </div>
            </StyledProfileFriendsMobileWrapper> : <MySkeleton height={63}/>}
        </>
    )
}

export default ProfileFriendsMobile
