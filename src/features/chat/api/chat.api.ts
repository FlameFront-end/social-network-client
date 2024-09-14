import { api } from '../../../core/api.ts'

export const chatApi = api.injectEndpoints({
    endpoints: builder => ({
        getChatsList: builder.query<Collections.Chat[], null>({
            query: () => ({
                url: '/chat/my-chats'
            })
        }),
        createChat: builder.mutation<Collections.Chat, number>({
            query: (receiverId) => ({
                method: 'POST',
                url: '/chat/create',
                body: {
                    receiverId
                }
            })
        })
    })
})

export const { useGetChatsListQuery, useCreateChatMutation } = chatApi
