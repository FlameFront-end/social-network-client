import { authPaths } from '../../features/auth/routes/auth.paths.ts'
import { chatPaths } from '../../features/chat/routes/chat.paths.ts'

export const pathsConfig = {
    root: '/',
    ...authPaths,
    ...chatPaths
}
