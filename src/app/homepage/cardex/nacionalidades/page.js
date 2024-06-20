"use client";
import React, { useEffect, useState } from "react";
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
import NationalityForm from "@/components/modal/cardex/nationality/page";
import PaginationTable from "@/components/table/paginationTable/paginationTable";
import LoadingBackdrop from "@/components/table/loadingBackdrop/loadingBackdrop";
import { useTranslations } from 'next-intl';

export default function Nationalities() {
  const t = useTranslations('Index');
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchValue, setSearchValue] = React.useState("");
  const [nationality, setNationality] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/v1/cardex/nationalities");
        setNationality(res.data.response);
      } catch (error) {
        console.error("Error: ", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  const filteredItems = React.useMemo(() => {
    if (!nationality || !Array.isArray(nationality)) {
      return [];
    }

    return nationality.filter((nat) =>
      (nat.isocode && nat.isocode.toLowerCase().includes(searchValue.toLowerCase())) ||
      (nat.codeNr && nat.codeNr.toString().toLowerCase().includes(searchValue.toLowerCase()))
    );
  }, [nationality, searchValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
    setPage(1);
  };

  const handleDelete = async (idNationality) => {
    try {
      const response = await axios.delete(`/api/v1/cardex/nationalities/` + idNationality);
      alert(t('cardex.nationalities.deleteSuccess'));
    } catch (error) {
      console.error(t('cardex.nationalities.deleteError'), error.message);
    }
  };

  return (
    <main>
      <div className="flex flex-col mt-3 py-3">
        <p className="text-xs px-6">{t('cardex.nationalities.headerNationality')}</p>
        <div className="flex flex-row justify-between items-center mx-5">
          <div className="flex flex-row">
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              <Input
                className="mt-4 w-80"
                placeholder={t('cardex.nationalities.searchPlaceholder')}
                labelPlacement="outside"
                startContent={
                  <FiSearch color={"black"} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>
          <NationalityForm
            buttonName={t('cardex.nationalities.buttonNew')}
            buttonIcon={<FiPlus size={15} />}
            buttonColor={"primary"}
            modalHeader={t('cardex.nationalities.modalInsertHeader')}
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
          dataCSVButton={
            items.map((item) => ({
              ID: item.codeNr,
              Scut: item.land,
              StatNr: item.statNr,
              Ordenação: item.brkopftyp,
              Grupo: item.gruppe,
              "Código ISO": item.isocode,
              State: item.state,
              FO: item.showFO,
              Nacionalidade: item.nation,
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
                <TableColumn className="bg-primary-600 text-white font-bold w-[40px]  uppercase">
                  {t('cardex.nationalities.headerID')}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold w-30 uppercase">
                  {t('cardex.nationalities.headerScut')}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold w-1/4 uppercase">
                  {t('cardex.nationalities.headerStatNr')}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold  uppercase">
                  {t('cardex.nationalities.headerOrdination')}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase">
                  {t('cardex.nationalities.headerGroup')}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold  uppercase">
                  {t('cardex.nationalities.headerISOCode')}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold  uppercase">
                  {t('cardex.nationalities.headerState')}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold  uppercase">
                  {t('cardex.nationalities.headerFO')}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold  uppercase">
                  {t('cardex.nationalities.headerNationality')}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white flex justify-end items-center pr-7">
                  <GoGear size={20} />
                </TableColumn>
              </TableHeader>
              <TableBody>
                {items.map((nationality, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-left underline text-blue-600">
                      <NationalityForm
                        buttonName={nationality.codeNr}
                        editIcon={<FiEdit3 size={25} />}
                        buttonColor={"transparent"}
                        modalHeader={t('cardex.nationalities.modalEditHeader')}
                        modalEditArrow={<BsArrowRight size={25} />}
                        modalEdit={`${t('cardex.nationalities.modalEditID')}${nationality.codeNr}`}
                        formTypeModal={12}
                        idNationality={nationality.codeNr}
                        criado={nationality.createdAt}
                        editado={nationality.updatedAt}
                        editor={"test"}
                      />
                    </TableCell>
                    <TableCell>{nationality.land}</TableCell>
                    <TableCell>{nationality.statNr}</TableCell>
                    <TableCell>{nationality.brkopftyp}</TableCell>
                    <TableCell>{nationality.gruppe}</TableCell>
                    <TableCell>{nationality.isocode}</TableCell>
                    <TableCell>{nationality.state}</TableCell>
                    <TableCell>{nationality.showFO}</TableCell>
                    <TableCell>{nationality.nation}</TableCell>
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
                            <NationalityForm
                              buttonName={"Edit"}
                              editIcon={<FiEdit3 size={25} />}
                              buttonColor={"transparent"}
                              modalHeader={t('cardex.nationalities.modalEditHeader')}
                              modalEditArrow={<BsArrowRight size={25} />}
                              modalEdit={`${t('cardex.nationalities.modalEditID')}${nationality.codeNr}`}
                              formTypeModal={12}
                              idNationality={nationality.codeNr}
                              criado={nationality.createdAt}
                              editado={nationality.updatedAt}
                              editor={"test"}
                            />
                          </DropdownItem>
                          <DropdownItem key="delete" onClick={() => handleDelete(nationality.codeNr)}>
                            {t('cardex.nationalities.modalEditDelete')}
                          </DropdownItem>
                          <DropdownItem key="view">View</DropdownItem>
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

