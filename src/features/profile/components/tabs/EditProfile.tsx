import { type FC, useEffect } from 'react'
import { StyledEditProfileTab } from './styled/EditProfileTab.styled.tsx'
import { Button, DatePicker, Form, Input, Space, Typography } from 'antd'
import type { RegisterDataForm } from '../../../auth/types/register.types.ts'
import Flex from '../../../kit/components/Flex'
import { useLocation } from 'react-router-dom'
import dayjs from 'dayjs'
import { useGetUserQuery, useUpdateUserMutation } from '../../api/profile.api.ts'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { normalizeRepeatableFormGet, normalizeRepeatableFormPost } from '../../../../utils/normalizeRepeatableForm.ts'
import { toast } from 'react-toastify'

const { TextArea } = Input

const EditProfile: FC = () => {
    const { state } = useLocation()
    const [form] = Form.useForm()

    const [updateUser, { isLoading }] = useUpdateUserMutation()

    const { data: user } = useGetUserQuery(state.userId)

    const handleFinish = async (payload: any): Promise<void> => {
        const grandparents = normalizeRepeatableFormPost(payload.grandparents, 'grandparent')
        const parents = normalizeRepeatableFormPost(payload.parents, 'parent')
        const siblings = normalizeRepeatableFormPost(payload.siblings, 'sibling')
        const children = normalizeRepeatableFormPost(payload.children, 'child')
        const grandsons = normalizeRepeatableFormPost(payload.grandsons, 'grandson')

        const newPayload = {
            ...payload,
            birthdate: payload.birthdate.format('DD.MM.YYYY'),
            grandparents: grandparents.length !== 0 ? grandparents : null,
            parents: parents.length !== 0 ? parents : null,
            siblings: siblings.length !== 0 ? siblings : null,
            children: children.length !== 0 ? children : null,
            grandsons: grandsons.length !== 0 ? grandsons : null
        }

        await updateUser(newPayload).then(() => {
            toast.success('Данные успешно обновлены')
        })
    }

    useEffect(() => {
        if (user != null) {
            form.setFieldsValue({
                ...user,
                grandparents: normalizeRepeatableFormGet(user.grandparents, 'grandparent'),
                parents: normalizeRepeatableFormGet(user.parents, 'parent'),
                siblings: normalizeRepeatableFormGet(user.siblings, 'sibling'),
                children: normalizeRepeatableFormGet(user.children, 'child'),
                grandsons: normalizeRepeatableFormGet(user.grandsons, 'grandson'),
                birthdate: dayjs(user?.birthdate, 'DD.MM.YYYY')
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
