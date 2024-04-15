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

//imports de componentes
import IndividualForm from "@/components/modal/frontOffice/clientForm/individuals/page";
import PaginationTable from "@/components/table/paginationTable/paginationTable";


export default function clientForm() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchValue, setSearchValue] = React.useState("");
  const [individual, setIndividual] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/v1/frontOffice/clientForm/individuals");
      setIndividual(res.data.response);
    };
    getData();
  }, []);

  const filteredItems = React.useMemo(() => {
    if (!individual || !Array.isArray(individual)) {
      return [];
    }

    return individual.filter((individual) =>
      (individual.firstName && individual.firstName.toLowerCase().includes(searchValue.toLowerCase())) ||
      (individual.guestProfileID && individual.guestProfileID.toString().toLowerCase().includes(searchValue.toLowerCase()))
    );
  }, [individual, searchValue]);


  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const renderCell = React.useCallback((individual, columnKey) => {
    const cellValue = individual[columnKey];
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
    setPage(1);
  };

  const handleDelete = async (idIndividual) => {
    try {
      const response = await axios.delete(`/api/v1/frontOffice/clientForm/individuals/` + idIndividual);
      alert("Departamento removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover departamento.", error.message);
    }
  };

  //botoes que mudam de cor
  const [selectedButton, setSelectedButton] = useState("")

  const [selectedComponent, setSelectedComponent] = useState(null)

  const handleClickIndividual = () => {
    setSelectedComponent('IndividualForm')
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

  return (
    <main>
      <div className="flex flex-col mt-1 py-3">
        <p className="text-xs px-6">Reservas</p>
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
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>
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
              {items.map((individual, index) => (
                <TableRow key={index}>
                  <TableCell className="text-right undeline text-blue-600">
                      <IndividualForm
                        buttonName={individual.guestProfileID}
                        editIcon={<FiEdit3 size={25} />}
                        buttonColor={"transparent"}
                        modalHeader={"Editar Ficha de Cliente"}
                        modalEditArrow={<BsArrowRight size={25} />}
                        modalEdit={`ID: ${individual.guestProfileID}`}
                        formTypeModal={1}
                        idIndividual={individual.guestProfileID}
                        idEmail={individual.email}
                        idPhone={individual.phoneNumber}
                        idNif={individual.nif}
                        idAddress={individual.country}
                        idZipCode={individual.zipCode}
                        idLocality={individual.town}
                        criado={individual.createdAt}
                        editado={individual.updatedAt}
                        editor={"teste"}
                      />
                  </TableCell>
                  <TableCell className="px-4">{"alterar alterar alterar"}</TableCell>
                  <TableCell className="px-10">{"alterar"}</TableCell>
                  <TableCell className="px-10">{"alterar"}</TableCell>
                  <TableCell className="px-40">{"alterar"}</TableCell>
                  <TableCell className="px-40">{"alterar"}</TableCell>
                  <TableCell className="px-40">{"aa"}</TableCell>
                  <TableCell className="px-[12%]">{"alterar"}</TableCell>
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
                            <IndividualForm
                              buttonName={"Editar"}
                              editIcon={<FiEdit3 size={25} />}
                              buttonColor={"transparent"}
                              modalHeader={"Editar Ficha de Cliente"}
                              modalEditArrow={<BsArrowRight size={25} />}
                              modalEdit={`ID: ${individual.guestProfileID}`}
                              formTypeModal={1}
                              idIndividual={individual.guestProfileID}
                              idEmail={individual.email}
                              idPhone={individual.phoneNumber}
                              idNif={individual.nif}
                              idAddress={individual.country}
                              idZipCode={individual.zipCode}
                              idLocality={individual.town}
                              criado={individual.createdAt}
                              editado={individual.updatedAt}
                              editor={"teste"}
                            />
                        </DropdownItem>
                        <DropdownItem key="delete" aria-label="Remover item" onClick={() => handleDelete(individual.guestProfileID)}>Remover</DropdownItem>
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
