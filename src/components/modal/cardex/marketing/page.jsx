"use client";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import { AiOutlineGlobal } from "react-icons/ai";
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import marketingInsert, { marketingEdit } from "@/components/functionsForm/CRUD/cardex/marketing/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import { expansion } from "@/components/functionsForm/expansion/page";
import ModalFooterContent from "@/components/modal/modalFooterContent";
import { useTranslations } from "next-intl";

const MarketingForm = ({
    idMarketing,
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

    const { handleInputMarketing, handleSubmitMarketing } = marketingInsert();
    const { handleUpdateMarketing, setValuesMarketing, valuesMarketing } = marketingEdit(idMarketing);

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
                        size="xl"
                    >
                        <ModalContent>
                            {(onClose) => (
                                <form onSubmit={handleSubmitMarketing}>
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                        {t('cardex.marketing.new.modalInsertHeader')}
                                        <div className='flex flex-row items-center'>
                                            <Button color="transparent" onClick={() => { onClose(); window.location.reload(); }} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                            <Button color="transparent" variant="light" onClick={() => { onClose(); window.location.reload(); }}><MdClose size={30} /></Button>
                                        </div>
                                    </ModalHeader>
                                    <ModalBody className="flex flex-col mx-5 my-5 space-y-8">

                                        <InputFieldControlled
                                            type={"text"}
                                            id={"group"}
                                            name={"Group"}
                                            label={t("cardex.marketing.new.labelGroup")}
                                            ariaLabel={t("cardex.marketing.new.labelGroup")} />

                                        <div className="flex items-center">
                                            <InputFieldControlled
                                                type={"text"}
                                                id={"abreviature"}
                                                name={"Abreviature"}
                                                label={t("cardex.marketing.new.labelAbreviature")}
                                                ariaLabel={t("cardex.marketing.new.labelAbreviature")}
                                                onChange={handleInputMarketing} />
                                            <AiOutlineGlobal className="ml-auto text-xl" />
                                        </div>

                                        <InputFieldControlled
                                            type={"text"}
                                            id={"description"}
                                            name={"Description"}
                                            label={t("cardex.marketing.new.labelDescription")}
                                            ariaLabel={t("cardex.marketing.new.labelDescription")}
                                            onChange={handleInputMarketing} />

                                        <div>
                                            <input
                                                id="link-checkbox"
                                                type="checkbox"
                                                value=""
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label
                                                htmlFor="link-checkbox"
                                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                {t("cardex.marketing.new.labelStatus")}
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
                        size="xl"
                    >
                        <ModalContent>
                            {(onClose) => (
                                <form onSubmit={(e) => handleUpdateMarketing(e)}>
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                        <div className="flex flex-row justify-start gap-4">
                                            {editIcon} {t('cardex.marketing.new.modalEditHeader')} {modalEditArrow} {modalEdit}
                                        </div>
                                        <div className='flex flex-row items-center'>
                                            <Button color="transparent" onClick={() => { onClose(); window.location.reload(); }} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                            <Button color="transparent" variant="light" onClick={() => { onClose(); window.location.reload(); }}><MdClose size={30} /></Button>
                                        </div>
                                    </ModalHeader>
                                    <ModalBody className="flex flex-col mx-5 my-5 space-y-8">

                                        <InputFieldControlled
                                            type={"text"}
                                            id={"group"}
                                            name={"Group"}
                                            label={t("cardex.marketing.new.labelGroup")}
                                            ariaLabel={t("cardex.marketing.new.labelGroup")} />

                                        <div className="flex items-center">
                                            <InputFieldControlled
                                                type={"text"}
                                                id={"abreviature"}
                                                name={"Abreviature"}
                                                label={t("cardex.marketing.new.labelAbreviature")}
                                                ariaLabel={t("cardex.marketing.new.labelAbreviature")}
                                                value={valuesMarketing.Abreviature}
                                                onChange={e => setValuesMarketing({ ...valuesMarketing, Abreviature: e.target.value })} />
                                            <AiOutlineGlobal className="ml-auto text-xl" />
                                        </div>

                                        <InputFieldControlled
                                            type={"text"}
                                            id={"description"}
                                            name={"Description"}
                                            label={t("cardex.marketing.new.labelDescription")}
                                            ariaLabel={t("cardex.marketing.new.labelDescription")}
                                            value={valuesMarketing.Description}
                                            onChange={e => setValuesMarketing({ ...valuesMarketing, Description: e.target.value })} />

                                        <div>
                                            <input
                                                id="link-checkbox"
                                                type="checkbox"
                                                value=""
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label
                                                htmlFor="link-checkbox"
                                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                {t("cardex.marketing.new.labelStatus")}
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

export default MarketingForm;
