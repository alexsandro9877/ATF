import { Col, Divider, Row } from "antd";

const styleRow: React.CSSProperties = {
  border: '2px solid blue', // Colocando a cor
  margin: '3px', // Colocando a margin
  maxWidth: '95%', // Limita a largura da Row à largura da tela
  flexWrap: 'wrap',  // Permite que as colunas se movam para a próxima linha se não couberem
  overflowX: 'hidden' // Impede o transbordamento horizontal
};
const styleCol = {
  border: '2px solid red',
  padding: '2px',
  margin: '3px'
}

const Grid = () => {
  return (
    <>
      <Row 
        justify="end" 
        gutter={[3, 3]} 
        style={styleRow}
      >
        <Divider orientation="left">Linha principal 1</Divider>
        <Col flex="auto" style={styleCol} order={1}>
          <p>Coluna 1</p>
        </Col>
        <Col flex="auto" style={styleCol} order={3}>
          <p>Coluna 2</p>
        </Col>
        <Col flex="auto" style={styleCol} order={2}>
          <p>Coluna 3</p>
        </Col>
      </Row>

      <Row 
        justify="end" 
        gutter={[3, 3]} 
        style={styleRow}
      >
        <Divider orientation="left">Linha 2</Divider>
        <Col flex="auto" style={styleCol} order={1}>
          <p>Coluna 1</p>
        </Col>
        <Col flex="auto" style={styleCol} order={2}>
          <p>Coluna 2</p>
        </Col>
        <Col flex="auto" style={styleCol} order={3}>
          <p>Coluna 3</p>
        </Col>
      </Row>
    </>
  );
}

export default Grid;
