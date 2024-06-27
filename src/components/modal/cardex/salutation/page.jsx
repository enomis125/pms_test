"use client";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import { AiOutlineGlobal } from "react-icons/ai";
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import salutationInsert, { salutationEdit } from "@/components/functionsForm/CRUD/cardex/salutation/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import { expansion } from "@/components/functionsForm/expansion/page";
import ModalFooterContent from "@/components/modal/modalFooterContent";
import { useTranslations } from "next-intl";

const SalutationForm = ({
    idSalutation,
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

    const { handleInputSalutation, handleSubmitSalutation } = salutationInsert();
    const { handleUpdateSalutation, setValuesSalutation, valuesSalutation } = salutationEdit(idSalutation);

    const { toggleExpand } = expansion();

    return (
        <>
            {formTypeModal === 11 && (
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
                    >
                        <ModalContent>
                            {(onClose) => (
                                <form onSubmit={handleSubmitSalutation}>
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                        {t('cardex.salutations.new.modalInsertHeader')}
                                        <div className='flex flex-row items-center mr-5'>
                                            <Button color="transparent" onClick={() => { onClose(); window.location.reload(); }} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                            <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                            <Button color="transparent" variant="light" onClick={() => { onClose(); window.location.reload(); }}><MdClose size={30} /></Button>
                                        </div>
                                    </ModalHeader>
                                    <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                        <div className="flex items-center">
                                            <InputFieldControlled
                                                type={"text"}
                                                id={"abreviature"}
                                                name={"Abreviature"}
                                                label={t("cardex.salutations.new.labelAbreviature")}
                                                ariaLabel={t("cardex.salutations.new.labelAbreviature")}
                                                onChange={handleInputSalutation} />
                                            <AiOutlineGlobal className="ml-auto text-xl" />
                                        </div>
                                        <InputFieldControlled
                                            type={"text"}
                                            id={"description"}
                                            name={"Description"}
                                            label={t("cardex.salutations.new.labelDescription")}
                                            ariaLabel={t("cardex.salutations.new.labelDescription")}
                                            onChange={handleInputSalutation} />
                                        <InputFieldControlled
                                            type={"text"}
                                            id={"treat"}
                                            name={"Treat"}
                                            label={t("cardex.salutations.new.labelTreat")}
                                            ariaLabel={t("cardex.salutations.new.labelTreat")}
                                            onChange={handleInputSalutation} />
                                        <InputFieldControlled
                                            type={"text"}
                                            id={"gender"}
                                            name={"Gender"}
                                            label={t("cardex.salutations.new.labelGender")}
                                            ariaLabel={t("cardex.salutations.new.labelGender")}
                                            onChange={handleInputSalutation} />
                                        <InputFieldControlled
                                            type={"text"}
                                            id={"title"}
                                            name={"Title"}
                                            label={t("cardex.salutations.new.labelTitle")}
                                            ariaLabel={t("cardex.salutations.new.labelTitle")}
                                            onChange={handleInputSalutation} />
                                        <InputFieldControlled
                                            type={"text"}
                                            id={"ordenation"}
                                            name={"Ordenation"}
                                            label={t("cardex.salutations.new.labelOrdenation")}
                                            ariaLabel={t("cardex.salutations.new.labelOrdenation")}
                                            onChange={handleInputSalutation} />
                                        <InputFieldControlled
                                            type={"text"}
                                            id={"nameSuff"}
                                            name={"NameSuff"}
                                            label={t("cardex.salutations.new.labelNameSuff")}
                                            ariaLabel={t("cardex.salutations.new.labelNameSuff")}
                                            onChange={handleInputSalutation} />
                                        <div className="flex flex-row justify-left items-center">
                                            <label>{t("cardex.salutations.new.labelType")}</label>
                                            <div className="flex flex-row justify-center items-center">
                                                <label>{t("cardex.salutations.new.radioName")}</label>
                                                <input type="radio" name="type" value="name" onChange={handleInputSalutation} />
                                            </div>
                                            <div className="flex flex-row justify-center items-center">
                                                <label>{t("cardex.salutations.new.radioFirstName")}</label>
                                                <input type="radio" name="type" value="firstName" onChange={handleInputSalutation} />
                                            </div>
                                            <div className="flex flex-row justify-center items-center">
                                                <label>{t("cardex.salutations.new.radioNoExt")}</label>
                                                <input type="radio" name="type" value="noExt" onChange={handleInputSalutation} />
                                            </div>
                                        </div>
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
                        isOpen={isOpen}
                        hideCloseButton={true}
                        onOpenChange={onOpenChange}
                        isDismissable={false}
                        isKeyboardDismissDisabled={true}
                        className="z-50"
                    >
                        <ModalContent>
                            {(onClose) => (
                                <form onSubmit={(e) => handleUpdateSalutation(e)}>
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                        <div className="flex flex-row justify-start gap-4">
                                            {editIcon} {t('cardex.salutations.new.modalEditHeader')} {modalEditArrow} {modalEdit}
                                        </div>
                                        <div className='flex flex-row items-center mr-5'>
                                            <Button color="transparent" onClick={() => { onClose(); window.location.reload(); }} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                            <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                            <Button color="transparent" variant="light" onClick={() => { onClose(); window.location.reload(); }}><MdClose size={30} /></Button>
                                        </div>
                                    </ModalHeader>
                                    <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                        <div className="flex items-center">
                                            <InputFieldControlled
                                                type={"text"}
                                                id={"abreviature"}
                                                name={"Abreviature"}
                                                label={t("cardex.salutations.new.labelAbreviature")}
                                                ariaLabel={t("cardex.salutations.new.labelAbreviature")}
                                                value={valuesSalutation.Abreviature}
                                                onChange={e => setValuesSalutation({ ...valuesSalutation, Abreviature: e.target.value })} />
                                            <AiOutlineGlobal className="ml-auto text-xl" />
                                        </div>
                                        <InputFieldControlled
                                            type={"text"}
                                            id={"description"}
                                            name={"Description"}
                                            label={t("cardex.salutations.new.labelDescription")}
                                            ariaLabel={t("cardex.salutations.new.labelDescription")}
                                            value={valuesSalutation.Description}
                                            onChange={e => setValuesSalutation({ ...valuesSalutation, Description: e.target.value })} />
                                        <InputFieldControlled
                                            type={"text"}
                                            id={"treat"}
                                            name={"Treat"}
                                            label={t("cardex.salutations.new.labelTreat")}
                                            ariaLabel={t("cardex.salutations.new.labelTreat")}
                                            value={valuesSalutation.Treat}
                                            onChange={e => setValuesSalutation({ ...valuesSalutation, Treat: e.target.value })} />
                                        <InputFieldControlled
                                            type={"text"}
                                            id={"gender"}
                                            name={"Gender"}
                                            label={t("cardex.salutations.new.labelGender")}
                                            ariaLabel={t("cardex.salutations.new.labelGender")}
                                            value={valuesSalutation.Gender}
                                            onChange={e => setValuesSalutation({ ...valuesSalutation, Gender: e.target.value })} />
                                        <InputFieldControlled
                                            type={"text"}
                                            id={"title"}
                                            name={"Title"}
                                            label={t("cardex.salutations.new.labelTitle")}
                                            ariaLabel={t("cardex.salutations.new.labelTitle")}
                                            value={valuesSalutation.Title}
                                            onChange={e => setValuesSalutation({ ...valuesSalutation, Title: e.target.value })} />
                                        <InputFieldControlled
                                            type={"text"}
                                            id={"ordenation"}
                                            name={"Ordenation"}
                                            label={t("cardex.salutations.new.labelOrdenation")}
                                            ariaLabel={t("cardex.salutations.new.labelOrdenation")}
                                            value={valuesSalutation.Ordenation}
                                            onChange={e => setValuesSalutation({ ...valuesSalutation, Ordenation: e.target.value })} />
                                        <InputFieldControlled
                                            type={"text"}
                                            id={"nameSuff"}
                                            name={"NameSuff"}
                                            label={t("cardex.salutations.new.labelNameSuff")}
                                            ariaLabel={t("cardex.salutations.new.labelNameSuff")}
                                            value={valuesSalutation.NameSuff}
                                            onChange={e => setValuesSalutation({ ...valuesSalutation, NameSuff: e.target.value })} />
                                        <div className="flex flex-row justify-left items-center">
                                            <label>{t("cardex.salutations.new.labelType")}</label>
                                            <div className="flex flex-row justify-center items-center">
                                                <label>{t("cardex.salutations.new.radioName")}</label>
                                                <input type="radio" name="type" value="name" onChange={handleUpdateSalutation} />
                                            </div>
                                            <div className="flex flex-row justify-center items-center">
                                                <label>{t("cardex.salutations.new.radioFirstName")}</label>
                                                <input type="radio" name="type" value="firstName" onChange={handleUpdateSalutation} />
                                            </div>
                                            <div className="flex flex-row justify-center items-center">
                                                <label>{t("cardex.salutations.new.radioNoExt")}</label>
                                                <input type="radio" name="type" value="noExt" onChange={handleUpdateSalutation} />
                                            </div>
                                        </div>
                                    </ModalBody>
                                </form>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}
        </>
    );
};

export default SalutationForm;
