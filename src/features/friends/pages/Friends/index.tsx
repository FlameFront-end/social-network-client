import { type FC } from 'react'
import Flex from '../../../kit/components/Flex'
import Card from '../../../kit/components/Card'
import { useGetMyFriendsQuery, useGetPossibleFriendsQuery } from '../../api/friends.api.ts'
import UserCard from '../../components/UserCard'
import { CSpinner } from '@coreui/react-pro'
import { StyledFriendsWrapper } from './Friends.styled.tsx'
import FriendCard from '../../components/FriendCard'

const Friends: FC = () => {
    const { data: possibleFriendsList, isFetching: isPossibleFriendsFetching } = useGetPossibleFriendsQuery(null)
    const { data: friendsList, isFetching: isFriendsFetching } = useGetMyFriendsQuery(null)

    return (
        <StyledFriendsWrapper>
            <Card className='card'>
                <Flex direction='column' gap={12}>
                    <Card>
                        <h3 className='title'>Мои друзья</h3>
                        {!isFriendsFetching ? <Flex flexWrap='wrap'>{friendsList?.map((friend, index) => (
                            <FriendCard user={friend} key={index}/>
                        ))}</Flex> : <Flex justifyContent='center' alignItems='center'>
                            <div className='spinner-wrapper'><CSpinner color="secondary"/></div>
                        </Flex>}
                    </Card>

                    <Card>
                        <h3 className='title'>Возможные друзья</h3>
                        {!isPossibleFriendsFetching ? <Flex flexWrap='wrap'>{possibleFriendsList?.map((possibleFriend, index) => (
                            <UserCard user={possibleFriend} key={index}/>
                        ))}</Flex> : <Flex justifyContent='center' alignItems='center'>
                            <div className='spinner-wrapper'><CSpinner color="secondary"/></div>
                        </Flex>}
                    </Card>
                </Flex>
            </Card>
        </StyledFriendsWrapper>
    )
}

export default Friends
