import { api } from '../../../core/api.ts'
import Chat = Collections.Chat

export const chatApi = api.injectEndpoints({
    endpoints: builder => ({
        getChatList: builder.query<Chat[], number | string>({
            query: (id) => ({
                url: `/chat/${id}`
            })
        })
    })
})

export const { useGetChatListQuery } = chatApi
