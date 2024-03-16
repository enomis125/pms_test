"use client"

import React from "react";
import {
  //imports de tabelas
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
import { IoMdSearch } from "react-icons/io";
import FormModals from "@/components/modal/formModals"




export default function Typology() {
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 10;
  
    const pages = Math.ceil(users.length / rowsPerPage);
  
    const items = React.useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
  
      return users.slice(start, end);
    }, [page, users]);
  return (
    <main className="mx-5">
    <div className="flex flex-col my-10 py-3">
        <p className="text-xs px-6">Tipologias</p>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row">
          <div className="flex flex-wrap md:flex-nowrap gap-4">
        <Input
        className="mt-4 w-80"
          placeholder="Pesquisa"
          labelPlacement="outside"
          startContent={
            <IoMdSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>

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
      <Button color="primary">Inserir</Button>
        </div>
    </div>
    <Table removeWrapper
     bottomContent={
      <div className="flex w-full justify-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="var(--dark-green)"
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
        />
      </div>
    }
    classNames={{
      wrapper: "min-h-[222px]",
    }}>
        <TableHeader>
            <TableColumn className="bg-primary-600 text-[var(--white)] font-bold">ID</TableColumn>
            <TableColumn className="bg-primary-600 text-[var(--white)] font-bold">COD.</TableColumn>
            <TableColumn className="bg-primary-600 text-[var(--white)] font-bold">DESCRIÇÃO</TableColumn>
            <TableColumn className="bg-primary-600 text-[var(--white)] font-bold">ABREVIATURA</TableColumn>
            <TableColumn className="bg-primary-600 text-[var(--white)] font-bold">DETALHE</TableColumn>
            <TableColumn className="bg-primary-600 text-[var(--white)] font-bold">FUNÇÃO</TableColumn>
            <TableColumn className="bg-primary-600 text-[var(--white)] font-bold">ORDEM</TableColumn>
            <TableColumn className="bg-primary-600 text-[var(--white)] font-bold">GRUPO TIPOLOGIA</TableColumn>
            <TableColumn className="bg-primary-600 text-[var(--white)] px-10 flex justify-center items-center"><GoGear size={20}/></TableColumn>
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
                      modalHeader={"Inserir Tipologia"} 
                      formTypeModal={41} 
                      ></FormModals>
                  </DropdownItem>
                    <DropdownItem key="copy">Apagar</DropdownItem>
                </DropdownMenu>
                </Dropdown>
                </TableCell>
            </TableRow>
            <TableRow key="2">
                <TableCell>1</TableCell>
                <TableCell>1234</TableCell>
                <TableCell>Quarto Duplo</TableCell>
                <TableCell>QD</TableCell>
                <TableCell>Quarto duplo em suite no madagascar</TableCell>
                <TableCell>Livre</TableCell>
                <TableCell>PEN</TableCell>
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
                      modalHeader={"Inserir Tipologia"} 
                      formTypeModal={41} 
                      ></FormModals>
                  </DropdownItem>
                    <DropdownItem key="copy">Apagar</DropdownItem>
                </DropdownMenu>
                </Dropdown>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
    </main>
  )
}
