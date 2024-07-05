"use client";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import { AiOutlineGlobal } from "react-icons/ai";
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import knowledgeMethodInsert, { knowledgeMethodEdit } from "@/components/functionsForm/CRUD/cardex/knowledgeMethod/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import { expansion } from "@/components/functionsForm/expansion/page";
import ModalFooterContent from "@/components/modal/modalFooterContent";
import { useTranslations } from "next-intl";

const KnowledgeForm = ({
    idKnowledgeMethod,
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

    const { handleInputKnowledgeMethod, handleSubmitKnowledgeMethod } = knowledgeMethodInsert();
    const { handleUpdateKnowledgeMethod, setValuesKnowledgeMethod, valuesKnowledgeMethod } = knowledgeMethodEdit(idKnowledgeMethod);

    const { toggleExpand, setIsExpanded, isExpanded } = expansion();

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
                                <form onSubmit={handleSubmitKnowledgeMethod}>
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                        {t('cardex.knowledgemethod.new.modalInsertHeader')}
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
                                            label={t("cardex.knowledgemethod.new.labelGroup")}
                                            ariaLabel={t("cardex.knowledgemethod.new.labelGroup")}
                                            onChange={handleInputKnowledgeMethod} />

                                        <div className="flex items-center">
                                            <InputFieldControlled
                                                type={"text"}
                                                id={"abreviature"}
                                                name={"Abreviature"}
                                                label={t("cardex.knowledgemethod.new.labelAbreviature")}
                                                ariaLabel={t("cardex.knowledgemethod.new.labelAbreviature")}
                                                onChange={handleInputKnowledgeMethod} />
                                            <AiOutlineGlobal className="ml-auto text-xl" />
                                        </div>

                                        <InputFieldControlled
                                            type={"text"}
                                            id={"description"}
                                            name={"Description"}
                                            label={t("cardex.knowledgemethod.new.labelDescription")}
                                            ariaLabel={t("cardex.knowledgemethod.new.labelDescription")}
                                            onChange={handleInputKnowledgeMethod} />

                                        <div>
                                            <input
                                                id="link-checkbox"
                                                type="checkbox"
                                                value=""
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label
                                                htmlFor="link-checkbox"
                                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                {t("cardex.knowledgemethod.new.labelEstado")}
                                            </label>
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
                                <form onSubmit={(e) => handleUpdateKnowledgeMethod(e)}>
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
                                            label={t("cardex.knowledgemethod.new.labelGroup")}
                                            ariaLabel={t("cardex.knowledgemethod.new.labelGroup")}
                                            value={valuesKnowledgeMethod.Group}
                                            onChange={(e) => setValuesKnowledgeMethod({ ...valuesKnowledgeMethod, Group: e.target.value })} />

                                        <div className="flex items-center">
                                            <InputFieldControlled
                                                type={"text"}
                                                id={"abreviature"}
                                                name={"Abreviature"}
                                                label={t("cardex.knowledgemethod.new.labelAbreviature")}
                                                ariaLabel={t("cardex.knowledgemethod.new.labelAbreviature")}
                                                value={valuesKnowledgeMethod.Abreviature}
                                                onChange={(e) => setValuesKnowledgeMethod({ ...valuesKnowledgeMethod, Abreviature: e.target.value })} />
                                            <AiOutlineGlobal className="ml-auto text-xl" />
                                        </div>

                                        <InputFieldControlled
                                            type={"text"}
                                            id={"description"}
                                            name={"Description"}
                                            label={t("cardex.knowledgemethod.new.labelDescription")}
                                            ariaLabel={t("cardex.knowledgemethod.new.labelDescription")}
                                            value={valuesKnowledgeMethod.Description}
                                            onChange={(e) => setValuesKnowledgeMethod({ ...valuesKnowledgeMethod, Description: e.target.value })} />

                                        <div>
                                            <input
                                                id="link-checkbox"
                                                type="checkbox"
                                                value=""
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label
                                                htmlFor="link-checkbox"
                                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                {t("cardex.knowledgemethod.new.labelEstado")}
                                            </label>
                                        </div>
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

export default KnowledgeForm;
