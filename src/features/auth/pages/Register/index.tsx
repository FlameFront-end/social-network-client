import { type FC, useState } from 'react'
import { Layout, Button, Form, Input, Upload, type UploadProps } from 'antd'
import { useRegisterMutation } from '../../api/auth.api'
import { regExpPassword } from '../../../../utils/regExp.ts'
import { type Styles } from '../../../../types/global.types.ts'
import { useAppAction } from '../../../../hooks/useAppAction.ts'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { type RegisterPayload } from '../../types/register.types.ts'

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
    const { setUser } = useAppAction()
    const [register, { isLoading }] = useRegisterMutation()
    const [form] = Form.useForm()

    const [imageUrl, setImageUrl] = useState<string>()
    const [loading, setLoading] = useState(false)

    const handleFinish = async (payload: RegisterPayload): Promise<void> => {
        const response = await register({
            ...payload,
            ava: imageUrl
        })

        if (!('error' in response)) {
            const result = response?.data?.result
            setUser(result)
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
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    )

    return (
        <Layout style={styles.layout}>
            <Form
                form={form}
                name='login'
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 400, margin: '0 auto' }}
                onFinish={(data: RegisterPayload) => {
                    void handleFinish(data)
                }}
                autoComplete='off'
            >
                <Form.Item
                    label='Email'
                    name='email'
                    hasFeedback
                    validateDebounce={600}
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'The input is not valid email!' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Ava'
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
                    label='Nickname'
                    name='nick'
                    hasFeedback
                    validateDebounce={600}
                    rules={[
                        { required: true, message: 'Please input your nickname!' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Password'
                    name='password'
                    hasFeedback
                    validateDebounce={600}
                    rules={[
                        {
                            validator: async (_, value) => {
                                if (value === undefined || value === '') {
                                    await Promise.reject(new Error('Please input your password!'))
                                } else if (!regExpPassword.test(value)) {
                                    await Promise.reject(new Error('The password must be at least 9 characters and contain capital letters, numbers and special characters, such as "#@&".'))
                                }
                            }
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit' loading={isLoading} block>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    )
}

export default Register
