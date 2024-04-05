
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
import VipCodeForm from "@/components/modal/cardex/vipCode/page";
import PaginationTable from "@/components/table/paginationTable/paginationTable";
 
 
export default function Vipcode() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchValue, setSearchValue] = React.useState("");
  const [vipcode, setVipcode] = useState([]);
 
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/v1/cardex/vipcode");
      setVipcode(res.data.response);
    };
    getData();
  }, []);
 
  const filteredItems = React.useMemo(() => {
    return vipcode.filter((vipcode) =>
    vipcode.description.toLowerCase().includes(
        searchValue.toLowerCase()
      ) ||
      vipcode.customerCode.toString().toLowerCase().includes(
        searchValue.toLowerCase()
      )
    );
  }, [vipcode, searchValue]);
 
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
 
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);
 
  const pages = Math.ceil(filteredItems.length / rowsPerPage);
 
  const renderCell = React.useCallback((vipcode, columnKey) => {
    const cellValue = vipcode[columnKey];
  }, []);
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
 
  const handleSearchChange = (value) => {
    setSearchValue(value);
    setPage(1);
  };
 
  const handleDelete = async (idVipcode) => {
    try {
      const response = await axios.delete(`/api/v1/cardex/vipcode/` + idVipcode);
      alert("VIP removida com sucesso!");
    } catch (error) {
      console.error("Erro ao remover PickUp:", error.message);
    }
  };
  
 
    return (
      <main>
        <div className="flex flex-col mt-3 py-3">
          <p className="text-xs px-6">Tipos de VIP</p>
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
            <VipCodeForm
              buttonName={"Novo"}
              buttonIcon={<FiPlus size={15} />}
              buttonColor={"primary"}
              modalHeader={"Inserir Tipo de VIP"}
              modalIcons={"bg-red"}
              formTypeModal={11}
            ></VipCodeForm>
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
                ID: item.customerCode,
                Descrição: item.description,
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
            Abreviatura
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
            Descrição
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold w-1/4 px-10 uppercase">
            Ordenação
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold w-1/4 px-10 uppercase">
            Propriedade
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white flex justify-end items-center pr-7">
            <GoGear size={20} />
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((vipcode, index) => (

            <TableRow key={index}>
              <TableCell className="text-left underline text-blue-600"><VipCodeForm
                        buttonName={vipcode.customerCode}
                        editIcon={<FiEdit3 size={25}/>}
                        buttonColor={"transparent"}
                        modalHeader={"Editar Tipo de VIP"}
                        modalEditArrow={<BsArrowRight size={25}/>}
                        modalEdit={`ID: ${vipcode.customerCode}`}
                        formTypeModal={12}
                        idVipcode={vipcode.customerCode}
                        criado={vipcode.createdAt}
                        editado={vipcode.updatedAt}
                        editor={"teste"}
                      /></TableCell>
              <TableCell >{vipcode.description}</TableCell>
              <TableCell className="px-10"></TableCell>
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
                  <DropdownMenu aria-label="Static Actions" closeOnSelect={true} isOpen={true}>
                    <DropdownItem key="edit">
                      <VipCodeForm
                        buttonName={"Editar"}
                        editIcon={<FiEdit3 size={25}/>}
                        buttonColor={"transparent"}
                        modalHeader={"Editar Tipo de VIP"}
                        modalEditArrow={<BsArrowRight size={25}/>}
                        modalEdit={`ID: ${vipcode.customerCode}`}
                        formTypeModal={12}
                        idVipcode={vipcode.customerCode}
                        criado={vipcode.createdAt}
                        editado={vipcode.updatedAt}
                        editor={"teste"}
                      ></VipCodeForm>
                    </DropdownItem>
                    <DropdownItem key="delete" onClick={() => handleDelete(vipcode.customerCode)}>Remover</DropdownItem>
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
