"use client"
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import tipologysInsert, { tipologysEdit } from "@/components/functionsForm/CRUD/hotel/tipology/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import { expansion } from "@/components/functionsForm/expansion/page";
import ModalFooterContent from "@/components/modal/modalFooterContent";
import TipologyGroupAutocomplete from "@/components/functionsForm/autocomplete/tipologyGroup/page";

import {useTranslations} from 'next-intl'


const tipologyForm = ({
    idRoomtype,
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

    const { handleInputRoomtype, handleSubmitRoomtype, handleSelect } = tipologysInsert();
    const { handleUpdateRoomtype, setValuesRoomtype, valuesRoomtype } = tipologysEdit(idRoomtype);
    const { toggleExpand, setIsExpanded, isExpanded } = expansion();

    const t = useTranslations('Index');

    return (
        <>

            {formTypeModal === 11 && ( //tipology insert
                <>
                    <Button onPress={onOpen} color={buttonColor} className="w-fit">
                        {buttonName} {buttonIcon}
                    </Button>
                    <Modal
                        isOpen={isOpen}
                        hideCloseButton={true}
                        onOpenChange={onOpenChange}
                        isDismissable={false}
                        isKeyboardDismissDisabled={true}
                        className="z-50"
                        size="xl"
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <form onSubmit={handleSubmitRoomtype}>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                            {modalHeader}
                                            <div className='flex flex-row items-center'>
                                                <Button color="transparent" onClick={() => { onClose(); window.location.reload(); }} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" variant="light" onClick={() => { onClose(); window.location.reload(); }}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"description"}
                                                name={"Desc"}
                                                label={t("hotel.tipologies.descriptionLabel")}
                                                ariaLabel={"Description"}
                                                style={"w-full outline-none h-10"}
                                                onChange={handleInputRoomtype} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"abreviature"}
                                                name={"Name"}
                                                label={t("hotel.tipologies.shortnameLabel")}
                                                ariaLabel={"Short Name"}
                                                style={"w-full outline-none h-10"}
                                                onChange={handleInputRoomtype} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"details"}
                                                name={"RoomFeaturesDesc"}
                                                label={t("hotel.tipologies.detailsLabel")}
                                                ariaLabel={"Details"}
                                                style={"w-full outline-none h-10"}
                                                onChange={handleInputRoomtype} />

                                            <TipologyGroupAutocomplete
                                                label={t("hotel.tipologies.tipologyGroupLabel")}
                                                style={""}
                                                onChange={(value) => handleSelect(value)}
                                            />

                                            {/*<div className="w-full flex flex-col gap-4 mb-4">
                                                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                        <Autocomplete
                                                            variant="underlined"
                                                            defaultItems={Tipologia}
                                                            label=" Grupo Tipologia"
                                                            className="w-full"
                                                        >
                                                            {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                        </Autocomplete>
                                                    </div>
                                                </div>
                                                <div className="w-full flex flex-col gap-4 mb-4">
                                                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                        <Autocomplete
                                                            variant="underlined"
                                                            defaultItems={Caracteristicas}
                                                            label="Função"
                                                            className="w-full"
                                                        >
                                                            {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                        </Autocomplete>
                                                    </div>
                            </div>*/}
                                        </ModalBody>
                                    </form>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 12 && ( //tipology edit
                <>
                     <Button fullWidth={true} size="md" onPress={onOpen} color={buttonColor} className="-h-3 flex justify-start -p-3">
                        {buttonName} {buttonIcon}
                    </Button>
                    <Modal
                        isOpen={isOpen}
                        hideCloseButton={true}
                        onOpenChange={onOpenChange}
                        isDismissable={false}
                        isKeyboardDismissDisabled={true}
                        className="z-50"
                        size="xl"
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <form onSubmit={(e) => handleUpdateRoomtype(e)}>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                            <div className="flex flex-row justify-start gap-4">
                                                {editIcon} {modalHeader} {modalEditArrow} {modalEdit}
                                            </div>
                                            <div className='flex flex-row items-center'>
                                                <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"description"}
                                                name={"Desc"}
                                                label={t("hotel.tipologies.descriptionLabel")}
                                                ariaLabel={"Description"}
                                                style={"w-full outline-none h-10"}
                                                value={valuesRoomtype.Desc}
                                                onChange={e => setValuesRoomtype({ ...valuesRoomtype, Desc: e.target.value })} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"abreviature"}
                                                name={"Name"}
                                                label={t("hotel.tipologies.shortnameLabel")}
                                                ariaLabel={"Short Name"}
                                                style={"w-full outline-none h-10"}
                                                value={valuesRoomtype.Name}
                                                onChange={e => setValuesRoomtype({ ...valuesRoomtype, Name: e.target.value })} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"details"}
                                                name={"RoomFeaturesDesc"}
                                                label={t("hotel.tipologies.detailsLabel")}
                                                ariaLabel={"Details"}
                                                style={"w-full outline-none h-10"}
                                                value={valuesRoomtype.RoomFeaturesDesc}
                                                onChange={e => setValuesRoomtype({ ...valuesRoomtype, RoomFeaturesDesc: e.target.value })} />


                                            {/*<div className="w-full flex flex-col gap-4 mb-4">
                                                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                        <Autocomplete
                                                            variant="underlined"
                                                            defaultItems={Tipologia}
                                                            label=" Grupo Tipologia"
                                                            className="w-full"
                                                            value={valuesRoomtype.GroupID} onChange={e => setValuesRoomtype({ ...valuesRoomtype, GroupID: e.target.value })}
                                                        >
                                                            {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                        </Autocomplete>
                                                    </div>
                                                </div>
                                                <div className="w-full flex flex-col gap-4 mb-4">
                                                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                        <Autocomplete
                                                            variant="underlined"
                                                            defaultItems={Caracteristicas}
                                                            label="Função"
                                                            className="w-full"
                                                            value={valuesRoomtype.RoomTypePlan} onChange={e => setValuesRoomtype({ ...valuesRoomtype, RoomTypePlan: e.target.value })}
                                                        >
                                                            {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                        </Autocomplete>
                                                    </div>
                            </div>*/}
                                        </ModalBody>
                                    </form>
                                    <ModalFooterContent criado={criado} editado={editado} />
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}
        </>
    );
};

export default tipologyForm;