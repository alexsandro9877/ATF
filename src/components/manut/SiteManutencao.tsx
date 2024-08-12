import { useState } from "react";
import { Image, Popconfirm, Space, Table, message } from "antd";
 import { useQueryClient } from '@tanstack/react-query';
import type { TableColumnsType } from "antd";
import { useDeleteSite, useGetSites } from "../../hooks/api";
import Search from "antd/es/input/Search";
import {
  ContactsOutlined,
  DeleteOutlined,
  FileAddOutlined,
  FolderViewOutlined,
} from "@ant-design/icons";
import DynamicButton from "../Dynamic/Button/DynamicButtonProps";

import { CreateSitesProps } from "../../types";
import DynamicModal from "../Dynamic/Modal/DynamicModalProps";
import DynamicCard from "../Dynamic/Card/DynamicCardProps ";
import CreateSiteForm from "./CreateSiteForm";

const CreateSites = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleCreate, setIsModalVisibleCreate] = useState(false);
  const { data: accountsData, isLoading: isGetAccountsLoading } = useGetSites();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const queryClient = useQueryClient();

  // const { mutate: handleSave } = usePostSites({
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('sites');
  //     message.success('Site deleted successfully');
  //   },
  //   onError: () => {
  //     message.error('Failed to delete site');
  //   }
  // });

  const { mutate: deleteSite } = useDeleteSite({
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      queryClient.invalidateQueries('sites');
      message.success('Site deletado com sucesso');
    },
    onError:(error) => {
      
      message.error('Falha ao deletar site' + error);
    }
  });

  const handleEdit = (id: string) => {
    setIsModalVisible(true);
    console.log(id);
  };
  const handleCreate = () => {
    setIsModalVisibleCreate(true);

  };

  const handleDelete = (id: string) => {
    deleteSite(id); // Passando o id do site para deletar
  };

  const handleCancel = () => (setIsModalVisible(false) );
  const handleCancelCreate = () => setIsModalVisibleCreate(false);
  const debounceSearch = (value: string) => {
    setSearchTerm(value);
  };

  const IconText = ({
    icon,
    text,
  }: {
    icon: React.ReactNode;
    text?: number;
  }) => (
    <Space>
      {icon}
      {text}
    </Space>
  );

  const filteredItems = Array.isArray(accountsData)
    ? accountsData.filter((item: CreateSitesProps) =>
        `${item.name.toLowerCase()} ${item.name.toLowerCase()}`.includes(
          searchTerm.toLowerCase()
        )
      )
    : [];

  const columns: TableColumnsType<CreateSitesProps> = [
    {
      title: "Empresa",
      dataIndex: "company_name",
      key: "company_name",
      width: 100,
    },
    { title: "Email", dataIndex: "email", key: "email", width: 100 },
    { title: "Tel", dataIndex: "phone", key: "phone", width: 100 },
    {
      title: "Routes",
      dataIndex: "routes",
      key: "routes",
      render: (routes) => routes.join(", "),
    },
    {
      title: "Descrição do rodapé",
      key: "footerDescriptin",
      render: (record) => record.footerDescriptin,
    },
    {
      title: "Descrição do cabeçalho",
      key: "headerDescriptin",
      render: (record) => record.footerDescriptin,
    },
    {
      title: "Imagem",
      key: "link_imagem",
      render: (record) => <Image width={80} src={record.link_imagem[0]} />,
    },
    {
      title: "Action",
      fixed: "right",
      key: "operation",
      width: 100,
      render: (record) => (
        <Space>
          <DynamicModal
            title="Editar"
            onClose={handleCancel}
            onOk={() => {}}
            visible={isModalVisible}
            content={<CreateSiteForm initialValues={record}/>}
          />
          <IconText
            icon={
              <Popconfirm
                title={"Deseja deletar o " + record.id + " selecionado."}
                description="Deseja deletar?"
                onConfirm={() => handleDelete(record.id)}
                okText="Sim"
                cancelText="Não"
              >
                <DynamicButton
                  icon={<DeleteOutlined />}
                  title="Deletar"
                  danger
                  // loading={isDeleting}
                />
              </Popconfirm>
            }
          />

          <IconText
            icon={
              <DynamicButton
                onClick={() => handleEdit(record.id)}
                title="Visualizar"
                icon={<FolderViewOutlined />}
              />
            }
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <DynamicCard
        title={
          <div>
            <ContactsOutlined /> Conta
          </div>
        }
        extra={
        <DynamicButton
          onClick={() => handleCreate()}
          title="Adicionar"
          icon={<FileAddOutlined />}
        />}
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
        }
      />
        <DynamicModal
          icon={<FileAddOutlined/>}
            title="Adicionar"
            onClose={handleCancelCreate}
            onOk={() => {}}
            visible={isModalVisibleCreate}
            content={<CreateSiteForm/>}
          />
     
    </>
  );
};

export default CreateSites;
