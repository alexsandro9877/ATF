import { Button,  Card,  Col, Form, Input, Row, Typography } from 'antd'

const { Title, Paragraph } = Typography;

const ContactForm = () => {
  return (
    <>
     {/* Seção Contato */}
     <Row gutter={[16, 16]} style={{ marginTop: 50 }}>
          <Col xs={24} md={12}>
            <Title level={3}>Sinta-se livre para me perguntar qualquer coisa</Title>
            <Form layout="vertical">
              <Form.Item label="Nome">
                <Input placeholder="Enter your Name" />
              </Form.Item>
              <Form.Item label="Email">
                <Input placeholder="Enter a valid email address" />
              </Form.Item>
              <Form.Item label="Mensagem">
                <Input.TextArea placeholder="Enter your message" />
              </Form.Item>
              <Form.Item>
                <Button type="primary">ENVIAR</Button>
              </Form.Item>
            </Form>
          </Col>
          <Col xs={24} md={12}>
            <Card bordered={false} style={{ background: "transparent" }}>
              <Title level={4}>JUNTE-SE AO NOSSO MOVIMENTO</Title>
              <Paragraph>
                Todo prazer é bem-vindo à dor evitada devido ao dever e às obrigações dos negócios.
              </Paragraph>
            </Card>
          </Col>
        </Row>
    
    </>
  )
}

export default ContactForm