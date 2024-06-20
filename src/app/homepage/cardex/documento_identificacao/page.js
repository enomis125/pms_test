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
import DoctypeForm from "@/components/modal/cardex/doctypes/page";
import PaginationTable from "@/components/table/paginationTable/paginationTable";
import LoadingBackdrop from "@/components/table/loadingBackdrop/loadingBackdrop";
import { useTranslations } from 'next-intl';

export default function Knowledgemethod() {
  const t = useTranslations('Index');
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchValue, setSearchValue] = React.useState("");
  const [doctypes, setDoctypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/v1/cardex/doctypes");
        setDoctypes(res.data.response);
      } catch (error) {
        console.error("Error: ", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  const filteredItems = React.useMemo(() => {
    return doctypes.filter((doctypes) =>
      doctypes.name.toLowerCase().includes(
        searchValue.toLowerCase()
      ) ||
      doctypes.refID.toString().toLowerCase().includes(
        searchValue.toLowerCase()
      )
    );
  }, [doctypes, searchValue]);

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

  const handleDelete = async (idDoctypes) => {
    try {
      const response = await axios.delete(`/api/v1/cardex/doctypes/` + idDoctypes);
      alert(t('cardex.idDocument.deleteSuccess'));
    } catch (error) {
      console.error(t('deleteError'), error.message);
    }
  };

  return (
    <main>
      <div className="flex flex-col mt-3 py-3">
        <p className="text-xs px-6">{t('cardex.idDocument.identificationDocHeader')}</p>
        <div className="flex flex-row justify-between items-center mx-5">
          <div className="flex flex-row">
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              <Input
                className="mt-4 w-80"
                placeholder={t('cardex.idDocument.searchPlaceholder')}
                labelPlacement="outside"
                startContent={
                  <FiSearch color={"black"} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>
          <DoctypeForm
            buttonName={t('cardex.idDocument.buttonNew')}
            buttonIcon={<FiPlus size={15} />}
            buttonColor={"primary"}
            modalHeader={t('cardex.idDocument.modalInsertHeader')}
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
              ID: item.refID,
              Abbreviation: item.shortName,
              Description: item.name,
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
                  {t('cardex.idDocument.headerID')}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase">
                  {t('cardex.idDocument.headerAbbreviation')}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase">
                  {t('cardex.idDocument.headerDescription')}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold w-1/4 px-10 uppercase">
                  {t('cardex.idDocument.headerOrdering')}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold w-1/4 px-10 uppercase">
                  {t('cardex.idDocument.headerProperty')}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white flex justify-end items-center pr-7">
                  <GoGear size={20} />
                </TableColumn>
              </TableHeader>
              <TableBody>
                {items.map((doctypes, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-left underline text-blue-600">
                      <DoctypeForm
                        buttonName={doctypes.refID}
                        editIcon={<FiEdit3 size={25} />}
                        buttonColor={"transparent"}
                        modalHeader={t('cardex.idDocument.modalEditHeader')}
                        modalEditArrow={<BsArrowRight size={25} />}
                        modalEdit={`${t('cardex.idDocument.modalEditID')}${doctypes.refID}`}
                        formTypeModal={12}
                        idDoctypes={doctypes.refID}
                        criado={doctypes.createdAt}
                        editado={doctypes.updatedAt}
                        editor={"test"}
                      />
                    </TableCell>
                    <TableCell>{doctypes.shortName}</TableCell>
                    <TableCell className="px-10">{doctypes.name}</TableCell>
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
                            <DoctypeForm
                              buttonName={"Edit"}
                              editIcon={<FiEdit3 size={25} />}
                              buttonColor={"transparent"}
                              modalHeader={t('cardex.idDocument.modalEditHeader')}
                              modalEditArrow={<BsArrowRight size={25} />}
                              modalEdit={`${t('cardex.idDocument.modalEditID')}${doctypes.refID}`}
                              formTypeModal={12}
                              idDoctypes={doctypes.refID}
                              criado={doctypes.createdAt}
                              editado={doctypes.updatedAt}
                              editor={"test"}
                            />
                          </DropdownItem>
                          <DropdownItem key="delete" onClick={() => handleDelete(doctypes.refID)}>
                            {t('cardex.idDocument.delete')}
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
