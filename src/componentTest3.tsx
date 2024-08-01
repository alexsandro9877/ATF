import { Button, Form, Input } from 'antd';
import React from 'react';

const ComponentTest3 = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ComponentTest3;
