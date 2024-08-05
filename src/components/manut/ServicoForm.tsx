// import React, { useState } from 'react';
// import { Form, Input, Button, Upload, Row, Col } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';

// const ServicoForm: React.FC = () => {


//   const [formValues, setFormValues] = useState<React.FormEvent>();
//   const [fileList, setFileList] = useState<any[]>([]);
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment

//   const onFinish = (values: React.FormEvent) => {
//     console.log('Serviço values: ', values);
//   };

//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// //@ts-expect-error
//   const onValuesChange = (changedValues: any, allValues: any) => {
//     setFormValues(allValues);
//   };

//   const handleImageChange = ({ fileList }: any) => {
//     setFileList(fileList);
//   };

//   const handlePreview = async (file: any) => {
//     let src = file.url;
//     if (!src) {
//       src = await new Promise(resolve => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file.originFileObj);
//         reader.onload = () => resolve(reader.result as string);
//       });
//     }
//     const image = new Image();
//     image.src = src;
//     const imgWindow = window.open(src);
//     imgWindow?.document.write(image.outerHTML);
//   };

//   return (
//     <Row>
//       <Col span={12}>
//         <Form onFinish={onFinish} onValuesChange={onValuesChange}>
//           <Form.Item name="title" label="Título" rules={[{ required: true, message: 'Por favor, insira o título' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="description" label="Descrição" rules={[{ required: true, message: 'Por favor, insira a descrição' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="image" label="Imagem" rules={[{ required: true, message: 'Por favor, faça o upload da imagem' }]}>
//             <Upload
//               listType="picture-card"
//               fileList={fileList}
//               onPreview={handlePreview}
//               onChange={handleImageChange}
//               beforeUpload={() => false}
//             >
//               {fileList.length < 1 && <div>
//                 <UploadOutlined />
//                 <div style={{ marginTop: 8 }}>Upload</div>
//               </div>}
//             </Upload>
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Enviar
//             </Button>
//           </Form.Item>
//         </Form>
//       </Col>
//       <Col span={12}>
//         <h3>Pré-visualização</h3>
//         <p><strong>Título:</strong> {formValues.title}</p>
//         <p><strong>Descrição:</strong> {formValues.description}</p>
//         {fileList.length > 0 && (
//           <img
//             src={URL.createObjectURL(fileList[0].originFileObj)}
//             alt="Pré-visualização da Imagem"
//             style={{ maxWidth: '100%' }}
//           />
//         )}
//       </Col>
//     </Row>
//   );
// };

// export default ServicoForm;
