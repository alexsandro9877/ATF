
import { Carousel, Card,  Avatar, Divider, Descriptions, Tag, Rate } from 'antd';

interface FeedbackSection {
  id: string;
  name: string;
  feedback: string;
  rating_qualidade: number;
  rating_profissionalismo: number;
  rating_tempo: number;
  rating_limpeza: number;
  rating_comunicacao: number;
  avatar: string;
  eleger: boolean;
  dataInclusao: string;
}

const { Meta } = Card;

const testimonials: FeedbackSection[] = [
  {
    name: "Alex Sandro",
    rating_qualidade: 5,
    rating_profissionalismo: 4,
    rating_tempo: 5,
    rating_limpeza: 2,
    rating_comunicacao: 5,
    feedback: "Ótimo serviço!",
    id: "8asazo36",
    avatar: "https://api.dicebear.com/9.x/lorelei/svg?seed=5",
    eleger: false,
    dataInclusao: "02/08/2024, 11:21:31"
  },
  {
    name: "Ana Paula",
    rating_qualidade: 4,
    rating_profissionalismo: 5,
    rating_tempo: 4,
    rating_limpeza: 3,
    rating_comunicacao: 4,
    feedback: "Muito bom!",
    id: "9azbzo37",
    avatar: "https://api.dicebear.com/9.x/lorelei/svg?seed=6",
    eleger: true,
    dataInclusao: "01/08/2024, 10:15:21"
  },
  {
    name: "Carlos Silva",
    rating_qualidade: 3,
    rating_profissionalismo: 4,
    rating_tempo: 5,
    rating_limpeza: 5,
    rating_comunicacao: 5,
    feedback: "Satisfatório.",
    id: "7ayczo38",
    avatar: "https://api.dicebear.com/9.x/lorelei/svg?seed=7",
    eleger: false,
    dataInclusao: "03/08/2024, 12:18:40"
  }
];

// const IconText = ({ icon, text }: { icon: React.ReactNode; text?: number }) => (
//   <Space>
//     {icon}
//     {text}
//   </Space>
// );

const TestimonialsSection = () => (
  <div className="testimonials-section">
    <h2>O que nossos clientes dizem</h2>
    <Carousel 
      autoplay 
      dots={true} 
      // slidesToScroll={1}
      // slidesToShow={2}
      responsive={[
        { breakpoint: 2010, settings: { slidesToShow: 3, slidesToScroll: 1 } },
         { breakpoint: 1002, settings: { slidesToShow: 2, slidesToScroll: 1 } },
         { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      ]}
    >
      {testimonials.map((item) => (
        <div key={item.id}>
          <Card bordered={false} style={{ margin: '0 10px', padding: '10px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
            <Meta
              avatar={<Avatar src={item.avatar} />}
              title={item.name}
              description={
                <div>
                  <Descriptions
                    layout="vertical"
                    column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                    extra={<Tag color={item.eleger ? 'green' : 'red'}>{item.eleger ? 'Ativo' : 'Inativo'}</Tag>}
                  >
                    <Descriptions.Item label="1. Qualidade do Serviço"><Rate value={item.rating_qualidade} disabled /></Descriptions.Item>
                    <Descriptions.Item label="2. Profissionalismo"><Rate value={item.rating_profissionalismo} disabled /></Descriptions.Item>
                    <Descriptions.Item label="3. Tempo de Execução"><Rate value={item.rating_tempo} disabled /></Descriptions.Item>
                    <Descriptions.Item label="4. Limpeza e Organização"><Rate value={item.rating_limpeza} disabled /></Descriptions.Item>
                    <Descriptions.Item label="5. Comunicação"><Rate value={item.rating_comunicacao} disabled /></Descriptions.Item>
                    <Divider />
                    <Descriptions.Item label="Feedback">{item.feedback}</Descriptions.Item>
                  </Descriptions>
                </div>
              }
            />
          </Card>
        </div>
      ))}
    </Carousel>
  </div>
);

export default TestimonialsSection;
