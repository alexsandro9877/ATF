import React from "react";
import { Avatar, Carousel, Image, Layout, Menu } from "antd";
import "./app.css";
import About from "./about";
import Contact from "./contact";
import Principal from "./principal";
import Testimonials from "./testimonials";
import Seguranca from "./seguranca";
import Project from "./project";
import { dataWebSite } from "./type";

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

const carouselItemStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const imageStyle: React.CSSProperties = {
  // maxWidth: "100%",
  // maxHeight: "100%",
  // objectFit: "contain", // Use "cover" para ocupar todo o espaço com possível corte
};

const WebCarousel: React.FC = () => {
  return (
    <Carousel autoplay>
      {dataWebSite.carousel.map((item) => (
        <div key={item.key} style={carouselItemStyle}>
          <Image src={item.image} alt={item.alt} style={imageStyle} preview={false} />
        </div>
      ))}
    </Carousel>
  );
};

const WebSite: React.FC = () => {
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
          <WebCarousel />
          <Project />
          <Principal />
          <Testimonials />
          <Seguranca />
          <Contact />
          <About />
        </Content>
      </Layout>
    </Layout>
  );
};

export default WebSite;
