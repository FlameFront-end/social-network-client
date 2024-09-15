import { api } from '../../../core/api.ts'

export const friendsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPossibleFriends: builder.query<Collections.User[], null>({
            query: () => ({
                url: '/friends/possible-friends'
            })
        }),
        sendFriendRequest: builder.mutation<Promise<void>, number>({
            query: (userId) => ({
                method: 'PATCH',
                url: `/friends/send-friend-request/${userId}`
            })
        }),
        removeFriendRequest: builder.mutation<Promise<void>, number>({
            query: (userId) => ({
                method: 'DELETE',
                url: `/friends/remove-friend-request/${userId}`
            })
        }),
        acceptFriendRequest: builder.mutation<Promise<void>, number>({
            query: (userId) => ({
                method: 'PATCH',
                url: `/friends/accept-friend-request/${userId}`
            })
        }),
        declineFriendRequest: builder.mutation<Promise<void>, number>({
            query: (userId) => ({
                method: 'DELETE',
                url: `/friends/decline-friend-request/${userId}`
            })
        }),
        removeFriend: builder.mutation<Promise<void>, number>({
            query: (userId) => ({
                method: 'DELETE',
                url: `/friends/remove-friend/${userId}`
            })
        }),
        getMyFriends: builder.query<Collections.User[], null>({
            query: () => ({
                url: '/friends/my-friends'
            })
        }),
        getIncomingFriendshipRequests: builder.query<Collections.User[], null>({
            query: () => ({
                url: '/friends/incoming-friendship-requests'
            })
        }),
        getOutgoingFriendshipRequests: builder.query<Collections.User[], null>({
            query: () => ({
                url: '/friends/outgoing-friendship-requests'
            })
        })
    })
})

export const {
    useSendFriendRequestMutation,
    useRemoveFriendRequestMutation,
    useAcceptFriendRequestMutation,
    useDeclineFriendRequestMutation,
    useRemoveFriendMutation,
    useGetPossibleFriendsQuery,
    useGetMyFriendsQuery,
    useGetIncomingFriendshipRequestsQuery,
    useGetOutgoingFriendshipRequestsQuery
} = friendsApi
