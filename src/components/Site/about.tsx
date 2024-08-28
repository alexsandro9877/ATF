import React from 'react';
import {  Row, Col } from 'antd';

const About: React.FC = () => {
    return (
       
            // <Content style={{ padding: '0 50px' }}>
            <>
                <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                    <Row justify="center">
                        <Col span={24} style={{ textAlign: 'center', padding: '20px 0' }}>
                            <h1>Sobre nós</h1>
                            <p>Tratamos cada projeto com o respeito que ele merece e não paramos até que você esteja satisfeito.</p>
                        </Col>
                        <Col span={24} style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <img src="your-about-image-url.jpg" alt="About Us" style={{ width: '100%', height: 'auto' }} />
                        </Col>
                    </Row>
                    <Row justify="center" style={{ padding: '20px 0' }}>
                        <Col span={24} style={{ textAlign: 'center' }}>
                            <h2>Negócios de família</h2>
                            <p>A política iniciada pelo meu pai é aquela que continuamos a seguir até hoje. Nunca aceitamos pagamento até que o cliente esteja completamente satisfeito...</p>
                        </Col>
                        <Col span={24} style={{ textAlign: 'center', marginTop: '20px' }}>
                            <img src="your-family-business-image-url.jpg" alt="Family Business" style={{ width: '100%', height: 'auto' }} />
                        </Col>
                    </Row>
                    <Row justify="center" style={{ backgroundColor: '#F7E247', padding: '20px 0' }}>
                        <Col span={6} style={{ textAlign: 'center' }}>
                            <h2>1,2m</h2>
                            <p>Horas de Trabalho</p>
                        </Col>
                        <Col span={6} style={{ textAlign: 'center' }}>
                            <h2>3k</h2>
                            <p>Clientes Satisfeitos</p>
                        </Col>
                        <Col span={6} style={{ textAlign: 'center' }}>
                            <h2>230</h2>
                            <p>Projetos Completos</p>
                        </Col>
                        <Col span={6} style={{ textAlign: 'center' }}>
                            <h2>54</h2>
                            <p>Prêmios Ganhos</p>
                        </Col>
                    </Row>
                    <Row justify="center" style={{ marginTop: '20px' }}>
                        <Col span={24} style={{ textAlign: 'center' }}>
                            <h2>Desenvolvimento de estratégia de solução de TI para o seu negócio</h2>
                            <p>Conforto produz marido que ela tinha ouvido. Leis outras foram aprovadas, mas desejos...</p>
                        </Col>
                        <Col span={24} style={{ textAlign: 'center', marginTop: '20px' }}>
                            <img src="your-strategy-image-url.jpg" alt="Strategy Development" style={{ width: '100%', height: 'auto' }} />
                        </Col>
                    </Row>
                    <Row justify="center" style={{ marginTop: '20px', padding: '20px 0' }}>
                        <Col span={6} style={{ textAlign: 'center' }}>
                            <img src="your-team-image-url1.jpg" alt="Team Member 1" style={{ width: '100%', height: 'auto', borderRadius: '50%' }} />
                            <h3>Walter Lilly</h3>
                            <p>Parceiro</p>
                        </Col>
                        <Col span={6} style={{ textAlign: 'center' }}>
                            <img src="your-team-image-url2.jpg" alt="Team Member 2" style={{ width: '100%', height: 'auto', borderRadius: '50%' }} />
                            <h3>Jeffrey Brown</h3>
                            <p>Parceiro Mundial</p>
                        </Col>
                        <Col span={6} style={{ textAlign: 'center' }}>
                            <img src="your-team-image-url3.jpg" alt="Team Member 3" style={{ width: '100%', height: 'auto', borderRadius: '50%' }} />
                            <h3>Alex Greenfield</h3>
                            <p>Parceiro</p>
                        </Col>
                    </Row>
                </div>
            </>
           
    );
}

export default About;
