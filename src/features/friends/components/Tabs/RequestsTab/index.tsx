import { type FC, type ReactNode, useState } from 'react'
import Flex from '../../../../kit/components/Flex'
import {
    useGetIncomingFriendshipRequestsQuery,
    useGetMyFriendsQuery,
    useGetPossibleFriendsQuery
} from '../../../api/friends.api.ts'
import IncomingCard from './Card/IncomingCard.tsx'
import { CSpinner } from '@coreui/react-pro'
import { StyledRequestsTabWrapper } from './RequestsTab.styled.tsx'
import { TransparentButton } from '@/kit'

const RequestsTab: FC = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0)

    const getTabByIndex = (activeTabIndex: number): ReactNode => {
        switch (activeTabIndex) {
            case 0:
                return <IncomingList/>
            case 1:
                return <></>
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
                ))}</Flex> : <p>У вас нету входяших запросов дружбы</p>}
            </> : <Flex justifyContent='center' alignItems='center'>
                <div className='spinner-wrapper'><CSpinner color="secondary"/></div>
            </Flex>}
        </>
    )
}

export default RequestsTab
