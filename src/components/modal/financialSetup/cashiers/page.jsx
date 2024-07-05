"use client"
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import cashiersInsert, { cashiersEdit } from "@/components/functionsForm/CRUD/financialSetup/cashiers/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import { expansion } from "@/components/functionsForm/expansion/page";
import ModalFooterContent from "@/components/modal/modalFooterContent";
import {useTranslations} from 'next-intl';


const doctypeForm = ({
    idCashiers,
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

    const { handleInputCashiers, handleSubmitCashiers } = cashiersInsert();
    const { handleUpdateCashiers, setValuesCashiers, valuesCashiers } = cashiersEdit(idCashiers);

    const { toggleExpand, setIsExpanded, isExpanded } = expansion();
    const t = useTranslations('Index');


    return (
        <>
            {formTypeModal === 11 && ( //cashiers insert
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
                                <>
                                    <>
                                        <form onSubmit={handleSubmitCashiers}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"cod"}
                                                    name={"Cod"}
                                                    label={t('financialSetup.cashiers.cod')}
                                                    ariaLabel={"Cod."}
                                                    onChange={handleInputCashiers}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"abreviature"}
                                                    name={"Abreviature"}
                                                    label={t('financialSetup.cashiers.abreviature')}
                                                    ariaLabel={"Abreviatura"}
                                                    onChange={handleInputCashiers}
                                                />

                                                <InputFieldControlled
                                                    type={"password"}
                                                    id={"password"}
                                                    name={"Password"}
                                                    label={t('financialSetup.cashiers.password')}
                                                    ariaLabel={"Password"}
                                                    onChange={handleInputCashiers}
                                                />


                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"Description"}
                                                    name={"Description"}
                                                    label={t('financialSetup.cashiers.description')}
                                                    ariaLabel={"Descrição"}
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

            {formTypeModal === 12 && ( //cashiers edit
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
                                <>
                                    <form onSubmit={(e) => handleUpdateCashiers(e)}>
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
                                                id={"cod"}
                                                name={"Cod"}
                                                label={t('financialSetup.cashiers.cod')}
                                                ariaLabel={"Cod."}
                                                value={valuesCashiers.Cod}
                                                onChange={e => setValuesCashiers({ ...valuesCashiers, Cod: e.target.value })}
                                            />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"abreviature"}
                                                name={"Abreviature"}
                                                label={t('financialSetup.cashiers.abreviature')}
                                                ariaLabel={"Abreviatura"}
                                                value={valuesCashiers.Abreviature}
                                                onChange={e => setValuesCashiers({ ...valuesCashiers, Abreviature: e.target.value })}
                                            />

                                            <InputFieldControlled
                                                type={"password"}
                                                id={"password"}
                                                name={"Password"}
                                                label={t('financialSetup.cashiers.password')}
                                                ariaLabel={"Password"}
                                                value={valuesCashiers.Password}
                                                onChange={e => setValuesCashiers({ ...valuesCashiers, Password: e.target.value })}
                                            />


                                            <InputFieldControlled
                                                type={"text"}
                                                id={"Description"}
                                                name={"Description"}
                                                label={t('financialSetup.cashiers.description')}
                                                ariaLabel={"Descrição"}
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

export default doctypeForm;