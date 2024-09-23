import { 
  // useEffect, 
  useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  ShoppingOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
  QuestionOutlined,
  ContactsOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
import { Layout, Avatar, Modal, theme, AutoComplete, Input, Popover, 
  // message
 } from 'antd';
import AuthUserStore from '../../store/auth.store';
import ProfileDrawer from './appProfileDrawer';
import './app.css';
// import { useQueryClient } from '@tanstack/react-query';
// import { useUserEmail } from '../../hooks/api';

const { Header, Content, Footer } = Layout;

const menuItems = [
  { label: 'FeedbackSectionManut', key: '/FeedbackSectionManut', icon: <ShoppingOutlined /> },
  { label: 'FeedbackSection', key: '/FeedbackSection', icon: <ShoppingOutlined /> },
  { label: 'Site', key: '/site', icon: <UserOutlined /> },
  { label: 'FuncionalidadesForm', key: '/FuncionalidadesForm', icon: <ContainerOutlined /> },
  { label: 'ServicoForm', key: '/ServicoForm', icon: <ContactsOutlined /> },
  { label: 'CarrosselForm', key: '/CarrosselForm', icon: <QuestionOutlined /> },
  { label: 'teste', key: '/teste', icon: <SettingOutlined /> },
  { label: 'Produto', key: '/product', icon: <ShoppingOutlined /> },
  { label: 'Mercado Livre', key: '/userMeli', icon: <ShoppingOutlined /> },
  { label: 'Usuário', key: '/user', icon: <UserOutlined /> },
  { label: 'Cliente', key: '/customer', icon: <ContainerOutlined /> },
  { label: 'Conta', key: '/account', icon: <ContactsOutlined /> },
  { label: 'Configuração', key: '/settings', icon: <SettingOutlined /> },
  { label: 'Sem mapear', key: '/map', icon: <QuestionOutlined /> },
  { label: 'Dashboard', key: '/dashboard', icon: <QuestionOutlined /> },
  { label: 'Teste 404', key: '/404', icon: <QuestionOutlined /> },
  { label: 'Parcerias', key: '/partnership', icon: <QuestionOutlined /> },
  { label: 'Financeiro', key: '/financeiro', icon: <QuestionOutlined /> },
];

const App: React.FC = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { userAut, logOut } = AuthUserStore();

//  const queryClient = useQueryClient();

//   const { mutate: body} = useUserEmail({
    
//     onSuccess: (data: any) => {
//          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//                   //@ts-expect-error
//       queryClient.invalidateQueries('user');
//       //fetchUser();
//        const successMessage = data.message;
//       message.success(successMessage);
//     },
//     onError: (error: any) => {
//       const errorMessage = error.response?.data?.message || 'Falha ao criar site';
//       message.error('Sessão expirada. Por favor, faça login novamente.');
//       logOut();
//       message.error(errorMessage);
//     }
//   });


  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     body({email: userAut[0].email})
  //     // if (!statusAutenticacao) {
  //     //   fetchUser();
  //     // }
     
  //     // if (!localStorage.getItem('authToken')) {
  //     //   message.error('Sessão expirada. Por favor, faça login novamente.');
  //     //   navigate('/login');
  //     // }
  //   }, 10000);
  
  //   return () => clearInterval(intervalId);
  // }, [userAut]);

  const {
    token: { colorBgBase },
  } = theme.useToken();

  const handleSelect = (key: string) => {
    navigate(key);
    setSearchTerm('');
  };

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);
  const handleLogoutModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);
  const handleLogouts = () => {
    handleLogoutModal();
    setDrawerOpen(false);
  };

  const handleOk = () => {
    logOut();
    navigate('/login');
    setIsModalVisible(false);
  };

  const renderUserInfo = () => (
    <Popover content="Configurações">
      <Avatar
        style={{ border: '1px solid black' }}
        src={userAut?.[0]?.picture}
        onClick={handleOpenDrawer}
      />
    </Popover>
  );

  const options = userAut?.[0]?.permissions
    ? menuItems
        .filter(item => 
          JSON.stringify(userAut[0].permissions).includes(item.key) &&
          item.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(item => ({
          value: item.key,
          label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {item.icon}
              <span style={{ marginLeft: 8 }}>{item.label}</span>
            </div>
          ),
        }))
    : [];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: colorBgBase, padding: 0 }}>
        <div className="header-container">
          <div className="header-left">
            <img src="https://i.pinimg.com/736x/6e/8a/fd/6e8afd1bf5993ae1f2631e2909b86cf7.jpg" alt="Logo" />
            <AutoComplete
              style={{ width: 200 }}
              options={options}
              value={searchTerm}
              onChange={setSearchTerm}
              onSelect={handleSelect}
            >
              <Input prefix={<SearchOutlined />} placeholder="Menu de busca..." />
            </AutoComplete>
          </div>
          <div className="header-right">
            {renderUserInfo()}
          </div>
        </div>
      </Header>
      <Layout>
        <Content
          className='manut-container'
          style={{
            margin: '10px 10px 0',
            overflow: 'auto',
            height: 400,
            padding: '0 1px',
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          AutomatFull ©2024 Created by AutomatFull
        </Footer>
        <Modal
          title="Logout"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Sim"
          cancelText="Não"
          width='35%'
          centered
          destroyOnClose
        >
          <p>Você deseja deslogar da aplicação?</p>
        </Modal>
        <ProfileDrawer
          useAut={userAut}
          open={drawerOpen}
          onClose={handleCloseDrawer}
          handleLogout={handleLogouts}
        />
      </Layout>
    </Layout>
  );
};

export default App;
