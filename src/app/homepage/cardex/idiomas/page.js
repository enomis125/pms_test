"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import axios from "axios";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination,
  Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem,
  Input
} from "@nextui-org/react";
import { GoGear } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiSearch, FiPlus } from "react-icons/fi";
import FormModals from "@/components/modal/hotelSetup/cardModal/formModals";

export default function Characteristics() {
  const t = useTranslations('Index');
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [searchValue, setSearchValue] = React.useState("");
  const [caracteristics, setCaracteristics] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/hotel/caracteristicas");
      setCaracteristics(res.data.response);
    };
    getData();
  }, []);

  const filteredItems = React.useMemo(() => {
    return caracteristics.filter((caracteristic) =>
      caracteristic.Description.toLowerCase().includes(
        searchValue.toLowerCase()
      ) ||
      caracteristic.idCarateristics.toString().toLowerCase().includes(
        searchValue.toLowerCase()
      )
    );
  }, [caracteristics, searchValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const renderCell = React.useCallback((caracteristic, columnKey) => {
    const cellValue = caracteristic[columnKey];
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
    setPage(1);
  };

  return (
    <main>
      <div className="flex flex-col my-10 py-3">
        <p className="text-xs px-6">{t('cardex.languages.languagesHeader')}</p>
        <div className="flex flex-row justify-between items-center mx-5">
          <div className="flex flex-row">
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              <Input
                className="mt-4 w-80"
                placeholder={t('cardex.languages.searchPlaceholder')}
                labelPlacement="outside"
                startContent={
                  <FiSearch color={"black"} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>
          <FormModals
            buttonName={t('cardex.languages.buttonNew')}
            buttonIcon={<FiPlus size={15} />}
            buttonColor={"primary"}
            modalHeader={t('cardex.languages.modalInsertHeader')}
            modalIcons={"bg-red"}
            formTypeModal={41}
          ></FormModals>
        </div>
      </div>
      <div className="mx-5 h-[65vh] min-h-full">
        <Table
          id="TableToPDF"
          isHeaderSticky={"true"}
          layout={"fixed"}
          removeWrapper
          classNames={{
            wrapper: "min-h-[222px]",
          }}
          className="h-full overflow-auto -mt-10"
        >
          <TableHeader>
            <TableColumn className="bg-primary-600 text-white w-[40px] font-bold">
              {t('cardex.languages.headerID')}
            </TableColumn>
            <TableColumn className="bg-primary-600 text-white font-bold">
            {t('cardex.languages.headerCode')}
            </TableColumn>
            <TableColumn className="bg-primary-600 text-white font-bold">
            {t('cardex.languages.headerDescription')}
            </TableColumn>
            <TableColumn className="bg-primary-600 text-white font-bold">
            {t('cardex.languages.headerAbbreviation')}
            </TableColumn>
            <TableColumn className="bg-primary-600 text-white font-bold">
            {t('cardex.languages.headerDetails')}
            </TableColumn>
            <TableColumn className="bg-primary-600 text-white font-bold">
            {t('cardex.languages.headerFunction')}
            </TableColumn>
            <TableColumn className="bg-primary-600 text-white font-bold">
            {t('cardex.languages.headerOrdering')}
            </TableColumn>
            <TableColumn className="bg-primary-600 text-white font-bold">
            {t('cardex.languages.headerTipologyGroup')}
            </TableColumn>
            <TableColumn className="bg-primary-600 text-white flex justify-center items-center">
              <GoGear size={20} />
            </TableColumn>
          </TableHeader>
          <TableBody>
            {items.map((caracteristic, index) => (
              <TableRow key={index}>
                <TableCell>{t('cardex.languages.headerActions')}</TableCell>
                <TableCell>Alterar</TableCell>
                <TableCell>Alterar</TableCell>
                <TableCell><p className="truncate ">Alterar</p></TableCell>
                <TableCell><p className="truncate ">Alterar</p></TableCell>
                <TableCell><p className="truncate ">Alterar</p></TableCell>
                <TableCell><p className="truncate ">Alterar</p></TableCell>
                <TableCell><p className="truncate ">Alterar</p></TableCell>
                <TableCell className="flex justify-center">
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
                          buttonName={t('cardex.languages.modalEditHeader')}
                          buttonColor={"transparent"}
                          modalHeader={t('cardex.languages.modalEditHeader')}
                          formTypeModal={41}
                        ></FormModals>
                      </DropdownItem>
                      <DropdownItem key="delete">{t('cardex.languages.modalEditDelete')}</DropdownItem>
                      <DropdownItem key="see">{t('cardex.languages.deleteError')}</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            ))}
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
             Linhas por página
            </span>
            <select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              className="ml-2 py-1 px-2 border rounded bg-transparent text-sm text-default-600 mx-5"
            >
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="ml-5 mr-10 text-black">
            {items.length > 0
              ? `${(page - 1) * rowsPerPage + 1}-${Math.min(
                page * rowsPerPage,
                filteredItems.length
              )} de ${filteredItems.length}`
              : "0 resultados"}
          </div>
        </div>
      </div>
    </main>
  );
}
