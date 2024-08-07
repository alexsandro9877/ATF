import  { useState } from 'react';
import { Form, Input, Button,  Row, Col, Carousel, List, Avatar, Space, message, Popconfirm, Tooltip, Switch } from 'antd';
import { CaretLeftOutlined, CheckOutlined, CloseOutlined, DeleteOutlined, FolderViewOutlined, StarOutlined } from '@ant-design/icons';
import DynamicButton from '../Dynamic/Button/DynamicButtonProps';
import DynamicCard from '../Dynamic/Card/DynamicCardProps ';




// const contentStyle = {
//   height: '400px',
//   color: '#fff',
//   lineHeight: '400px',
//   textAlign: 'center',
//   background: '#364d79',
// };

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover' as const,
};

interface IObjPrincipal {
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
  const [form] = Form.useForm<IObjPrincipal>();
  const [editing, setEditing] = useState<string | null>(null);
  const [objPrincipal, setObjPrincipal] = useState<IObjPrincipal[]>([]);
  const [imagem, setImagem] = useState<string| null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const titulo_page = 'Carrossel';

  
  const onFinish = (values: IObjPrincipal) => {
    const currentDate = new Date();
    const newItem: IObjPrincipal = {
      ...values,
      id: Math.floor(Date.now() * Math.random()).toString(36),
      eleger: false,
      dataInclusao: currentDate.toLocaleString('pt-BR')
    };
    setObjPrincipal([...objPrincipal, newItem]);
    message.success(`${titulo_page}, adicionado com sucesso!`);
    form.resetFields();
    setImagem(null)
    setFormValues({});
  };

  const deleteObjPrincipal = (id: string): void => {
    const newItem = objPrincipal.filter((e) => e.id !== id);
    setObjPrincipal(newItem);
    message.info('Dado excluído!');
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const onValuesChange = (changedValues: any, allValues: any) => {
    setFormValues(allValues);
  };

  const edit = (id: string): void => {
    setEditing(id);
  };

  const onEditFinish = (values: IObjPrincipal, id: string) => {
    const updatedobjPrincipal = objPrincipal.map((item) =>
      item.id === id ? { ...item, ...values } : item
    );
    setObjPrincipal(updatedobjPrincipal);
    setEditing(null);
    setImagem(null)
    message.success(`${titulo_page}, atualizado com sucesso!`);
  };

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
                 <h3>
                 
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
 
   const handleElegerSite = (checked: boolean, id: string) => {
    const updated = objPrincipal.map((item) =>
      item.id === id ? { ...item, eleger: checked } : item
    );
    setObjPrincipal(updated);
    message.info(checked ? 'Adicionado no site para demais pessoas ver!' : 'Removido do site!');
  };


  return (
    <>
    <Row>
      <Col flex={'auto'}>
      <DynamicCard
        title={titulo_page}
        content={
          <>
          <Row>
            <Col flex={'auto'}>
              <Form 
              onFinish={onFinish} 
              onValuesChange={onValuesChange} 
              form={form}
              >
                <Form.Item
                  name="title"
                  label="Título"
                  rules={[{ required: true, message: 'Por favor, insira o título' }]}
                >
                  <Input placeholder='Qual o descritivo da imagem ?' />
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
                 <Input placeholder='Qual o descritivo da imagem ?'  />
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
        title={titulo_page + ' cadastrados.'}
        extra={ <><Input.Search size="large" placeholder="Buscar por nome" onChange={(e) => setSearchTerm(e.target.value)} /> </>}
        content={
          <List
            className="objPrincipal-list"
            itemLayout="vertical"
            dataSource={objPrincipal.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))}
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 3,
            }}
            footer={<div>--</div>}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                actions={[
                  <IconText icon={<StarOutlined />} text={10} />,
                  <IconText icon={
                    <Popconfirm
                      title={'Deseja deletar o '+ titulo_page + ' selecionado.'}
                      description="Deseja deletar?"
                      onConfirm={() => deleteObjPrincipal(item.id)}
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
                      <Tooltip title="Eleger para o site">
                        <Switch
                          checkedChildren={<CheckOutlined />}
                          unCheckedChildren={<CloseOutlined />}
                          size="small"
                          checked={item.eleger}
                          onChange={(checked) => handleElegerSite(checked, item.id)}
                        />
                      </Tooltip>
                    } />,
                  <IconText icon={
                    <DynamicButton
                      onClick={() => edit(item.id)}
                      title="Visualizar"
                      icon={<FolderViewOutlined />} />}/>,
                      
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.image} />}
                  title={`${item.title} - ${item.dataInclusao}`}
                  description={<p>Descrição: {item.description} </p>}
                />
                {editing === item.id && (
                  <DynamicCard
                    title={` Editar ${titulo_page} - ${item.dataInclusao}`}
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
                              <Input placeholder='Qual o descritivo da imagem do objPrincipal?' />
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
                                    
                                    <Input onMouseMove ={(e)=>(
                                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                      //@ts-expect-error
                                      setImagem(String(e.target.value)))}/>
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
                                Salvar
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
