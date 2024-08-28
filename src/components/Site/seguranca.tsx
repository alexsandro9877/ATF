import { Button, Col, Row,Typography } from 'antd'

const { Title,Paragraph } = Typography;
const Seguranca = () => {
  return (
<>
    {/* Seção Segurança */}
    <Row justify="center" style={{ marginTop: 50, backgroundColor: "#f0f0f0", padding: "20px 0" }}>
          <Col xs={24} md={20} style={{ textAlign: "center" }}>
            <Title level={2}>Segurança e serviço, sempre nossa prioridade</Title>
            <Button type="default" size="large">VEJA TODOS OS SERVIÇOS</Button>
          </Col>
        </Row>
        

        {/* Seção Satisfação Garantida */}
        <Row gutter={[16, 16]} style={{ marginTop: 50 }}>
          <Col xs={24} md={12}>
            <Title level={3}>Satisfação garantida</Title>
            <Paragraph>
              Tratamos cada projeto com o respeito que ele merece e paramos até que você esteja satisfeito.
            </Paragraph>
            <Button type="link">VEJA TODOS OS SERVIÇOS</Button>
          </Col>
          <Col xs={24} md={12}>
            <ul>
              <li>Todos os nossos técnicos são treinados e certificados</li>
              <li>Satisfação garantida em todos os projetos</li>
              <li>Três gerações e mais de 40 anos de experiência</li>
              <li>Serviços residenciais e comerciais</li>
            </ul>
          </Col>
        </Row>

</>
  )
}

export default Seguranca