import React, { useState } from 'react';
import { Input, Form, Button, Spin, Row, Col, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './login.css';
import { useNavigate } from 'react-router-dom';
import AuthUserStore from '../../store/auth.store';

const Login: React.FC = () => {
    const { logIn } = AuthUserStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: { username: string; password: string }) => {
        setLoading(true);
        try {
            const result = await logIn(values.username);
            if (result.success) {
                navigate("/");
            } else {
                message.error(result.message);
            }
        } catch (error) {
            message.error("Ocorreu um erro inesperado.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <Row justify="center" align="middle" className="login-content">
                <Col xs={24} sm={24} md={16} lg={12} className="login-image" />
                <Col xs={24} sm={24} md={8} lg={6} className="login-form-container">
                    <img
                        src={'./src/assets/logoaR.png'} 
          
                        alt="Logo"
                        className="login-logo"
                    />
                    <Form
                        name="login_form"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Por favor, insira seu nome de usuário!' }]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Usuário"
                                aria-label="Nome de usuário"
                            />
                        </Form.Item>
                        {/* 
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
                        >
                            <Input.Password
                                placeholder="Senha"
                                aria-label="Senha"
                            />
                        </Form.Item> */}

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                loading={loading}
                                disabled={loading}
                            >
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>

                    {loading && (
                        <div className="loading-spinner">
                            <Spin tip="Logging in..." />
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default Login;
