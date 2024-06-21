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
import { MdOutlineQuestionMark } from "react-icons/md";
import { CgSearchFound } from "react-icons/cg";
import { IoCheckmark } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

/* ESTA PAGINA É IGUAL A DAS RESERVAR EXATAMENTE IGUAL E NESTE MOMENTO ESTA A DAR DISPLAY
A MESMA INFORMAÇÃO É FAVOR DE QUEM FIZER AS ALTERACOES ALTERAR AS APIS PARA AS CORRETAS*/

import {useTranslations} from 'next-intl'; 

//imports de componentes
import PaginationTable from "@/components/table/paginationTable/paginationTable";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import CountryAutocomplete from "@/components/functionsForm/autocomplete/country/page";
import LostandFoundForm from "@/components/modal/houseKeeping/lostAndFound/page";




export default function lostAndFound() {

  const t = useTranslations('Index'); 

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [lostAndFound, setLostAndFound] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedButton, setSelectedButton] = React.useState(null);
  const [roomNumberFilter, setRoomNumberFilter] = useState("");
  const [guestNameFilter, setGuestNameFilter] = useState("");
  const [appliedRoomNumberFilter, setAppliedRoomNumberFilter] = useState("");
  const [appliedGuestNameFilter, setAppliedGuestNameFilter] = useState("");
  const [registerDateFilter, setRegisterDateFilter] = useState("");
  const [updatedDateFilter, setUpdatedDateFilter] = useState("");
  const [appliedRegisterDateFilter, setAppliedRegisterDateFilter] = useState("");
  const [appliedUpdatedDateFilter, setAppliedUpdatedDateFilter] = useState("");
  const [dateFromFilter, setDateFromFilter] = useState("");
  const [dateToFilter, setDateToFilter] = useState("");
  const [equalDates, setEqualDates] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/housekeeping/lostAndFound");

        const lostAndFoundData = response.data.response;

        const filteredItems = lostAndFoundData.filter(item => new Date(item.foundDate) < new Date());

        setLostAndFound(filteredItems);

      } catch (error) {

        console.error("Erro ao buscar perdidos e achados:", error.message);

      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    setAppliedRoomNumberFilter(roomNumberFilter);
    setAppliedGuestNameFilter(guestNameFilter);
    setAppliedRegisterDateFilter(registerDateFilter);
    setAppliedUpdatedDateFilter(updatedDateFilter);
    setDateFromFilter(dateFromFilter);
    setEqualDates(equalDates); 
  };

  const handleReset = () => {
    setRoomNumberFilter("");
    setGuestNameFilter("");
    setAppliedRoomNumberFilter("");
    setAppliedGuestNameFilter("");
    setRegisterDateFilter("");
    setUpdatedDateFilter("");
    setAppliedRegisterDateFilter("");
    setAppliedUpdatedDateFilter("");
    setDateFromFilter("");
  };

  const handleStatusChange = async (referenceNumber, newStatus) => {
    try {
      await axios.put("/api/v1/housekeeping/lostAndFound/" + referenceNumber, {
        data: { isFound: newStatus }
      });
      setCurrentisFound(newStatus);
    } catch (error) {
      console.error("Erro ao atualizar o status de perdidos e achados:", error.message);
    }
  };

  const handleButtonClick = (buttonValue) => {
    if (selectedButton === buttonValue) {
      setSelectedButton(null);
     
    } else {
      setSelectedButton(buttonValue);
      
    }
  };

  const DropdownMenus = (isFound, referenceNumber) => {
    switch (isFound) {
      case 1:
        return (
          <DropdownMenu aria-label="Static Actions" closeOnSelect={false} isOpen={true}>
            <DropdownItem key="edit" aria-label="Editar detalhes">
              <LostandFoundForm
              buttonName={t("housekeeping.lostandfound.dropDown.buttonEdit")}
              editIcon={<FiEdit3 size={25} />}
              buttonColor={"transparent"}
              modalHeader={"Editar Item"}
              modalEditArrow={<BsArrowRight size={25} />}
              modalEdit={`ID: ${referenceNumber}`}
              formTypeModal={12}
              editor={"teste"}
            >Editar</LostandFoundForm>
            </DropdownItem>
            <DropdownItem onClick={() => handleStatusChange(referenceNumber, 2)}>{t("housekeeping.lostandfound.dropDown.buttonFound")}</DropdownItem>
            <DropdownItem key="apagar">{t("housekeeping.lostandfound.dropDown.buttonDelete")}</DropdownItem>
          </DropdownMenu>
        );

      case 2:
        return (
          <DropdownMenu>
            <DropdownItem key="edit">{t("housekeeping.lostandfound.dropDown.buttonEdit")}</DropdownItem>
            <DropdownItem onClick={() => handleStatusChange(referenceNumber, 3)}>{t("housekeeping.lostandfound.dropDown.buttonConcluded")}</DropdownItem>
            <DropdownItem key="delete">{t("housekeeping.lostandfound.dropDown.buttonDelete")}</DropdownItem>
          </DropdownMenu>
        );


      case 3:
        return (
          <DropdownMenu>
            <DropdownItem key="edit">{t("housekeeping.lostandfound.dropDown.buttonEdit")}</DropdownItem>
            <DropdownItem key="delete">{t("housekeeping.lostandfound.dropDown.buttonDelete")}</DropdownItem>
          </DropdownMenu>
        );
    }
  }


  const renderStatusIcon = (isFound) => {
    switch (isFound) {
      case 1:
        return <MdOutlineQuestionMark size={30} />;
      case 2:
        return <CgSearchFound size={30} />;
      case 3:
        return <IoCheckmark size={30} />;
      default:
        return null;
    }
  };


  const filteredItems = React.useMemo(() => {
    if (!lostAndFound || !Array.isArray(lostAndFound)) {
      console.log("Sem dados de perdidos e achados disponíveis.");
      return [];
    }

    let filteredList = lostAndFound;

    if (selectedButton !== null) {
      filteredList = filteredList.filter(item => item.isFound === selectedButton);
    }

    if (appliedRoomNumberFilter.trim() !== "") {
      filteredList = filteredList.filter(item => String(item.roomNumber).includes(appliedRoomNumberFilter.trim()));
    }

    if (appliedGuestNameFilter.trim() !== "") {
      filteredList = filteredList.filter(item => String(item.userName).includes(appliedGuestNameFilter.trim()));
    }

    if (appliedRegisterDateFilter !== "") {
      filteredList = filteredList.filter(item => item.foundDate.startsWith(appliedRegisterDateFilter));
    }

    if (appliedUpdatedDateFilter !== "") {
      filteredList = filteredList.filter(item => item.updatedAt.startsWith(appliedUpdatedDateFilter));
    }

    if (dateFromFilter !== "" && dateToFilter !== "") {

      filteredList = filteredList.filter(item =>

        new Date(item.foundDate) >= new Date(dateFromFilter) && new Date(item.foundDate) <= new Date(dateToFilter)
      );
    } else if (dateFromFilter !== "") {

      filteredList = filteredList.filter(item => new Date(item.foundDate) >= new Date(dateFromFilter));

    } else if (dateToFilter !== "") {

      filteredList = filteredList.filter(item => new Date(item.foundDate) <= new Date(dateToFilter));
    }

    if (equalDates !== "") {
      filteredList = filteredList.filter(item => item.foundDate === item.updatedAt);
    }

    return filteredList;
  }, [lostAndFound, selectedButton, appliedRoomNumberFilter, appliedGuestNameFilter, appliedRegisterDateFilter, appliedUpdatedDateFilter, dateFromFilter, dateToFilter, equalDates]);


  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const renderCell = React.useCallback((lostAndFound, columnKey) => {
    const cellValue = lostAndFound[columnKey];
  }, []);


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
    setPage(1);
  };

  const inputStyle = "w-full border-b-2 border-gray-300 px-1 h-8 outline-none my-2 text-sm"
  const sharedLineInputStyle = "w-1/2 border-b-2 border-gray-300 px-1 h-10 outline-none my-2"


  return (
    <main>
      <div className="flex flex-col mt-1 py-3">
        <p className="text-xs px-6 pb-3">{t("housekeeping.lostandfound.lostandfoundTitle")}</p>
        <div className="flex flex-row justify-between items-center mx-5">
          <div className="gap-12 grid-cols-2">
            <div className="flex flex-row gap-12 pb-1.5">
              <div className="mt-3.5">
                <Popover placement="bottom" color="foreground" classNameshowArrow={false}>
                  <PopoverTrigger color="foreground" className="ml-4 border-b border-neutral-200 mb-2.5" >
                    <div className="flex items-center bg-transparent">
                      <Button className=" bg-transparent">{t("general.search")}</Button>
                      <IoIosArrowDown className="ml-14" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="bg-white text-black">
                    <div className="px-1 py-2">
                      <InputFieldControlled
                        type={"date"}
                        id={"data de registo"}
                        name={"Data de registo"}
                        label={t("housekeeping.lostandfound.lostandfoundSearchRegistrationDate")}
                        ariaLabel={"Registration Date:"}
                        style={inputStyle}
                        value={registerDateFilter}
                        onChange={(e) => setRegisterDateFilter(e.target.value)}
                      />
                      <InputFieldControlled
                        type={"date"}
                        id={"atualizado em"}
                        name={"Atualizado em"}
                        label={t("housekeeping.lostandfound.lostandfoundSearchUpdated")}
                        ariaLabel={"Updated:"}
                        style={inputStyle}
                        value={updatedDateFilter}
                        onChange={(e) => setUpdatedDateFilter(e.target.value)}
                      />
                      <InputFieldControlled
                        type={"date"}
                        id={"todos"}
                        name={"Todos"}
                        label={t("housekeeping.lostandfound.lostandfoundSearchAll")}
                        ariaLabel={"All:"}
                        style={inputStyle}
                        value={equalDates}
                        onChange={(e) => setEqualDates(e.target.value)}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <InputFieldControlled
                type={"date"}
                id={"de"}
                name={"De"}
                label={t("housekeeping.lostandfound.lostandfoundDateIn")}
                ariaLabel={"In:"}
                style={inputStyle}
                value={dateFromFilter}
                onChange={(e) => setDateFromFilter(e.target.value)}
              />
              <InputFieldControlled
                type={"date"}
                id={"ate"}
                name={"Até"}
                label={t("housekeeping.lostandfound.lostandfoundDateUntil")}
                ariaLabel={"until:"}
                style={inputStyle}
                value={currentDate}
              />

              <InputFieldControlled
                type={"text"}
                id={"search"}
                name={"Search"}
                label={t("housekeeping.lostandfound.lostandfoundSearchRoom")}
                ariaLabel={"room"}
                value={roomNumberFilter}
                onChange={(e) => setRoomNumberFilter(e.target.value)}
              />
              <InputFieldControlled
                type={"text"}
                id={"search"}
                name={"Search"}
                label={t("housekeeping.lostandfound.lostandfoundSearchGuestName")}
                ariaLabel={"search"}
                value={guestNameFilter}
                onChange={(e) => setGuestNameFilter(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleReset} color="primary" className="ml-auto mr-4">{t("housekeeping.lostandfound.lostandfoundButtonClean")}</Button>
          <Button onClick={handleSearch} color="primary" className="mr-4" >{t("general.search")}</Button>
          <LostandFoundForm
            buttonName={t("general.newRecord")}
            buttonIcon={<FiPlus size={15} />}
            buttonColor={"primary"}
            modalHeader={t("housekeeping.lostandfound.lostandfoundNewModalHeader")}
            modalIcons={"bg-red"}
            formTypeModal={10}
          ></LostandFoundForm>
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
              onClick={() => handleButtonClick(1)}
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === 1 ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
            >
              {t("housekeeping.lostandfound.lostandfoundSearchLost")}
            </button>
            <button
              onClick={() => handleButtonClick(2)}
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === 2 ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
            >
              {t("housekeeping.lostandfound.lostandfoundSearchFound")}
            </button>
            <button
              onClick={() => handleButtonClick(3)}
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === 3 ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
            >
              {t("housekeeping.lostandfound.lostandfoundSearchConcluded")}
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
              {t("housekeeping.lostandfound.table.id")}
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-10 uppercase" aria-label="Nome do Hóspede">
              {t("housekeeping.lostandfound.table.registrationdate")}
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-10 uppercase" aria-label="Check-In">
              {t("housekeeping.lostandfound.table.state")}
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-6 uppercase" aria-label="Check-Out">
              {t("housekeeping.lostandfound.table.room")}
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-10 uppercase" aria-label="Noites">
              {t("housekeeping.lostandfound.table.local")}
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-10 uppercase" aria-label="Quarto">
              {t("housekeeping.lostandfound.table.guestname")}
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-10 uppercase" aria-label="RT">
              {t("housekeeping.lostandfound.table.itemoccurrence")}
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-10 uppercase" aria-label="Pessoas">
              {t("housekeeping.lostandfound.table.user")}
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-10 uppercase" aria-label="Status">
              {t("housekeeping.lostandfound.table.updatedon")}
              </TableColumn>
              <TableColumn className="bg-primary-600 text-white flex justify-end items-center pr-7" aria-label="Funções">
                <GoGear size={20} />
              </TableColumn>
            </TableHeader>
            <TableBody>
              {filteredItems.map((lostAndFound, index) => (
                <TableRow key={index}>
                  <TableCell className="">{lostAndFound.referenceNumber}</TableCell>
                  <TableCell className="">{lostAndFound.foundDate}</TableCell>
                  <TableCell className="px-[2.5%]"> {renderStatusIcon(lostAndFound.isFound)}</TableCell>
                  <TableCell className="px-[2%]">{lostAndFound.roomNumber}</TableCell>
                  <TableCell className="px-[3%]">{lostAndFound.location}</TableCell>
                  <TableCell className="px-[3%]">{lostAndFound.userName}</TableCell>
                  <TableCell className="px-[2%]">{lostAndFound.description}</TableCell>
                  <TableCell className="px-[2.5%]">{lostAndFound.foundByUser}</TableCell>
                  <TableCell className="">{lostAndFound.updatedAt}</TableCell>
                  <TableCell className="flex justify-end">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="light" className="flex flex-row justify-end">
                          <BsThreeDotsVertical size={20} className="text-gray-400" />
                        </Button>
                      </DropdownTrigger>
                      {DropdownMenus(lostAndFound.isFound, lostAndFound.referenceNumber)}
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