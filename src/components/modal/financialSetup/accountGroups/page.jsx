"use client"
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import { expansion } from "@/components/functionsForm/expansion/page";
import accountGroupInsert, { accountGroupsEdit } from "@/components/functionsForm/CRUD/financialSetup/accountGroups/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import ModalFooterContent from "@/components/modal/modalFooterContent";
import {useTranslations} from 'next-intl';



const accountGroupsForm = ({
    idAccountGroups,
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

    const { handleInputAccountGroups, handleSubmitAccountGroups } = accountGroupInsert();
    const { handleUpdateAccountGroups, setValuesAccountGroups, valuesAccountGroups } = accountGroupsEdit(idAccountGroups);

    const { toggleExpand, setIsExpanded, isExpanded } = expansion();
    const t = useTranslations('Index');



    return (
        <>

            {formTypeModal === 11 && ( //account groups insert
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
                                    <>
                                        <form onSubmit={handleSubmitAccountGroups}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"cod"}
                                                    name={"Cod"}
                                                    label={t('financialSetup.accountGroups.cod')}
                                                    ariaLabel={"Cod."}
                                                    onChange={handleInputAccountGroups}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"abreviature"}
                                                    name={"Abreviature"}
                                                    label={t('financialSetup.accountGroups.abreviature')}
                                                    ariaLabel={"Abreviatura"}
                                                    onChange={handleInputAccountGroups}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"Description"}
                                                    name={"Description"}
                                                    label={t('financialSetup.accountGroups.description')}
                                                    ariaLabel={"Descrição"}
                                                    onChange={handleInputAccountGroups}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"order"}
                                                    name={"Order"}
                                                    label={t('financialSetup.accountGroups.order')}
                                                    ariaLabel={"Ordem"}
                                                    onChange={handleInputAccountGroups}
                                                />

                                            </ModalBody>
                                        </form>
                                    </>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 12 && ( //account groups edit
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
                                    <form onSubmit={(e) => handleUpdateAccountGroups(e)}>
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
                                                id={"cod"}
                                                name={"Cod"}
                                                label={t('financialSetup.accountGroups.cod')}
                                                ariaLabel={"Cod."}
                                                value={valuesAccountGroups.Cod}
                                                onChange={e => setValuesAccountGroups({ ...valuesAccountGroups, Cod: e.target.value })}
                                            />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"abreviature"}
                                                name={"Abreviature"}
                                                label={t('financialSetup.accountGroups.abreviature')}
                                                ariaLabel={"Abreviatura"}
                                                value={valuesAccountGroups.Abreviature}
                                                onChange={e => setValuesAccountGroups({ ...valuesAccountGroups, Abreviature: e.target.value })}
                                            />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"Description"}
                                                name={"Description"}
                                                label={t('financialSetup.accountGroups.description')}
                                                ariaLabel={"Descrição"}
                                                value={valuesAccountGroups.Description}
                                                onChange={e => setValuesAccountGroups({ ...valuesAccountGroups, Description: e.target.value })}
                                            />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"order"}
                                                name={"Order"}
                                                label={t('financialSetup.accountGroups.order')}
                                                ariaLabel={"Ordem"}
                                                value={valuesAccountGroups.Order}
                                                onChange={e => setValuesAccountGroups({ ...valuesAccountGroups, Order: e.target.value })}
                                            />

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

export default accountGroupsForm;