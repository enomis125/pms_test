"use client"

import React , {useState} from "react";
import {
  //imports para tabela
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, 
  //imports de dropdown menu
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button,
  //imports de autocomplete box 
  Autocomplete, AutocompleteItem,
  //imports de inputs
  Input
} 
from "@nextui-org/react";
//imports de dados
import {typologys, actions, users } from "../../../data/data";
//imports de icons
import { GoGear } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
//imports de modals
import FormModals from "@/components/modal/hotelSetup/formModals"




export default function TypologyGroup() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);
  
  return (
    <main>
    <div className="flex flex-col my-10 py-3">
        <p className="text-xs px-6">Grupo de Tipologias</p>
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
              />
    </div>
    <Autocomplete 
      variant="underlined"
        label="Selecione a opção" 
        className="max-w-xs" 
      >
        {typologys.map((typology) => (
          <AutocompleteItem key={typology.value} value={typology.value}>
            {typology.label}
          </AutocompleteItem>
        ))}
      </Autocomplete>
          </div>
          <FormModals
            buttonName={"Inserir Grupo Tipologias"}
            buttonIcon={<FiPlus size={15} />}
            buttonColor={"primary"}
            modalHeader={"Inserir Grupo de Tipologias"}
            modalIcons={"bg-red"}
            formTypeModal={11}
          ></FormModals>
        </div>
    </div>
    <div className="mx-5 h-[65vh] min-h-full">
    <Table
      isHeaderSticky={"true"}
        layout={"fixed"}
        removeWrapper
        classNames={{
          wrapper: "min-h-[222px]",
        }}
        className="h-full overflow-auto"
      >
        <TableHeader>
            <TableColumn className="bg-primary-600 text-white">ID</TableColumn>
            <TableColumn className="bg-primary-600 text-white font-bold">COD.</TableColumn>
            <TableColumn className="bg-primary-600 text-white font-bold">DESCRIÇÃO</TableColumn>
            <TableColumn className="bg-primary-600 text-white font-bold">ABREVIATURA</TableColumn>
            <TableColumn className="bg-primary-600 text-white font-bold">DETALHE</TableColumn>
            <TableColumn className="bg-primary-600 text-white font-bold">ESTADO</TableColumn>
            <TableColumn className="bg-primary-600 text-white font-bold">ORDEM</TableColumn>
            <TableColumn className="bg-primary-600 text-white px-10 flex justify-center items-center"><GoGear size={20}/></TableColumn>
        </TableHeader>
        <TableBody>
            <TableRow key="1">
                <TableCell>1</TableCell>
                <TableCell>1234</TableCell>
                <TableCell>Quarto Duplo</TableCell>
                <TableCell>QD</TableCell>
                <TableCell>Quarto duplo em suite no madagascar</TableCell>
                <TableCell>Livre</TableCell>
                <TableCell>PEN</TableCell>
                <TableCell className="flex flex-row gap-4 justify-center">
                <Dropdown>
                <DropdownTrigger>
                    <Button 
                    variant="light" 
                    className="flex flex-row justify-center"
                    >
                    <BsThreeDotsVertical size={20} className="text-gray-400"/>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions" closeOnSelect={false} isOpen={true}>
                    <DropdownItem key="edit">
                      <FormModals
                        buttonName={"Editar"}
                        buttonColor={"transparent"}
                        modalHeader={"Editar Grupo de Tipologias"}
                        formTypeModal={11}
                      ></FormModals>
                    </DropdownItem>
                    <DropdownItem key="delete">Remover</DropdownItem>
                    <DropdownItem key="see">Ver</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
    </div>
    <div className="bg-tableFooter border border-tableFooterBorder flex justify-end items-center lg:pl-72 w-full min-h-10vh fixed bottom-0 right-0 z-20 text-sm text-default-400 py-3">
  <div className="flex flex-row items-center">
  <Pagination
      isCompact
      showControls
      color="primary"
      variant="flat"
      page={page}
      total={pages}
      onChange={(page) => setPage(page)}
      className="mx-5"
    />
        <div>
      <span className="text-sm text-black">
        Items por página:
      </span>
      <select
        value={rowsPerPage}
        className="ml-2 py-1 px-2 border rounded bg-transparent text-sm text-default-600 mx-5"
      >
        <option value={15}>15</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
      </select>
    </div>
    <div className="ml-5 mr-10 text-black">
      <p>X Resultados</p>
    </div>
  </div>
</div>
    </main>
  )
}