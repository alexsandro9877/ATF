import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  List,
  Row,
  Space,
  Statistic,
  //Switch,
  Table,
  TableProps,
  Tag,
} from "antd";
import accountStore from "../../store/accountATFG.store";
import { IAccount } from "../../modules/accountsATFG.entity";
import DynamicModal from "./modal";
import React, { useEffect, useState } from "react";
import Formulario from "../ATF-G/formAddAccount-ATFG";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  ClearOutlined,
  DeleteOutlined,
  //FileExcelOutlined,
  FormOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Search from "antd/es/transfer/search";
import dayjs from "dayjs";
import * as XLSX from "xlsx"; // Biblioteca para exportação de Excel
import AccountCollapse from "./AccountCollapse-ATFG";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];
type OnChange = NonNullable<TableProps<IAccount>["onChange"]>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

export const agruparPorTypeEDescricaoESomarValor = (arr: IAccount[]) => {
  const agrupado = arr.reduce((acc, obj) => {
    const type = obj.type || "Sem tipo"; // Usa 'Sem tipo' para entradas sem tipo definido
    const descricao = obj.descricao || "Sem descrição"; // Usa 'Sem descrição' para entradas sem descrição definida

    // Inicializa o grupo para 'type' se não existir
    if (!acc[type]) {
      acc[type] = {};
    }

    // Inicializa o grupo para 'descricao' dentro do grupo 'type' se não existir
    if (!acc[type][descricao]) {
      acc[type][descricao] = {
        type: type,
        descricao: descricao,
        valor: 0,
      };
    }

    // Soma os valores de 'valor'
    acc[type][descricao].valor += obj.valor || 0;

    return acc;
  }, {} as { [key: string]: { [key: string]: { type: string; descricao: string; valor: number } } });

  // Converte o objeto resultante de volta para um array
  
  //@ts-ignore
  return Object.entries(agrupado).flatMap(([type, descricaoGroup]) =>
    Object.values(descricaoGroup).map((item) => ({
      type: item.type,
      descricao: item.descricao,
      valor: item.valor,
    }))
  );
};

export const agruparPorClasseEDataMes = (arr: IAccount[]) => {
  const agrupado = arr.reduce((acc, obj) => {
    const key = `${obj.classe}-${obj.data_mes}`;

    // Se a chave não existe no acumulador, inicializa um novo grupo
    if (!acc[key]) {
      acc[key] = {
        classe: obj.classe || "",
        data_mes: obj.data_mes,
        parc_pag: 0,
        valor: 0,
      };
    }

    // Soma os valores de parc_pag e valor
    acc[key].parc_pag += obj.parc_pag || 0;
    acc[key].valor += obj.valor || 0;

    return acc;
  }, {} as { [key: string]: { classe: string; data_mes: string; parc_pag: number; valor: number } });

  // Converte o objeto resultante de volta para um array
  return Object.values(agrupado);
};

export const agruparPorPropriedade = (arr: any[], propriedade: string) => {
  const agrupado = arr.reduce((acc, obj) => {
    const key = obj[propriedade];

    // Inicializa 'AGP' se não existir
    if (!acc["AGP"]) acc["AGP"] = [];

    // Verifica se o valor já está presente em 'AGP'
    if (!acc["AGP"].includes(key)) {
      acc["AGP"].push(key);
    }

    return acc;
  }, {} as { AGP: string[] });

  // Mapeia para o formato desejado
  //@ts-ignore
  return agrupado["AGP"].map((item) => ({
    text: item,
    value: item,
  }));
};

