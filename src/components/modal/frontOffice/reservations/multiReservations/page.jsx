"use client"
import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Tabs, Tab, Card, CardBody, input } from "@nextui-org/react";
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";


import { expansion } from "@/components/functionsForm/expansion/page";

import CountryAutocomplete from "@/components/functionsForm/autocomplete/country/page";
import LanguageAutocomplete from "@/components/functionsForm/autocomplete/language/page";
import TipologyAutocomplete from "@/components/functionsForm/autocomplete/tipology/page";
//import GenderAutocomplete from "@/components/functionsForm/autocomplete/gender/page";

import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import reservationInsert, { reservationEdit } from "@/components/functionsForm/CRUD/frontOffice/reservations/page";

import SearchModal from "@/components/modal/frontOffice/reservations/searchModal/page";

const reservationsForm = ({
    idReservation,
    idGuest,
    buttonName,
    buttonIcon,
    style,
    modalHeader,
    editIcon,
    modalEditArrow,
    modalEdit,
    formTypeModal,
    buttonColor,
    criado,
    editado,
    editor,

    showModal,
    startDate,
    endDate,
    selectedDates, // Recebendo selectedDates como prop
    disabled,
    
}) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { toggleExpand, setIsExpanded, isExpanded } = expansion();

    //variaveis de estilo para inputs
    const inputStyle = "w-full border-b-2 border-gray-300 px-1 h-8 outline-none my-2 text-sm"

    const { handleInputReservation, handleSubmitReservation, setReservation, reservation, handleClientSelect, handleLanguageSelect, handleTipologySelect } = reservationInsert(startDate, endDate);
    const { handleUpdateReservation, setValuesReserve, valuesReserve, setValuesGuest, valuesGuest } = reservationEdit(idReservation, idGuest);

    console.log(selectedDates);
    return (
        <>

            {formTypeModal === 0 && ( //reservations insert
                <>
                    <Button onPress={onOpen} color={buttonColor} className={`w-fit ${style}`} isDisabled={disabled}>
                        {buttonName} {buttonIcon}
                    </Button>
                    <Modal
                        classNames={{
                            base: "max-h-screen",
                            wrapper: isExpanded ? "w-full h-screen" : "lg:pl-72 h-screen w-full",
                            body: "h-full",
                        }}
                        size="full"
                        className="bg-neutral-100"
                        isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} scrollBehavior="inside" >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <form onSubmit={handleSubmitReservation}>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                            <div className="flex flex-row justify-start gap-4">
                                                {editIcon} {modalHeader} {modalEditArrow} {modalEdit}
                                            </div>
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                <Button color="transparent" variant="light" onClick={() => { onClose(); window.location.reload(); }}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8 overflow-y-auto" style={{ maxHeight: '80vh' }}>
                                            <div className="bg-white flex flex-col py-5 px-5 border boder-neutral-200 rounded-lg">
                     
                                                <div className=" flex flex-row justify-between items-center">
                                                    {/*<ClientFormAutocomplete
                                                        label={"Documento"}
                                                        style={""}
                                                        onChange={(value) => handleClientSelect(value)}
                                                    />*/}
                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"name"}
                                                        name={"Name"}
                                                        label={"Nome"}
                                                        ariaLabel={"Nome"}
                                                        style={"w-80 border-b-2 border-gray-300 px-1 h-10 outline-none"}
                                                        value={reservation.Name}
                                                        onChange={handleInputReservation}
                                                    />

                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"surname"}
                                                        name={"LastName"}
                                                        label={"Apelido"}
                                                        ariaLabel={"Apelido"}
                                                        style={"w-64 border-b-2 border-gray-300 px-1 h-10 outline-none"}
                                                        value={reservation.LastName}
                                                        onChange={handleInputReservation}
                                                    />

                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"salutation"}
                                                        name={"Salutation"}
                                                        label={"Saudação"}
                                                        ariaLabel={"Saudação"}
                                                        style={"w-64 border-b-2 border-gray-300 px-1 h-10 outline-none"}
                                                    />

                                                    <LanguageAutocomplete
                                                        label={"Idioma"}
                                                        style={""}
                                                        onChange={(value) => handleLanguageSelect(value)}
                                                    />
                                                </div>
                                            </div>
                                            {/*primeira linha de comboboxs */}
                                            <div className="flex flex-row justify-between gap-2">
                                                <div className="flex flex-col">
                                                    <Tabs aria-label="Options" >
                                                        {selectedDates.map((dateRange, index) => (
                                                            <Tab key={`client${index}`} title={`Client ${index + 1}`}>
                                                                <div className="flex flex-row justify-between gap-2">
                                                                    <div className="bg-white flex flex-col w-2/4 px-5 py-5 border border-neutral-200">
                                                                        <div className="">
                                                                            <h4 className="pb-5 text-black-100"><b>Stay Details</b></h4>
                                                                        </div>
                                                                        <div className="flex flex-row">
                                                                            <InputFieldControlled
                                                                                type={"date"}
                                                                                id={"arrival"}
                                                                                name={"CheckIn"}
                                                                                label={"Arrival:"}
                                                                                ariaLabel={"Arrival:"}
                                                                                style={inputStyle}
                                                                                value={dateRange.start}
                                                                                onChange={handleInputReservation}
                                                                            />

                                                                            <InputFieldControlled
                                                                                type={"date"}
                                                                                id={"optional"}
                                                                                name={"Optional"}
                                                                                label={"Optional:"}
                                                                                ariaLabel={"Optional:"}
                                                                                style={inputStyle}
                                                                            />

                                                                        </div>

                                                                        <div className="flex flex-row gap-5">
                                                                            <InputFieldControlled
                                                                                type={"text"}
                                                                                id={"nights"}
                                                                                name={"NightCount"}
                                                                                label={"Nights"}
                                                                                ariaLabel={"Nights"}
                                                                                style={inputStyle}
                                                                                value={reservation.NightCount}
                                                                                onChange={handleInputReservation}
                                                                            />

                                                                            <InputFieldControlled
                                                                                type={"text"}
                                                                                id={"guestsperRoom"}
                                                                                name={"GuestNumber"}
                                                                                label={"Guests per Room"}
                                                                                ariaLabel={"Guests per Room"}
                                                                                style={inputStyle}
                                                                                value={reservation.GuestNumber}
                                                                                onChange={handleInputReservation}
                                                                            />

                                                                        </div>

                                                                        <InputFieldControlled
                                                                            type={"date"}
                                                                            id={"departure"}
                                                                            name={"CheckOut"}
                                                                            label={"Departure:"}
                                                                            ariaLabel={"Departure:"}
                                                                            style={inputStyle}
                                                                            value={dateRange.end}
                                                                            onChange={handleInputReservation}
                                                                        />

                                                                        <CountryAutocomplete label="Payment" style={"flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 h-10 my-2"} />
                                                                    </div>
                                                                    <div className="bg-white flex flex-col w-2/4 px-5 py-5 border border-neutral-200">
                                                                        <div className="flex justify-between items-center">
                                                                            <h4 className="pb-5 text-black-100"><b>Room Details</b></h4>
                                                                        </div>
                                                                        <InputFieldControlled
                                                                            type={"text"}
                                                                            id={"room"}
                                                                            name={"Room"}
                                                                            label={"Room"}
                                                                            ariaLabel={"Room"}
                                                                            style={inputStyle}
                                                                            onChange={handleInputReservation}
                                                                        />

                                                                        {/*<TipologyAutocomplete
                                                                            label="Room Type"
                                                                            style={"flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-5 gap-4 h-10 my-2"}
                                                                            onChange={(value) => handleTipologySelect(value)}
                                                        />*/}

                                                                        <InputFieldControlled 
                                                                        type={"text"}
                                                                        id={""}
                                                                        name={"Tipologia"}
                                                                        label={"Tipologia"}
                                                                        ariaLabel={"Tipologia"}
                                                                        style={inputStyle}
                                                                        value={dateRange.tipologyName}
                                                                        />

                                                                        <InputFieldControlled
                                                                            type={"text"}
                                                                            id={"roomtoCharge"}
                                                                            name={"Room to Charge"}
                                                                            label={"Room to Charge"}
                                                                            ariaLabel={"Room to Charge"}
                                                                            style={inputStyle}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </Tab>
                                                            ))}
                                                    </Tabs>
                                                    <div className="bg-white flex flex-col w-1/4 px-5 py-5 border border-neutral-200">
                                                        <div className="">
                                                            <h4 className="pb-5 text-black-100"><b>Rate Details</b></h4>
                                                        </div>
                                                        <CountryAutocomplete label="Rate Code" style={"flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-5 gap-4 h-10 my-2"} />
                                                        <div className="flex flex-row gap-5">
                                                            <InputFieldControlled
                                                                type={"text"}
                                                                id={"avgRate"}
                                                                name={"Avg. Rate"}
                                                                label={"Avg. Rate"}
                                                                ariaLabel={"Avg. Rate"}
                                                                style={inputStyle}
                                                            />

                                                            <InputFieldControlled
                                                                type={"text"}
                                                                id={"totalRate"}
                                                                name={"Total Rate"}
                                                                label={"Total Rate"}
                                                                ariaLabel={"Total Rate"}
                                                                style={inputStyle}
                                                            />


                                                        </div>

                                                        <InputFieldControlled
                                                            type={"text"}
                                                            id={"packages"}
                                                            name={"Packages"}
                                                            label={"Packages"}
                                                            ariaLabel={"Packages"}
                                                            style={inputStyle}
                                                        />

                                                        <InputFieldControlled
                                                            type={"text"}
                                                            id={"allotment"}
                                                            name={"Allotment"}
                                                            label={"Allotment"}
                                                            ariaLabel={"Allotment"}
                                                            style={inputStyle}
                                                        />
                                                    </div>
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

        </>
    );
};

export default reservationsForm;