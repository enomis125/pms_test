/*'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import moment from 'moment';
import interactionPlugin from '@fullcalendar/interaction';

export default function TipologyAgenda() {
  const [roomTypeState, setRoomTypeState] = useState([]);
  const [roomCounts, setRoomCounts] = useState({});
  const [reservation, setReservation] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const resTipologies = await axios.get(`/api/v1/hotel/tipologys`);
        setRoomTypeState(resTipologies.data.response);

        let tempRoomCounts = {};
        await Promise.all(resTipologies.data.response.map(async (tipology) => {
          const resRooms = await axios.get(`/api/v1/hotel/rooms/tipologys/${tipology.roomTypeID}`);
          tempRoomCounts[tipology.roomTypeID] = resRooms.data.response.length; // Corrigido aqui
        }));

        setRoomCounts(tempRoomCounts);

        const resBookings = await axios.get(`/api/v1/frontOffice/reservations`);
        setReservation(resBookings.data.response);
        console.log("bookings: ", resBookings.data.response);

      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    getData();
  }, []);

  const getEvents = () => {
    const events = [];
    let currentDate = moment().subtract(1, 'years').startOf('day');
    const endDate = moment().add(1, 'years').endOf('day');

    while (currentDate <= endDate) {
      roomTypeState.forEach(roomType => {
        const roomCount = roomCounts[roomType.roomTypeID] || 0;
        const filteredReservations = reservation.filter(reservation =>
          moment(reservation.checkInDate).startOf('day').isSameOrBefore(currentDate, 'day') &&
          moment(reservation.checkOutDate).endOf('day').subtract(2, 'hours').isAfter(currentDate, 'day') &&
          reservation.roomTypeNumber === roomType.roomTypeID
        );

        let reservedRooms = filteredReservations.length;
        if (filteredReservations.some(reservation => moment(reservation.checkOutDate).startOf('day').isSame(currentDate, 'day'))) {
          reservedRooms--;
        }
        const availableRooms = roomCount - reservedRooms;
        const event = {
          title: `${availableRooms}`,
          start: currentDate.format('YYYY-MM-DD'),
          end: currentDate.format('YYYY-MM-DD'),
          resourceId: roomType.roomTypeID,
          extendedProps: {
            roomCount: availableRooms
          }
        };

        events.push(event);
      });

      currentDate.add(1, 'day');
    }

    return events;
  }

  const handleDateSelect = (info) => {
    console.log("Date selected:", info.startStr);
    setSelectedDate(info.startStr);
  };

  return (
    <FullCalendar
      plugins={[resourceTimelinePlugin, interactionPlugin]}
      selectable={true}
      resourceSelectable={true}
      resourceAreaSelectable={true}
      resourceAreaWidth="15%"
      resourceAreaHeaderContent={() => 'Tipologias'}
      initialView="resourceTimelineWeek"
      resources={roomTypeState.map(roomType => ({
        id: roomType.roomTypeID,
        title: roomType.name,
        extendedProps: {
          number: roomCounts[roomType.roomTypeID] || 0
        }
      }))}
      events={getEvents()}
      resourceLabelContent={(args) => {
        // args contém informações sobre o recurso
        return (
          <>
            <span>{args.resource.title}</span>
            <span className="float-right">{args.resource.extendedProps.number}</span>
          </>
        );
      }}
      slotLabelInterval={{ days: 1 }} // Define o intervalo de etiquetas para cada dia
      slotDuration={{ days: 1 }} // Define a duração de cada slot como um dia inteiro
      slotLabelFormat={[ // Formatação para mostrar a data no formato dia.mes.ano
        { weekday: 'long' },
        { day: '2-digit', month: '2-digit', year: 'numeric', omitCommas: true } // omitCommas remove as vírgulas padrão
      ]}
      headerToolbar={{
        left: 'prev,next',
        //center: 'title',
        right: 'resourceTimelineWeek,resourceTimelineMonth'
      }}
      select={handleDateSelect}
    />
  );
}*/

"use client";
import React, { useState, useEffect } from 'react';
import { generateDate, months, daysOfWeek } from '@/app/util/weekcalendar';
import dayjs from 'dayjs';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import axios from 'axios';

import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';

//imports de componentes
import ReservationsForm from "@/components/modal/frontOffice/reservations/page";
import { FiPlus } from 'react-icons/fi';
import { FaCalendarAlt } from 'react-icons/fa';

// Configurando plugins
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

