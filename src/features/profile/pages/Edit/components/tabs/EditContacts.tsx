import { type FC, useEffect } from 'react'
import { StyledEditProfileTab } from './styled/EditProfileTab.styled.tsx'
import { Button, Form, Input, Typography } from 'antd'
import type { RegisterDataForm } from '../../../../../auth/types/register.types.ts'
import Flex from '../../../../../kit/components/Flex'
import { useLocation } from 'react-router-dom'
import { useGetUserQuery, useUpdateUserMutation } from '../../../../api/profile.api.ts'
import { toast } from 'react-toastify'

const EditContacts: FC = () => {
    const { state } = useLocation()
    const [form] = Form.useForm()

    const [updateUser, { isLoading }] = useUpdateUserMutation()

    const { data: user } = useGetUserQuery(state.userId)

    const handleFinish = async (payload: any): Promise<void> => {
        await updateUser(payload).then(() => {
            toast.success('Данные успешно обновлены')
        })
    }

    useEffect(() => {
        if (user != null) {
            form.setFieldsValue(user)
        }
    }, [form, user])

    return (
        <StyledEditProfileTab>
            <div className="content">
                <Form
                    form={form}
                    name='EditProfile'
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    onFinish={(data: RegisterDataForm) => {
                        void handleFinish(data)
                    }}
                    autoComplete='off'
                >
                    <Flex direction='column' gap={16}>
                        <Flex alignItems='start' justifyContent='center'>
                            <Typography.Text className='label'>Мобильный телефон:</Typography.Text>
                            <Form.Item name='mobilePhone' style={{ width: '100%' }}>
                                <Input style={{ width: '100%' }}/>
                            </Form.Item>
                        </Flex>

                        <Flex alignItems='start' justifyContent='center'>
                            <Typography.Text className='label'>Дополнительный телефон:</Typography.Text>
                            <Form.Item name='additionalPhone' style={{ width: '100%' }}>
                                <Input style={{ width: '100%' }}/>
                            </Form.Item>
                        </Flex>

                        <Flex alignItems='start' justifyContent='center'>
                            <Typography.Text className='label'>Skype:</Typography.Text>
                            <Form.Item name='skype' style={{ width: '100%' }}>
                                <Input style={{ width: '100%' }}/>
                            </Form.Item>
                        </Flex>

                        <Flex alignItems='start' justifyContent='center'>
                            <Typography.Text className='label'>Личный сайт:</Typography.Text>
                            <Form.Item name='site' style={{ width: '100%' }}>
                                <Input style={{ width: '100%' }}/>
                            </Form.Item>
                        </Flex>
                        <Form.Item>
                            <Button
                                type='primary'
                                htmlType='submit'
                                loading={isLoading}
                                block
                                className='save'
                            >
                                Сохранить
                            </Button>
                        </Form.Item>
                    </Flex>
                </Form>
            </div>
        </StyledEditProfileTab>
    )
}

export default EditContacts
