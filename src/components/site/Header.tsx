import  { useState } from 'react';
import { Layout, Menu, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import logo from '../assets/logo.png';
import './Header.css';

const { Header } = Layout;

const AppHeader = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Header className="app-header">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className="menu">
        <Menu.Item key="1"><a href="#home">Home</a></Menu.Item>
        <Menu.Item key="2"><a href="#login">Login</a></Menu.Item>
        <Menu.Item key="3"><a href="#services">Services</a></Menu.Item>
        <Menu.Item key="4"><a href="#testimonials">Testimonials</a></Menu.Item>
        <Menu.Item key="5"><a href="#feedback">Feedback</a></Menu.Item>
        <Menu.Item key="6"><a href="#contact">Contact</a></Menu.Item>
      </Menu>
      <Button className="menu-button" type="primary" onClick={showDrawer} icon={<MenuOutlined />} />
      <Drawer title="Menu" placement="right" onClose={onClose} visible={visible}>
        <Menu theme="light" mode="vertical" defaultSelectedKeys={['1']}>
          <Menu.Item key="1"><a href="#home">Home</a></Menu.Item>
          <Menu.Item key="2"><a href="#login">Login</a></Menu.Item>
          <Menu.Item key="3"><a href="#services">Services</a></Menu.Item>
          <Menu.Item key="4"><a href="#testimonials">Testimonials</a></Menu.Item>
          <Menu.Item key="5"><a href="#feedback">Feedback</a></Menu.Item>
          <Menu.Item key="6"><a href="#contact">Contact</a></Menu.Item>
        </Menu>
      </Drawer>
    </Header>
  );
};

export default AppHeader;
