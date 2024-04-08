"use client"
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import typesGroupsInsert, { typesGroupsEdit } from "@/components/functionsForm/CRUD/hotel/tipologyGroup/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import { expansion } from "@/components/functionsForm/expansion/page";
import ModalFooterContent from "@/components/modal/modalFooterContent";



const tipologyGroupForm = ({
    idTypesgroups,
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

    const { handleSubmitTypesgroups, handleInputTypesgroups } = typesGroupsInsert();
    const { handleUpdateTypesgroups, valuesTypesgroups, setValuesTypesGroups } = typesGroupsEdit(idTypesgroups);
    const { toggleExpand, setIsExpanded, isExpanded } = expansion();



    return (
        <>

            {formTypeModal === 11 && ( //tipology group insert
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
                        isOpen={isOpen} hideCloseButton={true} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                        <form onSubmit={handleSubmitTypesgroups}>
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
                                                    id={"description"}
                                                    name={"Description"}
                                                    label={"Descrição"}
                                                    ariaLabel={"Descrição"} />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"abreviature"}
                                                    name={"Label"}
                                                    label={"Abreviatura"}
                                                    ariaLabel={"Abreviatura"}
                                                    onChange={handleInputTypesgroups} />

                                                <InputFieldControlled
                                                    type={"textarea"}
                                                    id={"details"}
                                                    name={"Details"}
                                                    label={"Detalhes"}
                                                    ariaLabel={"Detalhes"} />

                                                <div>
                                                    <input id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                                    <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ativo (estado).</label>
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"order"}
                                                    name={"Order"}
                                                    label={"Ordem"}
                                                    ariaLabel={"Ordem"}
                                                    style={"w-1/2"} />

                                                <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                                    <option value="0">------------</option>
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

            {formTypeModal === 12 && ( //tipology group edit
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
                                    <form onSubmit={(e) => handleUpdateTypesgroups(e)}>
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
                                                id={"description"}
                                                name={"Description"}
                                                label={"Descrição"}
                                                ariaLabel={"Descrição"} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"label"}
                                                name={"Label"}
                                                label={"Abreviatura"}
                                                ariaLabel={"Abreviatura"}
                                                value={valuesTypesgroups.Label}
                                                onChange={e => setValuesTypesGroups({ ...valuesTypesgroups, Label: e.target.value })} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"details"}
                                                name={"Details"}
                                                label={"Detalhes"}
                                                ariaLabel={"Detalhes"} />

                                            <div>
                                                <input id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                                <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ativo (estado).</label>
                                            </div>

                                            <InputFieldControlled type={"text"} id={"order"} name={"Order"} label={"Ordem"} ariaLabel={"Ordem"} />

                                            <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                                <option value="0">------------</option>
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

export default tipologyGroupForm;