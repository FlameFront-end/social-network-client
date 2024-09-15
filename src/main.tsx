import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { App, ConfigProvider, type ThemeConfig } from 'antd'
import { ThemeProvider } from 'styled-components'

import RouterProvider from './router/RouterProvider'
import reportWebVitals from './reportWebVitals'
import { store } from './store/configureStore.ts'
import { darkTheme } from './core/theme.ts'
import { StyledContainer } from './main.styled.tsx'

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
        colorBgBase: '#222222'
    }
}

root.render(
    <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
            <ConfigProvider theme={antdTheme}>
                <StyledContainer>
                    <App>
                        <RouterProvider />
                    </App>
                </StyledContainer>
            </ConfigProvider>
        </ThemeProvider>
    </Provider>
)

reportWebVitals()
