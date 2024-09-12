import { authPaths } from '../../features/auth/routes/auth.paths.ts'
import { chatPaths } from '../../features/chat/routes/chat.paths.ts'
import { profilePaths } from '../../features/profile/routes/profile.paths.ts'
import { friendsPaths } from '../../features/friends/routes/friends.paths.ts'

export const pathsConfig = {
    root: '/',
    ...authPaths,
    ...chatPaths,
    ...profilePaths,
    ...friendsPaths
}
