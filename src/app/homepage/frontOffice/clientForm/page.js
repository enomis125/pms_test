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


export default function clientForm() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchValue, setSearchValue] = React.useState("");
  const [individual, setIndividual] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (!dataFetched) {
        setIsLoading(true);
        try {
          const res = await axios.get("/api/v1/frontOffice/clientForm/individuals");
          setIndividual(res.data.response);
          setDataFetched(true);
        } catch (error) {
          console.error("Erro ao encontrar as fichas de cliente:", error.message);
        } finally {
          setIsLoading(false);
        }
      };
    }
    getData();
  }, []);

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
        <p className="text-xs px-6">Fichas de Clientes</p>
        <div className="flex flex-row justify-between items-center mx-5">
          <div className="flex flex-row">
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              <Input
                className="mt-2 w-80"
                placeholder="Procurar..."
                labelPlacement="outside"
                aria-label="Pesquisar clientes"
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
              buttonName={"Novo"}
              buttonIcon={<FiPlus size={15} />}
              buttonColor={"primary"}
              modalHeader={"Inserir Ficha de Cliente"}
              modalEditArrow={<BsArrowRight size={25} />}
              modalEdit={"Particular"}
              modalIcons={"bg-red"}
              formTypeModal={0}
            ></IndividualForm>
          )}
          {selectedComponent === 'CompanyForm' && (
            <CompanyForm
              buttonName={"Novo"}
              buttonIcon={<FiPlus size={15} />}
              buttonColor={"primary"}
              modalHeader={"Inserir Ficha de Cliente"}
              modalEditArrow={<BsArrowRight size={25} />}
              modalEdit={"Empresa"}
              modalIcons={"bg-red"}
              formTypeModal={0}
            ></CompanyForm>
          )}
          {selectedComponent === 'AgencyForm' && (
            <TravelGroupForm
              formTypeModal={0}
              buttonName={"Novo"}
              buttonIcon={<FiPlus size={15} />}
              buttonColor={"primary"}
              modalHeader={"Inserir Ficha de Cliente"}
              modalEditArrow={<BsArrowRight size={25} />}
              modalEdit={"Agencia de Viagens"} />
          )}
          {selectedComponent === 'GroupForm' && (
            <GroupForm
              formTypeModal={0}
              buttonName={"Novo"}
              buttonIcon={<FiPlus size={15} />}
              buttonColor={"primary"}
              modalHeader={"Inserir Ficha de Cliente"}
              modalEditArrow={<BsArrowRight size={25} />}
              modalEdit={"Grupos"} />
          )}
          {selectedComponent === 'OthersForm' && (
            <OthersForm
              formTypeModal={0}
              buttonName={"Novo"}
              buttonIcon={<FiPlus size={15} />}
              buttonColor={"primary"}
              modalHeader={"Inserir Ficha de Cliente"}
              modalEditArrow={<BsArrowRight size={25} />}
              modalEdit={"Outros"} />
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
              Individual
            </button>
            <button
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === "company" ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
              onClick={() => {
                handleClickCompany();
                setSelectedButton("company");
              }}>
              Empresa
            </button>
            <button
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === "agency" ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
              onClick={() => {
                handleClickAgency();
                setSelectedButton("agency");
              }}>
              Agência de Viagens
            </button>
            <button
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === "group" ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
              onClick={() => {
                handleClickGroup();
                setSelectedButton("group");
              }}>
              Grupos
            </button>
            <button
              className={`h-fit px-3 rounded-2xl text-black text-xs ${selectedButton === "others" ? "bg-blue-600 text-white border-2 border-blue-600" : "bg-slate-200 border-2 border-slate-300"}`}
              onClick={() => {
                handleClickOthers();
                setSelectedButton("others");
              }}>
              Outros
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
                  ID
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold px-20 uppercase" aria-label="Tipo de ficha">
                  Tipo de ficha
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase" aria-label="Nome">
                  Nome
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase" aria-label="Apelido">
                  Apelido
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase" aria-label="Morada">
                  Morada
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase" aria-label="E-mail">
                  E-mail
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white font-bold uppercase" aria-label="Telefone">
                  Telefone
                </TableColumn>
                <TableColumn className="bg-primary-600 text-white flex justify-end items-center pr-7" aria-label="Funções">
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
                          modalHeader={"Editar Ficha de Cliente"}
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
                            modalHeader={"Editar Ficha de cliente"}
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
                              modalHeader={"Editar Ficha de cliente"}
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
                                modalHeader={"Editar Ficha de cliente"}
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
                                  modalHeader={"Editar Ficha de cliente"}
                                  modalEditArrow={<BsArrowRight size={25} />}
                                  modalEdit={`ID: ${individual.guestProfileID}`}
                                  formTypeModal={1}
                                  idIndividual={individual.guestProfileID}
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
                    <TableCell className="">{individual.firstName ? individual.firstName : individual.name}</TableCell>
                    <TableCell className="">{individual.secondName}</TableCell>
                    <TableCell className="">{individual.country}</TableCell>
                    <TableCell className="">{individual.email}</TableCell>
                    <TableCell className="">{individual.phoneNumber}</TableCell>
                    <TableCell className="flex justify-end">
                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            variant="light"
                            className="flex flex-row justify-end"
                            aria-label="Opções"
                          >
                            <BsThreeDotsVertical size={20} className="text-gray-400" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions" closeOnSelect={false} isOpen={true}>
                          <DropdownItem key="edit" aria-label="Editar detalhes">
                            {individual.profileType === 0 ? (
                              <IndividualForm
                                buttonName={"Editar"}
                                editIcon={<FiEdit3 size={25} />}
                                buttonColor={"transparent"}
                                modalHeader={"Editar Ficha de Cliente"}
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
                                  buttonName={"Editar"}
                                  editIcon={<FiEdit3 size={25} />}
                                  buttonColor={"transparent"}
                                  modalHeader={"Editar Ficha de cliente"}
                                  modalEditArrow={<BsArrowRight size={25} />}
                                  modalEdit={`ID: ${individual.guestProfileID}`}
                                  formTypeModal={1}
                                  idIndividual={individual.guestProfileID}
                                  idEmail={individual.email}
                                  idPhone={individual.phoneNumber}
                                  criado={individual.createdAt}
                                  editado={individual.updatedAt}
                                  editor={"teste"}
                                />
                              ) : (
                                individual.profileType === 2 ? (
                                  <TravelGroupForm
                                    buttonName={"Editar"}
                                    editIcon={<FiEdit3 size={25} />}
                                    buttonColor={"transparent"}
                                    modalHeader={"Editar Ficha de cliente"}
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
                                      buttonName={"Editar"}
                                      editIcon={<FiEdit3 size={25} />}
                                      buttonColor={"transparent"}
                                      modalHeader={"Editar Ficha de cliente"}
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
                                        buttonName={"Editar"}
                                        editIcon={<FiEdit3 size={25} />}
                                        buttonColor={"transparent"}
                                        modalHeader={"Editar Ficha de cliente"}
                                        modalEditArrow={<BsArrowRight size={25} />}
                                        modalEdit={`ID: ${individual.guestProfileID}`}
                                        formTypeModal={1}
                                        idIndividual={individual.guestProfileID}
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
                          <DropdownItem key="delete" aria-label="Remover item" onClick={() => handleDelete(individual.guestProfileID)}>Remover</DropdownItem>
                          <DropdownItem key="view" aria-label="Ver detalhes">Ver</DropdownItem>
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

