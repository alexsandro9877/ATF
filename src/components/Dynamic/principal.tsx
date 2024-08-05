import { Button, Dropdown, Layout, Menu, Space } from 'antd'
import { Content } from 'antd/es/layout/layout'
import DynamicCard from '../Dynamic/Card/DynamicCardProps '
import { DownloadOutlined, EllipsisOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons'
import DynamicButton from '../Dynamic/Button/DynamicButtonProps'
import DynamicModal from '../Dynamic/Modal/DynamicModalProps'
//import UserCreate from '../User/userCreate'
import { useEffect, useState } from 'react'
import Teste from './teste'

const Principal = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [modalTitle, setModalTitle] = useState('');
  const [isDownloadDisabled, setIsDownloadDisabled] = useState(false);

  useEffect(() => {
          setIsDownloadDisabled(true);
  }, []);

  const showModal = (title: string, content: React.ReactNode) => {
      setModalTitle(title);
      setModalContent(content);
      setIsModalVisible(true);
  };

  const closeModal = () => setIsModalVisible(false);

  // Menu que aparece quando a tela fica pequena
  const menuItems = [
      {
          key: "1",
          label: (
              <span onClick={() => showModal('Adicionar Usuário', <></>)}>
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


  return (
    <Layout style={{ padding: '2px', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Content>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <DynamicCard
                        title={<span><UserOutlined /> Test</span>}
                        content={<Teste/>}
                        //actionsButton={actionsButton}
                        extra={
                            <Space.Compact size="large">
                            {/* Chamar meu botao dinamico */}
                              <DynamicButton 
                                  icon ={ <PlusOutlined />}
                                   onClick={() => showModal('Adicionar Usuário', <div>Teste</div>)} 
                                   title='Adicionar Usuário'
                                   disabled = {false}
                                   key={1}
                                   />
                                     <DynamicButton 
                                  icon ={ <DownloadOutlined />}
                                   onClick={() => console.log('Baixar Excel Usuário', <div>Formulário</div>)} 
                                   title='Baixar Excel Usuário'
                                   disabled = {isDownloadDisabled}
                                   key={1}
                                   />
                           {/* Chamar meu menu retratio */}
                           <Dropdown overlay={menu} trigger={['click']} className="dropdown-menu">
                                <Button icon={<EllipsisOutlined />} />
                            </Dropdown>
                          </Space.Compact>
                        }
                        style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                    />
                  
                </Space>
                {/* Chamar meu modal dinamico */}
                <DynamicModal
                    visible={isModalVisible}
                    onClose={closeModal}
                    title={modalTitle}
                    content={modalContent}
                />
            </Content>
        </Layout>
  )
}

export default Principal
