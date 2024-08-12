import React from 'react';
import { Card, Descriptions, Divider, Table, TableColumnsType } from 'antd';
import { IPurchaseDetail } from '../../types';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const PurchaseDetail = ({ data }: { data: IPurchaseDetail[] }) => {
  const columns: TableColumnsType<IPurchaseDetail> = [
    {
      title: 'Produto',
      dataIndex: 'produto',
      key: 'produto',
    },
    {
      title: 'Qtd_inicial',
      dataIndex: 'quantidade',
      key: 'quantidade',
    },
    {
      title: 'Qtd_final',
      dataIndex: 'quantidade',
      key: 'quantidade',
    },
    {
      title: 'Valor Unitário',
      dataIndex: 'valor',
      key: 'valor',
      render: (text) => `R$ ${text.toFixed(2)}`,
    },
    {
      title: 'Valor Total',
      dataIndex: 'valorTotal',
      key: 'valorTotal',
      render: (text) => `R$ ${text.toFixed(2)}`,
    },
    {
      title: 'pesoVariavel',
      dataIndex: 'pesoVariavel',
      key: 'pesoVariavel',
      render: (pesoVariavel) => (pesoVariavel ? <CheckCircleOutlined  type="message" style={{ fontSize: '16px', color: 'blue', textAlign: 'center' }}   /> : ''),
    },
    {
      title: 'Indisponível',
      dataIndex: 'indisponivel',
      key: 'indisponivel',
      render: (indisponivel) => (indisponivel ? <CloseCircleOutlined type="message" style={{ fontSize: '16px', color: 'red', textAlign: 'center' }}   /> : ''),
    },
    {
      title: 'Desistencia',
      dataIndex: 'desistencia',
      key: 'desistencia',
      render: (desistencia) => (desistencia ?  <CloseCircleOutlined type="message" style={{ fontSize: '16px', color: 'red', textAlign: 'center' }}   /> : ''),
    },
  ];

  const currentItem = data[0];
  return (
    <Card title={`Pedido #${currentItem.codigo}`}>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Data do Pedido">{currentItem.dataHora}</Descriptions.Item>
        <Descriptions.Item label="Status">{currentItem.statusDescricao}</Descriptions.Item>
        <Descriptions.Item label="Valor Total">R$ {currentItem.valorTotal.toFixed(2)}</Descriptions.Item>
        <Descriptions.Item label="Valor Corrigido">R$ {currentItem.valorCorrigido?.toFixed(2)}</Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">Pagamento</Divider>
      <Descriptions bordered column={1}>
        {currentItem.pagamentos.map((pagamento) => (
          <Descriptions.Item label={pagamento.nome} key={pagamento.id}>
            R$ {pagamento.valor.toFixed(2)} ({pagamento.tipo})
          </Descriptions.Item>
        ))}
      </Descriptions>

      <Divider orientation="left">Itens</Divider>
      <Table
      scroll={{x: 1400}}
        columns={columns}
        style={{textAlign: 'center'}}
        dataSource={currentItem.items}
        rowKey="id"
        bordered
        size='small'
        pagination={{
          onChange: (page) => console.log(page),
          pageSize: 3,
        }}
      />

      <Divider orientation="left">Loja</Divider>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Nome">{currentItem.loja.nome}</Descriptions.Item>
        <Descriptions.Item label="CNPJ">{currentItem.loja.cnpj}</Descriptions.Item>
        <Descriptions.Item label="Endereço">
          {`${currentItem.loja.endereco.logradouro}, ${currentItem.loja.endereco.numero} - ${currentItem.loja.endereco.bairro}, ${currentItem.loja.endereco.cidade} - ${currentItem.loja.endereco.uf}`}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

const DetalhePedido = () => {
  const data:IPurchaseDetail = {
    "idLoja": 11913,
    "idCliente": 7385123,
    "idPedido": "12e89ce6-72dd-495e-a317-e585710e0eb2",
    "codigo": "11913-F142483255",
    "codigoLoja": "142483255",
    "data": "2024-08-09T00:00:00.000",
    "hora": "08:28",
    "dataHora": "2024-08-09T08:28:45.468",
    "agendamentoDataInicio": "2024-08-09T00:00:00.000",
    "agendamentoHoraInicio": "10:00",
    "agendamentoDataFim": "2024-08-09T00:00:00.000",
    "agendamentoHoraFim": "11:00",
    "entrega": false,
    "retirada": true,
    "cpfNaNota": true,
    "status": "SEP",
    "tipo": "SCHEDULED",
    "statusDescricao": "Em Separação",
    "pessoaAutorizadaRecebimento": "",
    "quantidadeItemUnico": 3,
    "valorMercado": 34.27,
    "valorConveniencia": 4,
    "quantidadeSacolaResfriada": 0,
    "quantidadeSacolaSeca": 0,
    "valorEntrega": 0.00,
    "valorRetirada": 0,
    "valorTroco": 0,
    "valorDesconto": 0.0,
    "valorTotal": 38.27,
    "valorCorrigido": 38.27,
    "opcaoTroca": "NOT_APPLICABLE",
    "plataforma": "SM",
    "loja": {
        "id": 11913,
        "storeId": "c7c5d8a2-3395-45b7-8681-8dd970142507",
        "nome": "Loja Centro - Homologação",
        "cnpj": "47508411104954",
        "status": "Ativa",
        "endereco": {
            "logradouro": "R Samuel Klein",
            "numero": "83",
            "bairro": "Centro",
            "cidade": "São Caetano do Sul",
            "uf": "SP",
            "cep": "09510125",
            "latitude": -23.6113903,
            "longitude": -46.5707205
        },
        "rede": {
            "id": 15250,
            "nome": "Mercado Extra"
        },
        "atendimento": []
    },
    "cliente": {
        "id": 7385123,
        "nome": "Erick Sadao",
        "email": "erick.kato@gpabr.com",
        "cpf": "33958232884",
        "rg": "428710220",
        "tipo": "Fisica",
        "publicidadeEmail": false,
        "publicidadeSms": false,
        "dataNascimento": "1985-06-11T00:00:00.000",
        "genero": "Homem",
        "telefoneCelular": "11974210972"
    },
    "items": [
        {
            "id": 1064793407,
            "uniqueId": "b8fd1bf5-fb2d-40c0-9b5b-7b7d502bb1ea",
            "index": 1,
            "codigo": "11913-F142483255",
            "codigoLoja": "142483255",
            "pesoVariavel": true,
            "codigoBarra": "7898568901081",
            "plu": "1190036",
            "produto": "Gergelim Branco Vitalin Integral Descascado 120G",
            "quantidade": 1,
            "quantidade3": 1,
            "valor": 14.29,
            "valorTotal": 14.29,
            "indisponivel": true,
            "desistencia": false,
            "valorOriginal": 14.29,
            "pesoVariavelVendidoPorUnidade": false
        },
        {
            "id": 1064793406,
            "uniqueId": "195de71f-3e73-4ec6-9b6a-0cc754b5409c",
            "index": 2,
            "codigo": "11913-F142483255",
            "codigoLoja": "142483255",
            "pesoVariavel": true,
            "codigoBarra": "7896283005268",
            "plu": "1125902",
            "produto": "Linhaça Dourada Jasmine 150G",
            "quantidade": 1,
            "quantidade3": 1,
            "valor": 12.29,
            "valorTotal": 12.29,
            "indisponivel": true,
            "desistencia": false,
            "valorOriginal": 12.29,
            "pesoVariavelVendidoPorUnidade": false
        },
        {
            "id": 1064793408,
            "uniqueId": "16598bd3-813d-49a0-9d1f-3c054c5d5959",
            "index": 3,
            "codigo": "11913-F142483255",
            "codigoLoja": "142483255",
            "pesoVariavel": false,
            "codigoBarra": "7896283000416",
            "plu": "8646514",
            "produto": "Semente de Linhaça Marrom Integral Jasmine Pacote 200g",
            "quantidade": 1,
            "quantidade3": 1,
            "valor": 7.69,
            "valorTotal": 7.69,
            "indisponivel": false,
            "desistencia": true,
            "valorOriginal": 7.69,
            "pesoVariavelVendidoPorUnidade": false
        }
    ],
    "pagamentos": [
        {
            "id": 1,
            "nome": "Dinheiro",
            "valor": 38.27,
            "tipo": "Offline"
        }
    ],
    "beneficios": [],
    "beneficiosEntrega": {}
  };

  return <PurchaseDetail data={[data]} />;
};

export default DetalhePedido;


