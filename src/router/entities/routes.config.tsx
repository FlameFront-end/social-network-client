import NotFound404 from '../../pages/NotFound404'
import Layout from '../../containers/Layout'
import App from '../../App'
import { authRoutes } from '../../features/auth/routes/auth.routes.tsx'
import { pathsConfig } from './paths.config.ts'
import { chatRoutes } from '../../features/chat/routes/chat.routes.tsx'
import RouterProtect from '../RouterProtect.tsx'

export const routesConfig = [
    {
        element: <RouterProtect />,
        errorElement: <NotFound404 />,
        children: [
            {
                path: pathsConfig.root,
                element: <Layout />,
                children: [
                    { path: '/', element: <App/> },
                    ...chatRoutes
                ]
            },
            ...authRoutes
        ]
    }
]
