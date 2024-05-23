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

/* ESTA PAGINA É IGUAL A DAS RESERVAR EXATAMENTE IGUAL E NESTE MOMENTO ESTA A DAR DISPLAY
A MESMA INFORMAÇÃO É FAVOR DE QUEM FIZER AS ALTERACOES ALTERAR AS APIS PARA AS CORRETAS*/

//imports de componentes
import ReservationsForm from "@/components/modal/frontOffice/reservations/page";
import PaginationTable from "@/components/table/paginationTable/paginationTable";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import CountryAutocomplete from "@/components/functionsForm/autocomplete/country/page";



export default function clientForm() {
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

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/v1/frontOffice/frontDesk/arrivals");
      const reservationsData = res.data.response;
      setReservation(reservationsData);
    };
    fetchData();
  }, []);

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

  const filteredItems = React.useMemo(() => {
    if (!reservation || !Array.isArray(reservation)) {
      console.log("Sem dados de reserva disponíveis.");
      return [];
    }

    console.log("Filtrando dados de reserva...");

    const filteredReservations = reservation.filter((reservation) => {
      const checkInDateIncludes = reservation.checkInDate && reservation.checkInDate.toLowerCase().includes(searchValue.toLowerCase());
      const checkOutDateIncludes = reservation.checkOutDate && reservation.checkOutDate.toString().toLowerCase().includes(searchValue.toLowerCase());

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

      return (checkInDateIncludes || checkOutDateIncludes) && isSelectedStatus;
    });

    return filteredReservations;
  }, [reservation, searchValue, selectedButton]);


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
      const response = await axios.delete(`/api/v1/frontOffice/frontDesk/arrivals/` + idReservation);
      alert("Departamento removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover departamento.", error.message);
    }
  };

  const handleStatusChange = async (reservationID, newStatus) => {
    try {
      await axios.put("/api/v1/frontOffice/reservations/" + reservationID, {
        data: {reservationStatus: newStatus }});
      // Atualize o estado local da reserva após a alteração do status, se necessário
      // Você pode recarregar os dados ou atualizar apenas a reserva afetada
    } catch (error) {
      console.error("Erro ao atualizar o status da reserva:", error.message);
    }
  };

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

  //botoes que mudam de cor
  const inputStyle = "w-full border-b-2 border-gray-300 px-1 h-8 outline-none my-2 text-sm"
  const sharedLineInputStyle = "w-1/2 border-b-2 border-gray-300 px-1 h-10 outline-none my-2"


  return (
    <main>
      <div className="flex flex-col mt-1 py-3">
        <p className="text-xs px-6 pb-3">Fichas de Clientes</p>
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
              <CountryAutocomplete
                label="Procurar"
                name={"Procurar"}
                style={
                  "flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 h-10 my-2"
                }
                onChange={(value) => handleSelect(value, "Procurar")}
              />
              <InputFieldControlled
                type={"date"}
                id={"de"}
                name={"De"}
                label={"De:"}
                ariaLabel={"De:"}
                style={inputStyle}
              />
              <InputFieldControlled
                type={"date"}
                id={"ate"}
                name={"Até"}
                label={"Até:"}
                ariaLabel={"Até:"}
                value={currentDate} // Define o valor do campo como a data atual
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
              <TableColumn className="bg-primary-600 text-white font-bold px-4 w-64 uppercase" aria-label="Nome do Hóspede">
                Nome do Hóspede
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-10 uppercase" aria-label="Check-In">
                Check-In
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-10 uppercase" aria-label="Check-Out">
                Check-Out
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-40 uppercase" aria-label="Noites">
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
                  {guestProfiles.find(profile => profile.guestProfileID === reservation.guestNumber)?.firstName + " " + (guestProfiles.find(profile => profile.guestProfileID === reservation.guestNumber)?.secondName || "") || "Nome não encontrado"}
                  </TableCell>
                  <TableCell className="px-10">{new Date(reservation.checkInDate).toLocaleDateString()}</TableCell>
                  <TableCell className="px-10">{new Date(reservation.checkOutDate).toLocaleDateString()}</TableCell>
                  <TableCell className="px-40">{reservation.nightCount}</TableCell>
                  <TableCell className="px-40">{"alterar"}</TableCell>
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
                        <DropdownItem onClick={() => handleStatusChange(reservation.reservationID, 0)}>Cancelar CI</DropdownItem>
                        <DropdownItem key="view" aria-label="Ver detalhes">Reativar</DropdownItem>
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