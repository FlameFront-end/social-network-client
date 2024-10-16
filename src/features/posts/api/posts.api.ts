import { api } from '@/core'

export const postsApi = api.injectEndpoints({
    endpoints: builder => ({
        getMyPosts: builder.query<Collections.Post[], null>({
            query: () => ({
                url: '/posts/my'
            })
        })
    })
})

export const {
    useGetMyPostsQuery
} = postsApi
