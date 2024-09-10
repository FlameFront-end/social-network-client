import { authRoutes } from '../../features/auth/routes/auth.routes.tsx'
import { chatRoutes } from '../../features/chat/routes/chat.routes.tsx'

export const pathsConfig = {
    root: '/',
    ...authRoutes,
    ...chatRoutes
}
