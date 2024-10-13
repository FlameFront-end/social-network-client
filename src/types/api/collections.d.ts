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

    interface UserDetails {
        birthdate: string
        shortInfo: string | null
        city: string | null
        mobilePhone: string | null
        additionalPhone: string | null
        skype: string | null
        site: string | null
        activity: string | null
        interests: string | null
        music: string | null
        movies: string | null
        TVShows: string | null
        books: string | null
        games: string | null
        quotes: string | null
        friends: number[]
        incomingFriendRequests: number[]
        outgoingFriendRequests: number[]
        grandparents: string[]
        parents: string[]
        siblings: string[]
        children: string[]
        grandsons: string[]
        updatedAt: string
        createdAt: string
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
    }

    interface FullUser {
        id: number
        patronymic: string | null
        surname: string
        name: string
        email: string
        ava: string | null
        isAdmin: boolean
        password: string
        details: Collections.UserDetails
    }
}
