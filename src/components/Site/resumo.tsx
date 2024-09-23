// import React, { useReducer, useState } from 'react';
// import { Card, List, Typography, Form, Input, Button, InputNumber, Select, DatePicker, message } from 'antd';

// const { Title, Text } = Typography;
// const { Option } = Select;

// interface Painel {
//   descricao: string;
//   valor: number;
//   operacao: string;
//   data_pgt: string;
// }

// interface Cartao {
//   date: string;
//   referencia_mes: number;
//   valor: number;
//   operacao: string;
//   descricao: string;
//   classe: string;
//   centro_custo: string;
//   desconto: string;
//   parc_de: number;
//   parc_ate: number;
//   parc_pag: number;
// }

// interface Conjuntas {
//   descricao: string;
//   valor: number;
// }

// interface Resumo {
//   entrada: number;
//   saida: number;
//   falta: number;
// }

// interface Data {
//   painel: Painel[];
//   cartao: Cartao[];
//   conjuntas: Conjuntas[];
//   resumo: Resumo;
// }

// const initialState: Data = {
//   painel: [],
//   cartao: [],
//   conjuntas: [],
//   resumo: {
//     entrada: 0,
//     saida: 0,
//     falta: 0,
//   },
// };

// type Action =
//   | { type: 'ADD_PAINEL'; payload: Painel }
//   | { type: 'ADD_CARTAO'; payload: Cartao }
//   | { type: 'ADD_CONJUNTA'; payload: Conjuntas }
//   | { type: 'UPDATE_RESUMO' };

// const calculateResumo = (state: Data): Resumo => {
//   let entrada = 0;
//   let saida = 0;

//   // Calcular entradas e saídas do Painel
//   state.painel.forEach(item => {
//     if (item.operacao === 'saida') {
//       saida += item.valor;
//     } else if (item.operacao === 'entrada') {
//       entrada += item.valor;
//     }
//   });

//   // Calcular entradas e saídas do Cartão
//   state.cartao.forEach(item => {
//     if (item.operacao === 'saida') {
//       saida += item.valor;
//     } else if (item.operacao === 'entrada') {
//       entrada += item.valor;
//     }
//   });

//   const falta = entrada - saida;

//   return { entrada, saida, falta };
// };

// const reducer = (state: Data, action: Action): Data => {
//   switch (action.type) {
//     case 'ADD_PAINEL':
//       const newPainel = [...state.painel, action.payload];
//       return { ...state, painel: newPainel, resumo: calculateResumo({ ...state, painel: newPainel }) };
    
//     case 'ADD_CARTAO':
//       const newCartao = [...state.cartao, action.payload];
//       return { ...state, cartao: newCartao, resumo: calculateResumo({ ...state, cartao: newCartao }) };
    
//     case 'ADD_CONJUNTA':
//       return { ...state, conjuntas: [...state.conjuntas, action.payload] };
    
//     default:
//       return state;
//   }
// };

// const FinancialSummary: React.FC = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const [form] = Form.useForm();
//   const [activeTab, setActiveTab] = useState<string>('painel');

//   const handleFinish = (values: any) => {
//     if (activeTab === 'painel') {
//       const newPainel: Painel = {
//         descricao: values.descricao,
//         valor: values.valor,
//         operacao: values.operacao,
//         data_pgt: values.data_pgt.format('DD/MM/YYYY')
//       };
//       dispatch({ type: 'ADD_PAINEL', payload: newPainel });
//     } else if (activeTab === 'cartao') {
//       const newCartao: Cartao = {
//         date: values.date.format('DD/MM/YYYY'),
//         referencia_mes: values.referencia_mes,
//         valor: values.valor,
//         operacao: values.operacao,
//         descricao: values.descricao,
//         classe: values.classe,
//         centro_custo: values.centro_custo,
//         desconto: values.desconto,
//         parc_de: values.parc_de,
//         parc_ate: values.parc_ate,
//         parc_pag: values.parc_pag
//       };
//       dispatch({ type: 'ADD_CARTAO', payload: newCartao });
//     } else if (activeTab === 'conjuntas') {
//       const newConjunta: Conjuntas = {
//         descricao: values.descricao,
//         valor: values.valor
//       };
//       dispatch({ type: 'ADD_CONJUNTA', payload: newConjunta });
//     }
//     form.resetFields();
//     message.success('Registro adicionado com sucesso!');
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <Title level={2}>Resumo Financeiro</Title>

