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
import FormModals from "@/components/modal/cardex/formModals";
import PaginationTable from "@/components/table/paginationTable/paginationTable";
 
 
export default function Salutation() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchValue, setSearchValue] = React.useState("");
  const [profession, setProfession] = useState([]);
 
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/v1/cardex/profession");
      setProfession(res.data.response);
    };
    getData();
  }, []);
 
  const filteredItems = React.useMemo(() => {
    if (!profession || !Array.isArray(profession)) {
      return [];
    }
  
    return profession.filter((prof) =>
      (prof.description && prof.description.toLowerCase().includes(searchValue.toLowerCase())) ||
      (prof.professionID && prof.professionID.toString().toLowerCase().includes(searchValue.toLowerCase()))
    );
  }, [profession, searchValue]);
  
 
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
 
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);
 
  const pages = Math.ceil(filteredItems.length / rowsPerPage);
 
  const renderCell = React.useCallback((profession, columnKey) => {
    const cellValue = profession[columnKey];
  }, []);
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
 
  const handleSearchChange = (value) => {
    setSearchValue(value);
    setPage(1);
  };
 
  const handleDelete = async (idProfession) => {
    try {
      const response = await axios.delete(`/api/v1/cardex/profession/` + idProfession);
      alert("Profissão removida com sucesso!");
    } catch (error) {
      console.error("Erro ao remover profissão.", error.message);
    }
  };
 
    return (
      <main>
        <div className="flex flex-col mt-3 py-3">
          <p className="text-xs px-6">Profissão</p>
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
            <FormModals
              buttonName={"Novo"}
              buttonIcon={<FiPlus size={15} />}
              buttonColor={"primary"}
              modalHeader={"Inserir Profissão"}
              modalIcons={"bg-red"}
              formTypeModal={41}
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
          <TableColumn className="bg-primary-600 text-white font-bold w-20 uppercase">
            ID
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold w-30 uppercase">
            Grupo
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold w-1/4 uppercase">
            Abreviatura
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold  uppercase">
            Descrição
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
            Ordenação
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold  uppercase">
            Propriedade
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white flex justify-end items-center pr-7">
            <GoGear size={20} />
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((profession, index) => (
            <TableRow key={index}>
              <TableCell className="text-left underline text-blue-600"><FormModals
                        buttonName={profession.professionID}
                        editIcon={<FiEdit3 size={25}/>}
                        buttonColor={"transparent"}
                        modalHeader={"Editar Profissão"}
                        modalEditArrow={<BsArrowRight size={25}/>}
                        modalEdit={`ID: ${profession.professionID}`}
                        formTypeModal={42}
                        idProfession={profession.professionID}
                        criado={profession.createdAt}
                        editado={profession.updatedAt}
                        editor={"teste"}
                      /></TableCell>
              <TableCell className="">{profession.gruppe}</TableCell>
              <TableCell className="">{profession.abreviature}</TableCell>
              <TableCell className="">{profession.description}</TableCell>
              <TableCell className="">{profession.ordenation}</TableCell>
              <TableCell className="">{profession.property}</TableCell>
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
                      <FormModals
                        buttonName={"Editar"}
                        editIcon={<FiEdit3 size={25}/>}
                        buttonColor={"transparent"}
                        modalHeader={"Editar Profissão"}
                        modalEditArrow={<BsArrowRight size={25}/>}
                        modalEdit={`ID: ${profession.professionID}`}
                        formTypeModal={42}
                        idProfession={profession.professionID}
                        criado={profession.createdAt}
                        editado={profession.updatedAt}
                        editor={"teste"}
                      ></FormModals>
                    </DropdownItem>
                    <DropdownItem key="delete" onClick={() => handleDelete(profession.professionID)}>Remover</DropdownItem>
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

