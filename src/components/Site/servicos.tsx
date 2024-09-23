import { BranchesOutlined, BulbOutlined, CheckOutlined, FireOutlined, SafetyOutlined, ToolOutlined } from '@ant-design/icons';
import {  Card,  Col, Row } from 'antd'

import {  IServico } from "./type";
interface IProps {
  data: IServico[];
  loadingData: boolean;
}

const Servicos: React.FC<IProps> = ({ data, loadingData }) => {
  console.log(loadingData);

    function avatarIcon(icon: string) {
      switch (icon) {
        case "iluminacao":
          return <BulbOutlined style={{ fontSize: "24px", color: "#FFC107" }} />;
        case "fiacao":
          return (
            <BranchesOutlined style={{ fontSize: "24px", color: "#FFC107" }} />
          );
        case "reparar":
          return (
            <ToolOutlined style={{ fontSize: "24px", color: "red" }} />
          );
          case "instalacao":
            return (
              <CheckOutlined style={{ fontSize: "24px", color: "red" }} />
            );
            case "aquecimento":
              return (
                <FireOutlined style={{ fontSize: "24px", color: "red" }} />
              );
              case "seguranca":
                return (
                  <SafetyOutlined style={{ fontSize: "24px", color: "red" }} />
                );

        default:
          console.log("Não existe!");
          return null;
      }
    }

  return (
    <>
    
        {/* Seção Nossos Serviços */}
        <Row gutter={[16, 16]} style={{ marginTop: 50 }}>

          {data.map((servico)=>(
            <>
            <Col xs={24} md={8}>
            <Card title={servico.title} bordered={false} extra={avatarIcon(String(servico.icon))} hoverable>
              <p>Sempre que você estiver lidando com eletricidade, precisará de um especialista certificado.</p>
            </Card>
          </Col>
            </>
          ))}
          
        </Row>
        <br />
    </>
  )
}

export default Servicos