import { useState, useEffect } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  InputNumber,
  Select,
  DatePicker,
  message,
  Row,
  Col,
  Switch,
  Divider,
} from "antd";
import accountStore from "../../store/accountATFG.store";
import { IAccount } from "../../modules/accountsATFG.entity";

const { Option } = Select;
import dayjs from 'dayjs';

interface IEditProps {
  id?: number | null;
  onClose: () => void;
}




const Formulario: React.FC<IEditProps> = ({ id, onClose }) => {
  const [form] = Form.useForm();
  const [showCartaoFields, setShowCartaoFields] = useState<boolean>(false);
  const { addAccount, account, updateAccount} = accountStore();
  ///const [agrupadoPorMes, setAgrupadoPorMes] = useState<string[]>([]);
  
  const dateFormat = 'DD/MM/YYYY';
  useEffect(() => {
    // const agrupado = agruparPorPropriedade(account, 'data_mes'); 
    // setAgrupadoPorMes(agrupado)

    if (id) {
      const accountData = account.find((acc) => acc.id === id);
      if (accountData) {
        
        form.setFieldsValue({
          ...accountData,
          data_pag: accountData.data_pag ? dayjs(accountData.data_pag, dateFormat) : null,
          data_mes: accountData.data_mes ? dayjs(accountData.data_mes, "MM/YYYY") : null,
          
        });
        setShowCartaoFields(accountData.centro_de_custo !== "Pagamento");
      }
    }
  }, [id, account, form]);

  
  
  

  const handleFinish = (values: IAccount) => {
    const formattedDate = values.data_pag
    ? dayjs(values.data_pag).format('DD/MM/YYYY')
    : '';
    const formattedDateMes = values.data_mes
    ? dayjs(values.data_mes).format('MM/YYYY')
    : '';
    
    const newAccount: Omit<IAccount, "id"> = {
      ...values,
      data_pag: formattedDate, 
      data_mes: formattedDateMes
    };

    if (id) {
      updateAccount({ ...values, id, data_pag: String(formattedDate),  data_mes: String(formattedDateMes) });
      message.success("Registro atualizado com sucesso!");
    } else {
      addAccount(newAccount);
      message.success("Registro adicionado com sucesso!");
    }
  
   // form.resetFields();
    onClose();
    setShowCartaoFields(false);
  };
  
  const formItemLayout = {
    labelCol: {
      xs: { span: 10 },
      sm: { span:  10},
    },
    wrapperCol: {
      xs: { span: 100 },
      sm: { span: 100 },
    },
  };

  return (
    <Row>
      <Col flex="auto">
        <Card style={{ marginBottom: "20px" }}>
          <Form form={form} layout="horizontal"  {...formItemLayout}     style={{ maxWidth: 600 }} onFinish={handleFinish}>
          <Form.Item
              name="data_mes"
              label="Mês referencia"
              rules={[{ required: true, message: "Selecione uma data" }]}
            >
              <DatePicker format="MM/YYYY" picker="month" style={{ width: "100%" }} />
            
            </Form.Item>
            <Form.Item
              name="descricao"
              label="Descrição"
              rules={[{ required: true, message: "Insira uma descrição" }]}
            >
              <Input placeholder="Inserir a descrição da conta" />
            </Form.Item>

            <Form.Item
              name="valor"
              label="Valor"
              rules={[{ required: true, message: "Insira um valor" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                step={0.01}
                placeholder="Inserir o valor da conta"
                formatter={(value) =>
                  `R$ ${Number(value).toFixed(2)}`.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    "."
                  )
                }
                //@ts-ignore
                parser={(value) => value?.replace(/\R\$|\s|,/g, "")}
              />
            </Form.Item>

            <Form.Item
              name="operacao"
              label="Operação"
              rules={[{ required: true, message: "Selecione uma operação" }]}
            >
              <Select>
                <Option value={1}>Entrada</Option>
                <Option value={2}>Saída</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="type"
              label="Tipo de conta"
              rules={[{ required: true, message: "Selecione o tipo de conta" }]}
            >
              <Select>
                <Option value="Fixa">Fixa</Option>
                <Option value="Outros">Outros</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="centro_de_custo"
              label="Centro de custo"
              rules={[
                { required: true, message: "Selecione um centro de custo" },
              ]}
            >
              <Select
                placeholder="Selecione"
                onChange={(value) => setShowCartaoFields(value !== "Pagamento")}
              >
                <Option value="Pagamento">Pagamento</Option>
                <Option value="Credito">Credito</Option> 
                <Option value="Boleto">Boleto</Option>              
                <Option value="Debito/Conta">Debito/Conta</Option>              
              </Select>
            </Form.Item>

            <Form.Item
              name="data_pag"
              label="Data de Pagamento"
              rules={[{ required: true, message: "Selecione uma data" }]}
            >
              {/* <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} /> */}
              <DatePicker  format={dateFormat} />

            </Form.Item>

         

            <Form.Item name="status" label="Status da conta">
              <Switch />
            </Form.Item>

            <Form.Item
        name="observacao"
        label="Observação"
        rules={[{ required: false, message: 'Comentarios ou observações' }]}
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>
            {showCartaoFields && (
              <Card>
                <Form.Item
                  name="classe"
                  label="Credito"
                  rules={[{ required: !id, message: "Selecione um cartão" }]}
                >
                  <Select>
                    <Option value="NU BANC">Nu Bank</Option>
                    <Option value="ITAU BANC">Itaú</Option>
                    <Option value="MERCADO PAGO BANC">Mercado Pago</Option>
                    <Option value="Boleto">Boleto</Option>
                  </Select>
                </Form.Item>

                <Divider orientation="left">Parcelamento</Divider>

                <Row gutter={[8, 8]}>
                  <Col flex="auto">
                    <Form.Item
                      name="parc_de"
                      label="De"
                      rules={[
                        { required: !id, message: "Insira a parcela atual" },
                      ]}
                    >
                      <InputNumber placeholder="Parcela atual" />
                    </Form.Item>
                  </Col>

                  <Col flex="auto">
                    <Form.Item
                      name="parc_ate"
                      label="Até"
                      rules={[
                        {
                          required: !id,
                          message: "Insira o total de parcelas",
                        },
                      ]}
                    >
                      <InputNumber placeholder="Total de parcelas" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            )}

            <Form.Item>
              <Button type="primary" htmlType="submit">
                {id ? "Salvar Edição" : "Adicionar conta"}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Formulario;
