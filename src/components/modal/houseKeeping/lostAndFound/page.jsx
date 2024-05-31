"use client"
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import tipologysInsert, { tipologysEdit } from "@/components/functionsForm/CRUD/hotel/tipology/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import { expansion } from "@/components/functionsForm/expansion/page";




const lostAndFoundFormForm = ({
    idRoomtype,
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

    const { handleInputRoomtype, handleSubmitRoomtype, handleSelect } = tipologysInsert();
    const { handleUpdateRoomtype, setValuesRoomtype, valuesRoomtype } = tipologysEdit(idRoomtype);
    const { toggleExpand, setIsExpanded, isExpanded } = expansion();



    return (
        <>

            {formTypeModal === 11 && ( //lostAndFound insert
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
                                    <form onSubmit={handleSubmitRoomtype}>
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
                                                name={"Desc"}
                                                label={"Data Registo"}
                                                ariaLabel={"Data Registo"}
                                                style={"w-full outline-none h-10"}
                                                onChange={handleInputRoomtype} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"abreviature"}
                                                name={"Name"}
                                                label={"Estado"}
                                                ariaLabel={"Estado"}
                                                style={"w-full outline-none h-10"}
                                                onChange={handleInputRoomtype} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"details"}
                                                name={"RoomFeaturesDesc"}
                                                label={"Quarto"}
                                                ariaLabel={"Quarto"}
                                                style={"w-full outline-none h-10"}
                                                onChange={handleInputRoomtype} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"details"}
                                                name={"RoomFeaturesDesc"}
                                                label={"Local"}
                                                ariaLabel={"Local"}
                                                style={"w-full outline-none h-10"}
                                                onChange={handleInputRoomtype} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"details"}
                                                name={"RoomFeaturesDesc"}
                                                label={"Nome do Hóspede"}
                                                ariaLabel={"Nome do Hóspede"}
                                                style={"w-full outline-none h-10"}
                                                onChange={handleInputRoomtype} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"details"}
                                                name={"RoomFeaturesDesc"}
                                                label={"Item de ocorrência"}
                                                ariaLabel={"Item de ocorrência"}
                                                style={"w-full outline-none h-10"}
                                                onChange={handleInputRoomtype} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"details"}
                                                name={"RoomFeaturesDesc"}
                                                label={"Utilizador"}
                                                ariaLabel={"Utilizador"}
                                                style={"w-full outline-none h-10"}
                                                onChange={handleInputRoomtype} />

                                        </ModalBody>
                                    </form>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}
        </>
    );
};

export default lostAndFoundFormForm;