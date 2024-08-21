import { MailOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";

interface IMaskEmail {
  name: string;
  label?: string;
  placeholder: string;
  message: string;
  message_critica: string;
}
export const MaskEmail = ({
  name,
  label,
  placeholder,
  message,
  message_critica,
}: IMaskEmail) => (
  <>
    <Form.Item
      name={name}
      label={!label ? "" : label}
      rules={[
        {
          required: true,
          message: message,
        },
        {
          validator: (_, value) =>
            value && /^[\w-/.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
              ? Promise.resolve()
              : Promise.reject(message_critica),
        },
      ]}
    >
      <Input
        prefix={<MailOutlined />}
        placeholder={placeholder}
        aria-label={label}
      />
    </Form.Item>
  </>
);
