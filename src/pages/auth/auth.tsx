import React from 'react'
import { observer } from 'mobx-react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Form, Input, Space, Typography, message } from 'antd'
import { observable } from 'mobx'
import RootStore from '../../store/$root'

const { Title } = Typography

@observer
export class AuthPage extends React.Component<any, any> {
  @observable private isLogin = true

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
        <Card style={{ width: 400 }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Title level={3} style={{ textAlign: 'center' }}>
              {this.isLogin ? 'Login' : 'Register'}
            </Title>

            {this.isLogin ? <LoginForm onSubmit={RootStore.instance.userStore.login} /> : <RegisterForm onSubmit={RootStore.instance.userStore.register} />}

            <div style={{ textAlign: 'center' }}>
              {this.isLogin ? (
                <>
                  Don't have an account?{' '}
                  <Button type="link" onClick={() => (this.isLogin = false)}>
                    Register
                  </Button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <Button type="link" onClick={() => (this.isLogin = true)}>
                    Login
                  </Button>
                </>
              )}
            </div>
          </Space>
        </Card>
      </div>
    )
  }
}

const LoginForm: React.FC<{ onSubmit: (values: any) => Promise<void> }> = ({ onSubmit }) => {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    try {
      await onSubmit(values)
      navigate('/')
    } catch (error: any) {
      console.log(error)
      messageApi.error('Login failed')
    }
  }

  return (
    <Form layout="vertical" onFinish={onFinish}>
      {contextHolder}
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'Invalid email!' },
        ]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password placeholder="Enter your password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
      </Form.Item>
    </Form>
  )
}

const RegisterForm: React.FC<{ onSubmit: (values: any) => Promise<void> }> = ({ onSubmit }) => {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    try {
      await onSubmit(values)
      navigate('/')
    } catch (error: any) {
      console.log(error)
      messageApi.error('Register failed')
    }
  }

  return (
    <Form layout="vertical" onFinish={onFinish}>
      {contextHolder}
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'Invalid email!' },
        ]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password placeholder="Enter your password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Register
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AuthPage
