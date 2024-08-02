"use client";
import React, { useState, useEffect } from 'react';
import { generateDate, months, daysOfWeek } from '@/app/util/tipologyPlan/week/weekcalendar';
import dayjs from 'dayjs';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import axios from 'axios';

import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';

//imports de componentes
import ReservationsForm from '@/components/modal/frontOffice/reservations/multiReservations/page';
import InputFieldControlled from '@/components/functionsForm/inputs/typeText/page';
import IndividualForm from "@/components/modal/frontOffice/clientForm/individuals/page";
import CompanyForm from "@/components/modal/frontOffice/clientForm/companies/page";
import TravelGroupForm from "@/components/modal/frontOffice/clientForm/travelAgency/page";
import GroupForm from "@/components/modal/frontOffice/clientForm/groups/page";
import OthersForm from "@/components/modal/frontOffice/clientForm/others/page";
import CountryAutocomplete from "@/components/functionsForm/autocomplete/country/page";
import HeaderAutocomplete from "@/components/functionsForm/autocomplete/priceDescriptionHeader/page";
import { FaPerson } from "react-icons/fa6";
import { FaRegPlusSquare } from "react-icons/fa";
import { FiMinusSquare } from "react-icons/fi";

import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem
} from "@nextui-org/autocomplete";
import { BiSolidPencil } from "react-icons/bi";
import { FiPlus, FiX } from 'react-icons/fi';
import { FaCalendarAlt, FaRegTrashAlt, FaRegUserCircle, FaBed } from 'react-icons/fa';
import { FaPlus, FaMinus } from "react-icons/fa";
import Modal from '@/components/modal/confirmationBoxs/page';

import { MdOutlineZoomOut } from "react-icons/md";

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import { Popover, PopoverTrigger, PopoverContent, Button, Input } from "@nextui-org/react";
import { getMonth } from 'date-fns';

import { useTranslations } from 'next-intl';

// Configurando plugins
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

