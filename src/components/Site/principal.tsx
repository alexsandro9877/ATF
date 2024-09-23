import { Col, Divider, Row, Typography, Image } from "antd";
import { IPrincipal } from "./type";
import DynamicCard from "../Dynamic/Card/DynamicCardProps";

const { Paragraph } = Typography;

interface IProps {
  data: IPrincipal[];
  loadingData: boolean;
}

const Principal: React.FC<IProps> = ({ data, loadingData }) => {
  console.log(loadingData);

  return (
    <Row gutter={[16, 16]} align="middle" style={{ padding: "0 8px" }}>
      
      <Col span={24} style={{ border: '2px solid black' }}>
        <p>Nossos projetos</p>
      </Col>

      {/* Dynamic Cards */}
      {data.map((principal, index) => (
        <Col key={index} md={12} lg={24} flex={'auto'}>
          <DynamicCard
            title={principal.title}
            content={
              <Row gutter={[16, 16]}>
               
                <Col 
                  flex="1" 
                  style={{ border: "", margin: "5px", padding: "10px" }}
                >
                  <Paragraph>
                  <Divider orientation="left">{principal.description}</Divider>
                    {principal.subDescription}
                    </Paragraph>
                  <ul>
                    {Array(6).fill(null).map((_, i) => (
                      <li key={i}>valor</li>
                    ))}
                  </ul>
                </Col>
                <Col 
                  flex="1" 
                  style={{ border: "", margin: "5px", padding: "10px", textAlign: 'center' }}
                >
                  <Image
                    src={principal.imageLogo}
                    alt={principal.title}
                    width={300}  
                    height={200} 
                    style={{ objectFit: "cover" }} 
                  />
                </Col>
              </Row>
            }
          />
        </Col>
      ))}
    </Row>
  );
};

export default Principal;
