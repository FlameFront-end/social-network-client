import { type FC } from 'react'
import { Avatar } from 'antd'
import ava from '../../../../../public/ava.png'
import TextButton from '../Buttons/TextButton'
import { StyledMainHeader } from './MainHeader.styled.tsx'
import { Link, useNavigate } from 'react-router-dom'
import { profilePaths } from '../../../profile/routes/profile.paths.ts'
import { useAppSelector } from '@/hooks'
import { pathsConfig } from '@/pathsConfig'
import { getFullName } from '@/utils'

const MainHeader: FC = () => {
    const navigate = useNavigate()
    const user = useAppSelector(state => state.auth.user)

    return (
        <StyledMainHeader>
            <div className="content">
                <Link to={pathsConfig.root}>
                    Социальная сеть
                </Link>

                {user != null
                    ? <button
                        className='user_btn'
                        onClick={() => {
                            navigate(profilePaths.profile, { state: { userId: user.id } })
                        }}>
                        <Avatar size={32} src={user.ava ?? ava}/>
                        {getFullName(user.surname ?? '', user.name ?? '', null)}
                    </button>
                    : <TextButton onClick={() => { navigate(pathsConfig.register) }}>Регистрация</TextButton>
                }
            </div>
        </StyledMainHeader>
    )
}

export default MainHeader
