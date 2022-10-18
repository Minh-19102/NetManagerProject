import React, { useState } from 'react'
import axios from 'axios'
import serverURL from '../serverURL'
import { Button, message, Form, Input } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

function Login() {
  const [form] = Form.useForm()

  const handleSubmit = async (e) => {
    await axios
      .post(serverURL.defaultURL + 'login', {
        username: form.getFieldValue('username'),
        password: form.getFieldValue('password'),
      })
      .then((res) => {
        console.log(res)
        if (res.data[0]['userlogin'] === 1) {
          message.success('Đăng nhập thành công.')
          localStorage.setItem('user', form.getFieldValue('username'))
          setTimeout(() => {
            window.location.replace('/user')
          }, 2000)
        } else {
          message.error('Đăng nhập không thành công.')
        }
      })
  }
  return (
    <Form
      form={form}
      name="normal_login"
      className="login-form"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      autoComplete="off"
      onFinish={handleSubmit}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        placeholder="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
        Or <a href="/user/register">register now!</a>
      </Form.Item>
    </Form>
  )
}

export default Login
