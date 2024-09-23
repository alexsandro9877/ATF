import { useState } from "react";
import { cGastos, ICartao, IConjuntas, IPainel } from "./gastos.entity";
import {
  Card,
  List,
  Typography,
  Form,
  Input,
  Button,
  InputNumber,
  Select,
  DatePicker,
  message,
} from "antd";

const { Title, Text } = Typography;
const { Option } = Select;

const Gastos = () => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState<string>("painel");

  const handleFinish = (values: any) => {
    if (activeTab === "painel") {
      const newPainel: Omit<IPainel, "id"> = {
        descricao: values.descricao,
        valor: values.valor,
        operacao: values.operacao,
        data_pgt: values.data_pgt.format("DD/MM/YYYY"),
      };
      cGastos.addPainel(newPainel); // Adiciona ao painel com ID gerado automaticamente
    } else if (activeTab === "cartao") {
      const newCartao: Omit<ICartao, "id"> = {
        date: values.date.format("DD/MM/YYYY"),
        referencia_mes: values.referencia_mes,
        valor: values.valor,
        operacao: values.operacao,
        descricao: values.descricao,
        classe: values.classe,
        centro_custo: values.centro_custo,
        desconto: values.desconto,
        parc_de: values.parc_de,
        parc_ate: values.parc_ate,
        parc_pag: values.parc_pag,
      };
      cGastos.addCartao(newCartao);
    } else if (activeTab === "conjuntas") {
      const newConjunta: Omit<IConjuntas, "id"> = {
        descricao: values.descricao,
        valor: values.valor,
      };
      cGastos.addConjunta(newConjunta);
    }

    form.resetFields();
    message.success("Registro adicionado com sucesso!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Resumo Financeiro</Title>

      <Card title="Formulário" style={{ marginBottom: "20px" }}>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="descricao"
            label="Descrição"
            rules={[{ required: true, message: "Insira uma descrição" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="valor"
            label="Valor"
            rules={[{ required: true, message: "Insira um valor" }]}
          >
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>

          {activeTab === "painel" && (
            <>
              <Form.Item
                name="operacao"
                label="Operação"
                rules={[{ required: true, message: "Selecione uma operação" }]}
              >
                <Select>
                  <Option value="entrada">Entrada</Option>
                  <Option value="saida">Saída</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="data_pgt"
                label="Data de Pagamento"
                rules={[{ required: true, message: "Selecione uma data" }]}
              >
                <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
              </Form.Item>
            </>
          )}

          {activeTab === "cartao" && (
            <>
              <Form.Item
                name="date"
                label="Data"
                rules={[{ required: true, message: "Selecione uma data" }]}
              >
                <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item name="classe" label="Classe">
                <Input />
              </Form.Item>

              <Form.Item name="centro_custo" label="Centro de Custo">
                <Input />
              </Form.Item>

              <Form.Item name="referencia_mes" label="Referência do Mês">
                <InputNumber style={{ width: "100%" }} min={1} max={12} />
              </Form.Item>

              <Form.Item name="parc_de" label="Parcela de">
                <InputNumber style={{ width: "100%" }} min={1} />
              </Form.Item>

              <Form.Item name="parc_ate" label="Parcela até">
                <InputNumber style={{ width: "100%" }} min={1} />
              </Form.Item>

              <Form.Item name="parc_pag" label="Parcelas Pagas">
                <InputNumber style={{ width: "100%" }} min={1} />
              </Form.Item>
            </>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Adicionar
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Button
        onClick={() => setActiveTab("painel")}
        type={activeTab === "painel" ? "primary" : "default"}
        style={{ marginRight: "10px" }}
      >
        Painel
      </Button>
      <Button
        onClick={() => setActiveTab("cartao")}
        type={activeTab === "cartao" ? "primary" : "default"}
        style={{ marginRight: "10px" }}
      >
        Cartão
      </Button>
      <Button
        onClick={() => setActiveTab("conjuntas")}
        type={activeTab === "conjuntas" ? "primary" : "default"}
      >
        Conjuntas
      </Button>

      <List
        itemLayout="horizontal"
        dataSource={cGastos.getPainel()}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button onClick={() => cGastos.deletePainel(Number(item.id))}>
                Remover
              </Button>,
            ]} 
          >
            <List.Item.Meta
              title={item.descricao}
              description={`Valor: R$${item.valor} | Operação: ${item.operacao} | Data: ${item.data_pgt}`}
            />
          </List.Item>
        )}
      />

      <List
        itemLayout="horizontal"
        dataSource={cGastos.getCartao()}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button onClick={() => cGastos.deleteCartao(Number(item.id))}>
                Remover
              </Button>,
            ]} // Botão de remoção
          >
            <List.Item.Meta
              title={item.descricao}
              description={`Valor: R$${item.valor} | Operação: ${item.operacao} | Data: ${item.date} | Classe: ${item.classe}`}
            />
          </List.Item>
        )}
      />
       <List
        itemLayout="horizontal"
        dataSource={cGastos.getConjuntas()}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button onClick={() => cGastos.deleteConjunta(Number(item.id))}>
                Remover
              </Button>,
            ]} // Botão de remoção
          >
            <List.Item.Meta
              title={item.descricao}
              description={`Valor: R$${item.valor} | Descrição: ${item.descricao}`}
            />
          </List.Item>
        )}
      />

      <Card title="Resumo" style={{ marginTop: "20px" }}>
        <Text>Entrada: R${cGastos.resumo.entrada}</Text>
        <br />
        <Text>Saída: R${cGastos.resumo.saida}</Text>
        <br />
        <Text>Falta: R${cGastos.resumo.falta}</Text>
      </Card>
    </div>
  );
};

export default Gastos;
