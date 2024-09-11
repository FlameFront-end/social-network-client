import { api } from '../../../core/api.ts'

export const authApi = api.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (payload) => ({
                url: '/auth/login',
                method: 'POST',
                body: payload
            })
        }),
        register: builder.mutation({
            query: (payload) => ({
                url: '/user/register',
                method: 'POST',
                body: payload
            })
        })
    })
})

export const {
    useLoginMutation,
    useRegisterMutation
} = authApi
