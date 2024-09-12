import { type FC, useEffect, useState } from 'react'
import { Avatar } from 'antd'
import Flex from '../../../kit/components/Flex'
import ava from '../../../../../public/ava.png'
import { useSendFriendRequestMutation } from '../../api/friends.api.ts'
import { useAppSelector } from '../../../../hooks/useAppSelector.ts'

import { StyledUserCard } from './UserCard.styled.tsx'
import AccentButton from '../../../kit/components/Buttons/AccentButton'

interface Props {
    user: Collections.User
}

const UserCard: FC<Props> = ({ user }) => {
    const myUserId = useAppSelector(state => state.auth.user.id)
    const [sendFriendRequest] = useSendFriendRequestMutation()

    const [isAlreadySent, setIsAlreadySent] = useState(false)

    useEffect(() => {
        if (myUserId != null) {
            setIsAlreadySent(user.incomingFriendRequests.includes(myUserId))
        }
    }, [])

    const handleSendFriendRequest = async (): Promise<void> => {
        await sendFriendRequest(user.id).then(() => {
            setIsAlreadySent(true)
        })
    }

    return (
        <StyledUserCard>
            <Flex alignItems='center'>
                <Avatar size={64} src={user.ava ?? ava}/>
                <Flex direction='column'>
                    <div className='full_name'>
                        {user.name} {user.surname}
                    </div>
                    {!isAlreadySent ? <AccentButton onClick={() => { void handleSendFriendRequest() }}>
                        Добавить в друзья
                    </AccentButton> : <AccentButton onClick={() => { void handleSendFriendRequest() }}>
                       Отозвать запрос
                    </AccentButton>}
                </Flex>
            </Flex>
        </StyledUserCard>
    )
}

export default UserCard
