import { profilePaths } from './profile.paths.ts'
import Profile from '../pages/Profile'
import Edit from '../pages/Edit'

export const profileRoutes = [
    {
        path: profilePaths.profile,
        element: <Profile/>
    },
    {
        path: profilePaths.edit,
        element: <Edit/>
    }
]
