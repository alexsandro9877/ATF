import React from 'react';
import { Col, Divider, Row, Space, Steps } from 'antd';
import DynamicCard from '../../Dynamic/Card/DynamicCardProps ';
import DetalhePedido from './detalhePedido';
//import TesteTabela from '../Dynamic/teste';



const Process: React.FC = () => {


      function handleComponet(value: any) {
        return ( <p>{value}</p>)
      }

return(  

    <>
   
        <Steps
      progressDot
         direction="vertical"
      current={3}
      
      items={[	
        {
            subTitle: '00:00:05',
            title: 'AMP',
            description: 'Aguardando Confirmação das Modificações do Pedido',
            onClick:((e)=>handleComponet(e.target))
          },
        {
            subTitle: '00:01:05',
            title: 'EMI',
            description: 'Emitido',
          },
        {
            subTitle: '00:02:05',
          title: 'SEP',
          description: 'Processo de separação',
        },
        {
            subTitle: '00:03:05',
            title: 'SEP',
            description: 'Em Separação',
        },
        {
            subTitle: '00:04:05',
          title: 'REP',
          description: 'Aguardando Recebimento com itens indisponíveis',
        },
        {
            subTitle: '00:05:05',
            title: 'RET',
            description: 'Aguardando Recebimento',
          },
        {
            subTitle: '00:06:05',
          title: 'PE0',
          description: 'Aguardando Entrega',
        }
      ]}
    /></>
)
};


export default Process;