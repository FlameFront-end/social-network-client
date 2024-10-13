import { type FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { pathsConfig } from '../../router/entities/paths.config.ts'
import { StyledMobileNavBottomWrapper } from './MobileNavBottom.styled.tsx'

const MobileNavBottom: FC = () => {
    const loc = useLocation()
    const locName = loc.pathname.split('/')[1]

    return (
        <StyledMobileNavBottomWrapper>
            <Link to={pathsConfig.root} className={`link ${locName === '' ? 'active' : ''}`}>
                <div className='content'>
                    Главная
                </div>
            </Link>

            <Link to={pathsConfig.chat_list} className={`link ${locName === 'chat_list' ? 'active' : ''}`}>
                <div className='content'>
                    Мессенджер
                </div>
            </Link>

            <Link to={pathsConfig.friends} className={`link ${locName === 'friends' ? 'active' : ''}`}>
                <div className='content'>
                    Друзья
                </div>
            </Link>
        </StyledMobileNavBottomWrapper>
    )
}

export default MobileNavBottom
