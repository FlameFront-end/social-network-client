import { friendsPaths } from './friends.paths.ts'
import Friends from '../pages/Friends'

export const friendsRoutes = [
    {
        path: friendsPaths.friends,
        element: <Friends/>
    }
]
