import { BranchesOutlined, BulbOutlined, CheckOutlined, FireOutlined, SafetyOutlined, ToolOutlined } from '@ant-design/icons';
import {  Card,  Col, Row } from 'antd'


const Servicos = () => {
  return (
    <>
    
        {/* Seção Nossos Serviços */}
        <Row gutter={[16, 16]} style={{ marginTop: 50 }}>
          <Col xs={24} md={8}>
            <Card title="Iluminação" bordered={false} extra={<BulbOutlined />} hoverable>
              <p>Sempre que você estiver lidando com eletricidade, precisará de um especialista certificado.</p>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card title="Fiação" bordered={false} extra={<BranchesOutlined />} hoverable>
              <p>Sempre que você estiver lidando com eletricidade, precisará de um especialista certificado.</p>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card title="Reparar" bordered={false} extra={<ToolOutlined />} hoverable>
              <p>Sempre que você estiver lidando com eletricidade, precisará de um especialista certificado.</p>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card title="Instalação" bordered={false} extra={<CheckOutlined />} hoverable>
              <p>Sempre que você estiver lidando com eletricidade, precisará de um especialista certificado.</p>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card title="Aquecimento" bordered={false} extra={<FireOutlined />} hoverable>
              <p>Sempre que você estiver lidando com eletricidade, precisará de um especialista certificado.</p>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card title="Segurança" bordered={false} extra={<SafetyOutlined />} hoverable>
              <p>Sempre que você estiver lidando com eletricidade, precisará de um especialista certificado.</p>
            </Card>
          </Col>
        </Row>
    </>
  )
}

export default Servicos