import  { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import emailjs from 'emailjs-com';

const { TextArea } = Input;

const EmailForm = () => {
  const [loading, setLoading] = useState(false);

  const sendEmail = (values: any) => {
    setLoading(true);

    const templateParams = {
      from_name: values.name,
      from_email: values.email,
      message: values.message,
    };

    emailjs.send('service_8jv009s', 'template_ov79j5q', templateParams, 'vJOy5OAPX9ao-FGXM')
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

export default EmailForm;
