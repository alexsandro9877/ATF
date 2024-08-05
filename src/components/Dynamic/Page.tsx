import React, { useState } from 'react';
import { Form, Input, Button, Select, Space } from 'antd';

const { Option } = Select;

const Modelo = () => {
  const [form] = Form.useForm();
  const [images, setImages] = useState(['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUD14QCCQQL1zRTSWRU3neG366CfQvUWriWg&s', 'https://www.prefeitura.sp.gov.br/cidade/secretarias/upload/editado04(1).jpg']);
  const [newImage, setNewImage] = useState('');
  const [partners, setPartners] = useState(['Mercado Livre', 'Shoppe']);
  const [newPartner, setNewPartner] = useState('');

  const handleAddImage = () => {
    if (newImage && !images.includes(newImage)) {
      setImages([...images, newImage]);
      setNewImage('');
    }
  };

  const handleRemoveImage = (image) => {
    setImages(images.filter(img => img !== image));
  };

  const handleAddPartner = () => {
    if (newPartner && !partners.includes(newPartner)) {
      setPartners([...partners, newPartner]);
      setNewPartner('');
    }
  };

  const handleFinish = (values) => {
    const formData = {
      ...values,
      imagem: images,
      partner: partners
    };
    console.log(formData);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item name="name" label="Nome" rules={[{ required: true, message: 'Por favor, insira o nome' }]}>
        <Input placeholder="Nome do cliente" />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Por favor, insira o email', type: 'email' }]}>
        <Input placeholder="Email do cliente" />
      </Form.Item>
      <Form.Item name="password" label="Senha" rules={[{ required: true, message: 'Por favor, insira a senha' }]}>
        <Input.Password placeholder="Senha" />
      </Form.Item>
      <Form.Item name="confirmPassword" label="Confirmar Senha" dependencies={['password']} rules={[
        { required: true, message: 'Por favor, confirme a senha' },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('As duas senhas não coincidem!'));
          },
        }),
      ]}>
        <Input.Password placeholder="Confirmar Senha" />
      </Form.Item>
      <Form.Item name="acesso" label="Acesso" rules={[{ required: true, message: 'Por favor, selecione o acesso' }]}>
        <Select mode="multiple" placeholder="Selecione o acesso">
          <Option value="admin">Admin</Option>
          <Option value="user">User</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Imagens">
        <Space direction="vertical">
          {images.map((image, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <img src={image} alt={`image-${index}`} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
              <Button type="link" danger onClick={() => handleRemoveImage(image)}>Excluir</Button>
            </div>
          ))}
          <Space>
            <Input value={newImage} onChange={(e) => setNewImage(e.target.value)} placeholder="URL da imagem" />
            <Button onClick={handleAddImage}>Adicionar Imagem</Button>
          </Space>
        </Space>
      </Form.Item>
      <Form.Item label="Parceiro">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Select mode="multiple" value={partners} onChange={setPartners} placeholder="Selecione os parceiros">
            {partners.map(partner => <Option key={partner}>{partner}</Option>)}
          </Select>
          <Space>
            <Input value={newPartner} onChange={(e) => setNewPartner(e.target.value)} placeholder="Novo parceiro" />
            <Button onClick={handleAddPartner}>Adicionar Parceiro</Button>
          </Space>
        </Space>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Salvar</Button>
      </Form.Item>
    </Form>
  );
};

export default Modelo;
