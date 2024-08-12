import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Transfer } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { CreateAccounts, IAccount } from '../../modules/account.entity';
import accountStore from '../../store/account.store';

interface RouteItem {
  key: string;
  title: string;
  description: string;
}

interface IEditProps {
  id: string;
  onClose: () => void;
}

const useAccountData = (id: string, form: FormInstance) => {
  const { account, fetchAccount } = accountStore();
  const [routesApi, setRoutesApi] = useState<RouteItem[]>([]);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = account.find((c) => c.id === id);
        if (data) {
          const { aplication, customerId, name, routes, customer } = data;
          form.setFieldsValue({
            aplication,
            customerId,
            name
          });

          const acessosCustomer: RouteItem[] = Object.keys(customer.acesso).map((chave, index) => ({
            key: String(index),
               // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
            title: customer.acesso[chave],
               // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
            description: customer.acesso[chave],
          }));

          setRoutesApi(acessosCustomer);

          const selectedKeys = acessosCustomer.filter(e => routes.includes(e.title)).map(e => e.key);
          setTargetKeys(selectedKeys);
        }
      } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        message.error('Erro ao buscar dados do cliente. Por favor, tente novamente.');
      }
    };

    fetchCustomer();
  }, [form, account, id]);

  return { routesApi, targetKeys, setTargetKeys, fetchAccount };
};

const AccountEdit: React.FC<IEditProps> = ({ id, onClose }) => {
  const [form] = Form.useForm();
  const { editeAccount } = accountStore();
  const { routesApi, targetKeys, setTargetKeys, fetchAccount } = useAccountData(id, form);

  const handleFinish = async (values: IAccount) => {
    const formData: CreateAccounts = {
      id: id,
      aplication: values.aplication,
      customerId: values.customerId,
      name: values.name,
      routes: targetKeys.map((key) => routesApi.find((route) => route.key === key)?.title || ''),
    };

    try {
      await editeAccount(formData);
      message.success('Dados do cliente atualizados com sucesso!');
      form.resetFields();
      fetchAccount();
      setTargetKeys([]);
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      message.error('Erro ao atualizar dados do cliente. Por favor, tente novamente.');
    }
  };

  const handleChange = (newTargetKeys: string[]) => {
    setTargetKeys(newTargetKeys);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item name="name" label="Nome" rules={[{ required: true, message: 'Por favor, insira o nome' }]}>
        <Input placeholder="Nome da conta" />
      </Form.Item>
      <Form.Item name="aplication" label="Aplicação" rules={[{ required: true, message: 'Por favor, insira a Aplicação' }]}>
        <Input placeholder="Nome da Aplicação" />
      </Form.Item>
      <Form.Item name="customerId" label="Cliente" rules={[{ required: true, message: 'Por favor, insira o Cliente' }]}>
        <Input disabled />
      </Form.Item>
      <Form.Item name="routes" label="Rotas">
        <Transfer
          dataSource={routesApi}
          targetKeys={targetKeys}
             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
          onChange={handleChange}
          render={item => item.title}
          listStyle={{ width: '45%', height: 300 }}
          titles={['Disponíveis', 'Selecionadas']}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Salvar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AccountEdit;
