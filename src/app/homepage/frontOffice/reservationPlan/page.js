"use client";
import React, { useState, useEffect } from 'react';
import { generateMonth, months, daysOfWeek } from '@/app/util/reservationPlan/weekcalendar';
import dayjs from 'dayjs';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import axios from 'axios';

import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';

//imports de componentes
import { FiPlus } from 'react-icons/fi';
import { FaCalendarAlt } from 'react-icons/fa';

// Configurando plugins
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

export default function CalendarPage() {
  const [today, setToday] = useState(dayjs());
  const [weeks, setWeeks] = useState(generateMonth(today.month(), today.year()));
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
        const resTipologies = await axios.get(`/api/v1/hotel/rooms`);
        const tipologies = resTipologies.data.response;
        setRoomTypeState(tipologies);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const updateAvailability = () => {
    let updatedAvailability = {};
    roomTypeState.forEach(roomType => {
      weeks.days.forEach(day => {
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
  }, [roomTypeState, roomCounts, reservation]);

  const goToPreviousMonth = () => {
    const newToday = today.subtract(1, 'month');
    setToday(newToday);
    setWeeks(generateMonth(newToday.month(), newToday.year())); // Atualize weeks para o novo mês
  };

  const goToNextMonth = () => {
    const newToday = today.add(1, 'month');
    setToday(newToday);
    setWeeks(generateMonth(newToday.month(), newToday.year())); // Atualize weeks para o novo mês
  };

  const goToCurrentMonth = () => {
    const currentToday = dayjs();  // Pega a data atual
    setToday(currentToday);        // Atualiza o estado today para a data atual
    setWeeks(generateMonth(currentToday.month(), currentToday.year()));  // Regenera as semanas para o mês atual
  };

  const handleMouseDown = (date) => {
    setDragStart(date);
    setDragEnd(date); // Reset dragEnd when starting a new drag
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
      setDragEnd(null);
      alert(`Intervalo selecionado: ${startDate} - ${endDate}`);
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragStart(null);
      setDragEnd(null);
    }
  };

  return (
    <div className='w-full' onMouseLeave={handleMouseLeave}>
      <div className='flex justify-between'>
        <h1 className='text-sm'>{months[today.month()]}, {today.year()}</h1>
        <div className='flex items-center gap-5'>
          <GrFormPrevious className='w-5 h-5 cursor-pointer' onClick={goToPreviousMonth} />
          <p className='cursor-pointer' onClick={goToCurrentMonth}>Today</p>
          <GrFormNext className='w-5 h-5 cursor-pointer' onClick={goToNextMonth} />
        </div>
      </div>
      <table className='w-[100%]'>
        <thead>
          <tr>
            <td className='w-[10%] bg-tableCol text-left px-4'><b>QUARTOS</b></td>
            {weeks.days.map((day, index) => (
              <th key={index} className={`h-14 ${day.date.day() === 0 || day.date.day() === 6 ? "bg-tableColWeekend" : "bg-tableCol"}`}>
                <div className='flex flex-col justify-center text-center'>
                  <span className="text-xs text-gray-400">{daysOfWeek[day.date.day()]}</span>
                  <span className='text-xs'>{day.date.format('DD')}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {roomTypeState.map(roomType => (
            <tr key={roomType.roomTypeID}>
              <td className='flex justify-between px-4'>
                <span>{roomType.label}</span>
              </td>
              {weeks.days.map((day, index) => (
                <td key={index} className={`text-center ${day.date.day() === 0 || day.date.day() === 6 ? "bg-tableColWeekend" : ""}`}
                  onMouseDown={() => handleMouseDown(day.date)}
                  onMouseOver={() => handleMouseOver(day.date)}
                  onMouseUp={() => handleMouseUp(day.date)}>
                  
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
