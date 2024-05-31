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
import CancelTypeForm from "@/components/modal/bookings/cancelType/page";
import PaginationTable from "@/components/table/paginationTable/paginationTable";
import LoadingBackdrop from "@/components/table/loadingBackdrop/loadingBackdrop";
 
 
export default function cancelType() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchValue, setSearchValue] = React.useState("");
  const [cancelType, setCancelType] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    const getData = async () => {
      try{
        const res = await axios.get("/api/v1/bookings/cancelationTypes");
        setCancelType(res.data.response);
      } catch(error) {
        console.error("Erro: ", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);
 
  const filteredItems = React.useMemo(() => {
    if (!cancelType || !Array.isArray(cancelType)) {
      return [];
    }
  
    return cancelType.filter((cancel) =>
      (cancel.description && cancel.description.toLowerCase().includes(searchValue.toLowerCase())) ||
      (cancel.cancelationTypeID && cancel.cancelationTypeID.toString().toLowerCase().includes(searchValue.toLowerCase()))
    );
  }, [cancelType, searchValue]);
  
 
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
 
  const handleDelete = async (idCancelType) => {
    try {
      const response = await axios.delete(`/api/v1/bookings/cancelationTypes/` + idCancelType);
      alert("Tipo de cancelamento removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover tipo de cancelamento:", error.message);
    }
  };
 
    return (
      <main>
        <div className="flex flex-col mt-3 py-3">
          <p className="text-xs px-6">Tipo de Cancelamento</p>
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
            <CancelTypeForm
              buttonName={"Novo"}
              buttonIcon={<FiPlus size={15} />}
              buttonColor={"primary"}
              modalHeader={"Inserir Tipos de Cancelamento"}
              modalIcons={"bg-red"}
              formTypeModal={11}
            ></CancelTypeForm>
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
                ID: item.cancelationTypeID,
                Abreviatura: item.abreviature,
                Descrição: item.description,
                Ordenação: item.ordenation,
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
          {items.map((cancelType, index) => (
            <TableRow key={index}>
              <TableCell className="text-right underline text-blue-600"><CancelTypeForm
                        buttonName={cancelType.cancelationTypeID}
                        editIcon={<FiEdit3 size={25}/>}
                        buttonColor={"transparent"}
                        modalHeader={"Editar Tipos de cancelamento"}
                        modalEditArrow={<BsArrowRight size={25}/>}
                        modalEdit={`ID: ${cancelType.cancelationTypeID}`}
                        formTypeModal={12}
                        idCancelType={cancelType.cancelationTypeID}
                        criado={cancelType.createdAt}
                        editado={cancelType.updatedAt}
                        editor={"teste"}
                      /></TableCell>
              <TableCell className="px-40">{cancelType.abreviature}</TableCell>
              <TableCell>{cancelType.description}</TableCell>
              <TableCell className="px-20">{cancelType.ordenation}</TableCell>
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
                      <CancelTypeForm
                        buttonName={"Editar"}
                        editIcon={<FiEdit3 size={25}/>}
                        buttonColor={"transparent"}
                        modalHeader={"Editar Tipos de cancelamento"}
                        modalEditArrow={<BsArrowRight size={25}/>}
                        modalEdit={`ID: ${cancelType.cancelationTypeID}`}
                        formTypeModal={12}
                        idCancelType={cancelType.cancelationTypeID}
                        criado={cancelType.createdAt}
                        editado={cancelType.updatedAt}
                        editor={"teste"}
                      ></CancelTypeForm>
                    </DropdownItem>
                    <DropdownItem key="delete" onClick={() => handleDelete(cancelType.cancelationTypeID)}>Remover</DropdownItem>
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

