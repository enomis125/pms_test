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

//imports de componentes

import PriceManagementsForm from "@/components/modal/priceManagement/page";

// import PaginationTable from "@/components/table/paginationTable/paginationTable";


export default function priceManagementForm() {

//   const [page, setPage] = React.useState(1);
//   const [rowsPerPage, setRowsPerPage] = React.useState(25);
//   const [searchValue, setSearchValue] = React.useState("");
//   const [reservation, setReservation] = useState([]);
//   const [guestId, setGuestId] = useState([]);
//   const [guestProfiles, setGuestProfiles] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await axios.get("/api/v1/frontOffice/reservations");
//       const reservationsData = res.data.response;
//       setReservation(reservationsData);
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     const newGuestIds = reservation.map(reservation => reservation.guestNumber);
//     setGuestId(newGuestIds);
//   }, [reservation]);

//   console.log("Ids dos hóspedes:", guestId);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await axios.get("/api/v1/frontOffice/clientForm/individuals/" + guestId);
//       const guestData = res.data.response;
//       setGuestProfiles(guestData);
//     };
//     fetchData();
//   }, []);

//   const filteredItems = React.useMemo(() => {
//     if (!reservation || !Array.isArray(reservation)) {
//       return [];
//     }

//     return reservation.filter((reservation) =>
//       (reservation.checkInDate && reservation.checkInDate.toLowerCase().includes(searchValue.toLowerCase())) ||
//       (reservation.checkOutDate && reservation.checkOutDate.toString().toLowerCase().includes(searchValue.toLowerCase()))
//     );
//   }, [reservation, searchValue]);


//   const items = React.useMemo(() => {
//     const start = (page - 1) * rowsPerPage;
//     const end = start + rowsPerPage;

//     return filteredItems.slice(start, end);
//   }, [page, filteredItems, rowsPerPage]);

//   const pages = Math.ceil(filteredItems.length / rowsPerPage);

//   const renderCell = React.useCallback((reservation, columnKey) => {
//     const cellValue = reservation[columnKey];
//   }, []);

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(1);
//   };

//   const handleSearchChange = (value) => {
//     setSearchValue(value);
//     setPage(1);
//   };

//   const handleDelete = async (idReservation) => {
//     try {
//       const response = await axios.delete(`/api/v1/frontOffice/reservations/` + idReservation);
//       alert("Departamento removido com sucesso!");
//     } catch (error) {
//       console.error("Erro ao remover departamento.", error.message);
//     }
//   };


return (
    <main>
      <div className="flex flex-col mt-1 py-3">
        <p className="text-xs px-6">Códigos de Preços</p>
        <div className="flex flex-row justify-between items-center mx-5">
          <div className="flex flex-row">
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              <Input
                className="mt-2 w-80"
                placeholder="Procurar..."
                labelPlacement="outside"
                aria-label="Pesquisar clientes"
                startContent={
                  <FiSearch color={"black"} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                // value={searchValue}
                // onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>
          <PriceManagementsForm
            formTypeModal={11}
            buttonName={"Novo"}
            buttonIcon={<FiPlus size={15} />}
            editIcon={<FaCalendarAlt size={25} color="white"/>}
            buttonColor={"primary"}
            modalHeader={"Inserir"} 
            /> 
        </div>
      </div>
      <div className="mx-5 h-[65vh] min-h-full">
        {/* <PaginationTable
          page={page}
          pages={pages}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          items={items}
          setPage={setPage}
        > */}
          {/*<div className="flex flex-row gap-4 mb-2">
            <button
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === "individual" ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
              onClick={() => {
                handleClickIndividual();
                setSelectedButton("individual");
              }}>
              Checked In
            </button>
            <button
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === "agency" ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
              onClick={() => {
                handleClickAgency();
                setSelectedButton("agency");
              }}>
              Checked Out
            </button>
            <button
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === "group" ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
              onClick={() => {
                handleClickGroup();
                setSelectedButton("group");
              }}>
              Canceladas
            </button>
            <button
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === "others" ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
              onClick={() => {
                handleClickOthers();
                setSelectedButton("others");
              }}>
              Pagas
            </button>

            </div>*/}
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
                Nº
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold  w-48 uppercase" aria-label="Nome do Hóspede">
                GRUPO TAB.PREÇO
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold  uppercase" aria-label="Check-In">
                TEXTO              
                </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold  uppercase" aria-label="Check-Out">
                BASIS GRP.
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold  uppercase" aria-label="Noites">
                BASIS RATE
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold  uppercase" aria-label="Quarto">
                SOBRETAXA
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold  uppercase" aria-label="RT">
                SOBRETAXA FIXA
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold  uppercase" aria-label="Pessoas">
                Pessoas
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold  uppercase" aria-label="RI">
                DIVIDIR
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold  uppercase" aria-label="RI">
                REF
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold  uppercase" aria-label="RI">
                ORDENAÇÃO
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold  uppercase" aria-label="RI">
                HOTEL DA RESERVA
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white flex justify-end items-center pr-7" aria-label="Funções">
                <GoGear size={20} />
              </TableColumn>
            </TableHeader>
            <TableBody>
                <TableRow>                
                <TableCell>Teste</TableCell>
                <TableCell>Teste</TableCell>
                <TableCell>Teste</TableCell>
                <TableCell>Teste</TableCell>
                <TableCell>Teste</TableCell>
                <TableCell>Teste</TableCell>
                <TableCell>Teste</TableCell>
                <TableCell>Teste</TableCell>
                <TableCell>Teste</TableCell>
                <TableCell>Teste</TableCell>
                <TableCell>Teste</TableCell>
                <TableCell>Teste</TableCell>
                <TableCell>Teste</TableCell>    
                </TableRow>


            {/* {items.map((reservation, index) => (
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
                  */}{/*impede que a data apareça com data e hora */}
                  {/* <TableCell className="px-10">{new Date(reservation.checkInDate).toLocaleDateString()}</TableCell>
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
              */}
            </TableBody>
          </Table>
        {/* </PaginationTable> */}
      </div>
    </main>
  );
}

