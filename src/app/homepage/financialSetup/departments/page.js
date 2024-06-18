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
import {useTranslations} from 'next-intl';
 
//imports de icons
import { GoGear } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { FiEdit3 } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";
 
//imports de componentes
import DepartmentsForm from "@/components/modal/financialSetup/deparments/page";
import PaginationTable from "@/components/table/paginationTable/paginationTable";
import LoadingBackdrop from "@/components/table/loadingBackdrop/loadingBackdrop";

 
 
export default function Departments() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchValue, setSearchValue] = React.useState("");
  const [department, setDepartment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations('Index');
 
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/v1/financialSetup/departments");
        console.log(res);
        setDepartment(res.data.response); // Move this line inside the try block
      } catch (error) {
        console.error("Error: ", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);
 
  const filteredItems = React.useMemo(() => {
    if (!department || !Array.isArray(department)) {
      return [];
    }
  
    return department.filter((department) =>
      (department.description && department.description.toLowerCase().includes(searchValue.toLowerCase())) ||
      (department.departmentID && department.departmentID.toString().toLowerCase().includes(searchValue.toLowerCase()))
    );
  }, [department, searchValue]);
  
 
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
 
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);
 
  const pages = Math.ceil(filteredItems.length / rowsPerPage);
 
  const renderCell = React.useCallback((department, columnKey) => {
    const cellValue = department[columnKey];
  }, []);
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
 
  const handleSearchChange = (value) => {
    setSearchValue(value);
    setPage(1);
  };
 
  const handleDelete = async (idDepartment) => {
    try {
      const response = await axios.delete(`/api/v1/financialSetup/departments/` + idDepartment);
      alert("Departamento removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover departamento.", error.message);
    }
  };
 
    return (
      <main>
        <div className="flex flex-col mt-3 py-3">
          <p className="text-xs px-6">{t('financialSetup.departments.title')}</p>
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
            <DepartmentsForm
              buttonName={t('general.newRecord')}
              buttonIcon={<FiPlus size={15} />}
              buttonColor={"primary"}
              modalHeader={t('financialSetup.departments.new.modalHeader')}
              modalIcons={"bg-red"}
              formTypeModal={11}
            ></DepartmentsForm>
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
                ID: item.departmentID,
                Cod: item.anzahl,
                Abreviatura: item.hqref,
                Descrição: item.description,
                Detalhe: item.departmentName,
                Estado: item.gruppe,
                Ordem: item.showFo,
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
          {t('financialSetup.departments.datatable.id')}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold px-20 uppercase">
          {t('financialSetup.departments.datatable.cod')}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold uppercase">
          {t('financialSetup.departments.datatable.abreviature')}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold w-1/4 uppercase">
          {t('financialSetup.departments.datatable.description')}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold px-20 uppercase">
          {t('financialSetup.departments.datatable.detail')}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold px-20 uppercase">
          {t('financialSetup.departments.datatable.status')}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold px-20 uppercase">
          {t('financialSetup.departments.datatable.order')}
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white flex justify-end items-center pr-7">
            <GoGear size={20} />
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((department, index) => (
            <TableRow key={index}>
              <TableCell className="text-right underline text-blue-600">
                <DepartmentsForm
                        buttonName={department.departmentID}
                        editIcon={<FiEdit3 size={25}/>}
                        buttonColor={"transparent"}
                        modalHeader={t('financialSetup.departments.new.modalHeader')}
                        modalEditArrow={<BsArrowRight size={25}/>}
                        modalEdit={`ID: ${department.departmentID}`}
                        formTypeModal={12}
                        idDepartment={department.departmentID}
                        criado={department.createdAt}
                        editado={department.updatedAt}
                        editor={"teste"}
                      /></TableCell>
              <TableCell className="px-20">{department.anzahl}</TableCell>
              <TableCell>{department.hqref}</TableCell>
              <TableCell className="">{department.description}</TableCell>
              <TableCell className="px-20">{department.departmentName}</TableCell>
              <TableCell className="px-20">{department.gruppe}</TableCell>
              <TableCell className="px-20">{department.showFo}</TableCell>
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
                      <DepartmentsForm
                        buttonName={t('general.editRecord')}
                        editIcon={<FiEdit3 size={25}/>}
                        buttonColor={"transparent"}
                        modalHeader={t('financialSetup.departments.edit.modalHeader')}
                        modalEditArrow={<BsArrowRight size={25}/>}
                        modalEdit={`ID: ${department.departmentID}`}
                        formTypeModal={12}
                        idDepartment={department.departmentID}
                        criado={department.createdAt}
                        editado={department.updatedAt}
                        editor={"teste"}
                      ></DepartmentsForm>
                    </DropdownItem>
                    <DropdownItem key="delete" onClick={() => handleDelete(department.departmentID)}>{t('general.removeRecord')}</DropdownItem>
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

