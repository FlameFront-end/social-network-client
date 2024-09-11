import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Message = Collections.Message

interface ChatState {
    messages: Message[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: ChatState = {
    messages: [],
    status: 'idle'
}

export const fetchMessages = createAsyncThunk(
    'chat/fetchMessages',
    async (userIds: { userId1: number, userId2: number }) => {
        const response = await axios.get(`http://localhost:3000/chat/${userIds.userId1}/${userIds.userId2}`)
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
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            state.messages = action.payload
        })
    }
})

export const { reducer: chatReducer, actions: chatActions } = chatSlice
