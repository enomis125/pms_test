"use client"
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import { expansion } from "@/components/functionsForm/expansion/page";
import revenueAccountInsert, { revenueAccountsEdit } from "@/components/functionsForm/CRUD/financialSetup/revenueAccounts/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import ModalFooterContent from "@/components/modal/modalFooterContent";

import {useTranslations} from 'next-intl';

import AccountGroupAutocomplete from "@/components/functionsForm/autocomplete/accountGroups/page";
import TaxesAutocomplete from "@/components/functionsForm/autocomplete/taxes/page";
import DepartmentAutocomplete from "@/components/functionsForm/autocomplete/department/page";



const revenueAccountsForm = ({
    idRevenueAccount,
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

    const { handleInputRevenueAccounts, handleSubmitRevenueAccounts, handleSelectAccount, handleSelectTaxes, handleDepartmentSelectRevenue } = revenueAccountInsert();
    const { handleUpdateRevenueAccount, setValuesRevenueAccounts, valuesRevenueAccounts } = revenueAccountsEdit(idRevenueAccount);
    const { toggleExpand, setIsExpanded, isExpanded } = expansion();
    const t = useTranslations('Index');


    return (
        <>

            {formTypeModal === 11 && ( //revenue account insert
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
                                        <form onSubmit={handleSubmitRevenueAccounts}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8 overflow-y-auto" style={{ maxHeight: '80vh' }}>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"cod"}
                                                    name={"Cod"}
                                                    label={t('financialSetup.revenueAccounts.cod')}
                                                    ariaLabel={"Cod."}
                                                    onChange={handleInputRevenueAccounts}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"abreviature"}
                                                    name={"Abreviature"}
                                                    label={t('financialSetup.revenueAccounts.abreviature')}
                                                    ariaLabel={"Abreviatura"}
                                                    onChange={handleInputRevenueAccounts}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"details"}
                                                    name={"Details"}
                                                    label={t('financialSetup.revenueAccounts.details')}
                                                    ariaLabel={"Detalhes"}
                                                    onChange={handleInputRevenueAccounts}
                                                />


                                                <DepartmentAutocomplete
                                                    label={t('financialSetup.revenueAccounts.department')}
                                                    style={""}
                                                    onChange={(value) => handleDepartmentSelectRevenue(value)}
                                                />
                                                <AccountGroupAutocomplete
                                                    label={t('financialSetup.revenueAccounts.accountGroup')}
                                                    style={""}
                                                    onChange={(value) => handleSelectAccount(value)}
                                                />
                                                <TaxesAutocomplete
                                                    label={t('financialSetup.revenueAccounts.tax')}
                                                    style={""}
                                                    name={"Taxes"}
                                                    onChange={(value) => handleSelectTaxes(value)}
                                                />

                                                

                                                <input type="text" placeholder="Valor"></input>
                                                <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                                    <option value="0">{t('financialSetup.revenueAccounts.property')}</option>
                                                    <option value="1">Teste de opções</option>
                                                    <option value="2">Teste de opções</option>
                                                </select>
                                                <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                                    <option value="0">{t('financialSetup.revenueAccounts.statCode')}</option>
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

            {formTypeModal === 12 && ( //revenue account edit
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
                                    <form onSubmit={(e) => handleUpdateRevenueAccount(e)}>
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
                                                label={t('financialSetup.revenueAccounts.cod')}
                                                ariaLabel={"Cod."}
                                                value={valuesRevenueAccounts.Cod}
                                                onChange={e => setValuesRevenueAccounts({ ...valuesRevenueAccounts, Cod: e.target.value })}
                                            />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"abreviature"}
                                                name={"Abreviature"}
                                                label={t('financialSetup.revenueAccounts.abreviature')}
                                                ariaLabel={"Abreviatura"}
                                                value={valuesRevenueAccounts.Abreviature}
                                                onChange={e => setValuesRevenueAccounts({ ...valuesRevenueAccounts, Abreviature: e.target.value })}
                                            />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"details"}
                                                name={"Details"}
                                                label={t('financialSetup.revenueAccounts.details')}
                                                ariaLabel={"Detalhes"}
                                                value={valuesRevenueAccounts.Details}
                                                onChange={e => setValuesRevenueAccounts({ ...valuesRevenueAccounts, Details: e.target.value })}
                                            />

                                            <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                                <option value="0">{t('financialSetup.revenueAccounts.department')}</option>
                                                <option value="1">Teste de opções</option>
                                                <option value="2">Teste de opções</option>
                                            </select>
                                            <AccountGroupAutocomplete
                                                    label={t('financialSetup.revenueAccounts.accountGroup')}
                                                    style={""}
                                                    onChange={(value) => handleSelect(value)}
                                                />
                                            <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                                <option value="0">{t('financialSetup.revenueAccounts.tax')}</option>
                                                <option value="1">Teste de opções</option>
                                                <option value="2">Teste de opções</option>
                                            </select>
                                            <input type="text" placeholder="Valor"></input>
                                            <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                                <option value="0">{t('financialSetup.revenueAccounts.property')}</option>
                                                <option value="1">Teste de opções</option>
                                                <option value="2">Teste de opções</option>
                                            </select>
                                            <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                                <option value="0">{t('financialSetup.revenueAccounts.statCode')}</option>
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

export default revenueAccountsForm;