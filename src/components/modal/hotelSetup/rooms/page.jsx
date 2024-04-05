"use client"
import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import axios from 'axios';
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import roomsInsert, { roomsEdit } from "@/components/functionsForm/CRUD/hotel/rooms/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";

import { expansion } from "@/components/functionsForm/expansion/page";


const roomForm = ({
    idRoom,
    buttonName,
    buttonIcon,
    modalHeader,
    editIcon,
    modalEditArrow,
    modalEdit,
    formTypeModal,
    buttonColor,
    criado,
    editado,
    editor
}) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { handleInputRoom, handleSubmitRoom } = roomsInsert();
    const { handleUpdateRoom, setValuesRoom, valuesRoom } = roomsEdit(idRoom);

    const { toggleExpand, setIsExpanded, isExpanded } = expansion();


    const [caracteristics, setCaracteristics] = useState([]);

    useEffect(() => {
        const getData = () => {
            axios.get('/api/v1/hotel/caracteristicas')
                .then(res => {
                    setCaracteristics(res.data.response);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };
        getData();
    }, []);


    const [tipology, setTipology] = useState([]);

    useEffect(() => {
        const getData = () => {
            axios.get('/api/v1/hotel/tipologys')
                .then(res => {
                    setTipology(res.data.response);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };
        getData();
    }, []);

    return (
        <>

            {formTypeModal === 11 && ( //rooms insert
                <>
                    <Button onPress={onOpen} color={buttonColor} className="w-fit">
                        {buttonName} {buttonIcon}
                    </Button>
                    <Modal
                        classNames={{
                            base: "max-h-screen",
                            wrapper: isExpanded ? "w-full h-screen" : "lg:pl-72 h-screen w-full",
                            body: "h-full",
                        }}
                        size="full"
                        isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} scrollBehavior="inside">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <form onSubmit={handleSubmitRoom}>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                            {modalHeader}
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"description"}
                                                name={"Description"}
                                                label={"Descrição"}
                                                ariaLabel={"Descrição"}
                                                onChange={handleInputRoom} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"abreviature"}
                                                name={"Label"}
                                                label={"Abreviatura"}
                                                ariaLabel={"Abreviatura"}
                                                onChange={handleInputRoom} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"roomType"}
                                                name={"RoomType"}
                                                label={"Tipo de Quarto"}
                                                ariaLabel={"Tipo de Quarto"}
                                                onChange={handleInputRoom} />

                                            <div className="w-full flex flex-col gap-4">
                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <Autocomplete
                                                        label="Selecione uma tipologia"
                                                        className="max-w-xs"
                                                    >
                                                        {tipology.map((tipology) => (
                                                            <AutocompleteItem key={tipology.roomTypeID} value={tipology.desc}>
                                                                {tipology.desc}
                                                            </AutocompleteItem>
                                                        ))}
                                                    </Autocomplete>
                                                </div>
                                            </div>

                                            <div className="flex flex-col md:flex-row justify-between">
                                                <div className="flex flex-col w-1/2">
                                                    <p className="text-sm">Ocupação Máxima</p>
                                                    <p className="text-xl">1</p>
                                                </div>
                                                <div className="flex flex-col w-1/2">
                                                    <p className="text-sm">Ordem</p>
                                                    <p className="text-xl">1</p>
                                                </div>
                                            </div>

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"depHousekeeping"}
                                                name={"depHousekeeping"}
                                                label={"DEP. DE HOUSEKEEPING"}

                                                ariaLabel={"Departamento de limpeza"} />

                                            <div className="flex gap-4 items-center max-w-xs">
                                                <Button size="md">
                                                    Configuração de interfaces
                                                </Button>
                                            </div>

                                            <div className="w-full flex flex-col gap-4">
                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <Autocomplete
                                                        label="Selecione uma caracteristica"
                                                        className="max-w-xs"
                                                    >
                                                        {caracteristics.map((caracteristic) => (
                                                            <AutocompleteItem key={caracteristic.characteristicID} value={caracteristic.description}>
                                                                {caracteristic.description}
                                                            </AutocompleteItem>
                                                        ))}
                                                    </Autocomplete>
                                                </div>
                                            </div>
                                        </ModalBody>
                                    </form>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 12 && ( //rooms edit
                <>
                    <Button fullWidth={true} size="md" onPress={onOpen} color={buttonColor} className="-h-3 flex justify-start -p-3">
                        {buttonName} {buttonIcon}
                    </Button>
                    <Modal
                        classNames={{
                            base: "max-h-screen",
                            wrapper: isExpanded ? "w-full h-screen" : "lg:pl-72 h-screen w-full",
                            body: "h-full",
                        }}
                        size="full"
                        isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <form onSubmit={(e) => handleUpdateRoom(e)}>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                            <div className="flex flex-row justify-start gap-4">
                                                {editIcon} {modalHeader} {modalEditArrow} {modalEdit}
                                            </div>
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"description"}
                                                name={"Description"}
                                                label={"Descrição"}
                                                ariaLabel={"Descrição"}
                                                value={valuesRoom.Description}
                                                onChange={e => setValuesRoom({ ...valuesRoom, Description: e.target.value })} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"abreviature"}
                                                name={"Label"}
                                                label={"Abreviatura"}
                                                ariaLabel={"Abreviatura"}
                                                value={valuesRoom.Label}
                                                onChange={e => setValuesRoom({ ...valuesRoom, Label: e.target.value })} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"roomType"}
                                                name={"RoomType"}
                                                label={"Tipo de Quarto"}
                                                ariaLabel={"Tipo de Quarto"}
                                                value={valuesRoom.RoomType}
                                                onChange={e => setValuesRoom({ ...valuesRoom, RoomType: e.target.value })} />

                                            <div className="w-full flex flex-col gap-4">
                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <Autocomplete
                                                        label="Selecione uma tipologia"
                                                        className="max-w-xs"
                                                    >
                                                        {tipology.map((tipology) => (
                                                            <AutocompleteItem key={tipology.roomTypeID} value={tipology.desc}>
                                                                {tipology.desc}
                                                            </AutocompleteItem>
                                                        ))}
                                                    </Autocomplete>
                                                </div>
                                            </div>

                                            <div className="flex flex-col md:flex-row justify-between">
                                                <div className="flex flex-col w-1/2">
                                                    <p className="text-sm">Ocupação Máxima</p>
                                                    <p className="text-xl">1</p>
                                                </div>
                                                <div className="flex flex-col w-1/2">
                                                    <p className="text-sm">Ordem</p>
                                                    <p className="text-xl">1</p>
                                                </div>
                                            </div>

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"depHousekeeping"}
                                                name={"depHousekeeping"}
                                                label={"DEP. DE HOUSEKEEPING"}
                                                ariaLabel={"Departamento de limpeza"} />

                                            <div className="flex gap-4 items-center max-w-xs">
                                                <Button size="md">
                                                    Configuração de interfaces
                                                </Button>
                                            </div>

                                            <div className="w-full flex flex-col gap-4">

                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <Autocomplete
                                                        label="Selecione uma caracteristica"
                                                        className="max-w-xs"
                                                    >
                                                        {caracteristics.map((caracteristic) => (
                                                            <AutocompleteItem key={caracteristic.characteristicID} value={caracteristic.description}>
                                                                {caracteristic.description}
                                                            </AutocompleteItem>
                                                        ))}
                                                    </Autocomplete>
                                                </div>
                                            </div>
                                        </ModalBody>
                                    </form>
                                    <ModalFooter className="absolute bottom-0 left-0 flex flex-row text-right bg-tableFooter border border-tableFooterBorder w-full text-gray-600 text-xs">
                                        <p>Criado em {`${new Date(criado).toLocaleDateString()} : Teste`}</p>
                                        {criado !== editado && (
                                            <div>
                                                <p>Editado em {`${new Date(editado).toLocaleDateString()} : Teste`}</p>
                                            </div>
                                        )}
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

        </>
    );
};

export default roomForm;