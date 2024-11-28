import { type FC } from 'react'
import { Button, Input, Modal, Form, message } from 'antd'
import { useCreateTeacherMutation, useGetAllTeachersQuery } from '../../api/teachers.api.ts'

interface Props {
    open: boolean
    onClose: () => void
    onSuccess: () => void
}

const CreateTeacherModal: FC<Props> = ({ open, onClose, onSuccess }) => {
    const [form] = Form.useForm()
    const [createTeacher, { isLoading }] = useCreateTeacherMutation()
    const { refetch } = useGetAllTeachersQuery()

    const handleSubmit = async (values: { name: string, discipline: string, group?: string }): Promise<void> => {
        try {
            await createTeacher(values).unwrap()
            void message.success('Преподаватель успешно создан')
            void refetch()
            form.resetFields()
            onSuccess()
            onClose()
        } catch (error) {
            void message.error('Ошибка при создании преподавателя')
        }
    }

    return (
        <Modal
            title="Создать преподавателя"
            open={open}
            onCancel={onClose}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="name"
                    label="ФИО"
                    rules={[{ required: true, message: 'Введите ФИО' }]}
                >
                    <Input placeholder="Введите ФИО" />
                </Form.Item>
                <Form.Item
                    name="discipline"
                    label="Дисциплина"
                    rules={[{ required: true, message: 'Введите дисциплину' }]}
                >
                    <Input placeholder="Введите дисциплину" />
                </Form.Item>
                <Form.Item
                    name="group"
                    label="Группа (необязательно)"
                >
                    <Input placeholder="Введите группу" />
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

export default CreateTeacherModal
