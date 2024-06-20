"use client";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import professionInsert, { professionEdit } from "@/components/functionsForm/CRUD/cardex/profession/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import { expansion } from "@/components/functionsForm/expansion/page";
import ModalFooterContent from "@/components/modal/modalFooterContent";
import { useTranslations } from "next-intl";

const ProfessionForm = ({
    idProfession,
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
    const t = useTranslations('Index'); // Fetch translations
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { handleInputProfession, handleSubmitProfession } = professionInsert();
    const { handleUpdateProfession, setValuesProffesion, valuesProfession } = professionEdit(idProfession);

    const { toggleExpand, setIsExpanded, isExpanded } = expansion();

    return (
        <>
            {formTypeModal === 11 && (
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
                        isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true}>
                        <ModalContent>
                            {(onClose) => (
                                <form onSubmit={handleSubmitProfession}>
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                        {t('cardex.profession.new.modalInsertHeader')}
                                        <div className='flex flex-row items-center mr-5'>
                                            <Button color="transparent" onClick={() => { onClose(); window.location.reload(); }} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                            <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                            <Button color="transparent" variant="light" onClick={() => { onClose(); window.location.reload(); }}><MdClose size={30} /></Button>
                                        </div>
                                    </ModalHeader>
                                    <ModalBody className="flex flex-col mx-5 my-5 space-y-8">

                                        <InputFieldControlled
                                            type={"text"}
                                            id={"group"}
                                            name={"Group"}
                                            label={t("cardex.profession.new.labelGroup")}
                                            ariaLabel={t("cardex.profession.new.labelGroup")}
                                            onChange={handleInputProfession} />

                                        <InputFieldControlled
                                            type={"text"}
                                            id={"abreviature"}
                                            name={"Abreviature"}
                                            label={t("cardex.profession.new.labelAbreviature")}
                                            ariaLabel={t("cardex.profession.new.labelAbreviature")}
                                            onChange={handleInputProfession} />

                                        <InputFieldControlled
                                            type={"text"}
                                            id={"description"}
                                            name={"Description"}
                                            label={t("cardex.profession.new.labelDescription")}
                                            ariaLabel={t("cardex.profession.new.labelDescription")}
                                            onChange={handleInputProfession} />

                                    </ModalBody>
                                </form>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 12 && (
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
                                <form onSubmit={(e) => handleUpdateProfession(e)}>
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                        <div className="flex flex-row justify-start gap-4">
                                            {editIcon} {modalHeader} {modalEditArrow} {modalEdit}
                                        </div>
                                        <div className='flex flex-row items-center mr-5'>
                                            <Button color="transparent" onClick={() => { onClose(); window.location.reload(); }} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                            <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                            <Button color="transparent" variant="light" onClick={() => { onClose(); window.location.reload(); }}><MdClose size={30} /></Button>
                                        </div>
                                    </ModalHeader>
                                    <ModalBody className="flex flex-col mx-5 my-5 space-y-8">

                                        <InputFieldControlled
                                            type={"text"}
                                            id={"group"}
                                            name={"Group"}
                                            label={t("cardex.profession.new.labelGroup")}
                                            ariaLabel={t("cardex.profession.new.labelGroup")}
                                            value={valuesProfession.Group}
                                            onChange={(e) => setValuesProffesion({ ...valuesProfession, Group: e.target.value })} />

                                        <InputFieldControlled
                                            type={"text"}
                                            id={"abreviature"}
                                            name={"Abreviature"}
                                            label={t("cardex.profession.new.labelAbreviature")}
                                            ariaLabel={t("cardex.profession.new.labelAbreviature")}
                                            value={valuesProfession.Abreviature}
                                            onChange={(e) => setValuesProffesion({ ...valuesProfession, Abreviature: e.target.value })} />

                                        <InputFieldControlled
                                            type={"text"}
                                            id={"description"}
                                            name={"Description"}
                                            label={t("cardex.profession.new.labelDescription")}
                                            ariaLabel={t("cardex.profession.new.labelDescription")}
                                            value={valuesProfession.Description}
                                            onChange={(e) => setValuesProffesion({ ...valuesProfession, Description: e.target.value })} />

                                    </ModalBody>
                                    <ModalFooterContent criado={criado} editado={editado} />
                                </form>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}
        </>
    );
};

export default ProfessionForm;
