import dayjs from "dayjs";

export const generateDate = (month = dayjs().month(), year = dayjs().year()) => {
    const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
    const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

    let days = [];

    // Adiciona os dias que antecedem o primeiro dia do mês
    for (let i = 0; i < firstDateOfMonth.day(); i++) {
        days.push({
            date: firstDateOfMonth.subtract(firstDateOfMonth.day() - i, 'days'),
            currentMonth: false,
            today: false
        });
    }

    // Adiciona os dias do mês atual
    for (let day = 0; day < lastDateOfMonth.diff(firstDateOfMonth, 'day') + 1; day++) {
        days.push({
            date: firstDateOfMonth.add(day, 'days'),
            currentMonth: true,
            today: firstDateOfMonth.add(day, 'days').isSame(dayjs(), 'day')
        });
    }

    // Adiciona os dias até completar a última semana
    while (days.length % 7 !== 0) {
        days.push({
            date: days[days.length - 1].date.add(1, 'day'),
            currentMonth: false,
            today: false
        });
    }

    // Organiza os dias em semanas
    let weeks = [];
    for (let i = 0; i < days.length; i += 7) {
        weeks.push(days.slice(i, i + 7));
    }

    return weeks;
};

export const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho", 
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
];

export const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
];