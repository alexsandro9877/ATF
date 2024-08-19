import  { useState } from "react";
import { DatePicker } from "antd";
import moment from "moment";

//const { RangePicker } = DatePicker;

const events = [
  {
    dateIn: "15/08/2024 12:22",
    dateEnd: "15/08/2024 13:22",
  },
  {
    dateIn: "16/08/2024 12:22",
    dateEnd: "16/08/2024 13:22",
  },
  {
    dateIn: "16/08/2024 15:22",
    dateEnd: "16/08/2024 16:22",
  },
];

const eventsDate = [
  {
    dateIn: "20/08/2024 12:22",
    dateEnd: "20/08/2024 13:22",
  },
  {
    dateIn: "21/08/2024 12:22",
    dateEnd: "21/08/2024 13:22",
  },
];

const MyComponent = () => {
  const [availableTimes, setAvailableTimes] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);
  console.log(availableTimes)

  const onSelectDate = (date: moment.Moment | null) => {

    if (date) {
      setSelectedDate(date);
      const disabledHours = filterUnavailableTimes(date);
      const availableHours = Array.from({ length: 24 }, (_, i) => i).filter(
        (hour) => !disabledHours.includes(hour)
      );
      setAvailableTimes(availableHours);
    }

  };
  // Função para remover horários indisponíveis
  const filterUnavailableTimes = (date: moment.Moment) => {
    const event = events.find(
      (event) =>
        date.isSame(moment(event.dateIn, "DD/MM/YYYY"), "day") ||
        date.isSame(moment(event.dateEnd, "DD/MM/YYYY"), "day")
    );
    console.log(event)
    if (!event) return [];

    const startHour = moment(event.dateIn, "DD/MM/YYYY HH:mm").hour();
    const endHour = moment(event.dateEnd, "DD/MM/YYYY HH:mm").hour();

    return Array.from({ length: 24 }, (_, i) => i).filter(
      (hour) => hour >= startHour && hour <= endHour
    );
  };
  // Função para desabilitar finais de semana e dias específicos
  const disabledDate = (current: moment.Moment) => {
    const today = moment().startOf("day");
    const nextWeek = moment().add(7, "days").endOf("day");

    // Verificar se o dia é fim de semana
    const isWeekend = current.day() === 0 || current.day() === 6;

    // Verificar se o dia está no array de eventos que queremos desabilitar
    const isDisabledEventDay = eventsDate.some((event) => {
      const eventDay = moment(event.dateIn, "DD/MM/YYYY").startOf("day");
      return current.isSame(eventDay, "day");
    });

    return (
      current.isBefore(today) ||
      current.isAfter(nextWeek) ||
      isWeekend ||
      isDisabledEventDay
    );
  };

  return (
    <div>
      <DatePicker
        format="DD/MM/YYYY"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        disabledDate={disabledDate} // Mostrar apenas os próximos 7 dias, remover fins de semana e dias específicos
        onChange={onSelectDate}
        placeholder="Selecione uma data"
      />

      {selectedDate && (
        <>
         {/* <TimePicker format="HH:mm" disabledTime={disabledDate} /> */}
          {/* <h3>Horários disponíveis para {selectedDate.format("DD/MM/YYYY")}:</h3>
          <List
            dataSource={availableTimes}
            renderItem={(time) => (
              <List.Item>
                {`${time.toString().padStart(2, '0')}:00`}
              </List.Item>
            )}
          /> */}
        </>
      )}
    </div>
  );
};

export default MyComponent;
