import React, { useState } from 'react';
import { Input, Form, Card, Button, Alert, Spin, message } from 'antd';
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
            <div className="login-overlay" />
            <div className="login-content">
                <Card >
                     <img
                        src="https://i.pinimg.com/originals/81/0f/95/810f95203a1e3f370436718ebc0598cf.jpg"
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
                            />
                        </Form.Item>

                        <Form.Item>
                        <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                loading={loading}
                                disabled={loading}
                            >
                                Log in
                                {loading && (
                                    <div className="loading-spinner">
                                        <Spin tip="Logging in..." />
                                    </div>
                                )}
                            </Button>
                        </Form.Item>
                    </Form>

                   
                </Card>
            </div>
        </div>
    );
};

export default Login;
