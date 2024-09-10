import { type FC } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Layout as LayoutAntd } from 'antd'
import Sider from '@/components/Sider'

const styles = {
    layout: {
        minHeight: '100vh'
    },
    content: {
        backgroundColor: '#f1f1f1',
        padding: 15
    },
    specialContent: {
        backgroundColor: '#f1f1f1',
        padding: '0px 0px 0px 15px'
    }
}

const Layout: FC = () => {
    const { Content } = LayoutAntd
    const { pathname } = useLocation()

    const isSpecialPath = pathname?.includes('calendar')

    return (
        <LayoutAntd hasSider style={styles.layout}>
            <Sider />
            <LayoutAntd>
                <Content style={isSpecialPath ? styles.specialContent : styles.content}>
                    <Outlet />
                </Content>
            </LayoutAntd>
        </LayoutAntd>
    )
}

export default Layout
