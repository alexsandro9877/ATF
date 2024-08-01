import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import RegistrationForm from './RegistrationForm';


const LoginSection = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // Handle login
  };

  const handleRegister = (values) => {
    console.log('Received registration values: ', values);
    // Handle registration
  };

  return (
    <div className="login-section">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      {isRegistering ? (
        <RegistrationForm onRegister={handleRegister} />
      ) : (
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please enter your username' }]}
          >
            <Input placeholder="Your username" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password placeholder="Your password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      )}
      <Button type="link" onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
      </Button>
    </div>
  );
};

export default LoginSection;
