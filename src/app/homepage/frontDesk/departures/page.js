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
import { BsThreeDotsVertical, BsArrowRight } from "react-icons/bs";
import { FiSearch, FiEdit3 } from "react-icons/fi";
import { PiAirplaneLandingFill, PiAirplaneTakeoffFill } from "react-icons/pi";
import { MdOutlinePersonOff } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { FaClock } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";


//imports de componentes
import ReservationsForm from "@/components/modal/frontOffice/reservations/page";
import PaginationTable from "@/components/table/paginationTable/paginationTable";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import SearchModal from "@/components/modal/frontOffice/reservations/searchModal/searchClients/page";

//import de funções
import FilterButton from "@/components/functionsPages/filterUtils/page";
import { useTranslations } from 'next-intl';

export default function departures() {

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchValue, setSearchValue] = React.useState("");
  const [reservation, setReservation] = useState([]);
  const [guestId, setGuestId] = useState([]);
  const [guestProfiles, setGuestProfiles] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().slice(0, 10)); // Data atual no formato ISO: YYYY-MM-DD
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(currentDate); // Valor inicial é 30 dias a partir da data atual
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const [roomNumberFilter, setRoomNumberFilter] = useState("");
  const [lastNameFilter, setLastNameFilter] = useState("");
  const [firstNameFilter, setFirstNameFilter] = useState("");
  const t = useTranslations('Index');

  const handleButtonClick = FilterButton({ selectedButton, setSelectedButton });

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/v1/frontOffice/frontDesk/departures`);
      const reservationsData = res.data.response;
      setReservation(reservationsData);
    };
    fetchData();
  }, [startDate, endDate]);

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
      const checkOutDateIncludes = reservation.checkOutDate && reservation.checkOutDate.toString().toLowerCase().includes(searchValue.toLowerCase());

      let isSelectedStatus = true;

      if (selectedButton !== null) {
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

      return checkOutDateIncludes && isSelectedStatus && roomNumberMatches && lastNameMatches && firstNameMatches; // Alterado para checkOutDateIncludes
    });

    return filteredReservations;
  }, [reservation, searchValue, selectedButton, roomNumberFilter, lastNameFilter, firstNameFilter]);


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
      const response = await axios.delete(`/api/v1/frontOffice/frontDesk/departures/` + idReservation);
      alert("Reserva removida com sucesso!");
    } catch (error) {
      console.error("Erro ao remover reserva.", error.message);
    }
  };

  //FUNÇÕES DE FILTRAGEM INDIVIDUAL
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 0:
        return <FaClock size={23} />;
      case 1:
        return <PiAirplaneLandingFill size={23} />;
      case 2:
        return <PiAirplaneTakeoffFill size={23} />;
      case 3:
        return <ImCross size={23} />;
      case 4:
        return <MdOutlinePersonOff size={23} />;
      default:
        return t("frontOffice.frontDesk.bookings.notFound.status");
    }
  };

  const getDropdownMenu = (reservationStatus, reservationID) => {
    switch (reservationStatus) {
      case 0: // Pendentes
        return (
          <DropdownMenu aria-label="Static Actions" closeOnSelect={false} isOpen={true}>
            <DropdownItem key="edit" aria-label="Editar detalhes">
              <ReservationsForm
                buttonName={t("general.editRecord")}
                editIcon={<FiEdit3 size={25} />}
                buttonColor={"transparent"}
                modalHeader={t("frontOffice.frontDesk.bookings.edit.modalHeader")}
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
            <DropdownItem onClick={() => handleStatusChange(reservationID, 1)}>{t("frontOffice.frontDesk.bookings.cards.checkedIn")}</DropdownItem>
            <DropdownItem onClick={() => handleStatusChange(reservationID, 3)}>{t("frontOffice.frontDesk.bookings.cards.canceled")}</DropdownItem>
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
            <DropdownItem onClick={() => handleStatusChange(reservationID, 2)}>{t("frontOffice.frontDesk.bookings.cards.checkOut")}</DropdownItem>
            <DropdownItem onClick={() => handleStatusChange(reservationID, 3)}>{t("frontOffice.frontDesk.bookings.cards.canceled")}</DropdownItem>
            <DropdownItem onClick={() => handleStatusChange(reservationID, 0)}>{t("frontOffice.frontDesk.bookings.cards.cancelCI")}</DropdownItem>
          </DropdownMenu>
        );
      case 2: //Check-Out
      case 3: //Cancelada
      case 4: // No-Show
      default:
        return (
          <DropdownMenu aria-label="Static Actions" closeOnSelect={true}>
            <DropdownItem onClick={() => handleDelete(reservationID)}>{t("frontOffice.frontDesk.bookings.filters.delete")}</DropdownItem>
          </DropdownMenu>
        );
    }
  };

  //botoes que mudam de cor
  const inputStyle = "w-full border-b-2 border-gray-300 px-1 h-8 outline-none my-2 text-sm"

  //inputs que irão para o search component
  const inputs = [
    { id: 'quartos', name: 'quartos', label: t("frontOffice.frontDesk.bookings.filters.searchRoom"), ariaLabel: 'Procurar quarto', value: roomNumberFilter, onChange: handleRoomNumberChange, style: inputStyle },
    { id: 'apelido', name: 'apelido', label: t("frontOffice.frontDesk.bookings.filters.searchSurname"), ariaLabel: 'Procurar apelido', value: lastNameFilter, onChange: handleLastNameChange, style: inputStyle },
    { id: 'primeiroNome', name: 'primeiroNome', label: t("frontOffice.frontDesk.bookings.filters.searchFirstName"), ariaLabel: 'Procurar primeiro nome', value: firstNameFilter, onChange: handleFirstNameChange, style: inputStyle },
  ]

  return (
    <main>
      <div className="flex flex-col mt-1 py-3 px-6">
        <p className="text-xs pb-3">{t("frontOffice.frontDesk.bookings.departuresLabel")}</p>
        <div className="flex flex-row">
          {/**COMPONENTE DE SEARCH */}
          <Input
            className="mt-2 w-[30%]"
            placeholder={t("general.search")}
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

              />
            }
          />
          <div className="flex flex-row px-6 gap-12 pb-1.5">
            <InputFieldControlled
              type={"date"}
              id={"de"}
              name={"De"}
              label={t("frontOffice.frontDesk.bookings.filters.from")}
              ariaLabel={"De:"}
              style={inputStyle}
            />
            <InputFieldControlled
              type={"date"}
              id={"ate"}
              name={"Até"}
              label={t("frontOffice.frontDesk.bookings.filters.to")}
              ariaLabel={"Até:"}
              style={inputStyle}
              value={endDate}
              onChange={handleEndDateChange} // Define o valor do campo como a data atual
            />
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
          <div className="flex flex-row gap-4 mb-2 -mt-4">
            <button

              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === 0 ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
            >
              {t("frontOffice.frontDesk.bookings.cards.pending")}
            </button>
            <button
              onClick={() => handleButtonClick(1)}
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === 1 ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
            >
              {t("frontOffice.frontDesk.bookings.cards.checkedIn")}
            </button>
            <button
              onClick={() => handleButtonClick(2)}
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === 2 ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
            >
              {t("frontOffice.frontDesk.bookings.cards.checkedOut")}
            </button>
            <button

              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === 3 ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
            >
              {t("frontOffice.frontDesk.bookings.cards.canceled")}
            </button>
            <button

              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === 4 ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
            >
              {t("frontOffice.frontDesk.bookings.cards.noShow")}
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
              <TableColumn className="bg-primary-600 text-white font-bold px-[3%] w-32 uppercase" aria-label="Nome">
              {t("frontOffice.frontDesk.bookings.datatable.name")}
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-[3%] w-32 uppercase" aria-label="Apelido">
              {t("frontOffice.frontDesk.bookings.datatable.surname")}
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-[5%] uppercase" aria-label="Check-In">
              {t("frontOffice.frontDesk.bookings.datatable.checkIn")}
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-[6%] uppercase" aria-label="Check-Out">
              {t("frontOffice.frontDesk.bookings.datatable.checkOut")}
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-[8%] uppercase" aria-label="Noites">
              {t("frontOffice.frontDesk.bookings.datatable.nights")}
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-[10%] uppercase" aria-label="Quarto">
              {t("frontOffice.frontDesk.bookings.datatable.room")}
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-[10%] uppercase" aria-label="RT">
              {t("frontOffice.frontDesk.bookings.datatable.rt")}
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-[8%] uppercase" aria-label="Pessoas">
              {t("frontOffice.frontDesk.bookings.datatable.people")}
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-[8%] uppercase" aria-label="Status">
              {t("frontOffice.frontDesk.bookings.datatable.status")}
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
                      modalHeader={t("frontOffice.frontDesk.edit.modalHeader")}
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
                  <TableCell className="px-[3%]">
                    {guestProfiles.find(profile => profile.guestProfileID === reservation.guestNumber)?.firstName || "Nome não encontrado"}
                  </TableCell>
                  <TableCell className="px-[3%]">
                    {guestProfiles.find(profile => profile.guestProfileID === reservation.guestNumber)?.secondName || "Apelido não encontrado"}
                  </TableCell>
                  <TableCell className="px-[5%]">{new Date(reservation.checkInDate).toLocaleDateString()}</TableCell>
                  <TableCell className="px-[6%]">{new Date(reservation.checkOutDate).toLocaleDateString()}</TableCell>
                  <TableCell className="px-[8%]">{reservation.nightCount}</TableCell>
                  <TableCell className="px-[10%]">{reservation.roomNumber}</TableCell>
                  <TableCell className="px-[10%]">{"aa"}</TableCell>
                  <TableCell className="px-[8%]">{reservation.adultCount}</TableCell>
                  <TableCell className="px-[8%]">{renderCell(reservation, "reservationStatus")}</TableCell>
                  <TableCell className="flex justify-end">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          variant="light"
                          className="flex flex-row justify-end"
                        >
                          <BsThreeDotsVertical size={20} className="text-gray-400" />
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