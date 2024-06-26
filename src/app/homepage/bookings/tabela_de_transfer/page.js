
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
import TransferForm from "@/components/modal/bookings/transfers/page";
import PaginationTable from "@/components/table/paginationTable/paginationTable";
import LoadingBackdrop from "@/components/table/loadingBackdrop/loadingBackdrop";
import {useTranslations} from 'next-intl';
 
export default function Transfers() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchValue, setSearchValue] = React.useState("");
  const [transfers, setTransfers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations('Index');
 
  useEffect(() => {
    const getData = async () => {
      try{
        const res = await axios.get("/api/v1/bookings/transfers");
        setTransfers(res.data.response);
      } catch(error) {
        console.error("Erro: ", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);
 
  const filteredItems = React.useMemo(() => {
    return transfers.filter((transfers) =>
    transfers.name.toLowerCase().includes(
        searchValue.toLowerCase()
      ) ||
      transfers.refID.toString().toLowerCase().includes(
        searchValue.toLowerCase()
      )
    );
  }, [transfers, searchValue]);
 
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
 
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);
 
  const pages = Math.ceil(filteredItems.length / rowsPerPage);
 
  const renderCell = React.useCallback((transfers, columnKey) => {
    const cellValue = transfers[columnKey];
  }, []);
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
 
  const handleSearchChange = (value) => {
    setSearchValue(value);
    setPage(1);
  };
 
  const handleDelete = async (idTransfer) => {
    try {
      const response = await axios.delete(`/api/v1/bookings/transfers/` + idTransfer);
      alert("PickUp removida com sucesso!");
    } catch (error) {
      console.error("Erro ao remover PickUp:", error.message);
    }
  };
 
    return (
      <main>
        <div className="flex flex-col mt-3 py-3">
          <p className="text-xs px-6">{t("bookings.pickUp.title")}</p>
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
            <TransferForm
              buttonName={t("general.newRecord")}
              buttonIcon={<FiPlus size={15} />}
              buttonColor={"primary"}
              modalHeader={t("bookings.pickUp.new.modalHeader")}
              modalIcons={"bg-red"}
              formTypeModal={11}
            ></TransferForm>
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
                ID: item.refID,
                Abreviatura: item.shortName,
                Descrição: item.name,
                Ordenação: item.class,
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
          {t("bookings.pickUp.datatable.id")}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
          {t("bookings.pickUp.datatable.abreviature")}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
          {t("bookings.pickUp.datatable.description")}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold w-1/4 px-10 uppercase">
          {t("bookings.pickUp.datatable.order")}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white flex justify-end items-center pr-7">
            <GoGear size={20} />
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((transfers, index) => (

            <TableRow key={index}>
              <TableCell className="text-left underline text-blue-600"><TransferForm
                        buttonName={transfers.refID}
                        editIcon={<FiEdit3 size={25}/>}
                        buttonColor={"transparent"}
                        modalHeader={t("bookings.pickUp.new.modalHeader")}
                        modalEditArrow={<BsArrowRight size={25}/>}
                        modalEdit={`ID: ${transfers.refID}`}
                        formTypeModal={12}
                        idTransfer={transfers.refID}
                        criado={transfers.createdAt}
                        editado={transfers.updatedAt}
                        editor={"teste"}
                      /></TableCell>
              <TableCell >{transfers.shortName}</TableCell>
              <TableCell className="px-10">{transfers.name}</TableCell>
              <TableCell>{transfers.class}</TableCell>
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
                      <TransferForm
                        buttonName={t("general.editRecord")}
                        editIcon={<FiEdit3 size={25}/>}
                        buttonColor={"transparent"}
                        modalHeader={t("bookings.pickUp.edit.modalHeader")}
                        modalEditArrow={<BsArrowRight size={25}/>}
                        modalEdit={`ID: ${transfers.refID}`}
                        formTypeModal={12}
                        idTransfer={transfers.refID}
                        criado={transfers.createdAt}
                        editado={transfers.updatedAt}
                        editor={"teste"}
                      ></TransferForm>
                    </DropdownItem>
                    <DropdownItem key="delete" onClick={() => handleDelete(transfers.refID)}>{t("general.removeRecord")}</DropdownItem>
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
