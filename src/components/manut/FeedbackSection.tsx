import React, { useState } from 'react';
import { Form, Input, Button, Rate, List } from 'antd';
import '../site/FeedbackSection.css';

const FeedbackSectionManut = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const onFinish = (values) => {
    setFeedbacks([...feedbacks, values]);
  };

  return (
    <div className="feedback-section">
      <h2>Leave Your Feedback</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input placeholder="Your name" />
        </Form.Item>
        <Form.Item
          name="feedback"
          label="Feedback"
          rules={[{ required: true, message: 'Please enter your feedback' }]}
        >
          <Input.TextArea rows={4} placeholder="Your feedback" />
        </Form.Item>
        <Form.Item
          name="rating"
          label="Rating"
          rules={[{ required: true, message: 'Please rate our service' }]}
        >
          <Rate allowHalf />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit Feedback
          </Button>
        </Form.Item>
      </Form>
      <div className="feedback-list">
        <h3>Feedback from Our Clients</h3>
        <List
          itemLayout="horizontal"
          dataSource={feedbacks}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={`${item.name} - Rating: ${item.rating}`}
                description={item.feedback}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default FeedbackSectionManut;
