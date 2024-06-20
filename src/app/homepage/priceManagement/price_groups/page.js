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
import { FaCalendarAlt } from "react-icons/fa";

import {useTranslations} from 'next-intl';

import PriceManagementForm from "@/components/modal/priceManagement/page";
import PaginationTable from "@/components/table/paginationTable/paginationTable";
import LoadingBackdrop from "@/components/table/loadingBackdrop/loadingBackdrop";

const searchOptions = [
  { label: "Tudo", value: "all" },
  { label: "Nome", value: "raterName" },
  { label: "ID do Grupo", value: "ratergrpExID" },
];

export default function PriceManagement() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [searchValue, setSearchValue] = useState("");
  const [searchField, setSearchField] = useState(searchOptions[0].value);
  const [priceManagement, setPriceManagement] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations('Index');

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/v1/prices/priceManagement");
        setPriceManagement(res.data.response);
      } catch (error) {
        console.error("Erro: ", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  const filteredItems = useMemo(() => {
    if (!priceManagement || !Array.isArray(priceManagement)) return [];

    const availableFields = priceManagement.length > 0 ? Object.keys(priceManagement[0]) : [];

    return priceManagement.filter((item) => {
      if (searchField === "all") {
        return availableFields.some((field) => {
          const value = item[field];
          if (typeof value === "string") {
            return value.toLowerCase().includes(searchValue.toLowerCase());
          } else if (typeof value === "number") {
            return value.toString().includes(searchValue);
          }
          return false;
        });
      }

      const value = item[searchField];
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchValue.toLowerCase());
      } else if (typeof value === "number") {
        return value.toString().includes(searchValue);
      }
      return false;
    });
  }, [priceManagement, searchValue, searchField]);

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

  const handleDelete = async (idPriceManagement) => {
    try {
      await axios.delete(`/api/v1/prices/priceManagement/` + idPriceManagement);
      setPriceManagement((prev) => prev.filter((item) => item.rategrpID !== idPriceManagement));
      alert("Grupo de preços removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover grupo:", error.message);
    }
  };

  return (
    <main>
      <div className="flex flex-col mt-3 py-3">
        <p className="text-xs px-6">{t('priceManagement.priceCodes.title')}</p>
        <div className="flex flex-row justify-between items-center mx-5">
          <div className="flex flex-col mt-4">
            <Input
              className="w-96"
              placeholder={t('general.search') + `${searchOptions.find((option) => option.value === searchField)?.label.toLowerCase()}...`}
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
          <PriceManagementForm
            formTypeModal={11}
            buttonName={t('general.newRecord')}
            buttonIcon={<FiPlus size={15} />}
            editIcon={<FaCalendarAlt size={25} color="white" />}
            buttonColor={"primary"}
            modalHeader={t('priceManagement.priceCodes.new.modalHeader')}
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
          dataCSVButton={
            items.map((item) => ({
              ID: item.rategrpID,
              Grupo: item.ratergrpExID,
              Nome: item.raterName,
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
            {t('priceManagement.priceCodes.datatable.n')}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
          {t('priceManagement.priceCodes.datatable.group')}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
          {t('priceManagement.priceCodes.datatable.text')}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
          {t('priceManagement.priceCodes.datatable.basisGrp')}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
          {t('priceManagement.priceCodes.datatable.basisRate')}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
          {t('priceManagement.priceCodes.datatable.surcharge')}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
          {t('priceManagement.priceCodes.datatable.fixSurcharge')}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
          {t('priceManagement.priceCodes.datatable.people')}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
          {t('priceManagement.priceCodes.datatable.divide')}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
          {t('priceManagement.priceCodes.datatable.ref')}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
          {t('priceManagement.priceCodes.datatable.order')}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
          {t('priceManagement.priceCodes.datatable.hotel')}
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
                        modalHeader={t('priceManagement.priceCodes.edit.modalHeader')}
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
                        <DropdownMenu aria-label="Static Actions" closeOnSelect={false}>
                          <DropdownItem key="edit">
                            <PriceManagementForm
                              buttonName={t('general.editRecord')}
                              editIcon={<FiEdit3 size={25} />}
                              buttonColor={"transparent"}
                              modalHeader={t('priceManagement.priceCodes.edit.modalHeader')}
                              modalEditArrow={<BsArrowRight size={25} />}
                              modalEdit={`ID: ${priceManagement.rategrpID}`}
                              formTypeModal={12}
                              idPriceManagement={priceManagement.rategrpID}
                              criado={priceManagement.createdAt}
                              editado={priceManagement.updatedAt}
                              editor={"teste"}
                            />
                          </DropdownItem>
                          <DropdownItem key="delete" onClick={() => handleDelete(priceManagement.rategrpID)}>{t('general.removeRecord')}</DropdownItem>
                          <DropdownItem key="view">{t('general.viewRecord')}</DropdownItem>
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


