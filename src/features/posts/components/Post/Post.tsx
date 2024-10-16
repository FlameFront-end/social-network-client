import { type FC } from 'react'
import { StyledPostWrapper } from './Post.styled.tsx'
import { Avatar, TextButton } from '@/kit'
import dayjs from 'dayjs'
import { getFullName } from '@/utils'
import { profilePaths } from '../../../profile/routes/profile.paths.ts'
import { useNavigate } from 'react-router-dom'

interface Props {
    post: Collections.Post
}

const Post: FC<Props> = ({ post }) => {
    const navigate = useNavigate()

    return (
        <StyledPostWrapper>
            <div className="top">
                <Avatar size='small' ava={post.creator.ava}/>
                <div className="info">
                    <TextButton onClick={() => { navigate(profilePaths.profile, { state: { userId: post.creator.id } }) }}>
                        {getFullName(post.creator.surname ?? '', post.creator.name ?? '', null)}
                    </TextButton>
                    <div className="date">{dayjs(post.createdAt).locale('ru').format('D MMM в HH:mm')}</div>
                </div>
            </div>

            {post.description !== null && <div className="description">
                {post.description}
            </div>}

            <div className="image-wrapper">
                {post.files.map((fileUrl, index) => (
                    <img key={index} src={fileUrl} alt="testImage"/>
                ))}
            </div>
        </StyledPostWrapper>
    )
}

export default Post
