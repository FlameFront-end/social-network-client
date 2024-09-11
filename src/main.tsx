import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { App, ConfigProvider } from 'antd'

import RouterProvider from './router/RouterProvider'
import reportWebVitals from './reportWebVitals'
import { store } from './store/configureStore.ts'

import 'antd/dist/reset.css'
import './assets/css/scrollbar.css'
import '@coreui/coreui/dist/css/coreui.min.css'

import 'dayjs/locale/ru.js'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
    <ConfigProvider>
        <App>
            <Provider store={store}>
                <RouterProvider />
            </Provider>
        </App>
    </ConfigProvider>
)

reportWebVitals()
