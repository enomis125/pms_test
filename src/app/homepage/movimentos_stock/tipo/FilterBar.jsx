'use client'
import { Select, Button, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import useSWRImmutable from 'swr';
import { v4 as uuidv4 } from 'uuid';

const FilterBar = ({ onClick, startDate, setStartDate, endDate, setEndDate, nifFornecedor, setNifFornecedor, fornecedorid, setFornecedor, estado, setEstado, tipomovimento, setTipomovimento,
    nrDocumento, setnrDocumento }) => {

    // Adicione uma chave única para o Select
    const [selectKeyTMob, setSelectKeyTMov] = useState(uuidv4());
    const [selectKeySupplier, setSelectKeySupplier] = useState(uuidv4());

    const clearFilters = React.useCallback(() => {

        setTipomovimento('');
        setNifFornecedor('');
        setFornecedor('');
        setStartDate(new Date());
        setEndDate(new Date());
        setEstado();
        setnrDocumento('');
        setSelectKeyTMov(uuidv4());
        setSelectKeySupplier(uuidv4());
    }, [setTipomovimento, setNifFornecedor, setFornecedor, setStartDate, setEndDate, setEstado, setnrDocumento, setSelectKeyTMov, setSelectKeySupplier]);

    const resetDatesToCurrentMonth = React.useCallback(() => {
        // Definir as datas para o mês atual
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        setStartDate(firstDayOfMonth);
        setEndDate(lastDayOfMonth);

    }, [setStartDate, setEndDate]);




    // Sua função fetcher, que deve retornar os dados desejados
    const fetcher = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    };


    const { data: suppliers, error } = useSWRImmutable('/api/suppliers');
    const { data: movementtypes, error1 } = useSWRImmutable('/api/movements/types');

    if (error) {
        // Handle error
        console.error('Erro ao carregar os fornecedores:', error);
    }

    if (error1) {
        // Handle error
        console.error('Erro ao carregar os tipos Movimento:', error1);
    }
    if (!suppliers || !movementtypes) {
        // Ainda carregando os dados, você pode exibir um indicador de carregamento aqui se desejar
        return <p>Carregando...</p>;
    }
    const fechado = Number(1)
    const aberto = Number(0)


    return (

        <>

            <Card className="py-4 bg-slate-200  left-0">
                <CardHeader className="pb-2 px-4 flex-col items-start -mt-4">
                    <p className="text-md uppercase font-bold">Filtros</p>
                </CardHeader>
                <CardBody>
                    <div style={{ overflowY: 'auto', maxHeight: '1500px' }}>
                        <div className="mb-4">
                            {/* <div className="mb-4">
                                <Input
                                    type="number"
                                    label="NIF Fornecedor"
                                    placeholder="Introduza o NIF do fornecedor"
                                    value={nifFornecedor}
                                    onChange={(e) => setNifFornecedor(e.target.value)}
                                />
                            </div> */}


                            <div className="mb-4">
                                <Select
                                    key={selectKeyTMob}
                                    id="tipomovimento"
                                    type="text"
                                    label="Tipo Movimento"
                                    placeholder="Selecione o tipo movimento"
                                    defaultSelectedKeys={tipomovimento}

                                    value={tipomovimento || null}
                                    onSelectionChange={setTipomovimento}


                                >
                                    {movementtypes.map((movementtype) => (
                                        <SelectItem key={movementtype.Movementtype_id} value={movementtype.Movementtype_id}>
                                            {movementtype.Description}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>


                            <div className="mb-4">

                                <Select
                                    key={selectKeySupplier}
                                    id="Forn"
                                    type="text"
                                    label="Fornecedor"
                                    placeholder="Selecione o Fornecedor"
                                    defaultSelectedKeys={fornecedorid}

                                    value={fornecedorid || null}
                                    onSelectionChange={setFornecedor}
                                >


                                    {suppliers.map((supplier) => (
                                        <SelectItem key={supplier.Supplier_id} value={supplier.Supplier_id}>
                                            {supplier.Name}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>

                            <div className="flex gap-8 z-50">
                                <div className="flex flex-col items-start mb-6">
                                    <label className="mb-1">Desde</label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        //  endDate={endDate}
                                        dateFormat="dd/MM/yyyy"
                                        icon="fa fa-calendar"
                                    />
                                </div>
                                <div className="flex flex-col items-start mb-6 z-50">
                                    <label className="mb-1">Até</label>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        // selectsEnd
                                        startDate={startDate}
                                        //  endDate={endDate}
                                        minDate={startDate}
                                        dateFormat="dd/MM/yyyy"
                                        icon="fa fa-calendar"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <Select
                                    label="Estado"
                                    placeholder="Selecione o estado"
                                    selectionMode="single"

                                    selectedKeys={estado}
                                    onSelectionChange={setEstado}
                                >

                                    <SelectItem key={0} value={aberto}>
                                        Aberto
                                    </SelectItem>
                                    <SelectItem key={1} value={fechado}>
                                        Fechado
                                    </SelectItem>


                                </Select>

                            </div>
                            <Input
                                type="text"
                                label="ID Documento"
                                placeholder="Introduza o nr documento "
                                value={nrDocumento}
                                text={nrDocumento}
                                onChange={(e) => setnrDocumento(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-evenly">
                         <Button
                                color="primary"
                                className="justify-centertext-white max-w-xs"
                                onClick={() => {
                                    clearFilters();
                                    resetDatesToCurrentMonth();
                                }}
                            >
                                Limpar Filtros
                            </Button>
                            <Button
                                className="justify-center bg-green-600 text-white max-w-xs pace-x-4"
                                onClick={onClick}
                            >
                                Aplicar Filtros
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    );
};

export default FilterBar;