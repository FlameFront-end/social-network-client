import { api } from '../../../core/api.ts'

export const profileApi = api.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query<Collections.User, number | string>({
            query: (userId) => ({
                url: `/user/${userId}`
            })
        }),
        getFullUser: builder.query<Collections.FullUser, number | string>({
            query: (userId) => ({
                url: `/user/${userId}?details=true`
            })
        }),
        updateUser: builder.mutation<Collections.User, number | any>({
            query: (payload) => ({
                url: '/user/update',
                method: 'PATCH',
                body: payload
            })
        })
    })
})

export const {
    useGetUserQuery,
    useGetFullUserQuery,
    useUpdateUserMutation
} = profileApi
