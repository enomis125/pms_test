"use client"
import axios from 'axios'
import useSWR from "swr";
import React, { useEffect, useState } from 'react'

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue } from "@nextui-org/react";
import { BiCog } from 'react-icons/bi';
import { Popover, PopoverTrigger, PopoverContent, Dropdown, DropdownItem, Input, DropdownTrigger, DropdownMenu, Button } from '@nextui-org/react';
import { SearchIcon } from '@/components/svgs/SearchIcon';
import { VerticalDotsIcon } from "@/components/svgs/VerticalDowsIcon";
import { format } from 'date-fns';

import { BiLockOpen, BiLock, BiBluetooth } from 'react-icons/bi';
import { CiLock, CiUnlock } from "react-icons/ci";
import { SlLock, SlLockOpen } from "react-icons/sl";
import { FaPen } from 'react-icons/fa';

import { IoIosArrowDown } from "react-icons/io";
import { PlusIcon } from "@/components/svgs/PlusIcon";
import FilterBar from './FilterBar';
import { tableClassNames } from "@/components/classnames/table"
import Loader from '@/components/Loader/Loader';

function converterFormatoData(dataString) {
    // Tenta criar um objeto Date com base na string fornecida
    const data = new Date(dataString);

    // Verifica se a data é válida
    if (isNaN(data.getTime())) {
        // Se a data não for válida, retorna a data padrão
        return "1899-12-30T00:00:00.000Z";
    }

    // Obtém o ano, mês e dia do objeto Date
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Os meses são indexados de 0 a 11
    const dia = String(data.getDate()).padStart(2, '0');

    // Formata os componentes da data para o formato desejado (ano-mes-dia)
    const dataFormatada = `${ano}-${mes}-${dia}T00:00:00.000Z`;

    return dataFormatada;
}

