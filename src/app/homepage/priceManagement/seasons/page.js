"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination,
  Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem,
  Input
} from "@nextui-org/react";

import { GoGear } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiSearch, FiPlus, FiEdit3 } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";

import SeasonsForm from "@/components/modal/priceManagement/seasons/page";
import PaginationTable from "@/components/table/paginationTable/paginationTable";
import LoadingBackdrop from "@/components/table/loadingBackdrop/loadingBackdrop";

const searchOptions = [
  { label: "Tudo", value: "all" },
  { label: "Descrição", value: "desc" },
  { label: "ID", value: "seasonID" },
];

export default function Characteristics() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [searchValue, setSearchValue] = useState("");
  const [searchField, setSearchField] = useState(searchOptions[0].value);
  const [seasons, setSeasons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/v1/prices/seasons");
        setSeasons(res.data.response);
      } catch (error) {
        console.error("Erro: ", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  const filteredItems = useMemo(() => {
    if (!seasons || !Array.isArray(seasons)) return [];

    const availableFields = seasons.length > 0 ? Object.keys(seasons[0]) : [];

    return seasons.filter((season) => {
      if (searchField === "all") {
        return availableFields.some((field) => {
          const value = season[field];
          if (typeof value === "string") {
            return value.toLowerCase().includes(searchValue.toLowerCase());
          } else if (typeof value === "number") {
            return value.toString().includes(searchValue);
          }
          return false;
        });
      }

      const value = season[searchField];
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchValue.toLowerCase());
      } else if (typeof value === "number") {
        return value.toString().includes(searchValue);
      }
      return false;
    });
  }, [seasons, searchValue, searchField]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  }, []);

  const handleSearchChange = useCallback((value) => {
    setSearchValue(value);
    setPage(1);
  }, []);

  const handleDelete = async (idSeasons) => {
    try {
      await axios.delete(`/api/v1/prices/seasons/` + idSeasons);
      setSeasons((prev) => prev.filter((season) => season.seasonID !== idSeasons));
      alert("Manutenção removida com sucesso!");
    } catch (error) {
      console.error("Erro ao remover manutenção:", error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <main>
      <div className="flex flex-col mt-3 py-3">
        <p className="text-xs px-6">Épocas</p>
        <div className="flex flex-row justify-between items-center mx-5">
          <div className="flex flex-col mt-4">
            <Input
              className="w-96"
              placeholder={`Procurar por ${searchOptions.find((option) => option.value === searchField)?.label.toLowerCase()}...`}
              labelPlacement="outside"
              startContent={<FiSearch color={"black"} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <div className="flex gap-2 mt-3">
              {searchOptions.map((option, index) => (
                <Button
                  key={index}
                  className={`w-28 h-fit ${searchField === option.value ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 text-black border-2 border-slate-300"}`}
                  onClick={() => setSearchField(option.value)}
                  size="sm"
                  radius="full"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
          <SeasonsForm
            buttonName={"Novo"}
            buttonIcon={<FiPlus size={15} />}
            buttonColor={"primary"}
            modalHeader={"Inserir Época"}
            modalIcons={"bg-red"}
            formTypeModal={11}
          />
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
          dataCSVButton={items.map((item) => ({
            ID: item.seasonID,
            Número: item.sortNo,
            Descrição: item.desc,
            Inicio: item.startDate,
            Fim: item.endDate
          }))}
        >
          <LoadingBackdrop open={isLoading} />
          {!isLoading && (
            <Table
              id="TableToPDF"
              isHeaderSticky={true}
              layout="fixed"
              isCompact={true}
              removeWrapper
              classNames={{
                wrapper: "min-h-[222px]",
              }}
              className="h-full overflow-auto"
            >
              <TableHeader>
                <TableColumn className="bg-primary-600 text-white font-bold w-[40px] uppercase">ID</TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase">Número</TableColumn>
                <TableColumn className="bg-primary-600 text-white w-1/2 font-bold uppercase">Descrição</TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase">Inicio</TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase">Fim</TableColumn>
                <TableColumn className="bg-primary-600 text-white flex justify-end items-center pr-7"><GoGear size={20} /></TableColumn>
              </TableHeader>
              <TableBody>
                {items.map((seasons, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-right underline text-blue-600">
                      <SeasonsForm
                        buttonName={seasons.seasonID}
                        editIcon={<FiEdit3 size={25} />}
                        buttonColor={"transparent"}
                        modalHeader={"Editar Época"}
                        modalEditArrow={<BsArrowRight size={25} />}
                        modalEdit={`ID: ${seasons.seasonID}`}
                        formTypeModal={12}
                        idSeasons={seasons.seasonID}
                        criado={seasons.createdAt}
                        editado={seasons.updatedAt}
                        editor={"teste"}
                      />
                    </TableCell>
                    <TableCell>{seasons.sortNo}</TableCell>
                    <TableCell className="w-1/2">{seasons.desc}</TableCell>
                    <TableCell>{formatDate(seasons.startDate)}</TableCell>
                    <TableCell>{formatDate(seasons.endDate)}</TableCell>
                    <TableCell className="flex justify-end">
                      <Dropdown>
                        <DropdownTrigger>
                          <Button variant="light" className="flex flex-row justify-end">
                            <BsThreeDotsVertical size={20} className="text-gray-400" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions" closeOnSelect={false}>
                          <DropdownItem key="edit">
                            <SeasonsForm
                              buttonName={"Editar"}
                              editIcon={<FiEdit3 size={25} />}
                              buttonColor={"transparent"}
                              modalHeader={"Editar Época"}
                              modalEditArrow={<BsArrowRight size={25} />}
                              modalEdit={`ID: ${seasons.seasonID}`}
                              formTypeModal={12}
                              idSeasons={seasons.seasonID}
                              criado={seasons.createdAt}
                              editado={seasons.updatedAt}
                              editor={"teste"}
                            />
                          </DropdownItem>
                          <DropdownItem key="delete" onClick={() => handleDelete(seasons.seasonID)}>Remover</DropdownItem>
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
