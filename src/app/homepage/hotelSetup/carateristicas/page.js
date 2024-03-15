"use client"

//import de axios para BD
import axios from 'axios';
import React, { useEffect, useState } from "react";
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
import { typologys, actions, users } from "../../../data/data";
//imports de icons
import { GoGear } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
//import de modals
import FormModals from "@/components/modal/formModals"


export default function Characteristics() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  const [caracteristics, setCaracteristics] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('/api/hotel/caracteristicas')
      setCaracteristics(res.data.response);
    };
    getData();
  }, []);

  return (
    <main className="mx-5">
      <div className="flex flex-col my-10 py-3">
        <p className="text-xs px-6">Caraterísticas</p>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row">
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              <Input
                className="mt-4 w-80"
                placeholder="Pesquisa"
                labelPlacement="outside"
                startContent={
                  <IoMdSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />

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
            buttonName={"Inserir"}
            buttonColor={"primary"}
            modalHeader={"Inserir Caraterísticas"}
            formTypeModal={31}
          ></FormModals>
        </div>
      </div>
      <Table removeWrapper isStriped
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
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
          <TableColumn className="bg-primary-600 text-[var(--white)] font-bold">DESCRIÇÃO</TableColumn>
          <TableColumn className="bg-primary-600 text-[var(--white)] font-bold">ABREVIATURA</TableColumn>
          <TableColumn className="bg-primary-600 text-[var(--white)] font-bold">DETALHE</TableColumn>
          <TableColumn className="bg-primary-600 text-[var(--white)] flex justify-center items-center"><GoGear size={20} /></TableColumn>
        </TableHeader>
        <TableBody>
          {caracteristics.map((caracteristic, index) => (
            <TableRow key={index}>
              <TableCell>{caracteristic.idCarateristics}</TableCell>
              <TableCell>{caracteristic.Description}</TableCell>
              <TableCell>{caracteristic.Abreviature}</TableCell>
              <TableCell>{caracteristic.Details}</TableCell>
              <TableCell className="flex flex-row gap-4 justify-center">
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="light"
                      className="flex flex-row justify-center"
                    >
                      <BsThreeDotsVertical size={20} className="text-gray-400" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions" closeOnSelect={false} isOpen={true}>
                    <DropdownItem key="edit">
                      <FormModals
                        buttonName={"Editar"}
                        modalHeader={"Inserir Caraterísticas"}
                        formTypeModal={31}
                      ></FormModals>
                    </DropdownItem>
                    <DropdownItem key="copy">Apagar</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}
