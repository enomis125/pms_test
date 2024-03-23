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


/*
os modals encontram-se identificados por numeros de 2 digitos, sendo o ultimo digito um indicador de modal ou full screen:
0 - mmodal
1 - full screen (inserir)
2 - full screen (editar)
(REMOVER AO CONCLUIR O PROJETO)
*/

const formModals = ({ idTransfer,
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
    editor }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();


    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

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


    //inserção na tabela transfers
    const [transfer, setTransfer] = useState({
        class: '',
        name: '',
        shortName: ''
    })

    const handleInputTransfer = (event) => {
        setTransfer({ ...transfer, [event.target.name]: event.target.value })
    }
    function handleSubmitTransfer(event) {
        event.preventDefault()
        if (!transfer.Class || !transfer.Name || !transfer.ShortName) {
            alert("Preencha os campos corretamente");
            return;
        }
        axios.put('/api/v1/booking/transfers', {
            data: {
                class: transfer.Class,
                name: transfer.Name,
                shortName: transfer.ShortName
            }
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }
    //edição na tabela rooms
    const [valuesTransfer, setValuesTransfer] = useState({
        id: idTransfer,
        Class: '',
        Name: '',
        ShortName: ''
    })

    useEffect(() => {
        axios.get("/api/v1/booking/transfers/" + idTransfer)
            .then(res => {
                setValuesTransfer({ ...valuesTransfer, Class: res.data.response.class, Name: res.data.response.name, ShortName: res.data.response.shortName })
            })
            .catch(err => console.log(err))
    }, [])

    function handleUpdateTransfer(e) {
        e.preventDefault()
        axios.patch(`/api/v1/booking/transfers/` + idTransfer, {
            data: {
                class: valuesTransfer.Class,
                name: valuesTransfer.Name,
                shortName: valuesTransfer.ShortName
            }
        })
            .catch(err => console.log(err))
    }


    //expanção do ecra no form
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };


    return (
        <>
            {formTypeModal === 11 && ( //tipo cancelamento
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
                                    <form onSubmit={handleSubmitTransfer}>
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                            <input type="text" name="ShortName" onChange={handleInputTransfer} placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                            <div>
                                            <input 
                                            type="text" 
                                            name="Name" 
                                            onChange={handleInputTransfer} 
                                            placeholder="Descrição" 
                                            className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4" />
                                            <AiOutlineGlobal className="ml-auto text-xl" />
                                            </div>
                                            <textarea type="textarea" name="Class" onChange={handleInputTransfer} placeholder="Detalhe" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
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
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

{formTypeModal === 12 && ( //tipo cancelamento
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
                                    <form onSubmit={handleUpdateTransfer}>
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                            <input type="text" value={valuesTransfer.ShortName} onChange={e => setValuesTransfer({ ...valuesTransfer, ShortName: e.target.value })} name="ShortName" placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                            <div>
                                            <input 
                                            type="text" 
                                            name="Name" 
                                            value={valuesTransfer.Name}
                                            onChange={e => setValuesTransfer({ ...valuesTransfer, Name: e.target.value })}
                                            placeholder="Descrição" 
                                            className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4" />
                                            <AiOutlineGlobal className="ml-auto text-xl" />
                                            </div>
                                            <textarea type="textarea" name="Class" value={valuesTransfer.Class} onChange={e => setValuesTransfer({ ...valuesTransfer, Class: e.target.value })} placeholder="Detalhe" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
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
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}


            {formTypeModal === 20 && ( //rooms modal
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
                                                <Input type="Descrição" variant="underlined" label="Descrição" />
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                            <div
                                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                            >
                                                <Input type="Abreviatura" variant="underlined" label="Abreviatura" />
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
                                            Cancelar
                                        </Button>
                                        <Button color="primary" onPress={onClose}>
                                            Submeter
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

{formTypeModal === 21 && ( //rooms insert
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
                                <form onSubmit={handleSubmitRoom}>
                                <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
        <div className='flex flex-row items-center mr-5'>
            <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
            <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
            <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
        </div>
    </ModalHeader>
    <ModalBody>
        <div className="w-full flex flex-col gap-4">
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input type="text" name="Description" onChange={handleInputRoom} variant="underlined" label="Descrição" />
            </div>
        </div>
        <div className="w-full flex flex-col gap-4">
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input type="text" name="Label" onChange={handleInputRoom} variant="underlined" label="Abreviatura" />
            </div>
        </div>
        <div className="w-full flex flex-col gap-4">
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Textarea
                    label="RoomType"
                    name="RoomType"
                    onChange={handleInputRoom}
                    disableAnimation
                    disableAutosize
                    className={{ base: "max-w-xs", input: "resize-y min-h-[40px]" }}
                    variant="underlined"
                />
            </div>
        </div>
        {/* Adjusting the field name to match the expected name in handleInputRoom */}
        <div className="w-full flex flex-col gap-4">
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Autocomplete
                    variant="underlined"
                    defaultItems={Tipologia}
                    label="Tipologia"
                    // Adjusting the name to match the expected name in handleInputRoom
                    name="Tipologia"
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
                                    </form>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 22 && ( //rooms edit
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
                                <form onSubmit={(e) => handleUpdateRoom(e)}>
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
                                        <div className="w-full flex flex-col gap-4">
                                            <div
                                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                            >
                                                <Input type="text" value={valuesRoom.Description} onChange={e => setValuesRoom({ ...valuesRoom, Description: e.target.value })} variant="underlined" label="Descrição" />
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                            <div
                                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                            >
                                                <Input type="text" value={valuesRoom.Label} onChange={e => setValuesRoom({ ...valuesRoom, Label: e.target.value })}  variant="underlined" label="Abreviatura" />
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                            <div
                                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
                                            >
                                                <Textarea
                                                    label="Detalhe"
                                                    value={valuesRoom.RoomType}
                                                    onChange={e => setValuesRoom({ ...valuesRoom, RoomType: e.target.value })} 
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
                                    </form>
                                    <ModalFooter className="absolute bottom-0 left-0 flex flex-col text-right bg-tableFooter border border-tableFooterBorder w-full text-gray-600 text-sm">
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

export default formModals;

