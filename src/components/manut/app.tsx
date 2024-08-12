import { useState } from 'react';
import './manut.css';
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
import {
  Layout, Avatar, Modal, theme, AutoComplete, Input,
  Popover, Row, Col,
} from 'antd';
import AuthUserStore from '../../store/auth.store';
import ProfileDrawer from './appProfileDrawer';

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
  { label: 'Mercado', key: '/userMeli', icon: <ShoppingOutlined /> },
  { label: 'Usuário', key: '/user', icon: <UserOutlined /> },
  { label: 'Cliente', key: '/customer', icon: <ContainerOutlined /> },
  { label: 'Conta', key: '/account', icon: <ContactsOutlined /> },
  { label: 'Configuração', key: '/settings', icon: <SettingOutlined /> },
  { label: 'Sem mapear', key: '/map', icon: <QuestionOutlined /> },
  { label: 'Dashboard', key: '/dashboard', icon: <QuestionOutlined /> },
  { label: 'Teste 404', key: '/404', icon: <QuestionOutlined /> },
  { label: 'Parcerias', key: '/partnership', icon: <QuestionOutlined /> },
];

const AppManut: React.FC = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { userAut, logOut } = AuthUserStore();

  const handleLogoutModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const {
    token: { colorBgBase },
  } = theme.useToken();

  const handleSelect = (key: string) => {
    navigate(key);
    setSearchTerm('');
  };

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleLogouts = () => {
    handleLogoutModal();
    setDrawerOpen(false);
  };

  const renderUserInfo = () => {
    const content = <>Configurações de user.</>;
    return (
      <Popover content={content}>
        <Avatar
          style={{ border: '1px solid black' }}
          src={"https://i.pinimg.com/originals/81/0f/95/810f95203a1e3f370436718ebc0598cf.jpg"}
          onClick={handleOpenDrawer}
        />
      </Popover>
    );
  };

  const options = menuItems.map(item => ({
    value: item.key,
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {item.icon}
        <span style={{ marginLeft: 8 }}>{item.label}</span>
      </div>
    ),
  }));

  const handleOk = () => {
    logOut();
    navigate('/login');
    setIsModalVisible(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
   <Header style={{ background: colorBgBase, padding: 0 }}>
    <div className="header-container">
        <div className="header-left">
            <img
                src="./src/assets/logoaR.png"
                alt="Logo"
                
            />
            <AutoComplete
                style={{ width: 200 }}
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
        <ProfileDrawer
          open={drawerOpen}
          onClose={handleCloseDrawer}
          handleLogout={handleLogouts}
        />
      </Layout>
    </Layout>
  );
};

export default AppManut;
