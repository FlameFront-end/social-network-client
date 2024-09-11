import { api } from '../../../core/api.ts'
import User = Collections.User

export const profileApi = api.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query<User, number | string>({
            query: (userId) => ({
                url: `/user/${userId}`
            })
        })
    })
})

export const { useGetUserQuery } = profileApi
