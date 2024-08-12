
const initialValues = {
  id: "12345",
  name: "Alex Sandro",
  email: "alexSandro@example.com",
  phone: "+5511999999999",
  password: "senhaSegura123",
  picture: "https://lh3.googleusercontent.com/a/ACg8ocKfYW81V2VbJPxTAvqMLn2xv-Jtf-7kUS90xCDEVORRMZcihWRz=s96-c",
  authMethods: {
    email: {
      enabled: true,
      email: "alexSandro@example.com"
    },
    phone: {
      enabled: true,
      phoneNumber: "+5511999999999",
      otpEnabled: true
    },
    social: {
      enabled: true,
      providers: {
        google: {
          enabled: true,
          providerId: "google-oauth2"
        },
        facebook: {
          enabled: true,
          providerId: "facebook"
        }
      }
    }
  },
  roles: [
    "user",
    "admin"
  ],
  permissions: [
    "/", "/user", "/product", "/dashboard", "/userMeli", "/settings"
  ],
  visibleRoutes: [
    "/", "/user", "/product", "/item", "/dashboard", "/view/:id", 
    "/edit/:id/desc_prod", "/edit/:id/images", "/edit/:id/prices", 
    "/edit/:id/measures", "/edit/:id/ean_codes", "/listItemForm", 
    "/listItem", "/AddItemForm", "/userMeli", "/settings"
  ],
  tema: {
    colorPrimary: "#323841",
    colorInfo: "#323841",
    colorTextBase: "#252323",
    colorBgBase: "#ffffff",
    colorTextTertiary: "#74717173",
    colorTextSecondary: "#363333a6"
  },
  account: {
    id: "a121515151",
    logo: "https://lh3.googleusercontent.com/a/ACg8ocKfYW81V2VbJPxTAvqMLn2xv-Jtf-7kUS90xCDEVORRMZcihWRz=s96-c"
  }
};
import { useState } from 'react';
import { Form, Input, Button, Card, Switch, Checkbox, message, ColorPicker } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { MaskedInput } from 'antd-mask-input';

const visibleRoutesOptions = [
  '/', '/user', '/product', '/item', '/dashboard', '/view/:id', 
  '/edit/:id/desc_prod', '/edit/:id/images', '/edit/:id/prices', 
  '/edit/:id/measures', '/edit/:id/ean_codes', '/listItemForm', 
  '/listItem', '/AddItemForm', '/userMeli', '/settings'
];

