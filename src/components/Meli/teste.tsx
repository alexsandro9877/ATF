// import {
//   Button,
//   Card,
//   Col,
//   Form,
//   Input,
//   List,
//   message,
//   Row,
//   Table,
//   TableProps,
// } from "antd";

// import DynamicButton from "../Dynamic/Button/DynamicButtonProps";
// import { useState } from "react";
// import Search from "antd/es/transfer/search";
// import { useGetMercadoLivreWeb, useGetPrd4Inclusao, useGetPrd4Pendente } from "../../hooks/api";
// import { useQueryClient } from "@tanstack/react-query";
// import DynamicCard from "../Dynamic/Card/DynamicCardProps ";
// import * as XLSX from "xlsx";
// //import config from"./config.json";

// // import "../../utils/"

// interface DataType {
//   key: string;
//   name: string;
//   chave: string;
//   payload: IReturnApi[];
// }

// export interface IRequestApi {
//   chaveNF: string[];
// }

// export interface IResponseApiPRD4Pendente {
//   COD_NOTA_FISCAL: string;
//   TIPO_NF: string;
//   STATUS_NF: string;
//   DAT_CADASTRO: string; // ISO 8601 date string
//   DAT_EMISSAO_AUT: string; // ISO 8601 date string
//   DESC_PROCESSO_NF: string;
// }

// export interface IResponseApiPRD4Referenciada {
//   COD_NOTA_REFERENCIADA: string;
// }


// interface IReturnApi {
//   id: string;
//   resource: string;
//   user_id: number;
//   topic: string;
//   application_id: string;
//   attempts: number;
//   sent: string;
//   received: string;
//   chave?: string;
// }

// const columns: TableProps<DataType>["columns"] = [
//   {
//     title: "Chave",
//     dataIndex: "chave",
//     key: "chave",
//     render: (text) => <a>{text}</a>,
//   },
//   {
//     title: "Payload",
//     dataIndex: "payload",
//     key: "payload",
//     render: (text) => <>{JSON.stringify(text)}</>,
//   },
// ];

// interface NotasPendentesProps {
//   data: IResponseApiPRD4Pendente[];
//   loadingData: boolean;
  
// }
// interface NotasReferenciadasProps {
//   data: IResponseApiPRD4Referenciada[];
//   loadingData: boolean;
// }

// const NotasReferenciadas: React.FC<NotasReferenciadasProps> = ({ data, loadingData }) => {
//   return (
//     <List
//       grid={{ gutter: 16, column: 1 }}
//       dataSource={data}
//       loading={loadingData}
//       renderItem={(item) => (
//         <List.Item>
//           <Card title="Nota Referenciada">
//             <p><strong>Código:</strong> {item.COD_NOTA_REFERENCIADA}</p>
//           </Card>
//         </List.Item>
//       )}
//     />
//   );
// };

// const NotasPendentes: React.FC<NotasPendentesProps> = ({ data, loadingData }) => {
//   return (
//     <List
//       grid={{ gutter: 16, column: 1 }}
//       dataSource={data}
//       loading={loadingData}
//       renderItem={(item) => (
//         <List.Item>
//           <Card title={`Nota Fiscal: ${item.COD_NOTA_FISCAL}`}>
//             <p><strong>Tipo:</strong> {item.TIPO_NF}</p>
//             <p><strong>Status:</strong> {item.STATUS_NF}</p>
//             <p><strong>Data de Cadastro:</strong> {new Date(item.DAT_CADASTRO).toLocaleString()}</p>
//             <p><strong>Data de Emissão Autorizada:</strong> {new Date(item.DAT_EMISSAO_AUT).toLocaleString()}</p>
//             <p><strong>Descrição do Processo:</strong> {item.DESC_PROCESSO_NF}</p>
//           </Card>
//         </List.Item>
//       )}
//     />
//   );
// };

// const UserMeli = () => {
//   const [form] = Form.useForm();
//   const [nota, setNota] = useState<IReturnApi[]>([]);
//   const [searchTerm, setSearchTerm] = useState<string>("");

//   const { data: nfPendInclusao, isLoading: isGetInclusaoLoading } = useGetPrd4Inclusao();
//   const { data: nfPendente, isLoading: isGetPendenciaLoading } = useGetPrd4Pendente();

 

//   console.log(nfPendInclusao+ "" )

//   const queryClient = useQueryClient();

