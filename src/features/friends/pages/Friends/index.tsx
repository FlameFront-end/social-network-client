import { type FC, type ReactNode, useState } from 'react'
import Flex from '../../../kit/components/Flex'
import Card from '../../../kit/components/Card'
import {
    useGetOutgoingFriendshipRequestsQuery,
    useGetPossibleFriendsQuery
} from '../../api/friends.api.ts'
import { CSpinner } from '@coreui/react-pro'
import { StyledFriendsWrapper } from './Friends.styled.tsx'
import PossibleCard from '../../components/Cards/PossibleCard.tsx'
import OutgoingCard from '../../components/Cards/OutgoingCard.tsx'
import { PrimaryButton, TextButton } from '@/kit'
import { FriendsTab, RequestsTab } from '../../components/Tabs'

const Friends: FC = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0)

    const getTabByIndex = (activeTabIndex: number): ReactNode => {
        switch (activeTabIndex) {
            case 0:
                return <FriendsTab/>
            case 1:
                return <RequestsTab/>
            default:
                return <></>
        }
    }

    const tabsBtns = [1, 2, 3, 4]

    const { data: possibleList, isFetching: isPossibleFetching, refetch: refetchPossible } = useGetPossibleFriendsQuery(null)
    const { data: outgoingList, isFetching: isOutgoingFetching, refetch: refetchOutgoing } = useGetOutgoingFriendshipRequestsQuery(null)

    return (
        <StyledFriendsWrapper>
            <Flex gap={24}>
                <div className="tabs-content">
                    {getTabByIndex(activeTabIndex)}
                </div>

                <Flex>
                    {tabsBtns.map((_, index) => <PrimaryButton onClick={() => { setActiveTabIndex(index) }} key={index}>{index}</PrimaryButton>)}
                </Flex>
            </Flex>

            <Card className='card'>
                <Flex direction='column' gap={16}>
                    {!isOutgoingFetching && outgoingList?.length !== 0 ? <Card className='card-wrapper'>
                        <Flex className='card-header' justifyContent='space-between' alignItems='center'>
                            <h3>Исходящие запросы дружбы</h3>
                        </Flex>
                        <Flex flexWrap='wrap'>{outgoingList?.map((user, index) => (
                            <OutgoingCard
                                user={user}
                                key={index}
                                refetchPossible={() => { void refetchPossible() }}
                                refetchOutgoing={() => { void refetchOutgoing() }}
                            />
                        ))}</Flex>
                    </Card> : null}

                    {possibleList?.length !== 0 && <Card className='card-wrapper'>
                        <Flex className='card-header' justifyContent='space-between' alignItems='center'>
                            <h3>Возможные друзья</h3>
                            <TextButton onClick={() => { console.log('show all') }}>Показать все</TextButton>
                        </Flex>
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
                    </Card>}
                </Flex>
            </Card>
        </StyledFriendsWrapper>
    )
}

export default Friends
