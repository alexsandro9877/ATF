import { List, Avatar, Divider,  Space, Tag,  Input, Card, message,  Descriptions  } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { EditOutlined, DeleteOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import customerStore from '../../store/customer.store';
import { ICustomer } from '../../modules/custumer.entity';
import CustomerEdit from './customerEdit';
import DynamicButton from '../Dynamic/Button/DynamicButtonProps';
import DynamicModal from '../Dynamic/Modal/DynamicModalProps';
import { formatDate } from '../../utils/formatDate';

const { Search } = Input;

const CustomerList = () => {
  const { customer, fetchCustomer, deleteCustomer } = customerStore();
  const [displayedItems, setDisplayedItems] = useState<ICustomer[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editCustomerId, setEditCustomerId] = useState<string | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer, deleteCustomer]);

  useEffect(() => {
    setDisplayedItems(customer);
  }, [customer]);

  const debounceSearch = (value: string) => {
    setSearchTerm(value);
  };

  const filteredItems = customer.filter((item: ICustomer) =>
    `${item.name.toLowerCase()} ${item.email.toLowerCase()}`.includes(searchTerm.toLowerCase())
  );

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleDelete = async (id: string) => {
    setDeleteItemId(id);
    setModalVisible(true);
  };

  const handleEdit = (id: string) => {
    setEditCustomerId(id);
    setModalVisible(true);
  };

  const confirmDelete = async () => {
    if (deleteItemId) {
      message.success(`Item selecionado deletado com sucesso! ${deleteItemId}`);
      await deleteCustomer(deleteItemId);
      setModalVisible(false);
      setDeleteItemId(null);
    }
  };

  const cancelDelete = () => {
    message.info(`Item selecionado não foi deletado! ID ${deleteItemId}`);
    setModalVisible(false);
    setDeleteItemId(null);
  };

  const handleCardClick = (id: string) => {
    setSelectedCardId(id === selectedCardId ? null : id);
  };

  return (
    <InfiniteScroll
      dataLength={displayedItems.length}
      next={loadMoreData}
      hasMore={displayedItems.length < filteredItems.length}
      loader={<Space style={{ justifyContent: 'center', width: '100%', padding: '20px 0' }}><p>Loading...</p></Space>}
      endMessage={<Divider plain>Não há mais registros...</Divider>}
      scrollableTarget="scrollableDiv"
    >
      <Search
        placeholder="Buscar nome de cliente ou email"
        value={searchTerm}
        onChange={(e) => debounceSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
        dataSource={filteredItems.slice(0, displayedItems.length)}
        renderItem={(item: ICustomer) => (
          <List.Item>
            <Card
              hoverable
              style={{ width: '100%', border: selectedCardId === item.id ? '2px solid #1890ff' : 'none' }}
              onClick={() => handleCardClick(item.id)}
              actions={[
                        <DynamicButton    onClick={() => handleEdit(item.id)} title='Editar' icon={<EditOutlined />}  />,
                        <DynamicButton    onClick={() => handleDelete(item.id)} title='Excluir' danger={true} icon={<DeleteOutlined />}  /> ]}>
              <Card.Meta
                avatar={<Avatar src={item.imagem[0]} />}
                title={item.name}
                description={`Email: ${item.email}`}
              />
              <Divider />
              <Descriptions title="Cliente Info" size='small' column={1} extra={<Tag color={item.status ? 'green' : 'red'}>  {item.status ? 'Ativo' : 'Inativo'} </Tag>}>
              <Descriptions.Item label="Number">{item.id}</Descriptions.Item>
              <Descriptions.Item label="Acesso">{item.acesso.join(', ')}</Descriptions.Item>
              <Descriptions.Item label="Criado">{formatDate(item.created_at)}</Descriptions.Item>
              <Descriptions.Item label="Atualizado">{formatDate(item.updated_at)}</Descriptions.Item>
              <Descriptions.Item label="Email">{item.email}</Descriptions.Item>
              <Descriptions.Item label="Conect">{item.partner.join(', ')}</Descriptions.Item>
              </Descriptions>;
              
            </Card>
          </List.Item>
        )}
      />
    

      <DynamicModal 
      onClose={() => {
        setModalVisible(false);
        setEditCustomerId(null);
        setDeleteItemId(null);
      } }
      title={editCustomerId ? 'Editar Cliente' : 'Confirmar Exclusão'}
      content={editCustomerId ? (
        <CustomerEdit id={editCustomerId} onClose={() => setModalVisible(false)} />
      ) : (
        <div>
          <p>Tem certeza que deseja excluir este cliente?</p>
          <DynamicButton    onClick={confirmDelete} title='Excluir registro' icon={<LikeOutlined />}  />
          <DynamicButton    onClick={cancelDelete} title='Não excluir' danger={true} icon={<DislikeOutlined  />}  />
        </div>
      )} visible={modalVisible}    />
    </InfiniteScroll>
  );
};

export default CustomerList;
