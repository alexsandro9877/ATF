
import { List, Avatar,  Divider,  Space, Tag,  Input, message } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { EditOutlined, DeleteOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import { IAccount } from '../../modules/account.entity';
import accountStore from '../../store/account.store';
import AccountEdit from './accountEdit';
import DynamicButton from '../Dynamic/Button/DynamicButtonProps';
import DynamicModal from '../Dynamic/Modal/DynamicModalProps';

const { Search } = Input;

const AccountList = () => {
  const { account,fetchAccount,deleteAccount} = accountStore();
  const [displayedItems, setDisplayedItems] = useState<IAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null); 
  const [modalVisible, setModalVisible] = useState(false); 
  const [editModalId, setEditModalId] = useState<string | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  useEffect(() => {
    fetchAccount();
}, [fetchAccount]);

useEffect(() => {
  setDisplayedItems(account);
}, [account]);

const loadMoreData = () => {
  if (loading) {
    return;
  }
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
  }, 500);
};
 

  const  handleDelete = async (id: string) => {
    setDeleteItemId(id); 
    setModalVisible(true); // Exibe o modal de confirmação
  };
  const debounceSearch = (value: string) => {
    setSearchTerm(value);
  };

  const confirmDelete = async () => {
    setConfirmLoading(true)
    if (deleteItemId) {
      message.success(`Item selecionado deletado com sucesso! ${deleteItemId}`);
      await     deleteAccount(deleteItemId);
      setModalVisible(false); 
      setDeleteItemId(null); 
      setConfirmLoading(false)
    }
  };

  const cancelDelete = () => {
    message.info(`Item selecionado não foi deletado! ID ${deleteItemId}`);
    setModalVisible(false); 
    setDeleteItemId(null); 
  };


  const filteredItems = Array.isArray(account)  
 ? account.filter((item: IAccount) =>`${item.name.toLowerCase()} ${item.customer.name.toLowerCase()}`.includes(searchTerm.toLowerCase()))
 :[];
  

const handleEdit = (id: string) => {
  setEditModalId(id);
  setModalVisible(true);
};

const handleCardClick = (id: string) => {
  setSelectedCardId(id === selectedCardId ? null : id);
};
return (
  <InfiniteScroll
    dataLength={displayedItems.length}
    next={loadMoreData}
    hasMore={displayedItems.length < filteredItems.length}
    loader={
      <Space style={{ justifyContent: 'center', width: '100%', padding: '20px 0' }}>
        <p>Loading...</p>
      </Space>
    }
    endMessage={<Divider plain>Não há mais registros...</Divider>}
    scrollableTarget="scrollableDiv"
  >
      <Search
        placeholder="Buscar nome de conta ou nome cliente"
        value={searchTerm}
        onChange={(e) => debounceSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />
    <List
      dataSource={filteredItems.slice(0, displayedItems.length)}
      renderItem={(item: IAccount) => (
        <List.Item
         onClick={() => handleCardClick(item.id)}
          key={item.id}
          style={{ marginBottom: 16 }}
          actions={[
            <Space size="small" >
              <DynamicButton    onClick={() => handleEdit(item.id)} title='Editar' icon={<EditOutlined />}  />
              <DynamicButton    onClick={() => handleDelete(item.id)} title='Excluir' danger={true} icon={<DeleteOutlined />}  />
            </Space>
          ]}
        >
          <List.Item.Meta 
            avatar={<Avatar src={item.customer.imagem[0]} />}
            title={item.name}
            description={`Aplicação: ${item.aplication} | Acesso: ${item.routes.join(", ")} | Cliente: ${item.customer.name}`}
          />
          <div>
            <Tag  color={item.aplication ? 'green' : 'red'}>
              {item.aplication ? 'Active' : 'Inactive'}
            </Tag>
          </div>
        </List.Item>
      )}
    />
    <DynamicModal 
    confirmLoading={confirmLoading}
      onClose={() => {
        setModalVisible(false);
        setEditModalId(null);
        setDeleteItemId(null);
      } }
      title={editModalId ? "Editar " : "Confirmar "}
      content={editModalId ? (
        <AccountEdit id={editModalId} onClose={() => setModalVisible(false)} />
      ) : (
        <div>
          <p>Tem certeza que deseja excluir ?</p>
          <DynamicButton    onClick={confirmDelete} title='Excluir registro' icon={<LikeOutlined />}  />
          <DynamicButton    onClick={cancelDelete} title='Não excluir' danger={true} icon={<DislikeOutlined  />}  />
    
        </div>
      )} visible={modalVisible}    />

  </InfiniteScroll>
);
};

export default AccountList;





