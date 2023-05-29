import { isWeekend, isWithinInterval, parse } from 'date-fns';

// Obtener el día de la semana actual
const date = new Date();

//pruebas de fechas y horarios
// Establecer el día de la semana en sábado
date.setDate(date.getDate() + (6 - date.getDay()));
// Establecer la hora en 21:00
/* date.setHours(21);
date.setMinutes(0);
date.setSeconds(0);
date.setMilliseconds(0); */
// Establecer la hora en 12:00 PM (mediodía)
date.setHours(12);
date.setMinutes(0);
date.setSeconds(0);
date.setMilliseconds(0);

// Definir los horarios
const dailySchedule = {
    startTime: parse('20:00', 'HH:mm', date),
    endTime: parse('23:59:59', 'HH:mm:ss', date),
};

const weekendSchedule = {
    startTime: parse('11:00', 'HH:mm', date),
    endTime: parse('15:00', 'HH:mm', date),
};

// Definir el tipo para el horario
type Schedule = {
    startTime: Date;
    endTime: Date;
};

// Verificar el horario según el día de la semana
let schedule: Schedule;
if (isWeekend(date)) {
    if (date.getHours() >= 11 && date.getHours() <= 15) {
        schedule = {
            startTime: weekendSchedule.startTime,
            endTime: weekendSchedule.endTime,
        };
    } else if (date.getHours() >= 20 || date.getHours() === 0) {
        schedule = {
            startTime: dailySchedule.startTime,
            endTime: dailySchedule.endTime,
        };
    }
} else {
    schedule = {
        startTime: dailySchedule.startTime,
        endTime: dailySchedule.endTime,
    };
}

export const openRestaurant = (currentDate: Date): boolean => {
    // Verificar si el horario actual está dentro del rango de apertura
    if (schedule === undefined) {
        return false;
    } else {
        return isWithinInterval(currentDate, { start: schedule.startTime, end: schedule.endTime });
    }
};
