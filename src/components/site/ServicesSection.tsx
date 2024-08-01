import React from 'react';
import { Row, Col, Card } from 'antd';

const { Meta } = Card;

const services = [
  { title: 'Electrical Installations', description: 'We handle all types of electrical installations.' },
  { title: 'Electrical Repairs', description: 'Expert repairs for any electrical issues.' },
  { title: 'Lighting Solutions', description: 'Innovative and efficient lighting solutions.' },
  { title: 'Emergency Services', description: 'Available 24/7 for emergency services.' },
];

const ServicesSection = () => (
  <div className="services-section">
    <h2>Our Services</h2>
    <Row gutter={[16, 16]} justify="center">
      {services.map((service, index) => (
        <Col key={index} xs={24} sm={12} md={8} lg={6}>
          <Card hoverable>
            <Meta title={service.title} description={service.description} />
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);

export default ServicesSection;
