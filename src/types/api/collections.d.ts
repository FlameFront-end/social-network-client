declare namespace Collections {
    interface Chat {
        id: number
        createdAt: string
        updatedAt: string
        lastMessage: string
        messages: Collections.Message[]
        user1: Collections.User
        user2: Collections.User
        user1Id: number
        user2Id: number
    }

    interface Message {
        id: number
        chatId: number
        content: string | null
        audioUrl: string | null
        createdAt: string
        receiverId: number
        senderId: number
        receiver: Collections.User
        sender: Collections.User
        replyToMessage: Collections.ReplyToMessage | null
        replyToMessageId: number | null
    }

    interface ReplyToMessage {
        id: number
        chatId: number
        content: string | null
        audioUrl: string | null
        createdAt: string
        receiverId: number
        senderId: number
        receiver: Collections.User
        sender: Collections.User
    }

    interface User {
        id: number
        patronymic: string | null
        surname: string
        name: string
        email: string
        ava: string | null
        isAdmin: boolean
        password: string
        birthdate: string
        friends: number[]
        incomingFriendRequests: number[]
        outgoingFriendRequests: number[]
        updatedAt: string
        createdAt: string
    }
}
