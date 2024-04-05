"use client";
import React, { useEffect, useState } from "react";
//import de axios para BD
import axios from "axios";
import {
  //imports de tabelas
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination,
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
  const [reservChange, setReservChange] = useState([]);
 
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/v1/bookings/reservationChange");
      setReservChange(res.data.response);
    };
    getData();
  }, []);
 
  const filteredItems = React.useMemo(() => {
    if (!reservChange || !Array.isArray(reservChange)) {
      return [];
    }
  
    return reservChange.filter((reserv) =>
      (reserv.description && reserv.description.toLowerCase().includes(searchValue.toLowerCase())) ||
      (reserv.reservationchangeID && reserv.reservationchangeID.toString().toLowerCase().includes(searchValue.toLowerCase()))
    );
  }, [reservChange, searchValue]);
  
 
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
 
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);
 
  const pages = Math.ceil(filteredItems.length / rowsPerPage);
 
  const renderCell = React.useCallback((reservChange, columnKey) => {
    const cellValue = reservChange[columnKey];
  }, []);
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
 
  const handleSearchChange = (value) => {
    setSearchValue(value);
    setPage(1);
  };
 
  const handleDelete = async (idReservChange) => {
    try {
      const response = await axios.delete(`/api/v1/bookings/reservationChange/` + idReservChange);
      alert("Departamento removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover departamento.", error.message);
    }
  };
 
    return (
      <main>
        <div className="flex flex-col mt-3 py-3">
          <p className="text-xs px-6">Fichas de Clientes</p>
          <div className="flex flex-row justify-between items-center mx-5">
            <div className="flex flex-row">
              <div className="flex flex-wrap md:flex-nowrap gap-4">
                <Input
                  className="mt-4 w-80"
                  placeholder="Procurar..."
                  labelPlacement="outside"
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
              modalEditArrow={<BsArrowRight size={25}/>}
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
          <TableColumn className="bg-primary-600 text-white font-bold w-[40px] uppercase">
            ID
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold px-20 uppercase">
            Tipo de ficha
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
            Nome
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
            Apelido
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
            País
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
            E-mail
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
            Telefone
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white flex justify-end items-center pr-7">
            <GoGear size={20} />
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((reservChange, index) => (
            <TableRow key={index}>
              <TableCell className="text-right undeline text-blue-600"><IndividualForm
                        buttonName={reservChange.reservationchangeID}
                        editIcon={<FiEdit3 size={25}/>}
                        buttonColor={"transparent"}
                        modalHeader={"Editar Anulação de Cobrança"}
                        modalEditArrow={<BsArrowRight size={25}/>}
                        modalEdit={`ID: ${reservChange.reservationchangeID}`}
                        formTypeModal={0}
                        idReservChange={reservChange.reservationchangeID}
                        criado={reservChange.createdAt}
                        editado={reservChange.updatedAt}
                        editor={"teste"}
                      /></TableCell>
              <TableCell className="px-20">{reservChange.abreviature}</TableCell>
              <TableCell className="">{reservChange.ordenation}</TableCell>
              <TableCell className="">{reservChange.ordenation}</TableCell>
              <TableCell className="">{reservChange.ordenation}</TableCell>
              <TableCell className="">{reservChange.ordenation}</TableCell>
              <TableCell className="">{reservChange.ordenation}</TableCell>
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
                  <DropdownMenu aria-label="Static Actions" closeOnSelect={false} isOpen={true}>
                    <DropdownItem key="edit">
                      <IndividualForm
                        buttonName={"Editar"}
                        editIcon={<FiEdit3 size={25}/>}
                        buttonColor={"transparent"}
                        modalHeader={"Editar Anulação de Cobrança"}
                        modalEditArrow={<BsArrowRight size={25}/>}
                        modalEdit={`ID: ${reservChange.reservationchangeID}`}
                        formTypeModal={0}
                        idReservChange={reservChange.reservationchangeID}
                        criado={reservChange.createdAt}
                        editado={reservChange.updatedAt}
                        editor={"teste"}
                      ></IndividualForm>
                    </DropdownItem>
                    <DropdownItem key="delete" onClick={() => handleDelete(reservChange.reservationchangeID)}>Remover</DropdownItem>
                    <DropdownItem key="view">Ver</DropdownItem>
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

