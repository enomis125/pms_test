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
//imports de funções
import { transfer } from "@/components/functionsForm/CRUD/bookings/transfers/page";
import { cancelType } from "@/components/functionsForm/CRUD/bookings/cancelType/page";
import { reserveChange } from "@/components/functionsForm/CRUD/bookings/reserveChange/page";
import { cancelReason } from "@/components/functionsForm/CRUD/bookings/cancelReason/page";
import { replacementCode } from "@/components/functionsForm/CRUD/bookings/replacementCode/page";
import { reserveMotive } from "@/components/functionsForm/CRUD/bookings/reserveMotive/page";
import { formsKnowledge } from "@/components/functionsForm/CRUD/bookings/formsKnowledge/page";
import { market } from "@/components/functionsForm/CRUD/bookings/market/page";
import { marketSegments } from "@/components/functionsForm/CRUD/bookings/marketSegments/page";
import { reservationStatus } from "@/components/functionsForm/CRUD/bookings/reservationStatus/page";
import { expansion } from "@/components/functionsForm/expansion/page";


/*
os modals encontram-se identificados por numeros de 2 digitos, sendo o ultimo digito um indicador de modal ou full screen:
0 - mmodal
1 - full screen (inserir)
2 - full screen (editar)
(REMOVER AO CONCLUIR O PROJETO)
*/

