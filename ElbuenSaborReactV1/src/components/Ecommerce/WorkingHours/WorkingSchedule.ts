import { isWeekend, isWithinInterval, parse } from 'date-fns';

//pruebas de fechas y horarios
// Obtener el día de la semana actual
const date = new Date();
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

export const openRestaurant = (roleid: number): boolean => {
    const today = new Date();
    //if the loggedin user is an admin, set the time on a working day and hour to be allowed to buy
    /*     if (roleid && roleid === 1) { */
    //set day on saturday
    today.setDate(today.getDate() + (6 - today.getDay()));
    //set time at 12:00 PM (midday)
    today.setHours(12);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    /*     } */
    // Verificar si el horario actual está dentro del rango de apertura
    if (schedule === undefined) {
        return false;
    } else {
        return isWithinInterval(today, { start: schedule.startTime, end: schedule.endTime });
    }
};
