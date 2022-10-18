import React, { useState } from 'react'
import axios from 'axios'
import serverURL from '../serverURL'
import { Button, message, Form, Input } from 'antd'

function AccountRegister() {
  const [form] = Form.useForm()
  const handleSubmit = async (e) => {
    await axios
      .post(serverURL.defaultURL + 'createAccount', {
        userID: form.getFieldValue('userid'),
        username: form.getFieldValue('username'),
        password: form.getFieldValue('password'),
      })
      .then((res) => {
        if (res.data[0]['createaccount'] === 'Thành công') {
          message.success('Đăng ký thành công.')
          localStorage.setItem('user', form.getFieldValue('username'))
          setTimeout(() => {
            window.location.replace('/user')
          }, 2000)
        } else {
          message.error('Đăng ký không thành công do ' + res.data[0]['createaccount'])
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
        label="UserID"
        name="userid"
        rules={[
          {
            required: true,
            message: 'Please input your user ID!',
          },
        ]}
      >
        <Input placeholder="UserID" />
      </Form.Item>
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
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Register
        </Button>
        Or <a href="/user/Login">login now!</a>
      </Form.Item>
    </Form>
  )
}

export default AccountRegister
