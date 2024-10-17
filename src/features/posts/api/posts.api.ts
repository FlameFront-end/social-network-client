import { api } from '@/core'
import { type PostCreatePayload } from '../types/post.types.ts'

export const postsApi = api.injectEndpoints({
    endpoints: builder => ({
        getUserPosts: builder.query<Collections.Post[], number | string>({
            query: (userId) => ({
                url: `/posts/all/${userId}`
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
    useGetUserPostsQuery,
    useCreatePostMutation
} = postsApi
