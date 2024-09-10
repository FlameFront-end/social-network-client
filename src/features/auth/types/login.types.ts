export interface Login {
    email: string
    password: string
}

export interface LoginResponse {
    jwt: string
    id: number
    username: string
    category: string
}
