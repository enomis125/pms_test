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
import { FaCalendarAlt } from "react-icons/fa"; 

//imports de componentes
import PriceManagementForm from "@/components/modal/priceManagement/page";
import PaginationTable from "@/components/table/paginationTable/paginationTable";
import LoadingBackdrop from "@/components/table/loadingBackdrop/loadingBackdrop";
 
 
export default function riceManagement() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchValue, setSearchValue] = React.useState("");
  const [priceManagement, setPriceManagement] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    const getData = async () => {
      try{
        const res = await axios.get("/api/v1/prices/priceManagement");
        setPriceManagement(res.data.response);
      } catch(error) {
        console.error("Erro: ", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);
 
  const filteredItems = React.useMemo(() => {
    return  priceManagement.filter(( priceManagement) =>
      priceManagement.toString().toLowerCase().includes(
        searchValue.toLowerCase()
      ) ||
      priceManagement.toString().toLowerCase().includes(
        searchValue.toLowerCase()
      )
    );
  }, [ priceManagement, searchValue]);
 
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
 
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);
 
  const pages = Math.ceil(filteredItems.length / rowsPerPage);
 
  const renderCell = React.useCallback((priceManagement, columnKey) => {
    const cellValue = priceManagement[columnKey];
  }, []);
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
 
  const handleSearchChange = (value) => {
    setSearchValue(value);
    setPage(1);
  };
 
  const handleDelete = async (idPriceManagement) => {
    try {
      const response = await axios.delete(`/api/v1/prices/priceManagement/` + idPriceManagement);
      alert("Grupo de preços removida com sucesso!");
    } catch (error) {
      console.error("Erro ao remover grupo:", error.message);
    }
  };
 
    return (
      <main>
        <div className="flex flex-col mt-3 py-3">
          <p className="text-xs px-6">Gestão de preços</p>
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
            <PriceManagementForm
              formTypeModal={11}
              buttonName={"Novo"}
              buttonIcon={<FiPlus size={15} />}
              editIcon={<FaCalendarAlt size={25} color="white"/>}
              buttonColor={"primary"}
              modalHeader={"Inserir"}
            ></PriceManagementForm>
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
                ID: item.marketingID,
                Abreviatura: item.abreviature,
                Descrição: item.description,
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
            Nº
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
            Grupo tab.preço
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold w-1/4 px-10 uppercase">
            texto
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
            basis grp.
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
            basis rate
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
            sobretaxa
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
            sobretaxa fixa
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
            pessoas
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
            dividir
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
            ref
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
            ordenação
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
            hotel da reserva
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white flex justify-end items-center pr-7">
            <GoGear size={20} />
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((priceManagement, index) => (
            <TableRow key={index}>
              <TableCell className="text-left underline text-blue-600"><PriceManagementForm
                        buttonName={priceManagement.rategrpID}
                        editIcon={<FiEdit3 size={25}/>}
                        buttonColor={"transparent"}
                        modalHeader={"Editar Marketing"}
                        modalEditArrow={<BsArrowRight size={25}/>}
                        modalEdit={`ID: ${priceManagement.rategrpID}`}
                        formTypeModal={12}
                        idPriceManagement={priceManagement.rategrpID}
                        criado={priceManagement.createdAt}
                        editado={priceManagement.updatedAt}
                        editor={"teste"}
                      /></TableCell>
              <TableCell>{priceManagement.ratergrpExID}</TableCell>
              <TableCell >{priceManagement.raterName}</TableCell>
              <TableCell>{priceManagement.gdsCode}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
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
                      <PriceManagementForm
                        buttonName={"Editar"}
                        editIcon={<FiEdit3 size={25}/>}
                        buttonColor={"transparent"}
                        modalHeader={"Editar Marketing"}
                        modalEditArrow={<BsArrowRight size={25}/>}
                        modalEdit={`ID: ${priceManagement.rategrpID}`}
                        formTypeModal={12}
                        idPriceManagement={priceManagement.rategrpID}
                        criado={priceManagement.createdAt}
                        editado={priceManagement.updatedAt}
                        editor={"teste"}
                      ></PriceManagementForm>
                    </DropdownItem>
                    <DropdownItem key="delete" onClick={() => handleDelete(priceManagement.rategrpID)}>Remover</DropdownItem>
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
