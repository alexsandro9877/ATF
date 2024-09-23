import React from 'react';
import { Descriptions, Tag } from 'antd';
import AuthUserStore from '../../store/auth.store';

import DynamicCard from '../Dynamic/Card/DynamicCardProps';

const SettingsPage: React.FC = () => {
  const { userAut } = AuthUserStore();

  // Garantir que userAut não é vazio
  if (userAut.length === 0) {
    return <div>Loading...</div>; // Você pode mostrar uma mensagem de carregamento ou um componente de loading
  }

  const user = userAut[0]; // Assumindo que userAut é um array e estamos pegando o primeiro usuário

  return (
    <div>
      <DynamicCard
        title={"Configurações"}
        content={
          <Descriptions bordered layout='vertical' size='small'column={2}>
            <Descriptions.Item label="Profile Picture" >
              <img src={user.picture} alt="Profile" style={{ width: 100, height: 100, borderRadius: '10%' }} />
            </Descriptions.Item>
       
            <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={user.status ? "green" : "red"}>{user.status ? "Active" : "Inactive"}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Created At">{new Date(user.createdAt).toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="Updated At">{new Date(user.updatedAt).toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="Client ID">{user.accountId}</Descriptions.Item>
            <Descriptions.Item label="Roles">
              {user.roles.map(role => <Tag color="blue" key={role}>{role}</Tag>)}
            </Descriptions.Item>
            <Descriptions.Item label="Permissions">
              {user.permissions.map(permission => <Tag color="purple" key={permission}>{permission}</Tag>)}
            </Descriptions.Item>
            
            <Descriptions.Item label="Acesso">
            {<Tag color="red" key={user.azp}>{user.azp}</Tag>}
            </Descriptions.Item>
            <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
            <Descriptions.Item label="Visible Routes">
              {user.visibleRoutes.map(route => <Tag color="orange" key={route}>{route}</Tag>)}
            </Descriptions.Item>
          </Descriptions>
          
        }
      />
    </div>
  );
};

export default SettingsPage;
