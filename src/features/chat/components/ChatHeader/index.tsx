import { type FC, memo, useMemo } from 'react'
import { StyledChatHeader } from './ChatHeader.styled.tsx'
import { useGetUserQuery } from '../../../profile/api/profile.api.ts'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Flex } from '@/kit'
import { Avatar } from 'antd'
import ava from '../../../../../public/ava.png'
import { useNavigate } from 'react-router-dom'
import { pathsConfig } from '@/pathsConfig'
import { getFullName } from '@/utils'

interface Props {
    senderId: number | string | null
    receiverId: number | string | null
}

const ChatHeader: FC<Props> = ({ senderId, receiverId }) => {
    const navigate = useNavigate()

    const interlocutorId = useMemo(() => {
        return Number(receiverId === senderId ? senderId : receiverId)
    }, [receiverId, senderId])

    const { data: user, isFetching } = useGetUserQuery(interlocutorId)

    return (
        <StyledChatHeader>
            {!isFetching && <Flex gap={12}>
                <button className='back-mobile' onClick={() => { navigate(pathsConfig.chat_list) }}>
                    <ArrowLeftOutlined/>
                </button>

                <Flex alignItems='center'>
                    <div>
                        <Avatar size={36} src={user?.ava ?? ava}/>
                    </div>
                    <div className='name'>
                        {getFullName(user?.surname ?? '', user?.name ?? '', null)}
                    </div>
                </Flex>

            </Flex>}

        </StyledChatHeader>
    )
}

export default memo(ChatHeader, (prevProps, nextProps) => {
    return prevProps.senderId === nextProps.senderId && prevProps.receiverId === nextProps.receiverId
})
