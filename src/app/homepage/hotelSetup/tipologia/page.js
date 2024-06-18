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
import TipologyForm from "@/components/modal/hotelSetup/tipology/page";
import PaginationTable from "@/components/table/paginationTable/paginationTable";
import LoadingBackdrop from "@/components/table/loadingBackdrop/loadingBackdrop";

import { useTranslations } from 'next-intl';


export default function Tipologys() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchValue, setSearchValue] = React.useState("");
  const [roomTypeState, setRoomTypeState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const t = useTranslations('Index');

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/api/v1/hotel/tipologys`);
        setRoomTypeState(res.data.response);
      } catch (error) {
        console.error("Erro: ", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  const filteredItems = React.useMemo(() => {
    return roomTypeState.filter((roomTypeState) =>
      roomTypeState.desc.toLowerCase().includes(
        searchValue.toLowerCase()
      ) ||
      roomTypeState.roomTypeID.toString().toLowerCase().includes(
        searchValue.toLowerCase()
      )
    );
  }, [roomTypeState, searchValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const renderCell = React.useCallback((roomTypeState, columnKey) => {
    const cellValue = roomTypeState[columnKey];
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
    setPage(1);
  };

  const handleDelete = async (idRoomtype) => {
    try {
      const response = await axios.delete(`/api/v1/hotel/tipologys/` + idRoomtype);
      alert("Tipologia removida com sucesso!");
    } catch (error) {
      console.error("Erro ao remover tipologia:", error.message);
    }
  };

  return (
    <main>
      <div className="flex flex-col mt-3 py-3">
        <p className="text-xs px-6">{t("hotel.tipologies.label")}</p>
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
          <TipologyForm
            buttonName={t("general.newRecord")}
            buttonIcon={<FiPlus size={15} />}
            buttonColor={"primary"}
            modalHeader={t("hotel.tipologies.new.modalHeader")}
            modalIcons={"bg-red"}
            formTypeModal={11}
          ></TipologyForm>
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
              ID: item.roomTypeID,
              Cod: item.active,
              Abreviatura: item.name,
              Descrição: item.desc,
              Detalhe: item.roomFeaturesDesc,
              Função: item.roomTypePlan,
              GrupoTipologia: item.groupID
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
                  {t("hotel.tipologies.datatable.id")}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold  uppercase">
                  {t("hotel.tipologies.datatable.code")}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase">
                  {t("hotel.tipologies.datatable.shortname")}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold w-1/4 px-10 uppercase">
                  {t("hotel.tipologies.datatable.description")}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase">
                  {t("hotel.tipologies.datatable.details")}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase">
                  {t("hotel.tipologies.datatable.function")}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase">
                  {t("hotel.tipologies.datatable.order")}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase">
                  {t("hotel.tipologies.datatable.tipologyGroup")}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white flex justify-end items-center pr-7">
                  <GoGear size={20} />
                </TableColumn>
              </TableHeader>
              <TableBody>
                {items.map((roomTypeState, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-left underline text-blue-600"><TipologyForm
                      buttonName={roomTypeState.roomTypeID}
                      editIcon={<FiEdit3 size={25} />}
                      buttonColor={"transparent"}
                      modalHeader={t("hotel.tipologies.edit.modalHeader")}
                      modalEditArrow={<BsArrowRight size={25} />}
                      modalEdit={`ID: ${roomTypeState.roomTypeID}`}
                      formTypeModal={12}
                      idRoomtype={roomTypeState.roomTypeID}
                      criado={roomTypeState.createdAt}
                      editado={roomTypeState.updatedAt}
                      editor={"teste"}
                    /></TableCell>
                    <TableCell >{roomTypeState.active}</TableCell>
                    <TableCell >{roomTypeState.name}</TableCell>
                    <TableCell className="px-10">{roomTypeState.desc}</TableCell>
                    <TableCell>{roomTypeState.roomFeaturesDesc}</TableCell>
                    <TableCell>{roomTypeState.roomTypePlan}</TableCell>
                    <TableCell>alterar</TableCell>
                    <TableCell>{roomTypeState.groupID}</TableCell>
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
                            <TipologyForm
                              buttonName={t("general.editRecord")}
                              editIcon={<FiEdit3 size={25} />}
                              buttonColor={"transparent"}
                              modalHeader={t("hotel.tipologies.edit.modalHeader")}
                              modalEditArrow={<BsArrowRight size={25} />}
                              modalEdit={`ID: ${roomTypeState.roomTypeID}`}
                              formTypeModal={12}
                              idRoomtype={roomTypeState.roomTypeID}
                              criado={roomTypeState.createdAt}
                              editado={roomTypeState.updatedAt}
                              editor={"teste"}
                            ></TipologyForm>
                          </DropdownItem>
                          <DropdownItem key="delete" onClick={() => handleDelete(roomTypeState.roomTypeID)}>{t("general.removeRecord")}</DropdownItem>
                          <DropdownItem key="view">{t("general.viewRecord")}</DropdownItem>
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