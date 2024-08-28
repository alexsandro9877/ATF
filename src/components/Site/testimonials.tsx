import { Avatar, Card, Col, Row, Typography } from "antd";

const { Title } = Typography;

const Testimonials = () => {
  return (
    <>
        {/* Seção Depoimentos */}
    <Row gutter={[16, 16]} style={{ marginTop: 50 }}>
    <Col xs={24}>
            <Title level={3} style={{ textAlign: "center" }}>Depoimentos</Title>
        </Col><Col xs={24} md={4}>
                <Card bordered={false}>
                    <Avatar src="https://via.placeholder.com/100" />
                    <p>Stella Larson</p>
                    <p>Sample text.</p>
                </Card>
            </Col><Col xs={24} md={4}>
                <Card bordered={false}>
                    <Avatar src="https://via.placeholder.com/100" />
                    <p>Nick Johnson</p>
                    <p>Sample text.</p>
                </Card>
            </Col><Col xs={24} md={4}>
                <Card bordered={false}>
                    <Avatar src="https://via.placeholder.com/100" />
                    <p>Olga Ivanova</p>
                    <p>Sample text.</p>
                </Card>
            </Col><Col xs={24} md={4}>
                <Card bordered={false}>
                    <Avatar src="https://via.placeholder.com/100" />
                    <p>Paulo Hudson</p>
                    <p>Sample text.</p>
                </Card>
            </Col><Col xs={24} md={4}>
                <Card bordered={false}>
                    <Avatar src="https://via.placeholder.com/100" />
                    <p>Dinheiro Hudson</p>
                    <p>Sample text.</p>
                </Card>
            </Col><Col xs={24} md={4}>
                <Card bordered={false}>
                    <Avatar src="https://via.placeholder.com/100" />
                    <p>Mike Perry</p>
                    <p>Sample text.</p>
                </Card>
            </Col>
  </Row>
  </>
  )
}

export default Testimonials