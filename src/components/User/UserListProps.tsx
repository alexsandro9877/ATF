import { List, Avatar, Skeleton, Divider, Space, Tag, Input, message } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import DynamicButton from "../Dynamic/Button/DynamicButtonProps";
import DynamicModal from "../Dynamic/Modal/DynamicModalProps";
import UserCreateEdit from "./UserForm";
import { useDeleteUser, useGetUserAll } from "../../hooks/api";
import AuthUserStore from "../../store/auth.store";
import { useQueryClient } from "@tanstack/react-query";
import { IUserResp } from "../../types/typeUserResp";

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [modalTitle, setModalTitle] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [displayedItems, setDisplayedItems] = useState<IUserResp[]>([]);
  const { userAut } = AuthUserStore();

  const { data: userData, isLoading: isGetUserLoading } = useGetUserAll(userAut[0].accountId);
  
  const queryClient = useQueryClient();
  
  const { mutate: deleteUser} = useDeleteUser({
    
    onSuccess: (data: any) => {
      const successMessage = data.message ;
      message.success(successMessage);
         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
      queryClient.invalidateQueries('user');

    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message;
      message.error(errorMessage);
    }
  });

  useEffect(() => {
    if (userData) {
      setDisplayedItems(userData);
    }
  }, [userData]);

  const showModal = (
    title: string,
    content?: React.ReactNode,
    on?: () => void
  ) => {
    on;
    setModalTitle(title);
    setModalContent(content);
    setIsModalVisible(true);
  };

  const closeModal = () => setIsModalVisible(false);

  const loadMoreData = () => {
    if (isGetUserLoading || displayedItems.length >= filteredItems.length) {
      return;
    }

    setTimeout(() => {
      setDisplayedItems((prevItems) => [
        ...prevItems,
        ...filteredItems.slice(prevItems.length, prevItems.length + 10),
      ]);
    }, 500);
  };

  const handleDelete = async (Id: string) => {
    if (Id) {
        await deleteUser(Id);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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

  const filteredItems = Array.isArray(userData)
    ? userData.filter((item) =>
        `${item.name.toLowerCase()} ${item.email.toLowerCase()}`.includes(
          searchTerm.toLowerCase()
        )
      )
    : [];

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
        dataSource={displayedItems}
        renderItem={(user) => (
          <List.Item
            key={user.id}
            style={{ marginBottom: 16 }}
            extra={
              user.status ? (
                <Tag color="green">Active</Tag>
              ) : (
                <Tag color="red">Inactive</Tag>
              )
            }
            actions={[
              <IconText
                icon={
                  <>
                    <DynamicButton
                      title="Editar"
                      icon={<EditOutlined />}
                      onClick={() =>
                        showModal(
                          "Editar Usuário",
                          <UserCreateEdit
                            initialValues={user}
                            onClose={closeModal}
                          />
                        )
                      }
                    />
                    |
                    {userAut[0].id === user.id ? '':
                    <DynamicButton
                      title="Deletar"
                      disabled ={userAut[0].azp === 'EDT'? false : true}
                      danger
                      icon={<DeleteOutlined />}
                      onClick={()=>handleDelete(String(user.id))}
                    />
                    
                    }
                  </>
                }
              />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={user.picture} />}
              title={user.name}
              description={`Email: ${user.email} | Role : ${user.roles.join(", ")} | azp :  ${user.azp}`}
            />
          </List.Item>
        )}
      />
      <DynamicModal
        visible={isModalVisible}
        onCancel={closeModal}
        onClose={closeModal}
        title={modalTitle}
        content={modalContent}
      />
    </InfiniteScroll>
  );
};

export default UserList;
