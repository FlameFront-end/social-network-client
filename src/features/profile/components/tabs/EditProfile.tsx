import { type FC, useEffect } from 'react'
import { StyledEditProfileTab } from './styled/EditProfileTab.styled.tsx'
import { Button, DatePicker, Form, Input, Space, Typography } from 'antd'
import type { RegisterDataForm } from '../../../auth/types/register.types.ts'
import Flex from '../../../kit/components/Flex'
import { useLocation } from 'react-router-dom'
import dayjs from 'dayjs'
import { useGetFullUserQuery, useUpdateUserMutation } from '../../api/profile.api.ts'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { normalizeRepeatableFormGet, normalizeRepeatableFormPost } from '../../../../utils/normalizeRepeatableForm.ts'
import { toast } from 'react-toastify'

const { TextArea } = Input

const EditProfile: FC = () => {
    const { state } = useLocation()
    const [form] = Form.useForm()

    const [updateUser, { isLoading }] = useUpdateUserMutation()

    const { data: user } = useGetFullUserQuery(state.userId)

    const handleFinish = async (payload: any): Promise<void> => {
        const newPayload = {
            ...payload,
            grandparents: normalizeRepeatableFormPost(payload.grandparents, 'grandparent'),
            parents: normalizeRepeatableFormPost(payload.parents, 'parent'),
            siblings: normalizeRepeatableFormPost(payload.siblings, 'sibling'),
            children: normalizeRepeatableFormPost(payload.children, 'child'),
            grandsons: normalizeRepeatableFormPost(payload.grandsons, 'grandson'),
            birthdate: payload.birthdate.format('DD.MM.YYYY')
        }

        await updateUser(newPayload).then(() => {
            toast.success('Данные успешно обновлены')
        })
    }

    useEffect(() => {
        if (user != null) {
            form.setFieldsValue({
                ...user,
                grandparents: normalizeRepeatableFormGet(user?.details.grandparents, 'grandparent'),
                parents: normalizeRepeatableFormGet(user?.details.parents, 'parent'),
                siblings: normalizeRepeatableFormGet(user?.details.siblings, 'sibling'),
                children: normalizeRepeatableFormGet(user?.details.children, 'child'),
                grandsons: normalizeRepeatableFormGet(user?.details.grandsons, 'grandson'),
                birthdate: dayjs(user?.details.birthdate, 'DD.MM.YYYY')
            })
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
                            <Typography.Text className='label'>Фамилия:</Typography.Text>
                            <Form.Item
                                name='surname'
                                hasFeedback
                                validateDebounce={600}
                                style={{ width: '100%' }}
                                rules={[
                                    { required: true, message: 'Пожалуйста, введите свою фамилию!' }
                                ]}
                            >
                                <Input style={{ width: '100%' }}/>
                            </Form.Item>
                        </Flex>

                        <Flex alignItems='start' justifyContent='center'>
                            <Typography.Text className='label'>Имя:</Typography.Text>
                            <Form.Item
                                name='name'
                                hasFeedback
                                validateDebounce={600}
                                style={{ width: '100%' }}
                                rules={[
                                    { required: true, message: 'Пожалуйста, введите своё имя!' }
                                ]}
                            >
                                <Input style={{ width: '100%' }}/>
                            </Form.Item>
                        </Flex>

                        <Flex alignItems='start' justifyContent='center'>
                            <Typography.Text className='label'>Отчество:</Typography.Text>
                            <Form.Item
                                name='patronymic'
                                hasFeedback
                                validateDebounce={600}
                                style={{ width: '100%' }}
                            >
                                <Input style={{ width: '100%' }}/>
                            </Form.Item>
                        </Flex>

                        <Flex alignItems='start' justifyContent='center'>
                            <Typography.Text className='label'>Дата рождения:</Typography.Text>
                            <Form.Item
                                name='birthdate'
                                hasFeedback
                                style={{ width: '100%' }}
                                validateDebounce={600}
                                rules={[
                                    { required: true, message: 'Пожалуйста, выберите дату рождения!' }
                                ]}
                            >
                                <DatePicker placeholder="Выберите дату" style={{ width: '100%' }} lang='ru' format='DD.MM.YYYY'/>
                            </Form.Item>
                        </Flex>

                        <Flex alignItems='start' justifyContent='center'>
                            <Typography.Text className='label'>Краткая информация:</Typography.Text>
                            <Form.Item
                                name='shortInfo'
                                style={{ width: '100%' }}
                            >
                                <TextArea style={{ width: '100%' }} autoSize={{ minRows: 3, maxRows: 5 }}/>
                            </Form.Item>
                        </Flex>

                        <Flex alignItems='start' justifyContent='center'>
                            <Typography.Text className='label'>Родной город:</Typography.Text>
                            <Form.Item
                                name='city'
                                style={{ width: '100%' }}
                            >
                                <Input style={{ width: '100%' }}/>
                            </Form.Item>
                        </Flex>

                        <div className="divider"></div>

                        <Flex alignItems='start' justifyContent='center'>
                            <Typography.Text className='label'>Дедушки, бабушки:</Typography.Text>
                            <Flex direction='column' style={{ width: '100%' }}>
                                <Form.List name="grandparents" >
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                                <Space key={key} className='space' align="baseline">
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'grandparent']}
                                                        fieldKey={[fieldKey ?? 0, 'grandparent']}
                                                        rules={[{ required: true, message: 'введите имя дедушки или бабушки' }]}
                                                    >
                                                        <Input placeholder="введите имя дедушки или бабушки" style={{ width: '100%' }}/>
                                                    </Form.Item>
                                                    <MinusCircleOutlined onClick={() => { remove(name) }} />
                                                </Space>
                                            ))}
                                            <Form.Item>
                                                <Button type="dashed" onClick={add} block icon={<PlusOutlined />}>
                                                    Добавить
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Flex>
                        </Flex>

                        <Flex alignItems='start' justifyContent='center'>
                            <Typography.Text className='label'>Родители:</Typography.Text>
                            <Flex direction='column' style={{ width: '100%' }}>
                                <Form.List name="parents" >
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                                <Space key={key} className='space' align="baseline">
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'parent']}
                                                        fieldKey={[fieldKey ?? 0, 'parent']}
                                                        rules={[{ required: true, message: 'введите имя отца или матери' }]}
                                                    >
                                                        <Input placeholder="введите имя отца или материя" style={{ width: '100%' }}/>
                                                    </Form.Item>
                                                    <MinusCircleOutlined onClick={() => { remove(name) }} />
                                                </Space>
                                            ))}
                                            <Form.Item>
                                                <Button type="dashed" onClick={add} block icon={<PlusOutlined />}>
                                                    Добавить
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Flex>
                        </Flex>

                        <Flex alignItems='start' justifyContent='center'>
                            <Typography.Text className='label'>Братья, сёстры:</Typography.Text>
                            <Flex direction='column' style={{ width: '100%' }}>
                                <Form.List name="siblings" >
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                                <Space key={key} className='space' align="baseline">
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'sibling']}
                                                        fieldKey={[fieldKey ?? 0, 'sibling']}
                                                        rules={[{ required: true, message: 'введите имя брата или сестры' }]}
                                                    >
                                                        <Input placeholder="введите имя брата или сестры" style={{ width: '100%' }}/>
                                                    </Form.Item>
                                                    <MinusCircleOutlined onClick={() => { remove(name) }} />
                                                </Space>
                                            ))}
                                            <Form.Item>
                                                <Button type="dashed" onClick={add} block icon={<PlusOutlined />}>
                                                    Добавить
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Flex>
                        </Flex>

                        <Flex alignItems='start' justifyContent='center'>
                            <Typography.Text className='label'>Дети:</Typography.Text>
                            <Flex direction='column' style={{ width: '100%' }}>
                                <Form.List name="children" >
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                                <Space key={key} className='space' align="baseline">
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'child']}
                                                        fieldKey={[fieldKey ?? 0, 'child']}
                                                        rules={[{ required: true, message: 'введите имя сына или дочери' }]}
                                                    >
                                                        <Input placeholder="введите имя сына или дочери" style={{ width: '100%' }}/>
                                                    </Form.Item>
                                                    <MinusCircleOutlined onClick={() => { remove(name) }} />
                                                </Space>
                                            ))}
                                            <Form.Item>
                                                <Button type="dashed" onClick={add} block icon={<PlusOutlined />}>
                                                    Добавить
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Flex>
                        </Flex>

                        <Flex alignItems='start' justifyContent='center'>
                            <Typography.Text className='label'>Внуки:</Typography.Text>
                            <Flex direction='column' style={{ width: '100%' }}>
                                <Form.List name="grandsons" >
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                                <Space key={key} className='space' align="baseline">
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'grandson']}
                                                        fieldKey={[fieldKey ?? 0, 'grandson']}
                                                        rules={[{ required: true, message: 'введите имя внука или внучки' }]}
                                                    >
                                                        <Input placeholder="введите имя внука или внучки" style={{ width: '100%' }}/>
                                                    </Form.Item>
                                                    <MinusCircleOutlined onClick={() => { remove(name) }} />
                                                </Space>
                                            ))}
                                            <Form.Item>
                                                <Button type="dashed" onClick={add} block icon={<PlusOutlined />}>
                                                    Добавить
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Flex>
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

export default EditProfile
