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
import { FaCalendarAlt } from "react-icons/fa";

/* ESTA PAGINA É IGUAL A DAS RESERVAR EXATAMENTE IGUAL E NESTE MOMENTO ESTA A DAR DISPLAY
A MESMA INFORMAÇÃO É FAVOR DE QUEM FIZER AS ALTERACOES ALTERAR AS APIS PARA AS CORRETAS*/

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
  const [guestId, setGuestId] = useState([]);
  const [guestProfiles, setGuestProfiles] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().slice(0, 10)); // Formato ISO: YYYY-MM-DD

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/v1/frontOffice/frontDesk/departures");
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
      const res = await axios.get("/api/v1/frontOffice/frontDesk/departures/" + guestId);
      const guestData = res.data.response;
      setGuestProfiles(guestData);
    };
    fetchData();
  }, []);

  const filteredItems = React.useMemo(() => {
    if (!reservation || !Array.isArray(reservation)) {
      return [];
    }

    return reservation.filter((reservation) =>
      (reservation.checkInDate && reservation.checkInDate.toLowerCase().includes(searchValue.toLowerCase())) ||
      (reservation.checkOutDate && reservation.checkOutDate.toString().toLowerCase().includes(searchValue.toLowerCase()))
    );
  }, [reservation, searchValue]);


  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const renderCell = React.useCallback((reservation, columnKey) => {
    const cellValue = reservation[columnKey];
  }, []);

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
      alert("Departamento removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover departamento.", error.message);
    } 
  };

  const [selectedComponent, setSelectedComponent] = useState(null)

  const handleClickIndividual = () => {
    setSelectedComponent('IndividualForm')
  }

  const handleClickCompany = () => {
    setSelectedComponent('CompanyForm')
  }

  const handleClickAgency = () => {
    setSelectedComponent('AgencyForm')
  }

  const handleClickGroup = () => {
    setSelectedComponent('GroupForm')
  }

  const handleClickOthers = () => {
    setSelectedComponent('OthersForm')
  }


  //botoes que mudam de cor
  const [selectedButton, setSelectedButton] = useState("")
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
                value={currentDate} // Define o valor do campo como a data atual
                style={inputStyle}
              />
              <InputFieldControlled
                type={"date"}
                id={"ate"}
                name={"Até"}
                label={"Até:"}
                ariaLabel={"Até:"}
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
          {selectedComponent === 'IndividualForm' && (
            <IndividualForm
              buttonName={"Novo"}
              buttonIcon={<FiPlus size={15} />}
              buttonColor={"primary"}
              modalHeader={"Inserir Ficha de Cliente"}
              modalEditArrow={<BsArrowRight size={25} />}
              modalEdit={"Particular"}
              modalIcons={"bg-red"}
              formTypeModal={0}
            ></IndividualForm>
          )}
          {selectedComponent === 'CompanyForm' && (
            <CompanyForm
              buttonName={"Novo"}
              buttonIcon={<FiPlus size={15} />}
              buttonColor={"primary"}
              modalHeader={"Inserir Ficha de Cliente"}
              modalEditArrow={<BsArrowRight size={25} />}
              modalEdit={"Empresa"}
              modalIcons={"bg-red"}
              formTypeModal={0}
            ></CompanyForm>
          )}
          {selectedComponent === 'AgencyForm' && (
            <TravelGroupForm
              formTypeModal={0}
              buttonName={"Novo"}
              buttonIcon={<FiPlus size={15} />}
              buttonColor={"primary"}
              modalHeader={"Inserir Ficha de Cliente"}
              modalEditArrow={<BsArrowRight size={25} />}
              modalEdit={"Agencia de Viagens"} />
          )}
          {selectedComponent === 'GroupForm' && (
            <GroupForm
              formTypeModal={0}
              buttonName={"Novo"}
              buttonIcon={<FiPlus size={15} />}
              buttonColor={"primary"}
              modalHeader={"Inserir Ficha de Cliente"}
              modalEditArrow={<BsArrowRight size={25} />}
              modalEdit={"Grupos"} />
          )}
          {selectedComponent === 'OthersForm' && (
            <OthersForm
              formTypeModal={0}
              buttonName={"Novo"}
              buttonIcon={<FiPlus size={15} />}
              buttonColor={"primary"}
              modalHeader={"Inserir Ficha de Cliente"}
              modalEditArrow={<BsArrowRight size={25} />}
              modalEdit={"Outros"} />
          )}
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
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === "individual" ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
              onClick={() => {
                handleClickIndividual();
                setSelectedButton("individual");
              }}>
              Pendentes
            </button>
            <button
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === "agency" ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
              onClick={() => {
                handleClickAgency();
                setSelectedButton("agency");
              }}>
              Checked-In
            </button>
            <button
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === "group" ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
              onClick={() => {
                handleClickGroup();
                setSelectedButton("group");
              }}>
              Checked-Out
            </button>
            <button
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === "others" ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
              onClick={() => {
                handleClickOthers();
                setSelectedButton("others");
              }}>
              Canceladas
            </button>
            <button
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === "others" ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
              onClick={() => {
                handleClickOthers();
                setSelectedButton("others");
              }}>
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
              <TableColumn className="bg-primary-600 text-white font-bold px-[8%] uppercase" aria-label="RI">
                RI
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
                  <TableCell className="px-4"> {guestProfiles.find(profile => profile.guestProfileID === reservation.guestNumber)?.firstName + " " + (guestProfiles.find(profile => profile.guestProfileID === reservation.guestNumber)?.secondName || "") || "Nome não encontrado"}</TableCell>
                  {/*impede que a data apareça com data e hora */}
                  <TableCell className="px-10">{new Date(reservation.checkInDate).toLocaleDateString()}</TableCell>
                  <TableCell className="px-10">{new Date(reservation.checkOutDate).toLocaleDateString()}</TableCell>
                  <TableCell className="px-40">{reservation.nightCount}</TableCell>
                  <TableCell className="px-40">{"alterar"}</TableCell>
                  <TableCell className="px-40">{"aa"}</TableCell>
                  <TableCell className="px-[12%]">{reservation.adultCount}</TableCell>
                  <TableCell className="px-[8%]">{"aa"}</TableCell>
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
                        <DropdownItem key="delete" aria-label="Remover item" onClick={() => handleDelete(reservation.reservationID)}>Remover</DropdownItem>
                        <DropdownItem key="view" aria-label="Ver detalhes">Ver</DropdownItem>
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

