import React from 'react';
import { Carousel, Card } from 'antd';


const { Meta } = Card;

const testimonials = [
  { name: 'John Doe', feedback: 'Great service! Highly recommended.' },
  { name: 'Jane Smith', feedback: 'Professional and reliable. Excellent work.' },
  { name: 'Sam Wilson', feedback: 'Quick and efficient. Very satisfied with their service.' },
];

const TestimonialsSection = () => (
  <div className="testimonials-section">
    <h2>What Our Clients Say</h2>
    <Carousel autoplay>
      {testimonials.map((testimonial, index) => (
        <Card key={index} style={{ margin: '0 auto', maxWidth: 400 }}>
          <Meta
            title={testimonial.name}
            description={testimonial.feedback}
          />
        </Card>
      ))}
    </Carousel>
  </div>
);

export default TestimonialsSection;
