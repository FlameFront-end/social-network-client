import { api } from '../../../core/api.ts'

export const friendsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPossibleFriends: builder.query<Collections.User[], null>({
            query: () => ({
                url: '/user/possible-friends'
            })
        }),
        sendFriendRequest: builder.mutation<Promise<void>, number>({
            query: (userId) => ({
                method: 'PATCH',
                url: `/user/send-friend-request/${userId}`
            })
        }),
        removeFriendRequest: builder.mutation<Promise<void>, number>({
            query: (userId) => ({
                method: 'DELETE',
                url: `/user/remove-friend-request/${userId}`
            })
        }),
        getMyFriends: builder.query<Collections.User[], null>({
            query: () => ({
                url: '/user/my-friends'
            })
        })

    })
})

export const {
    useGetPossibleFriendsQuery,
    useSendFriendRequestMutation,
    useGetMyFriendsQuery,
    useRemoveFriendRequestMutation
} = friendsApi
