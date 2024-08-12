import React, { useState } from 'react';
import { Input, Form, Button, Alert, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './login.css';
import { useNavigate } from 'react-router-dom';
import AuthUserStore from '../../../store/auth.store';

const Login: React.FC = () => {
    const { logIn } = AuthUserStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onFinish = async (values: { username: string; password: string }) => {
        setLoading(true);
        try {
            logIn(values.username)
                .then((e) => {
                    if (e.success) {
                        navigate("/");
                    } else {
                        setError(`${e.message}`);
                    }
                })
                .catch((error) => {
                    setError(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-image"></div>
                <div className="login-form-container">
                    <img
                        src="https://i.pinimg.com/originals/81/0f/95/810f95203a1e3f370436718ebc0598cf.jpg"
                        alt="ATF AutomatFull Logo"
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
                            >
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>

                    {error && (
                        <div className="custom-alert">
                            <Alert
                                message="Erro"
                                description={error}
                                type="error"
                                showIcon
                            />
                        </div>
                    )}

                    {loading && (
                        <div style={{ textAlign: 'center', marginTop: 16 }}>
                            <Spin tip="Logging in..." />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
