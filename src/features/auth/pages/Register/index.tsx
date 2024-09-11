import { type FC, useState } from 'react'
import { Layout, Button, Form, Input, Upload, type UploadProps, DatePicker } from 'antd'
import { useRegisterMutation } from '../../api/auth.api'
import { regExpPassword } from '../../../../utils/regExp.ts'
import { type Styles } from '../../../../types/global.types.ts'
import { useAppAction } from '../../../../hooks/useAppAction.ts'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { type RegisterDataForm } from '../../types/register.types.ts'
import { useNavigate } from 'react-router-dom'
import { pathsConfig } from '../../../../router/entities/paths.config.ts'
import Flex from '../../../kit/components/Flex'

const styles: Styles = {
    layout: {
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40
    },
    space: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40
    },
    formBlock: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'baseline',
        width: 400,
        margin: '24px 0'
    },
    buttonRecovery: {
        width: '30%'
    }
}

const Register: FC = () => {
    const navigate = useNavigate()
    const { setUser } = useAppAction()
    const [register, { isLoading }] = useRegisterMutation()
    const [form] = Form.useForm()

    const [imageUrl, setImageUrl] = useState<string>()
    const [loading, setLoading] = useState(false)

    const handleFinish = async (payload: RegisterDataForm): Promise<void> => {
        const response = await register({
            ...payload,
            birthdate: payload.birthdate.format('DD.MM.YYYY'),
            ava: imageUrl
        })

        if (!('error' in response)) {
            const result = response?.data
            setUser(result)
            navigate(pathsConfig.root)
            form.resetFields()
        }
    }

    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return
        }
        if (info.file.status === 'done') {
            setImageUrl(info.file.response.url)
        }
    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Загрузить</div>
        </button>
    )

    return (
        <Layout style={styles.layout}>
            <Form
                form={form}
                name='register'
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 400, margin: '0 auto' }}
                onFinish={(data: RegisterDataForm) => {
                    void handleFinish(data)
                }}
                autoComplete='off'
            >
                <Form.Item
                    label='Электронная почта'
                    name='email'
                    hasFeedback
                    validateDebounce={600}
                    rules={[
                        { required: true, message: 'Пожалуйста, введите свой адрес электронной почты!' },
                        { type: 'email', message: 'Введенный адрес электронной почты неверен!' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Flex>
                    <Form.Item
                        label='Фамилия'
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
                    <Form.Item
                        label='Имя'
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

                <Flex>
                    <Form.Item
                        label='Отчество'
                        name='patronymic'
                        style={{ width: '100%' }}
                    >
                        <Input style={{ width: '100%' }}/>
                    </Form.Item>

                    <Form.Item
                        label='Дата рождения'
                        name='birthdate'
                        hasFeedback
                        style={{ width: '100%' }}
                        rules={[
                            { required: true, message: 'Пожалуйста, выберите дату рождения!' }
                        ]}
                    >
                        <DatePicker placeholder="Выберите дату" style={{ width: '100%' }} lang='ru' format='DD.MM.YYYY' />
                    </Form.Item>
                </Flex>

                <Form.Item
                    label='Фотография'
                    name='ava'
                    hasFeedback
                >
                    <Upload
                        name="ava"
                        showUploadList={false}
                        listType="picture-card"
                        className="avatar-uploader"
                        onChange={handleChange}
                        action='http://localhost:3000/upload/image'
                        accept="image/jpeg, image/png, image/gif"
                    >
                        {(imageUrl != null) ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item
                    label='Пароль'
                    name='password'
                    hasFeedback
                    validateDebounce={600}
                    rules={[
                        { required: true },
                        {
                            validator: async (_, value) => {
                                if (value === undefined || value === '') {
                                    await Promise.reject(new Error('Пожалуйста, введите свой пароль!'))
                                } else if (!regExpPassword.test(value)) {
                                    await Promise.reject(new Error('Пароль должен содержать не менее 9 символов и состоять из заглавных букв, цифр и специальных символов, таких как "#@&".'))
                                }
                            }
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit' loading={isLoading} block>
                        Зарегестрироваться
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    )
}

export default Register
