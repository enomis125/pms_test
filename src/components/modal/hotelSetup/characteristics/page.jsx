"use client"
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { usePathname } from "next/navigation";
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import characteristicsInsert, { characteristicsEdit } from "@/components/functionsForm/CRUD/hotel/characteristics/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page"
import ModalFooterContent from "@/components/modal/modalFooterContent";


import { expansion } from "@/components/functionsForm/expansion/page";

import {useTranslations} from 'next-intl';

const characteristicForm = ({
    idCarateristics,
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
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const { handleInput, handleSubmit } = characteristicsInsert();
    const { handleUpdate, setValues, values } = characteristicsEdit(idCarateristics);
    const { toggleExpand, setIsExpanded, isExpanded } = expansion();

    const t = useTranslations('Index');

    return (
        <>

            {formTypeModal === 11 && ( //characteristics insert
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
                        size="lg"
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <form onSubmit={handleSubmit}>
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
                                                id={"abreviature"}
                                                name={"Abreviature"}
                                                label={t("hotel.characteristics.shortnameLabel")}
                                                ariaLabel={"Short Name"}
                                                style={"w-full outline-none h-10"}
                                                onChange={handleInput} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"description"}
                                                name={"Description"}
                                                label={t("hotel.characteristics.descriptionLabel")}
                                                ariaLabel={"Description"}
                                                style={"w-full outline-none h-10"}
                                                onChange={handleInput} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"details"}
                                                name={"Details"}
                                                label={t("hotel.characteristics.detailsLabel")}
                                                ariaLabel={"Details"}
                                                style={"w-full outline-none h-10"}
                                                onChange={handleInput} />

                                        </ModalBody>
                                    </form>

                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 12 && ( //characteristics edit
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
                                    <form onSubmit={(e) => handleUpdateMaintenance(e)}>
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                            <div className="flex flex-row justify-start gap-4">
                                                {editIcon} {modalHeader} {modalEditArrow} {modalEdit}
                                            </div>
                                            <div className='flex flex-row items-center'>
                                                <Button color="transparent" onClick={() => { onClose(); window.location.reload(); }} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" variant="light" onClick={() => { onClose(); window.location.reload(); }}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"abreviature"}
                                                name={"Abreviature"}
                                                label={t("hotel.characteristics.shortnameLabel")}
                                                ariaLabel={"Short Name"}
                                                style={"w-full outline-none h-10"}
                                                value={values.Description}
                                                onChange={e => setValues({ ...values, Description: e.target.value })} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"description"}
                                                name={"Description"}
                                                label={t("hotel.characteristics.descriptionLabel")}
                                                ariaLabel={"Description"}
                                                style={"w-full outline-none h-10"}
                                                value={values.Abreviature}
                                                onChange={e => setValues({ ...values, Abreviature: e.target.value })} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"details"}
                                                name={"Details"}
                                                label={t("hotel.characteristics.detailsLabel")}
                                                ariaLabel={"Details"}
                                                style={"w-full outline-none h-10"}
                                                value={values.Details}
                                                onChange={e => setValues({ ...values, Details: e.target.value })} />

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

export default characteristicForm;