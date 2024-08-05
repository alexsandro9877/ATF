import React, { useState } from 'react';
import { Form, Input, Button, Upload, DatePicker, Row, Col, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const FuncionalidadesForm: React.FC = () => {
  const [formValues, setFormValues] = useState<any>({});
  const [fileList, setFileList] = useState<any[]>([]);

  const onFinish = (values: any) => {
    console.log('Funcionalidades values: ', values);
  };

  const onValuesChange = (changedValues: any, allValues: any) => {
    setFormValues(allValues);
  };

  const handleImageChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  const handlePreview = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <Row>
      <Col span={12}>
        <Form onFinish={onFinish} onValuesChange={onValuesChange}>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Por favor, insira o email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="logo" label="Logo da Empresa" rules={[{ required: true, message: 'Por favor, faça o upload da logo' }]}>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleImageChange}
              beforeUpload={() => false}
            >
              {fileList.length < 1 && <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>}
            </Upload>
          </Form.Item>
          <Form.Item name="availableDays" label="Dias Disponíveis de Agenda" rules={[{ required: true, message: 'Por favor, insira os dias disponíveis' }]}>
            <DatePicker.RangePicker />
          </Form.Item>
          <Form.Item name="contactNumber" label="Número de Contato" rules={[{ required: true, message: 'Por favor, insira o número de contato' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="socialMedia" label="Rede Social" rules={[{ required: true, message: 'Por favor, insira a rede social' }]}>
            <Input />
            </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={12}>
        <h3>Pré-visualização</h3>
        <p><strong>Email:</strong> {formValues.email}</p>
        {fileList.length > 0 && (
          <img
            src={URL.createObjectURL(fileList[0].originFileObj)}
            alt="Pré-visualização da Logo"
            style={{ maxWidth: '100%' }}
          />
        )}
        <p><strong>Dias Disponíveis de Agenda:</strong> {formValues.availableDays ? formValues.availableDays.map((date: any) => date.format('YYYY-MM-DD')).join(', ') : ''}</p>
        <p><strong>Número de Contato:</strong> {formValues.contactNumber}</p>
        <p><strong>Rede Social:</strong> {formValues.socialMedia}</p>
      </Col>
    </Row>
  );
};

export default FuncionalidadesForm;

