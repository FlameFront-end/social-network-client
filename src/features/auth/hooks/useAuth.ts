import { useMemo } from 'react'
import { useAppSelector } from '../../../store/hooks.ts'
import { useAppAction } from '../../../hooks/useAppAction.ts'

interface UseAuthReturn {
    isAuth: boolean
    logout: () => void
}

export const useAuth = (): UseAuthReturn => {
    const isAuth = useAppSelector(state => state.auth.user.isAuth)
    const { removeUser } = useAppAction()

    const logout = (): void => {
        removeUser()
        localStorage.clear()
        location.reload()
    }

    return useMemo(() => ({ isAuth, logout }), [isAuth])
}
