import { type Dispatch, type FC, type SetStateAction } from 'react'
import { Avatar } from 'antd'
import Flex from '../../../kit/components/Flex'
import { profilePaths } from '../../../profile/routes/profile.paths.ts'
import ava from '../../../../../public/ava.png'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { StyledMessage } from './Message.styled.tsx'

interface Props {
    message: Collections.Message
    setReplyToMessage: Dispatch<SetStateAction<Collections.Message | null>>
}

const Message: FC<Props> = ({ message, setReplyToMessage }) => {
    const navigate = useNavigate()

    return (
        <StyledMessage key={message.id} onClick={() => { setReplyToMessage(message) }}>
            <Flex className='wrapper' justifyContent='start'>
                <Avatar size={60} src={message.sender.ava ?? ava} style={{ height: 'max-content' }}/>

                <div className='full-width'>
                    <Flex alignItems='center' justifyContent='space-between'>
                        <Flex alignItems='center' onClick={() => {
                            navigate(profilePaths.profile, { state: { userId: message.senderId } })
                        }}>
                            <div className='nick'>
                                {message.sender.name} {message.sender.surname}
                            </div>
                        </Flex>
                        <div className='time'> {dayjs(message.createdAt)?.format('HH:mm')}</div>
                    </Flex>

                    {message.replyToMessageId != null ? <Flex direction="column" className='reply-message'>
                        <Flex>
                            <div className="separator"/>
                            <Flex direction='column' gap={0}>
                                <div className='author'>{message.replyToMessage?.sender.name} {message.replyToMessage?.sender.surname}</div>
                                {message.replyToMessage?.content !== null && <div className='message'>{message.replyToMessage?.content}</div>}
                                {message.replyToMessage?.audioUrl !== null && <audio className='message' controls src={message.replyToMessage?.audioUrl}/>}
                            </Flex>
                        </Flex>
                    </Flex> : null}

                    <Flex direction="column">
                        {message.content !== null && <div className='message'>{message.content}</div>}
                        {message.audioUrl !== null && <audio controls src={message.audioUrl} className='message'/>}
                    </Flex>
                </div>
            </Flex>
        </StyledMessage>

    )
}

export default Message
