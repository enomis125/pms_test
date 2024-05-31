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
import TipologyGroupForm from "@/components/modal/hotelSetup/tipologyGroup/page";
import PaginationTable from "@/components/table/paginationTable/paginationTable";
import LoadingBackdrop from "@/components/table/loadingBackdrop/loadingBackdrop";
 
 
export default function Characteristics() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchValue, setSearchValue] = React.useState("");
  const [roomtypesgroups, setRoomtypesgroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    const getData = async () => {
      try{
        const res = await axios.get("/api/v1/hotel/tipologyGroup");
        setRoomtypesgroups(res.data.response);
      } catch(error) {
        console.error("Erro: ", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);
 
  const filteredItems = React.useMemo(() => {
    return roomtypesgroups.filter((roomtypesgroups) =>
      roomtypesgroups.roomTypeGroupID.toString().toLowerCase().includes(
        searchValue.toLowerCase()
      )
    );
  }, [roomtypesgroups, searchValue]);
 
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
 
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);
 
  const pages = Math.ceil(filteredItems.length / rowsPerPage);
 
  const renderCell = React.useCallback((roomtypesgroups, columnKey) => {
    const cellValue = roomtypesgroups[columnKey];
  }, []);
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
 
  const handleSearchChange = (value) => {
    setSearchValue(value);
    setPage(1);
  };

  const handleDelete = async (idTypesgroups) => {
    try {
      const response = await axios.delete(`/api/v1/hotel/tipologyGroup/` + idTypesgroups)
      alert("Grupo de Tipologia removida com sucesso!");
    } catch (error) {
      console.error("Erro ao remover grupo de tipologia:", error.message);
    }
  };
 
    return (
      <main>
        <div className="flex flex-col mt-3 py-3">
          <p className="text-xs px-6">Grupo de Tipologia</p>
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
            <TipologyGroupForm
              buttonName={"Novo"}
              buttonIcon={<FiPlus size={15} />}
              buttonColor={"primary"}
              modalHeader={"Inserir Grupo de Tipologia"}
              modalIcons={"bg-red"}
              formTypeModal={11}
            ></TipologyGroupForm>
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
                ID: item.roomTypeGroupID,
                Cod: item.label,
              }))
            }
          >
            <LoadingBackdrop open={isLoading} />
          {!isLoading && (
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
          <TableColumn className="bg-primary-600 text-white font-bold  uppercase">
            COD.
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
            Abreviatura
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold w-1/4 px-10 uppercase">
            Descrição
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
            Detalhe
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
            Estado
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
            Ordem
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white flex justify-end items-center pr-7">
            <GoGear size={20} />
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((roomtypesgroups, index) => (
            <TableRow key={index}>
              <TableCell className="text-left underline text-blue-600"><TipologyGroupForm
                        buttonName={roomtypesgroups.roomTypeGroupID}
                        editIcon={<FiEdit3 size={25}/>}
                        buttonColor={"transparent"}
                        modalHeader={"Editar Grupo de Tipologia"}
                        modalEditArrow={<BsArrowRight size={25}/>}
                        modalEdit={`ID: ${roomtypesgroups.roomTypeGroupID}`}
                        formTypeModal={12}
                        idTypesgroups={roomtypesgroups.roomTypeGroupID}
                        criado={roomtypesgroups.createdAt}
                        editado={roomtypesgroups.updatedAt}
                        editor={"teste"}
                      /></TableCell>
              <TableCell >{roomtypesgroups.label}</TableCell>
              <TableCell >alterar</TableCell>
              <TableCell className="px-10">alterar</TableCell>
              <TableCell>alterar</TableCell>
              <TableCell>alterar</TableCell>
              <TableCell>alterar</TableCell>
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
                      <TipologyGroupForm
                        buttonName={"Editar"}
                        editIcon={<FiEdit3 size={25}/>}
                        buttonColor={"transparent"}
                        modalHeader={"Editar Grupo de Tipologia"}
                        modalEditArrow={<BsArrowRight size={25}/>}
                        modalEdit={`ID: ${roomtypesgroups.roomTypeGroupID}`}
                        formTypeModal={12}
                        idTypesgroups={roomtypesgroups.roomTypeGroupID}
                        criado={roomtypesgroups.createdAt}
                        editado={roomtypesgroups.updatedAt}
                        editor={"teste"}
                      ></TipologyGroupForm>
                    </DropdownItem>
                    <DropdownItem key="delete" onClick={() => handleDelete(roomtypesgroups.roomTypeGroupID)}>Remover</DropdownItem>
                    <DropdownItem key="view">Ver</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
          )}
          </PaginationTable>
        </div>
      </main>
    );
}