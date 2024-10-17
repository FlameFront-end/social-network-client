import { type FC } from 'react'
import Flex from '../../../../kit/components/Flex'
import { CSpinner } from '@coreui/react-pro'
import {
    useGetOutgoingFriendshipRequestsQuery,
    useGetPossibleFriendsQuery
} from '../../../api/friends.api.ts'
import { Card } from '@/kit'
import PossibleCard from './Card/PossibleCard.tsx'

const PossibleTab: FC = () => {
    const { data: possibleList, isFetching: isPossibleFetching, refetch: refetchPossible } = useGetPossibleFriendsQuery(null)
    const { refetch: refetchOutgoing } = useGetOutgoingFriendshipRequestsQuery(null)

    return (
        <Card className='full-height'>
            {!isPossibleFetching ? <>
                {((possibleList?.length) !== 0) ? <Flex direction='column' gap={12}>{possibleList?.map((user, index) => (
                    <PossibleCard
                        user={user}
                        key={index}
                        refetchPossible={() => { void refetchPossible() }}
                        refetchOutgoing={() => { void refetchOutgoing() }}
                    />
                ))}</Flex> : <p className='no-data'>Список возможных друзей пуст</p>}
            </> : <Flex justifyContent='center' alignItems='center'>
                <div className='spinner-wrapper'><CSpinner color="secondary"/></div>
            </Flex>}
        </Card>
    )
}

export default PossibleTab
