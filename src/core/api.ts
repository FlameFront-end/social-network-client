import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const api = createApi({
    reducerPath: 'base',
    baseQuery: fetchBaseQuery({
        baseUrl: BACKEND_URL,
        prepareHeaders: (headers) => {
            const token = Cookies.get('token')
            if (token != null) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: (build) => ({
        fetchUsers: build.query({
            query: () => '/'
        })
    })
})
