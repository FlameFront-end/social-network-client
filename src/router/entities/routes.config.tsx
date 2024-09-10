import { pathsConfig } from '@/pathsConfig'
import NotFound404 from '../../pages/NotFound404'
import Layout from '../../containers/Layout'
import App from '../../App'
import Chat from '../../features/chat/components/Chat'

export const routesConfig = [
    {
        errorElement: <NotFound404 />,
        children: [
            {
                path: pathsConfig.root,
                element: <Layout />,
                children: [
                    { path: '/', element: <App/> },
                    { path: '/chat/:senderId/:receiverId', element: <Chat /> }
                ]
            }
            // ...authRoutes
        ]
    }
]
