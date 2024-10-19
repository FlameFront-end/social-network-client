import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BACKEND_URL } from '@/constants'

interface ChatState {
    messages: Collections.Message[]
    users: Collections.User []
}

const initialState: ChatState = {
    messages: [],
    users: []
}

export const fetchChatMessages = createAsyncThunk(
    'chat/fetchChatMessages',
    async (chatId: number) => {
        const response = await axios.get(`${BACKEND_URL}/chat/${chatId}/messages`)
        return response.data
    }
)

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChatMessages.fulfilled, (state, action) => {
                state.messages = action.payload
            })
    }
})

export const { reducer: chatReducer, actions: chatActions } = chatSlice
