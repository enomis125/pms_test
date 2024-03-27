"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination,
  Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem,
  Input
} from "@nextui-org/react";
import { GoGear } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { FiEdit3 } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";
import FormModals from "@/components/modal/bookings/formModals";
import PaginationTable from "@/components/table/paginationTable/paginationTable";

const searchOptions = [
  { label: "Description", value: "resmark" },
  { label: "ID", value: "resID" },
  // Add more options as needed
];

export default function Characteristics() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchValue, setSearchValue] = React.useState("");
  const [searchField, setSearchField] = React.useState(searchOptions[0].value); // Default search field

  const [reservStatus, setReservStatus] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/v1/bookings/reservationStatus");
      setReservStatus(res.data.response);
    };
    getData();
  }, []);

  const filteredItems = React.useMemo(() => {
    if (!reservStatus || !Array.isArray(reservStatus)) {
      return [];
    }

    return reservStatus.filter((reserve) => {
      if (!searchField) {
        return false;
      }

      // Convert ID to string for comparison
      if (searchField === "resID") {
        return reserve[searchField].toString().includes(searchValue);
      }

      // For other fields, ensure it's a string before performing a case-insensitive search
      return reserve[searchField] && typeof reserve[searchField] === 'string' && reserve[searchField].toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [reservStatus, searchValue, searchField]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
    setPage(1);
  };

  const handleDelete = async (idReservStatus) => {
    try {
      const response = await axios.delete(`/api/v1/bookings/reservationStatus/` + idReservStatus);
      alert("Estado de Reserva removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover estado de reserva.", error.message);
    }
  };

  return (
    <main>
      <div className="flex flex-col mt-3 py-3">
        <p className="text-xs px-6">Estados de Reservas</p>
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
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light" className="flex flex-row justify-end">
                  Search by: {searchOptions.find(option => option.value === searchField)?.label}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Search Field">
                {searchOptions.map((option, index) => (
                  <DropdownItem key={index} onClick={() => setSearchField(option.value)}>{option.label}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <FormModals
            buttonName={"Novo"}
            buttonIcon={<FiPlus size={15} />}
            buttonColor={"primary"}
            modalHeader={"Inserir Estado de Reserva"}
            modalIcons={"bg-red"}
            formTypeModal={11}
          ></FormModals>
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
              <TableColumn className="bg-primary-600 text-white font-bold w-[2%] uppercase">ID</TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold w-64 px-40 uppercase">Abreviatura</TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold flex-3/4 uppercase">Descrição</TableColumn>
              <TableColumn className="bg-primary-600 text-white font-bold px-20 uppercase">Ordenação</TableColumn>
              <TableColumn className="bg-primary-600 text-white flex justify-end items-center pr-7">
                <GoGear size={20} />
              </TableColumn>
            </TableHeader>
            <TableBody>
              {items.map((reservStatus, index) => (
                <TableRow key={index}>
                  <TableCell className="text-right underline text-blue-600">
                    <FormModals
                      buttonName={reservStatus.resID}
                      editIcon={<FiEdit3 size={25} />}
                      buttonColor={"transparent"}
                      modalHeader={"Editar Estado de Reserva"}
                      modalEditArrow={<BsArrowRight size={25} />}
                      modalEdit={`ID: ${reservStatus.resID}`}
                      formTypeModal={12}
                      idReservStatus={reservStatus.resID}
                      criado={reservStatus.createdAt}
                      editado={reservStatus.updatedAt}
                      editor={"teste"}
                    />
                  </TableCell>
                  <TableCell className="px-40">{reservStatus.resbez}</TableCell>
                  <TableCell>{reservStatus.resmark}</TableCell>
                  <TableCell className="px-20">{reservStatus.reschar}</TableCell>
                  <TableCell className="flex justify-end">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="light" className="flex flex-row justify-end">
                          <BsThreeDotsVertical size={20} className="text-gray-400" />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Static Actions" closeOnSelect={false} isOpen={true}>
                        <DropdownItem key="edit">
                          <FormModals
                            buttonName={"Editar"}
                            editIcon={<FiEdit3 size={25}/>}
                            buttonColor={"transparent"}
                            modalHeader={"Editar Estado de Reserva"}
                            modalEditArrow={<BsArrowRight size={25}/>}
                            modalEdit={`ID: ${reservStatus.resID}`}
                            formTypeModal={12}
                            idReservStatus={reservStatus.resID}
                            criado={reservStatus.createdAt}
                            editado={reservStatus.updatedAt}
                            editor={"teste"}
                          />
                        </DropdownItem>
                        <DropdownItem key="delete" onClick={() => handleDelete(reservStatus.resID)}>Remover</DropdownItem>
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
