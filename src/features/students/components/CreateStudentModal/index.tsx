import { type FC } from 'react'
import { Button, DatePicker, Input, Modal, Form, message } from 'antd'
import { type StudentCreatePayload, useCreateStudentMutation, useGetAllStudentsQuery } from '../../api/students.api.ts'

interface Props {
    open: boolean
    onClose: () => void
    onSuccess: () => void
}

const CreateStudentModal: FC<Props> = ({ open, onClose, onSuccess }) => {
    const [form] = Form.useForm()
    const [createStudent, { isLoading }] = useCreateStudentMutation()
    const { refetch } = useGetAllStudentsQuery()

    const handleSubmit = async (values: StudentCreatePayload): Promise<void> => {
        try {
            await createStudent(values).unwrap()
            void message.success('Студент успешно создан')
            void refetch()
            form.resetFields()
            onSuccess()
            onClose()
        } catch (error) {
            void message.error('Ошибка при создании студента')
        }
    }

    return (
        <Modal
            title="Создать студента"
            open={open}
            onCancel={onClose}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={(values) => {
                    void handleSubmit(values)
                }}
            >
                <Form.Item
                    name="name"
                    label="ФИО"
                    rules={[{ required: true, message: 'Введите ФИО' }]}
                >
                    <Input placeholder="Введите ФИО" />
                </Form.Item>
                <Form.Item
                    name="group"
                    label="Группа"
                    rules={[{ required: true, message: 'Введите группу' }]}
                >
                    <Input placeholder="Введите группу" />
                </Form.Item>
                <Form.Item
                    name="birthDate"
                    label="Дата рождения"
                    rules={[{ required: true, message: 'Выберите дату рождения' }]}
                >
                    <DatePicker
                        format="DD.MM.YYYY"
                        style={{ width: '100%' }}
                        placeholder="Выберите дату"
                    />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Номер телефона"
                >
                    <Input type='phone' placeholder="Введите номер телефона" />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                >
                    <Input type='email' placeholder="Введите email" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Создать
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CreateStudentModal
