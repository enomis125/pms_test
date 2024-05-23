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
import { FiPlus } from "react-icons/fi";
import { FiEdit3 } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";
import { PiAirplaneLandingFill, PiAirplaneTakeoffFill } from "react-icons/pi";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlinePersonOff } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { FaClock } from "react-icons/fa";

//imports de componentes
import ReservationsForm from "@/components/modal/frontOffice/reservations/page";
import PaginationTable from "@/components/table/paginationTable/paginationTable";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import CountryAutocomplete from "@/components/functionsForm/autocomplete/country/page";

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
  const [selectedButton, setSelectedButton] = React.useState(null);
  const [roomNumberFilter, setRoomNumberFilter] = useState("");
  const [lastNameFilter, setLastNameFilter] = useState("");
  const [firstNameFilter, setFirstNameFilter] = useState("");

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
      // Atualize o estado local da reserva após a alteração do status, se necessário
      // Você pode recarregar os dados ou atualizar apenas a reserva afetada
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

      let isSelectedStatus = false;

      switch (selectedButton) {
        case 0: // Pendentes
          isSelectedStatus = reservation.reservationStatus === 0;
          break;
        case 1: // Checked-in
          isSelectedStatus = reservation.reservationStatus === 1;
          break;
        case 2: // Checked-Out
          isSelectedStatus = reservation.reservationStatus === 2;
          break;
        case 3: // Canceladas
          isSelectedStatus = reservation.reservationStatus === 3;
          break;
        case 4: // No-Show
          isSelectedStatus = reservation.reservationStatus === 4;
          break;
        default:
          break;
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

    const filteredReservations = reservation.filter((reservation) => {
      const roomNumber = reservation.roomNumber.toString();
      return roomNumber.includes(value);
    });

    setFilteredReservations(filteredReservations);
  };

  const handleLastNameChange = (event) => {
    const { value } = event.target;
    setLastNameFilter(value);

    const filteredReservations = reservation.filter((reservation) => {
      const lastName = guestProfiles.find(profile => profile.guestProfileID === reservation.guestNumber)?.secondName || "";
      return lastName.toLowerCase().includes(value.toLowerCase());
    });

    setFilteredReservations(filteredReservations);
  };

  const handleFirstNameChange = (event) => {
    const { value } = event.target;
    setFirstNameFilter(value);

    const filteredReservations = reservation.filter((reservation) => {
      const firstName = guestProfiles.find(profile => profile.guestProfileID === reservation.guestNumber)?.firstName || "";
      return firstName.toLowerCase().includes(value.toLowerCase());
    });

    setFilteredReservations(filteredReservations);
  };



  //botoes que mudam de cor
  const inputStyle = "w-full border-b-2 border-gray-300 px-1 h-8 outline-none my-2 text-sm"
  const sharedLineInputStyle = "w-1/2 border-b-2 border-gray-300 px-1 h-10 outline-none my-2"


  return (
    <main>
      <div className="flex flex-col mt-1 py-3">
        <p className="text-xs px-6">Reservas</p>
        <div className="flex flex-row justify-between items-center mx-5">
          <div className="gap-12 grid-cols-2">
            <div className="flex flex-wrap gap-12 py-2">
              <InputFieldControlled
                type={"text"}
                id={"tipologias"}
                name={"Tipologias"}
                label={"Grupo de Tipologias"}
                ariaLabel={"Grupo de Tipologias"}
                style={inputStyle}
              />

              <InputFieldControlled
                type={"text"}
                id={"procurar"}
                name={"Procurar"}
                label={"Procurar tudo"}
                ariaLabel={"Procurar tudo"}
                style={inputStyle}
              />
            </div>
            <div className="flex flex-row gap-12 pb-1.5">
              <Popover classname="bg-transparent">
                <PopoverTrigger className="mt-4 ml-4 bg-transparent">
                  <div className="flex items-center bg-transparent">
                    <Button>Procurar</Button>
                    <IoIosArrowDown className="ml-2" />
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="px-1 py-2">
                    <InputFieldControlled
                      type={"text"}
                      id={"quartos"}
                      name={"quartos"}
                      label={"Procurar quarto"}
                      ariaLabel={"Procurar quarto"}
                      value={roomNumberFilter}
                      onChange={handleRoomNumberChange}
                      style={inputStyle}
                    />
                    <InputFieldControlled
                      type={"text"}
                      id={"apelido"}
                      name={"apelido"}
                      label={"Procurar apelido"}
                      ariaLabel={"Procurar apelido"}
                      value={lastNameFilter}
                      onChange={handleLastNameChange} // Adicione esta linha
                      style={inputStyle}
                    />
                    <InputFieldControlled
                      type={"text"}
                      id={"primeiroNome"}
                      name={"primeiroNome"}
                      label={"Procurar primeiro nome"}
                      ariaLabel={"Procurar primeiro nome"}
                      value={firstNameFilter}
                      onChange={handleFirstNameChange}
                      style={inputStyle}
                    />
                  </div>
                </PopoverContent>
              </Popover>
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
          <ReservationsForm
            formTypeModal={0}
            buttonName={"Novo"}
            buttonIcon={<FiPlus size={15} />}
            editIcon={<FaCalendarAlt size={25} color="white"/>}
            buttonColor={"primary"}
            modalHeader={"Inserir uma Reserva"} 
            />
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
              onClick={() => setSelectedButton(0)}
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === 0 ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
            >
              Pendentes
            </button>
            <button
              onClick={() => setSelectedButton(1)}
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === 1 ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
            >
              Checked-In
            </button>
            <button
              onClick={() => setSelectedButton(2)}
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === 2 ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
            >
              Checked-Out
            </button>
            <button
              onClick={() => setSelectedButton(3)}
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === 3 ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
            >
              Canceladas
            </button>
            <button
              onClick={() => setSelectedButton(4)}
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
                        <Button
                          variant="light"
                          className="flex flex-row justify-end"
                          aria-label="Opções"
                        >
                          <BsThreeDotsVertical size={20} className="text-gray-400" />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Static Actions" closeOnSelect={false} isOpen={true}>
                        <DropdownItem key="edit" aria-label="Editar detalhes">
                          <ReservationsForm
                            buttonName={"Editar"}
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
                        </DropdownItem>
                        <DropdownItem onClick={() => handleStatusChange(reservation.reservationID, 1)}>Check-In</DropdownItem>
                        <DropdownItem onClick={() => handleStatusChange(reservation.reservationID, 3)}>Cancelada</DropdownItem>
                        <DropdownItem onClick={() => handleStatusChange(reservation.reservationID, 4)}>NoShow</DropdownItem>
                      </DropdownMenu>
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