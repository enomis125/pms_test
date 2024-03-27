"use client"
import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea, Autocomplete, Divider, AutocompleteItem, ScrollShadow } from "@nextui-org/react";
import { AiOutlineGlobal } from "react-icons/ai";
import axios from 'axios';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { usePathname } from "next/navigation";
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { RxExit } from "react-icons/rx";
import { MdClose } from "react-icons/md";
import { tipologys } from "@/components/functionsForm/CRUD/hotel/tipology/page";
import { expansion } from "@/components/functionsForm/expansion/page";


const tipologyForm = ({
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
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const { handleInputRoomtype, handleSubmitRoomtype, handleUpdateRoomtype, setValuesRoomtype, valuesRoomtype } = tipologys(idRoomtype);
    const { toggleExpand, setIsExpanded, isExpanded } = expansion();



    return (
        <>

{formTypeModal === 11 && ( //tipology insert
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
                                        <ModalBody>
                                            <ScrollShadow hideScrollBar className="h-[400px]">
                                                <div className="w-full flex flex-col gap-5 mb-4">
                                                    <div
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" variant="underlined" name="Desc" onChange={handleInputRoomtype} label="Descrição" />
                                                    </div>
                                                </div>
                                                <div className="w-full flex flex-col gap-4 mb-4">
                                                    <div
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" variant="underlined" name="Name" onChange={handleInputRoomtype} label="Abreviatura" />
                                                    </div>
                                                </div>
                                                <div className="w-full flex flex-col gap-4 mb-4">
                                                    <div
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 bg-gray-200 "
                                                    >
                                                        <Textarea
                                                            label="Detalhe"
                                                            disableAnimation
                                                            disableAutosize
                                                            className={{ base: "max-w-xs ", input: "resize-y min-h-[40px]" }}
                                                            variant="underlined"
                                                            name="RoomFeaturesDesc" onChange={handleInputRoomtype}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full flex flex-col gap-4 mb-4">
                                                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                        <Autocomplete
                                                            variant="underlined"
                                                            defaultItems={Tipologia}
                                                            label=" Grupo Tipologia"
                                                            className="w-full"
                                                        >
                                                            {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                        </Autocomplete>
                                                    </div>
                                                </div>
                                                <div className="w-full flex flex-col gap-4 mb-4">
                                                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                        <Autocomplete
                                                            variant="underlined"
                                                            defaultItems={Caracteristicas}
                                                            label="Função"
                                                            className="w-full"
                                                        >
                                                            {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                        </Autocomplete>
                                                    </div>
                                                </div>
                                            </ScrollShadow>
                                        </ModalBody>
                                    </form>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 12 && ( //tipology edit
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
                                    <form onSubmit={(e) => handleUpdateRoomtype(e)}>
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
                                        <ModalBody>
                                            <ScrollShadow hideScrollBar className="h-[400px]">
                                                <div className="w-full flex flex-col gap-5 mb-4">
                                                    <div
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" value={valuesRoomtype.Desc} onChange={e => setValuesRoomtype({ ...valuesRoomtype, Desc: e.target.value })} variant="underlined" label="Descrição" />
                                                    </div>
                                                </div>
                                                <div className="w-full flex flex-col gap-4 mb-4">
                                                    <div
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" value={valuesRoomtype.Name} onChange={e => setValuesRoomtype({ ...valuesRoomtype, Name: e.target.value })} variant="underlined" label="Abreviatura" />
                                                    </div>
                                                </div>
                                                <div className="w-full flex flex-col gap-4 mb-4">
                                                    <div
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 bg-gray-200 "
                                                    >
                                                        <Textarea
                                                            label="Detalhe"
                                                            disableAnimation
                                                            disableAutosize
                                                            className={{ base: "max-w-xs ", input: "resize-y min-h-[40px]" }}
                                                            variant="underlined"
                                                            value={valuesRoomtype.RoomFeaturesDesc} onChange={e => setValuesRoomtype({ ...valuesRoomtype, RoomFeaturesDesc: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full flex flex-col gap-4 mb-4">
                                                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                        <Autocomplete
                                                            variant="underlined"
                                                            defaultItems={Tipologia}
                                                            label=" Grupo Tipologia"
                                                            className="w-full"
                                                            value={valuesRoomtype.GroupID} onChange={e => setValuesRoomtype({ ...valuesRoomtype, GroupID: e.target.value })}
                                                        >
                                                            {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                        </Autocomplete>
                                                    </div>
                                                </div>
                                                <div className="w-full flex flex-col gap-4 mb-4">
                                                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                        <Autocomplete
                                                            variant="underlined"
                                                            defaultItems={Caracteristicas}
                                                            label="Função"
                                                            className="w-full"
                                                            value={valuesRoomtype.RoomTypePlan} onChange={e => setValuesRoomtype({ ...valuesRoomtype, RoomTypePlan: e.target.value })}
                                                        >
                                                            {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                        </Autocomplete>
                                                    </div>
                                                </div>
                                            </ScrollShadow>
                                        </ModalBody>
                                    </form>
                                    <ModalFooter className="absolute bottom-0 left-0 flex flex-row text-right bg-tableFooter border border-tableFooterBorder w-full text-gray-600 text-xs">
                                        <p>Criado em {`${new Date(criado).toLocaleDateString()} : Teste`}</p>
                                        {criado !== editado && (
                                            <div>
                                                <p>Editado em {`${new Date(editado).toLocaleDateString()} : Teste`}</p>
                                            </div>
                                        )}
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}
        </>
    );
};

export default tipologyForm;