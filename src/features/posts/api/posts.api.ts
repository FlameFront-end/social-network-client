import { api } from '@/core'
import { type PostCreatePayload } from '../types/post.types.ts'

export const postsApi = api.injectEndpoints({
    endpoints: builder => ({
        getMyPosts: builder.query<Collections.Post[], null>({
            query: () => ({
                url: '/posts/my'
            })
        }),
        createPost: builder.mutation<Collections.Post[], PostCreatePayload>({
            query: (postPayload) => ({
                method: 'POST',
                url: '/posts',
                body: postPayload
            })
        })

    })
})

export const {
    useGetMyPostsQuery,
    useCreatePostMutation
} = postsApi
