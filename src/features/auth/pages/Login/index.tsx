import { type FC } from 'react'
import { Button, Form, Input } from 'antd'
import { useLoginMutation } from '../../api/auth.api'
import type { LoginPayload } from '../../types/login.types'
import { regExpPassword } from '../../../../utils/regExp.ts'
import { useAppAction } from '../../../../hooks/useAppAction.ts'
import { StyledLoginWrapper } from './Login.styled.tsx'
import TextButton from '../../../kit/components/Buttons/TextButton'
import { useNavigate } from 'react-router-dom'
import { authPaths } from '../../routes/auth.paths.ts'

const Login: FC = () => {
    const navigate = useNavigate()
    const { setUser } = useAppAction()
    const [login, { isLoading }] = useLoginMutation()

    const [form] = Form.useForm()

    const handleFinish = async (payload: LoginPayload): Promise<void> => {
        const response = await login(payload)

        if (!('error' in response)) {
            const result = response?.data
            console.log('result', result)
            setUser(result)
            form.resetFields()
        }
    }

    return (
        <StyledLoginWrapper>
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
                    className='form-item'
                    label='Email'
                    name='email'
                    hasFeedback
                    validateDebounce={600}
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'The input is not valid email!' }
                    ]}
                >
                    <Input/>
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
                    <Input.Password/>
                </Form.Item>

                {/* <AnimatedShowControl show={isError}> */}
                {/*    <Alert message={error?.message} type='error' showIcon/> */}
                {/* </AnimatedShowControl> */}

                <Form.Item>
                    <Button type='primary' htmlType='submit' loading={isLoading} block>
                        Войти
                    </Button>
                </Form.Item>

                <label>
                    Ещё не зарегстрированы? <TextButton onClick={() => { navigate(authPaths.register) }}>Регистрация</TextButton>
                </label>
            </Form>
        </StyledLoginWrapper>
    )
}

export default Login
