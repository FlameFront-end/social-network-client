import { api } from '../../../core/api.ts'

export const profileApi = api.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query<Collections.User, number | string>({
            query: (userId) => ({
                url: `/user/${userId}`
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
    useUpdateUserMutation
} = profileApi
