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
  const [selectionInfo, setSelectionInfo] = useState({ roomTypeID: null, dates: [] });
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


  const handleMouseDown = (date, roomTypeID) => {
    setSelectionInfo({ roomTypeID, dates: [date.format('YYYY-MM-DD')] });
    setIsDragging(true);
  };

  const handleMouseOver = (date) => {
    if (isDragging && selectionInfo.roomTypeID) {
      const newDates = [...selectionInfo.dates];
      if (!newDates.includes(date.format('YYYY-MM-DD'))) {
        newDates.push(date.format('YYYY-MM-DD'));
      }
      setSelectionInfo(prev => ({ ...prev, dates: newDates }));
    }
  };

  const handleMouseUp = (date) => {
    if (isDragging) {
      setIsDragging(false);
      setShowModal(true);
      // Limpar seleção após o uso
      setSelectionInfo({ roomTypeID: null, dates: [] });
    }
  };

  const setCurrentWeekToCurrentDate = () => {
    const currentToday = dayjs();  // Pega a data atual
    const newWeeks = generateDate(currentToday.month(), currentToday.year());  // Regenera as semanas para o mês atual
    setWeeks(newWeeks);
    setToday(currentToday);

    // Calcula o índice da semana atual dentro do mês
    const startOfMonth = currentToday.startOf('month');
    const daysSinceStartOfMonth = currentToday.diff(startOfMonth, 'day');
    const newCurrentWeekIndex = Math.floor(daysSinceStartOfMonth / 7);

    setCurrentWeekIndex(newCurrentWeekIndex);  // Atualiza o índice da semana
  };

  return (
    <div className='w-full'>
<div className='bg-primary-600 py-5'>
      <div className='flex justify-between'>
        <p className='text-ml text-white px-4'><b>Agenda de Tipologias</b></p>
        {/*<h1 className='text-sm'>{months[today.month()]}, {today.year()}</h1>*/}
        <div className='flex items-center gap-5'>
          <GrFormPrevious className='w-5 h-5 cursor-pointer text-white' onClick={goToPreviousWeek} />
          <p className='cursor-pointer text-white' onClick={goToCurrentWeek}>Today</p>
          <GrFormNext className='w-5 h-5 cursor-pointer text-white' onClick={goToNextWeek} />
        </div>
      </div>
      </div>
      <table className='w-[100%] bg-tableCol'>
        <thead>
          <tr>
            {/*CABEÇALHO DA TABELA C/ FORMATAÇÃO DE DATA */}
            <th className='w-[15%] bg-tableCol text-left px-4'>Tipologias</th>
            {weeks[currentWeekIndex].map((day, index) => (
              <td key={index} className={`h-14 border-tableCol border-l-3 border-r-3 border-b-2 ${day.date.day() === 0 || day.date.day() === 6 ? "bg-tableColWeekend" : "bg-lightBlueCol"} select-none 
              ${day.date.isSame(today, 'day') ? "bg-primary bg-opacity-30" : ""} select-none`}>
                <div className='flex flex-col justify-center text-center'>
                  <span className="text-xs text-gray-400">{daysOfWeek[day.date.day()]}</span>
                  <span className='text-xs font-bold'>{day.date.format('DD.MM.YYYY')}</span>
                </div>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {/*EXIBE AS TIPOLOGIAS E O NRM DE QUARTOS ASSOCIADOS A CADA UMA */}
          {roomTypeState.map(roomType => (
            <tr key={roomType.roomTypeID}>
              <td className='text-sm w-full h-8 flex justify-between items-center px-4 border-b-2 bg-white'>
                <span>{roomType.name}</span>
                <span>{roomCounts[roomType.roomTypeID] || 0}</span>
              </td>
              {/*CALCULA A DIFERENÇA ENTRE OS QUARTOS JA RESERVADOS E OS LIVRES PARA EXIBIR O NRM DE QUARTOS DISPONIVEIS */}
              {weeks[currentWeekIndex].map((day, index) => {
                const availableRooms = availability[roomType.roomTypeID]?.[day.date.format('YYYY-MM-DD')] || 0;
                const occupiedRooms = (roomCounts[roomType.roomTypeID] || 0) - availableRooms;

                return (
                  <td
                    key={index}
                    className={`text-center text-sm border-l-3 border-r-3 border-b-2 rounded-lg ${(day.date.day() === 0 || day.date.day() === 6) ? "bg-lightBlueCol" : (day.date.isSame(today, 'day') ? "bg-primary bg-opacity-30" : "bg-white")
                      } ${selectionInfo.roomTypeID === roomType.roomTypeID && selectionInfo.dates.includes(day.date.format('YYYY-MM-DD')) ? "border-3 border-blue-600 rounded-lg" : ""
                      } 
                    select-none`}
                    onMouseDown={() => handleMouseDown(day.date, roomType.roomTypeID)}
                    onMouseOver={() => handleMouseOver(day.date)}
                    onMouseUp={() => handleMouseUp(day.date)}>
                    {availableRooms}
                  </td>
                );

              })}
            </tr>
          ))}
          <tr>
            {/*LINHA SEPARADORA DA GRELHA */}
            <td className='text-sm w-full h-8 flex justify-between items-center px-4 border-b-2 bg-white'></td>
            {weeks[currentWeekIndex].map((day, index) => {
              return (
                <td
                  className={`text-center text-sm border-l-3 border-r-3 border-b-2 rounded-lg 
                ${(day.date.day() === 0 || day.date.day() === 6) ? "bg-lightBlueCol" : (day.date.isSame(today, 'day') ? "bg-primary bg-opacity-30" : "bg-white")
                    }`}></td>
              );
            })}
          </tr>
          <tr>
            {/*DAY USE LINHA */}
            <td className='text-sm w-full h-8 flex justify-between items-center px-4 border-b-2 bg-white'>
              <span>Day Use</span>
            </td>
            {weeks[currentWeekIndex].map((day, index) => {
              return (
                <td
                  className={`text-center text-sm border-l-3 border-r-3 border-b-2 rounded-lg 
                ${(day.date.day() === 0 || day.date.day() === 6) ? "bg-lightBlueCol" : (day.date.isSame(today, 'day') ? "bg-primary bg-opacity-30" : "bg-white")
                    }`}>0</td>
              );
            })}
          </tr>
          <tr>
            {/*CALCULA O NRM DE QUARTOS DISPONIVEIS*/}
            <td className='text-sm w-full h-8 flex justify-between items-center px-4 border-b-2 bg-white'>
              <span>Total Available</span>
            </td>
            {weeks[currentWeekIndex].map((day, index) => {
              const totalAvailable = roomTypeState.reduce((acc, roomType) => {
                return acc + (availability[roomType.roomTypeID]?.[day.date.format('YYYY-MM-DD')] || 0);
              }, 0);
              return (
                <td
                  key={index}
                  className={`text-center text-sm border-l-3 border-r-3 border-b-2 rounded-lg 
                  ${(day.date.day() === 0 || day.date.day() === 6) ? "bg-lightBlueCol" : (day.date.isSame(today, 'day') ? "bg-primary bg-opacity-30" : "bg-white")
                    }`}
                >
                  {totalAvailable}
                </td>
              );
            })}
          </tr>
          <tr>
            {/*TOTAL OVERBOOKING */}
            <td className='text-sm w-full h-8 flex justify-between items-center px-4 border-b-2 bg-white'>
              <span>Total Overbooking</span>
            </td>
            {weeks[currentWeekIndex].map((day, index) => {
              return (
                <td
                  className={`text-center text-sm border-l-3 border-r-3 border-b-2 rounded-lg 
                ${(day.date.day() === 0 || day.date.day() === 6) ? "bg-lightBlueCol" : (day.date.isSame(today, 'day') ? "bg-primary bg-opacity-30" : "bg-white")
                    }`}>0</td>
              );
            })}
          </tr>
          <tr>
            {/*ALLOT - NON DED/NOT PU */}
            <td className='text-sm w-full h-8 flex justify-between items-center px-4 border-b-2 bg-white'>
              <span>Allot - Non Ded/Not Pu</span>
            </td>
            {weeks[currentWeekIndex].map((day, index) => {
              return (
                <td
                  className={`text-center text-sm border-l-3 border-r-3 border-b-2 rounded-lg 
                ${(day.date.day() === 0 || day.date.day() === 6) ? "bg-lightBlueCol" : (day.date.isSame(today, 'day') ? "bg-primary bg-opacity-30" : "bg-white")
                    }`}>0</td>
              );
            })}
          </tr>
          <tr>
            {/*ALLOT - NON DED/PU */}
            <td className='text-sm w-full h-8 flex justify-between items-center px-4 border-b-2 bg-white'>
              <span>Allot - Non Ded/Pu</span>
            </td>
            {weeks[currentWeekIndex].map((day, index) => {
              return (
                <td
                  className={`text-center text-sm border-l-3 border-r-3 border-b-2 rounded-lg 
                ${(day.date.day() === 0 || day.date.day() === 6) ? "bg-lightBlueCol" : (day.date.isSame(today, 'day') ? "bg-primary bg-opacity-30" : "bg-white")
                    }`}>0</td>
              );
            })}
          </tr>
          <tr>
            {/*ALLOT - DEDUCT/NOT PU */}
            <td className='text-sm w-full h-8 flex justify-between items-center px-4 border-b-2 bg-white'>
              <span>Allot - Deduct/Not Pu</span>
            </td>
            {weeks[currentWeekIndex].map((day, index) => {
              return (
                <td
                  className={`text-center text-sm border-l-3 border-r-3 border-b-2 rounded-lg 
                ${(day.date.day() === 0 || day.date.day() === 6) ? "bg-lightBlueCol" : (day.date.isSame(today, 'day') ? "bg-primary bg-opacity-30" : "bg-white")
                    }`}>0</td>
              );
            })}
          </tr>
          <tr>
            {/*ALLOT - DEDUCT/PU */}
            <td className='text-sm w-full h-8 flex justify-between items-center px-4 border-b-2 bg-white'>
              <span>Allot - Deduct/Pu</span>
            </td>
            {weeks[currentWeekIndex].map((day, index) => {
              return (
                <td
                  className={`text-center text-sm border-l-3 border-r-3 border-b-2 rounded-lg 
                ${(day.date.day() === 0 || day.date.day() === 6) ? "bg-lightBlueCol" : (day.date.isSame(today, 'day') ? "bg-primary bg-opacity-30" : "bg-white")
                    }`}>0</td>
              );
            })}
          </tr>
          <tr>
            {/*OUT OF ORDER*/}
            <td className='text-sm w-full h-8 flex justify-between items-center px-4 border-b-2 bg-white'>
              <span>Out of Order</span>
            </td>
            {weeks[currentWeekIndex].map((day, index) => {
              return (
                <td
                  className={`text-center text-sm border-l-3 border-r-3 border-b-2 rounded-lg 
                ${(day.date.day() === 0 || day.date.day() === 6) ? "bg-lightBlueCol" : (day.date.isSame(today, 'day') ? "bg-primary bg-opacity-30" : "bg-white")
                    }`}>0</td>
              );
            })}
          </tr>
          <tr>
            {/*OPTION - DEDUCT*/}
            <td className='text-sm w-full h-8 flex justify-between items-center px-4 border-b-2 bg-white'>
              <span>Option - Deduct</span>
            </td>
            {weeks[currentWeekIndex].map((day, index) => {
              return (
                <td
                  className={`text-center text-sm border-l-3 border-r-3 border-b-2 rounded-lg 
                ${(day.date.day() === 0 || day.date.day() === 6) ? "bg-lightBlueCol" : (day.date.isSame(today, 'day') ? "bg-primary bg-opacity-30" : "bg-white")
                    }`}>0</td>
              );
            })}
          </tr>
          <tr>
            {/*OPTION - NON DEDUCT*/}
            <td className='text-sm w-full h-8 flex justify-between items-center px-4 border-b-2 bg-white'>
              <span>Option - Non Deduct</span>
            </td>
            {weeks[currentWeekIndex].map((day, index) => {
              return (
                <td
                  className={`text-center text-sm border-l-3 border-r-3 border-b-2 rounded-lg 
                ${(day.date.day() === 0 || day.date.day() === 6) ? "bg-lightBlueCol" : (day.date.isSame(today, 'day') ? "bg-primary bg-opacity-30" : "bg-white")
                    }`}>0</td>
              );
            })}
          </tr>
          <tr>
            {/*CONFIRMED - DEDUCT*/}
            <td className='text-sm w-full h-8 flex justify-between items-center px-4 border-b-2 bg-white'>
              <span>Confirmed - Deduct</span>
            </td>
            {weeks[currentWeekIndex].map((day, index) => {
              return (
                <td
                  className={`text-center text-sm border-l-3 border-r-3 border-b-2 rounded-lg 
                ${(day.date.day() === 0 || day.date.day() === 6) ? "bg-lightBlueCol" : (day.date.isSame(today, 'day') ? "bg-primary bg-opacity-30" : "bg-white")
                    }`}>0</td>
              );
            })}
          </tr>
          <tr>
            {/*CALCULA O NRM DE QUARTOS FISICOS DISPONIVEIS*/}
            <td className='text-sm w-full h-8 flex justify-between items-center px-4 border-b-2 bg-white'>
              <span>Physically Available</span>
            </td>
            {weeks[currentWeekIndex].map((day, index) => {
              const totalAvailable = roomTypeState.reduce((acc, roomType) => {
                return acc + (availability[roomType.roomTypeID]?.[day.date.format('YYYY-MM-DD')] || 0);
              }, 0);
              return (
                <td
                  key={index}
                  className={`text-center text-sm border-l-3 border-r-3 border-b-2 rounded-lg 
                  ${(day.date.day() === 0 || day.date.day() === 6) ? "bg-lightBlueCol" : (day.date.isSame(today, 'day') ? "bg-primary bg-opacity-30" : "bg-white")
                    }`}
                >
                  {totalAvailable}
                </td>
              );
            })}
          </tr>
          <tr>
            {/*
            CALCULA A % DE QUARTOS JÁ OCUPADOS
            O% - TODOS OS QUARTOS LIVRES | 100% - TODOS OS QUARTOS OCUPADOS
            */}
            <td className='text-sm w-full h-8 flex justify-between items-center px-4 border-b-2 bg-white'>
              <span>Ocupação %</span>
            </td>
            {weeks[currentWeekIndex].map((day, index) => {
              const totalAvailableRooms = roomTypeState.reduce((acc, roomType) => {
                return acc + (availability[roomType.roomTypeID]?.[day.date.format('YYYY-MM-DD')] || 0);
              }, 0);
              const totalOccupiedRooms = roomTypeState.reduce((acc, roomType) => {
                const availableRooms = availability[roomType.roomTypeID]?.[day.date.format('YYYY-MM-DD')] || 0;
                const occupiedRooms = (roomCounts[roomType.roomTypeID] || 0) - availableRooms;
                return acc + occupiedRooms;
              }, 0);
              const dailyOccupancyPercentage = totalAvailableRooms > 0 ? Math.round((totalOccupiedRooms / totalAvailableRooms) * 100) : 0;

              return (
                /*
                PINTA A CELULA DE ACORDO COM A %
                VERDE 0 A 49
                AMARELO 50 A 69
                VERMELHO 70 A 100
                */
                <td
                  key={index}
                  className={`text-center text-sm border-l-3 border-r-3 border-b-2 rounded-lg 
                  ${dailyOccupancyPercentage <= 49 ? "bg-green bg-opacity-30" : ""} 
                  ${dailyOccupancyPercentage >= 50 && dailyOccupancyPercentage <= 69 ? "bg-yellow-100" : ""} 
                  ${dailyOccupancyPercentage >= 70 ? "bg-red-200" : ""} 
                  border-tableCol select-none`}>
                  {dailyOccupancyPercentage}%
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
      {/*EXIBE O FORM AO SELECIONAR CELULAS */}
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