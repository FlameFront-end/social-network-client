import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { actions, type AppDispatch } from '../store'

export const useAppAction = (): any => {
    const dispatch = useDispatch<AppDispatch>()

    return useMemo(() => bindActionCreators(actions, dispatch), [])
}
