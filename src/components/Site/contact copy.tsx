import React from 'react';
import { Row, Col, Typography, Card } from 'antd';
import { PhoneOutlined, EnvironmentOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { IContact } from './type';
//import './Contact.css'; // Custom CSS for any additional styles

const { Title, Paragraph } = Typography;

interface IProps {
  data: IContact[];
  loadingData: boolean;
}

const Contact: React.FC<IProps> = ({data, loadingData}) => {
  console.log(loadingData)
  return (
    <div className="contact-container">
      <div className="contact-header">
        <Title level={1}>{data[0].title}</Title>
        <Paragraph>{data[0].subDescription}</Paragraph>
      </div>


      <Row gutter={[16, 16]} className="contact-info">
        <Col span={8}>
          <Card className="info-card">
            <PhoneOutlined style={{ fontSize: '24px', color: '#FFC107' }} />
            <Title level={3}>{data[0].description}</Title>
            <Paragraph>
              {data[0].phone.map((e)=>(
                <p>{e}</p>
              ))}
              
            </Paragraph>
          </Card>
        </Col>
        
        <br />
        <Col span={8}>
          <Card className="info-card">
            <EnvironmentOutlined style={{ fontSize: '24px', color: 'red' }} />
            <Title level={3}>LOCALIZAÇÃO</Title>
            <Paragraph>
              Rua jarama 101,<br />
              Jandira - SP, BR 06634-000
              <br />
              Atendemos na região de Osasco, Itapevi, Perus.
            </Paragraph>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="info-card">
            <InfoCircleOutlined style={{ fontSize: '24px', color: '#FFC107' }} />
            <Title level={3}>NOSSOS PRINCIPAIS SERVIÇOS</Title>
            <Paragraph>
              Instalação de quadros<br />
              Montagem de cameras IP<br />
              Intalação tomadas, lampadas chuveiro, etc.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <div className="contact-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8698.510463902505!2d-46.90434117571634!3d-23.558631902795653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf06d3648f4e27%3A0x7b956e254bada23e!2sR.%20Jarama%2C%20101%20-%20Jardim%20Sao%20Joao%2C%20Jandira%20-%20SP%2C%2006634-020!5e0!3m2!1spt-BR!2sbr!4v1724786413815!5m2!1spt-BR!2sbr"
          width="100%"
          height="350"
          frameBorder="0"
          style={{ border: 0 }}
          // allowFullScreen=""
          aria-hidden="false"
          // tabIndex="0"
        ></iframe>
      </div>

   
    </div>
  );
};

export default Contact;
