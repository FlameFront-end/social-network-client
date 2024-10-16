import { type FC, useEffect } from 'react'
import { StyledEditProfileTab } from './styled/EditProfileTab.styled.tsx'
import { Button, Form, Input, Typography } from 'antd'
import type { RegisterDataForm } from '../../../../../auth/types/register.types.ts'
import Flex from '../../../../../kit/components/Flex'
import { useLocation } from 'react-router-dom'
import { useGetUserQuery, useUpdateUserMutation } from '../../../../api/profile.api.ts'
import { toast } from 'react-toastify'

const { TextArea } = Input

const EditInterests: FC = () => {
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
                            <Typography.Text className='label'>Деятельность:</Typography.Text>
                            <Form.Item name='activity' style={{ width: '100%' }}>
                                <TextArea style={{ width: '100%' }} autoSize={{ minRows: 3, maxRows: 5 }}/>
                            </Form.Item>
                        </Flex>

                        <Flex alignItems='start' justifyContent='center'>
                            <Typography.Text className='label'>Интересы:</Typography.Text>
                            <Form.Item name='interests' style={{ width: '100%' }}>
                                <TextArea style={{ width: '100%' }} autoSize={{ minRows: 3, maxRows: 5 }}/>
                            </Form.Item>
                        </Flex>

                        <Flex alignItems='start' justifyContent='center'>
                            <Typography.Text className='label'>Любимая музыка:</Typography.Text>
                            <Form.Item name='music' style={{ width: '100%' }}>
                                <TextArea style={{ width: '100%' }} autoSize={{ minRows: 3, maxRows: 5 }}/>
                            </Form.Item>
                        </Flex>

                        <Flex alignItems='start' justifyContent='center'>
                            <Typography.Text className='label'>Любимые фильмы:</Typography.Text>
                            <Form.Item name='movies' style={{ width: '100%' }}>
                                <TextArea style={{ width: '100%' }} autoSize={{ minRows: 3, maxRows: 5 }}/>
                            </Form.Item>
                        </Flex>

                        <Flex alignItems='start' justifyContent='center'>
                            <Typography.Text className='label'>Любимые телешоу:</Typography.Text>
                            <Form.Item name='TVShows' style={{ width: '100%' }}>
                                <TextArea style={{ width: '100%' }} autoSize={{ minRows: 3, maxRows: 5 }}/>
                            </Form.Item>
                        </Flex>

                        <Flex alignItems='start' justifyContent='center'>
                            <Typography.Text className='label'>Любимые книги:</Typography.Text>
                            <Form.Item name='books' style={{ width: '100%' }}>
                                <TextArea style={{ width: '100%' }} autoSize={{ minRows: 3, maxRows: 5 }}/>
                            </Form.Item>
                        </Flex>

                        <Flex alignItems='start' justifyContent='center'>
                            <Typography.Text className='label'>Любимые игры:</Typography.Text>
                            <Form.Item name='games' style={{ width: '100%' }}>
                                <TextArea style={{ width: '100%' }} autoSize={{ minRows: 3, maxRows: 5 }}/>
                            </Form.Item>
                        </Flex>

                        <Flex alignItems='start' justifyContent='center'>
                            <Typography.Text className='label'>Любимые цитаты:</Typography.Text>
                            <Form.Item name='quotes' style={{ width: '100%' }}>
                                <TextArea style={{ width: '100%' }} autoSize={{ minRows: 3, maxRows: 5 }}/>
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

export default EditInterests
