import React, { useState } from 'react';
import { Input, Form, Button, Alert, Spin, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './login.css'; // Manter para estilização específica
import { useNavigate } from 'react-router-dom';
import AuthUserStore from '../../../store/auth.store';

const Login: React.FC = () => {
    const { logIn } = AuthUserStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onFinish = async (values: { username: string; password: string }) => {
        setLoading(true);
        setError(null); // Clear previous errors
        try {
            const result = await logIn(values.username);
            if (result.success) {
                navigate("/");
            } else {
                setError(String(result.message));
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <Row className="login-content" align="middle" justify="center">
                <Col xs={24} sm={12} md={8} className="login-form-container">
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
                                aria-label="Nome de usuário"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
                        >
                            <Input.Password
                                placeholder="Senha"
                                aria-label="Senha"
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
                            </Button>
                        </Form.Item>
                    </Form>

                    {error && (
                        <div className="custom-alert" aria-live="assertive">
                            <Alert
                                message="Erro"
                                description={error}
                                type="error"
                                showIcon
                            />
                        </div>
                    )}

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
