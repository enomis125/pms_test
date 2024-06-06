"use client"
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { AiOutlineGlobal } from "react-icons/ai";
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import maintenanceInsert, { maintenanceEdit } from "@/components/functionsForm/CRUD/hotel/maintenance/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";

import { expansion } from "@/components/functionsForm/expansion/page";
import ModalFooterContent from "@/components/modal/modalFooterContent";



const maintenanceForm = ({
    idMaintenance,
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

    const { handleInputMaintenance, handleSubmitMaintenance } = maintenanceInsert();
    const { handleUpdateMaintenance, setValuesMaintenance, valuesMaintenance } = maintenanceEdit(idMaintenance);

    const { toggleExpand, setIsExpanded, isExpanded } = expansion();


    return (
        <>

            {formTypeModal === 11 && ( //Maintenance insert
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
                                    <form onSubmit={handleSubmitMaintenance}>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onClick={() => { onClose(); window.location.reload(); }} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                <Button color="transparent" variant="light" onClick={() => { onClose(); window.location.reload(); }}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">

                                            <div className="flex flex-row items-center">
                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"description"}
                                                    name={"Description"}
                                                    label={"Descrição"}
                                                    ariaLabel={"Descrição"}
                                                    style={"w-full outline-none h-10"}
                                                    onChange={handleInputMaintenance} />
                                                <AiOutlineGlobal className="ml-auto text-xl" />{" "}
                                            </div>

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"abreviature"}
                                                name={"Abreviature"}
                                                label={"Abreviatura"}
                                                ariaLabel={"Abreviatura"}
                                                style={"w-full outline-none h-10"}
                                                onChange={handleInputMaintenance} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"details"}
                                                name={"Details"}
                                                label={"Detalhes"}
                                                ariaLabel={"Detalhes"}
                                                style={"w-full outline-none h-10"}
                                                onChange={handleInputMaintenance} />

                                            <div>
                                                <input
                                                    id="link-checkbox"
                                                    type="checkbox"
                                                    value=""
                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                ></input>
                                                <label
                                                    for="link-checkbox"
                                                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >
                                                    Estado
                                                </label>
                                            </div>
                                        </ModalBody>
                                    </form>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}


            {formTypeModal === 12 && ( //Maintenance edit
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
                                    <form onSubmit={(e) => handleUpdateMaintenance(e)}>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                            <div className="flex flex-row justify-start gap-4">
                                                {editIcon} {modalHeader} {modalEditArrow} {modalEdit}
                                            </div>
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onClick={() => { onClose(); window.location.reload(); }} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                <Button color="transparent" variant="light" onClick={() => { onClose(); window.location.reload(); }}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">

                                            <div className="flex flex-row items-center">
                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"description"}
                                                    name={"Description"}
                                                    label={"Descrição"}
                                                    ariaLabel={"Descrição"}
                                                    style={"w-full outline-none h-10"}
                                                    value={valuesMaintenance.Description}
                                                    onChange={e => setValuesMaintenance({ ...valuesMaintenance, Description: e.target.value })} />
                                                <AiOutlineGlobal className="ml-auto text-xl" />{" "}
                                            </div>

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"abreviature"}
                                                name={"Abreviature"}
                                                label={"Abreviatura"}
                                                ariaLabel={"Abreviatura"}
                                                style={"w-full outline-none h-10"}
                                                value={valuesMaintenance.Abreviature}
                                                onChange={e => setValuesMaintenance({ ...valuesMaintenance, Abreviature: e.target.value })} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"details"}
                                                name={"Details"}
                                                label={"Detalhes"}
                                                ariaLabel={"Detalhes"}
                                                style={"w-full outline-none h-10"}
                                                value={valuesMaintenance.Details}
                                                onChange={e => setValuesMaintenance({ ...valuesMaintenance, Details: e.target.value })} />

                                            <div>
                                                <input
                                                    id="link-checkbox"
                                                    type="checkbox"
                                                    value=""
                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                ></input>
                                                <label
                                                    for="link-checkbox"
                                                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >
                                                    Estado
                                                </label>
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

export default maintenanceForm;