const formModals = ({ idCancelReason, idCancelType, idReservMotive, idReservChange, idReplaceCode, idKnowledge, idMarket, idMarketSegment, idReservStatus, idTransfer,
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

    //funções de inserir e editar
    const { handleInputReservStatus, handleSubmitReservStatus, handleUpdateReservStatus, setValuesReservStatus, valuesReservStatus } = reservationStatus(idReservStatus);
    const { handleInputMarketSegment, handleSubmitMarketSegment, handleUpdateMarketSegment, setValuesMarketSegment, valuesMarketSegment } = marketSegments(idMarketSegment);
    const { handleInputMarket, handleSubmitMarket, handleUpdateMarket, setValuesMarket, valuesMarket } = market(idMarket);
    const { handleInputKnowledge, handleSubmitKnowledge, handleUpdateKnowledge, setValuesKnowledge, valuesKnowledge } = formsKnowledge(idKnowledge);
    const { handleInputReservMotive, handleSubmitReservMotive, handleUpdateReservMotive, setValuesReservMotive, valuesReservMotive } = reserveMotive(idReservMotive);
    const { handleInputReplaceCode, handleSubmitReplaceCode, handleUpdateReplaceCode, setValuesReplaceCode, valuesReplaceCode } = replacementCode(idReplaceCode);
    const { handleInputCancelReason, handleSubmitCancelReason, handleUpdateCancelReason, setValuesCancelReason, valuesCancelReason } = cancelReason(idCancelReason);
    const { handleInputReservChange, handleSubmitReservChange, handleUpdateReservChange, setValuesReservChang, valuesReservChange } = reserveChange(idReservChange);
    const { handleInputCancelType, handleSubmitCancelType, handleUpdateCancelType, setValuesCancelType, valuesCancelType } = cancelType(idCancelType);
    const { handleInputTransfer, handleSubmitTransfer, handleUpdateTransfer, setValuesTransfer, valuesTransfer } = transfer(idTransfer);

    //expansão de ecra form
    const { toggleExpand , setIsExpanded, isExpanded } = expansion();

    return (
        <>

            {formTypeModal === 10 && ( //reservation status modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} className="z-50">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                    <form onSubmit={handleSubmitReservStatus}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                                <input type="text" name="Abreviature" onChange={handleInputReservStatus} placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="Description"
                                                        onChange={handleInputReservStatus}
                                                        placeholder="Descrição"
                                                        className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4" />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>
                                                <textarea type="textarea" name="Ordenation" onChange={handleInputReservStatus} placeholder="Ordenação" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
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



            {formTypeModal === 20 && ( //market segment modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} className="z-50">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                    <form onSubmit={handleSubmitMarketSegment}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                                <input type="text" name="Abreviature" onChange={handleInputMarketSegment} placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="Description"
                                                        onChange={handleInputMarketSegment}
                                                        placeholder="Descrição"
                                                        className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4" />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>
                                                <textarea type="textarea" name="Ordenation" onChange={handleInputMarketSegment} placeholder="Ordenação" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
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


            {formTypeModal === 30 && ( // mercado modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} className="z-50">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                    <form onSubmit={handleSubmitMarket}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                                <input type="text" name="Abreviature" onChange={handleInputMarket} placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="Description"
                                                        onChange={handleInputMarket}
                                                        placeholder="Descrição"
                                                        className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4" />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>
                                                <textarea type="textarea" name="Ordenation" onChange={handleInputMarket} placeholder="Ordenação" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
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


            {formTypeModal === 40 && ( //forms of knowledge modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} className="z-50">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                    <form onSubmit={handleSubmitKnowledge}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                                <input type="text" name="Abreviature" onChange={handleInputKnowledge} placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="Description"
                                                        onChange={handleInputKnowledge}
                                                        placeholder="Descrição"
                                                        className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4" />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>
                                                <textarea type="textarea" name="Ordenation" onChange={handleInputKnowledge} placeholder="Ordenação" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
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


            {formTypeModal === 50 && ( //reservation motive
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} className="z-50">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                    <form onSubmit={handleSubmitReservMotive}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                                <input type="text" name="Abreviature" onChange={handleInputReservMotive} placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="Description"
                                                        onChange={handleInputReservMotive}
                                                        placeholder="Descrição"
                                                        className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4" />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>
                                                <textarea type="textarea" name="Details" onChange={handleInputReservMotive} placeholder="Detalhe" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
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


            {formTypeModal === 60 && ( //replacement code modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} className="z-50">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                    <form onSubmit={handleSubmitReplaceCode}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                                <input type="text" name="Abreviature" onChange={handleInputReplaceCode} placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="Description"
                                                        onChange={handleInputReplaceCode}
                                                        placeholder="Descrição"
                                                        className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4" />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>
                                                <textarea type="textarea" name="Ordenation" onChange={handleInputReplaceCode} placeholder="Ordenação" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
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

            {formTypeModal === 70 && ( //razao cancelamento
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} className="z-50">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                    <form onSubmit={handleSubmitCancelReason}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                                <input type="text" name="Abreviature" onChange={handleInputCancelReason} placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="Description"
                                                        onChange={handleInputCancelReason}
                                                        placeholder="Descrição"
                                                        className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4" />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>
                                                <textarea type="textarea" name="Details" onChange={handleInputCancelReason} placeholder="Detalhe" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
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

            {formTypeModal === 80 && ( //transfers modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} className="z-50">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                    <form onSubmit={handleSubmitTransfer}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                                <input type="text" name="shortName" onChange={handleInputTransfer} placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        onChange={handleInputTransfer}
                                                        placeholder="Descrição"
                                                        className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4" />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>
                                                <textarea type="textarea" name="class" onChange={handleInputTransfer} placeholder="Detalhe" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
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

            {formTypeModal === 90 && ( //reservation change modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} className="z-50">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                    <form onSubmit={handleSubmitReservChange}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                                <input type="text" name="Abreviature" onChange={handleInputReservChange} placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="Description"
                                                        onChange={handleInputReservChange}
                                                        placeholder="Descrição"
                                                        className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4" />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>
                                                <textarea type="textarea" name="Ordenation" onChange={handleInputReservChange} placeholder="Ordenação" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
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


            {formTypeModal === 100 && ( //tipo cancelamento
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} className="z-50">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                    <form onSubmit={handleSubmitCancelType}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                                <input type="text" name="Abreviature" onChange={handleInputCancelType} placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="Description"
                                                        onChange={handleInputCancelType}
                                                        placeholder="Descrição"
                                                        className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4" />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>
                                                <textarea type="textarea" name="Ordenation" onChange={handleInputCancelType} placeholder="Ordenação" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
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
        </>
    );
};

export default formModals;