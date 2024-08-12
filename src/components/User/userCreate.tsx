// import  { useState } from 'react';
// import { Form, Input, Button,  Space, message, Card, Checkbox, Switch, Transfer } from 'antd';

// import MaskedInput from 'antd-mask-input';
// import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
// import {  IUserCreate } from '../../modules/user.entity';
// import userStore from '../../store/user.store';
// import DynamicButton from '../Dynamic/Button/DynamicButtonProps';
// import AuthUserStore from '../../store/auth.store';

// // const { Option } = Select;
// interface IAddProps {
//   onClose: () => void; 
// }

// interface RouteItem {
//   key: string;
//   title: string;
//   description: string;
// }
// const routesApi: RouteItem[] = [
//   { key: '1', title: '/', description: 'Página inicial' },
//   { key: '2', title: '/user', description: 'Página de usuários' },
//   { key: '3', title: '/product', description: 'Página de produtos' },
//   { key: '4', title: '/dashboard', description: 'Dashboard' },
//   { key: '5', title: '/settings', description: 'Configurações' },
// ];

// const routeOptionItem: RouteOptionItem[] = [
//   { key: '1', title:'/', description: 'Página'},
//   { key: '2', title: '/user',  description: 'Página'},
//   { key: '3', title: '/product',  description: 'Página'},
//   { key: '4', title: '/item',  description: 'Página'},
//   { key: '5', title: '/dashboard', description: 'Página'}, 
//   { key: '6', title: '/view/:id',  description: 'Página'},
//   { key: '7', title: '/edit/:id/desc_prod',  description: 'Página'},
//   { key: '8', title: '/edit/:id/images',  description: 'Página'},
//   { key: '9', title: '/edit/:id/prices',  description: 'Página'},
//   { key: '10', title: '/edit/:id/measures',  description: 'Página'},
//   { key: '11', title: '/edit/:id/ean_codes',  description: 'Página'},
//   { key: '12', title: '/listItemForm',  description: 'Página'},
//   { key: '13', title: '/listItem',  description: 'Página'},
//   { key: '14', title: '/AddItemForm',  description: 'Página'},
//   { key: '15', title: '/userMeli',  description: 'Página'},
//   { key: '16', title: '/settings', description: 'Página'},
// ];



// const userCreate :React.FC<IAddProps> = ({onClose}) => {
//   const [routes, setRoutes] = useState<RouteItem[]>(routesApi);
//   const [selectedRoutes, setSelectedRoutes] = useState<RouteItem[]>([]);
//   const [routesOption, setRoutesOption] = useState<RouteItem[]>(routeOptionItem);
//   const [selectedRoutesOption, setSelectedRoutesOption] = useState<RouteItem[]>([]);
//   const [form] = Form.useForm(); 
//   const [images, setImages] = useState(["https://api.dicebear.com/9.x/lorelei/svg?flip=true"]);
//   const [newImage, setNewImage] = useState('');
//   const { userAut } = AuthUserStore();
//   const { addUser} = userStore();
  

//   const validateEmail = (_, value) => {
//     if (value && /\S+@\S+\.\S+/.test(value)) {
//       return Promise.resolve();
//     }
//     return Promise.reject('Valide o campo de email');
//   };

//   const validatePassword = (_, value) => {
//     if (value && /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(value)) {
//       return Promise.resolve();
//     }
//     return Promise.reject('Senha deve conter números e letras');
//   };


//   const handleAddImage = () => {
//     if (newImage && !images.includes(newImage)) {
//       setImages([...images, newImage]);
//       setNewImage('');
//     }
//   };

//   const handleRemoveImage = (image) => {
//     setImages(images.filter(img => img !== image));
//   };


//   const handleFinish = async  (values : any) => {
//  const { email, phone,  name, password, roles,   theme,accountId, authMethods } = values;

//  const payload : IUserCreate= {
//                   name,
//                   email,
//                   phone,
//                   password,
//                   picture : images[0],
//                   authMethods: {
//                     email: { enabled: true, email },
//                     phone: { enabled: true, phoneNumber: phone, otpEnabled: true },
//                     social: {
//                       enabled: authMethods,
//                       providers: {
//                         google: { enabled: authMethods, providerId: 'google-oauth2' },
//                         facebook: { enabled: authMethods, providerId: 'facebook' }
//                       }}
//                     },
//                   roles,
//                   permissions:selectedRoutes.map((route) => route.title),
//                   visibleRoutes:selectedRoutesOption.map((route) => route.title),
//                   theme,
//                   accountId
// };

//     try {
//       await addUser(payload)
//       message.success(`Usuário cadastrado com sucesso!`);
//      form.resetFields();
//      onClose();
     
//     } catch (error) {
//       console.error('Erro ao atualizar cliente:', error);
//       message.error('Erro ao atualizar dados do cliente. Por favor, tente novamente.');
//     }
//   };

//   const handleChangeRoutes = (targetKeys: string[]) => {
//     const updatedRoutes = routesApi.filter((route) => targetKeys.includes(route.key));
//     setSelectedRoutes(updatedRoutes);
//   };

//   const handleChangeRoutesOption = (targetKeys: string[]) => {
//     const updatedRoutes = routeOptionItem.filter((route) => targetKeys.includes(route.key));
//     setSelectedRoutesOption(updatedRoutes);
//   };

