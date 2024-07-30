"use client"
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import paymentAccountsInsert, { paymentAccountsEdit } from "@/components/functionsForm/CRUD/financialSetup/paymentAccounts/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import { expansion } from "@/components/functionsForm/expansion/page";
import ModalFooterContent from "@/components/modal/modalFooterContent";

import {useTranslations} from 'next-intl';

import DepartmentAutocomplete from "@/components/functionsForm/autocomplete/department/page";
import AccountGroupAutocomplete from "@/components/functionsForm/autocomplete/accountGroups/page";



const doctypeForm = ({
    idPaymentAccounts,
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

    const { handleInputPaymentAccounts, handleSubmitPaymentAccounts, handleSelect, handleDepartmentSelect } = paymentAccountsInsert();
    const { handleUpdatePaymentAccounts, setValuesPaymentAccounts, valuesPaymentAccounts } = paymentAccountsEdit(idPaymentAccounts);

    const { toggleExpand, setIsExpanded, isExpanded } = expansion();
    const t = useTranslations('Index');


    return (
        <>
            {formTypeModal === 11 && ( //payment account insert
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
                                        <form onSubmit={handleSubmitPaymentAccounts}>
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
                                                    label={t('financialSetup.paymentAccounts.cod')}
                                                    ariaLabel={"Cod."}
                                                    onChange={handleInputPaymentAccounts}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"abreviature"}
                                                    name={"Abreviature"}
                                                    label={t('financialSetup.paymentAccounts.abreviature')}
                                                    ariaLabel={"Abreviatura"}
                                                    onChange={handleInputPaymentAccounts}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"Description"}
                                                    name={"Description"}
                                                    label={t('financialSetup.paymentAccounts.description')}
                                                    ariaLabel={"Descrição"}
                                                    onChange={handleInputPaymentAccounts}
                                                />

                                                <DepartmentAutocomplete
                                                        label={t('financialSetup.paymentAccounts.departments')}
                                                        style={""}
                                                        onChange={(value) => handleDepartmentSelect(value)}
                                                />
                                                <AccountGroupAutocomplete
                                                    label={t('financialSetup.paymentAccounts.group')}
                                                    style={""}
                                                    onChange={(value) => handleSelect(value)}
                                                />
                                                <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                                    <option value="0">{t('financialSetup.paymentAccounts.type')}</option>
                                                    <option value="1">Teste de opções</option>
                                                    <option value="2">Teste de opções</option>
                                                </select>
                                                <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                                    <option value="0">{t('financialSetup.paymentAccounts.property')}</option>
                                                    <option value="1">Teste de opções</option>
                                                    <option value="2">Teste de opções</option>
                                                </select>
                                            </ModalBody>
                                        </form>
                                    </>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 12 && ( //payment account edit
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
                                    <form onSubmit={(e) => handleUpdatePaymentAccounts(e)}>
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
                                                label={t('financialSetup.paymentAccounts.cod')}
                                                ariaLabel={"Cod."}
                                                value={valuesPaymentAccounts.Cod}
                                                onChange={e => setValuesPaymentAccounts({ ...valuesPaymentAccounts, Cod: e.target.value })}
                                            />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"abreviature"}
                                                name={"Abreviature"}
                                                label={t('financialSetup.paymentAccounts.abreviature')}
                                                ariaLabel={"Abreviatura"}
                                                value={valuesPaymentAccounts.Abreviature}
                                                onChange={e => setValuesPaymentAccounts({ ...valuesPaymentAccounts, Abreviature: e.target.value })}
                                            />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"Description"}
                                                name={"Description"}
                                                label={t('financialSetup.paymentAccounts.description')}
                                                ariaLabel={"Descrição"}
                                                value={valuesPaymentAccounts.Description}
                                                onChange={e => setValuesPaymentAccounts({ ...valuesPaymentAccounts, Description: e.target.value })}
                                            />

                                            <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                                <option value="0">{t('financialSetup.paymentAccounts.department')}</option>
                                                <option value="1">Teste de opções</option>
                                                <option value="2">Teste de opções</option>
                                            </select>
                                            <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                                <option value="0">{t('financialSetup.paymentAccounts.group')}</option>
                                                <option value="1">Teste de opções</option>
                                                <option value="2">Teste de opções</option>
                                            </select>
                                            <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                                <option value="0">{t('financialSetup.paymentAccounts.type')}</option>
                                                <option value="1">Teste de opções</option>
                                                <option value="2">Teste de opções</option>
                                            </select>
                                            <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                                <option value="0">{t('financialSetup.paymentAccounts.property')}</option>
                                                <option value="1">Teste de opções</option>
                                                <option value="2">Teste de opções</option>
                                            </select>
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