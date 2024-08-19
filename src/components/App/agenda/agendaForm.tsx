import { Button, Form, Input,  DatePicker } from "antd";

import { useState } from "react";
import MaskedInput from "antd-mask-input";

const { RangePicker } = DatePicker;
interface IeventDate {
  dateIn: string;
  dateEnd: string;
}
const AgendaForm = () => {
  const [form] = Form.useForm();
  const [dateForm, setDateForm] = useState<IeventDate>({} as IeventDate);

  console.log(dateForm)

  //Função para pegar a hora do formulario selecionada
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  function onChangeDateEvent(date: any, dateString: any) {
    setDateForm({
      dateIn: dateString[0],
      dateEnd: dateString[1],
    });
  }

  function handleAgenda(values: any): void {
    // const formattedDate = values.periodo.date.format("DD/MM/YYYY")
    //   const formattedTime = values.periodo.time.format('HH:mm');
    const payloand = {
      ...values,
      periodo: {
        date: values.periodo.date.format("DD/MM/YYYY"),
        time: values.periodo.time.format("HH:mm"),
      },
      status: true,
    };

    // console.log(formattedDate +"  "+ formattedTime + " " )
    console.log(JSON.stringify(payloand));
  }

  return (
    <Form form={form} onFinish={handleAgenda} layout="vertical">
      <Form.Item
        name="name"
        label="Nome"
        rules={[{ required: true, message: "Por favor, informe o seu nome." }]}
      >
        <Input placeholder="Nome para agendamento." />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Telefone"
        rules={[{ required: true, message: "Inserir telefone para contato!" }]}
      >
        <MaskedInput mask="(00)0 0000 - 0000" />
      </Form.Item>
      {/* <Form.Item
        name={["periodo", "time"]}
        label="Horário"
        rules={[
          { required: true, message: "Por favor, selecione um horário!" },
        ]}
      >
        <TimePicker format="HH:mm" disabledTime={disabledTime} />
      </Form.Item> */}
      <Form.Item
        name={["periodo"]}
        label="Selecione uma data"
        rules={[{ required: true, message: "Por favor, selecione uma data!" }]}
      >
         <RangePicker
        format="DD/MM/YYYY HH:mm"
        showTime={{ format: "HH:mm" }}
        onChange={onChangeDateEvent}
        allowClear={true}
       // disabledDate={disabledDate}  // dias
       // disabledTime={disabledTime}  //  horas
        />
        {/* <DatePicker format="DD/MM/YYYY" disabledDate={disabledDate} /> */}
      </Form.Item>

      <Form.Item
        name="obs"
        label="Observações"
        rules={[{ required: false, message: "Por favor, Observações." }]}
      >
        <Input.TextArea rows={4} placeholder="Suas observações, sobre o tema" />
      </Form.Item>


      <Form.Item>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AgendaForm;
