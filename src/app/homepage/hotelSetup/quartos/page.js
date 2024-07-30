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
import RoomForm from "@/components/modal/hotelSetup/rooms/page";
import PaginationTable from "@/components/table/paginationTable/paginationTable";
import LoadingBackdrop from "@/components/table/loadingBackdrop/loadingBackdrop";

import { useTranslations } from 'next-intl';

export default function Rooms() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [searchValue, setSearchValue] = useState("");
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const t = useTranslations('Index');

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/v1/hotel/rooms");
        setRooms(res.data.response);
      } catch (error) {
        console.error("Erro: ", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  const handleOpenModal = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRoom(null);
    setIsModalOpen(false);
  };

  const filteredItems = rooms.filter((room) =>
    room.description.toLowerCase().includes(searchValue.toLowerCase()) ||
    room.roomID.toString().toLowerCase().includes(searchValue.toLowerCase())
  );

  const items = filteredItems.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pages = Math.ceil(filteredItems.length / rowsPerPage);

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
      await axios.delete(`/api/v1/hotel/rooms/${idRoom}`);
      alert("Quarto removido com sucesso!");
      setRooms(rooms.filter(room => room.roomID !== idRoom)); // Update the rooms state after deletion
    } catch (error) {
      console.error("Erro ao remover quarto:", error.message);
    }
  };

  return (
    <main>
      <div className="flex flex-col mt-3 py-3">
        <p className="text-xs px-6">{t("hotel.rooms.label")}</p>
        <div className="flex flex-row justify-between items-center mx-5">
          <div className="flex flex-row">
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              <Input
                className="mt-4 w-80"
                placeholder={t("general.search")}
                labelPlacement="outside"
                startContent={
                  <FiSearch color={"black"} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={() => handleOpenModal()} color="primary" className="w-fit">
              {t("general.newRecord")} <FiPlus size={15} />
          </Button>
          </div>
          <RoomForm
            modalHeader={t("hotel.rooms.new.modalHeader")}
            modalIcons={"bg-red"}
            formTypeModal={11}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            room={selectedRoom}
          />
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
                  {t("hotel.rooms.datatable.id")}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase">
                  {t("hotel.rooms.datatable.order")}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase">
                  {t("hotel.rooms.datatable.shortname")}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold w-1/4 px-10 uppercase">
                  {t("hotel.rooms.datatable.description")}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase">
                  {t("hotel.rooms.datatable.details")}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase">
                  {t("hotel.rooms.datatable.tipology")}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase">
                  {t("hotel.rooms.datatable.function")}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white flex justify-end items-center pr-7">
                  <GoGear size={20} />
                </TableColumn>
              </TableHeader>
              <TableBody>
                {items.map((room, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-left underline text-blue-600"onClick={() => handleOpenModal(room)}>
                      {room.roomID}
                      <RoomForm
                        editIcon={<FiEdit3 size={25} />}
                        modalHeader={t("hotel.rooms.edit.modalHeader")}
                        modalEditArrow={<BsArrowRight size={25} />}
                        modalEdit={`ID: ${room.roomID}`}
                        formTypeModal={12}
                        idRoom={room.roomID}
                        idRoomType={room.roomType}
                        criado={room.createdAt}
                        editado={room.updatedAt}
                        editor={"teste"}
                        isOpen={selectedRoom?.roomID === room.roomID && isModalOpen}
                        onClose={handleCloseModal}
                        room={selectedRoom}
                      />
                    </TableCell>
                    <TableCell>{room.label}</TableCell>
                    <TableCell className="px-10">{room.roomType}</TableCell>
                    <TableCell>{room.pmsHotel}</TableCell>
                    <TableCell>{room.description}</TableCell>
                    <TableCell>{room.description2}</TableCell>
                    <TableCell>{room.temptext}</TableCell>
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
                        <DropdownMenu aria-label="Static Actions">
                          <DropdownItem key="edit" onClick={() => handleOpenModal(room)}>
                            {t("general.editRecord")}
                          </DropdownItem>
                          <DropdownItem key="delete" onClick={() => handleDelete(room.roomID)}>
                            {t("general.removeRecord")}
                          </DropdownItem>
                          <DropdownItem key="view">
                            {t("general.viewRecord")}
                          </DropdownItem>
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
