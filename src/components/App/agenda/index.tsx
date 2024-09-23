import { Col, Row } from 'antd'

import DynamicCard from '../../Dynamic/Card/DynamicCardProps'
import AgendaForm from './agendaForm'
import MyComponent from './disableDate'




const AgendaPage = () => {
  return (
    <DynamicCard
    title={'Agendamento'}
    content={
      <Row>
      <Col flex={'auto'}>
       <AgendaForm/>
      
      </Col>
      <Col flex={'auto'}>
      {/* <PreImagem description={formValues.description} imagemUrl={ imagem ? imagem : formValues.image } title={formValues.title} /> */}

<MyComponent/>
   
      </Col>
    </Row>}/>
  )
}

export default AgendaPage