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
        content: string
        createdAt: string
        receiverId: number
        senderId: number
        receiver: Collections.User
        sender: Collections.User
    }

    interface User {
        ava: string
        createdAt: string
        email: string
        id: number
        isAdmin: boolean
        nick: string
        password: string
        updatedAt: string
    }
}
