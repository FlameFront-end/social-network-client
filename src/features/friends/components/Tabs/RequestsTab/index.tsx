import { type FC, type ReactNode, useState } from 'react'
import Flex from '../../../../kit/components/Flex'
import {
    useGetIncomingFriendshipRequestsQuery,
    useGetMyFriendsQuery, useGetOutgoingFriendshipRequestsQuery,
    useGetPossibleFriendsQuery
} from '../../../api/friends.api.ts'
import { CSpinner } from '@coreui/react-pro'
import { StyledRequestsTabWrapper } from './RequestsTab.styled.tsx'
import { TransparentButton } from '@/kit'
import IncomingCard from './Card/IncomingCard'
import OutgoingCard from './Card/OutgoingCard'

const RequestsTab: FC = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0)

    const getTabByIndex = (activeTabIndex: number): ReactNode => {
        switch (activeTabIndex) {
            case 0:
                return <IncomingList/>
            case 1:
                return <OutgoingList/>
            default:
                return <></>
        }
    }

    return (
        <StyledRequestsTabWrapper className='full-height'>
            <div className="tabs">
                <TransparentButton onClick={() => { setActiveTabIndex(0) }} className={`tab-btn ${activeTabIndex === 0 ? 'active' : ''}`}>
                    Входящшие
                </TransparentButton>

                <TransparentButton onClick={() => { setActiveTabIndex(1) }} className={`tab-btn ${activeTabIndex === 1 ? 'active' : ''}`}>
                    Исходящие
                </TransparentButton>
            </div>
            <div className="content">
                {getTabByIndex(activeTabIndex)}
            </div>
        </StyledRequestsTabWrapper>
    )
}

const IncomingList: FC = () => {
    const { data: incomingList, isFetching: isIncomingFetching, refetch: refetchIncoming } = useGetIncomingFriendshipRequestsQuery(null)
    const { refetch: refetchPossible } = useGetPossibleFriendsQuery(null)
    const { refetch: refetchFriends } = useGetMyFriendsQuery(null)

    return (
        <>
            {!isIncomingFetching ? <>
                {((incomingList?.length) !== 0) ? <Flex direction='column' gap={12}>{incomingList?.map((user, index) => (
                    <IncomingCard
                        user={user}
                        key={index}
                        refetchFriends={() => { void refetchFriends() }}
                        refetchPossible={() => { void refetchPossible() }}
                        refetchIncoming={() => { void refetchIncoming() }}
                    />
                ))}</Flex> : <p className='no-data'>У вас нет входящих запросов дружбы</p>}
            </> : <Flex justifyContent='center' alignItems='center'>
                <div className='spinner-wrapper'><CSpinner color="secondary"/></div>
            </Flex>}
        </>
    )
}

const OutgoingList: FC = () => {
    const { data: outgoingList, isFetching: isOutgoingFetching, refetch: refetchOutgoing } = useGetOutgoingFriendshipRequestsQuery(null)
    const { refetch: refetchPossible } = useGetPossibleFriendsQuery(null)

    return (
        <>
            {!isOutgoingFetching ? <>
                {((outgoingList?.length) !== 0) ? <Flex direction='column' gap={12}>{outgoingList?.map((user, index) => (
                    <OutgoingCard
                        user={user}
                        key={index}
                        refetchPossible={() => { void refetchPossible() }}
                        refetchOutgoing={() => { void refetchOutgoing() }}
                    />
                ))}</Flex> : <p className='no-data'>У вас нет исходящих запросов дружбы</p>}
            </> : <Flex justifyContent='center' alignItems='center'>
                <div className='spinner-wrapper'><CSpinner color="secondary"/></div>
            </Flex>}
        </>
    )
}

export default RequestsTab
