
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import type { TableColumnsType } from "antd";

interface DataType {
 
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

interface Iwl {
  codParceiro: number,
  codPedido: string,
  dataHoraCadastro: string,
  numItem: number,
  codProduto: number,
  descProduto: string,
  qtdProduto: number,
  valorProduto: number,
  valorDesconto: number,
  valorTotal: number,
  indicaPesoVariavel: boolean| false,
  indisponivel: boolean|false,
  desistencia: boolean|false
}

const columns: TableColumnsType<Iwl>= [
  {
    title: 'codParceiro',
    dataIndex: 'codParceiro',
    key: 'codParceiro',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'codPedido',
    dataIndex: 'codPedido',
    key: 'codPedido',
    render: (text) => <a>{text}</a>,
  }
];

const wl: Iwl[] = [{
    codParceiro: 9,
    codPedido: "17211-E536051018",
    dataHoraCadastro: "2024-08-08T17:39:27.916-0300",
    numItem: 9,
    codProduto: 3244463,
    descProduto: "REQUEIJÃO CREMOSO TRADICIONAL VIGOR COPO 200G",
    qtdProduto: 1,
    valorProduto: 7.89,
    valorDesconto: 0,
    valorTotal: 7.89,
    indicaPesoVariavel: false,
    indisponivel: false,
    desistencia: false
}]



const TesteTabela: React.FC = () => 
  <Table
              columns={columns}
              dataSource={wl}
              //loading={isGetAccountsLoading}
              scroll={{ x: 1200 }}
            />
  ;

export default TesteTabela;