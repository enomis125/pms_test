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

import { FiEdit3 } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";
import { FaArrowsRotate } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
import { FaBed } from "react-icons/fa6";
import { TbTransferVertical } from "react-icons/tb";
import { MdComputer } from "react-icons/md";

/* ESTA PAGINA É IGUAL A DAS RESERVAR EXATAMENTE IGUAL E NESTE MOMENTO ESTA A DAR DISPLAY
A MESMA INFORMAÇÃO É FAVOR DE QUEM FIZER AS ALTERACOES ALTERAR AS APIS PARA AS CORRETAS*/

//imports de componentes
import ReservationsForm from "@/components/modal/frontOffice/reservations/page";
import PaginationTable from "@/components/table/paginationTable/paginationTable";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import CountryAutocomplete from "@/components/functionsForm/autocomplete/country/page";



export default function managementForm() {
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
            const res = await axios.get("/api/v1/frontOffice/frontDesk/arrivals/" + guestId);
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




    //botoes que mudam de cor
    const inputStyle = "w-full border-b-2 border-gray-300 px-1 h-8 outline-none my-2 text-sm"
    const sharedLineInputStyle = "w-1/2 border-b-2 border-gray-300 px-1 h-10 outline-none my-2"


    return (
        <main>
            <div className="flex flex-col mt-1 py-3">
                <p className="text-xs px-6 pb-3">Management Perdidos e achados</p>
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
                            <TableColumn className="bg-primary-600 text-white font-bold px-10  uppercase" aria-label="ID">
                                <Input content={<FaArrowsRotate/> + "Filter Room"}/>
                            </TableColumn>
                            <TableColumn className="bg-primary-600 text-white font-bold px-10 uppercase" aria-label="Nome do Hóspede">
                                <IoPeopleSharp size={25}/>
                            </TableColumn>
                            <TableColumn className="bg-primary-600 text-white font-bold px-10 uppercase" aria-label="Check-In">
                                <FaBed size={25}/>
                            </TableColumn>
                            <TableColumn className="bg-primary-600 text-white font-bold px-10 uppercase" aria-label="Check-Out">
                                <TbTransferVertical size={25}/>
                            </TableColumn>
                            <TableColumn className="bg-primary-600 text-white font-bold px-10 uppercase" aria-label="Noites">
                                    <MdComputer size={25}/>
                            </TableColumn>
                            <TableColumn className="bg-primary-600 text-white font-bold px-10 uppercase" aria-label="Quarto">
                                out of service
                            </TableColumn>
                            <TableColumn className="bg-primary-600 text-white font-bold px-10 uppercase" aria-label="RT">
                                dirty
                            </TableColumn>
                            <TableColumn className="bg-primary-600 text-white font-bold px-10 uppercase" aria-label="Pessoas">
                                checked
                            </TableColumn>
                            <TableColumn className="bg-primary-600 text-white font-bold px-10 uppercase" aria-label="Status">
                                clean
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </PaginationTable>
            </div>
        </main>
    );
}