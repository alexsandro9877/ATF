import React, { useState, useEffect } from 'react';
import { Layout, Space, Button, Dropdown, Menu } from 'antd';
import { PlusOutlined, DownloadOutlined, UserOutlined, EllipsisOutlined } from '@ant-design/icons';
import DynamicModal from '../Dynamic/Modal/DynamicModalProps';
import DynamicButton from '../Dynamic/Button/DynamicButtonProps';
import DynamicCard from '../Dynamic/Card/DynamicCardProps ';
import UserList from './UserListProps';
import UserCreateEdit from './UserForm';
import AuthUserStore from '../../store/auth.store';

const { Content } = Layout;

const UserPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);
    const [modalTitle, setModalTitle] = useState('');
    const [isDownloadDisabled, setIsDownloadDisabled] = useState(false);
    const { userAut } = AuthUserStore();

    useEffect(() => {
            setIsDownloadDisabled(true);
    }, []);

    const showModal = (title: string, content: React.ReactNode) => {
        setModalTitle(title);
        setModalContent(content);
        setIsModalVisible(true);
    };
   const closeModal = () => setIsModalVisible(false);

    const IconText = ({
        icon,
        text,
      }: {
        icon: React.ReactNode;
        text?: number;
      }) => (
        <Space>
          {icon} {text}
        </Space>
      );
 
    // Menu que aparece quando a tela fica pequena
    const menuItems = [
        {
            key: "1",
            label: (
                <span onClick={() => showModal('Adicionar Usuário', <UserCreateEdit onClose={()=> setIsModalVisible(false)}/>)}>
                    <PlusOutlined /> Adicionar
                </span>
            ),
        },
        {
            key: "2",
            label: (
                <span onClick={() => console.log('Baixar Excel de Produtos')}>
                    <DownloadOutlined /> Baixar Excel
                </span>
            ),
            disabled: isDownloadDisabled, // Desabilita o item de menu com base no estado
        },
    ];

    const menu = <Menu items={menuItems} />;
//   const actionsButton = [
//         {
//             title: 'Adicionar Usuário',
//             icon: <PlusOutlined />,
//             onClick: () => showModal('Adicionar Usuário', <div>Formulário</div>),
//         },
//         {
//             title: 'Baixar Excel',
//             icon: <DownloadOutlined />,
//             onClick: () => console.log('Baixar Excel de Produtos'),
//             disabled: isDownloadDisabled,
//         },
//     ];

    return (
        <Layout style={{ padding: '2px', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Content>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <DynamicCard
                        title={<span><UserOutlined /> Usuário</span>}
                        content={<UserList />}
                        //actionsButton={actionsButton}
                        extra={
                            <>
                           <IconText icon={
                            <DynamicButton 
                                   icon ={ <PlusOutlined />}
                                   
                                   onClick={() => showModal('Adicionar Usuário', <UserCreateEdit  onClose={()=>closeModal()}/>)} 
                                   title='Adicionar Usuário'
                                   disabled ={userAut[0].azp === 'EDT'? false : true}
                                   key={1}
                                   />
                           } />
                           <IconText icon={
                             <DynamicButton 
                                    icon ={ <DownloadOutlined />}
                                    onClick={() => console.log('Baixar Excel Usuário', <div>Formulário</div>)} 
                                    title='Baixar Excel Usuário'
                                    disabled = {isDownloadDisabled}
                                    key={1}
                              />
                           } />
                           
                           {/* Chamar meu menu retratio */}
                            <Dropdown overlay={menu} trigger={['click']} className="dropdown-menu">
                                <Button icon={<EllipsisOutlined />} />
                            </Dropdown>
                            </>
                        }
                        style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                    />
                  
                </Space>
              
                <DynamicModal
                    visible={isModalVisible}
                    onCancel={closeModal}
                    onClose={closeModal}
                    title={modalTitle}
                    content={modalContent}
                />
            </Content>
        </Layout>
    );
};

export default UserPage;
