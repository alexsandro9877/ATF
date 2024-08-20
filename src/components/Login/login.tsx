import React, { useState } from 'react';
import { Input, Form, Button, Row, Col, message, Checkbox } from 'antd';
import { UserOutlined
    // , LockOutlined
 } from '@ant-design/icons';
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
                {/* Lado Esquerdo: Texto de boas-vindas */}
                {/* <Col xs={24} sm={24} md={16} lg={12} className="login-image" /> */}
                <Col xs={24} sm={24} md={12} className="login-left">
                    <div className="welcome-text">
                     
                        {/* <img src="../src/assets/logoaR.png" alt="Logo" className="login-logo" /> */}
                         
                        <h1>AutomateFull</h1>
                        <p>É sempre  possível melhorar</p>
                        
                    </div>
                </Col>
                
                {/* Lado Direito: Formulário de Login */}
                <Col xs={24} sm={24} md={12} className="login-right">
              
                    <div className='label-login'>
                    <h1>AutomateFull</h1>
                    <p>É sempre  possível melhorar</p>
                    <br />
                    </div>
                    <h2 >Olá, seja bem-vindo!</h2> 
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
                        {/* <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="Senha"
                                aria-label="Senha"
                            />
                        </Form.Item> */}
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Lembrar-me</Checkbox>
                            </Form.Item>
                            <a className="login-form-forgot" href="">
                                Esqueceu sua senha?
                            </a>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                loading={loading}
                                disabled={loading}
                            >
                                
                                    Conecte-se
                            </Button>
                            <Button type="default" className="sign-up-button">
                                   Inscrever-se
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="social-icons">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Login;
