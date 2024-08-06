
import { Form, Input, Button, message } from 'antd';

const ContactForm = () => {
  const [form] = Form.useForm();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
  const handleSubmit = (values) => {
    message.success('Your message has been sent!');
    console.log('Form Values:', values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ maxWidth: 600, margin: '0 auto' }}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please enter your name' }]}
      >
        <Input placeholder="Your name" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: 'Please enter your email' }]}
      >
        <Input placeholder="Your email" />
      </Form.Item>
      <Form.Item
        name="message"
        label="Message"
        rules={[{ required: true, message: 'Please enter your message' }]}
      >
        <Input.TextArea rows={4} placeholder="Your message" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Send Message
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
