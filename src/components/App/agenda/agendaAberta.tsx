// import React, { useState } from 'react';
// import { Calendar, Modal, Form, TimePicker,  Badge } from 'antd';
// import type { Moment } from 'moment';


// interface Schedule {
//   date: string;
//   time: string;
// }

// const SchedulePage: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   // const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
//   const [form] = Form.useForm();
//   const [schedules, setSchedules] = useState<Schedule[]>([]);

//   // const handleSelectDate = (date: Moment) => {
//   //   setSelectedDate(date);
//   //   setIsModalOpen(true);
//   // };

//   const handleOk = () => {
//     form.validateFields().then(values => {
//       if (selectedDate) {  // Verificação se selectedDate existe
//         const newSchedule: Schedule = {
//           date: selectedDate.format('YYYY-MM-DD'),
//           time: values.time.format('HH:mm'),
//         };
//         setSchedules([...schedules, newSchedule]);
//         form.resetFields();
//         setIsModalOpen(false);
//       }
//     });
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   // const dateCellRender = (value: Moment) => {
//   //   const formattedDate = value.format('YYYY-MM-DD');
//   //   const daySchedules = schedules.filter(schedule => schedule.date === formattedDate);
    
//   //   return (
//   //     <>
//   //       {daySchedules.length > 0 ? <Badge status="success" text="Agendado" /> : null}
//   //     </>
//   //   );
//   // };

//   return (
//     <>
//       {/* <Calendar dateCellRender={dateCellRender} onSelect={handleSelectDate} /> */}

//       <Modal
//         title={`Agendar para ${selectedDate ? selectedDate.format('DD/MM/YYYY') : ''}`}
//         visible={isModalOpen}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item
//             name="time"
//             label="Horário"
//             rules={[{ required: true, message: 'Por favor, selecione um horário!' }]}
//           >
//             <TimePicker format="HH:mm" minuteStep={15} />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default SchedulePage;
