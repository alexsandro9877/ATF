import { useState } from 'react';
import {   Image,  Space, Table, Tag } from 'antd';
import type { TableColumnsType } from 'antd';
import { useGetAccounts } from '../../hooks/api';

import Search from 'antd/es/input/Search';
import { EditOutlined,DeleteFilled,ContactsOutlined } from '@ant-design/icons'
import DynamicButton from '../Dynamic/Button/DynamicButtonProps';
import DynamicCard from '../Dynamic/Card/DynamicCardProps ';


interface ICustomerAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  acesso: string[];
  token: string;
  imagem: string[];
  partner: string[];
  status: boolean;
  created_at: string;
  updated_at: string;
}

interface IAccount {
  id: string;
  name: string;
  aplication: string;
  routes: string[];
  created_at: string;
  updated_at: string;
  customerId: string;
  customer: ICustomerAccount;
}

const Teste = () => { 
  const { data: accountsData, isLoading: isGetAccountsLoading} = useGetAccounts();
  const [searchTerm, setSearchTerm] = useState<string>('');

  function handleEdit(id : string) {
   console.log(id)
  }

  const debounceSearch = (value: string) => {
    setSearchTerm(value);
  };
  


  const filteredItems = Array.isArray(accountsData)  
  ? accountsData.filter((item: IAccount) =>`${item.name.toLowerCase()} ${item.customer.name.toLowerCase()}`.includes(searchTerm.toLowerCase()))
  :[];

  const columns: TableColumnsType<IAccount> = [
    { title: 'Conta ID', dataIndex: 'id', key: 'id', sorter: true },
    { title: 'Name', dataIndex: 'name', key: 'name', width: 100 },
    { title: 'Aplication', dataIndex: 'aplication', key: 'aplication', width: 100 },
    { title: 'Routes', dataIndex: 'routes', key: 'routes', render: routes => routes.join(', ') },
    { title: 'Customer ID', key: 'customer.id', render: ( record) => record.customer.id },
    { title: 'Customer Name', key: 'customerName', render: ( record) => record.customer.name },
    { title: 'Customer Email', key: 'customerEmail', render: ( record) => record.customer.email },
    { title: 'Customer acesso', key: 'customerAcesso', render: ( record) => record.customer.acesso.join(", ") },
    { title: 'Customer partner', key: 'customerPartner', render: ( record) => record.customer.partner.join(", ")  },
    { title: 'Customer status', key: 'customerStatus', render: ( record) => record.customer.status ? <Tag color='green'>Ativo</Tag> : <Tag color='red'>Inativo</Tag> },
    { title: 'Customer imagem', key: 'customerImagem', render: ( record) => <Image width={80} src={record.customer.imagem[0]} /> },
    { title: 'Action', fixed: 'right', key: 'operation', width: 100, render: ( record) => 
   <Space> 
   <Space.Compact block direction="horizontal"> 
    <DynamicButton  onClick={()=>handleEdit(record.id)} title='Editar' key={'1'}  icon={<EditOutlined />}/> 
    <DynamicButton  danger={true} onClick={()=>handleEdit(record.id)} title='Deletar' key={'1'}  icon={<DeleteFilled />}/> 
    </Space.Compact>
    </Space> },
  ];

  

  return (
    <>
    <DynamicCard 
     title={<div><ContactsOutlined />  Conta</div> }
     extra={<div>sad</div>}
     content={
          <>
              <Search
                placeholder="Buscar nome de conta ou nome cliente"
                value={searchTerm}
                onChange={(e) => debounceSearch(e.target.value)}
                style={{ marginBottom: 16 }}
              />

              <Table 
                columns={columns} 
                dataSource={filteredItems} 
                loading={isGetAccountsLoading} 
                scroll={{ x: 1200 }} 
                
              />
          </>
    }/>
    
    </>
  );
};

export default Teste;


