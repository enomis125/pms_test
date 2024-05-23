import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { IoIosArrowUp } from "react-icons/io";

import ClientFormAutocomplete from "@/components/functionsForm/autocomplete/clientForm/page";
import InputFieldControlled from '@/components/functionsForm/inputs/typeText/page';


export default function searchModal({
    buttonName,
    buttonIcon,
    buttonColor,
    handleClientSelect,
    handleSubmitReservation,
    reservation,
}) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleApplyFilters = () => {
        //handleSubmitReservation(); // 
        onOpenChange(false); // fecha o modal
    };

    return (
        <>
            <Button onPress={onOpen} color={buttonColor} className='flex justify-end'>
                {buttonName} {buttonIcon}
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='transparent' size='sm' placement='center' hideCloseButton='true'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <div className='bg-white'>
                                <div className='bg-lightBlue mx-2 my-1 rounded-xl'>
                                    <ModalHeader className="flex flex-col gap-1 text-sm"><b>PESQUISAR POR</b></ModalHeader>
                                    <ModalBody>
                                        <InputFieldControlled
                                            type={"text"}
                                            id={"search"}
                                            name={"Search"}
                                            label={""}
                                            ariaLabel={"search"}
                                            style={"w-full border-b-4 border-white-300 px-1 h-10 outline-none bg-transparent"}
                                        />
                                        <ClientFormAutocomplete
                                            label={"Tipo de Documento"}
                                            style={""}
                                            variant={"flat"}
                                            onChange={(value) => handleClientSelect(value)}
                                        />
                                        <ClientFormAutocomplete
                                            label={"Tipo de Documento"}
                                            style={""}
                                            variant={"flat"}
                                            onChange={(value) => handleClientSelect(value)}
                                        />
                                    </ModalBody>
                                    <ModalFooter className='flex justify-center gap-5'>
                                        <Button color="primary" onPress={onClose}>
                                            Limpar Filtros
                                        </Button>
                                        <Button className='bg-green text-white' onPress={handleApplyFilters}>
                                            Aplicar Filtros
                                        </Button>
                                    </ModalFooter>
                                </div>
                            </div>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}