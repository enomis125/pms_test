import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { IoIosArrowUp } from "react-icons/io";

import ClientFormAutocomplete from "@/components/functionsForm/autocomplete/clientForm/page";


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
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='transparent' size='sm' placement='bottom' hideCloseButton='true'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <div className='bg-white'>
                                <div className='bg-lightBlue mx-2 my-1 rounded-xl'>
                                    <ModalHeader className="flex flex-col gap-1 text-sm"><b>FILTROS</b></ModalHeader>
                                    <ModalBody>
                                        <ClientFormAutocomplete
                                            label={"Tipo de Documento"}
                                            style={""}
                                            variant={"flat"}
                                            onChange={(value) => handleClientSelect(value)}
                                        />
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Nullam pulvinar risus non risus hendrerit venenatis.
                                            Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                        </p>
                                        <p>
                                            Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                                            dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                                            Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                            Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                                            proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                                        </p>
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
