import { type FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout as LayoutAntd } from 'antd'
import Sider from '../../components/Sider'

const styles = {
    layout: {
        minHeight: '100vh'
    },
    content: {
        backgroundColor: '#141414',
        padding: 15
    }
}

const Layout: FC = () => {
    const { Content } = LayoutAntd

    return (
        <LayoutAntd hasSider style={styles.layout}>
            <Sider />
            <LayoutAntd>
                <Content style={styles.content}>
                    <Outlet />
                </Content>
            </LayoutAntd>
        </LayoutAntd>

    )
}

export default Layout
