// import { SearchOutlined, UserOutlined } from "@ant-design/icons";
// import {
//   Avatar,
//   Card,
//   Carousel,
//   Col,
//   Divider,
//   Input,
//   Layout,
//   Row,
//   Image,
//   List,
//   Button,
// } from "antd";
// import "./app.css";

// const styleRow: React.CSSProperties = {
//   border: "2px solid blue",
//   margin: "3px",
//   maxWidth: "95%",
//   flexWrap: "wrap",
// };

// const styleCol: React.CSSProperties = {
//   border: "2px solid red",
// };

// const contentStyle: React.CSSProperties = {
//   height: "160px",
//   color: "#fff",
//   lineHeight: "160px",
//   textAlign: "center",
//   background: "#364d79",
// };

// const data = [
//   "Racing car sprays burning fuel into crowd.",
//   "Japanese princess to wed commoner.",
//   "Australian walks 100km after outback crash.",
//   "Man charged over missing wedding girl.",
//   "Los Angeles battles huge wildfires.",
// ];

// // const RowComponent: React.FC = () => (
// //   <Row justify="end" gutter={[3, 3]} style={styleRow}>
// //     <Divider orientation="left">Linha principal 1</Divider>
// //     <Col flex="auto" style={styleCol} order={1}>
// //       <p>Coluna 1</p>
// //     </Col>
// //     <Col flex="auto" style={styleCol} order={3}>
// //       <p>Coluna 2</p>
// //     </Col>
// //     <Col flex="auto" style={styleCol} order={2}>
// //       <p>Coluna 3</p>
// //     </Col>
// //   </Row>
// // );

// const { Header, Content, Footer } = Layout;

// const WebSite: React.FC = () => (
//   <Layout style={{ minHeight: "100vh" }}>
//     <Header className="header-container">
//       <Row style={{ flexWrap: "nowrap" }}>
//         <Col flex="auto" className="header-left" style={styleCol} order={1}>
//           <img
//             src="https://i.pinimg.com/736x/6e/8a/fd/6e8afd1bf5993ae1f2631e2909b86cf7.jpg"
//             alt="Logo"
//           />
//         </Col>
//         <Col flex="auto" className="header-center" style={styleCol} order={2}>
//           <Input prefix={<SearchOutlined />} placeholder="Menu de busca..." />
//         </Col>
//         <Col flex="auto" className="header-right" style={styleCol} order={3}>
//           <Avatar shape="square" icon={<UserOutlined />} />
//         </Col>
//       </Row>
//     </Header>

//     <Layout>
//       <Content
//         style={{
//           margin: "10px 10px 0",
//           overflow: "auto",
//           padding: "0 1px",
//          // border: "2px solid red",
//           height: 400,
//         }}
//       >
//         <Carousel autoplay>
//           {[1, 2, 3, 4].map((number) => (
//             <div key={number}>
//               <h3 style={contentStyle}>{number}</h3>
//             </div>
//           ))}
//         </Carousel>

//         <Row className="manut-content" gutter={[3, 3]}>
//           <Col flex="auto" order={3}>
//               <h1> Segurança e serviço, sempre e nossa prioridade</h1>
//           </Col>
//           <Col flex="auto" order={3}>
//               <Button>Faça um orçamento grátis</Button>
//           </Col>
//         </Row>

//         <Row justify="space-between" gutter={[3, 3]}>
//           <Divider orientation="left">Satisfação e garantias</Divider>
//           <Col flex="auto" order={1}>
//             <Card title="Serviços">
//               <p>Serviços e garantias</p>
//             </Card>
//           </Col>
//           <Col flex="auto" order={3}>
//             <List
//               size="small"
//               header={<div>Header</div>}
//               footer={<div>Footer</div>}
//               bordered
//               dataSource={data}
//               renderItem={(item) => <List.Item>{item}</List.Item>}
//             />
//           </Col>
//         </Row>

//         <Row justify="start" gutter={[3, 3]}>
//           <Divider orientation="left">Projetos Recentes</Divider>
//           {[
//             "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//             "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//             "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//             "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//             "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//           ].map((src, index) => (
//             <Col
//               key={index}
//               xs={24}
//               sm={12}
//               md={8}
//               lg={6}
//               xl={4}
//               style={styleCol}
//             >
//               <Card>
//                 <Image width={300} src={src} />
//               </Card>
//             </Col>
//           ))}
//         </Row>

//         <Row style={{ flexWrap: "wrap" }} gutter={[10, 6]}>
//           <Divider orientation="left">Nossos serviços</Divider>
//           {[...Array(6)].map((_, index) => (
//             <Col key={index} flex="auto" order={3}>
//               <List
//                 size="small"
//                 header={<div>Header</div>}
//                 footer={<div>Footer</div>}
//                 bordered
//                 dataSource={data}
//                 renderItem={(item) => <List.Item>{item}</List.Item>}
//               />
//             </Col>
//           ))}
//         </Row>

//         <Row justify="space-between" gutter={[3, 3]}>
//           <Divider orientation="left">Depoimentos</Divider>
//           <Col flex="auto" order={3}>
//           <Card  title="Depoimentos">
//             {[...Array(6)].map((_, index) => (
//              <>
//              <Card.Meta 
//              title='Alex Sandro Alves de lima' 
//              avatar={[<>Avatar</>]}
//               key={index} 
//               description='Descrição do depoimento' 
//               />
               
//                 </>
//             ))}
//               </Card>
//           </Col>
//         </Row>

//         <Row justify="space-between" gutter={[3, 3]}>
//           <Divider orientation="left">Contatos</Divider>
//           <Col flex={'auto'} order={1}>
   
//             <Card
//              prefix="sa"
//              type={'inner'}
//              extra={[<>Extra</>]}
//              actions={[<>Ações</>]}
//              title="Serviços">
//               <Card.Meta 
//                     title='Serviço' 
//                     avatar={[<>Avatar</>]}
//                      key={1} 
//                      description='Garantia' 
//                      />
              
//             </Card>
//           </Col>
//           <Col flex="auto" order={3}>
//           <h1>Juntese ao nosso movimento</h1>
//           <Card>
//             Junte-se ao nosso movimento
//           </Card>
//           </Col>
//         </Row>
//         <br />
//         <br />
//         <Footer style={{ textAlign: "center" }}>
//           AutomatFull ©2024 Created by AutomatFull
//         </Footer>
//       </Content>
//     </Layout>
//   </Layout>
// );

// export default WebSite;