//   const { mutate: getNota } = useGetMercadoLivreWeb({
//     retry: 2, // Tenta novamente 2 vezes antes de falhar
//     // staleTime: 5000, // 5 segundos antes de considerar os dados desatualizados
//     // cacheTime: 10000, // 10 segundos antes de remover os dados do cache
//     onSuccess: (data: any) => {
//       setNota(data);
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       //@ts-expect-error
//       queryClient.invalidateQueries("mercadoLivreWeb");
//       form.resetFields();
//     },
//     onError: (error: any) => {
//       const errorMessage = error.response?.data?.message;
//       message.error(errorMessage);
//     },
//   });

//   const debounceSearch = (value: string) => {
//     setSearchTerm(value);
//   };

//      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       //@ts-expect-error
//   const data: DataType[] = nota.map((nf) => ({
//     payload: [nf],
//     chave: nf.chave,
//     key: nf.id,
//     name: nf.id,
//   }));

//   const filteredItems = Array.isArray(data)
//     ? data.filter((item) =>
//         `${item.name?.toLowerCase() || ""} ${
//           item.chave?.toLowerCase() || ""
//         }`.includes(searchTerm.toLowerCase())
//       )
//     : [];

//   const exportToExcel = (data: DataType[]) => {
//     const dataToExport = data.map((item) => ({
//       Chave: item.chave,
//       Nome: item.name,
//       Payload: JSON.stringify({ ...item.payload }),
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Notas");
//     XLSX.writeFile(workbook, "notas_export.xlsx");
//   };

//   const exportPayloadToExcel = (data: DataType[]) => {

//     const dataToExport = data.map((item) => {
//       const { chave, ...restPayload } = item.payload[0]; // Remove "chave" do payload
//       return { chave, payload: restPayload }; 
//     });

//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Payload");

//     XLSX.writeFile(workbook, "payload_export.xlsx");
//   };
//   const handleFinish = async (values: any) => {
//     const { chavesNF } = values;
//     const bodyRequest: IRequestApi = {
//       chaveNF: chavesNF.split(","),
//     };
//    // config.push({name:"a",nfs:["s"]})
//   //  handleSave("config",[])

//     await getNota(bodyRequest);
//   };

 

// // // Armazena no LocalStorage
// // localStorage.setItem('objteste', JSON.stringify(config));

// // // Obtém do LocalStorage
// // const objSalvo = localStorage.getItem('objteste');

// // console.log('objSalvo: ', JSON.stringify(objSalvo));


//   return (
//     <Row>
//       <Col>
//         <DynamicCard
//           title="Busca Notas"
//           style={{ minWidth: "500px", minHeight: "500px" }}
//           extra={
//             <>
//               <DynamicButton
//                 title="Exportar Excel"
//                 name="Exportar"
//                 danger
//                 onClick={() => exportToExcel(filteredItems)}
//               />
//               <DynamicButton
//                 title="Exportar Json"
//                 name="Exportar JSON"
//                 danger
//                 onClick={() => exportPayloadToExcel(filteredItems)}
//               />
//             </>
//           }
//           content={
//             <>

//               <Form form={form} layout="vertical" onFinish={handleFinish}>
//                 <Form.Item
//                   label="Notas"
//                   name="chavesNF"
//                   rules={[
//                     {
//                       required: true,
//                       validator(_, value) {
//                         const dig = value?.split("") || [];

//                         if (dig.length >= 44) {
//                           if (dig.length > 2868) {
//                             return Promise.reject(
//                               new Error("Limite de 60 notas por busca!")
//                             );
//                           } else {
//                             return Promise.resolve();
//                           }
//                         }

//                         return Promise.reject(
//                           new Error("Chave da nota não está completa!")
//                         );
//                       },
//                     },
//                   ]}
//                 >
//                   <Input placeholder="Informe as notas" />
//                 </Form.Item>
//                 <Form.Item>
//                   <Button type="primary" htmlType="submit">
//                     Consultar
//                   </Button>
//                 </Form.Item>
//               </Form>

//               <Search
//                 placeholder="Buscar pela chave"
//                 value={searchTerm}
//                 onChange={(e) => debounceSearch(e.target.value)}
//               />

//               {nota.length ? (
//                 <>
//                   <p>Chave encontrada!</p>
//                   <Table columns={columns} dataSource={filteredItems} />
//                 </>
//               ) : (
//                 <p>Chave não encontrada</p>
//               )}
//             </>
//           }
//         />
//       </Col>
//       <Col md={8}>
//       <NotasPendentes data={nfPendente} loadingData={isGetPendenciaLoading} />
//       </Col>
//       <Col md={6}>
//       <NotasReferenciadas data={nfPendInclusao} loadingData={isGetInclusaoLoading}/>
//       </Col>
//     </Row>
//   );
// };

// export default UserMeli;



