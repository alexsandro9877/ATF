
import { Layout } from 'antd';
import AppHeader from './Header';
import AppFooter from './Footer';
import CarouselSection from './CarouselSection';

import ServicesSection from './ServicesSection';
import TestimonialsSection from './TestimonialsSection';
import ContactSection from './ContactSection';

import './site.css';

const { Content } = Layout;

function Site() {
  return (
    <Layout className="layout">
      <AppHeader />
      <Content style={{ padding: '0 50px', marginTop: '20px' }}>
        <div id="home">
          <CarouselSection />
        </div>
        <div id="login" className="site-layout-content">

        </div>
        <div id="services" className="site-layout-content">
          <ServicesSection />
        </div>
        <div id="testimonials" className="site-layout-content">
          <TestimonialsSection />
        </div>
        <div id="feedback" className="site-layout-content">
  
        </div>
        <div id="contact" className="site-layout-content">
          <ContactSection />
        </div>
      </Content>
      <AppFooter />
    </Layout>
  );
}

export default Site;