const UserCreate = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  // Função para selecionar todas as rotas visíveis
  const selectAllVisibleRoutes = () => {
    form.setFieldsValue({
      visibleRoutes: visibleRoutesOptions
    });
  };

  const onSave = () => {
    form.validateFields()
      .then(values => {
        const { email, phone, picture, name, password, roles, permissions, visibleRoutes, tema } = values;

        const payload = {
          user: {
            id: "12345",
            name,
            email,
            phone,
            password,
            picture,
            authMethods: {
              email: { enabled: true, email },
              phone: { enabled: true, phoneNumber: phone, otpEnabled: true },
              social: {
                enabled: true,
                providers: {
                  google: { enabled: true, providerId: 'google-oauth2' },
                  facebook: { enabled: true, providerId: 'facebook' }
                }
              }
            },
            roles,
            permissions,
            visibleRoutes,
            tema,
            account: { id: "11111", logo: picture },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        };

        console.log('Success:', payload);
        message.success(`Usuário ${name} cadastrado com sucesso!`);
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };
  // const onSave = () => {
  //   form.validateFields()
  //     .then(values => {
  //       console.log('Success:', values);
  //       message.success(`Usuário ${values.name} cadastrado com sucesso!`);
  //       form.resetFields();
  //     })
  //     .catch(info => {
  //       console.log('Validate Failed:', info);
  //     });
  // };

  return (
    <Card title="Criar usuário" extra={<Button type="primary" icon={<SaveOutlined />} onClick={onSave}>Salvar</Button>}>
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <Form.Item
          name="name"
          label="Nome"
          rules={[{ required: true, message: "Por favor, insira o nome!" }]}
        >
          <Input disabled={!isEditing} />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Por favor, insira o email!" }]}
        >
          <Input disabled={!isEditing} />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Telefone"
          rules={[{ required: true, message: "Por favor, insira o telefone!" }]}
        >
          <MaskedInput mask="(00)0 0000 - 0000" disabled={!isEditing} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Senha"
          rules={[{ required: true, message: "Por favor, insira a senha!" }]}
        >
          <Input.Password disabled={!isEditing} />
        </Form.Item>
        <Form.Item
          name="picture"
          label="Imagem do usuário"
          rules={[{ required: true, message: "Por favor, insira a URL da imagem!" }]}
        >
          <Input disabled={!isEditing} />
        </Form.Item>
        <Form.Item label="Métodos de Autenticação">
          <Form.Item name={['authMethods', 'email', 'enabled']} label="Email Habilitado" valuePropName="checked" noStyle>
            <Switch disabled={!isEditing} /> <span style={{ marginLeft: 8 }}> Email </span>
          </Form.Item>
          <Form.Item name={['authMethods', 'phone', 'enabled']} label="Telefone Habilitado" valuePropName="checked" noStyle>
            <Switch disabled={!isEditing} /> <span style={{ marginLeft: 8 }}> Telefone </span>
          </Form.Item>
          <Form.Item name={['authMethods', 'social', 'enabled']} label="Social Habilitado" valuePropName="checked" noStyle>
            <Switch disabled={!isEditing} /> <span style={{ marginLeft: 8 }}> Google </span>
          </Form.Item>
        </Form.Item>
        <Form.Item
          name="roles"
          label="Funções"
          rules={[{ required: true, message: "Por favor, selecione as funções!" }]}
        >
          <Checkbox.Group options={['user', 'admin']} disabled={!isEditing} />
        </Form.Item>
        <Form.Item
          name="permissions"
          label="Permissões"
          rules={[{ required: true, message: "Por favor, selecione as permissões!" }]}
        >
          <Checkbox.Group options={['/', '/user', '/product', '/dashboard', '/userMeli', '/settings']} disabled={!isEditing} />
        </Form.Item>
        <Form.Item
          name="visibleRoutes"
          label={
            <div>
              Rotas Visíveis
              <Button type="link" onClick={selectAllVisibleRoutes} style={{ marginLeft: 8 }}>
                Selecionar Todos
              </Button>
            </div>
          }
          rules={[{ required: true, message: "Por favor, selecione as rotas visíveis!" }]}
        >
          <Checkbox.Group options={visibleRoutesOptions} disabled={!isEditing} />
        </Form.Item>
        <Form.Item
          name={['account', 'id']}
          label="ID da Conta"
          rules={[{ required: true, message: "Por favor, insira o ID da conta!" }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          name={['account', 'logo']}
          label="ID da logo"
          rules={[{ required: true, message: "Por favor, insira o ID da conta!" }]}
        >
           <Input />
        </Form.Item>
        <Form.Item
          name={['tema', 'colorPrimary']}
          label="Cor Primária"
          rules={[{ required: true, message: "Por favor, insira a cor primária!" }]}
        >
     <ColorPicker disabled={true} />
        </Form.Item>
        <Form.Item
          name={['tema', 'colorInfo']}
          label="Cor de Informação"
          rules={[{ required: true, message: "Por favor, insira a cor de informação!" }]}
        >
     <ColorPicker disabled={true} />
        </Form.Item>
        <Form.Item
          name={['tema', 'colorTextBase']}
          label="Cor Base do Texto"
          rules={[{ required: true, message: "Por favor, insira a cor base do texto!" }]}
        >
          <ColorPicker disabled={true} />
        </Form.Item>
        <Form.Item
          name={['tema', 'colorBgBase']}
          label="Cor Base de Fundo"
          rules={[{ required: true, message: "Por favor, insira a cor base de fundo!" }]}
        >
          <ColorPicker disabled={true} />
        </Form.Item>
        <Form.Item
          name={['tema', 'colorTextTertiary']}
          label="Cor de Texto Terciário"
          rules={[{ required: true, message: "Por favor, insira a cor de texto terciário!" }]}
        >
   <ColorPicker disabled={true} />
        </Form.Item>
        <Form.Item
          name={['tema', 'colorTextSecondary']}
          label="Cor de Texto Secundário"
          rules={[{ required: true, message: "Por favor, insira a cor de texto secundário!" }]}
        >
       <ColorPicker disabled={true} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancelar Edição' : 'Editar'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UserCreate;
