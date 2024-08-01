import { useState } from 'react';
import './App.css';
import { Button, Card, Col, Row, Space, Select } from 'antd';
import { CloseOutlined, FullscreenExitOutlined, FullscreenOutlined, PlusOutlined } from '@ant-design/icons';
import { Rnd } from 'react-rnd';
import ComponentTest1 from './componentTest1';
import ComponentTest2 from './componentTest2';

const { Option } = Select;

interface ITela {
  id: number;
  title: string;
  state: boolean;
  width: number;
  height: number;
  x: number;
  y: number;
}

function App() {
  const [telas, setTelas] = useState<ITela[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string>('');

  const adicionarTela = (title: string) => {
    const newTela: ITela = {
      id: telas.length + 1,
      title,
      state: true,
      width: 320,
      height: 200,
      x: 100,
      y: 100,
    };
    setTelas([...telas, newTela]);
  };

  const alterarEstadoTela = (id: number, state: boolean) => {
    setTelas(telas.map((tela) => (tela.id === id ? { ...tela, state } : tela)));
  };

  const excluirTela = (id: number) => {
    setTelas(telas.filter((tela) => tela.id !== id));
  };

  const renderComponent = (title: string) => {
    switch (title) {
      case 'Component1':
        return <ComponentTest1 />;
      case 'Component2':
        return <ComponentTest2 />;
      default:
        return <div>Default Component</div>;
    }
  };

  return (
    <>
      <Row gutter={8}>
        <Col md={8}>
          <Select
            style={{ width: 200 }}
            placeholder="Select a component"
            onChange={(value) => setSelectedComponent(value)}
          >
            <Option value="Component1">Component 1</Option>
            <Option value="Component2">Component 2</Option>
          </Select>
          <Button onClick={() => adicionarTela(selectedComponent)} disabled={!selectedComponent}>
            <PlusOutlined />
          </Button>
        </Col>
      </Row>

      {telas.map((tela) => (
        tela.state && (
          <Rnd
            key={tela.id}
            default={{
              x: tela.x,
              y: tela.y,
              width: tela.width,
              height: tela.height,
            }}
            onDragStop={(e, d) => {
              const updatedTelas = telas.map((t) => (t.id === tela.id ? { ...t, x: d.x, y: d.y } : t));
              setTelas(updatedTelas);
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              const updatedTelas = telas.map((t) =>
                t.id === tela.id
                  ? {
                      ...t,
                      width: parseInt(ref.style.width, 10),
                      height: parseInt(ref.style.height, 10),
                      x: position.x,
                      y: position.y,
                    }
                  : t
              );
              setTelas(updatedTelas);
            }}
          >
            <Card
              title={`${tela.title} ${tela.id}`}
              hoverable
              extra={
                <Space>
                  <Button onClick={() => alterarEstadoTela(tela.id, false)}><FullscreenExitOutlined /></Button>
                  <Button type='dashed' onClick={() => excluirTela(tela.id)}><CloseOutlined style={{ color: 'red' }} /></Button>
                </Space>
              }
              style={{ width: '100%', height: '100%' }}
            >
              {renderComponent(tela.title)}
            </Card>
          </Rnd>
        )
      ))}

      <Row style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Space size="middle" wrap>
          {telas.map((tela) => (
            !tela.state && (
              <Row key={tela.id} justify="space-between" align="middle" style={{ backgroundColor: '#fff', border: '2px solid', borderRadius: '5px', padding: '8px' }}>
                <Col>
                  <h5>{`${tela.title} ${tela.id}`}</h5>
                </Col>
                <Col>
                  <Space>
                    <Button type='text' onClick={() => alterarEstadoTela(tela.id, true)}><FullscreenOutlined /></Button>
                    <Button type='text' danger onClick={() => excluirTela(tela.id)}><CloseOutlined style={{ color: 'red' }} /></Button>
                  </Space>
                </Col>
              </Row>
            )
          ))}
        </Space>
      </Row>

      
    </>
  );
}

export default App;
