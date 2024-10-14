import { type FC } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { pathsConfig } from '@/pathsConfig'
import { StyledMobileNavBottomWrapper } from './MobileNavBottom.styled.tsx'
import { useAppSelector } from '@/hooks'
import { profilePaths } from '../../features/profile/routes/profile.paths.ts'

const MobileNavBottom: FC = () => {
    const loc = useLocation()
    const locName = loc.pathname.split('/')[1]

    const navigate = useNavigate()
    const user = useAppSelector(state => state.auth.user)

    return (
        <StyledMobileNavBottomWrapper>
            <Link to={pathsConfig.friends} className={`link ${locName === 'friends' ? 'active' : ''}`}>
                <div className='content'>
                    Друзья
                </div>
            </Link>

            <Link to={pathsConfig.chat_list} className={`link ${locName === 'chat_list' ? 'active' : ''}`}>
                <div className='content'>
                    Мессенджер
                </div>
            </Link>

            <button onClick={() => { navigate(profilePaths.profile, { state: { userId: user.id } }) }} className={`link ${locName === '' ? 'active' : ''}`}>
                <div className='content'>
                    Профиль
                </div>
            </button>

        </StyledMobileNavBottomWrapper>
    )
}

export default MobileNavBottom
