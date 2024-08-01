import { useState, useEffect } from 'react';
import './App.css';
import { Button, Card, Row, Space } from 'antd';
import { CloseOutlined, FullscreenOutlined, MinusSquareOutlined, PlusOutlined } from '@ant-design/icons';
import { Rnd } from 'react-rnd';

interface ITela {
  id: number;
  title: string;
  state: boolean;
  width: number;
  height: number;
  x: number;
  y: number;
  isFullscreen: boolean;
}

interface AppProps {
  selectedComponent: React.ComponentType;
}

function App({ selectedComponent }: AppProps) {
  const [telas, setTelas] = useState<ITela[]>([]);

  useEffect(() => {
    if (selectedComponent) {
      adicionarTela(selectedComponent);
    }
  }, [selectedComponent]);

  const adicionarTela = (Component: React.ComponentType) => {
    const newTela: ITela = {
      id: telas.length + 1,
      title: Component.name,
      state: true,
      width: 900,
      height: 400,
      x: 321,
      y: 194,
      isFullscreen: false,
    };
    setTelas([...telas, newTela]);
  };

  const alterarEstadoTela = (id: number, state: boolean) => {
    setTelas(telas.map((tela) => (tela.id === id ? { ...tela, state } : tela)));
  };

  const excluirTela = (id: number) => {
    setTelas(telas.filter((tela) => tela.id !== id));
  };

  const toggleFullscreen = (id: number) => {
    setTelas(telas.map((tela) => {
      if (tela.id === id) {
        if (tela.isFullscreen) {
          return { ...tela, isFullscreen: false, width: 300, height: 200, x: 100, y: 100 };
        } else {
          return { ...tela, isFullscreen: true, width: window.innerWidth, height: window.innerHeight, x: 0, y: 0 };
        }
      }
      return tela;
    }));
  };

  const renderComponent = (Component: React.ComponentType) => {
    return <Component />;
  };

  return (
    <>
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
            minWidth={500}
            minHeight={300}
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
                  <Button onClick={() => alterarEstadoTela(tela.id, false)}><MinusSquareOutlined /></Button>
                  <Button type='dashed' onClick={() => excluirTela(tela.id)}><CloseOutlined style={{ color: 'red' }} /></Button>
                </Space>
              }
              style={{ width: '100%', height: '100%' }}
            >
              {renderComponent(selectedComponent)}
            </Card>
          </Rnd>
        )
      ))}

      <Row style={{ position: "absolute", bottom: 0, margin: 6 }}>
        <Space size={[0, 0]} wrap>
          {telas.map((tela) => (
            !tela.state && (
              <Row 
                key={tela.id}
                wrap={false}
                gutter={7}
                style={{ backgroundColor: '#fff', border: '2px solid', borderRadius: '5px', padding: 3, margin: 0, color: "#000", textAlign: "center" }}
                align="middle"
              >
                <Col flex="auto">{`${tela.id}`}</Col>
                <Col flex="auto">{`${tela.title}`}</Col>
                <Col flex="none">
                  <Space.Compact>
                    <Button type='text' onClick={() => alterarEstadoTela(tela.id, true)}><FullscreenOutlined /></Button>
                    <Button type='text' danger onClick={() => excluirTela(tela.id)}><CloseOutlined style={{ color: 'red' }} /></Button>
                  </Space.Compact>
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
