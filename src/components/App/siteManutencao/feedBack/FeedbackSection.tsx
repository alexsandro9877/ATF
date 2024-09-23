import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Rate, List, message, Avatar, Row, Col, Image, Switch, Tooltip, Space, Popconfirm, Divider } from 'antd';
import './FeedbackSection.css';
import DynamicButton from '../../../Dynamic/Button/DynamicButtonProps';

import { CaretLeftOutlined, CheckOutlined, CloseOutlined, DeleteOutlined, FolderViewOutlined, StarOutlined } from '@ant-design/icons';
import DynamicCard from '../../../Dynamic/Card/DynamicCardProps';


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

const FeedbackSectionManut = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackSection[]>([]);
  const [editingFeedback, setEditingFeedback] = useState<string | null>(null);
  const [avata, setAvata] = useState<string| null>(null);
  const [form] = Form.useForm<FeedbackSection>();
  const [searchTerm, setSearchTerm] = useState('');

  const options: FeedbackSection[] = 
  searchTerm ? feedbacks.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : feedbacks;

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

  const onEditFinish = (values: FeedbackSection, id: string) => {
    const updatedFeedbacks = feedbacks.map((feedback) =>
      feedback.id === id ? { ...feedback, ...values } : feedback
    );
    setFeedbacks(updatedFeedbacks);
    setEditingFeedback(null);
    setAvata(null);
    message.success('Feedback atualizado com sucesso!');
  };

  const deleteFeedback = (id: string): void => {
    const newFeedbacks = feedbacks.filter((e) => e.id !== id);
    setFeedbacks(newFeedbacks);
    message.info('Dado excluído!');
  };

  const editFeedback = (id: string): void => {
    setEditingFeedback(id);
  };

  const handleAvatar = (avatar: string) => {
    setAvata(avatar);
  };

  const handleElegerSite = (checked: boolean, id: string) => {
    const updatedFeedbacks = feedbacks.map((feedback) =>
      feedback.id === id ? { ...feedback, eleger: checked } : feedback
    );
    setFeedbacks(updatedFeedbacks);
    message.info(checked ? 'Feedback adicionado no site para demais pessoas ver!' : 'Feedback removido do site!');
  };

  const IconText = ({ icon, text }: { icon: React.ReactNode; text?: number }) => (
    <Space>
      {icon}
      {text}
    </Space>
  );

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
      <DynamicCard
        title="Feedback de Clientes"
        extra={<Input.Search size="large" placeholder="Buscar por nome" onChange={(e) => setSearchTerm(e.target.value)} />}
        content={
          <List
            className="feedback-list"
            itemLayout="vertical"
            dataSource={options}
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 3,
            }}
            footer={<div>Comentários de clientes</div>}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                actions={[
                  <IconText icon={<StarOutlined />} text={item.rating_qualidade} />,
                  <IconText icon={
                    <DynamicButton
                      onClick={() => editFeedback(item.id)}
                      title="Visualizar"
                      icon={<FolderViewOutlined />}
                    />}
                  />,
                  <IconText icon={
                    <Popconfirm
                      title="Deletar feedback."
                      description="Deseja deletar o feedback?"
                      onConfirm={() => deleteFeedback(item.id)}
                      okText="Sim"
                      cancelText="Não"
                    >
                      <DynamicButton
                        icon={<DeleteOutlined />}
                        title="Deletar"
                        disabled={!!editingFeedback}
                        danger
                      />
                    </Popconfirm>
                  }
                  />,
                  <IconText icon={
                    <Tooltip title="Eleger para o site">
                      <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        size="small"
                        checked={item.eleger}
                        onChange={(checked) => handleElegerSite(checked, item.id)}
                      />
                    </Tooltip>
                  } />,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={`${item.name} - ${item.dataInclusao}`}
                  description={
                  <p>Feedback: {item.feedback} </p>
                }
                />

                {editingFeedback === item.id && (
                  <DynamicCard
                    title={` Editar Feedback - ${item.dataInclusao}`}
                    content={
                      <Row gutter={[16, 16]} justify="space-between">
                        <Col flex="auto">
                      
                          <Form
                            initialValues={item}
                            layout="horizontal"
                            onFinish={(values) => onEditFinish(values as FeedbackSection, item.id)}
                          >
                            <Form.Item
                              name="name"
                              label="Nome"
                              rules={[{ required: false, message: 'Por favor, insira seu nome' }]}
                            >
                              <Input placeholder="Seu nome" disabled />
                            </Form.Item>
                            <Form.Item
                              name="rating_qualidade"
                              label="1. Qualidade do Serviço:"
                              rules={[{ required: false, message: 'Por favor, avalie nosso serviço' }]}
                            >
                              <Rate allowHalf disabled />
                            </Form.Item>
                            <Form.Item
                              name="rating_profissionalismo"
                              label="2. Profissionalismo:"
                              rules={[{ required: false, message: 'Por favor, avalie nosso serviço' }]}
                            >
                              <Rate allowHalf disabled />
                            </Form.Item>
                            <Form.Item
                              name="rating_tempo"
                              label="3. Tempo de Execução:"
                              rules={[{ required: false, message: 'Por favor, avalie nosso serviço' }]}
                            >
                              <Rate allowHalf disabled />
                            </Form.Item>
                            <Form.Item
                              name="rating_limpeza"
                              label="4. Limpeza e Organização:"
                              rules={[{ required: false, message: 'Por favor, avalie nosso serviço' }]}
                            >
                              <Rate allowHalf disabled />
                            </Form.Item>
                            <Form.Item
                              name="rating_comunicacao"
                              label="5. Comunicação:"
                              rules={[{ required: false, message: 'Por favor, avalie nosso serviço' }]}
                            >
                              <Rate allowHalf disabled />
                            </Form.Item>
                            <Form.Item>
                              <Button type="text" htmlType="submit" disabled>
                                Salvar
                              </Button>
                            </Form.Item>
                          </Form>
                        </Col>
                      </Row>
                    }
                    extra={
                      <DynamicButton
                        onClick={() => setEditingFeedback(null)}
                        title="Retornar"
                        icon={<CaretLeftOutlined />}
                      />
                    }
                  />
                )}
              </List.Item>
            )}
          />
        }
      />
    </>
  );
};

export default FeedbackSectionManut;
