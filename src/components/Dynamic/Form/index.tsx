import React from 'react';
import { Form, Button, Space, Card } from 'antd';
interface IFormularioDinamico {
    name: string;
    label: string;
    rules: { required: boolean; message: string }[];
    component: React.ReactNode;
  }

const { Item: FormItem } = Form;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
   //@ts-expect-error
const DynamicForm = ({ onFinish, formItems,onValuesChange,form ,initialValues }) => (
  <Card title="Standard Form" style={{ maxWidth: 600, margin: 'auto' }}>
    <Form 
    onFinish={onFinish} 
    layout="vertical"
    initialValues={initialValues}
    onValuesChange={onValuesChange} 
    form={form}
    >
      {formItems.map(({ name, label, rules, component }:IFormularioDinamico) => (
        <FormItem key={name} name={name} label={label} rules={rules}>
          {component}
        </FormItem>
      ))}
      <FormItem>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="reset">
            Reset
          </Button>
        </Space>
      </FormItem>
    </Form>
  </Card>
);

export default DynamicForm;
