import React from "react";
import { Row, Col, Typography, Card } from "antd";
import {
  PhoneOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { IContact } from "./type";
import DynamicCard from "../Dynamic/Card/DynamicCardProps";

const { Title, Paragraph } = Typography;

interface IProps {
  data: IContact[];
  loadingData: boolean;
}

const Contact: React.FC<IProps> = ({ data, loadingData }) => {
  function avatarIcon(icon: string) {
    switch (icon) {
      case "telefone":
        return <PhoneOutlined style={{ fontSize: "24px", color: "#FFC107" }} />;
      case "informacao":
        return (
          <InfoCircleOutlined style={{ fontSize: "24px", color: "#FFC107" }} />
        );
      case "localizacao":
        return (
          <EnvironmentOutlined style={{ fontSize: "24px", color: "red" }} />
        );
      default:
        console.log("Não existe!");
        return null;
    }
  }

  console.log(loadingData);

  return (
    <>
      {data[0].status === true ? (
        <>
          <DynamicCard
            title={<Title level={1}>{data[0].title}</Title>}
            content={
              <>
                <Row gutter={[16, 16]} className="contact-info">
            {data.map((e, index) =>
              e.status === true ? (
                e.card.map((e) =>
                  e.status === true ? (
                    <Col key={index} flex={"auto"}>
                      <Card
                      hoverable
                        bordered={true}
                        type={"inner"}
                        className="info-card"
                        style={{ width: "100%", height: "250px" }}
                        extra={avatarIcon(String(e.icon))}
                        title={<Title level={3}>{e.title}</Title>}
                      >
                        <Paragraph>
                          {e.description?.split("/n").map((i, idx) => (
                            <ul key={idx} style={{ padding: "0", margin: "0" }}>
                              <li>{i}</li>
                            </ul>
                          ))}
                        </Paragraph>
                      </Card>
                    </Col>
                  ) : (
                    <></>
                  )
                )
              ) : (
                <></>
              )
            )}
          </Row>
              </>
            }
            extra="sdas"
          />
       
          
          <div className="contact-map">
            <iframe
              src={data[0].local[0]}
              width="100%"
              height="350"
              frameBorder="0"
              style={{ border: 0 }}
              aria-hidden="false"
            ></iframe>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Contact;