const PrincipalTest = () => {
  const { account, deleteAccount, getAccountTotal, resumo, addAccountClone } =
    accountStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModalId, setEditModalId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dtaClone, setDtaClone] = useState<string | null>(null);
  const [agrupadoPorMes, setAgrupadoPorMes] = useState<string>(dayjs().format("MM/YYYY"));
 // const [resumoClasse, setResumoClasse] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [clone, setClone] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const [fixedTop] = useState(false);

  const handleChange: OnChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSelectedRowKeys([]);
    setSortedInfo({});
  };

  const filterDate = (e: any) => {
    e === null? setAgrupadoPorMes(''):
    setAgrupadoPorMes(dayjs(e).format("MM/YYYY"))

  };
  

  // const setAgeSort = () => {
  //   setSortedInfo({
  //     order: 'descend',
  //     columnKey: 'type',
  //   });
  // };

  const start = () => {
    const formattedDateMes = dtaClone ? dayjs(dtaClone).format("MM/YYYY") : "";

    setClone(true);
    ///Clonando
    const commonItems = account.filter((item2) =>
      selectedRowKeys.some((item1) => item2.id === Number(item1))
    );

    ///Rescrevendo
    const dataClone = Array.isArray(commonItems)
      ? commonItems.map((item: IAccount) => ({
          ...item,
          data_mes: formattedDateMes,
        }))
      : [];
    addAccountClone(dataClone);

    // setTimeout(() => {
    setSelectedRowKeys([]);
    setClone(false);
    setDtaClone(null);
    // }, 1000);
  };

  // Função que lida com a mudança de seleção de linhas
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // Configurando a seleção de linhas corretamente
  const rowSelection: TableRowSelection<IAccount> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // Modal Handlers
  const showModal = (id?: number) => {
    setIsModalVisible(true);
    if (id) setEditModalId(id);
  };

  useEffect(() => {
     getAccountTotal(agrupadoPorMes ? String(agrupadoPorMes) : "");
  //   console.log(agrupadoPorMes)
  
  }, [editModalId, account, isModalVisible, agrupadoPorMes]);

  const handleCancelModal = () => {
    setIsModalVisible(false);
    setEditModalId(null);
  };

  const dataSource = Array.isArray(account)
    ? account
        .map((item: IAccount) => ({
          ...item,
          key: item.id,
          description: item.observacao,
        }))
        .filter((item: IAccount) =>
          `${item.data_mes.toLowerCase()}`.includes(
            agrupadoPorMes.toLowerCase()
          )
        )
    : [];

  const exportToExcel = () => {
    const dataToExport = dataSource.map((item) => ({
      ID: item.id,
      "Mês Referência": item.data_mes,
      "Data Pagamento": item.data_pag,
      Descrição: item.descricao,
      Operação: item.operacao === 1 ? "Entrada" : "Saída",
      Custo: item.valor,
      Tipo: item.type,
      "Centro de Custo": item.centro_de_custo,
      Crédito: item.classe,
      Status: item.status ? "Ativa" : "Inativa",
      "Parc Paga": item.parc_de,
      "Parc Pend": item.parc_ate,
      "Falta Pagar": item.parc_pag,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contas");
    XLSX.writeFile(workbook, "contas.xlsx");
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Mês referência",
      dataIndex: "data_mes",
      key: "data_mes",
      filters: dataSource.length
        ? agruparPorPropriedade(dataSource, "data_mes")
        : "",
      onFilter: (value: string, record: IAccount) =>
        record.data_mes?.includes(value as string),
      sortOrder: sortedInfo.columnKey === "data_mes" ? sortedInfo.order : null,
      ellipsis: true,
      filteredValue: filteredInfo.data_mes || null,
    },
    { title: "Data pagamento", dataIndex: "data_pag", key: "data_pag" },
    { title: "Descrição", dataIndex: "descricao", key: "descricao" },
    {
      title: "Operações",
      dataIndex: "operacao",
      key: "operacao",
      render: (_: any, record: IAccount) => (
        <Space size="middle">
          {record.operacao === 1 ? (
            <Tag icon={<ArrowUpOutlined />} color="success">
              Entrada
            </Tag>
          ) : (
            <Tag icon={<ArrowDownOutlined />} color="error">
              Saída
            </Tag>
          )}
        </Space>
      ),
      filters: dataSource.length
        ? agruparPorPropriedade(dataSource, "operacao")
        : "",
      onFilter: (value: number, record: IAccount) => record.operacao === value,
      //sorter: (a, b) => a.centro_de_custo - b.centro_de_custo, /// Esse ordena de az
      sortOrder: sortedInfo.columnKey === "operacao" ? sortedInfo.order : null, /// esse seta a configuração
      filteredValue: filteredInfo.operacao || null,
      // ellipsis: true,
    },
    {
      title: "Custo",
      dataIndex: "valor",
      key: "valor",
      render: (valor: number) =>
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(valor),
    },
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
      showSorterTooltip: { target: "full-header" },
      //filteredValue: filteredInfo.type || null,

      filters: dataSource.length
        ? agruparPorPropriedade(dataSource, "type")
        : "",
      // onFilter: (value: string, record: IAccount) => record.type?.indexOf(value as string) === 0,
      onFilter: (value: string, record: IAccount) =>
        record.type?.includes(value as string),
      //@ts-ignore
      sorter: (a, b) => a.type.length - b.type.length,
      sortOrder: sortedInfo.columnKey === "type" ? sortedInfo.order : null,
      ellipsis: true,
      filteredValue: filteredInfo.type || null,
    },
    {
      title: "Centro de custo",
      dataIndex: "centro_de_custo",
      key: "centro_de_custo",
      filters: dataSource.length
        ? agruparPorPropriedade(dataSource, "centro_de_custo")
        : "",
      onFilter: (value: string, record: IAccount) =>
        record.centro_de_custo?.includes(value as string),
      //sorter: (a, b) => a.centro_de_custo - b.centro_de_custo, /// Esse ordena de az
      sortOrder:
        sortedInfo.columnKey === "centro_de_custo" ? sortedInfo.order : null, /// esse seta a configuração
      filteredValue: filteredInfo.centro_de_custo || null,
      // ellipsis: true,
    },
    {
      title: "Crédito",
      dataIndex: "classe",
      key: "classe",
      filters: dataSource.length
        ? agruparPorPropriedade(dataSource, "classe")
        : "",
      onFilter: (value: string, record: IAccount) =>
        record.classe?.includes(value as string),
      filteredValue: filteredInfo.classe || null,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: any, record: IAccount) => (
        <Space size="middle">
          {record.status ? (
            <Badge status="success" text="Ativa" />
          ) : (
            <Badge status="warning" text="Inativa" />
          )}
        </Space>
      ),
      // filters:  dataSource.length? agruparPorPropriedade(dataSource, 'status') : '',
      // onFilter: (value: boolean, record: IAccount) => record.status === value ,
      // //sorter: (a, b) => a.centro_de_custo - b.centro_de_custo, /// Esse ordena de az
      // sortOrder: sortedInfo.columnKey === 'status' ? sortedInfo.order : null,/// esse seta a configuração
      // filteredValue: filteredInfo.status || null,
    },

    { title: "Parc Paga", dataIndex: "parc_de", key: "parc_de" },
    { title: "Parc Pend", dataIndex: "parc_ate", key: "parc_ate" },
    {
      title: "Falta Pagar",
      dataIndex: "parc_pag",
      key: "parc_pag",
      render: (parc_pag: number) =>
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(parc_pag),
    },
    {
      title: "Ação",
      key: "action",
      // fixed: 'right',
      width: 90,
      render: (_: any, record: IAccount) => (
        <Space size="middle">
          <Button
            onClick={() => deleteAccount(Number(record.id))}
            icon={<DeleteOutlined />}
            type="dashed"
          />
          <Button
            onClick={() => showModal(record.id)}
            icon={<FormOutlined />}
          />
        </Space>
      ),
    },
  ];

  // const topOptions = [
  //   { label: 'topLeft', value: 'topLeft' },
  //   { label: 'topCenter', value: 'topCenter' },
  //   { label: 'topRight', value: 'topRight' },
  //   { label: 'none', value: 'none' },
  // ];

  // const bottomOptions = [
  //   { label: 'bottomLeft', value: 'bottomLeft' },
  //   { label: 'bottomCenter', value: 'bottomCenter' },
  //   { label: 'bottomRight', value: 'bottomRight' },
  //   { label: 'none', value: 'none' },
  // ];

  const debounceSearch = (value: string) => {
    setSearchTerm(value);
  };

  const filteredItems = dataSource.filter((item: IAccount) =>
    `${item.descricao.toLowerCase()} ${item.descricao.toLowerCase()}`.includes(
      searchTerm.toLowerCase()
    )
  );

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
      <Card
        title="Resumo financeiro"
        actions={["Resumo de contas gerais"]}
        extra={
          <>
            <Space>
              Filtro: 
            <DatePicker
                        picker="month"
                        onChange={(e) => filterDate(e)}
                        format="MM/YYYY"
                        style={{ width: "100%" }}
                        placeholder="Data mes resferencia"
                        
                      />
              <Button onClick={() => showModal(0)}>
                <PlusOutlined title="Adicionar" /> Adicionar
              </Button>

              {/* <Button onClick={setAgeSort}>Asc<ArrowUpOutlined /></Button> */}
              {dataSource.length > 0 ? 
              <Button
                onClick={exportToExcel}
                type="primary"
                icon={<ArrowDownOutlined />}
              >
                Exportar Excel
              </Button>
        :''}
            </Space>
          </>
        }
      >
        <Row gutter={16} style={{ padding: 15 }}>
          <Col flex={"auto"}>
            <Card bordered={true}>
              <Statistic
                title="Entrada"
                value={new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(resumo[0]?.entrada)}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                // suffix="%"
              />
            </Card>
          </Col>
          <Col flex={"auto"}>
            <Card bordered={true}>
              <Statistic
                title="Saida"
                value={new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(resumo[0]?.saida)}
                precision={2}
                valueStyle={{ color: "#cf1322" }}
                prefix={<ArrowDownOutlined />}
                // suffix="%"
              />
            </Card>
          </Col>
          <Col flex={"auto"}>
            <Card bordered={true}>
              <Statistic
                title="Total"
                value={new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(resumo[0]?.total)}
                precision={2}
                valueStyle={{ color: "#cccc" }}
                prefix={""}
                // suffix="%"
              />
            </Card>
          </Col>
        </Row>

        <AccountCollapse
          title="Resumo de contas"
          content={
            <>
              <Row gutter={[16, 16]}>
                <Col flex={"auto"}>
                  <Card title="Resumo Credito">
                    <List
                      grid={{ gutter: 16, column: 4 }}
                      dataSource={agruparPorClasseEDataMes(dataSource).filter(
                        (e) => e.classe !== ""
                      )}
                      renderItem={(item) => (
                        <List.Item>
                          <Card title={item.classe}>
                            <li>Mes: {item.data_mes}</li>
                            <li>
                              Atual Mes:{" "}
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(item.valor)}
                            </li>
                            <li>
                              Parcelado:{" "}
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(item.parc_pag)}
                            </li>
                          </Card>
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>

                <Col flex={"auto"}>
                  <Card title="Contas fixa">
                    <List
                      pagination={{
                        onChange: (page) => {
                          console.log(page);
                        },
                        pageSize: 2,
                      }}
                      dataSource={agruparPorTypeEDescricaoESomarValor(
                        dataSource
                      ).filter((e) => e.type === "Fixa")}
                      renderItem={(item) => (
                        <List.Item key={item.descricao}>
                          <List.Item.Meta
                            avatar={<Avatar src={""} />}
                            title={
                              <a href="https://ant.design">{item.descricao}</a>
                            }
                            description={item.type}
                          />
                          <div>
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(item.valor)}
                          </div>
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
              </Row>
            </>
          }
        />

<AccountCollapse
  title="Resumo detalhado"
  content={
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Card
            title={`${agrupadoPorMes ? agrupadoPorMes : 'Todos'}`}
            extra={
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Search
                  placeholder="Buscar nome de conta"
                  value={searchTerm}
                  onChange={(e) => debounceSearch(e.target.value)}
                //  style={{ width: '100%' }} // Full width on smaller screens
                />

                <Space wrap>
                  <Button
                    type="primary"
                    onClick={() => setClone(!clone)}
                    disabled={!hasSelected}
                  >
                    Clonar itens
                  </Button>

                  {clone && (
                    <DatePicker
                      picker="month"
                      //@ts-ignore
                      onChange={(e) => setDtaClone(e)}
                      format="MM/YYYY"
                      style={{ width: "100%" }} // Full width on smaller screens
                      placeholder="Data mês referência"
                    />
                  )}

                  {dtaClone && (
                    <Button
                      type="primary"
                      onClick={start}
                      disabled={!hasSelected}
                    >
                      Salvar
                    </Button>
                  )}

                  <Button onClick={clearAll}>
                    <ClearOutlined title="Limpar todos os filtros" />
                    Limpar filtro
                  </Button>
                </Space>
              </Space>
            }
          >
            <Table
              dataSource={filteredItems}
              showSorterTooltip={{ target: "sorter-icon" }}
              onChange={handleChange}
              rowKey="id"
              //@ts-ignore
              columns={columns}
              size="small"
              expandable={{
                expandedRowRender: (record) => (
                  <p style={{ margin: 0 }}>{record.observacao}</p>
                ),
                rowExpandable: (record) => record.observacao !== "Not Expandable",
              }}
              pagination={{ pageSize: 50, position: ["bottomRight"] }}
              scroll={{ y: 240 }}
              rowSelection={rowSelection}
              summary={() => (
                <Table.Summary fixed={fixedTop ? "top" : "bottom"}>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={2}>
                      {`Total: ${filteredItems.length}`}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2} colSpan={8}>
                      Scroll Context
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={10}>
                      {hasSelected
                        ? `Select ${selectedRowKeys.length} items`
                        : null}
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )}
            />
          </Card>
        </Col>
      </Row>
    </>
  }
/>

      </Card>
      <DynamicModal
        visible={isModalVisible}
        onClose={handleCancelModal}
        onCancel={handleCancelModal}
        title="Resumo financeiro"
        content={
          <Formulario
            id={editModalId}
            onClose={() => {
              setIsModalVisible(false);
              setEditModalId(null);
            }}
          />
        }
      />
    </>
  );
};

export default PrincipalTest;
