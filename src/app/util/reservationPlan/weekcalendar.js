import dayjs from "dayjs";

export const generateMonth = (month = dayjs().month(), year = dayjs().year()) => {
    const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
    const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

    let days = [];

    // Adiciona os dias do mês atual
    for (let day = 0; day < lastDateOfMonth.diff(firstDateOfMonth, 'day') + 1; day++) {
        days.push({
            date: firstDateOfMonth.add(day, 'days'),
            currentMonth: true,
            today: firstDateOfMonth.add(day, 'days').isSame(dayjs(), 'day')
        });
    }

    return {
        month: months[month],
        year: year,
        days: days
    };
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
    "S",
    "M",
    "T",
    "W",
    "T",
    "F",
    "S",
];
