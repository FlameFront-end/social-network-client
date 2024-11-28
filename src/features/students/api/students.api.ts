import { api } from '@/core'

export interface StudentCreatePayload {
    name: string
    group: string
    birthDate?: string
    phone?: string
    email?: string
}

export const studentsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createStudent: builder.mutation<Collections.Student, StudentCreatePayload>({
            query: (teacher) => ({
                url: '/students',
                method: 'POST',
                body: teacher
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
        })
    })
})

export const {
    useCreateStudentMutation,
    useGetAllStudentsQuery,
    useGetStudentByIdQuery,
    useDeleteStudentMutation
} = studentsApi
