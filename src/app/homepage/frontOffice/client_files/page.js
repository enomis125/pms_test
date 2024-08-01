"use client";
import React, { useEffect, useState } from "react";
//import de axios para BD
import axios from "axios";
import {
  //imports de tabelas
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
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
import IndividualForm from "@/components/modal/frontOffice/clientForm/individuals/page";
import CompanyForm from "@/components/modal/frontOffice/clientForm/companies/page";
import TravelGroupForm from "@/components/modal/frontOffice/clientForm/travelAgency/page";
import GroupForm from "@/components/modal/frontOffice/clientForm/groups/page";
import OthersForm from "@/components/modal/frontOffice/clientForm/others/page";
import PaginationTable from "@/components/table/paginationTable/paginationTable";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslations } from 'next-intl';


export default function clientForm() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchValue, setSearchValue] = React.useState("");
  const [individual, setIndividual] = useState([]);
  const [emails, setEmails] = useState({});
  const [phoneNumbers, setPhoneNumbers] = useState({});
  const [addresses, setAddresses] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);

  const t = useTranslations('Index');

  useEffect(() => {
    const getData = async () => {
      if (!dataFetched) {
        setIsLoading(true);
        try {
          // Fetch individuals
          const resIndividuals = await axios.get("/api/v1/frontOffice/clientForm/individuals");
          const individuals = resIndividuals.data.response;

          // emails
          let emails = {};

          for (let ind of individuals) {
            const resEmail = await axios.get(`/api/v1/frontOffice/clientForm/individuals/email/${ind.email}`);
            emails[ind.email] = resEmail.data.response; // Store the entire response
          }

          //phone numbers
          let phones = {};

          for (let ind of individuals) {
            const resPhones = await axios.get(`/api/v1/frontOffice/clientForm/individuals/phone/${ind.phoneNumber}`);
            phones[ind.phoneNumber] = resPhones.data.response; // Store the entire response
          }

          //address
          let addresses = {};

          for (let ind of individuals) {
            const resAddress = await axios.get(`/api/v1/frontOffice/clientForm/individuals/address/${ind.address}`);
            addresses[ind.address] = resAddress.data.response; // Store the entire response
          }

          // Set state
          setIndividual(individuals);
          setEmails(emails);
          setPhoneNumbers(phones);
          setAddresses(addresses);
          setDataFetched(true);
        } catch (error) {
          console.error("Erro ao encontrar as fichas de cliente:", error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    getData();
  }, [dataFetched]);

  const filteredItems = React.useMemo(() => {
    if (!individual || !Array.isArray(individual)) {
      return [];
    }

    return individual.filter((individual) =>
      (individual.firstName && individual.firstName.toLowerCase().includes(searchValue.toLowerCase())) ||
      (individual.guestProfileID && individual.guestProfileID.toString().toLowerCase().includes(searchValue.toLowerCase()))
    );
  }, [individual, searchValue]);


  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const renderCell = React.useCallback((individual, columnKey) => {
    const cellValue = individual[columnKey];
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
    setPage(1);
  };

  const handleDelete = async (idIndividual) => {
    try {
      const response = await axios.delete(`/api/v1/frontOffice/clientForm/individuals/` + idIndividual);

      alert("Ficha de cliente removida com sucesso!");

    } catch (error) {
      console.error("Erro ao remover ficha de cliente.", error.message);
    }
  };

  const [selectedComponent, setSelectedComponent] = useState(null)

  const handleClickIndividual = () => {
    setSelectedComponent('IndividualForm')
  }

  const handleClickCompany = () => {
    setSelectedComponent('CompanyForm')
  }

  const handleClickAgency = () => {
    setSelectedComponent('AgencyForm')
  }

  const handleClickGroup = () => {
    setSelectedComponent('GroupForm')
  }

  const handleClickOthers = () => {
    setSelectedComponent('OthersForm')
  }


  //botoes que mudam de cor
  const [selectedButton, setSelectedButton] = useState("")

  /*const handleClickChangeButton = (name) => {
    setSelectedButton(name)
  }*/

  return (
    <main>
      <div className="flex flex-col mt-1 py-3">
        <p className="text-xs px-6">{t("frontOffice.clientFiles.label")}</p>
        <div className="flex flex-row justify-between items-center mx-5">
          <div className="flex flex-row">
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              <Input
                className="mt-2 w-80"
                placeholder={t("general.search")}
                labelPlacement="outside"
                aria-label="Search Clients"
                startContent={
                  <FiSearch color={"black"} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>
          {selectedComponent === 'IndividualForm' && (
            <IndividualForm
              buttonName={t("general.newRecord")}
              buttonIcon={<FiPlus size={15} />}
              buttonColor={"primary"}
              modalHeader={t("frontOffice.clientFiles.new.modalHeader")}
              modalEditArrow={<BsArrowRight size={25} />}
              modalEdit={t("frontOffice.clientFiles.fileType.individual")}
              modalIcons={"bg-red"}
              formTypeModal={0}
            />
          )}
          {selectedComponent === 'CompanyForm' && (
            <CompanyForm
              buttonName={t("general.newRecord")}
              buttonIcon={<FiPlus size={15} />}
              buttonColor={"primary"}
              modalHeader={t("frontOffice.clientFiles.new.modalHeader")}
              modalEditArrow={<BsArrowRight size={25} />}
              modalEdit={t("frontOffice.clientFiles.fileType.company")}
              modalIcons={"bg-red"}
              formTypeModal={0}
            ></CompanyForm>
          )}
          {selectedComponent === 'AgencyForm' && (
            <TravelGroupForm
              buttonName={t("general.newRecord")}
              buttonIcon={<FiPlus size={15} />}
              buttonColor={"primary"}
              modalHeader={t("frontOffice.clientFiles.new.modalHeader")}
              modalEditArrow={<BsArrowRight size={25} />}
              modalEdit={t("frontOffice.clientFiles.fileType.travelAgency")}
              formTypeModal={0} />
          )}
          {selectedComponent === 'GroupForm' && (
            <GroupForm
              buttonName={t("general.newRecord")}
              buttonIcon={<FiPlus size={15} />}
              buttonColor={"primary"}
              modalHeader={t("frontOffice.clientFiles.new.modalHeader")}
              modalEditArrow={<BsArrowRight size={25} />}
              modalEdit={t("frontOffice.clientFiles.fileType.group")}
              formTypeModal={0} />
          )}
          {selectedComponent === 'OthersForm' && (
            <OthersForm
              buttonName={t("general.newRecord")}
              buttonIcon={<FiPlus size={15} />}
              buttonColor={"primary"}
              modalHeader={t("frontOffice.clientFiles.new.modalHeader")}
              modalEditArrow={<BsArrowRight size={25} />}
              modalEdit={t("frontOffice.clientFiles.fileType.other")}
              formTypeModal={0} />
          )}
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
              ID: item.guestProfileID,
              Tipo_De_Ficha: item.firstName ? item.firstName : item.name,
              Nome: item.details,
              Apelido: item.secondName,
              Morada: item.country,
              Email: item.email,
              Telefone: item.phoneNumber,
            }))
          }
        >
          <div className="flex flex-row gap-4 mb-2">
            <button
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === "individual" ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
              onClick={() => {
                handleClickIndividual();
                setSelectedButton("individual");
              }}>
              {t("frontOffice.clientFiles.cards.individual")}
            </button>
            <button
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === "company" ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
              onClick={() => {
                handleClickCompany();
                setSelectedButton("company");
              }}>
              {t("frontOffice.clientFiles.cards.company")}
            </button>
            <button
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === "agency" ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
              onClick={() => {
                handleClickAgency();
                setSelectedButton("agency");
              }}>
              {t("frontOffice.clientFiles.cards.travelAgency")}
            </button>
            <button
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === "group" ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
              onClick={() => {
                handleClickGroup();
                setSelectedButton("group");
              }}>
              {t("frontOffice.clientFiles.cards.group")}
            </button>
            <button
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === "others" ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
              onClick={() => {
                handleClickOthers();
                setSelectedButton("others");
              }}>
              {t("frontOffice.clientFiles.cards.other")}
            </button>
          </div>
          {isLoading ? (<Backdrop
            sx={{ color: 'primary', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          ) : (
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
                <TableColumn className="bg-primary-600 text-white font-bold w-[40px] uppercase" aria-label="ID">
                  {t("frontOffice.clientFiles.datatable.id")}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold px-20 uppercase" aria-label="File Type">
                  {t("frontOffice.clientFiles.datatable.fileType")}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase" aria-label="Name">
                  {t("frontOffice.clientFiles.datatable.name")}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase" aria-label="Last Name">
                  {t("frontOffice.clientFiles.datatable.lastName")}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase" aria-label="Address">
                  {t("frontOffice.clientFiles.datatable.address")}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase" aria-label="Email">
                  {t("frontOffice.clientFiles.datatable.email")}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase" aria-label="Phone Number">
                  {t("frontOffice.clientFiles.datatable.phoneNumber")}
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white flex justify-end items-center pr-7" aria-label="Actions">
                  <GoGear size={20} />
                </TableColumn>
              </TableHeader>
              <TableBody>
                {items.map((individual, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-left underline text-blue-600">
                      {individual.profileType === 0 ? (
                        <IndividualForm
                          buttonName={individual.guestProfileID}
                          editIcon={<FiEdit3 size={25} />}
                          buttonColor={"transparent"}
                          modalHeader={t("frontOffice.clientFiles.edit.modalHeader")}
                          modalEditArrow={<BsArrowRight size={25} />}
                          modalEdit={`ID: ${individual.guestProfileID}`}
                          formTypeModal={1}
                          idIndividual={individual.guestProfileID}
                          idEmail={individual.email}
                          idPhone={individual.phoneNumber}
                          idNif={individual.nif}
                          idAddress={individual.address}
                          idZipCode={individual.zipCode}
                          idLocality={individual.town}
                          idCountry={individual.countryAddress || ''}
                          criado={individual.createdAt}
                          editado={individual.updatedAt}
                          editor={"teste"}
                        />
                      ) : (
                        individual.profileType === 1 ? (
                          <CompanyForm
                            buttonName={individual.guestProfileID}
                            editIcon={<FiEdit3 size={25} />}
                            buttonColor={"transparent"}
                            modalHeader={t("frontOffice.clientFiles.edit.modalHeader")}
                            modalEditArrow={<BsArrowRight size={25} />}
                            modalEdit={`ID: ${individual.guestProfileID}`}
                            formTypeModal={1}
                            idCompany={individual.guestProfileID}
                            idEmail={individual.email}
                            idPhone={individual.phoneNumber}
                            criado={individual.createdAt}
                            editado={individual.updatedAt}
                            editor={"teste"}
                          />
                        ) : (
                          individual.profileType === 2 ? (
                            <TravelGroupForm
                              buttonName={individual.guestProfileID}
                              editIcon={<FiEdit3 size={25} />}
                              buttonColor={"transparent"}
                              modalHeader={t("frontOffice.clientFiles.edit.modalHeader")}
                              modalEditArrow={<BsArrowRight size={25} />}
                              modalEdit={`ID: ${individual.guestProfileID}`}
                              formTypeModal={1}
                              idAgency={individual.guestProfileID}
                              idNifAgency={individual.nif}
                              idAddressAgency={individual.address}
                              idZipCodeAgency={individual.zipCode}
                              idLocalityAgency={individual.town}
                              criado={individual.createdAt}
                              editado={individual.updatedAt}
                              editor={"teste"}
                            />
                          ) : (
                            individual.profileType === 3 ? (
                              <GroupForm
                                buttonName={individual.guestProfileID}
                                editIcon={<FiEdit3 size={25} />}
                                buttonColor={"transparent"}
                                modalHeader={t("frontOffice.clientFiles.edit.modalHeader")}
                                modalEditArrow={<BsArrowRight size={25} />}
                                modalEdit={`ID: ${individual.guestProfileID}`}
                                formTypeModal={1}
                                idIndividual={individual.guestProfileID}
                                criado={individual.createdAt}
                                editado={individual.updatedAt}
                                editor={"teste"}
                              />
                            ) : (
                              individual.profileType === 4 ? (
                                <OthersForm
                                  buttonName={individual.guestProfileID}
                                  editIcon={<FiEdit3 size={25} />}
                                  buttonColor={"transparent"}
                                  modalHeader={t("frontOffice.clientFiles.edit.modalHeader")}
                                  modalEditArrow={<BsArrowRight size={25} />}
                                  modalEdit={`ID: ${individual.guestProfileID}`}
                                  formTypeModal={1}
                                  idOthers={individual.guestProfileID}
                                  criado={individual.createdAt}
                                  editado={individual.updatedAt}
                                  editor={"teste"}
                                />
                              ) : null
                            )
                          )
                        )
                      )}
                    </TableCell>
                    <TableCell className="px-20">{individual.profileType}</TableCell>
                    <TableCell className="">{individual.firstName ? individual.firstName : (individual.name ? individual.name : individual.companyName)}</TableCell>
                    <TableCell className="">{individual.secondName}</TableCell>
                    <TableCell className="">{addresses[individual.address] ? addresses[individual.address].mainAddress : 'Address not found'}</TableCell>
                    <TableCell className="">{emails[individual.email] ? emails[individual.email].personalEmail : 'Email not found'}</TableCell>
                    <TableCell className="">{phoneNumbers[individual.phoneNumber] ? phoneNumbers[individual.phoneNumber].personalPhone : 'Phone not found'}</TableCell>
                    <TableCell className="flex justify-end">
                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            variant="light"
                            className="flex flex-row justify-end"
                            aria-label="Options"
                          >
                            <BsThreeDotsVertical size={20} className="text-gray-400" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions" closeOnSelect={false} isOpen={true}>
                          <DropdownItem key="edit" aria-label="Edit Details">
                            {individual.profileType === 0 ? (
                              <IndividualForm
                                buttonName={t("general.editRecord")}
                                editIcon={<FiEdit3 size={25} />}
                                buttonColor={"transparent"}
                                modalHeader={t("frontOffice.clientFiles.edit.modalHeader")}
                                modalEditArrow={<BsArrowRight size={25} />}
                                modalEdit={`ID: ${individual.guestProfileID}`}
                                formTypeModal={1}
                                idIndividual={individual.guestProfileID}
                                idEmail={individual.email}
                                idPhone={individual.phoneNumber}
                                idNif={individual.nif}
                                idAddress={individual.address}
                                idZipCode={individual.zipCode}
                                idLocality={individual.town}
                                idCountry={individual.countryAddress || ''}
                                criado={individual.createdAt}
                                editado={individual.updatedAt}
                                editor={"teste"}
                              />
                            ) : (
                              individual.profileType === 1 ? (
                                <CompanyForm
                                  buttonName={t("general.editRecord")}
                                  editIcon={<FiEdit3 size={25} />}
                                  buttonColor={"transparent"}
                                  modalHeader={t("frontOffice.clientFiles.edit.modalHeader")}
                                  modalEditArrow={<BsArrowRight size={25} />}
                                  modalEdit={`ID: ${individual.guestProfileID}`}
                                  formTypeModal={1}
                                  idCompany={individual.guestProfileID}
                                  idEmail={individual.email}
                                  idPhone={individual.phoneNumber}
                                  criado={individual.createdAt}
                                  editado={individual.updatedAt}
                                  editor={"teste"}
                                />
                              ) : (
                                individual.profileType === 2 ? (
                                  <TravelGroupForm
                                    buttonName={t("general.editRecord")}
                                    editIcon={<FiEdit3 size={25} />}
                                    buttonColor={"transparent"}
                                    modalHeader={t("frontOffice.clientFiles.edit.modalHeader")}
                                    modalEditArrow={<BsArrowRight size={25} />}
                                    modalEdit={`ID: ${individual.guestProfileID}`}
                                    formTypeModal={1}
                                    idAgency={individual.guestProfileID}
                                    idNifAgency={individual.nif}
                                    idAddressAgency={individual.address}
                                    idZipCodeAgency={individual.zipCode}
                                    idLocalityAgency={individual.town}
                                    criado={individual.createdAt}
                                    editado={individual.updatedAt}
                                    editor={"teste"}
                                  />
                                ) : (
                                  individual.profileType === 3 ? (
                                    <GroupForm
                                      buttonName={t("general.editRecord")}
                                      editIcon={<FiEdit3 size={25} />}
                                      buttonColor={"transparent"}
                                      modalHeader={t("frontOffice.clientFiles.edit.modalHeader")}
                                      modalEditArrow={<BsArrowRight size={25} />}
                                      modalEdit={`ID: ${individual.guestProfileID}`}
                                      formTypeModal={1}
                                      idIndividual={individual.guestProfileID}
                                      criado={individual.createdAt}
                                      editado={individual.updatedAt}
                                      editor={"teste"}
                                    />
                                  ) : (
                                    individual.profileType === 4 ? (
                                      <OthersForm
                                        buttonName={t("general.editRecord")}
                                        editIcon={<FiEdit3 size={25} />}
                                        buttonColor={"transparent"}
                                        modalHeader={t("frontOffice.clientFiles.edit.modalHeader")}
                                        modalEditArrow={<BsArrowRight size={25} />}
                                        modalEdit={`ID: ${individual.guestProfileID}`}
                                        formTypeModal={1}
                                        idOthers={individual.guestProfileID}
                                        criado={individual.createdAt}
                                        editado={individual.updatedAt}
                                        editor={"teste"}
                                      />
                                    ) : null
                                  )
                                )
                              )
                            )}
                          </DropdownItem>
                          <DropdownItem key="delete" aria-label="Remove Item" onClick={() => handleDelete(individual.guestProfileID)}>{t("general.removeRecord")}</DropdownItem>
                          <DropdownItem key="view" aria-label="View Details">{t("general.viewRecord")}</DropdownItem>
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

