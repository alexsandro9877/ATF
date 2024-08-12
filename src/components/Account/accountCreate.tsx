import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Transfer, message, Space, Select, Tag } from 'antd';
import { CreateAccounts, IAccount } from '../../modules/account.entity';
import accountStore from '../../store/account.store';
import customerStore from '../../store/customer.store';

interface RouteItem {
  key: string;
  title: string;
  description: string;
}

interface IAddProps {
  id?: string;
  onClose: () => void;
}

const { Option } = Select;

const AccountCreate: React.FC<IAddProps> = ({ id, onClose }) => {
  const [form] = Form.useForm();
  
  const [routes, setRoutes] = useState<RouteItem[]>([]);
  const [selectedRoutes, setSelectedRoutes] = useState<RouteItem[]>([]);
  const [customers, setCustomers] = useState<{ id: string; name: string; }[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [routesApi, setRoutesApi] = useState<RouteItem[]>([]);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  const { addAccount, fetchAccount } = accountStore();
  const { customer, fetchCustomer } = customerStore();
console.log(routes)
  useEffect(() => {
    fetchCustomer();
    setRoutes(routesApi);
    setSelectedRoutes([]);
  }, [fetchCustomer]);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const customerData = customer
          .filter((e) => e.id === id)
          .map((e) => ({
            id: e.id,
            name: e.name,
            acesso: e.acesso,
          }));

        if (customerData.length > 0) {
          const { name, id, acesso } = customerData[0];
          setCustomers([{ id, name }]);
          
          const acessosCustomer: RouteItem[] = Object.keys(acesso).map((chave, index) => ({
            key: String(index),
               // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
            title: acesso[chave],
               // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
            description: acesso[chave],
          }));
          setRoutesApi(acessosCustomer);
        }
      } catch (error) {
        console.error('Erro ao buscar cliente:', error);
      }
    };

    fetchCustomerData();
  }, [customer, id]);

  const handleFinish = async (values: IAccount) => {
    const { aplication, name } = values;
    const formData: CreateAccounts = {
      aplication,
      customerId: selectedCustomer,
      name,
      routes: selectedRoutes.map((route) => route.title),
    };
    try {
      await addAccount(formData);
      form.resetFields();
      setRoutes(routesApi);
      setSelectedRoutes([]);
      fetchAccount();
      onClose();
      message.success('Dados do cliente atualizados com sucesso!');
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
      <Tag color={id ? 'green' : 'red'}>
        {id ? 'Modo usuário' : 'Inativo'}
      </Tag>
      <Form.Item name="name" label="Nome" rules={[{ required: true, message: 'Por favor, insira o nome' }]}>
        <Input placeholder="Nome da conta" />
      </Form.Item>
      <Form.Item name="aplication" label="Aplicação" rules={[{ required: true, message: 'Por favor, insira a aplicação' }]}>
        <Input placeholder="Nome da aplicação" />
      </Form.Item>
      <Form.Item label="Cliente" name="customerId">
        <Space style={{ width: '100%' }}>
          <Select
            showSearch
            style={{ width: 300 }}
            onChange={setSelectedCustomer}
            placeholder="Selecione o cliente"
          >
            {customers.map((c) => (
              <Option key={c.id} value={c.id}>
                {c.name}
              </Option>
            ))}
          </Select>
        </Space>
      </Form.Item>
      <Form.Item name="routes" label="Rotas" rules={[{  message: 'Por favor, selecione as rotas' }]}>
        <Transfer
          dataSource={routesApi}
          targetKeys={targetKeys}
             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
          onChange={handleChange}
          render={item => item.title}
          listStyle={{ width: '45%', height: 300 }}
          titles={['Disponível', 'Selecionado']}
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

export default AccountCreate;
