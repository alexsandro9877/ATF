
// const initialValuesAdd = {
//   name: "Alex Sandrodss",
//   email: "tests@testde.com",
//   phone: "(11)11111-1111",
//   password: "as1d23as1",
//  picture: "https://api.dicebear.com/9.x/lorelei/svg?flip=true",
//    status:true,
//   azp:"",
//   roles: [
//       "user","admin"
//   ],
//   permissions: [
//           "/user",
//       "/product",
//       "/item",
//       "/dashboard",
//       "/userMeli",
//       "/customer",
//       "/account",
//       "/teste",
//       "/dashboard",
//       "/404",
//       "/partnership"

//   ],
//   visibleRoutes: [
//       "/",
//       "/user",
//       "/product",
//       "/item",
//       "/dashboard",
//       "/view/:id",
//       "/edit/:id/desc_prod",
//       "/edit/:id/images",
//       "/edit/:id/prices",
//       "/edit/:id/measures",
//       "/edit/:id/ean_codes",
//       "/listItemForm",
//       "/listItem",
//       "/AddItemForm",
//       "/userMeli",
//        "/settings",
//         "/customer",
//       "/account",
//       "/teste",
//       "/dashboard",
//       "/404",
//       "/partnership"
//   ],
//   accountId: "6697df8c65a0d3616b98d2d9"
// };
import { useEffect, useState } from 'react';
import { Form, Input, Button,   Checkbox, message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { MaskedInput } from 'antd-mask-input';

import { useQueryClient } from '@tanstack/react-query';
import { usePostUser } from '../../hooks/api';
import { IUserCreated } from '../../types/typeUserPost';
import AuthUserStore from '../../store/auth.store';
import { IUserResp } from '../../types/typeUserResp';



const visibleRoutesOptions = [
  '/', '/user', '/product', '/item', '/dashboard', '/view/:id', 
  '/edit/:id/desc_prod', '/edit/:id/images', '/edit/:id/prices', 
  '/edit/:id/measures', '/edit/:id/ean_codes', '/listItemForm', 
  '/listItem', '/AddItemForm', '/userMeli', '/settings'
];

interface CreateUserFormProps {
  initialValues?: IUserResp; 
  onClose: () => void; 
}


const UserCreateEdit :React.FC<CreateUserFormProps> = ({onClose, initialValues})  => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const { userAut } = AuthUserStore();


  const queryClient = useQueryClient();
  
  const { mutate: postUser} = usePostUser({
    
    onSuccess: (data: any) => {
      const successMessage = data.message || 'Site criado com sucesso';
      message.success(successMessage);
         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
      queryClient.invalidateQueries('user');
      form.resetFields();
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Falha ao criar site';
      message.error(errorMessage);
    }
  });


  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
    
    setIsEditing(userAut[0].azp === 'EDT' ? true : false)
  }, [initialValues, form]);
  

  // Função para selecionar todas as rotas visíveis
  const selectAllVisibleRoutes = () => {
    form.setFieldsValue({
      visibleRoutes: visibleRoutesOptions
    });
  };

 
  const onSave = () => {
    form.validateFields()
      .then(values => {
        const { email, phone, picture, name, password, roles, permissions, visibleRoutes,  accountId } = values
        const payload: IUserCreated = {
          
          azp: 'CON',
          status: false,  
          name,
            email,
            phone,
            password,
            picture,
            roles,
            permissions,
            visibleRoutes,
            accountId: accountId
          
        };
        initialValues ? console.log({...values, id: initialValues.id}) :  postUser(payload)
        onClose();
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
      <Form form={form} 
            layout="vertical" 
            initialValues={initialValues }
        >
          
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
          name={['accountId']}
          label="ID da Conta"
          initialValue={userAut[0].accountId? userAut[0].accountId :'' }
        >
          {userAut[0].accountId?  <Input disabled />:<Input /> }
         
        </Form.Item>

      
        <Form.Item>
          {isEditing ? <Button type="primary" icon={<SaveOutlined />} onClick={onSave}>Salvar</Button> : '' }
        </Form.Item>
      </Form>
    
  );
};

export default UserCreateEdit;
