import { type FC } from 'react'
import Flex from '../../../kit/components/Flex'
import Card from '../../../kit/components/Card'
import {
    useGetIncomingFriendshipRequestsQuery,
    useGetMyFriendsQuery,
    useGetOutgoingFriendshipRequestsQuery,
    useGetPossibleFriendsQuery
} from '../../api/friends.api.ts'
import { CSpinner } from '@coreui/react-pro'
import { StyledFriendsWrapper } from './Friends.styled.tsx'
import FriendCard from '../../components/Cards/FriendCard.tsx'
import PossibleCard from '../../components/Cards/PossibleCard.tsx'
import OutgoingCard from '../../components/Cards/OutgoingCard.tsx'
import IncomingCard from '../../components/Cards/IncomingCard.tsx'

const Friends: FC = () => {
    const { data: possibleList, isFetching: isPossibleFetching, refetch: refetchPossible } = useGetPossibleFriendsQuery(null)
    const { data: friendsList, isFetching: isFriendsFetching, refetch: refetchFriends } = useGetMyFriendsQuery(null)
    const { data: incomingList, isFetching: isIncomingFetching, refetch: refetchIncoming } = useGetIncomingFriendshipRequestsQuery(null)
    const { data: outgoingList, isFetching: isOutgoingFetching, refetch: refetchOutgoing } = useGetOutgoingFriendshipRequestsQuery(null)

    return (
        <StyledFriendsWrapper>
            <Card className='card'>
                <Flex direction='column' gap={12}>
                    {!isIncomingFetching && incomingList?.length !== 0 ? <Card>
                        <h3>Входящие запросы дружбы</h3>
                        <Flex flexWrap='wrap'>{incomingList?.map((user, index) => (
                            <IncomingCard
                                user={user}
                                key={index}
                                refetchFriends={() => { void refetchFriends() }}
                                refetchPossible={() => { void refetchPossible() }}
                                refetchIncoming={() => { void refetchIncoming() }}
                            />
                        ))}</Flex>
                    </Card> : null}

                    {!isOutgoingFetching && outgoingList?.length !== 0 ? <Card>
                        <h3>Исходящие запросы дружбы</h3>
                        <Flex flexWrap='wrap'>{outgoingList?.map((user, index) => (
                            <OutgoingCard
                                user={user}
                                key={index}
                                refetchPossible={() => { void refetchPossible() }}
                                refetchOutgoing={() => { void refetchOutgoing() }}
                            />
                        ))}</Flex>
                    </Card> : null}

                    <Card>
                        <h3>Мои друзья</h3>
                        {!isFriendsFetching ? <>
                            {((friendsList?.length) !== 0) ? <Flex flexWrap='wrap'>{friendsList?.map((friend, index) => (
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

                    <Card>
                        <h3>Возможные друзья</h3>
                        {!isPossibleFetching ? <Flex flexWrap='wrap'>{possibleList?.map((user, index) => (
                            <PossibleCard
                                user={user}
                                key={index}
                                refetchPossible={() => { void refetchPossible() }}
                                refetchOutgoing={() => { void refetchOutgoing() }}
                            />
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
