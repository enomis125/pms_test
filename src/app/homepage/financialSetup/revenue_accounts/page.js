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

import {useTranslations} from 'next-intl';
 
//imports de componentes
import RevenueAccountsForm from "@/components/modal/financialSetup/revenueAccounts/page";
import PaginationTable from "@/components/table/paginationTable/paginationTable";
import LoadingBackdrop from "@/components/table/loadingBackdrop/loadingBackdrop";
 
 
export default function Characteristics() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchValue, setSearchValue] = React.useState("");
  const [revenueAccounts, setRevenueAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations('Index');
 
  useEffect(() => {
    const getData = async () => {
      try{
        const res = await axios.get("/api/v1/financialSetup/revenueAccounts");
        setRevenueAccounts(res.data.response);
      } catch(error) {
        console.error("Erro: ", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);
 
  const filteredItems = React.useMemo(() => {
    if (!revenueAccounts || !Array.isArray(revenueAccounts)) {
      return [];
    }
  
    return revenueAccounts.filter((revenueAccounts) =>
      (revenueAccounts.name && revenueAccounts.name.toLowerCase().includes(searchValue.toLowerCase())) ||
      (revenueAccounts.revenueAccountID && revenueAccounts.revenueAccountID.toString().toLowerCase().includes(searchValue.toLowerCase()))
    );
  }, [revenueAccounts, searchValue]);
  
 
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
 
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);
 
  const pages = Math.ceil(filteredItems.length / rowsPerPage);
 
  const renderCell = React.useCallback((revenueAccounts, columnKey) => {
    const cellValue = revenueAccounts[columnKey];
  }, []);
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
 
  const handleSearchChange = (value) => {
    setSearchValue(value);
    setPage(1);
  };
 
  const handleDelete = async (idRevenueAccount) => {
    try {
      const response = await axios.delete(`/api/v1/financialSetup/revenueAccounts/` + idRevenueAccount);
      alert("Conta de revenue removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover conta de revenue.", error.message);
    }
  };
 
    return (
      <main>
        <div className="flex flex-col mt-3 py-3">
          <p className="text-xs px-6">{t('financialSetup.revenueAccounts.title')}</p>
          <div className="flex flex-row justify-between items-center mx-5">
            <div className="flex flex-row">
              <div className="flex flex-wrap md:flex-nowrap gap-4">
                <Input
                  className="mt-4 w-80"
                  placeholder={t('general.search')}
                  labelPlacement="outside"
                  startContent={
                    <FiSearch color={"black"} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  value={searchValue}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
            </div>
            <RevenueAccountsForm
              buttonName={t('general.newRecord')}
              buttonIcon={<FiPlus size={15} />}
              buttonColor={"primary"}
              modalHeader={t('financialSetup.revenueAccounts.new.modalHeader')}
              modalIcons={"bg-red"}
              formTypeModal={11}
            ></RevenueAccountsForm>
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
                ID: item.revenueAccountID,
                Cod: item.name,
                Conta: item.details,
                Abreviatura: item.abreviature,
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
          {t('financialSetup.revenueAccounts.datatable.id')}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold px-10 uppercase">
          {t('financialSetup.revenueAccounts.datatable.cod')}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
          {t('financialSetup.revenueAccounts.datatable.account')}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
          {t('financialSetup.revenueAccounts.datatable.abreviature')}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold w-1/4 uppercase">
          {t('financialSetup.revenueAccounts.datatable.description')}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold px-10 uppercase">
          {t('financialSetup.revenueAccounts.datatable.accountGroup')}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold px-20 uppercase">
          {t('financialSetup.revenueAccounts.datatable.department')}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold px-[7vw] uppercase">
          {t('financialSetup.revenueAccounts.datatable.tax')}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold px-20 uppercase">
          {t('financialSetup.revenueAccounts.datatable.order')}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white flex justify-end items-center pr-7">
            <GoGear size={20} />
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((revenueAccounts, index) => (
            <TableRow key={index}>
              <TableCell className="text-right underline text-blue-600">
                <RevenueAccountsForm
                        buttonName={revenueAccounts.revenueAccountID}
                        editIcon={<FiEdit3 size={25}/>}
                        buttonColor={"transparent"}
                        modalHeader={t('financialSetup.revenueAccounts.edit.modalHeader')}
                        modalEditArrow={<BsArrowRight size={25}/>}
                        modalEdit={`ID: ${revenueAccounts.revenueAccountID}`}
                        formTypeModal={12}
                        idRevenueAccount={revenueAccounts.revenueAccountID}
                        criado={revenueAccounts.createdAt}
                        editado={revenueAccounts.updatedAt}
                        editor={"teste"}
                      /></TableCell>
              <TableCell className="px-10">{revenueAccounts.name}</TableCell>
              <TableCell>{revenueAccounts.details}</TableCell>
              <TableCell className="">{revenueAccounts.abreviature}</TableCell>
              <TableCell className="">{revenueAccounts.details}</TableCell>
              <TableCell className="px-10">{revenueAccounts.details}</TableCell>
              <TableCell className="px-20">{revenueAccounts.details}</TableCell>
              <TableCell className="px-[7vw]">{revenueAccounts.details}</TableCell>
              <TableCell className="px-20">{revenueAccounts.details}</TableCell>
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
                      <RevenueAccountsForm
                        buttonName={t('general.editRecord')}
                        editIcon={<FiEdit3 size={25}/>}
                        buttonColor={"transparent"}
                        modalHeader={t('financialSetup.revenueAccounts.edit.modalHeader')}
                        modalEditArrow={<BsArrowRight size={25}/>}
                        modalEdit={`ID: ${revenueAccounts.revenueAccountID}`}
                        formTypeModal={12}
                        idRevenueAccount={revenueAccounts.revenueAccountID}
                        criado={revenueAccounts.createdAt}
                        editado={revenueAccounts.updatedAt}
                        editor={"teste"}
                      ></RevenueAccountsForm>
                    </DropdownItem>
                    <DropdownItem key="delete" onClick={() => handleDelete(revenueAccounts.revenueAccountID)}>{t('general.removeRecord')}</DropdownItem>
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

