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
  const [tela, setTela] = useState<ITela[]>([]);
  const sizes = Math.floor(24 / (tela.filter((e) => (e.state == true)).length))

  function adicionar({ state, title }: ITela) {
    const id = tela.length + 1;
    const news = { id, title, state };
    setTela([...tela, news]);
  }

  function abrir({ id }: ITela) {
    const updatedTela = tela.map((e) => {
      if (e.id === id) {
        return { ...e, state: true };
      }
      return e;
    });
    setTela(updatedTela);
  }

  function fechar({ id }: ITela) {
    const updatedTela = tela.map((e) => {
      if (e.id === id) {
        return { ...e, state: false };
      }
      return e;
    });
    setTela(updatedTela);
  }

  function excluir({ id }: ITela) {
    const updatedTela = tela.filter((e) => e.id !== id);
    setTela(updatedTela);
  }



  return (
    <>
      <Row gutter={8}>
        <Col md={8}>
          <Button onClick={() => (adicionar({ state: true, title: 'Teste' }))}><PlusOutlined /></Button>
        </Col>
      </Row>

      <Row gutter={8}>
        {tela.map((e) => (
          <Col md={sizes} xs={24} key={e.id}>
            {
              e.state === true &&
              <Card title={e.title + e.id} key={e.id} hoverable extra={<Space.Compact>
                <Button onClick={() => fechar({ id: e.id, state: e.state, title: e.title })}><CloseOutlined /></Button>
                <Button type='dashed' onClick={() => excluir({ id: e.id, state: e.state, title: e.title })}><DeleteOutlined style={{ color: 'red', margin: '2x' }} /></Button>
              </Space.Compact>} />
            }
          </Col>
        ))}

      </Row>

      <Row style={{ position: "absolute", bottom: 0 }}>
        <Col md={24}>
          <Space size={[26, 6]} wrap>
            <>
              {tela.map((e) => (
                < >
                  {
                    e.state === false &&
                    <Row key={e.id} justify='space-between' align='middle' style={{ left: 100, backgroundColor: '#fff', border: '2px solid', borderRadius: '5px', color: "#000", }}>
                      <Col lg={6}>
                        <h5>{e.title + e.id}</h5>
                      </Col>
                      <Col lg={6}>
                        ----------------------
                      </Col>
                      <Col lg={12}>
                        <Space.Compact>
                          <Button type='text' onClick={() => abrir({ id: e.id, state: e.state, title: e.title })}><FullscreenOutlined /></Button>
                          <Button type='text' danger ghost onClick={() => excluir({ id: e.id, state: e.state, title: e.title })}><DeleteOutlined style={{ color: 'red', margin: '2x' }} /></Button>
                        </Space.Compact>
                      </Col>
                    </Row>
                  }
                </>
              ))}
            </>

          </Space>
        </Col>
      </Row>
    </>
  );
}

export default App;
