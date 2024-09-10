import Login from '../pages/Login'
import { authPaths } from './auth.paths'

export const authRoutes = [
    {
        path: authPaths.login,
        element: <Login />
    }
]
