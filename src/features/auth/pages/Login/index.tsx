import { type FC } from 'react'
import { Layout, Button, Form, Input } from 'antd'
import { useLoginMutation } from '../../api/auth.api'
import type { Login as LoginPayload } from '../../types/login.types'
import { regExpPassword } from '../../../../utils/regExp.ts'
import { type Styles } from '../../../../types/global.types.ts'
import { useAppAction } from '../../../../hooks/useAppAction.ts'

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

const Login: FC = () => {
    const { setUser } = useAppAction()
    const [login, { isLoading, error }] = useLoginMutation()

    const [form] = Form.useForm()

    const handleFinish = async (payload: LoginPayload): Promise<void> => {
        const response = await login(payload)

        if (!('error' in response)) {
            const result = response?.data?.result
            setUser(result)
            form.resetFields()
        }
    }

    console.log('error', error)

    return (
        <Layout style={styles.layout}>
            <Form
                form={form}
                name='login'
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 400, margin: '0 auto' }}
                onFinish={(data: LoginPayload) => {
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

                {/* <AnimatedShowControl show={isError}> */}
                {/*    <Alert message={error?.message} type='error' showIcon/> */}
                {/* </AnimatedShowControl> */}

                <Form.Item>
                    <Button type='primary' htmlType='submit' loading={isLoading} block>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    )
}

export default Login
