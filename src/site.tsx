import React from 'react';
import { Layout } from 'antd';
import AppHeader from './components/Header';
import AppFooter from './components/Footer';
import CarouselSection from './components/CarouselSection';
import LoginSection from './components/LoginSection';
import ServicesSection from './components/ServicesSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import FeedbackSection from './components/FeedbackSection';
import './App.css';

const { Content } = Layout;

function App() {
  return (
    <Layout className="layout">
      <AppHeader />
      <Content style={{ padding: '0 50px', marginTop: '20px' }}>
        <div id="home">
          <CarouselSection />
        </div>
        <div id="login" className="site-layout-content">
          <LoginSection />
        </div>
        <div id="services" className="site-layout-content">
          <ServicesSection />
        </div>
        <div id="testimonials" className="site-layout-content">
          <TestimonialsSection />
        </div>
        <div id="feedback" className="site-layout-content">
          <FeedbackSection />
        </div>
        <div id="contact" className="site-layout-content">
          <ContactSection />
        </div>
      </Content>
      <AppFooter />
    </Layout>
  );
}

export default App;
