import moment, { Moment } from 'moment';

moment.locale('pt-br');

const eventData = {
  date: "2024-08-15",
  name: "Carnaval",
  type: "national",
  time: "15:22"
};

const eventDataAlmoco = {
  timeIn: "12:22",
  timeEnd: "13:22"
};

// Função para desabilitar a data do dia atual, finais de semana e uma data específica
export const disabledDate = (current: Moment) => {
  const today = moment().startOf('day');
  const oneWeekAhead = moment().add(7, 'days').endOf('day');
  
  return (
    current && (
      // Desabilitar a data atual
      current.isSame(today, 'day') || 
      // Desabilitar finais de semana
      current.day() === 0 || current.day() === 6 ||
      // Desabilitar uma data específica
      current.isSame(moment(eventData.date, "YYYY-MM-DD"), 'day') || 
      // Desabilitar datas fora do intervalo de uma semana
      current < today || current > oneWeekAhead
    )
  );
};

// Função para desabilitar horários fora do intervalo das 7h às 17h e os intervalos do evento e almoço
export const disabledTime = () => {
  const now = moment();
  
  const startEvent = moment(eventData.time, "HH:mm");
  const endEvent = startEvent.clone().add(1, 'hour');
  
  const startAlmoco = moment(eventDataAlmoco.timeIn, "HH:mm");
  const endAlmoco = moment(eventDataAlmoco.timeEnd, "HH:mm");

  return {
    disabledHours: () => {
      const hours = [];
      for (let i = 0; i < 24; i++) {
        if (
          i < 7 || 
          i > 17 || 
          (i >= startEvent.hour() && i < endEvent.hour()) ||
          (i >= startAlmoco.hour() && i < endAlmoco.hour())
        ) {
          hours.push(i);
        }
      }
      return hours;
    },
    disabledMinutes: () => {
      const minutes = [];
      if (now.hour() === startEvent.hour()) {
        for (let i = 0; i < 60; i++) {
          if (i < now.minute() || i > endEvent.minute()) {
            minutes.push(i);
          }
        }
      } else if (now.hour() > startEvent.hour() && now.hour() < endEvent.hour()) {
        for (let i = 0; i < 60; i++) {
          if (i < startEvent.minute() || i > endEvent.minute()) {
            minutes.push(i);
          }
        }
      } else if (now.hour() === startAlmoco.hour()) {
        for (let i = 0; i < 60; i++) {
          if (i < now.minute() || i > endAlmoco.minute()) {
            minutes.push(i);
          }
        }
      } else if (now.hour() > startAlmoco.hour() && now.hour() < endAlmoco.hour()) {
        for (let i = 0; i < 60; i++) {
          if (i < startAlmoco.minute() || i > endAlmoco.minute()) {
            minutes.push(i);
          }
        }
      } else {
        for (let i = 0; i < 60; i++) {
          if (
            (now.hour() >= startEvent.hour() && now.hour() <= endEvent.hour() && i >= startEvent.minute() && i <= endEvent.minute()) ||
            (now.hour() >= startAlmoco.hour() && now.hour() <= endAlmoco.hour() && i >= startAlmoco.minute() && i <= endAlmoco.minute())
          ) {
            minutes.push(i);
          }
        }
      }
      return minutes;
    },
    disabledSeconds: () => [], // Permite selecionar qualquer segundo
  };
};