export default function CalendarPage() {

  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [expandedColumns, setExpandedColumns] = useState([]);

  // Função para alternar a expansão de colunas
  const toggleExpandIndexes = (index) => {
    if (expandedIndexes.includes(index)) {
      setExpandedIndexes(expandedIndexes.filter(i => i !== index));
      setExpandedColumns(expandedColumns.filter(c => c !== index));
    } else {
      setExpandedIndexes([...expandedIndexes, index]);
      setExpandedColumns([...expandedColumns, index]);
    }
  };

  const [today, setToday] = useState(dayjs());
  const [weeks, setWeeks] = useState(generateDate(today.month(), today.year()));
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [roomTypeState, setRoomTypeState] = useState([]);
  const [roomCounts, setRoomCounts] = useState({});
  const [reservation, setReservation] = useState([]);
  const [selectionInfo, setSelectionInfo] = useState({ roomTypeID: null, dates: [] }); //seleção de uma linha
  const [selectionRows, setSelectionRows] = useState({ roomTypeID: null, dates: [] }); //seleção de uma linha
  const [availability, setAvailability] = useState({});
  const [updatedAvailability, setUpdatedAvailability] = useState({});

  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [tipology, setTipology] = useState(null);
  const [rooms, setRooms] = useState([]);

  const [startDate2, setStartDate2] = useState(null);
  const [endDate2, setEndDate2] = useState(null);

  const [selectedDates, setSelectedDates] = useState([]);


  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedCells, setSelectedCells] = useState([]);
  const [cellsSelection, setCellsSelection] = useState([]);


  //FILTRO DE BOTOES
  const [showButton, setShowButton] = useState(false);

  const currentYear = dayjs().year();
  const currentMonth = dayjs().month();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const [totalOverbookings, setTotalOverbookings] = useState({});
  const [overbookings, setOverbookings] = useState({});

  const [finalSelectedCells, setFinalSelectedCells] = useState([]);

  const [ctrlPressed, setCtrlPressed] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);

  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [guestName, setGuestName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  const [query, setQuery] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isGuestNameValid, setIsGuestNameValid] = useState(false);
  const [selectedGuestId, setSelectedGuestId] = useState('');

  const [isSelecting, setIsSelecting] = useState(false);
  const [groupReservation, setRoomRevervation] = useState({}); // Estado para armazenar o número de quartos associados a cada tipo de quarto

  const [nights, setNights] = useState([]);

  const [typologyPrices, setTypologyPrices] = useState([]);
  const [pricesRoom, setPricesRoom] = useState([]);
  const [prices, setPrices] = useState([]);
  const [roomPrices, setRoomPrices] = useState([]);
  const [peopleCount, setPeopleCount] = useState(1);

  const [selectedHeaderID, setSelectedHeaderID] = useState({
    ID: ''
  });

  const t = useTranslations('Index');

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        // Fetch tipologies
        const resTipologies = await axios.get(`/api/v1/hotel/tipologys`);
        console.log("Tipologies Response:", resTipologies);
        const tipologies = resTipologies.data.response;

        // Fetch room counts
        let tempRoomCounts = {};
        await Promise.all(tipologies.map(async (tipology) => {
          const resRooms = await axios.get(`/api/v1/hotel/rooms/tipologys/${tipology.roomTypeID}`);
          tempRoomCounts[tipology.roomTypeID] = resRooms.data.response.length;
        }));
        console.log("Room Counts:", tempRoomCounts);

        // Fetch typology prices
        const resTypologyPrices = await axios.get(`/api/v1/prices/priceDescriptionPrices`);
        console.log("Typology Prices Response:", resTypologyPrices);
        const typologyPrices = resTypologyPrices.data.response;

        // Fetch room prices
        const resRoomPrices = await axios.get(`/api/v1/prices/priceDescriptionRooms`);
        console.log("Room Prices Response:", resRoomPrices);
        const price = resRoomPrices.data.response;

        // Update states together to avoid multiple re-renders
        setRoomTypeState(tipologies);
        setRoomCounts(tempRoomCounts);
        setPrices(typologyPrices);
        setRoomPrices(price);

        // Call updateAvailability after loading all data
        updateAvailability(typologyPrices, price);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    getData();
  }, []);


  useEffect(() => {
    // Atualizar o updatedAvailability sempre que o availability for atualizado
    setUpdatedAvailability(prev => {
      const newUpdatedAvailability = { ...prev };
      for (const roomTypeID in availability) {
        for (const date in availability[roomTypeID]) {
          newUpdatedAvailability[roomTypeID] = {
            ...newUpdatedAvailability[roomTypeID],
            [date]: availability[roomTypeID][date]
          };
        }
      }
      return newUpdatedAvailability;
    });
  }, [availability]);

  const updateAvailability = () => {
    let typologyPrices = {};
    let updateRoomPrices = {};
  
    // Determine o campo de preço baseado no número de pessoas
    const priceKey = `p${peopleCount}`;
    console.log("PORRA QUERO AS MINHAS FERIAS", priceKey)
    // Filtragem de preços de tipologia
    const filteredPrices = prices.filter(price => price.priceDescriptionHeaderID === 76);
  
    filteredPrices.forEach(price => {
      const typologyID = price.typologyID;
      const priceForPeopleCount = price[priceKey]; // Usa o preço correspondente ao número de pessoas
  
      if (!typologyPrices[typologyID]) {
        typologyPrices[typologyID] = {};
      }
  
      weeks[currentWeekIndex].forEach(day => {
        const dayFormat = day.date.format('YYYY-MM-DD');
        typologyPrices[typologyID][dayFormat] = priceForPeopleCount;
      });
    });
  
    // Filtragem de preços de quartos
    const filteredPricesRooms = roomPrices.filter(price => price.priceDescriptionHeaderID === 76);
  
    filteredPricesRooms.forEach(price => {
      const roomID = price.roomID;
      const priceForPeopleCountRoom = price[priceKey]; // Usa o preço correspondente ao número de pessoas
  
      if (!updateRoomPrices[roomID]) {
        updateRoomPrices[roomID] = {};
      }
  
      weeks[currentWeekIndex].forEach(day => {
        const dayFormat = day.date.format('YYYY-MM-DD');
        updateRoomPrices[roomID][dayFormat] = priceForPeopleCountRoom;
      });
    });
  
    setTypologyPrices(typologyPrices);
    setPricesRoom(updateRoomPrices);
  };

  useEffect(() => {
    if (roomTypeState.length && prices.length && roomPrices.length) {
      updateAvailability();
    }
  }, [roomTypeState, prices, roomPrices, currentWeekIndex, peopleCount]);

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
    setToday(currentToday);  // Atualiza o estado today para a data atual
    const newWeeks = generateDate(currentToday.month(), currentToday.year());  // Regenera as semanas para o mês atual
    setWeeks(newWeeks);

    // Calcula o índice da semana que contém o dia atual
    const startOfMonth = currentToday.startOf('month');
    const daysSinceStartOfMonth = currentToday.diff(startOfMonth, 'day');
    const currentWeekIndex = Math.floor(daysSinceStartOfMonth / 7);

    // Encontre a semana que contém o dia de hoje
    const weekIndex = newWeeks.findIndex(week =>
      week.some(day => day.date.isSame(currentToday, 'day'))
    );

    setCurrentWeekIndex(weekIndex);  // Atualiza o índice da semana
    updateAvailability();  // Atualiza a disponibilidade
  };

  // Função para lidar com a atualização do número de quartos associados a um determinado tipo de quarto
  const handleRoomCountUpdate = (roomTypeID, count) => {
    setRoomRevervation(prevCounts => ({
      ...prevCounts,
      [roomTypeID]: count
    }));
    console.log(`Número de quartos atualizado para o tipo de quarto ${roomTypeID}: ${count}`);
  };

  //calcula o nrm de noites
  const calculateNights = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate - startDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleMouseDown = (date, roomTypeID, rowIndex, columnIndex) => {
    const formattedDate = date.format('YYYY-MM-DD');
    setSelectionInfo({ roomTypeID, dates: [formattedDate] });
    setIsDragging(true);
    setIsSelecting(true);
    setStartDate(formattedDate);
    setSelectedRow(rowIndex);
    setSelectedColumn(columnIndex); // Define a coluna selecionada
    setSelectedCells([{ row: rowIndex, column: columnIndex }]);
    const newSelectedCell = { row: rowIndex, column: columnIndex, date };
    setCellsSelection([...cellsSelection, newSelectedCell]);
    if (ctrlPressed) {
      setSelectionInfo(prev => ({
        roomTypeID: prev.roomTypeID,
        dates: [...prev.dates, formattedDate]
      }));
      setStartDate2(formattedDate);
    }
  };

  const handleMouseOver = (date, rowIndex, columnIndex) => {
    if (isDragging && selectionInfo.roomTypeID) {
      setTipology(selectionInfo.roomTypeID);
      const formattedDate = date.format('YYYY-MM-DD');
      setSelectedCells(prevCells => [...prevCells, { row: rowIndex, column: columnIndex }]);
      if (!selectionInfo.dates.includes(formattedDate)) {
        setSelectionInfo(prev => ({
          ...prev,
          dates: [...prev.dates, formattedDate]
        }));
      }
      setSelectedRow(rowIndex); // Atualiza a linha selecionada
      setSelectedColumn(columnIndex); // Atualiza a coluna selecionada
    }
  };

  const handleMouseUp = (date) => {
    if (isDragging) {
      setIsDragging(false);
      setShowModal(true);
      setFinalSelectedCells(selectedCells);
      const formattedDate = date.format('YYYY-MM-DD');
      const selectedTipology = roomTypeState.find(t => t.roomTypeID === selectionInfo.roomTypeID);
      const tipologyName = selectedTipology ? selectedTipology.name : '';
      const tipologyID = selectedTipology ? selectedTipology.roomTypeID : '';
      // Extrair o segundo número (valor) do objeto groupReservation
      const groupNumber = Object.values(groupReservation)[0] || '';

      // Calcular o número de noites
      const numberNights = calculateNights(startDate, formattedDate);
      setNights(numberNights);

      if (ctrlPressed) {
        // Se a tecla Ctrl está pressionada, defina startDate2 e endDate2
        setEndDate2(date.format('YYYY-MM-DD'), () => {
          // O estado endDate2 foi atualizado, agora você pode acessá-lo com segurança
          setSelectedDates((prevDates) => [...prevDates,
          { start: startDate, end: formattedDate, tipologyName, tipologyID, groupNumber, numberNights },
          { start: startDate2, end: formattedDate, tipologyName, tipologyID, groupNumber, numberNights },
          ]);
        });
      } else {
        // Se a tecla Ctrl não está pressionada, defina startDate e endDate
        setEndDate(date.format('YYYY-MM-DD'));
        // Usar o estado anterior para garantir que endDate tenha o valor atualizado
        setSelectedDates((prevDates) => [...prevDates, { start: startDate, end: formattedDate, tipologyName, tipologyID, groupNumber, numberNights }]);
      }

      // Limpar seleção após o uso
      setSelectionInfo({ roomTypeID: null, dates: [] });
    }
  };


  useEffect(() => {
    if (!isDragging && startDate && endDate) {
      console.log("Data de início:", startDate);
      console.log("Data de fim:", endDate);
      console.log("Tipologia:", tipology);
    }
  }, [isDragging, startDate, endDate, tipology]);

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


  // Função para lidar com o pressionamento da tecla Ctrl
  const handleKeyDown = (event) => {
    if (event.key === 'Control') {
      setCtrlPressed(true);
    }
  };

  // Função para lidar com a liberação da tecla Ctrl
  const handleKeyUp = (event) => {
    if (event.key === 'Control') {
      setCtrlPressed(false);
    }
  };

  // Adicionando event listeners quando o componente é montado
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Removendo event listeners quando o componente é desmontado
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Função para lidar com a seleção da linha
  const handleRowSelection = (rowIndex) => {
    const filteredCells = selectedCells.filter(cell => cell.row === rowIndex);
    setSelectedCells(filteredCells);
  };

  const removeEvent = (index) => {
    const updatedSelectedDates = [...selectedDates];
    updatedSelectedDates.splice(index, 1);
    setSelectedDates(updatedSelectedDates);
  };

  const updateDateRange = (index, field, value) => {
    const updatedDates = [...selectedDates];
    updatedDates[index][field] = value;
    setSelectedDates(updatedDates);
  };

  const handleInputChange = (event) => {
    setGuestName(event.target.value);
    setSearchTerm(event.target.value);
    setIsGuestNameValid(query.some(item => `${item.firstName} ${item.secondName}` === event.target.value));
  };




  useEffect(() => {
    const getData = async () => {
      if (!dataFetched) {
        setIsLoading(true);
        try {
          const res = await axios.get("/api/v1/frontOffice/clientForm/individuals");
          const namesArray = res.data.response
            .map(item => ({
              id: item.guestProfileID,
              secondName: item.secondName,
              firstName: item.firstName
            }))
            .filter(item => item.secondName !== '' && item.firstName !== '');
          setQuery(namesArray);
          setDataFetched(true);
        } catch (error) {
          console.error("Erro ao encontrar as fichas de cliente:", error.message);
        } finally {
          setIsLoading(false);
        }
      }
    }
    getData();
  }, [dataFetched]);

  const handleNameSelect = (selectedName, id) => {
    setGuestName(selectedName);
    setSelectedGuestId(id);
    setSearchTerm('');
    setIsGuestNameValid(filteredResults.some(item => `${item.firstName} ${item.secondName}` === selectedName));
  };

  useEffect(() => {
    console.log("Selected Guest ID:", selectedGuestId);
  }, [selectedGuestId]);

  const filteredResults = query.filter(item => {
    const fullName = `${item.firstName} ${item.secondName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  /*const formatDateToDisplay = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  const formatDateToInput = (dateString) => {
    const [day, month, year] = dateString.split('-');
    return `20${year}-${month}-${day}`;
  };

  const handleDateChange = (index, field, value) => {
    const formattedDate = formatDateToInput(value);
    updateDateRange(index, field, formattedDate);
  };*/

  const showAlert = (message) => {
    alert(message);
  };

  const handleYearChange = (action) => {
    let newYear;
    if (action === 'increment') {
      newYear = selectedYear + 1;
    } else if (action === 'decrement') {
      newYear = selectedYear - 1;
    }

    setSelectedYear(newYear);

    // Atualiza a data para o primeiro dia do novo ano e mês atual
    const newToday = dayjs().year(newYear).month(selectedMonth).date(1);
    setToday(newToday);

    // Regenera as semanas para o novo ano e mês
    const newWeeks = generateDate(newToday.month(), newToday.year());
    setWeeks(newWeeks);

    // Atualiza o índice da semana para a primeira semana do novo mês e ano
    setCurrentWeekIndex(0);

    updateAvailability(); // Atualiza a disponibilidade
  };

  const handleMonthChange = (month) => {
    const newMonth = parseInt(month, 10);
    setSelectedMonth(newMonth);

    // Atualiza a data para o primeiro dia do novo mês e ano atual
    const newToday = dayjs().year(selectedYear).month(newMonth).date(1);
    setToday(newToday);

    // Regenera as semanas para o novo mês e ano
    const newWeeks = generateDate(newToday.month(), newToday.year());
    setWeeks(newWeeks);

    // Atualiza o índice da semana para a primeira semana do novo mês e ano
    setCurrentWeekIndex(0);

    updateAvailability(); // Atualiza a disponibilidade
  };

  // useEffect para atualizar os dados quando o mês ou o ano é alterado
  useEffect(() => {
    const newToday = dayjs().year(selectedYear).month(selectedMonth).date(1);
    setToday(newToday);

    const newWeeks = generateDate(newToday.month(), newToday.year());
    setWeeks(newWeeks);

    // Atualiza o índice da semana para a primeira semana do novo mês e ano
    setCurrentWeekIndex(0);

    updateAvailability(); // Atualiza a disponibilidade
  }, [selectedYear, selectedMonth]);  // Executa o efeito quando selectedYear ou selectedMonth mudar

  const handleZoomOutClick = () => {
    window.location.href = '/homepage/frontOffice/tipology_Plan/zoom_out';
  }

  // Aumento de pessoas 
  const increasePeople = () => {
    if (peopleCount < 6) {
      setPeopleCount(prevCount => {
        const newCount = prevCount + 1;
        console.log("P", newCount);
        return newCount;
      });
    }
  };
  
  // Diminuição de pessoas
  const decreasePeople = () => {
    if (peopleCount > 1) {
      setPeopleCount(prevCount => {
        const newCount = prevCount - 1;
        console.log("P", newCount);
        return newCount;
      });
    }
  };

  useEffect(() => {
    const fetchRoomsData = async () => {
      try {
        const res = await axios.get("/api/v1/hotel/rooms");
        const filteredData = res.data.response.filter(
          (room) => room.label !== ""
        );
        setRooms(filteredData);
      } catch (error) {
        console.error("Error fetching rooms data:", error);
      }
    };
    fetchRoomsData();
  }, []);


//   const handleHeaderChange = (header) => {
//     if (header) {
//         setSelectedHeaderID(header.priceDescriptionHeaderID);
//     }
// };

const handleHeaderChange = (header) => {

  setSelectedHeaderID({
      ...selectedHeaderID,
      ID: header.priceDescriptionHeaderID,
  })
};

  return (
    <div className='w-full'>
      {showModal && (
        <>
          <div className='fixed top-0 right-0 bg-lightBlue h-screen w-[22%] z-10'>
            <div className='mt-20 px-4 text-black bg-white border border-gray-300 rounded-lg mx-2'>
              <div className='flex flex-row items-center justify-between flex-wrap'>
                <FaRegUserCircle size={20} className={guestName.trim() === '' ? 'text-red-500' : 'text-black'} />
                <InputFieldControlled
                  type={"text"}
                  id={"guestName"}
                  name={"guestName"}
                  label={t("frontOffice.plans.modals.guestName")}
                  ariaLabel={"Guest Name"}
                  style={"h-10 bg-transparent outline-none flex-grow "}
                  value={guestName}
                  onChange={handleInputChange}
                />
                <div className="flex-shrink-0">
                  <FaPlus
                    size={15}
                    color='blue'
                    className='cursor-pointer'
                    onClick={() => setShowButton(!showButton)}
                  />
                </div>
              </div>
              {/**AUTOCOMPLETE FEITO POR MUAH - pesquisa através de API */}
              {searchTerm && (
                <ul>
                  {filteredResults.map((item, index) => (
                    <li key={item.id} onClick={() => handleNameSelect(item.firstName + ' ' + item.secondName, item.id)}>
                      {item.firstName} {item.secondName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* FILTROS PARA TIPOS DE GUEST FORMS */}
            {showButton && (
              <div className="flex flex-col justify-center items-center mt-2 gap-2 px-4">
                <p className='text-xs text-gray-500'>{t("frontOffice.plans.modals.guestDetails")}</p>
                <div className='flex flex-row gap-2'>
                  <IndividualForm
                    buttonName={t("frontOffice.frontOffice.individualCard")}
                    buttonColor={"transparent"}
                    buttonClass={"h-5 w-[6rem] px-1 rounded-2xl bg-gray-300 text-xs text-black border-2 border-gray-400 hover:bg-blue-600 hover:border-blue-600 hover:text-white"}
                    formTypeModal={0}
                  />
                  <CompanyForm
                    buttonName={t("frontOffice.frontOffice.businessCard")}
                    buttonColor={"transparent"}
                    buttonClass={"h-5 w-[6rem] px-1 rounded-2xl bg-gray-300 text-xs text-black border-2 border-gray-400 hover:bg-blue-600 hover:border-blue-600 hover:text-white"}
                    formTypeModal={0}
                  />
                  <GroupForm
                    buttonName={t("frontOffice.frontOffice.groupsCard")}
                    buttonColor={"transparent"}
                    buttonClass={"h-5 w-[6rem] px-1 rounded-2xl bg-gray-300 text-xs text-black border-2 border-gray-400 hover:bg-blue-600 hover:border-blue-600 hover:text-white"}
                    formTypeModal={0}
                  />
                </div>
                <div className='flex flex-row gap-2'>
                  <TravelGroupForm
                    buttonName={t("frontOffice.frontOffice.travelAgencyCard")}
                    buttonColor={"transparent"}
                    buttonClass={"h-5 w-[7rem] px-1 rounded-2xl bg-gray-300 text-xs text-black border-2 border-gray-400 hover:bg-blue-600 hover:border-blue-600 hover:text-white"}
                    formTypeModal={0}
                  />
                  <OthersForm
                    buttonName={t("frontOffice.frontOffice.othersCard")}
                    buttonColor={"transparent"}
                    buttonClass={"h-5 w-[6rem] px-1 rounded-2xl bg-gray-300 text-xs text-black border-2 border-gray-400 hover:bg-blue-600 hover:border-blue-600 hover:text-white"}
                    formTypeModal={0}
                  />
                </div>
              </div>
            )}
            <div className='mt-20' style={{ maxHeight: 'calc(100% - 8rem)', overflowY: 'auto' }}>
              <p className='text-xs text-gray-500 px-4'>{t("frontOffice.plans.modals.reservationDetails")}</p>
              {selectedDates.map((dateRange, index) => (
                <div className={`bg-white border border-gray-300 text-sm px-4 py-1 rounded-lg mt-4 mx-2 ${index === selectedDates.length - 1 ? 'mb-10' : ''}`} key={index}>
                  <div className='flex flex-row items-center justify-between border-b-3 border-gray py-2'>
                    <div className='flex flex-row items-center gap-4'>
                      <FaBed className='' size={25} color='gray' />
                      <p className='text-ml'>{dateRange.tipologyName}</p>
                    </div>
                    <div>
                      <FaRegTrashAlt className="cursor-pointer" size={15} color={'gray'} onClick={() => removeEvent(index)} />
                    </div>
                  </div>
                  <div className='flex flex-row justify-around py-1'>
                    <div className="flex flex-col gap-2">
                      <label>{t("frontOffice.plans.modals.in")}</label>
                      <input
                        className='outline-none'
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => updateDateRange(index, 'start', e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label>{t("frontOffice.plans.modals.out")}</label>
                      <input
                        className='outline-none'
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => updateDateRange(index, 'end', e.target.value)}
                      />
                    </div>
                    <div className='flex flex-row justify-between items-center py-1'>
                      <p className='text-sm px-3 text-center'>N: {calculateNights(dateRange.start, dateRange.end)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='absolute bottom-0 w-full flex justify-center gap-40 p-4 bg-lightBlue'>
              <ReservationsForm
                formTypeModal={0}
                buttonName={t("frontOffice.plans.modals.reserve")}
                //buttonIcon={<FiPlus size={15} />}
                editIcon={<FaCalendarAlt size={25} color="white" />}
                buttonColor={"primary"}
                modalHeader={t("frontOffice.plans.modals.reservationHeader")}
                startDate={`${startDate}`}
                endDate={`${endDate}`}
                tipology={`${tipology}`}
                selectedDates={selectedDates}
                selectedRoomType={selectedRoomType}
                disabled={!isGuestNameValid}
                guestName={guestName}
                guestId={selectedGuestId}
              />
              <button
                className="text-sm"
                onClick={handleToggleModal}>{t("frontOffice.plans.modals.cancel")}</button>
            </div>
          </div>
        </>
      )}

      <div className={`bg-primary-600 ${showModal ? 'py-4' : 'py-2'}`}>
        <div className='flex justify-between items-center'>
          <div className='flex gap-20 items-center'>
            <p className='text-ml text-white px-4'><b>{t("priceManagement.priceTable.title")}</b></p>
            <HeaderAutocomplete className="w-5 text-white" label={t("priceManagement.priceTable.priceDescriptionHeader")} onChange={(value) => handleHeaderChange(value)} />
            <CountryAutocomplete label={t("priceManagement.priceTable.filters")} />
            <div className='flex items-center gap-2.5 pt-5'>
              <span className='text-white'><FaPerson size={27} /></span>
              <span className='text-white'> {peopleCount}</span>
              <div className='flex items-center gap-1.5'>
                {/* Aumentar ou diminuir as pessoas */}
                <span className='text-white' onClick={decreasePeople}><FiMinusSquare size={17} /></span>
                <span className='text-white' onClick={increasePeople}><FaRegPlusSquare size={17} /></span>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-5'>
            <MdOutlineZoomOut size={20} color='white' className='cursor-pointer' onClick={handleZoomOutClick} />
            {!showModal && (
              <Popover placement="bottom" showArrow offset={10}>
                <PopoverTrigger>
                  <Button color="transparent" className="">
                    <FaCalendarAlt
                      color='white'
                      size={15}
                      className='cursor-pointer'
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[250px]">
                  {(titleProps) => (
                    <div className="px-1 py-2 w-full">
                      <p className="text-small font-bold text-foreground" {...titleProps}>
                        {t("frontOffice.plans.modals.filter")}
                      </p>
                      <div className="mt-2 flex flex-col justify-around">
                        <div className="flex items-center justify-between">
                          <span className='text-center font-bold'>{selectedYear}</span>
                          <div className='flex flex-row gap-4'>
                            <button onClick={() => handleYearChange('decrement')} className='p-2'>
                              <IoIosArrowUp size={10} />
                            </button>
                            <button onClick={() => handleYearChange('increment')} className='p-2'>
                              <IoIosArrowDown size={10} />
                            </button>
                          </div>
                        </div>
                        {/**EXIBIÇÃO DOS MESES EM 3 COLUNAS E 4 LINHAS */}
                        <div className="mt-4 grid grid-cols-4 gap-2">
                          {months.map((month, index) => (
                            <button
                              key={index}
                              onClick={() => handleMonthChange(index)}
                              className={`p-2 text-center rounded-full w-12 h-12 hover:bg-primary`}
                            >
                              {month}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            )}
            <GrFormPrevious className='w-5 h-5 cursor-pointer text-white' onClick={goToPreviousWeek} />
            <p className='cursor-pointer text-white' onClick={goToCurrentWeek}>{t("frontOffice.plans.datatable.today")}</p>
            <GrFormNext className='w-5 h-5 cursor-pointer text-white' onClick={goToNextWeek} />
          </div>
        </div>
      </div>
      <table className='w-[100%] bg-tableCol'>
        <thead>
          <tr>
            {/*CABEÇALHO DA TABELA C/ FORMATAÇÃO DE DATA */}
            <th className='w-[15%] bg-tableCol text-left px-4'>{t("priceManagement.priceTable.rates")}</th>
            {weeks[currentWeekIndex].map((day, index) => (
              <td key={index} className={`w-[5%] h-14 border-tableCol border-l-3 border-r-3 border-b-2 ${day.date.day() === 0 || day.date.day() === 6 ? "bg-tableColWeekend" : "bg-lightBlueCol"} select-none
              ${day.date.isSame(today, 'day') ? "bg-primary bg-opacity-30" : ""} select-none`}>
                <div className='flex flex-col justify-center text-center'>
                  <span className="text-xs text-gray-400">{daysOfWeek[day.date.day()]}</span>
                  <span className='text-sm font-bold'>{day.date.format('DD')}</span>
                  <span className='text-xs text-gray-400'>{months[day.date.month()]}</span>
                </div>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {/*EXIBE AS TIPOLOGIAS E O NRM DE QUARTOS ASSOCIADOS A CADA UMA */}
          {roomTypeState.map((roomType, rowIndex) => (
            <React.Fragment key={roomType.roomTypeID}>
              <tr onClick={() => toggleExpandIndexes(rowIndex)}>
                <td className='text-xs w-full h-8 flex space-x-1 items-center px-4 border-b-2 bg-white'>
                  {expandedIndexes.includes(rowIndex) ? <FaMinus /> : <FaPlus />}
                  <span>{roomType.name}</span>
                </td>

                {weeks[currentWeekIndex].map((day, index) => {
                  const formattedDate = day.date.format('YYYY-MM-DD');
                  const typologyPrice = typologyPrices[roomType.roomTypeID]?.[formattedDate] || 'N/A'; //exibe os preços por tipologia na tabela
                  const isSelected = selectionInfo.roomTypeID === roomType.roomTypeID && selectionInfo.dates.includes(formattedDate);
                  const isCellSelected = selectedCells.some(cell => cell.row === rowIndex && cell.column === index);
                  return (
                    <td
                      key={index}
                      className={`text-center text-sm border-l-3 border-r-3 border-b-2 rounded-lg
                      ${(day.date.day() === 0 || day.date.day() === 6) ? "bg-lightBlueCol" : (day.date.isSame(today, 'day') ? "bg-primary bg-opacity-30" : "bg-white")}
                      ${isSelected ? "border-3 border-blue-600 rounded-lg" : ""}
                      ${finalSelectedCells.some(cell => cell.row === rowIndex && cell.column === index) ? "bg-blue-200" : ""}
                      select-none`}
                      onMouseDown={() => {
                        setIsSelecting(true);
                        handleMouseDown(day.date, roomType.roomTypeID, rowIndex, index);
                        setCellsSelection([...cellsSelection, { row: rowIndex, column: index, date: day.date }]);
                      }}
                      onMouseOver={() => {
                        if (isSelecting) {
                          handleMouseOver(day.date, rowIndex, index);
                          setCellsSelection([...cellsSelection, { row: rowIndex, column: index, date: day.date }]);
                        }
                      }}
                      onMouseUp={() => {
                        setIsSelecting(false);
                        handleMouseUp(day.date);
                      }}>
                      {typologyPrice}
                    </td>
                  );
                })}
              </tr>
              {expandedIndexes.includes(rowIndex) && (
                rooms.filter(room => room.roomType === roomType.roomTypeID).length > 0 ? (
                  rooms.filter(room => room.roomType === roomType.roomTypeID).map((room, roomIndex) => (
                    <tr key={roomIndex}>
                      {/*LINHA SEPARADORA DA GRELHA */}
                      <td className='text-xs w-full h-8 flex justify-between items-center px-4 border-b-2 bg-white'>
                        {room.label}
                      </td>
                      {weeks[currentWeekIndex].map((day, index) => {
                        const formattedDate = day.date.format('YYYY-MM-DD');
                        const roomPrice = pricesRoom[room.roomID]?.[formattedDate] || 'N/A'; //exibe os preços por tipologia na tabela
                        const isSelected = selectionInfo.roomTypeID === roomType.roomTypeID && selectionInfo.dates.includes(formattedDate);
                        const isCellSelected = selectedCells.some(cell => cell.row === rowIndex && cell.column === index);

                        return (
                          <td
                            key={index}
                            className={`text-center text-sm border-l-3 border-r-3 border-b-2 rounded-lg
                            ${(day.date.day() === 0 || day.date.day() === 6) ? "bg-lightBlueCol" : (day.date.isSame(today, 'day') ? "bg-primary bg-opacity-30" : "bg-white")}
                            ${isSelected ? "border-3 border-blue-600 rounded-lg" : ""}
                            ${finalSelectedCells.some(cell => cell.row === rowIndex && cell.column === index) ? "bg-blue-200" : ""}
                            select-none`}
                            onMouseDown={() => {
                              setIsSelecting(true);
                              handleMouseDown(day.date, roomType.roomTypeID, rowIndex, index);
                              setCellsSelection([...cellsSelection, { row: rowIndex, column: index, date: day.date }]);
                            }}
                            onMouseOver={() => {
                              if (isSelecting) {
                                handleMouseOver(day.date, rowIndex, index);
                                setCellsSelection([...cellsSelection, { row: rowIndex, column: index, date: day.date }]);
                              }
                            }}
                            onMouseUp={() => {
                              setIsSelecting(false);
                              handleMouseUp(day.date);
                            }}>
                            {roomPrice}
                          </td>
                        );
                      })}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={weeks[currentWeekIndex].length + 1} className="flex flex-row gap-8">
                      <div className="w-2" />
                      <p className="w-28">No rooms associated with this typology</p>
                    </td>
                  </tr>
                )
              )}
            </React.Fragment>
          ))}
          {/* <tr>
            <td className='text-xs w-full h-8 flex justify-between items-center px-4 border-b-2 bg-white'></td>
            {weeks[currentWeekIndex].map((day, index) => (
              <td
                key={index}
                className={`text-center text-sm border-l-3 border-r-3 border-b-2 rounded-lg
                ${(day.date.day() === 0 || day.date.day() === 6) ? "bg-lightBlueCol" : (day.date.isSame(today, 'day') ? "bg-primary bg-opacity-30" : "bg-white")}`}>
              </td>
            ))}
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}