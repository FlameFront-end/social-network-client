import { type FC, useEffect, useState } from 'react'
import { Button, Layout, Menu } from 'antd'
import {
    DashboardOutlined,
    LogoutOutlined
} from '@ant-design/icons'

const { Sider: SiderAntd } = Layout

const Sider: FC = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

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
            key: 'Dashboard',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
            onClick: () => {}
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
            >
                {!collapsed && 'Logout'}
            </Button>
        </SiderAntd>
    )
}

export default Sider