export default function CalendarPage() {
  const [today, setToday] = useState(dayjs());
  const [weeks, setWeeks] = useState(generateDate(today.month(), today.year()));
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [reservationRange, setReservationRange] = useState({ start: null, end: null });

  const [roomTypeState, setRoomTypeState] = useState([]);
  const [roomCounts, setRoomCounts] = useState({});
  const [reservation, setReservation] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availability, setAvailability] = useState({});

  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const resTipologies = await axios.get(`/api/v1/hotel/tipologys`);
        setRoomTypeState(resTipologies.data.response);

        let tempRoomCounts = {};
        await Promise.all(resTipologies.data.response.map(async (tipology) => {
          const resRooms = await axios.get(`/api/v1/hotel/rooms/tipologys/${tipology.roomTypeID}`);
          tempRoomCounts[tipology.roomTypeID] = resRooms.data.response.length;
        }));

        setRoomCounts(tempRoomCounts);

        const resBookings = await axios.get(`/api/v1/frontOffice/reservations`);
        setReservation(resBookings.data.response);
        updateAvailability(); // Call after loading all data
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    getData();
  }, []);

  const updateAvailability = () => {
    let updatedAvailability = {};
    roomTypeState.forEach(roomType => {
      weeks[currentWeekIndex].forEach(day => {
        const dayFormat = day.date.format('YYYY-MM-DD');
        const filteredReservations = reservation.filter(res =>
          dayjs(res.checkInDate).startOf('day').isSameOrBefore(day.date) &&
          dayjs(res.checkOutDate).endOf('day').subtract(2, 'hours').isAfter(day.date) &&
          res.roomTypeNumber === roomType.roomTypeID
        );

        const reservedRooms = filteredReservations.length;
        const totalRooms = roomCounts[roomType.roomTypeID] || 0;
        const availableRooms = totalRooms - reservedRooms;

        if (!updatedAvailability[roomType.roomTypeID]) {
          updatedAvailability[roomType.roomTypeID] = {};
        }
        updatedAvailability[roomType.roomTypeID][dayFormat] = availableRooms;
      });
    });

    setAvailability(updatedAvailability);
  }

  useEffect(() => {
    updateAvailability(); // Recalculate whenever dependencies change
  }, [roomTypeState, roomCounts, reservation, currentWeekIndex]);

  // Funções para navegar entre as semanas
  const goToPreviousWeek = () => {
    let newToday = today;
    let newIndex = currentWeekIndex - 1;

    if (currentWeekIndex === 0) {
      newToday = today.subtract(1, 'month');
      const newWeeks = generateDate(newToday.month(), newToday.year());
      newIndex = newWeeks.length - 1;  // Vá para a última semana do mês anterior
      setWeeks(newWeeks);  // Atualize weeks
    }

    setToday(newToday);
    setCurrentWeekIndex(newIndex);
    updateAvailability(); // Atualize a disponibilidade quando a semana mudar
  };

  const goToNextWeek = () => {
    let newToday = today;
    let newIndex = currentWeekIndex + 1;

    if (currentWeekIndex === weeks.length - 1) {
      newToday = today.add(1, 'month');
      const newWeeks = generateDate(newToday.month(), newToday.year());
      newIndex = 0;  // Vá para a primeira semana do próximo mês
      setWeeks(newWeeks);  // Atualize weeks
    }

    setToday(newToday);
    setCurrentWeekIndex(newIndex);
    updateAvailability(); // Atualize a disponibilidade quando a semana mudar
  };


  const goToCurrentWeek = () => {
    const currentToday = dayjs();  // Pega a data atual
    setToday(currentToday);        // Atualiza o estado today para a data atual
    const newWeeks = generateDate(currentToday.month(), currentToday.year());  // Regenera as semanas para o mês atual
    setWeeks(newWeeks);

    // Calcula o índice da semana atual dentro do mês
    const startOfMonth = currentToday.startOf('month');
    const daysSinceStartOfMonth = currentToday.diff(startOfMonth, 'day');
    const currentWeekIndex = Math.floor(daysSinceStartOfMonth / 7);

    setCurrentWeekIndex(currentWeekIndex);  // Atualiza o índice da semana
    updateAvailability();  // Atualiza a disponibilidade
  };


  const handleMouseDown = (date) => {
    setDragStart(date);
    setIsDragging(true);
  };

  const handleMouseOver = (date) => {
    if (isDragging) {
      setDragEnd(date);
    }
  };

  const handleMouseUp = (date) => {
    if (isDragging && dragStart) {
      const startDate = dayjs(dragStart).format('YYYY-MM-DD');
      const endDate = dayjs(date).format('YYYY-MM-DD');
      setReservationRange({ start: startDate, end: endDate });
      setShowModal(true);
      setIsDragging(false);
      setDragStart(null);
    }
  };

  return (
    <div className='w-full'>
      <div className='flex justify-between'>
        <h1 className='text-sm'>{months[today.month()]}, {today.year()}</h1>
        <div className='flex items-center gap-5'>
          <GrFormPrevious className='w-5 h-5 cursor-pointer' onClick={goToPreviousWeek} />
          <p className='cursor-pointer' onClick={goToCurrentWeek}>Today</p>
          <GrFormNext className='w-5 h-5 cursor-pointer' onClick={goToNextWeek} />
        </div>
      </div>
      <table className='w-[100%]'>
        <thead>
          <tr>
            <th className='w-[20%] bg-tableCol text-left px-4'><b>Tipologias</b></th>
            {weeks[currentWeekIndex].map((day, index) => (
              <th key={index} className={`h-14 ${day.date.day() === 0 || day.date.day() === 6 ? "bg-tableColWeekend" : "bg-tableCol"}`}>
                <div className='flex flex-col justify-center text-center'>
                  <span className="text-xs text-gray-400">{daysOfWeek[day.date.day()]}</span>
                  <span className='text-sm'>{day.date.format('DD.MM.YYYY')}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {roomTypeState.map(roomType => (
            <tr key={roomType.roomTypeID}>
              <td className='flex justify-between px-4'>
                <span>{roomType.name}</span>
                <span>{roomCounts[roomType.roomTypeID] || 0}</span>
              </td>
              {weeks[currentWeekIndex].map((day, index) => (
                <td key={index} className={`text-center ${day.date.day() === 0 || day.date.day() === 6 ? "bg-tableColWeekend" : ""}`}
                  onMouseDown={() => handleMouseDown(day.date)}
                  onMouseOver={() => handleMouseOver(day.date)}
                  onMouseUp={() => handleMouseUp(day.date)}>
                  {availability[roomType.roomTypeID]?.[day.date.format('YYYY-MM-DD')] || 'N/A'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <ReservationsForm
          formTypeModal={0}
          buttonName={"Novo"}
          buttonIcon={<FiPlus size={15} />}
          editIcon={<FaCalendarAlt size={25} color="white" />}
          buttonColor={"primary"}
          modalHeader={"Inserir uma Reserva"}
          autoOpen={true}
        />
      )}
    </div>
  );
}





