import NotFound404 from '../../pages/NotFound404'
import Layout from '../../containers/Layout'
import { authRoutes } from '../../features/auth/routes/auth.routes.tsx'
import { pathsConfig } from './paths.config.ts'
import { chatRoutes } from '../../features/chat/routes/chat.routes.tsx'
import RouterProtect from '../RouterProtect.tsx'
import { profileRoutes } from '../../features/profile/routes/profile.routes.tsx'
import { friendsRoutes } from '../../features/friends/routes/friends.routes.tsx'

export const routesConfig = [
    {
        element: <RouterProtect />,
        errorElement: <NotFound404 />,
        children: [
            {
                path: pathsConfig.root,
                element: <Layout />,
                children: [
                    ...chatRoutes,
                    ...profileRoutes,
                    ...friendsRoutes
                ]
            },
            ...authRoutes
        ]
    }
]
