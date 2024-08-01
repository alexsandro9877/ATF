import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, notification } from 'antd';

const { TextArea } = Input;

const EmailFormApi = () => {
  const [loading, setLoading] = useState(false);

  const sendEmail = (values) => {
    setLoading(true);

    axios.post('http://localhost:5000/send-email', values)
      .then((response) => {
        setLoading(false);
        notification.success({
          message: 'Success',
          description: 'Email sent successfully!',
        });
      })
      .catch((error) => {
        setLoading(false);
        notification.error({
          message: 'Error',
          description: 'Failed to send email. Please try again later.',
        });
      });
  };

  return (
    <Form layout="vertical" onFinish={sendEmail}>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item
        name="message"
        label="Message"
        rules={[{ required: true, message: 'Please input your message!' }]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Send Email
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmailFormApi;
