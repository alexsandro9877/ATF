import React, { useEffect, useState } from 'react';
import { Form, Input, Button,  Row, Col, Carousel, List, Avatar, Space, message, Popconfirm } from 'antd';
import { CaretLeftOutlined, DeleteOutlined, FolderViewOutlined, StarOutlined } from '@ant-design/icons';
import DynamicButton from '../Dynamic/Button/DynamicButtonProps';
import DynamicCard from '../Dynamic/Card/DynamicCardProps ';


const contentStyle = {
  height: '400px',
  color: '#fff',
  lineHeight: '400px',
  textAlign: 'center',
  background: '#364d79',
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover' as const,
};

interface ICarrossel {
  id: string;
  name: string;
  title: string;
  image: string;
  description: string;
  eleger: boolean;
  dataInclusao: string;
}

const CarrosselForm: React.FC = () => {
  const [formValues, setFormValues] = useState<any>({});
  const [form] = Form.useForm<ICarrossel>();
  const [editing, setEditing] = useState<string | null>(null);
  const [carrossel, setCarrossel] = useState<ICarrossel[]>([]);
  const [imagem, setImagem] = useState<string| null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(()=>{

  },[imagem])

  const onFinish = (values: ICarrossel) => {
    const currentDate = new Date();
    const newItem: ICarrossel = {
      ...values,
      id: Math.floor(Date.now() * Math.random()).toString(36),
      eleger: false,
      dataInclusao: currentDate.toLocaleString('pt-BR')
    };
    setCarrossel([...carrossel, newItem]);
    message.success('Carrossel adicionado com sucesso!');
    form.resetFields();
    setImagem(null)
    setFormValues({});
  };
  const deleteCarrossel = (id: string): void => {
    const newItem = carrossel.filter((e) => e.id !== id);
    setCarrossel(newItem);
    message.info('Dado excluído!');
  };

  const onValuesChange = (changedValues: any, allValues: any) => {
    setFormValues(allValues);
  };

  const editFeedback = (id: string): void => {
    setEditing(id);
  };

  const onEditFinish = (values: ICarrossel, id: string) => {
    const updatedCarrossel = carrossel.map((item) =>
      item.id === id ? { ...item, ...values } : item
    );
    setCarrossel(updatedCarrossel);
    setEditing(null);
    setImagem(null)
    message.success('Carrossel atualizado com sucesso!');
  };

  // const handleImageChange = ({ fileList }: any) => {
  //   setFileList(fileList);
  //   setImage(fileList);
  // };

  // const handlePreview = async (file: any) => {
  //   let src = file.url;
  //   if (!src) {
  //     src = await new Promise(resolve => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj);
  //       reader.onload = () => resolve(reader.result as string);
  //     });
  //   }
  //   setImage([{ url: src }]);
  //   const imgWindow = window.open(src);
  //   imgWindow?.document.write(`<img src="${src}" alt="Preview" />`);
  // };

  const IconText = ({ icon, text }: { icon: React.ReactNode; text?: number }) => (
    <Space>
      {icon}
      {text}
    </Space>
  );

  const  PreImagem =  ({ imagemUrl, description, title }: { imagemUrl: string; description?: string; title?: string;  }) => (
   <Row>
    <Col flex={'auto'}>
    <DynamicCard
      title="Pré-visualização tamanho ideal e 1400X400"
      content={
        <>
            <h3></h3>
            <Carousel autoplay>
              <div>
                <h3 style={contentStyle}>
                
                    <img
                      src={`${imagemUrl}`}
                      alt="Pré-visualização da Imagem"
                      style={imageStyle}
                    />
                </h3>
              </div>
            </Carousel>
            <p><strong>Título:</strong> {title}</p>
            <p><strong>Descrição:</strong> {description}</p>
            </>
          } />
      </Col>
    </Row>
  );

  return (
    <>
    <Row>
      <Col flex={'auto'}>
      <DynamicCard
        title="Cadastrar Carrossel"
        content={
          <>
          <Row>
            <Col flex={'auto'}>
              <Form onFinish={onFinish} 
              onValuesChange={onValuesChange} 
              form={form}>
                <Form.Item
                  name="title"
                  label="Título"
                  rules={[{ required: true, message: 'Por favor, insira o título' }]}
                >
                  <Input placeholder='Qual o descritivo da imagem do carrossel?' />
                </Form.Item>
                <Form.Item
                  name="description"
                  label="Descrição"
                  rules={[{ required: true, message: 'Por favor, insira a descrição' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="image"
                  label="Imagem"
                  rules={[{ required: true, message: 'Por favor, faça o upload da imagem' }]}
                >
                 <Input placeholder='Qual o descritivo da imagem do carrossel?'  />
                  {/* <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleImageChange}
                    beforeUpload={() => false}
                  >
                    {fileList.length < 1 && (
                      <div>
                        <UploadOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    )}
                  </Upload> */}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Enviar
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
              
          </>
          
          
        }
      />
      <DynamicCard
        title="Carrossel cadastrado"
        extra={<Input.Search size="large" placeholder="Buscar por nome" onChange={(e) => setSearchTerm(e.target.value)} />}
        content={
          <List
            className="Carrossel-list"
            itemLayout="vertical"
            dataSource={carrossel.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))}
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 1,
            }}
            footer={<div>Carrossel de Imagens</div>}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                actions={[
                  <IconText icon={<StarOutlined />} text={10} />,
                  <IconText icon={
                    <Popconfirm
                      title="Deletar carrossel."
                      description="Deseja deletar?"
                      onConfirm={() => deleteCarrossel(item.id)}
                      okText="Sim"
                      cancelText="Não"
                    >
                      <DynamicButton
                        icon={<DeleteOutlined />}
                        title="Deletar"
                        disabled={!!editing}
                        danger
                      />
                    </Popconfirm> }/>,
                  <IconText icon={
                    <DynamicButton
                      onClick={() => editFeedback(item.id)}
                      title="Visualizar"
                      icon={<FolderViewOutlined />} />}/>,
                      
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.image} />}
                  title={`${item.name} - ${item.dataInclusao}`}
                  description={<p>Descrição: {item.description} </p>}
                />
                {editing === item.id && (
                  <DynamicCard
                    title={` Editar carrossel - ${item.dataInclusao}`}
                    content={
                      <Row gutter={[16, 16]} justify="space-between">
                        <Col flex="auto">
                          <Form
                            initialValues={item}
                            layout="horizontal"
                            onFinish={(values) => onEditFinish(values, item.id)}
                            onValuesChange={onValuesChange}
                          >
                            <Form.Item
                              name="title"
                              label="Título"
                              rules={[{ required: true, message: 'Por favor, insira o título' }]}
                            >
                              <Input placeholder='Qual o descritivo da imagem do carrossel?' />
                            </Form.Item>
                            <Form.Item
                              name="description"
                              label="Descrição"
                              rules={[{ required: true, message: 'Por favor, insira a descrição' }]}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              name="image"
                              label="Imagem"
                              rules={[{ required: true, message: 'Por favor, faça o upload da imagem' }]}
                            > 
                                    
                                    <Input onMouseMove ={(e)=>(setImagem(String(e.target.value)))}/>
                              {/* <Upload
                                listType="picture-card"
                                fileList={image.length ? image : []}
                                onPreview={handlePreview}
                                onChange={handleImageChange}
                                beforeUpload={() => false}
                              >
                                {image.length < 1 && (
                                  <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                  </div>
                                )}
                              </Upload> */}
                            </Form.Item>
                           
                            <Form.Item>
                              <Button type="primary" htmlType="submit">
                                Enviar
                              </Button>
                            </Form.Item>
                          </Form>
                        </Col>
                      </Row>
                    }
                    extra={
                      <DynamicButton
                        onClick={() => (setEditing(null), setImagem(null))}
                        title="Retornar"
                        icon={<CaretLeftOutlined />}
                      />
                    }
                  />
                )}
              </List.Item>
            )}
          />
        }
      />
      </Col>
      <Col md={12} >
      <PreImagem description={formValues.description} imagemUrl={ imagem ? imagem : formValues.image } title={formValues.title} />
      </Col>
    </Row>
    
  
    </>
  );
};

export default CarrosselForm;
