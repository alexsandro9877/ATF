import { Button,  Col, Row, Typography } from 'antd'

const { Title, Paragraph } = Typography;

const Principal = () => {
  return (
   <>
       {/* Seção Principal */}
       <Row gutter={[6, 6]} style={{ padding:'0 16px'}} align="stretch">
          <Col xs={24} md={12}>
            <Title>Serviços de eletricista</Title>
            <Paragraph>
              Nossos eletricistas oferecem excelente serviço e suporte a preços competitivos.
              Todo o nosso trabalho é garantido e está em conformidade com os mais altos padrões da indústria.
            </Paragraph>
            <Button type="primary" size="large">FAÇA UM ORÇAMENTO GRÁTIS</Button>
          </Col>
          <Col xs={24} md={12}>
            {/* <img
              
              src="https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg"
              alt="Eletricista"
              style={{ width: "50%", borderRadius:'8px' }}
            /> */}
          </Col>
        </Row>
   </>
  )
}

export default Principal