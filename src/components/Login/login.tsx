import React, { useState } from "react";
import { Input, Form, Button, Row, Col, message, Checkbox } from "antd";
import {
  InstagramOutlined,
  LinkedinOutlined,
  PhoneOutlined,
  UserOutlined,
  // , LockOutlined
} from "@ant-design/icons";
import "./login.css";
import { useNavigate } from "react-router-dom";
import AuthUserStore from "../../store/auth.store";
import { MaskEmail } from "../Dynamic/Form/MaskEmail";
import MaskedInput from "antd-mask-input";
// import { useQueryClient } from "@tanstack/react-query";
// import { useSendEmail } from "../../hooks/api";

export interface ISendEmail{
  name: string;
  email: string;
  message: string;
}
const Login: React.FC = () => {
  // const queryClient = useQueryClient();
  const { logIn } = AuthUserStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [register, setRegister] = useState(false);
  const [ form] = Form.useForm();

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

  const onSingIn = () => {
    setRegister(!register);
  };

  // const { mutate: postEmail } = useSendEmail({
  //   retry: 2, // Tenta novamente 2 vezes antes de falhar
  //   // staleTime: 5000, // 5 segundos antes de considerar os dados desatualizados
  //   // cacheTime: 10000, // 10 segundos antes de remover os dados do cache
  //   onSuccess: (data: any) => {
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     //@ts-expect-error
  //     queryClient.invalidateQueries("mercadoLivreWeb");
  //     form.resetFields();
  //   },
  //   onError: (error: any) => {
  //     const errorMessage = error.response?.data?.message;
  //     message.error(errorMessage);
  //   },
  // });
  return (
    <div className="login-container">
      <Row justify="center" align="middle" className="login-content">
        {/* Lado Esquerdo: Texto de boas-vindas */}
        {/* <Col xs={24} sm={24} md={16} lg={12} className="login-image" /> */}
        <Col xs={24} sm={24} md={12} className="login-left">
          <div className="welcome-text">
            {/* <img src="../src/assets/logoaR.png" alt="Logo" className="login-logo" /> */}

            <h1>AutomateFull</h1>
            <p>É sempre possível melhorar</p>
          </div>
        </Col>

        {/* Lado Direito: Formulário de Login */}
        <Col xs={24} sm={24} md={12} className="login-right">
          <div className="label-login">
            <h1>AutomateFull</h1>
            <p>É sempre possível melhorar</p>
            <br />
          </div>
          {register ? (
            <h2>Olá, seja bem-vindo!</h2>
          ) : (
            <h2>Informe seus dados, para contato!</h2>
          )}

          <Form
            name="login_form"
            className="login-form"
            initialValues={{ remember: true }}
            form={form}
            onFinish={onFinish}
            //onFinish={(e) => console.log(e)}
          >
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

            {register ? (
              <>
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira seu nome de usuário!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Usuário"
                    aria-label="Nome de usuário"
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Lembrar-me</Checkbox>
                  </Form.Item>
                  <a className="login-form-forgot" href="">
                    Esqueceu sua senha?
                  </a>
                </Form.Item>
              </>
            ) : (
              <>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira o telefone!",
                    },
                  ]}
                >
                  <Input placeholder="Infome seu nome para contato" required/>
                </Form.Item>
                <MaskEmail
                  name="email"
                  // label= "Email"
                  placeholder="Por favor, insira um e-mail"
                  message="Por favor, insira um e-mail"
                  message_critica="Por favor, insira um e-mail válido!"
                />
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira o telefone!",
                    },
                  ]}
                >
                  <MaskedInput
                    mask="(00)0 0000 - 0000"
                    prefix={<PhoneOutlined />}
                  />
                </Form.Item>
              </>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
                disabled={loading}
              >
                {register ? "Conecte-se" : "Enviar"}
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="default"
                className="sign-up-button"
                onClick={onSingIn}
              >
                {register ? "Inscrever-se" : "Voltar"}
              </Button>
            </Form.Item>
          </Form>
          <div className="social-icons">
            {/* <a href="#">
              <i className="fab fa-facebook-f"><FacebookOutlined /></i>
            </a> */}
            <a href="https://www.linkedin.com/in/alex-sandro-alves-de-lima-4931a1167">
              <i className="fab fa-twitter">
                <LinkedinOutlined />
              </i>
            </a>
            <a href="https://www.instagram.com/automatefull/">
              <i className="fab fa-instagram">
                <InstagramOutlined />
              </i>
            </a>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
