"use client";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import { AiOutlineGlobal } from "react-icons/ai";
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import nationalityInsert, { nationalityEdit } from "@/components/functionsForm/CRUD/cardex/nationality/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import { expansion } from "@/components/functionsForm/expansion/page";
import ModalFooterContent from "@/components/modal/modalFooterContent";
import { useTranslations } from "next-intl";

const NationalityForm = ({
    idNationality,
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

    const { handleInputNacionality, handleSubmitNacionality } = nationalityInsert();
    const { handleUpdateNationality, setValuesNationality, valuesNationality } = nationalityEdit(idNationality);

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
                        size="xl"
                    >
                        <ModalContent>
                            {(onClose) => (
                                <form onSubmit={handleSubmitNacionality}>
                                   <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                        {t('cardex.nationalities.new.modalInsertHeader')}
                                        <div className='flex flex-row items-center'>
                                            <Button color="transparent" onClick={() => { onClose(); window.location.reload(); }} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                            <Button color="transparent" variant="light" onClick={() => { onClose(); window.location.reload(); }}><MdClose size={30} /></Button>
                                        </div>
                                    </ModalHeader>
                                    <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                        <div className="flex items-center">
                                            <InputFieldControlled
                                                type={"text"}
                                                id={"Fo"}
                                                name={"Fo"}
                                                label={t("cardex.nationalities.new.labelFo")}
                                                ariaLabel={t("cardex.nationalities.new.labelFo")}
                                                onChange={handleInputNacionality} />
                                            <AiOutlineGlobal className="ml-auto text-xl" />
                                        </div>
                                        <InputFieldControlled
                                            type={"text"}
                                            id={"nation"}
                                            name={"Nation"}
                                            label={t("cardex.nationalities.new.labelNation")}
                                            ariaLabel={t("cardex.nationalities.new.labelNation")}
                                            onChange={handleInputNacionality} />
                                        <InputFieldControlled
                                            type={"text"}
                                            id={"nationality"}
                                            name={"Nationality"}
                                            label={t("cardex.nationalities.new.labelNationality")}
                                            ariaLabel={t("cardex.nationalities.new.labelNationality")}
                                            onChange={handleInputNacionality} />
                                        <InputFieldControlled
                                            type={"text"}
                                            id={"statnr"}
                                            name={"Statnr"}
                                            label={t("cardex.nationalities.new.labelStatnr")}
                                            ariaLabel={t("cardex.nationalities.new.labelStatnr")}
                                            onChange={handleInputNacionality} />
                                        <InputFieldControlled
                                            type={"text"}
                                            id={"group"}
                                            name={"Group"}
                                            label={t("cardex.nationalities.new.labelGroup")}
                                            ariaLabel={t("cardex.nationalities.new.labelGroup")}
                                            onChange={handleInputNacionality} />
                                        <InputFieldControlled
                                            type={"text"}
                                            id={"ordenation"}
                                            name={"Ordenation"}
                                            label={t("cardex.nationalities.new.labelOrdenation")}
                                            ariaLabel={t("cardex.nationalities.new.labelOrdenation")}
                                            onChange={handleInputNacionality} />
                                        <InputFieldControlled
                                            type={"text"}
                                            id={"isocode"}
                                            name={"Isocode"}
                                            label={t("cardex.nationalities.new.labelIsocode")}
                                            ariaLabel={t("cardex.nationalities.new.labelIsocode")}
                                            onChange={handleInputNacionality} />
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
                                <form onSubmit={(e) => handleUpdateNationality(e)}>
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                        {t('cardex.nationalities.new.modalEditHeader')}
                                        <div className='flex flex-row items-center'>
                                            <Button color="transparent" onClick={() => { onClose(); window.location.reload(); }} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                            <Button color="transparent" variant="light" onClick={() => { onClose(); window.location.reload(); }}><MdClose size={30} /></Button>
                                        </div>
                                    </ModalHeader>
                                    <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                        <div className="flex items-center">
                                            <InputFieldControlled
                                                type={"text"}
                                                id={"Fo"}
                                                name={"Fo"}
                                                label={t("cardex.nationalities.new.labelFo")}
                                                ariaLabel={t("cardex.nationalities.new.labelFo")}
                                                value={valuesNationality.Fo}
                                                onChange={e => setValuesNationality({ ...valuesNationality, Fo: e.target.value })} />
                                            <AiOutlineGlobal className="ml-auto text-xl" />
                                        </div>
                                        <InputFieldControlled
                                            type={"text"}
                                            id={"nation"}
                                            name={"Nation"}
                                            label={t("cardex.nationalities.new.labelNation")}
                                            ariaLabel={t("cardex.nationalities.new.labelNation")}
                                            value={valuesNationality.Nation}
                                            onChange={e => setValuesNationality({ ...valuesNationality, Nation: e.target.value })} />
                                        <InputFieldControlled
                                            type={"text"}
                                            id={"nationality"}
                                            name={"Nationality"}
                                            label={t("cardex.nationalities.new.labelNationality")}
                                            ariaLabel={t("cardex.nationalities.new.labelNationality")}
                                            value={valuesNationality.Nationality}
                                            onChange={e => setValuesNationality({ ...valuesNationality, Nationality: e.target.value })} />
                                        <InputFieldControlled
                                            type={"text"}
                                            id={"statnr"}
                                            name={"Statnr"}
                                            label={t("cardex.nationalities.new.labelStatnr")}
                                            ariaLabel={t("cardex.nationalities.new.labelStatnr")}
                                            value={valuesNationality.Statnr}
                                            onChange={e => setValuesNationality({ ...valuesNationality, Statnr: e.target.value })} />
                                        <InputFieldControlled
                                            type={"text"}
                                            id={"group"}
                                            name={"Group"}
                                            label={t("cardex.nationalities.new.labelGroup")}
                                            ariaLabel={t("cardex.nationalities.new.labelGroup")}
                                            value={valuesNationality.Group}
                                            onChange={e => setValuesNationality({ ...valuesNationality, Group: e.target.value })} />
                                        <InputFieldControlled
                                            type={"text"}
                                            id={"ordenation"}
                                            name={"Ordenation"}
                                            label={t("cardex.nationalities.new.labelOrdenation")}
                                            ariaLabel={t("cardex.nationalities.new.labelOrdenation")}
                                            value={valuesNationality.Ordenation}
                                            onChange={e => setValuesNationality({ ...valuesNationality, Ordenation: e.target.value })} />
                                        <InputFieldControlled
                                            type={"text"}
                                            id={"isocode"}
                                            name={"Isocode"}
                                            label={t("cardex.nationalities.new.labelIsocode")}
                                            ariaLabel={t("cardex.nationalities.new.labelIsocode")}
                                            value={valuesNationality.Isocode}
                                            onChange={e => setValuesNationality({ ...valuesNationality, Isocode: e.target.value })} />
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

export default NationalityForm;
