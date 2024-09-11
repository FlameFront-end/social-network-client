import { type FC, useEffect, useState } from 'react'
import { Button, Layout, Menu } from 'antd'
import { WechatOutlined, LogoutOutlined, HomeOutlined } from '@ant-design/icons'
import { useAuth } from '../../features/auth/hooks/useAuth.ts'
import { useNavigate } from 'react-router-dom'
import { pathsConfig } from '../../router/entities/paths.config.ts'

const { Sider: SiderAntd } = Layout

const Sider: FC = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()

    const [collapsed, setCollapsed] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    const handleLogoutClick = (): void => {
        logout()
    }

    const handleCollapsedToggle = (): void => {
        setCollapsed(!collapsed)
    }

    const handleWindowResize = (): void => {
        setIsMobile(window.innerWidth < 768)
    }

    useEffect(() => {
        handleWindowResize()
    }, [])

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize)
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [])

    const menuItems = [
        {
            key: 'Моя страница',
            icon: <HomeOutlined />,
            label: 'Моя страница',
            onClick: () => { navigate(pathsConfig.root) }
        },

        {
            key: 'Мессенджер',
            icon: <WechatOutlined />,
            label: 'Мессенджер',
            onClick: () => { navigate(pathsConfig.chat_list) }
        }
    ]

    return (
        <SiderAntd
            width={200}
            theme='light'
            className='site-layout-background'
            collapsible
            collapsed={collapsed}
            onCollapse={handleCollapsedToggle}
            breakpoint='md'
            collapsedWidth={isMobile ? '0' : '80'}
            style={{ borderRight: 'none', paddingTop: '20px' }}
        >
            <Menu items={menuItems} />
            <Button
                style={{
                    width: collapsed ? 40 : 160,
                    margin: '15px 20px'
                }}
                type='primary'
                icon={<LogoutOutlined />}
                onClick={handleLogoutClick}
            >
                {!collapsed && 'Выход'}
            </Button>
        </SiderAntd>
    )
}

export default Sider
