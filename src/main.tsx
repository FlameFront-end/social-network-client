import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ConfigProvider, type ThemeConfig } from 'antd'
import { ThemeProvider } from 'styled-components'

import reportWebVitals from './reportWebVitals'
import RouterProvider from './router/RouterProvider'
import { StyledApp } from './containers/Layout/Layout.styled.tsx'
import { store } from './store/configureStore.ts'
import { darkTheme } from './core/theme.ts'

import 'antd/dist/reset.css'
import '@coreui/coreui/dist/css/coreui.min.css'
import './assets/css/scrollbar.css'

import 'dayjs/locale/ru.js'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

const antdTheme: ThemeConfig = {
    token: {
        colorBgContainer: '#222222',
        colorBorder: '#363738',
        colorTextPlaceholder: '#e1e3e6',
        colorTextBase: '#e1e3e6',
        colorPrimary: '#1890ff',
        colorIcon: '#e1e3e6',
        colorBgBase: '#222222',
        controlOutline: '#1890ff',
        colorSplit: '#363738'
    }
}

root.render(
    <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
            <ConfigProvider theme={antdTheme}>
                <StyledApp>
                    <RouterProvider />
                </StyledApp>
            </ConfigProvider>
        </ThemeProvider>
    </Provider>
)

reportWebVitals()
