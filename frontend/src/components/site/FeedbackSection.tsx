import  { useEffect, useState } from 'react';
import { Form, Input, Button, Rate,  message, Avatar, Row, Col, Image, Divider } from 'antd';
import '../site/FeedbackSection.css';

import DynamicCard from '../Dynamic/Card/DynamicCardProps ';

interface FeedbackSection {
  id: string;
  name: string;
  feedback: string;
  rating_qualidade: number;
  rating_profissionalismo: number;
  rating_tempo: number;
  rating_limpeza: number;
  rating_comunicacao: number;
  avatar: string;
  eleger: boolean;
  dataInclusao: string;
}

const FeedbackSection = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackSection[]>([]);
  const [avata, setAvata] = useState<string| null>(null);
  const [form] = Form.useForm<FeedbackSection>();

  useEffect(() => {
    avatarTela();
  }, [feedbacks]);

  const onFinish = (values: FeedbackSection) => {
    const currentDate = new Date();
    const newItem: FeedbackSection = {
      ...values,
      id: Math.floor(Date.now() * Math.random()).toString(36),
      avatar: avata === null ? '': avata ,
      eleger: false,
      dataInclusao: currentDate.toLocaleString('pt-BR')
    };
    setFeedbacks([...feedbacks, newItem]);
    message.success('Feedback adicionado com sucesso!');
    form.resetFields();
    setAvata(null);
  };

  const handleAvatar = (avatar: string) => {
    setAvata(avatar);
  };

  const avatarTela = () => {
    const tamanhoDoArray = 30;
    return Array.from({ length: tamanhoDoArray }, (_, i) => (
      <Avatar
        style={{
          border: '2px solid #1890ff',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
        }}
        onClick={() => handleAvatar(`https://api.dicebear.com/9.x/lorelei/svg?seed=${i}`)}
        key={i}
        src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${i}`}
      />
    ));
  };

  return (
    <>
      <DynamicCard
        title="Feedback"
        content={
          <Row justify="space-between" gutter={[16, 24]} className="feedback-section">
            <Col flex={'auto'}>
              <h2>Deixe seu Feedback</h2>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                  name="name"
                  label="Nome"
                  rules={[{ required: true, message: 'Por favor, insira seu nome' }]}
                >
                  <Input placeholder="Seu nome" />
                </Form.Item>

                <Form.Item
                  name="rating_qualidade"
                  label="1. Qualidade do Serviço:"
                  rules={[{ required: true, message: 'Por favor, avalie nosso serviço' }]}
                >
                  <Rate allowHalf />
                </Form.Item>
                <Form.Item
                  name="rating_profissionalismo"
                  label="2. Profissionalismo:"
                  rules={[{ required: true, message: 'Por favor, avalie nosso serviço' }]}
                >
                  <Rate allowHalf />
                </Form.Item>
                <Form.Item
                  name="rating_tempo"
                  label="3. Tempo de Execução:"
                  rules={[{ required: true, message: 'Por favor, avalie nosso serviço' }]}
                >
                  <Rate allowHalf />
                </Form.Item>
                <Form.Item
                  name="rating_limpeza"
                  label="4. Limpeza e Organização:"
                  rules={[{ required: true, message: 'Por favor, avalie nosso serviço' }]}
                >
                  <Rate allowHalf />
                </Form.Item>
                <Form.Item
                  name="rating_comunicacao"
                  label="5. Comunicação:"
                  rules={[{ required: true, message: 'Por favor, avalie nosso serviço' }]}
                >
                  <Rate allowHalf />
                </Form.Item>
                <Form.Item
                  name="feedback"
                  label="Feedback"
                  rules={[{ required: false, message: 'Por favor, insira seu feedback' }]}
                >
                  <Input.TextArea rows={4} placeholder="Seu feedback" />
                </Form.Item>

          
              <Row gutter={[16, 16]} justify="center">
                <Col>
                <Divider orientation="center">Avatar Escolhido</Divider>
                  <Image
                    width={100}
                    style={{ border: 'solid 2px black', transition: 'border 0.3s' }}
                    src={avata === null ? '': avata}
                  />
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Divider orientation="left">Escolha seu Avatar</Divider>
                  {avatarTela()}
                </Col>
              </Row>
            <br />
            
            <Form.Item>
                  <Button type="primary" htmlType="submit" disabled={avata === null ? true: false} >
                    Enviar Feedback
                  </Button>
                </Form.Item>
                </Form>
            </Col>
          </Row>
        }
      />
     
    </>
  );
};

export default FeedbackSection;
