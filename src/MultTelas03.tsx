import { useState } from 'react';
import './App.css';
import { Button, Card, Col, Row, Space } from 'antd';
import { CloseOutlined, DeleteOutlined, FullscreenOutlined, PlusOutlined } from '@ant-design/icons';

interface ITela {
  id?: number;
  title: string;
  state: boolean;
}

function App() {
  const [telas, setTelas] = useState<ITela[]>([]);
  const activeTelasCount = telas.filter((e) => e.state).length;
  const colSize = Math.floor(24 / (activeTelasCount || 1));

  const adicionarTela = (title: string) => {
    const newTela: ITela = { id: telas.length + 1, title, state: true };
    setTelas([...telas, newTela]);
  };

  const alterarEstadoTela = (id: number, state: boolean) => {
    setTelas(telas.map((tela) => tela.id === id ? { ...tela, state } : tela));
  };

  const excluirTela = (id: number) => {
    setTelas(telas.filter((tela) => tela.id !== id));
  };

  return (
    <>
      <Row gutter={8}>
        <Col md={8}>
          <Button onClick={() => adicionarTela('Teste')}><PlusOutlined /></Button>
        </Col>
      </Row>

      <Row gutter={8}>
        {telas.map((tela) => (
          tela.state && (
            <Col md={colSize} xs={24} key={tela.id}>
              <Card 
                title={`${tela.title} ${tela.id}`} 
                hoverable 
                extra={
                  <Space>
                    <Button onClick={() => alterarEstadoTela(tela.id!, false)}><CloseOutlined /></Button>
                    <Button type='dashed' onClick={() => excluirTela(tela.id!)}><DeleteOutlined style={{ color: 'red' }} /></Button>
                  </Space>
                } 
              />
            </Col>
          )
        ))}
      </Row>

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
                    <Button type='text' onClick={() => alterarEstadoTela(tela.id!, true)}><FullscreenOutlined /></Button>
                    <Button type='text' danger onClick={() => excluirTela(tela.id!)}><DeleteOutlined style={{ color: 'red' }} /></Button>
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
