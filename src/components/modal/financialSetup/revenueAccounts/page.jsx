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

    const { handleInputRevenueAccounts, handleSubmitRevenueAccounts, handleDepartmentSelect } = revenueAccountInsert();
    const { handleUpdateRevenueAccount, setValuesRevenueAccounts, valuesRevenueAccounts } = revenueAccountsEdit(idRevenueAccount);
    const { toggleExpand, setIsExpanded, isExpanded } = expansion();



    return (
        <>

            {formTypeModal === 11 && ( //revenue account insert
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
                                <>
                                    <>
                                        <form onSubmit={handleSubmitRevenueAccounts}>
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
                                                    label={"Cod."}
                                                    ariaLabel={"Cod."}
                                                    onChange={handleInputRevenueAccounts}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"abreviature"}
                                                    name={"Abreviature"}
                                                    label={"Abreviatura"}
                                                    ariaLabel={"Abreviatura"}
                                                    onChange={handleInputRevenueAccounts}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"details"}
                                                    name={"Details"}
                                                    label={"Detalhes"}
                                                    ariaLabel={"Detalhes"}
                                                    onChange={handleInputRevenueAccounts}
                                                />

                                                <DepartmentAutocomplete
                                                    label={"Departamento"}
                                                    style={""}
                                                    onChange={(value) => handleDepartmentSelect(value)}
                                                />
                                                <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                                    <option value="0">Grupo de Conta</option>
                                                    <option value="1">Teste de opções</option>
                                                    <option value="2">Teste de opções</option>
                                                </select>
                                                <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                                    <option value="0">Taxa</option>
                                                    <option value="1">Teste de opções</option>
                                                    <option value="2">Teste de opções</option>
                                                </select>
                                                <input type="text" placeholder="Valor"></input>
                                                <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                                    <option value="0">Propriedade</option>
                                                    <option value="1">Teste de opções</option>
                                                    <option value="2">Teste de opções</option>
                                                </select>
                                                <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                                    <option value="0">Código Estatístico</option>
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
                        classNames={{
                            base: "max-h-screen",
                            wrapper: isExpanded ? "w-full h-screen" : "lg:pl-72 h-screen w-full",
                            body: "h-full",
                        }}
                        size="full"
                        isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <form onSubmit={(e) => handleUpdateRevenueAccount(e)}>
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
                                                label={"Cod."}
                                                ariaLabel={"Cod."}
                                                value={valuesRevenueAccounts.Cod}
                                                onChange={e => setValuesRevenueAccounts({ ...valuesRevenueAccounts, Cod: e.target.value })}
                                            />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"abreviature"}
                                                name={"Abreviature"}
                                                label={"Abreviatura"}
                                                ariaLabel={"Abreviatura"}
                                                value={valuesRevenueAccounts.Abreviature}
                                                onChange={e => setValuesRevenueAccounts({ ...valuesRevenueAccounts, Abreviature: e.target.value })}
                                            />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"details"}
                                                name={"Details"}
                                                label={"Detalhes"}
                                                ariaLabel={"Detalhes"}
                                                value={valuesRevenueAccounts.Details}
                                                onChange={e => setValuesRevenueAccounts({ ...valuesRevenueAccounts, Details: e.target.value })}
                                            />

                                            <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                                <option value="0">Departamento</option>
                                                <option value="1">Teste de opções</option>
                                                <option value="2">Teste de opções</option>
                                            </select>
                                            <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                                <option value="0">Grupo de Conta</option>
                                                <option value="1">Teste de opções</option>
                                                <option value="2">Teste de opções</option>
                                            </select>
                                            <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                                <option value="0">Taxa</option>
                                                <option value="1">Teste de opções</option>
                                                <option value="2">Teste de opções</option>
                                            </select>
                                            <input type="text" placeholder="Valor"></input>
                                            <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                                <option value="0">Propriedade</option>
                                                <option value="1">Teste de opções</option>
                                                <option value="2">Teste de opções</option>
                                            </select>
                                            <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                                <option value="0">Código Estatístico</option>
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