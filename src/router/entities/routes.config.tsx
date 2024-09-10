import { pathsConfig } from '@/pathsConfig'
import NotFound404 from '../../pages/NotFound404'
import Layout from '../../containers/Layout'
import App from '../../App'

export const routesConfig = [
    {
        errorElement: <NotFound404 />,
        children: [
            {
                path: pathsConfig.root,
                element: <Layout />,
                children: [
                    { path: '/', element: <App/> }
                ]
            }
            // ...authRoutes
        ]
    }
]
