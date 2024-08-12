import React, { useEffect } from 'react';
import { Form, Input, Button, Space, InputNumber, Checkbox, message } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { usePostSites, usePutSites } from '../../../hooks/api';
import { CreateSitesProps } from '../../../types';
import { useQueryClient } from '@tanstack/react-query';

const { TextArea } = Input;

interface CreateSiteFormProps {
  initialValues?: CreateSitesProps; 
}

const CreateSiteForm: React.FC<CreateSiteFormProps> = ({ initialValues }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { mutate: postSite} = usePostSites({
    
    onSuccess: (data: any) => {
      const successMessage = data.message || 'Site criado com sucesso';
      message.success(successMessage);
         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
      queryClient.invalidateQueries('sites');
      form.resetFields();
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Falha ao criar site';
      message.error(errorMessage);
    }
  });

  const { mutate: putSite} = usePutSites({
    onSuccess: (data: any) => {
      const successMessage = data.message || 'Site atualizado com sucesso';
      message.success(successMessage);
         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
      queryClient.invalidateQueries('sites');
      form.resetFields();
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Falha ao atualizar site';
      message.error(errorMessage);
    }
  });


  const onFinish = (values: any) => {
    initialValues ?   putSite({...values, id: initialValues.id}) :  postSite(values)
  };
 
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);
  
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues || {
        routes: ['/home', '/about'],
        link_imagem: ['image1.jpg', 'image2.jpg'],
        page: [{
          title: '',
          end_link_imagem: [''],
          description: '',
          type: [''],
          obs: [''],
          comment: [''],
          like: 0,
          status: true
        }],
      }}
    >
       
      <Form.Item name="company_name" label="Nome da Empresa" rules={[{ required: true, message: 'Insira o nome da empresa' }]}>
        <Input />
      </Form.Item>

      <Form.Item name="name" label="Nome do Site" rules={[{ required: true, message: 'Insira o nome do site' }]}>
        <Input />
      </Form.Item>

      <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Insira o email' }]}>
        <Input type="email" />
      </Form.Item>

      <Form.Item name="phone" label="Telefone" rules={[{ required: true, message: 'Insira o telefone' }]}>
        <Input />
      </Form.Item>

      <Form.List name="routes">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name]}
                     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
                  fieldKey={[fieldKey]}
                  rules={[{ required: true, message: 'Insira a rota' }]}
                >
                  <Input placeholder="Rota" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                Adicionar Rota
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.List name="link_imagem">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name]}   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
                  fieldKey={[fieldKey]}
                  rules={[{ required: true, message: 'Insira o link da imagem' }]}
                >
                  <Input placeholder="Link da Imagem" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                Adicionar Link de Imagem
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.List name="page">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <div key={key} style={{ marginBottom: 8, padding: 8, border: '1px solid #d9d9d9', borderRadius: 4 }}>
                <Form.Item
                  {...restField}
                  name={[name, 'title']}
                     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
                  fieldKey={[fieldKey, 'title']}
                  label="Título da Página"
                  rules={[{ required: true, message: 'Insira o título da página' }]}
                >
                  <Input />
                </Form.Item>

                <Form.List name={[name, 'end_link_imagem']}>
                  {(imageFields, { add: addImage, remove: removeImage }) => (
                    <>
                      {imageFields.map(({ key: imageKey, name: imageName, fieldKey: imageFieldKey, ...restImageField }) => (
                        <Space key={imageKey} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                          <Form.Item
                            {...restImageField}
                            name={[imageName]}
                               // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
                            fieldKey={[imageFieldKey]}
                            rules={[{ required: true, message: 'Insira o link da imagem' }]}
                          >
                            <Input placeholder="Link da Imagem" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => removeImage(imageName)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => addImage()} icon={<PlusOutlined />}>
                          Adicionar Link de Imagem
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>

                <Form.Item
                  {...restField}
                  name={[name, 'description']}
                     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
                  fieldKey={[fieldKey, 'description']}
                  label="Descrição da Página"
                  rules={[{ required: true, message: 'Insira a descrição da página' }]}
                >
                  <TextArea rows={4} />
                </Form.Item>

                <Form.List name={[name, 'type']}>
                  {(typeFields, { add: addType, remove: removeType }) => (
                    <>
                      {typeFields.map(({ key: typeKey, name: typeName, fieldKey: typeFieldKey, ...restTypeField }) => (
                        <Space key={typeKey} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                          <Form.Item
                            {...restTypeField}
                            name={[typeName]}
                               // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
                            fieldKey={[typeFieldKey]}
                            rules={[{ required: true, message: 'Insira o tipo' }]}
                          >
                            <Input placeholder="Tipo" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => removeType(typeName)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => addType()} icon={<PlusOutlined />}>
                          Adicionar Tipo
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>

                <Form.List name={[name, 'obs']}>
                  {(obsFields, { add: addObs, remove: removeObs }) => (
                    <>
                      {obsFields.map(({ key: obsKey, name: obsName, fieldKey: obsFieldKey, ...restObsField }) => (
                        <Space key={obsKey} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                          <Form.Item
                            {...restObsField}
                            name={[obsName]}
                               // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
                            fieldKey={[obsFieldKey]}
                            rules={[{ required: true, message: 'Insira a observação' }]}
                          >
                            <Input placeholder="Observação" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => removeObs(obsName)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => addObs()} icon={<PlusOutlined />}>
                          Adicionar Observação
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>

                <Form.List name={[name, 'comment']}>
                  {(commentFields, { add: addComment, remove: removeComment }) => (
                    <>
                      {commentFields.map(({ key: commentKey, name: commentName, fieldKey: commentFieldKey, ...restCommentField }) => (
                        <Space key={commentKey} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                          <Form.Item
                            {...restCommentField}
                            name={[commentName]}
                               // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
                            fieldKey={[commentFieldKey]}
                            rules={[{ required: true, message: 'Insira o comentário' }]}
                          >
                            <Input placeholder="Comentário" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => removeComment(commentName)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => addComment()} icon={<PlusOutlined />}>
                          Adicionar Comentário
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>

                <Form.Item
                  {...restField}
                  name={[name, 'like']}
                     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
                  fieldKey={[fieldKey, 'like']}
                  label="Likes"
                  rules={[{ required: true, message: 'Insira a quantidade de likes' }]}
                >
                  <InputNumber min={0} />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'status']}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
                  fieldKey={[fieldKey, 'status']}
                  valuePropName="checked"
                  label="Status"
                >
                  <Checkbox />
                </Form.Item>

                <Button type="dashed" onClick={() => remove(name)} icon={<MinusCircleOutlined />}>
                  Remover Página
                </Button>
              </div>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                Adicionar Página
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item name="footerDescriptin" label="Descrição do Rodapé" rules={[{ required: true, message: 'Insira a descrição do rodapé' }]}>
        <Input />
      </Form.Item>

      <Form.Item name="headerDescriptin" label="Descrição do Cabeçalho" rules={[{ required: true, message: 'Insira a descrição do cabeçalho' }]}>
        <Input />
      </Form.Item>

      <Form.Item>    
        <Button type="primary" htmlType="submit" //loading={isLoading}
        >
          {initialValues ? 'Atualizar Site' : 'Criar Site'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateSiteForm;
