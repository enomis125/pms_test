"use client";
import React, { useEffect, useState } from "react";
// Import useTranslations from next-intl
import { useTranslations } from "next-intl";
// Import axios for API calls
import axios from "axios";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination,
  Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem,
  Input
} from "@nextui-org/react";

// Import icons
import { GoGear } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { FiEdit3 } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";

// Import components
import MembersForm from "@/components/modal/cardex/members/page";
import PaginationTable from "@/components/table/paginationTable/paginationTable";
import LoadingBackdrop from "@/components/table/loadingBackdrop/loadingBackdrop";

export default function Members() {
  const t = useTranslations('Index'); // Fetch translations
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchValue, setSearchValue] = React.useState("");
  const [member, setMember] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/v1/cardex/members");
        setMember(res.data.response);
      } catch (error) {
        console.error("Erro: ", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  const filteredItems = React.useMemo(() => {
    return member.filter((member) =>
      member.description.toLowerCase().includes(
        searchValue.toLowerCase()
      ) ||
      member.memberID.toString().toLowerCase().includes(
        searchValue.toLowerCase()
      )
    );
  }, [member, searchValue]);

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

  const handleDelete = async (idMember) => {
    try {
      const response = await axios.delete(`/api/v1/cardex/members/` + idMember);
      alert(t("cardex.members.deleteSuccess"));
    } catch (error) {
      console.error(t("cardex.members.deleteError"), error.message);
    }
  };

  return (
    <main>
      <div className="flex flex-col mt-3 py-3">
        <p className="text-xs px-6">{t('cardex.members.membersHeader')}</p>
        <div className="flex flex-row justify-between items-center mx-5">
          <div className="flex flex-row">
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              <Input
                className="mt-4 w-80"
                placeholder={t("cardex.members.searchPlaceholder")}
                labelPlacement="outside"
                startContent={
                  <FiSearch color={"black"} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>
          <MembersForm
            buttonName={t("cardex.members.buttonNew")}
            buttonIcon={<FiPlus size={15} />}
            buttonColor={"primary"}
            modalHeader={t("cardex.members.modalInsertHeader")}
            modalIcons={"bg-red"}
            formTypeModal={11}
          ></MembersForm>
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
              ID: item.memberID,
              Abreviatura: item.abreviature,
              Descrição: item.description,
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
                  {t("cardex.members.headerID")}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase">
                  {t("cardex.members.headerGroup")}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold w-1/4 px-10 uppercase">
                  {t("cardex.members.headerAbbreviation")}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase">
                  {t("cardex.members.headerDescription")}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold w-1/4 px-10 uppercase">
                  {t("cardex.members.headerOrder")}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold w-1/4 px-10 uppercase">
                  {t("cardex.members.headerProperty")}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white flex justify-end items-center pr-7">
                  <GoGear size={20} />
                </TableColumn>
              </TableHeader>
              <TableBody>
                {items.map((member, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-left underline text-blue-600">
                      <MembersForm
                        buttonName={member.memberID}
                        editIcon={<FiEdit3 size={25} />}
                        buttonColor={"transparent"}
                        modalHeader={t("cardex.members.modalEditHeader")}
                        modalEditArrow={<BsArrowRight size={25} />}
                        modalEdit={`${t("cardex.members.modalEditID")}${member.memberID}`}
                        formTypeModal={12}
                        idMember={member.memberID}
                        criado={member.createdAt}
                        editado={member.updatedAt}
                        editor={"teste"}
                      />
                    </TableCell>
                    <TableCell>{member.description}</TableCell>
                    <TableCell className="px-10">{member.abreviature}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="flex justify-end">
                      <Dropdown>
                        <DropdownTrigger>
                          <Button variant="light" className="flex flex-row justify-end">
                            <BsThreeDotsVertical size={20} className="text-gray-400" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions" closeOnSelect={false} isOpen={true}>
                          <DropdownItem key="edit">
                            <MembersForm
                              buttonName={t("cardex.members.buttonNew")}
                              editIcon={<FiEdit3 size={25} />}
                              buttonColor={"transparent"}
                              modalHeader={t("cardex.members.modalEditHeader")}
                              modalEditArrow={<BsArrowRight size={25} />}
                              modalEdit={`${t("cardex.members.modalEditID")}${member.memberID}`}
                              formTypeModal={12}
                              idMember={member.memberID}
                              criado={member.createdAt}
                              editado={member.updatedAt}
                              editor={"teste"}
                            />
                          </DropdownItem>
                          <DropdownItem key="delete" onClick={() => handleDelete(member.memberID)}>
                            {t("cardex.members.modalEditDelete")}
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
