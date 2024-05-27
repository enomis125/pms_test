"use client";
import React, { useEffect, useState } from "react";
//import de axios para BD
import axios from "axios";
import {
  //imports de tabelas
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  //imports de dropdown menu
  Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem,
  //imports de inputs
  Input
} from "@nextui-org/react";

import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

//imports de icons
import { GoGear } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { FiEdit3 } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";
import { PiAirplaneLandingFill, PiAirplaneTakeoffFill } from "react-icons/pi";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlinePersonOff } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { FaClock } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

//imports de componentes
import ReservationsForm from "@/components/modal/frontOffice/reservations/page";
import PaginationTable from "@/components/table/paginationTable/paginationTable";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import CountryAutocomplete from "@/components/functionsForm/autocomplete/country/page";
import SearchModal from "@/components/modal/frontOffice/reservations/searchModal/searchClients/page";





export default function clientForm() {
  const handleDate30DaysLater = () => {
    const today = new Date();
    const next30Days = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000); // Adiciona 30 dias à data atual
    return next30Days.toISOString().slice(0, 10); // Retorna a data no formato ISO: YYYY-MM-DD
  }
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchValue, setSearchValue] = React.useState("");
  const [reservation, setReservation] = useState([]);
  const [reservationStatus, setReservationStatus] = useState([]);
  const [guestId, setGuestId] = useState([]);
  const [guestProfiles, setGuestProfiles] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().slice(0, 10)); // Data atual no formato ISO: YYYY-MM-DD
  const [startDate, setStartDate] = useState(currentDate); // Valor inicial é a data atual
  const [endDate, setEndDate] = useState(""); // Valor inicial é 30 dias a partir da data atual
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const [roomNumberFilter, setRoomNumberFilter] = useState("");
  const [lastNameFilter, setLastNameFilter] = useState("");
  const [firstNameFilter, setFirstNameFilter] = useState("");
  const [currentReservationStatus, setCurrentReservationStatus] = useState(null);


  useEffect(() => {
    setEndDate(handleDate30DaysLater());
  }, []);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleClick = () => {
    console.log("Filtrar Datas button clicked");
    setIsModalOpen(true);
  };

  const handleFilterSubmit = (start, end) => {
    setStartDate(start);
    setEndDate(end);

    // Filtrar as reservas com base nas datas de check-in e check-out
    const filteredReservations = reservation.filter((reservation) => {
      const checkInDate = new Date(reservation.checkInDate);
      const checkOutDate = new Date(reservation.checkOutDate);

      // Verificar se a reserva está dentro do intervalo de datas selecionado pelo usuário
      return checkInDate >= start && checkOutDate <= end;
    });

    // Atualizar o estado das reservas com os dados filtrados
    setFilteredReservations(filteredReservations);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/v1/frontOffice/reservations");
      const reservationsData = res.data.response;
      setReservation(reservationsData);
    };
    fetchData();
  }, []);

  const handleStatusChange = async (reservationID, newStatus) => {
    try {
      await axios.put("/api/v1/frontOffice/reservations/" + reservationID, {
        data: { reservationStatus: newStatus }
      });
      setCurrentReservationStatus(newStatus);
      // Outras operações, se necessário
    } catch (error) {
      console.error("Erro ao atualizar o status da reserva:", error.message);
    }
  };

  useEffect(() => {
    const newGuestIds = reservation.map(reservation => reservation.guestNumber);
    setGuestId(newGuestIds);
  }, [reservation]);

  console.log("Ids dos hóspedes:", guestId);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/v1/frontOffice/clientForm/individuals/" + guestId);
      const guestData = res.data.response;
      setGuestProfiles(guestData);
    };
    fetchData();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 0:
        return <FaClock size={28} />;
      case 1:
        return <PiAirplaneLandingFill size={28} />;
      case 2:
        return <PiAirplaneTakeoffFill size={28} />;
      case 3:
        return <ImCross size={28} />;
      case 4:
        return <MdOutlinePersonOff size={28} />;
      default:
        return "Status desconhecido";
    }
  };

  const filteredItems = React.useMemo(() => {
    if (!reservation || !Array.isArray(reservation)) {
      console.log("Sem dados de reserva disponíveis.");
      return [];
    }

    console.log("Filtrando dados de reserva...");

    const filteredReservations = reservation.filter((reservation) => {
      const checkInDate = new Date(reservation.checkInDate);
      const checkOutDate = new Date(reservation.checkOutDate);
      const filterStartDate = new Date(startDate);
      const filterEndDate = new Date(endDate);

      const isSameDay =
        checkInDate.getFullYear() === filterStartDate.getFullYear() &&
        checkInDate.getMonth() === filterStartDate.getMonth() &&
        checkInDate.getDate() === filterStartDate.getDate();

      const isBeforeOrSameDay =
        checkOutDate.getFullYear() < filterEndDate.getFullYear() ||
        (checkOutDate.getFullYear() === filterEndDate.getFullYear() &&
          checkOutDate.getMonth() < filterEndDate.getMonth()) ||
        (checkOutDate.getFullYear() === filterEndDate.getFullYear() &&
          checkOutDate.getMonth() === filterEndDate.getMonth() &&
          checkOutDate.getDate() <= filterEndDate.getDate());

      let isSelectedStatus = true;

      
    if (selectedButton !== null) {
      isSelectedStatus = reservation.reservationStatus === selectedButton;
    }

      const roomNumberMatches = roomNumberFilter
        ? reservation.roomNumber.toString().includes(roomNumberFilter)
        : true;

      const lastNameMatches = lastNameFilter
        ? guestProfiles.find(profile => profile.guestProfileID === reservation.guestNumber)?.secondName.toLowerCase().includes(lastNameFilter.toLowerCase())
        : true;

      const firstNameMatches = firstNameFilter
        ? guestProfiles.find(profile => profile.guestProfileID === reservation.guestNumber)?.firstName.toLowerCase().includes(firstNameFilter.toLowerCase())
        : true;

      return isSameDay && isBeforeOrSameDay && isSelectedStatus && roomNumberMatches && lastNameMatches && firstNameMatches;
    });

    console.log("Reservas filtradas:", filteredReservations);
    return filteredReservations;
  }, [reservation, startDate, endDate, selectedButton, roomNumberFilter, lastNameFilter, firstNameFilter]);




  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const renderCell = (reservation, columnKey) => {
    switch (columnKey) {
      case "reservationStatus":
        return getStatusIcon(reservation[columnKey]);
      default:
        return reservation[columnKey];
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
    setPage(1);
  };

  const handleDelete = async (idReservation) => {
    try {
      const response = await axios.delete(`/api/v1/frontOffice/reservations/` + idReservation);
      alert("Departamento removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover departamento.", error.message);
    }
  };

  const handleRoomNumberChange = (event) => {
    const { value } = event.target;
    setRoomNumberFilter(value);
  };

  const handleLastNameChange = (event) => {
    const { value } = event.target;
    setLastNameFilter(value);
  };

  const handleFirstNameChange = (event) => {
    const { value } = event.target;
    setFirstNameFilter(value);
  };

  const getDropdownMenu = (reservationStatus, reservationID) => {
    switch (reservationStatus) {
      case 0: // Pendentes
        return (
          <DropdownMenu aria-label="Static Actions" closeOnSelect={false} isOpen={true}>
            <DropdownItem key="edit" aria-label="Editar detalhes">
              <ReservationsForm
                buttonName={"Editar"}
                editIcon={<FiEdit3 size={25} />}
                buttonColor={"transparent"}
                modalHeader={"Editar Reserva"}
                modalEditArrow={<BsArrowRight size={25} />}
                modalEdit={`ID: ${reservationID}`}
                formTypeModal={1}
                idReservation={reservationID}
                idGuest={reservation.guestNumber}
                criado={reservation.createdAt}
                editado={reservation.updatedAt}
                editor={"teste"}
              />
            </DropdownItem>
            <DropdownItem onClick={() => handleStatusChange(reservationID, 1)}>Check-In</DropdownItem>
            <DropdownItem onClick={() => handleStatusChange(reservationID, 3)}>Cancelada</DropdownItem>
          </DropdownMenu>
        );
      case 1: // Checked-In
        return (
          <DropdownMenu aria-label="Static Actions" closeOnSelect={true}>
            <DropdownItem key="edit" aria-label="Editar detalhes">
              <ReservationsForm
                buttonName={"Editar"}
                editIcon={<FiEdit3 size={25} />}
                buttonColor={"transparent"}
                modalHeader={"Editar Reserva"}
                modalEditArrow={<BsArrowRight size={25} />}
                modalEdit={`ID: ${reservationID}`}
                formTypeModal={1}
                idReservation={reservationID}
                idGuest={reservation.guestNumber}
                criado={reservation.createdAt}
                editado={reservation.updatedAt}
                editor={"teste"}
              />
            </DropdownItem>
            <DropdownItem onClick={() => handleStatusChange(reservationID, 2)}>Check-Out</DropdownItem>
            <DropdownItem onClick={() => handleStatusChange(reservationID, 3)}>Cancelada</DropdownItem>
            <DropdownItem onClick={() => handleStatusChange(reservationID, 0)}>Cancelar CI</DropdownItem>
          </DropdownMenu>
        );
      case 2: //Check-Out
      case 3: //Cancelada
      case 4: // No-Show
      default:
        return (
          <DropdownMenu aria-label="Static Actions" closeOnSelect={true}>
            <DropdownItem onClick={() => handleDelete(reservationID)}>Excluir</DropdownItem>
          </DropdownMenu>
        );
    }
  };

  const handleStatusButtonClick = (status) => {
    if (selectedButton === status) {
      setSelectedButton(null); // Desativa o filtro se o mesmo botão for clicado novamente
    } else {
      setSelectedButton(status); // Ativa o filtro
    }
  };

  //botoes que mudam de cor
  const inputStyle = "w-full border-b-2 border-gray-300 px-1 h-8 outline-none my-2 text-sm"
  const sharedLineInputStyle = "w-1/2 border-b-2 border-gray-300 px-1 h-10 outline-none my-2"

  const handleClearFilters = () => {
    setRoomNumberFilter("");
    setLastNameFilter("");
    setFirstNameFilter("");
  };

  const inputs = [
    { id: 'quartos', name: 'quartos', label: 'Procurar quarto', ariaLabel: 'Procurar quarto', value: roomNumberFilter, onChange: handleRoomNumberChange, style: inputStyle },
    { id: 'apelido', name: 'apelido', label: 'Procurar apelido', ariaLabel: 'Procurar apelido', value: lastNameFilter, onChange: handleLastNameChange, style: inputStyle },
    { id: 'primeiroNome', name: 'primeiroNome', label: 'Procurar primeiro nome', ariaLabel: 'Procurar primeiro nome', value: firstNameFilter, onChange: handleFirstNameChange, style: inputStyle },
  ]

  return (
    <main>
      <div className="flex flex-col mt-1 py-3">
        <p className="text-xs px-6 pb-3">Fichas de Clientes</p>
        <div className="flex flex-row">
          {/** COMPONENTE DE SEARCH */}
          <Input
            className="mt-2 ml-6 mb-6 w-[30%]"
            placeholder="Procurar..."
            labelPlacement="outside"
            aria-label="Pesquisar clientes"
            startContent={
              <FiSearch color={"black"} size={20} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            endContent={
              <SearchModal
                buttonIcon={<IoIosArrowDown size={20} color="black" />}
                buttonColor={"transparent"}
                inputs={inputs}
                onClearFilters={handleClearFilters}
              />
            }
          />
        </div>
        <div className="flex flex-row justify-between items-center mx-5">
          <div className="gap-12 grid-cols-2">
            <div className="flex flex-row gap-12 pb-1.5 ml-2.5">
              <InputFieldControlled
                type={"date"}
                id={"de"}
                name={"De"}
                label={"De:"}
                ariaLabel={"De:"}
                value={startDate}
                onChange={handleStartDateChange}
                style={inputStyle}
              />
              <InputFieldControlled
                type={"date"}
                id={"ate"}
                name={"Até"}
                label={"Até:"}
                ariaLabel={"Até:"}
                value={endDate}
                onChange={handleEndDateChange}
                style={inputStyle}
              />
              <CountryAutocomplete
                label="Quartos"
                name={"Quartos"}
                style={
                  "flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 h-10 my-2"
                }
                onChange={(value) => handleSelect(value, "Quartos")}
              />

            </div>
          </div>
        </div>
      </div>

      <div className="mx-5 h-[65vh] min-h-full">
        <PaginationTable
          page={page}
          pages={pages}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          items={items}
          setPage={setPage}
        >
          <div className="flex flex-row gap-4 mb-2">
            <button
              onClick={() => handleStatusButtonClick(0)}
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === 0 ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
            >
              Pendentes
            </button>
            <button
              onClick={() => handleStatusButtonClick(1)}
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === 1 ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
            >
              Checked-In
            </button>
            <button
              onClick={() => handleStatusButtonClick(2)}
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === 2 ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
            >
              Checked-Out
            </button>
            <button
              onClick={() => handleStatusButtonClick(3)}
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === 3 ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
            >
              Canceladas
            </button>
            <button
              onClick={() => handleStatusButtonClick(4)}
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === 4 ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
            >
              No-Show
            </button>
          </div>
          <Table
            id="TableToPDF"
            isHeaderSticky={"true"}
            layout={"fixed"}
            isCompact={"true"}
            removeWrapper
            classNames={{
              wrapper: "min-h-[222px]",
            }}
            className="h-full overflow-auto"
          >
            <TableHeader>
              <TableColumn className="bg-primary-600 text-white font-bold w-[40px] uppercase" aria-label="ID">
                ID
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-4 w-32 uppercase" aria-label="Nome">
                Nome
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-4 w-32 uppercase" aria-label="Apelido">
                Apelido
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-10 uppercase" aria-label="Check-In">
                Check-In
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-10 uppercase" aria-label="Check-Out">
                Check-Out
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-24 uppercase" aria-label="Noites">
                Noites
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-40 uppercase" aria-label="Quarto">
                Quarto
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-40 uppercase" aria-label="RT">
                RT
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-[12%] uppercase" aria-label="Pessoas">
                Pessoas
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-[12%] uppercase" aria-label="Status">
                Status
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white flex justify-end items-center pr-7" aria-label="Funções">
                <GoGear size={20} />
              </TableColumn>
            </TableHeader>
            <TableBody>
              {items.map((reservation, index) => (
                <TableRow key={index}>
                  <TableCell className="text-left underline text-blue-600">
                    <ReservationsForm
                      buttonName={reservation.reservationID}
                      editIcon={<FiEdit3 size={25} />}
                      buttonColor={"transparent"}
                      modalHeader={"Editar Reserva"}
                      modalEditArrow={<BsArrowRight size={25} />}
                      modalEdit={`ID: ${reservation.reservationID}`}
                      formTypeModal={1}
                      idReservation={reservation.reservationID}
                      idGuest={reservation.guestNumber}
                      criado={reservation.createdAt}
                      editado={reservation.updatedAt}
                      editor={"teste"}
                    />
                  </TableCell>
                  <TableCell className="px-4">
                    {guestProfiles.find(profile => profile.guestProfileID === reservation.guestNumber)?.firstName || "Nome não encontrado"}
                  </TableCell>
                  <TableCell className="px-4">
                    {guestProfiles.find(profile => profile.guestProfileID === reservation.guestNumber)?.secondName || "Apelido não encontrado"}
                  </TableCell>
                  <TableCell className="px-10">{new Date(reservation.checkInDate).toLocaleDateString()}</TableCell>
                  <TableCell className="px-10">{new Date(reservation.checkOutDate).toLocaleDateString()}</TableCell>
                  <TableCell className="px-40">{reservation.nightCount}</TableCell>
                  <TableCell className="px-40">{reservation.roomNumber}</TableCell>
                  <TableCell className="px-40">{"aa"}</TableCell>
                  <TableCell className="px-[12%]">{reservation.adultCount}</TableCell>
                  <TableCell className="px-[12%]">{renderCell(reservation, "reservationStatus")}</TableCell>
                  <TableCell className="flex justify-end">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly variant="light">
                          <BsThreeDotsVertical />
                        </Button>
                      </DropdownTrigger>
                      {getDropdownMenu(reservation.reservationStatus, reservation.reservationID)}
                    </Dropdown>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </PaginationTable>
      </div>
    </main>
  );
}