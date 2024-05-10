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
import CancelReasonForm from "@/components/modal/bookings/cancelReason/page";
import PaginationTable from "@/components/table/paginationTable/paginationTable";
import LoadingBackdrop from "@/components/table/loadingBackdrop/loadingBackdrop";
 
 
export default function cancelReason() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchValue, setSearchValue] = React.useState("");
  const [cancelReason, setCancelReason] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    const getData = async () => {
      try{
        const res = await axios.get("/api/v1/bookings/cancelationReasons");
        setCancelReason(res.data.response);
      } catch(error) {
        console.error("Erro: ", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);
 
  const filteredItems = React.useMemo(() => {
    if (!cancelReason || !Array.isArray(cancelReason)) {
      return [];
    }
  
    return cancelReason.filter((cancel) =>
      (cancel.description && cancel.description.toLowerCase().includes(searchValue.toLowerCase())) ||
      (cancel.cancelReasonID && cancel.cancelReasonID.toString().toLowerCase().includes(searchValue.toLowerCase()))
    );
  }, [cancelReason, searchValue]);
  
 
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
 
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);
 
  const pages = Math.ceil(filteredItems.length / rowsPerPage);
 
  const renderCell = React.useCallback((cancelType, columnKey) => {
    const cellValue = cancelType[columnKey];
  }, []);
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
 
  const handleSearchChange = (value) => {
    setSearchValue(value);
    setPage(1);
  };
 
  const handleDelete = async (idCancelReason) => {
    try {
      const response = await axios.delete(`/api/v1/bookings/cancelationReasons/` + idCancelReason);
      alert("Razão de cancelamento removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover razão de cancelamento:", error.message);
    }
  };
 
    return (
      <main>
        <div className="flex flex-col mt-3 py-3">
          <p className="text-xs px-6">Razão de Cancelamento</p>
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
            <CancelReasonForm
              buttonName={"Novo"}
              buttonIcon={<FiPlus size={15} />}
              buttonColor={"primary"}
              modalHeader={"Inserir Tipos de Recusa"}
              modalIcons={"bg-red"}
              formTypeModal={11}
            ></CancelReasonForm>
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
                ID: item.cancelReasonID,
                Abreviatura: item.class,
                Descrição: item.name,
                Ordenação: item.shortName,
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
          <TableColumn className="bg-primary-600 text-white font-bold w-64 px-40 uppercase">
            Abreviatura
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold flex-3/4 uppercase">
            Descrição
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold px-20 uppercase">
            Ordenação
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white flex justify-end items-center pr-7">
            <GoGear size={20} />
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((cancelReason, index) => (
            <TableRow key={index}>
              <TableCell className="text-right underline text-blue-600"><CancelReasonForm
                        buttonName={cancelReason.cancelReasonID}
                        editIcon={<FiEdit3 size={25}/>}
                        buttonColor={"transparent"}
                        modalHeader={"Editar Recusa"}
                        modalEditArrow={<BsArrowRight size={25}/>}
                        modalEdit={`ID: ${cancelReason.cancelReasonID}`}
                        formTypeModal={12}
                        idCancelReason={cancelReason.cancelReasonID}
                        criado={cancelReason.createdAt}
                        editado={cancelReason.updatedAt}
                        editor={"teste"}
                      /></TableCell>
              <TableCell className="px-40">{cancelReason.class}</TableCell>
              <TableCell>{cancelReason.name}</TableCell>
              <TableCell className="px-20">{cancelReason.shortName}</TableCell>
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
                      <CancelReasonForm
                        buttonName={"Editar"}
                        editIcon={<FiEdit3 size={25}/>}
                        buttonColor={"transparent"}
                        modalHeader={"Editar Recusa"}
                        modalEditArrow={<BsArrowRight size={25}/>}
                        modalEdit={`ID: ${cancelReason.cancelReasonID}`}
                        formTypeModal={12}
                        idCancelReason={cancelReason.cancelReasonID}
                        criado={cancelReason.createdAt}
                        editado={cancelReason.updatedAt}
                        editor={"teste"}
                      ></CancelReasonForm>
                    </DropdownItem>
                    <DropdownItem key="delete" onClick={() => handleDelete(cancelReason.cancelReasonID)}>Remover</DropdownItem>
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

