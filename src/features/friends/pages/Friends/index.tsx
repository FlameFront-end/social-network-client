import { type FC } from 'react'
import Flex from '../../../kit/components/Flex'
import Card from '../../../kit/components/Card'
import { useGetOtherUsersQuery } from '../../api/friends.api.ts'
import UserCard from '../../components/UserCard'
import { CSpinner } from '@coreui/react-pro'
import { StyledFriendsWrapper } from './Friends.styled.tsx'

const Friends: FC = () => {
    const { data: usersList, isFetching } = useGetOtherUsersQuery(null)

    return (
        <StyledFriendsWrapper>
            <Card className='card'>
                <Flex direction='column'>
                    {!isFetching ? usersList?.map((user, index) => (
                        <UserCard user={user} key={index}/>
                    )) : <div className='spinner-wrapper'><CSpinner color="secondary"/></div>}
                </Flex>
            </Card>
        </StyledFriendsWrapper>
    )
}

export default Friends
