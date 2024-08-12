import  { useState } from 'react';
import { Form, Input, Button, Select, Space, message, Transfer } from 'antd';
import customerStore from '../../store/customer.store';
import { ICustomer } from '../../modules/custumer.entity';

const { Option } = Select;
interface IAddProps {
  onClose: () => void; 
}

interface RouteItem {
  key: string;
  title: string;
  description: string;
}
const routesApi: RouteItem[] = [
  { key: '1', title: '/', description: 'Página inicial' },
  { key: '2', title: '/user', description: 'Página de usuários' },
  { key: '3', title: '/product', description: 'Página de produtos' },
  { key: '4', title: '/dashboard', description: 'Dashboard' },
  { key: '5', title: '/settings', description: 'Configurações' },
];
const CustomerCreate :React.FC<IAddProps> = ({onClose}) => {

  const [form] = Form.useForm(); 
  const [images, setImages] = useState(["https://img.freepik.com/vetores-premium/ilustracao-em-vetor-logotipo-do-icone-da-loja_598213-5586.jpg"]);
  const [newImage, setNewImage] = useState('');
  const [partners, setPartners] = useState(['Mercado Livre', 'Shoppe','Pendente']);
  const [newPartner, setNewPartner] = useState('');
  const [routes, setRoutes] = useState<RouteItem[]>(routesApi);
  const [selectedRoutes, setSelectedRoutes] = useState<RouteItem[]>([]);
  const { addCustomer,fetchCustomer} = customerStore();

  const handleAddImage = () => {
    if (newImage && !images.includes(newImage)) {
      setImages([...images, newImage]);
      setNewImage('');
    }
  };

     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
  const handleRemoveImage = (image) => {
    setImages(images.filter(img => img !== image));
  };

  const handleAddPartner = () => {
    if (newPartner && !partners.includes(newPartner)) {
      setPartners([...partners, newPartner]);
      setNewPartner('');
    }
  };

     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
  const handleFinish = async (values) => {
    const formData : ICustomer = {
      ...values,
      acesso: selectedRoutes.map((route) => route.title),
      imagem: images,
      partner: partners
    };
    console.log(formData)
    try {
      await addCustomer(formData)
      message.success('Dados do cliente atualizados com sucesso!');
      setRoutes(routesApi);
      setSelectedRoutes([]);
      fetchCustomer();
      form.resetFields();
      onClose();
     
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      message.error('Erro ao atualizar dados do cliente. Por favor, tente novamente.');
    }
  };
  const handleChangeRoutes = (targetKeys: string[]) => {
    const updatedRoutes = routesApi.filter((route) => targetKeys.includes(route.key));
    setSelectedRoutes(updatedRoutes);
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
      <Form.Item name="token" label="Confirmar Senha" dependencies={['password']} rules={[
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
      <Form.Item name="routes" label="Rotas" rules={[{ required: true, message: 'Por favor, selecione as rotas' }]}>
        <Transfer
          dataSource={routes}
          targetKeys={selectedRoutes.map((route) => route.key)}
          render={(item) => item.title}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-expect-error
          onChange={handleChangeRoutes}
          listStyle={{ width: '45%', height: 300 }}
          titles={['Disponíveis', 'Selecionadas']}
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

export default CustomerCreate;
