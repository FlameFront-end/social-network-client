import { api } from '../../../core/api.ts'

export const friendsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getOtherUsers: builder.query<Collections.User[], null>({
            query: () => ({
                url: '/user/other'
            })
        }),
        sendFriendRequest: builder.mutation<Promise<void>, number>({
            query: (userId) => ({
                method: 'PATCH',
                url: `/user/send-friend-request/${userId}`
            })
        }),
        getUser: builder.query<Collections.User, number>({
            query: (userId) => ({
                url: `/user/${userId}`
            })
        })
    })
})

export const { useGetOtherUsersQuery, useSendFriendRequestMutation, useGetUserQuery } = friendsApi
