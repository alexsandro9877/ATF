import { Col, Row } from 'antd'
import React from 'react'
import DynamicCard from '../../Dynamic/Card/DynamicCardProps '
import Process from './progress'
import DetalhePedido from './detalhePedido'

const PedidoIfood = () => {
  return (
    <DynamicCard
    title={'Traking'}
    content={
      <Row>
      <Col flex={'auto'}>
      <Process/>
      
      </Col>
      <Col flex={'auto'}>
      {/* <PreImagem description={formValues.description} imagemUrl={ imagem ? imagem : formValues.image } title={formValues.title} /> */}

        <DetalhePedido/>
   
      </Col>
    </Row>}/>
  )
}

export default PedidoIfood