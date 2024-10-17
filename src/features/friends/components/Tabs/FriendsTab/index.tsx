import { type FC } from 'react'
import Flex from '../../../../kit/components/Flex'
import FriendCard from './Card/FriendCard.tsx'
import { CSpinner } from '@coreui/react-pro'
import { useGetMyFriendsQuery, useGetPossibleFriendsQuery } from '../../../api/friends.api.ts'
import { Card } from '@/kit'

const FriendsTab: FC = () => {
    const { data: friendsList, isFetching: isFriendsFetching, refetch: refetchFriends } = useGetMyFriendsQuery(null)
    const { refetch: refetchPossible } = useGetPossibleFriendsQuery(null)

    return (
        <Card className='full-height'>
            {!isFriendsFetching ? <>
                {((friendsList?.length) !== 0) ? <Flex direction='column' gap={12}>{friendsList?.map((friend, index) => (
                    <FriendCard
                        user={friend}
                        key={index}
                        refetchPossible={() => { void refetchPossible() }}
                        refetchFriends={() => { void refetchFriends() }}
                    />
                ))}</Flex> : <p>Вы ещё не добавили ни одного друга</p>}
            </> : <Flex justifyContent='center' alignItems='center'>
                <div className='spinner-wrapper'><CSpinner color="secondary"/></div>
            </Flex>}
        </Card>
    )
}

export default FriendsTab
