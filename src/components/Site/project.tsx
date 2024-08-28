import { Card, Col, Row, Typography } from 'antd'

const { Title, Paragraph } = Typography;
const Project = () => {
  return (
  <>
       {/* Seção Projetos Recentes */}
       <Row gutter={[16, 16]} style={{ marginTop: 50 }}>
          <Col xs={24} md={12}>
            <Card>
              <Title level={4}>Projetos Recentes</Title>
              <Paragraph>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            {/* <img
              src="https://via.placeholder.com/500"
              alt="Projeto recente"
              style={{ width: "100%" }}
            /> */}
          </Col>
        </Row>
  </>
  )
}

export default Project