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
    inputs,
    onClearFilters,
    onApplyFilters,
}) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

 

    const handleClearFilters = () => {
        inputs.forEach(input => {
            input.onChange(''); // Resetando o valor de cada input para uma string vazia
        });
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
                                        {inputs.map((input, index) => (
                                            <InputFieldControlled
                                                key={index}
                                                type="text"
                                                id={input.id}
                                                name={input.name}
                                                label={input.label}
                                                ariaLabel={input.ariaLabel}
                                                value={input.value} // Certifique-se de passar o valor do input corretamente
                                                onChange={input.onChange}
                                                style="w-full border-b-4 border-white-300 px-1 h-10 outline-none bg-transparent"
                                            />
                                        ))}
                                    </ModalBody>
                                    <ModalFooter className='flex justify-center gap-5'>
                                        <Button color="primary" onPress={onClearFilters}>
                                            Limpar Filtros
                                        </Button>
                                        <Button className='bg-green text-white'> 
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