import React from "react";
import {
  Avatar,
  // Button,
  // Carousel,
  // Form,
  // Image,
  // Input,
  Layout,
  Menu,
 // Space,
} from "antd";
import "./app.css";
import About from "./about";
import Contact from "./contact";
import Principal from "./principal";

import { dataWebSite } from "./type";
import Servicos from "./servicos";
import CarouselWeb from "./carouselWeb";
import Gastos from "./gts";
// import FinancialSummary from "./resumo";
// import DynamicButton from "../Dynamic/Button/DynamicButtonProps";
// import { CloseOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

const headerStyle: React.CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 1,
  width: "100%",
  display: "flex",
  alignItems: "center",
};

const contentStyle: React.CSSProperties = {
  margin: "10px 10px 0",
  overflow: "auto",
  padding: "0 1px",
  height: 400,
};

// const WebCarousel: React.FC = () => {
//   return (
//     <Carousel autoplay>
//       {dataWebSite.carousel.map((item) => (
//         <div key={item.key} >
//           <Image src={item.image} alt={item.alt} preview={false} />
//         </div>
//       ))}
//     </Carousel>
//   );
// };

const WebSite: React.FC = () => {
  // const [form] = Form.useForm();
  // const [info, setInfo ]=useState<string[]>([]);
  // const [newImage, setNewImage] = useState('');

  // const handleRemove = (inf: string) => {
  //   setInfo(info.filter(e => e !== inf));
  // };

  // const handleAddImage = () => {
  //   if (newImage && !info.includes(newImage)) {
  //     setInfo([...info, newImage]);
  //     setNewImage('');
  //   }
  // };

  const ObjDate = dataWebSite;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={headerStyle}>
        <img
          className="demo-logo"
          src={dataWebSite.principal[0].imageLogo}
          alt="Logo"
        />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={dataWebSite.menu}
          style={{ flex: 1, minWidth: 0 }}
        />
        <Avatar src="" style={{ backgroundColor: "red" }} />
      </Header>
      <Layout>
        <Content style={contentStyle}>
          <CarouselWeb data={ObjDate.carousel} loadingData={false} />
          <Principal
            data={ObjDate.principal}
            loadingData={ObjDate.principal[0].status || false}
          />
          <Servicos data={ObjDate.servico} loadingData={false} />
          <Contact data={ObjDate.contact} loadingData={false} />
          <About data={ObjDate.abount} loadingData={false} />
          <Gastos />

          {/* <Form form={form} layout="vertical" >
<Form.Item 
       name="picture"
       label="Imagem usuario."
       rules={[{ required: false, message: "Por favor, insira a URL da imagem!" }]}
      >
        <Space direction="vertical">
          {info.map((image, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', border :"1px solid" }}>
              <img src={image} alt={`image-${index}`} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
              {index === 0 ? "Imagem do perfil":"Você só pode enviar, uma imagem para seu perfil"}
              <DynamicButton  danger ={true}  onClick={() => handleRemove(image)} title='Excluir registro' icon={<CloseOutlined />}  />
              
            </div>
          ))}
          <Space>
            <Input  value={newImage} onChange={(e) => setNewImage(e.target.value)} placeholder="URL da imagem" />
            <Button onClick={handleAddImage}>Adicionar Imagem</Button>
          </Space>
        </Space>
        </Form.Item>
</Form> */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default WebSite;
