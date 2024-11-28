import { api } from '@/core'

export interface StudentCreatePayload {
    name: string
    group: string
    birthDate?: string
    phone?: string
    email?: string
}

export interface StudentUpdatePayload {
    id: string
    name: string
    group: string
    birthDate?: string
    phone?: string
    email?: string
}

export const studentsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createStudent: builder.mutation<Collections.Student, StudentCreatePayload>({
            query: (student) => ({
                url: '/students',
                method: 'POST',
                body: student
            })
        }),
        getAllStudents: builder.query<Collections.Student[], void>({
            query: () => ({
                url: '/students',
                method: 'GET'
            })
        }),
        getStudentById: builder.query<Collections.Student, string>({
            query: (id) => ({
                url: `/students/${id}`,
                method: 'GET'
            })
        }),
        deleteStudent: builder.mutation<void, string>({
            query: (id) => ({
                url: `/students/${id}`,
                method: 'DELETE'
            })
        }),
        updateStudent: builder.mutation<Collections.Student, StudentUpdatePayload>({
            query: ({ id, ...data }) => ({
                url: `/students/${id}`,
                method: 'PATCH',
                body: data
            })
        })
    })
})

export const {
    useCreateStudentMutation,
    useGetAllStudentsQuery,
    useGetStudentByIdQuery,
    useDeleteStudentMutation,
    useUpdateStudentMutation
} = studentsApi
