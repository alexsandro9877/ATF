// import { Card, Col, List, Row } from "antd";
// import { useGetPrd4Inclusao, useGetPrd4Pendente } from "../../hooks/api";


// export interface IResponseApiPRD4Pendente {
//     COD_NOTA_FISCAL: string;
//     TIPO_NF: string;
//     STATUS_NF: string;
//     DAT_CADASTRO: string; // ISO 8601 date string
//     DAT_EMISSAO_AUT: string; // ISO 8601 date string
//     DESC_PROCESSO_NF: string;
//   }
  
//   export interface IResponseApiPRD4Referenciada {
//     COD_NOTA_REFERENCIADA: string;
//   }
  
  
//   interface NotasPendentesProps {
//     data: IResponseApiPRD4Pendente[];
//     loadingData: boolean;
    
//   }
//   interface NotasReferenciadasProps {
//     data: IResponseApiPRD4Referenciada[];
//     loadingData: boolean;
//   }
  
//   const NotasReferenciadas: React.FC<NotasReferenciadasProps> = ({ data, loadingData }) => {
//     return (
//       <List
//         grid={{ gutter: 16, column: 1 }}
//         dataSource={data}
//         loading={loadingData}
//         renderItem={(item) => (
//           <List.Item>
//             <Card title="Nota Referenciada">
//               <p><strong>Código:</strong> {item.COD_NOTA_REFERENCIADA}</p>
//             </Card>
//           </List.Item>
//         )}
//       />
//     );
//   };
  
//   const NotasPendentes: React.FC<NotasPendentesProps> = ({ data, loadingData }) => {
//     return (
//       <List
//         grid={{ gutter: 16, column: 1 }}
//         dataSource={data}
//         loading={loadingData}
//         renderItem={(item) => (
//           <List.Item>
//             <Card title={`Nota Fiscal: ${item.COD_NOTA_FISCAL}`}>
//               <p><strong>Tipo:</strong> {item.TIPO_NF}</p>
//               <p><strong>Status:</strong> {item.STATUS_NF}</p>
//               <p><strong>Data de Cadastro:</strong> {new Date(item.DAT_CADASTRO).toLocaleString()}</p>
//               <p><strong>Data de Emissão Autorizada:</strong> {new Date(item.DAT_EMISSAO_AUT).toLocaleString()}</p>
//               <p><strong>Descrição do Processo:</strong> {item.DESC_PROCESSO_NF}</p>
//             </Card>
//           </List.Item>
//         )}
//       />
//     );
//   };
  

//   const Prd4Pendencias = () => {
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const { data: nfPendInclusao, isLoading: isGetInclusaoLoading } = useGetPrd4Inclusao();
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const { data: nfPendente, isLoading: isGetPendenciaLoading } = useGetPrd4Pendente();
//     return (
//     <>

// <Row>
     
//       <Col md={8}>
//       <NotasPendentes data={nfPendente} loadingData={isGetPendenciaLoading} />
//       </Col>
//       <Col md={6}>
//       <NotasReferenciadas data={nfPendInclusao} loadingData={isGetInclusaoLoading}/>
//       </Col>
//     </Row>
//     </>
//     )
//   }
  
//   export default Prd4Pendencias