//       <Card title="Formulário" style={{ marginBottom: '20px' }}>
//         <Form form={form} layout="vertical" onFinish={handleFinish}>
//           <Form.Item name="descricao" label="Descrição" rules={[{ required: true, message: 'Insira uma descrição' }]}>
//             <Input />
//           </Form.Item>

//           <Form.Item name="valor" label="Valor" rules={[{ required: true, message: 'Insira um valor' }]}>
//             <InputNumber style={{ width: '100%' }} min={0} />
//           </Form.Item>

//           {activeTab === 'painel' && (
//             <>
//               <Form.Item name="operacao" label="Operação" rules={[{ required: true, message: 'Selecione uma operação' }]}>
//                 <Select>
//                   <Option value="entrada">Entrada</Option>
//                   <Option value="saida">Saída</Option>
//                 </Select>
//               </Form.Item>

//               <Form.Item name="data_pgt" label="Data de Pagamento" rules={[{ required: true, message: 'Selecione uma data' }]}>
//                 <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
//               </Form.Item>
//             </>
//           )}

//           {activeTab === 'cartao' && (
//             <>
//               <Form.Item name="date" label="Data" rules={[{ required: true, message: 'Selecione uma data' }]}>
//                 <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
//               </Form.Item>

//               <Form.Item name="classe" label="Classe">
//                 <Input />
//               </Form.Item>

//               <Form.Item name="centro_custo" label="Centro de Custo">
//                 <Input />
//               </Form.Item>

//               <Form.Item name="referencia_mes" label="Referência do Mês">
//                 <InputNumber style={{ width: '100%' }} min={1} max={12} />
//               </Form.Item>

//               <Form.Item name="parc_de" label="Parcela de">
//                 <InputNumber style={{ width: '100%' }} min={1} />
//               </Form.Item>

//               <Form.Item name="parc_ate" label="Parcela até">
//                 <InputNumber style={{ width: '100%' }} min={1} />
//               </Form.Item>

//               <Form.Item name="parc_pag" label="Parcelas Pagas">
//                 <InputNumber style={{ width: '100%' }} min={1} />
//               </Form.Item>
//             </>
//           )}

//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Adicionar
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>

//       <Button onClick={() => setActiveTab('painel')} type={activeTab === 'painel' ? 'primary' : 'default'} style={{ marginRight: '10px' }}>
//         Painel
//       </Button>
//       <Button onClick={() => setActiveTab('cartao')} type={activeTab === 'cartao' ? 'primary' : 'default'} style={{ marginRight: '10px' }}>
//         Cartão
//       </Button>
//       <Button onClick={() => setActiveTab('conjuntas')} type={activeTab === 'conjuntas' ? 'primary' : 'default'}>
//         Conjuntas
//       </Button>

//       <Card title="Painel" style={{ marginTop: '20px' }}>
//         <List
//           itemLayout="horizontal"
//           dataSource={state.painel}
//           renderItem={item => (
//             <List.Item>
//               <List.Item.Meta
//                 title={item.descricao}
//                 description={`Valor: R$${item.valor} | Operação: ${item.operacao} | Data: ${item.data_pgt}`}
//               />
//             </List.Item>
//           )}
//         />
//       </Card>

//       <Card title="Cartão" style={{ marginTop: '20px' }}>
//         <List
//           itemLayout="horizontal"
//           dataSource={state.cartao}
//           renderItem={item => (
//             <List.Item>
//               <List.Item.Meta
//                 title={item.descricao}
//                 description={`Valor: R$${item.valor} | Operação: ${item.operacao} | Data: ${item.date} | Classe: ${item.classe}`}
//               />
//             </List.Item>
//           )}
//         />
//       </Card>

//       <Card title="Resumo" style={{ marginTop: '20px' }}>
//         <Text>Entrada: R${state.resumo.entrada}</Text><br />
//         <Text>Saída: R${state.resumo.saida}</Text><br />
//         <Text>Falta: R${state.resumo.falta}</Text>
//       </Card>
//     </div>
//   );
// };

// export default FinancialSummary;
