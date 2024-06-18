"use client"
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import axios from 'axios';
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { MdClose } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
import { BsArrowReturnRight } from "react-icons/bs";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";

//imports de crud insert
import departmentInsert from "@/components/functionsForm/CRUD/financialSetup/departments/page";
import cashiersInsert from "@/components/functionsForm/CRUD/financialSetup/cashiers/page";
import accountGroupInsert from "@/components/functionsForm/CRUD/financialSetup/accountGroups/page";
import paymentAccountsInsert from "@/components/functionsForm/CRUD/financialSetup/paymentAccounts/page";
import revenueAccountInsert from "@/components/functionsForm/CRUD/financialSetup/revenueAccounts/page";
import taxesInsert from "@/components/functionsForm/CRUD/financialSetup/taxes/page";

//imports de autocompletes
import DepartmentAutocomplete from "@/components/functionsForm/autocomplete/department/page";
import AccountGroupAutocomplete from "@/components/functionsForm/autocomplete/accountGroups/page";
import TaxesAutocomplete from "@/components/functionsForm/autocomplete/taxes/page";
import {useTranslations} from 'next-intl';

/*
os modals encontram-se identificados por numeros de 2 digitos, sendo o ultimo digito um indicador de modal ou full screen:
0 - mmodal
1 - full screen (inserir)
2 - full screen (editar)
(REMOVER AO CONCLUIR O PROJETO)
*/

const formModals = ({ idDepartment,
    buttonName,
    modalHeader,
    formTypeModal
}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { handleInputDepartments, handleSubmitDepartments } = departmentInsert();
    const { handleInputCashiers, handleSubmitCashiers } = cashiersInsert();
    const { handleInputAccountGroups, handleSubmitAccountGroups } = accountGroupInsert();
    const { handleInputPaymentAccounts, handleSubmitPaymentAccounts, handleSelect, handleDepartmentSelect } = paymentAccountsInsert();
    const { handleInputRevenueAccounts, handleSubmitRevenueAccounts, handleSelectAccount, handleSelectTaxes, handleDepartmentSelectRevenue } = revenueAccountInsert();
    const { handleInputTaxes, handleSubmitTaxes } = taxesInsert();
    const t = useTranslations('Index');



    return (
        <>

            {formTypeModal === 10 && ( //department modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} className="z-50">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                        <form onSubmit={handleSubmitDepartments}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"abreviature"}
                                                    name={"Abreviature"}
                                                    label={t('financialSetup.departments.abreviature')}
                                                    ariaLabel={"Abreviatura"}
                                                    onChange={handleInputDepartments}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"description"}
                                                    name={"Description"}
                                                    label={t('financialSetup.departments.description')}
                                                    ariaLabel={"Descrição"}
                                                    onChange={handleInputDepartments}
                                                />

                                                <div>
                                                    <input id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                                    <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{t('financialSetup.departments.activeStatus')}</label>
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"order"}
                                                    name={"Order"}
                                                    label={t('financialSetup.departments.order')}
                                                    ariaLabel={"Ordem"}
                                                    onChange={handleInputDepartments}
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

            {formTypeModal === 20 && ( //account groups modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} className="z-50">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                        <form onSubmit={handleSubmitAccountGroups}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
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

            {formTypeModal === 30 && ( //revenue account modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} scrollBehavior="inside" className="z-50">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                        <form onSubmit={handleSubmitRevenueAccounts}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
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

                                                <input type="text" placeholder={t('financialSetup.revenueAccounts.worth')}></input>
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

            {formTypeModal === 40 && ( //payment account modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100 -mt" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} className="z-50">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                        <form onSubmit={handleSubmitPaymentAccounts}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
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


            {formTypeModal === 50 && ( //taxes modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} className="z-50">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                        <form onSubmit={handleSubmitTaxes}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"cod"}
                                                    name={"Cod"}
                                                    label={t('financialSetup.taxes.cod')}
                                                    ariaLabel={"Cod."}
                                                    onChange={handleInputTaxes}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"abreviature"}
                                                    name={"Abreviature"}
                                                    label={t('financialSetup.taxes.abreviature')}
                                                    ariaLabel={"Abreviatura"}
                                                    onChange={handleInputTaxes}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"Description"}
                                                    name={"Description"}
                                                    label={t('financialSetup.taxes.description')}
                                                    ariaLabel={"Descrição"}
                                                    onChange={handleInputTaxes}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"order"}
                                                    name={"Order"}
                                                    label={t('financialSetup.taxes.order')}
                                                    ariaLabel={"Ordem"}
                                                />

                                                <div className="w-64 border border-gray-400">
                                                    <div className="flex flex-row justify-between items-center border-b border-gray-400">
                                                        <label>{t('financialSetup.taxes.percentage')}</label>
                                                        <LuPlus size={20} color="blue" />
                                                    </div>
                                                    <div className="flex flex-row gap-4">
                                                        <BsArrowReturnRight size={20} color="gray" />
                                                        <p>10%</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-row justify-between">
                                                    <input type="text" placeholder={t('financialSetup.taxes.codSAFT')}></input>
                                                    <input type="text" placeholder={t('financialSetup.taxes.descSAFT')}></input>
                                                </div>
                                                <input type="text" placeholder={t('financialSetup.taxes.detail')}></input>
                                                <div>
                                                    <input id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                                    <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{t('financialSetup.taxes.detailedInvoice')}</label>
                                                </div>
                                            </ModalBody>
                                        </form>
                                    </>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}



            {formTypeModal === 60 && ( //cashiers modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} className="z-50">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                        <form onSubmit={handleSubmitCashiers}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
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

            {formTypeModal === 70 && ( //void charges modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} className="z-50">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                        <form onSubmit={handleSubmitDepartments}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"cod"}
                                                    name={"Cod"}
                                                    label={t('financialSetup.voidCharges.cod')}
                                                    ariaLabel={"Cod."}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"abreviature"}
                                                    name={"Abreviature"}
                                                    label={t('financialSetup.voidCharges.abreviature')}
                                                    ariaLabel={"Abreviatura"}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"Properties"}
                                                    name={"Properties"}
                                                    label={t('financialSetup.voidCharges.property')}
                                                    ariaLabel={"Descrição"}
                                                />
                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"Description"}
                                                    name={"Description"}
                                                    label={t('financialSetup.voidCharges.description')}
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

        </>
    );
};

export default formModals;