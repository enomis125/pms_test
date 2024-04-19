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
import RoomForm from "@/components/modal/hotelSetup/rooms/page";
import PaginationTable from "@/components/table/paginationTable/paginationTable";
 
 
export default function Rooms() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchValue, setSearchValue] = React.useState("");
  const [rooms, setRooms] = useState([]);
 
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/v1/hotel/rooms");
      setRooms(res.data.response);
    };
    getData();
  }, []);
 
  const filteredItems = React.useMemo(() => {
    return rooms.filter((rooms) =>
      rooms.description.toLowerCase().includes(
        searchValue.toLowerCase()
      ) ||
      rooms.roomID.toString().toLowerCase().includes(
        searchValue.toLowerCase()
      )
    );
  }, [rooms, searchValue]);
 
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
 
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);
 
  const pages = Math.ceil(filteredItems.length / rowsPerPage);
 
  const renderCell = React.useCallback((rooms, columnKey) => {
    const cellValue = rooms[columnKey];
  }, []);
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
 
  const handleSearchChange = (value) => {
    setSearchValue(value);
    setPage(1);
  };
 
  const handleDelete = async (idRoom) => {
    try {
      const response = await axios.delete(`/api/v1/hotel/rooms/` + idRoom);
      alert("Quarto removida com sucesso!");
    } catch (error) {
      console.error("Erro ao remover quarto:", error.message);
    }
  };
 
    return (
      <main>
        <div className="flex flex-col mt-3 py-3">
          <p className="text-xs px-6">Quartos</p>
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
            <RoomForm
              buttonName={"Novo"}
              buttonIcon={<FiPlus size={15} />}
              buttonColor={"primary"}
              modalHeader={"Inserir Quarto"}
              modalIcons={"bg-red"}
              formTypeModal={11}
            ></RoomForm>
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
                ID: item.roomID,
                Ordem: item.label,
                Abreviatura: item.roomType,
                Descrição: item.pmsHotel,
                Detalhe: item.description,
                Tipologia: item.description2,
                Função: item.temptext
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
          <TableColumn className="bg-primary-600 text-white font-bold w-[40px] uppercase">
            ID
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
            Ordem
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
            Tipologia
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
            Função
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white flex justify-end items-center pr-7">
            <GoGear size={20} />
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((rooms, index) => (

            <TableRow key={index}>
              <TableCell className="text-left underline text-blue-600"><RoomForm
                        buttonName={rooms.roomID}
                        editIcon={<FiEdit3 size={25}/>}
                        buttonColor={"transparent"}
                        modalHeader={"Editar Quartos"}
                        modalEditArrow={<BsArrowRight size={25}/>}
                        modalEdit={`ID: ${rooms.roomID}`}
                        formTypeModal={12}
                        idRoom={rooms.roomID}
                        idRoomType={rooms.roomType}
                        criado={rooms.createdAt}
                        editado={rooms.updatedAt}
                        editor={"teste"}
                      /></TableCell>
              <TableCell >{rooms.label}</TableCell>
              <TableCell className="px-10">{rooms.roomType}</TableCell>
              <TableCell>{rooms.pmsHotel}</TableCell>
              <TableCell>{rooms.description}</TableCell>
              <TableCell>{rooms.description2}</TableCell>
              <TableCell>{rooms.temptext}</TableCell>
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
                      <RoomForm
                        buttonName={"Editar"}
                        editIcon={<FiEdit3 size={25}/>}
                        buttonColor={"transparent"}
                        modalHeader={"Editar Quartos"}
                        modalEditArrow={<BsArrowRight size={25}/>}
                        modalEdit={`ID: ${rooms.roomID}`}
                        formTypeModal={12}
                        idRoom={rooms.roomID}
                        idRoomType={rooms.roomType}
                        criado={rooms.createdAt}
                        editado={rooms.updatedAt}
                        editor={"teste"}
                      ></RoomForm>
                    </DropdownItem>
                    <DropdownItem key="delete" onClick={() => handleDelete(rooms.roomID)}>Remover</DropdownItem>
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