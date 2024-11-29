import { type FC } from 'react'
import { useAuth } from '../../features/auth/hooks/useAuth.ts'
import { useNavigate } from 'react-router-dom'
import { pathsConfig } from '@/pathsConfig'
import { MessageOutlined, HomeOutlined, TeamOutlined } from '@ant-design/icons'
import {
    SidebarContainer,
    MenuItemContainer,
    MenuItemIcon,
    MenuItemLabel,
    LogoutButton,
    LogoutButtonLabel
} from './Sidebar.styled'
import { useAppSelector } from '@/hooks'

const Sidebar: FC = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const userId = useAppSelector(state => state.auth.user.id)
    const collapsed = false

    const menuItems = [
        {
            label: 'Группы',
            key: 'group_list',
            icon: <HomeOutlined />,
            onClick: () => { navigate(pathsConfig.group_list) }
        },
        {
            label: 'Преподаватели',
            key: 'teachers_list',
            icon: <HomeOutlined />,
            onClick: () => { navigate(pathsConfig.teachers_list) }
        },
        {
            label: 'Студенты',
            key: 'students_list',
            icon: <HomeOutlined />,
            onClick: () => { navigate(pathsConfig.students_list) }
        },
        {
            label: 'Моя страница',
            key: 'root',
            icon: <HomeOutlined />,
            onClick: () => { navigate(pathsConfig.profile, { state: { userId } }) }
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
            onClick: () => { navigate(pathsConfig.friends) }
        }
    ]

    return (
        <SidebarContainer collapsed={false}>
            <div className="menu">
                {menuItems.map((item) => (
                    <MenuItemContainer key={item.key} onClick={item.onClick}>
                        <MenuItemIcon>{item.icon}</MenuItemIcon>
                        <MenuItemLabel collapsed={collapsed}>{item.label}</MenuItemLabel>
                    </MenuItemContainer>
                ))}
            </div>
            <LogoutButton collapsed={collapsed} onClick={logout}>
                <LogoutButtonLabel collapsed={collapsed}>Выход</LogoutButtonLabel>
            </LogoutButton>
        </SidebarContainer>
    )
}

export default Sidebar
