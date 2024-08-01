import React, { useState } from 'react';
import { Row, Col, List } from 'antd';
import App from './app';
import ComponentTest1 from './componentTest1';
import ComponentTest2 from './componentTest2';

const componentsList = [
  { id: 'Component1', name: 'Component 1', component: ComponentTest1 },
  { id: 'Component2', name: 'Component 2', component: ComponentTest2 },
];

function MainApp() {
  const [selectedComponent, setSelectedComponent] = useState<React.ComponentType | null>(null);

  return (
    <div style={{ display: 'flex' }}>
      <Row style={{ width: '200px', padding: '10px' }}>
        <List
          header={<div>Components</div>}
          bordered
          dataSource={componentsList}
          renderItem={item => (
            <List.Item onClick={() => setSelectedComponent(item.component)} style={{ cursor: 'pointer' }}>
              {item.name}
            </List.Item>
          )}
        />
      </Row>
      <Col style={{ flex: 1, padding: '10px' }}>
        {selectedComponent ? (
          <App selectedComponent={selectedComponent} />
        ) : (
          <div>Please select a component to render</div>
        )}
      </Col>
    </div>
  );
}

export default MainApp;
