import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Space, message, Transfer } from 'antd';
import customerStore from '../../store/customer.store';
import { ICustomer } from '../../modules/custumer.entity';

const { Option } = Select;

interface CustomerEditProps {
  id: string; 
  onClose: () => void; 
}

interface RouteItem {
  key: string;
  title: string;
  description: string;
}

const acessosApi: RouteItem[] = [
  { key: '1', title: '/', description: 'Página inicial' },
  { key: '2', title: '/user', description: 'Página de usuários' },
  { key: '3', title: '/product', description: 'Página de produtos' },
  { key: '4', title: '/dashboard', description: 'Dashboard' },
  { key: '5', title: '/settings', description: 'Configurações' },
];

const CustomerEdit: React.FC<CustomerEditProps> = ({ id, onClose }) => {
  const [form] = Form.useForm();
  const [images, setImages] = useState<string[]>([]);
  const [newImage, setNewImage] = useState('');
  const [partners, setPartners] = useState<string[]>([]);
  const [newPartner, setNewPartner] = useState('');
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  // const [acessosApi, setAcessosApi] = useState<RouteItem[]>([]);
  

  const { customer, editeCustomer,fetchCustomer } = customerStore();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customerData = customer.find((c) => c.id === id);
        if (customerData) {
          const { name, email, password, token, acesso, imagem, partner } = customerData;
     
          form.setFieldsValue({
            name,
            email,
            password,
            token,
            acesso
          });
          setImages(imagem || []);
          setPartners(partner || []);

         
        const acessosCustomer:RouteItem[] = []
           Object.keys(acesso).forEach((chave,index )=> {
            acessosCustomer.push({
                key: String(index),
                   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
                title:  acesso[chave],
                   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
                description: acesso[chave],
            });
        })
        // setAcessosApi(acessosCustomer);
          const selectedKeys = acessosApi.filter(e => acesso.includes(e.title)).map(e => e.key);
          setTargetKeys(selectedKeys);
  
      
        }
      } catch (error) {
        console.error('Erro ao buscar cliente:', error);
      }
    };

    fetchCustomer();
  }, [form, customer, id]);

  const handleAddImage = () => {
    if (newImage && !images.includes(newImage)) {
      setImages([...images, newImage]);
      setNewImage('');
    }
  };

  const handleRemoveImage = (image: string) => {
    setImages(images.filter((img) => img !== image));
  };

  const handleAddPartner = () => {
    if (newPartner && !partners.includes(newPartner)) {
      setPartners([...partners, newPartner]);
      setNewPartner('');
    }
  };

  const handleFinish = async (values: ICustomer) => {
    const formData= {
      ...values,
      acesso:  targetKeys.map((key) => acessosApi.find((e) => e.key === key)?.title || ''),
      id: id,
      imagem: images,
      partner: partners,
    };
    try {
     
      await editeCustomer(formData);
      message.success('Dados do cliente atualizados com sucesso!');
      fetchCustomer();
      setTargetKeys([]);
      onClose(); 
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      message.error('Erro ao atualizar dados do cliente. Por favor, tente novamente.');
    }
  };
  const handleChange = (newTargetKeys: string[]) => {
    setTargetKeys(newTargetKeys);
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
      <Form.Item name="token" label="Token" rules={[{ required: true, message: 'Por favor, insira o token' }]}>
        <Input placeholder="Token" disabled/>
      </Form.Item>
      <Form.Item name="acesso" label="Acesso" rules={[{ required: true, message: 'Por favor, selecione o acesso' }]}>

          <Transfer
          dataSource={acessosApi}
          targetKeys={targetKeys}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-expect-error
          onChange={handleChange}
          render={item => item.title}
          listStyle={{ width: '45%', height: 300 }}
          titles={['Disponível', 'Selecionado']}
        />
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

export default CustomerEdit;
