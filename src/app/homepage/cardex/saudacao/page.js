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

import SalutationForm from "@/components/modal/cardex/salutation/page";
import PaginationTable from "@/components/table/paginationTable/paginationTable";
import LoadingBackdrop from "@/components/table/loadingBackdrop/loadingBackdrop";
import { useTranslations } from 'next-intl';

export default function Salutation() {
  const t = useTranslations('Index');
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchValue, setSearchValue] = React.useState("");
  const [salutation, setSalutation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const getData = async () => {
      try{
        const res = await axios.get("/api/v1/cardex/salutation");
        setSalutation(res.data.response);
      } catch(error) {
        console.error("Error: ", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  const filteredItems = React.useMemo(() => {
    if (!salutation || !Array.isArray(salutation)) {
      return [];
    }
  
    return salutation.filter((salu) =>
      (salu.salutation && salu.salutation.toLowerCase().includes(searchValue.toLowerCase())) ||
      (salu.salutationID && salu.salutationID.toString().toLowerCase().includes(searchValue.toLowerCase()))
    );
  }, [salutation, searchValue]);
  
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

  const handleDelete = async (idSalutation) => {
    try {
      await axios.delete(`/api/v1/cardex/salutation/` + idSalutation);
      alert(t('cardex.salutations.deleteSuccess'));
    } catch (error) {
      console.error(t('cardex.salutations.deleteError'), error.message);
    }
  };

  return (
    <main>
      <div className="flex flex-col mt-3 py-3">
        <p className="text-xs px-6">Salutation</p>
        <div className="flex flex-row justify-between items-center mx-5">
          <div className="flex flex-row">
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              <Input
                className="mt-4 w-80"
                placeholder={t('cardex.salutations.searchPlaceholder')}
                labelPlacement="outside"
                startContent={
                  <FiSearch color={"black"} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>
          <SalutationForm
            buttonName={t('cardex.salutations.buttonNew')}
            buttonIcon={<FiPlus size={15} />}
            buttonColor={"primary"}
            modalHeader={t('cardex.salutations.modalInsertHeader')}
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
              ID: item.salutationID,
              Abbreviation: item.suffix,
              Description: item.salutationCode,
              Title: item.salutation,
              Type: item.type,
              Gender: item.inet
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
                  {t('cardex.salutations.headerID')}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold w-30 uppercase">
                  {t('cardex.salutations.headerAbbreviation')}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold w-1/4 uppercase">
                  {t('cardex.salutations.headerDescription')}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase">
                  {t('cardex.salutations.headerTitle')}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase">
                  {t('cardex.salutations.headerType')}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase">
                  {t('cardex.salutations.headerGender')}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white flex justify-end items-center pr-7">
                  <GoGear size={20} />
                </TableColumn>
              </TableHeader>
              <TableBody>
                {items.map((salutation, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-left underline text-blue-600">
                      <SalutationForm
                        buttonName={salutation.salutationID}
                        editIcon={<FiEdit3 size={25}/>}
                        buttonColor={"transparent"}
                        modalHeader={t('cardex.salutations.modalEditHeader')}
                        modalEditArrow={<BsArrowRight size={25}/>}
                        modalEdit={t('cardex.salutations.modalEditID') + salutation.salutationID}
                        formTypeModal={12}
                        idSalutation={salutation.salutationID}
                        criado={salutation.createdAt}
                        editado={salutation.updatedAt}
                        editor={"test"}
                      />
                    </TableCell>
                    <TableCell>{salutation.suffix}</TableCell>
                    <TableCell>{salutation.salutationCode}</TableCell>
                    <TableCell>{salutation.salutation}</TableCell>
                    <TableCell>{salutation.type}</TableCell>
                    <TableCell>{salutation.inet}</TableCell>
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
                            <SalutationForm
                              buttonName={"Edit"}
                              editIcon={<FiEdit3 size={25}/>}
                              buttonColor={"transparent"}
                              modalHeader={t('cardex.salutations.modalEditHeader')}
                              modalEditArrow={<BsArrowRight size={25}/>}
                              modalEdit={t('cardex.salutations.modalEditID') + salutation.salutationID}
                              formTypeModal={12}
                              idSalutation={salutation.salutationID}
                              criado={salutation.createdAt}
                              editado={salutation.updatedAt}
                              editor={"test"}
                            />
                          </DropdownItem>
                          <DropdownItem key="delete" onClick={() => handleDelete(salutation.salutationID)}>Remove</DropdownItem>
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
