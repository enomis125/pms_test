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
import NationalityForm from "@/components/modal/cardex/nationality/page";
import PaginationTable from "@/components/table/paginationTable/paginationTable";
 
 
export default function Salutation() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchValue, setSearchValue] = React.useState("");
  const [nationality, setNationality] = useState([]);
 
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/v1/cardex/nationalities");
      setNationality(res.data.response);
    };
    getData();
  }, []);
 
  const filteredItems = React.useMemo(() => {
    if (!nationality || !Array.isArray(nationality)) {
      return [];
    }
  
    return nationality.filter((nat) =>
      (nat.isocode && nat.isocode.toLowerCase().includes(searchValue.toLowerCase())) ||
      (nat.codeNr && nat.codeNr.toString().toLowerCase().includes(searchValue.toLowerCase()))
    );
  }, [nationality, searchValue]);
  
 
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
 
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);
 
  const pages = Math.ceil(filteredItems.length / rowsPerPage);
 
  const renderCell = React.useCallback((nationality, columnKey) => {
    const cellValue = nationality[columnKey];
  }, []);
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
 
  const handleSearchChange = (value) => {
    setSearchValue(value);
    setPage(1);
  };
 
  const handleDelete = async (idNacionality) => {
    try {
      const response = await axios.delete(`/api/v1/cardex/nationalities/` + idNacionality);
      alert("Saudação removida com sucesso!");
    } catch (error) {
      console.error("Erro ao remover saudação.", error.message);
    }
  };
 
    return (
      <main>
        <div className="flex flex-col mt-3 py-3">
          <p className="text-xs px-6">Nacionalidades</p>
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
            <NationalityForm
              buttonName={"Novo"}
              buttonIcon={<FiPlus size={15} />}
              buttonColor={"primary"}
              modalHeader={"Inserir Nacionalidade"}
              modalIcons={"bg-red"}
              formTypeModal={21}
            ></NationalityForm>
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
            dataCSVButton={
              items.map((item) => ({
                ID: item.codeNr,
                Scut: item.land,
                StatNr: item.statNr,
                Ordenação: item.brkopftyp,
                Grupo: item.gruppe,
                CódigoISO: item.isocode,
                State: item.state,
                FO: item.showFO,
                Nacionalidade: item.nation,
              }))
            }
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
          <TableColumn className="bg-primary-600 text-white font-bold w-[40px]  uppercase">
            ID
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold w-30 uppercase">
            Scut.
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold w-1/4 uppercase">
            Stat.nr.
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold  uppercase">
            Ordenação
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
            Grupo
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold  uppercase">
            Código ISO
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold  uppercase">
            State
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold  uppercase">
            FO
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold  uppercase">
            Nacionalidade
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white flex justify-end items-center pr-7">
            <GoGear size={20} />
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((nationality, index) => (
            <TableRow key={index}>
              <TableCell className="text-left underline text-blue-600"><NationalityForm
                        buttonName={nationality.codeNr}
                        editIcon={<FiEdit3 size={25}/>}
                        buttonColor={"transparent"}
                        modalHeader={"Editar Nacionalidade"}
                        modalEditArrow={<BsArrowRight size={25}/>}
                        modalEdit={`ID: ${nationality.codeNr}`}
                        formTypeModal={22}
                        idNacionality={nationality.codeNr}
                        criado={nationality.createdAt}
                        editado={nationality.updatedAt}
                        editor={"teste"}
                      /></TableCell>
              <TableCell className="">{nationality.land}</TableCell>
              <TableCell className="">{nationality.statNr}</TableCell>
              <TableCell className="">{nationality.brkopftyp}</TableCell>
              <TableCell className="">{nationality.gruppe}</TableCell>
              <TableCell className="">{nationality.isocode}</TableCell>
              <TableCell className="">{nationality.state}</TableCell>
              <TableCell className="">{nationality.showFO}</TableCell>
              <TableCell className="">{nationality.nation}</TableCell>
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
                      <NationalityForm
                        buttonName={"Editar"}
                        editIcon={<FiEdit3 size={25}/>}
                        buttonColor={"transparent"}
                        modalHeader={"Editar Nacionalidade"}
                        modalEditArrow={<BsArrowRight size={25}/>}
                        modalEdit={`ID: ${nationality.codeNr}`}
                        formTypeModal={22}
                        idNacionality={nationality.codeNr}
                        criado={nationality.createdAt}
                        editado={nationality.updatedAt}
                        editor={"teste"}
                      ></NationalityForm>
                    </DropdownItem>
                    <DropdownItem key="delete" onClick={() => handleDelete(nationality.codeNr)}>Remover</DropdownItem>
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

