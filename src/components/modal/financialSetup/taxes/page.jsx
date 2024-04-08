"use client"
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { LuPlus } from "react-icons/lu";
import { BsArrowReturnRight } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import taxesInsert, { taxesEdit } from "@/components/functionsForm/CRUD/financialSetup/taxes/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import { expansion } from "@/components/functionsForm/expansion/page";
import ModalFooterContent from "@/components/modal/modalFooterContent";



const doctypeForm = ({
    idTaxes,
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

    const { handleInputTaxes, handleSubmitTaxes } = taxesInsert();
    const { handleUpdateTaxes, setValuesTaxes, valuesTaxes } = taxesEdit(idTaxes);

    const { toggleExpand, setIsExpanded, isExpanded } = expansion();



    return (
        <>
            {formTypeModal === 11 && ( //taxes insert
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
                                        <form onSubmit={handleSubmitTaxes}>
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
                                                    onChange={handleInputTaxes}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"abreviature"}
                                                    name={"Abreviature"}
                                                    label={"Abreviatura"}
                                                    ariaLabel={"Abreviatura"}
                                                    onChange={handleInputTaxes}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"Description"}
                                                    name={"Description"}
                                                    label={"Descrição"}
                                                    ariaLabel={"Descrição"}
                                                    onChange={handleInputTaxes}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"order"}
                                                    name={"Order"}
                                                    label={"Ordem"}
                                                    ariaLabel={"Ordem"}
                                                />

                                                <div className="w-64 border border-gray-400">
                                                    <div className="flex flex-row justify-between items-center border-b border-gray-400">
                                                        <label>Percentagem</label>
                                                        <LuPlus size={20} color="blue" />
                                                    </div>
                                                    <div className="flex flex-row gap-4">
                                                        <BsArrowReturnRight size={20} color="gray" />
                                                        <p>10%</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-row justify-between">
                                                    <input type="text" placeholder="Cod. SAFT"></input>
                                                    <input type="text" placeholder="Desc..SAFT"></input>
                                                </div>
                                                <input type="text" placeholder="Detalhe"></input>
                                                <div>
                                                    <input id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                                    <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Detailed invoice</label>
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

            {formTypeModal === 12 && ( //taxes edit
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
                                    <form onSubmit={(e) => handleUpdateTaxes(e)}>
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
                                                value={valuesTaxes.Cod}
                                                onChange={e => setValuesTaxes({ ...valuesTaxes, Cod: e.target.value })}
                                            />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"abreviature"}
                                                name={"Abreviature"}
                                                label={"Abreviatura"}
                                                ariaLabel={"Abreviatura"}
                                                value={valuesTaxes.Abreviature}
                                                onChange={e => setValuesTaxes({ ...valuesTaxes, Abreviature: e.target.value })}
                                            />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"Description"}
                                                name={"Description"}
                                                label={"Descrição"}
                                                ariaLabel={"Descrição"}
                                                value={valuesTaxes.Description}
                                                onChange={e => setValuesTaxes({ ...valuesTaxes, Description: e.target.value })}
                                            />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"order"}
                                                name={"Order"}
                                                label={"Ordem"}
                                                ariaLabel={"Ordem"}
                                            />

                                            <div className="w-64 border border-gray-400">
                                                <div className="flex flex-row justify-between items-center border-b border-gray-400">
                                                    <label>Percentagem</label>
                                                    <LuPlus size={20} color="blue" />
                                                </div>
                                                <div className="flex flex-row gap-4">
                                                    <BsArrowReturnRight size={20} color="gray" />
                                                    <p>10%</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-row justify-between">
                                                <input type="text" placeholder="Cod. SAFT"></input>
                                                <input type="text" placeholder="Desc..SAFT"></input>
                                            </div>
                                            <input type="text" placeholder="Detalhe"></input>
                                            <div>
                                                <input id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                                <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Detailed invoice</label>
                                            </div>
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