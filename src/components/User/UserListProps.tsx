
import { List, Avatar, Skeleton, Divider, Button, Space, Tag, Modal, Input } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import userStore from '../../store/user.store';
import {IUser} from '../../modules/user.entity'
import { useEffect, useState } from 'react';
import AuthUserStore from '../../store/auth.store';



const UserList = () => {
  const { user,fetchUser,deleteUser } = userStore();
  const [displayedItems, setDisplayedItems] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null); 
  const [modalVisible, setModalVisible] = useState(false); 
  const { userAut } = AuthUserStore();

  useEffect(() => {
    fetchUser(userAut[0].accountId);
}, [fetchUser, deleteItemId]);

useEffect(() => {
  setDisplayedItems(user);
}, [user]);

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
 

  const confirmDelete = async () => {
    if (deleteItemId) {
      await      deleteUser(deleteItemId);
      setModalVisible(false); 
      setDeleteItemId(null); 
    }
  };

  const cancelDelete = () => {
    setModalVisible(false); 
    setDeleteItemId(null); 
  };

  const filteredItems = Array.isArray(user)  
  ? user.filter((item: IUser) =>`${item.name.toLowerCase()} ${item.email.toLowerCase()}`.includes(searchTerm.toLowerCase()))
  :[];
   
  return (
    
    <InfiniteScroll
      dataLength={displayedItems.length}
      next={loadMoreData}
      hasMore={displayedItems.length < filteredItems.length}
      loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
      endMessage={<Divider plain>Não há mais registros...</Divider>}
      scrollableTarget="scrollableDiv"
    >
      <Input 
          placeholder="Busca nome de usuario, email." 
          value={searchTerm}
          onChange={handleSearch}
          style={{ marginBottom: 16 }}
        />
      <List
        dataSource={filteredItems.slice(0, displayedItems.length)}
        renderItem={(user) => (
          <List.Item
            key={user.id}
            style={{ marginBottom: 16 }}
           
            extra={ <Space size="middle">
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
                  onClick={() => handleEdit(String(user.id))}
                />
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(String(user.id))}
                />
                
              </Space>}
            actions={[
              <Space size="small">
                 {user.authMethods? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>}
              </Space>
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={user.picture}/>}
            
              title={user.name}
              description={`Email: ${user.email} | Role : ${user.roles.join(",")}`}
            />
           
           
          </List.Item>
        )}
      />
       <Modal
          title="Confirmar Exclusão"
          visible={modalVisible}
          onOk={confirmDelete}
          onCancel={cancelDelete}
          okText="Confirmar"
          cancelText="Cancelar"
        >
          <p>Tem certeza que deseja excluir este ?</p>
        </Modal>
    </InfiniteScroll>

    
  );
};

export default UserList;
