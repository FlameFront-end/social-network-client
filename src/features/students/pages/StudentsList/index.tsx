import type React from 'react'
import { useState } from 'react'
import { Table, Input, Space, Button, message } from 'antd'
import { StyledStudentsListWrapper } from './StudentsList.styled'
import CreateStudentModal from '../../components/CreateStudentModal'
import { useDeleteStudentMutation, useGetAllStudentsQuery } from '../../api/students.api.ts'
import ConfirmDelete from '../../../kit/components/ConfirmDelete'
import { getDateFormat } from '@/utils'

const StudentsList: React.FC = () => {
    const { data: students, isLoading, refetch } = useGetAllStudentsQuery()
    const [deleteStudent] = useDeleteStudentMutation()

    const [searchText, setSearchText] = useState('')
    const [filteredData, setFilteredData] = useState<Collections.Student[]>([])
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleModalClose = (): void => {
        setIsModalVisible(false)
    }

    const handleModalSuccess = (): void => {
        setIsModalVisible(false)
    }

    const handleDelete = async (id: string): Promise<void> => {
        try {
            await deleteStudent(id).unwrap()
            void message.success('Студент удалён')
            void refetch()
        } catch (error) {
            void message.error('Ошибка при удалении студента')
        }
    }

    const handleSearch = (value: string): void => {
        setSearchText(value)
        const lowercasedValue = value.toLowerCase()

        const filtered = students?.filter((teacher: Collections.Student) =>
            teacher.name.toLowerCase().includes(lowercasedValue) ||
            teacher.group?.toLowerCase().includes(lowercasedValue)
        )

        setFilteredData(filtered ?? [])
    }

    const dataSource = (searchText ? filteredData : students)?.map(record => ({
        id: record?.id,
        name: record?.name ?? '-',
        group: record?.group ?? '-',
        birthDate: getDateFormat(record?.birthDate) ?? '-',
        phone: record?.phone ?? '-',
        email: record?.email ?? '-'
    }))

    const columns = [
        {
            title: 'ФИО',
            dataIndex: 'name'
        },
        {
            title: 'Группа',
            dataIndex: 'group'
        },
        {
            title: 'Дата рождения',
            dataIndex: 'birthDate'
        },
        {
            title: 'Телефон',
            dataIndex: 'phone'
        },
        {
            title: 'Почта',
            dataIndex: 'email'
        },
        {
            title: 'Действия',
            render: (_: any, teacher: any) => (
                <ConfirmDelete
                    handleDelete={async () => { await handleDelete(teacher.id) }}
                    title='Вы уверены, что хотите удалить этого студента?'
                />
            )
        }
    ]

    return (
        <StyledStudentsListWrapper>
            <Space direction="vertical" style={{ marginBottom: 16, width: '100%' }}>
                <div className="top-row">
                    <Input.Search
                        placeholder="Введите имя или группу"
                        allowClear
                        value={searchText}
                        onChange={(e) => { handleSearch(e.target.value) }}
                        onSearch={handleSearch}
                    />

                    <Button onClick={() => { setIsModalVisible(true) }}>
                        Создать студента
                    </Button>
                </div>
            </Space>
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={{ pageSize: 5 }}
                loading={isLoading}
                rowKey="id"
            />
            <CreateStudentModal
                open={isModalVisible}
                onClose={handleModalClose}
                onSuccess={handleModalSuccess}
            />
        </StyledStudentsListWrapper>
    )
}

export default StudentsList