const Tabela_Movements = ({ Movementtype_id, movement, setMovement, newMovement, setNewMovement, isOpen, onOpenChange, onOpenCriar, tipoMovimento, setTipoMovimento, state, setState }) => {
    const [key, setKey] = useState(0); // Key for remounting the component
    const [page, setPage] = React.useState(1);

    let id = { Movementtype_id }
    id = id ? String(id) : "";


    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const strfiltrodef = `"internal_id": -1, "identity_id": -1, "documentnumber": "", "movementtype_id": "${Movementtype_id}" ,"begindate": "1899-12-30T00:00:00.000Z", "enddate": "1899-12-30T00:00:00.000Z", "state": -1, "stringtosearch": ""`;



    const [filtros, setFiltros] = React.useState(strfiltrodef);
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [filterValue, setFilterValue] = React.useState("");
    const hasSearchFilter = Boolean(filterValue);
    const [filterBarVisible, setFilterBarVisible] = useState(false);
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);


    const [startDate, setStartDate] = useState(firstDayOfMonth);
    const [endDate, setEndDate] = useState(lastDayOfMonth);
    const [nifFornecedor, setNifFornecedor] = useState();

    const [estado, setEstado] = useState();

    const [fornecedorid, setFornecedor] = useState();
    const [tipomovimento, setTipomovimento] = useState();
    const [nrDocumento, setnrDocumento] = useState('');


    const parametros = { filtros: filtros, page: page, per_page: rowsPerPage };



    const fetcher = (url, parametros) =>
        axios
            .get(url, { params: { filtros: parametros.filtros, page: parametros.page, per_page: parametros.per_page } })
            .then((res) => { return res.data.response })

    const movimentos = useSWR(
        [
            `/api/movements`, parametros
        ],
        ([url, parametros]) => fetcher(url, parametros),
        {
            refreshInterval: 300000, // Set the refresh interval to 300,000 milliseconds (5 minutes)
            revalidateOnFocus: false,
        }
    );




    const clearInfo = React.useCallback(() => {
        onOpenCriar();
    }, [onOpenCriar]);

    const totalRecords = movimentos.isLoading ? 0 : (movimentos.data && movimentos.data.length > 0 ? movimentos.data[0].Totalrecords : 0);


    const numPages = Math.ceil(totalRecords / rowsPerPage);



    const filteredItems = React.useMemo(() => {
        if (movimentos.isLoading || !movimentos.data) return [];
        let filteredMovimentos = Object.keys(movimentos.data).length === 0 ? [] : [...movimentos.data];

        if (hasSearchFilter) {
            filteredMovimentos = filteredMovimentos.filter((movimento) =>
                movimento.Entitydescription.toLowerCase().includes(
                    filterValue.toLowerCase()
                )
            );
        }
        if (
            statusFilter !== "all" &&
            Array.from(statusFilter).length !== statusOptions.length
        ) {
            filteredMovimentos = filteredMovimentos.filter((movimento) =>
                Array.from(statusFilter).includes(movimento.State)
            );
        }

        return filteredMovimentos;
    }, [movimentos.isLoading, movimentos.data, filterValue, statusFilter, hasSearchFilter]);


    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("");
        setPage(1);
    }, []);


    const columns = [
        {
            key: "Movement_id",
            title: "ID"
        },
        {
            key: "Date",
            title: "DATA MOV."
        },
        {
            key: "Datede",
            title: "DATA DOC."
        },
        {
            key: "Movementtype_description",
            title: "MOVIMENTO"
        },
        {
            key: "Documentnumber",
            title: "NR.DOC."
        },
        {
            key: "Entitydescription",
            title: "ENTIDADE"
        },
        {
            key: "Totalamount",
            title: "TOTAL",
            align: 'right'
        },
        {
            key: "State",
            title: "EST"
        },
        {
            key: "Inventoried",
            title: "INV"
        },
        {
            key: "Actions",
            title: <BiCog size={20} />
        },
    ]

    const renderCell = React.useCallback(
        (movimento, columnKey) => {
            const cellValue = movimento[columnKey];

            switch (columnKey) {
                case "Date":
                case "Datede":
                    const formattedDate = format(new Date(cellValue), 'dd-MM-yyyy');
                    return formattedDate;
                case "Totalamount":
                    return (
                        <div className="w-full text-right">{cellValue}</div>
                    )
                case "State":

                    if (movimento.State === 0) {
                        return <SlLockOpen size={20} />;
                    } else {
                        return <SlLock size={20} />;
                    }

                case "Inventoried":
                    if (movimento.Inventoried === 0) {
                        return <SlLockOpen size={20} />;
                    } else {
                        return <SlLock size={20} />;
                    }


                case "Actions":
                    return (
                        <>
                            <Dropdown onOpenChange={() => setMovement(movimento.Movement_id)}>
                                <DropdownTrigger>
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        variant="light"
                                        aria-label="menu"
                                    >
                                        <VerticalDotsIcon className="text-default-300" />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    <DropdownItem
                                        onPress={() => {
                                            setNewMovement(false);
                                            onOpenChange();
                                        }}
                                    >
                                        Editar
                                    </DropdownItem>
                                    <DropdownItem>Remover</DropdownItem>
                                    <DropdownItem>Ver</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </>
                    );

                default:
                    return cellValue;
            }
        },
        [setMovement, onOpenChange, setNewMovement]
    )

    const bottomContent = React.useMemo(() => {
        if (numPages <= 0) return null;
        return (
            <div className="flex w-full justify-center">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    isDisabled={hasSearchFilter}
                    page={page}
                    total={numPages}
                    onChange={(page) => setPage(page)}
                />
            </div>
        );
    }, [page, numPages, hasSearchFilter]);

    const toggleFilterBar = () => {
        setFilterBarVisible(!filterBarVisible);
    };

    const handleClick = React.useCallback(() => {



        const datainicio = converterFormatoData(startDate)
        const datafim = converterFormatoData(endDate)



        // Valores padrão
        const defaultInternalId = -1;
        const defaultIdentityId = -1;
        const defaultDocumentNumber = "";
        const defaultMovementTypeId = -1;
        const defaultBeginDate = "1899-12-30T00:00:00.000Z";
        const defaultEndDate = "1899-12-30T00:00:00.000Z";
        const defaultState = -1;
        const defaultStringToSearch = "";



        // Verifique se fornecedorid e tipomovimento têm valores
        let fornecedorIdValue = defaultIdentityId;
        let Statevalue = defaultState;
        let tipoMovimentoValue = defaultMovementTypeId;

        if (fornecedorid != null)
            if (fornecedorid.size > 0)
                fornecedorIdValue = fornecedorid.currentKey;

        if (estado != null)
            Statevalue = estado.currentKey;


        if (tipomovimento != null)
            if (tipomovimento.size > 0)
                tipoMovimentoValue = tipomovimento.currentKey;

        const nrDocumentovalue = nrDocumento || defaultDocumentNumber;





        const BeginDate = datainicio || defaultBeginDate;
        const EndDate = datafim || defaultEndDate;


        // Construa a nova string de filtro
        const newFilter = `"internal_id":${defaultInternalId},"identity_id":"${fornecedorIdValue}","documentnumber":"${nrDocumentovalue}",
        "movementtype_id":${tipoMovimentoValue},"begindate":"${BeginDate}","enddate":"${EndDate}","state":${Statevalue},"stringtosearch":"${defaultStringToSearch}"`;

        setFiltros(newFilter);

        setKey((prevKey) => prevKey + 1);
    }, [estado, fornecedorid, nrDocumento, tipomovimento, endDate, startDate]);



    const topContent = React.useMemo(() => {
        return (
            <div className="flex w-full justify-between items-center -mt-12 -mb-4">

                <Input
                    type="text"
                    className="w-1/3 sm:max-w-[44%]"
                    placeholder="Procurar..."
                    labelPlacement="outside"
                    value={filterValue}
                    onValueChange={onSearchChange}
                    startContent={<SearchIcon />}
                    endContent={
                        <Popover placement="bottom" showArrow offset={10} classNames={{ trigger: "bg-transparent" }}>
                            <PopoverTrigger>
                                <Button className='-m-4'><IoIosArrowDown size={20} /></Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full left-0 right-0">
                                <FilterBar onClick={handleClick}
                                    startDate={startDate} setStartDate={setStartDate}
                                    endDate={endDate} setEndDate={setEndDate}
                                    nifFornecedor={nifFornecedor} setNifFornecedor={setNifFornecedor}
                                    fornecedorid={fornecedorid} setFornecedor={setFornecedor}
                                    estado={estado} setEstado={setEstado}
                                    tipomovimento={tipomovimento} setTipomovimento={setTipomovimento}
                                    nrDocumento={nrDocumento} setnrDocumento={setnrDocumento}

                                />

                            </PopoverContent>
                        </Popover>
                    }
                />

                <Button

                    size="md"
                    variant="solid"
                    className='m-4'
                    
                    onPress={() => {
                        setNewMovement(true); 
                        onOpenCriar();
                     
                    }}
                    endContent={<PlusIcon />}
                    color='primary'
                >
                    Novo Movimento
                </Button>

                {/* <Button
                    color="primary"
                    endContent={<PlusIcon />}
                    size="md"
                    variant='solid'
                    onPress={clearInfo}
                    className='m-4'
                >
                    Novo Movimento
                </Button> */}
            </div>

        );
    }, [filterValue, onSearchChange, handleClick, startDate, endDate, clearInfo, nifFornecedor, fornecedorid, estado, tipomovimento, nrDocumento]);

    if (movimentos.isLoading) {
        return <Loader />
    }

    setTipoMovimento(movimentos.data[0].Movementtype_description)

    return (
        < div key={key}>
            <Table
                topContent={topContent}
                bottomContent={bottomContent}
                selectionMode="multiple"
                classNames={tableClassNames}
                onRowAction={() => { }}
            >
                <TableHeader
                    columns={columns}
                    className='bg-primary'
                >
                    {(column) => <TableColumn key={column.key}>{column.title}</TableColumn>}
                </TableHeader>
                <TableBody emptyContent={"No rows to display."}
                    items={filteredItems}
                    loadingContent={<Spinner />}
                    loadingState={movimentos.isLoading}
                >

                    {(item) => (
                        <TableRow key={item.Movement_id}>
                            {(columnKey) => (
                                <TableCell>{renderCell(item, columnKey)}</TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default Tabela_Movements;
