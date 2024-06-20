
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
import ClientPreferenceForm from "@/components/modal/cardex/clientPreference/page";
import PaginationTable from "@/components/table/paginationTable/paginationTable";
import LoadingBackdrop from "@/components/table/loadingBackdrop/loadingBackdrop";
import { useTranslations } from 'next-intl';
 
 
export default function customerPreferences() {
  const t = useTranslations('Index');
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchValue, setSearchValue] = React.useState("");
  const [customerPreferences, setCustomerPreferences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    const getData = async () => {
      try{
        const res = await axios.get("/api/v1/cardex/customerPreferences");
        setCustomerPreferences(res.data.response);
      } catch(error) {
        console.error("Erro: ", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);
 
  const filteredItems = React.useMemo(() => {
    return customerPreferences.filter((customerPreferences) =>
    customerPreferences.description.toLowerCase().includes(
        searchValue.toLowerCase()
      ) ||
      customerPreferences.customerPreferencesID.toString().toLowerCase().includes(
        searchValue.toLowerCase()
      )
    );
  }, [customerPreferences, searchValue]);
 
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
 
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);
 
  const pages = Math.ceil(filteredItems.length / rowsPerPage);
 
  const renderCell = React.useCallback((customerPreferences, columnKey) => {
    const cellValue = customerPreferences[columnKey];
  }, []);
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
 
  const handleSearchChange = (value) => {
    setSearchValue(value);
    setPage(1);
  };
 
  const handleDelete = async (idCustomerPreferences) => {
    try {
      const response = await axios.delete(`/api/v1/cardex/customerPreferences/` + idCustomerPreferences);
      alert(t("cardex.clientPreferences.deleteSuccess"));
    } catch (error) {
      console.error(t("cardex.clientPreferences.deleteError"), error.message);
    }
  };
 
  return (
    <main>
      <div className="flex flex-col mt-3 py-3">
        <p className="text-xs px-6">{t('cardex.clientPreferences.clientPreferencesheader')}</p>
        <div className="flex flex-row justify-between items-center mx-5">
          <div className="flex flex-row">
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              <Input
                className="mt-4 w-80"
                placeholder={t('cardex.clientPreferences.searchPlaceholder')}
                labelPlacement="outside"
                startContent={
                  <FiSearch color={"black"} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>
          <ClientPreferenceForm
            buttonName={t('cardex.clientPreferences.buttonNew')}
            buttonIcon={<FiPlus size={15} />}
            buttonColor={"primary"}
            modalHeader={t('cardex.clientPreferences.modalInsertHeader')}
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
              ID: item.clientPreferencesID,
              Abbreviation: item.abbreviation,
              Description: item.description,
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
                  {t('cardex.clientPreferences.headerID')}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase">
                  {t('cardex.clientPreferences.headerGroup')}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold w-1/4 px-10 uppercase">
                  {t('cardex.clientPreferences.headerAbbreviation')}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase">
                  {t('cardex.clientPreferences.headerDescription')}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold w-1/4 px-10 uppercase">
                  {t('cardex.clientPreferences.headerOrdering')}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold w-1/4 px-10 uppercase">
                  {t('cardex.clientPreferences.headerProperty')}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white flex justify-end items-center pr-7">
                  <GoGear size={20} />
                </TableColumn>
              </TableHeader>
              <TableBody>
                {items.map((preference, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-left underline text-blue-600">
                      <ClientPreferenceForm
                        buttonName={preference.clientPreferencesID}
                        editIcon={<FiEdit3 size={25} />}
                        buttonColor={"transparent"}
                        modalHeader={t('cardex.clientPreferences.modalEditHeader')}
                        modalEditArrow={<BsArrowRight size={25} />}
                        modalEdit={`ID: ${preference.clientPreferencesID}`}
                        formTypeModal={12}
                        idClientPreferences={preference.clientPreferencesID}
                        createdAt={preference.createdAt}
                        updatedAt={preference.updatedAt}
                        editor={"test"}
                      />
                    </TableCell>
                    <TableCell>{preference.description}</TableCell>
                    <TableCell className="px-10">{preference.abbreviation}</TableCell>
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
                            <ClientPreferenceForm
                              buttonName={t('cardex.clientPreferences.buttoNew')}
                              editIcon={<FiEdit3 size={25} />}
                              buttonColor={"transparent"}
                              modalHeader={t('cardex.clientPreferences.modalEditHeader')}
                              modalEditArrow={<BsArrowRight size={25} />}
                              modalEdit={`ID: ${preference.clientPreferencesID}`}
                              formTypeModal={12}
                              idClientPreferences={preference.clientPreferencesID}
                              createdAt={preference.createdAt}
                              updatedAt={preference.updatedAt}
                              editor={"test"}
                            />
                          </DropdownItem>
                          <DropdownItem key="delete" onClick={() => handleDelete(preference.clientPreferencesID)}>
                            {t('cardex.clientPreferences.')}
                          </DropdownItem>
                          <DropdownItem key="view">{t('cardex.clientPreferences.view')}</DropdownItem>
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
