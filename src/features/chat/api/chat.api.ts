import { api } from '../../../core/api.ts'

export const chatApi = api.injectEndpoints({
    endpoints: builder => ({
        getChatList: builder.query<Collections.Chat[], number | string>({
            query: (id) => ({
                url: `/chat/${id}`
            })
        })
    })
})

export const { useGetChatListQuery } = chatApi