//   return (
// <><Card title="Criar usuario">
//     <Form form={form} layout="vertical" onFinish={handleFinish}>
//       <Form.Item
//         name="name"
//         label="Nome"
//         rules={[{ required: true, message: "Por favor, insira o nome!" }]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item
//         name="email"
//         label="Email"
//         rules={[{ required: true, message: "Por favor, insira o email!" }, { validator: validateEmail }]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item
//         name="phone"
//         label="Telefone"
//         rules={[{ required: true, message: "Por favor, insira o telefone!" }]}
//       >
//         <MaskedInput mask="(00)00000-0000" />
//       </Form.Item>
//       <Form.Item
//         name="password"
//         label="Senha"
//         rules={[{ required: true, message: "Por favor, insira a senha!" }, { validator: validatePassword }]}
//       >
//         <Input.Password />
//       </Form.Item>
//       <Form.Item 
//        name="picture"
//        label="Imagem usuario."
//        rules={[{ required: false, message: "Por favor, insira a URL da imagem!" }]}
//       >
//         <Space direction="vertical">
//           {images.map((image, index) => (
//             <div key={index} style={{ display: 'flex', alignItems: 'center', border :"1px solid" }}>
//               <img src={image} alt={`image-${index}`} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
//               {index === 0 ? "Imagem do perfil":"Você só pode enviar, uma imagem para seu perfil"}
//               <DynamicButton  danger ={true}  onClick={() => handleRemoveImage(image)} title='Excluir registro' icon={<CloseOutlined />}  />
              
//             </div>
//           ))}
//           <Space>
//             <Input value={newImage} onChange={(e) => setNewImage(e.target.value)} placeholder="URL da imagem" />
//             <Button onClick={handleAddImage}>Adicionar Imagem</Button>
//           </Space>
//         </Space>
//         </Form.Item>
//       {/* <Form.Item label="Authentication Methods">
//         <Form.Item name={['authMethods', 'email', 'enabled']} label="Email Enabled"   noStyle>
//           <Switch /> <span style={{ marginLeft: 8 }}> Email </span>
//         </Form.Item>
//         <Form.Item name={['authMethods', 'phone', 'enabled']} label="Phone Enabled"   noStyle>
//           <Switch /> <span style={{ marginLeft: 8 }}> Telefone </span>
//         </Form.Item>
//         <Form.Item name={['authMethods', 'social', 'enabled']} label="Social Enabled"  noStyle>
//           <Switch /> <span style={{ marginLeft: 8 }}> Google </span>
//         </Form.Item>
//       </Form.Item> */}
//        <Form.Item
//         name="authMethods"
//         label="Authentication Google"
//         valuePropName="checked" 
//       >
//         <Checkbox>Enable Google Authentication</Checkbox>
//       </Form.Item>
//       <Form.Item
//         name="roles"
//         label="Roles"
//         initialValue={['user']}
//       >
//         <Checkbox.Group options={['user', 'admin']} />
//       </Form.Item>
//       <Form.Item name="routes" label="Rotas" rules={[{ required: true, message: 'Por favor, selecione as rotas' }]}>
//         <Transfer
//           dataSource={routes}
//           targetKeys={selectedRoutes.map((route) => route.key)}
//           render={(item) => item.title}
//           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//           //@ts-expect-error
//           onChange={handleChangeRoutes}
//           listStyle={{ width: '45%', height: 300 }}
//           titles={['Disponíveis', 'Selecionadas']}
//         />
//       </Form.Item>

//       <Form.Item name="visibleRoutes" label="Rotas Visiveis" rules={[{ required: true, message: 'Por favor, selecione as rotas' }]}>
//         <Transfer
//           dataSource={routesOption}
//           targetKeys={selectedRoutesOption.map((route) => route.key)}
//           render={(item) => item.title}
//           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//           //@ts-expect-error
//           onChange={handleChangeRoutesOption}
//           listStyle={{ width: '45%', height: 300 }}
//           titles={['Disponíveis', 'Selecionadas']}
//         />
//       </Form.Item>
       
//       <Form.Item name="accountId" label="Account ID" initialValue={userAut[0].accountId}>
//         <Input disabled />
//       </Form.Item>
//       <Form.Item label="Theme">
//         <Form.Item name={['theme', 'colorPrimary']} label="Primary Color" initialValue="#323841" noStyle>
//           <Input disabled />
//         </Form.Item>
//         <Form.Item name={['theme', 'colorInfo']} label="Info Color" initialValue="#323841" noStyle>
//           <Input disabled />
//         </Form.Item>
//         <Form.Item name={['theme', 'colorTextBase']} label="Text Base Color" initialValue="#252323" noStyle>
//           <Input disabled />
//         </Form.Item>
//         <Form.Item name={['theme', 'colorBgBase']} label="Background Base Color" initialValue="#ffffff" noStyle>
//           <Input disabled />
//         </Form.Item>
//         <Form.Item name={['theme', 'colorTextTertiary']} label="Text Tertiary Color" initialValue="#74717173" noStyle>
//           <Input disabled />
//         </Form.Item>
//         <Form.Item name={['theme', 'colorTextSecondary']} label="Text Secondary Color" initialValue="#363333a6" noStyle>
//           <Input disabled />
//         </Form.Item>
//       </Form.Item>
//       <Form.Item>
//         <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
//           Salvar
//         </Button>
//       </Form.Item>
//     </Form>
//   </Card>
//   </>

//   );
// };

// export default userCreate;
