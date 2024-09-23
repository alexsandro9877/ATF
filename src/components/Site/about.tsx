import React from "react";
import { Row, Col,  Image, Card } from "antd";
import { IAbount } from "./type";
import DynamicCard from "../Dynamic/Card/DynamicCardProps";
// import Title from "antd/es/skeleton/Title";

interface IProps {
  data: IAbount[];
  loadingData: boolean;
}

const Abount: React.FC<IProps> = ({ data, loadingData }) => {
  console.log(loadingData);

  return (
    // <Content style={{ padding: '0 50px' }}>
    <>
      {data[0].status ? (
        <>
          <DynamicCard
            title={<h1>{data[0].title}</h1>}
            content={
              <>
                <Row justify="end">
                  <Col
                    span={24}
                    style={{ textAlign: "center", padding: "20px 0" }}
                  >
                    <p>{data[0].description}</p>
                  </Col>
                  <Col
                    span={24}
                    style={{ textAlign: "center", marginBottom: "20px" }}
                  >
                    <Image src={String(data[0].image)} width={"35%"} />
                  </Col>
                </Row>
              </>
            }
          />

          <DynamicCard
            title={<h1>{data[0].title}</h1>}
            content={
              <>
                <Row justify="center" style={{ marginTop: "20px" }}>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <h2>{data[0].description}</h2>
                  </Col>
                  <Col
                    span={24}
                    style={{ textAlign: "center", marginTop: "20px" }}
                  >
                    <img
                      src={data[0].image}
                      alt="Strategy Development"
                      style={{ width: "10%", height: "auto" }}
                    />
                  </Col>
                </Row>
              </>
            }
          />

          <DynamicCard
            title={<h1>Equipe</h1>}
            content={
              <>
                <Row
                  justify="center"
                  // style={{ marginTop: "20px", padding: "20px 0" }}
                >
                    <Col span={4}  style={{ textAlign: "center" }}>
                  {data[0].team.map((e) => (
                  
                      <Card hoverable >
                        <Image
                          src={e.image}
                           width={"35%"}
                           height={"35%"}
                          style={{ objectFit: "cover" }}
                        />
                        {/* <Avatar src={e.image}  /> */}
                        <h3>{e.description}</h3>
                        <p>{e.title}</p>
                      </Card>
                    
                  ))}
                  </Col>
                </Row>
              </>
            }
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Abount;
