import { api } from '../../../core/api.ts'

export const profileApi = api.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query<Collections.User, number | string>({
            query: (userId) => ({
                url: `/user/${userId}`
            })
        })
    })
})

export const { useGetUserQuery } = profileApi
