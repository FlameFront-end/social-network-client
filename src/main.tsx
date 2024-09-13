import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { App, ConfigProvider } from 'antd'
import styled, { ThemeProvider } from 'styled-components'

import RouterProvider from './router/RouterProvider'
import reportWebVitals from './reportWebVitals'
import { store } from './store/configureStore.ts'
import { darkTheme } from './core/theme.ts'

import 'antd/dist/reset.css'
import '@coreui/coreui/dist/css/coreui.min.css'
import './assets/css/scrollbar.css'

import 'dayjs/locale/ru.js'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

const Container = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 15px;
    background-color: #141414;
`

root.render(
    <Container>
        <ThemeProvider theme={darkTheme}>
            <ConfigProvider>
                <App>
                    <Provider store={store}>
                        <RouterProvider />
                    </Provider>
                </App>
            </ConfigProvider>
        </ThemeProvider>
    </Container>
)

reportWebVitals()
