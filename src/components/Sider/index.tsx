import { type FC } from 'react'
import { useAuth } from '../../features/auth/hooks/useAuth.ts'
import { useNavigate } from 'react-router-dom'
import { pathsConfig } from '../../router/entities/paths.config.ts'
import { friendsPaths } from '../../features/friends/routes/friends.paths.ts'
import { MessageOutlined, HomeOutlined, TeamOutlined } from '@ant-design/icons'

import {
    SidebarContainer,
    MenuItemContainer,
    MenuItemIcon,
    MenuItemLabel,
    LogoutButton,
    LogoutButtonLabel
} from './Sidebar.styled'

const Sidebar: FC = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const collapsed = false

    const handleLogoutClick = (): void => {
        logout()
    }

    const menuItems = [
        {
            label: 'Моя страница',
            key: 'root',
            icon: <HomeOutlined />,
            onClick: () => { navigate(pathsConfig.root) }
        },

        {
            label: 'Мессенджер',
            key: 'chat_list',
            icon: <MessageOutlined />,
            onClick: () => { navigate(pathsConfig.chat_list) }
        },
        {
            label: 'Друзья',
            key: 'friends',
            icon: <TeamOutlined />,
            onClick: () => { navigate(friendsPaths.friends) }
        }
    ]

    return (
        <SidebarContainer collapsed={collapsed}>
            <div className="menu">
                {menuItems.map((item) => (
                    <MenuItemContainer key={item.key} onClick={item.onClick}>
                        <MenuItemIcon>{item.icon}</MenuItemIcon>
                        <MenuItemLabel collapsed={collapsed}>{item.label}</MenuItemLabel>
                    </MenuItemContainer>
                ))}
            </div>
            <LogoutButton collapsed={collapsed} onClick={handleLogoutClick}>
                <LogoutButtonLabel collapsed={collapsed}>Выход</LogoutButtonLabel>
            </LogoutButton>
        </SidebarContainer>
    )
}

export default Sidebar
