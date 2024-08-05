import React, {  useState } from 'react';
import {  Outlet, useNavigate } from 'react-router-dom';
import {
  ShoppingOutlined, 
  //UserOutlined, 
  SearchOutlined,
  SettingOutlined, LogoutOutlined,
  UserOutlined,
  QuestionOutlined,
  ContactsOutlined,
  ContainerOutlined, 
  //QuestionOutlined,
 // ContactsOutlined, ContainerOutlined
} from '@ant-design/icons';
import {
  Layout, Avatar, Modal, theme, AutoComplete, Input,
  Button, Popover, Drawer
} from 'antd';
import AuthUserStore from '../../store/auth.store';
// import autenticaStore from './modules/autentica.store';


const { Header, Content, Footer } = Layout;

const menuItems = [
  { label: 'FeedbackSectionManut', key: '/FeedbackSectionManut', icon: <ShoppingOutlined /> },
   { label: 'FeedbackSection', key: '/FeedbackSection', icon: <ShoppingOutlined /> },
  { label: 'Site', key: '/site', icon: <UserOutlined /> },
  { label: 'FuncionalidadesForm', key: '/FuncionalidadesForm', icon: <ContainerOutlined /> },
  { label: 'ServicoForm', key: '/ServicoForm', icon: <ContactsOutlined /> },
  { label: 'CarrosselForm', key: '/CarrosselForm', icon: <QuestionOutlined /> },
//  { label: 'Configuração', key: '/settings', icon: <SettingOutlined /> },
  // { label: 'Sem mapear', key: '/map', icon: <QuestionOutlined /> },
  // { label: 'Dashboard', key: '/dashboard', icon: <QuestionOutlined /> },
  // { label: 'Teste 404', key: '/404', icon: <QuestionOutlined /> },
  // { label: 'Parcerias', key: '/partnership', icon: <QuestionOutlined /> },
];


const AppManut: React.FC = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const { userAut,logOut } = AuthUserStore();
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);
  const handleLogout = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const {
    token: { colorBgBase },
  } = theme.useToken();

  const handleSelect = (key: string) => {
    navigate(key);
    console.log(userAut);
    setSearchTerm('');
  };

//   useEffect(() => {
//     fetchUser();
// }, [fetchUser]);

  const renderUserInfo = () => {
    const content = (
      <>
        {/* Additional user info can be added here */}
      </>
    );
    return (
      <Popover content={content}>
        <Avatar src={""} onClick={showDrawer} />
      </Popover>
    );
  };

  const options = 
 // userAut && userAut[0] && userAut[0].permissions
 //   ? menuItems
  //    .filter(
  //      (item) => JSON.stringify(userAut[0].permissions).includes(String(item?.key)) && item.label.toLowerCase().includes(searchTerm.toLowerCase())
  //    )
  menuItems.map(item => ({
        value: item.key,
        label: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {item.icon}
            <span style={{ marginLeft: 8 }}>{item.label}</span>
          </div>
        ),
      }));
    // : [];



  const handleOk = () => {
    logOut();
    navigate('/login');
    setIsModalVisible(false);
  
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: colorBgBase, padding: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/9f/Babygrande_300x120_Logo.jpg"
              alt="Logo"
              style={{ width: '100px', padding: '16px' }}
            />
            <AutoComplete
              style={{ width: 200, marginLeft: 16 }}
              options={options}
              value={searchTerm}
              onChange={setSearchTerm}
              onSelect={handleSelect}
            >
              <Input
                prefix={<SearchOutlined />}
                placeholder="Menu de busca..."
              />
            </AutoComplete>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {renderUserInfo()}
          </div>
        </div>
      </Header>
      <Layout>
        <Content
          style={{
            margin: '10px 10px 0',
            overflow: 'auto',
            height: 400,
            padding: '0 1px',
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>AutomatFull ©2024 Created by AutomatFull</Footer>
        <Modal
          title="Logout"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Sim"
          cancelText="Não"
        >
          <p>Você deseja deslogar da aplicação?</p>
        </Modal>
        <Drawer title="Perfil" onClose={onClose} open={open}>
          <p>Alex</p>
          <Button icon={<SettingOutlined />} onClick={() => navigate('/settings')}>Configurações</Button>
          <Button icon={<LogoutOutlined />} type="primary" danger onClick={handleLogout}>Sair</Button>
        </Drawer>
      </Layout>
    </Layout>
  );
};

export default AppManut;
