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



export default function formModals({
    idCarateristics,
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
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    //expansão do form
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const Tipologia = [
        { label: "Tipologia1", value: "Tipologia1", description: "" },
        { label: "Tipologia2", value: "Tipologia2", description: "" },
        { label: "Tipologia3", value: "Tipologia3", description: "" },
        { label: "Tipologia4", value: "Tipologia4", description: "" }
    ]
    const Caracteristicas = [
        { label: "Caracteristicas1", value: "Caracteristicas1", description: "" },
        { label: "Caracteristicas2", value: "Caracteristicas2", description: "" },
        { label: "Caracteristicas3", value: "Caracteristicas3", description: "" },
        { label: "Caracteristicas4", value: "Caracteristicas4", description: "" }
    ]

    return (
        <>
            {formTypeModal === 20 && ( //modal
                <>
                    <Button onPress={onOpen} color="bg-primary-100" className="w-fit">
                        {buttonName}
                    </Button>
                    <Modal
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        isDismissable={false}
                        isKeyboardDismissDisabled={true}
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="">{modalHeader}</ModalHeader>
                                    <ModalBody>
                                        <div className="w-full flex flex-col gap-4">
                                                <div
                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                >
                                                    <Input type="text" variant="underlined" label="Descrição" />
                                                </div>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                                <div

                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                >
                                                    <Input type="text" variant="underlined" label="Abreviatura" />
                                                </div>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                                <div
                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
                                                >
                                                    <Textarea
                                                        label="Detalhe"
                                                        disableAnimation
                                                        disableAutosize
                                                        className={{ base: "max-w-xs", input: "resize-y min-h-[40px]" }}
                                                        variant="underlined"
                                                    />
                                                </div>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <Autocomplete
                                                        variant="underlined"
                                                        defaultItems={Tipologia}
                                                        label="Tipologia"
                                                        className="w-full"
                                                    >
                                                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                    </Autocomplete>
                                                </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row justify-between">
                                            <div className="flex flex-col w-1/2">
                                                <p className="text-sm">Ocupação Máxima</p>
                                                <p className="text-xl">1</p>
                                            </div>
                                            <div className="flex flex-col w-1/2">
                                                <p className="text-sm">Ordem</p>
                                                <p className="text-xl">1</p>
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                                <div
                                                    key={variant}
                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
                                                >
                                                    <Textarea
                                                        label="DEP. DE HOUSEKEEPING"
                                                        disableAnimation
                                                        disableAutosize
                                                        className={{ base: "max-w-xs", input: "resize-y min-h-[10px]" }}
                                                        variant="underlined"
                                                    />
                                                </div>
                                        </div>
                                        <div className="flex gap-4 items-center max-w-xs">
                                            <Button size="md">
                                                Configuração de interfaces
                                            </Button>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <Autocomplete
                                                        variant="underlined"
                                                        defaultItems={Caracteristicas}
                                                        label="Caracteristicas"
                                                        className="w-full"
                                                    >
                                                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                    </Autocomplete>
                                                </div>
                                        </div>

                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button color="primary" onPress={onClose}>
                                            Action
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 21 && ( //insert
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
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                        <div className='flex flex-row items-center mr-5'>
                                            <Button color="transparent" type="submit"><TfiSave size={25} /></Button>
                                            <Button color="transparent" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                            <Button color="transparent" variant="light" onPress={onClose}><RxExit size={25} /></Button>
                                        </div>
                                    </ModalHeader>
                                    <ModalBody>
                                        <div className="w-full flex flex-col gap-4">
                                                <div
                                                    key={variant}
                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                >
                                                    <Input type="Descrição" variant={variant} label="Descrição" />
                                                </div>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                                <div
                                                    key={variant}
                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                >
                                                    <Input type="Abreviatura" variant={variant} label="Abreviatura" />
                                                </div>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                                <div
                                                    key={variant}
                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
                                                >
                                                    <Textarea
                                                        label="Detalhe"
                                                        disableAnimation
                                                        disableAutosize
                                                        className={{ base: "max-w-xs", input: "resize-y min-h-[40px]" }}
                                                        variant={variant}
                                                    />
                                                </div>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                                <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <Autocomplete
                                                        variant={variant}
                                                        defaultItems={Tipologia}
                                                        label="Tipologia"
                                                        className="w-full"
                                                    >
                                                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                    </Autocomplete>
                                                </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row justify-between">
                                            <div className="flex flex-col w-1/2">
                                                <p className="text-sm">Ocupação Máxima</p>
                                                <p className="text-xl">1</p>
                                            </div>
                                            <div className="flex flex-col w-1/2">
                                                <p className="text-sm">Ordem</p>
                                                <p className="text-xl">1</p>
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                                <div
                                                    key={variant}
                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
                                                >
                                                    <Textarea
                                                        label="DEP. DE HOUSEKEEPING"
                                                        disableAnimation
                                                        disableAutosize
                                                        className={{ base: "max-w-xs", input: "resize-y min-h-[10px]" }}
                                                        variant={variant}
                                                    />
                                                </div>
                                        </div>
                                        <div className="flex gap-4 items-center max-w-xs">
                                            <Button size="md">
                                                Configuração de interfaces
                                            </Button>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                                <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <Autocomplete
                                                        variant={variant}
                                                        defaultItems={Caracteristicas}
                                                        label="Caracteristicas"
                                                        className="w-full"
                                                    >
                                                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                    </Autocomplete>
                                                </div>
                                        </div>

                                    </ModalBody>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

{formTypeModal === 21 && ( //insert
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
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                        <div className='flex flex-row items-center mr-5'>
                                            <Button color="transparent" type="submit"><TfiSave size={25} /></Button>
                                            <Button color="transparent" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                            <Button color="transparent" variant="light" onPress={onClose}><RxExit size={25} /></Button>
                                        </div>
                                    </ModalHeader>
                                    <ModalBody>
                                        <div className="w-full flex flex-col gap-4">
                                                <div
                                                    key={variant}
                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                >
                                                    <Input type="Descrição" variant={variant} label="Descrição" />
                                                </div>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                                <div
                                                    key={variant}
                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                >
                                                    <Input type="Abreviatura" variant={variant} label="Abreviatura" />
                                                </div>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                                <div
                                                    key={variant}
                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
                                                >
                                                    <Textarea
                                                        label="Detalhe"
                                                        disableAnimation
                                                        disableAutosize
                                                        className={{ base: "max-w-xs", input: "resize-y min-h-[40px]" }}
                                                        variant={variant}
                                                    />
                                                </div>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                                <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <Autocomplete
                                                        variant={variant}
                                                        defaultItems={Tipologia}
                                                        label="Tipologia"
                                                        className="w-full"
                                                    >
                                                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                    </Autocomplete>
                                                </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row justify-between">
                                            <div className="flex flex-col w-1/2">
                                                <p className="text-sm">Ocupação Máxima</p>
                                                <p className="text-xl">1</p>
                                            </div>
                                            <div className="flex flex-col w-1/2">
                                                <p className="text-sm">Ordem</p>
                                                <p className="text-xl">1</p>
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                                <div
                                                    key={variant}
                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
                                                >
                                                    <Textarea
                                                        label="DEP. DE HOUSEKEEPING"
                                                        disableAnimation
                                                        disableAutosize
                                                        className={{ base: "max-w-xs", input: "resize-y min-h-[10px]" }}
                                                        variant={variant}
                                                    />
                                                </div>
                                        </div>
                                        <div className="flex gap-4 items-center max-w-xs">
                                            <Button size="md">
                                                Configuração de interfaces
                                            </Button>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                                <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <Autocomplete
                                                        variant={variant}
                                                        defaultItems={Caracteristicas}
                                                        label="Caracteristicas"
                                                        className="w-full"
                                                    >
                                                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                    </Autocomplete>
                                                </div>
                                        </div>

                                    </ModalBody>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}
        </>
    )
}
