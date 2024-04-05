"use client"
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import { AiOutlineGlobal } from "react-icons/ai";
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { MdClose } from "react-icons/md";
//imports de funções
import transferInsert from "@/components/functionsForm/CRUD/bookings/transfers/page";
import reservationStatusInsert from "@/components/functionsForm/CRUD/bookings/reservationStatus/page";
import reserveMotiveInsert from "@/components/functionsForm/CRUD/bookings/reserveMotive/page";
import replacementCodeInsert from "@/components/functionsForm/CRUD/bookings/replacementCode/page";
import marketSegmentsInsert from "@/components/functionsForm/CRUD/bookings/marketSegments/page";
import marketInsert from "@/components/functionsForm/CRUD/bookings/market/page";
import formsKnowledgeInsert from "@/components/functionsForm/CRUD/bookings/formsKnowledge/page";
import cancelTypeInsert from "@/components/functionsForm/CRUD/bookings/cancelType/page";
import cancelReasonInsert from "@/components/functionsForm/CRUD/bookings/cancelReason/page";
import reserveChangeInsert from "@/components/functionsForm/CRUD/bookings/reserveChange/page";


/*
os modals encontram-se identificados por numeros de 2 digitos, sendo o ultimo digito um indicador de modal ou full screen:
0 - mmodal
1 - full screen (inserir)
2 - full screen (editar)
(REMOVER AO CONCLUIR O PROJETO)
*/

const formModals = ({
    buttonName,
    modalHeader,
    formTypeModal,
}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();


    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    //funções de inserir e editar
    const { handleInputCancelReason, handleSubmitCancelReason } = cancelReasonInsert();
    const { handleInputCancelType, handleSubmitCancelType } = cancelTypeInsert();
    const { handleInputKnowledge, handleSubmitKnowledge } = formsKnowledgeInsert();
    const { handleInputMarket, handleSubmitMarket } = marketInsert();
    const { handleInputMarketSegment, handleSubmitMarketSegment } = marketSegmentsInsert();
    const { handleInputReplaceCode, handleSubmitReplaceCode } = replacementCodeInsert();
    const { handleInputReservChange, handleSubmitReservChange } = reserveChangeInsert();
    const { handleInputReservMotive, handleSubmitReservMotive } = reserveMotiveInsert();
    const { handleInputReservStatus, handleSubmitReservStatus } = reservationStatusInsert();
    const { handleInputTransfer, handleSubmitTransfer } = transferInsert();

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

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"abreviature"}
                                                    name={"Abreviature"}
                                                    label={"Abreviatura"}
                                                    ariaLabel={"Abreviatura"}
                                                    onChange={handleInputReservStatus} />

                                                <div className="flex items-center">
                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"description"}
                                                        name={"Description"}
                                                        label={"Descrição"}
                                                        ariaLabel={"Descrição"}
                                                        onChange={handleInputReservStatus} />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"ordenation"}
                                                    name={"Ordenation"}
                                                    label={"Ordenação"}
                                                    ariaLabel={"Ordenação"}
                                                    onChange={handleInputReservStatus} />

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

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"abreviature"}
                                                    name={"Abreviature"}
                                                    label={"Abreviatura"}
                                                    ariaLabel={"Abreviatura"}
                                                    onChange={handleInputMarketSegment} />

                                                <div className="flex items-center">
                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"description"}
                                                        name={"Description"}
                                                        label={"Descrição"}
                                                        ariaLabel={"Descrição"}
                                                        onChange={handleInputMarketSegment} />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"ordenation"}
                                                    name={"Ordenation"}
                                                    label={"Ordenação"}
                                                    ariaLabel={"Ordenação"}
                                                    nChange={handleInputMarketSegment} />

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

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"abreviature"}
                                                    name={"Abreviature"}
                                                    label={"Abreviatura"}
                                                    ariaLabel={"Abreviatura"}
                                                    onChange={handleInputMarket} />

                                                <div className="flex items-center">
                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"description"}
                                                        name={"Description"}
                                                        label={"Descrição"}
                                                        ariaLabel={"Descrição"}
                                                        onChange={handleInputMarket} />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"ordenation"}
                                                    name={"Ordenation"}
                                                    label={"Ordenação"}
                                                    ariaLabel={"Ordenação"}
                                                    onChange={handleInputMarket} />

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

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"abreviature"}
                                                    name={"Abreviature"}
                                                    label={"Abreviatura"}
                                                    ariaLabel={"Abreviatura"}
                                                    onChange={handleInputKnowledge} />

                                                <div className="flex items-center">
                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"description"}
                                                        name={"Description"}
                                                        label={"Descrição"}
                                                        ariaLabel={"Descrição"}
                                                        onChange={handleInputKnowledge} />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"ordenation"}
                                                    name={"Ordenation"}
                                                    label={"Ordenação"}
                                                    ariaLabel={"Ordenação"}
                                                    onChange={handleInputKnowledge} />

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

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"abreviature"}
                                                    name={"Abreviature"}
                                                    label={"Abreviatura"}
                                                    ariaLabel={"Abreviatura"}
                                                    onChange={handleInputReservMotive} />

                                                <div className="flex items-center">
                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"description"}
                                                        name={"Description"}
                                                        label={"Descrição"}
                                                        ariaLabel={"Descrição"}
                                                        onChange={handleInputReservMotive} />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"details"}
                                                    name={"Details"}
                                                    label={"Ordenação"}
                                                    ariaLabel={"Ordenação"}
                                                    onChange={handleInputReservMotive} />

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
                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"abreviature"}
                                                    name={"Abreviature"}
                                                    label={"Abreviatura"}
                                                    ariaLabel={"Abreviatura"}
                                                    onChange={handleInputReplaceCode} />

                                                <div className="flex items-center">
                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"description"}
                                                        name={"Description"}
                                                        label={"Descrição"}
                                                        ariaLabel={"Descrição"}
                                                        onChange={handleInputReplaceCode} />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"ordenation"}
                                                    name={"Ordenation"}
                                                    label={"Ordenação"}
                                                    ariaLabel={"Ordenação"}
                                                    onChange={handleInputReplaceCode} />

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

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"abreviature"}
                                                    name={"Abreviature"}
                                                    label={"Abreviatura"}
                                                    ariaLabel={"Abreviatura"}
                                                    onChange={handleInputCancelReason} />

                                                <div className="flex items-center">
                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"description"}
                                                        name={"Description"}
                                                        label={"Descrição"}
                                                        ariaLabel={"Descrição"}
                                                        onChange={handleInputCancelReason} />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"details"}
                                                    name={"Details"}
                                                    label={"Detalhes"}
                                                    ariaLabel={"Detalhes"}
                                                    onChange={handleInputCancelReason} />

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

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"shortName"}
                                                    name={"shortName"}
                                                    label={"Abreviatura"}
                                                    ariaLabel={"Abreviatura"}
                                                    onChange={handleInputTransfer} />

                                                <div className="flex items-center">
                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"name"}
                                                        name={"name"}
                                                        label={"Descrição"}
                                                        ariaLabel={"Descrição"}
                                                        onChange={handleInputTransfer} />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"class"}
                                                    name={"class"}
                                                    label={"Detalhes"}
                                                    ariaLabel={"Detalhes"}
                                                    onChange={handleInputTransfer} />

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

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"abreviature"}
                                                    name={"Abreviature"}
                                                    label={"Abreviatura"}
                                                    ariaLabel={"Abreviatura"}
                                                    onChange={handleInputReservChange} />

                                                <div className="flex items-center">
                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"description"}
                                                        name={"Description"}
                                                        label={"Descrição"}
                                                        ariaLabel={"Descrição"}
                                                        onChange={handleInputReservChange} />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"ordenation"}
                                                    name={"Ordenation"}
                                                    label={"Ordenação"}
                                                    ariaLabel={"Ordenação"}
                                                    onChange={handleInputReservChange} />

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

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"abreviature"}
                                                    name={"Abreviature"}
                                                    label={"Abreviatura"}
                                                    ariaLabel={"Abreviatura"}
                                                    onChange={handleInputCancelType} />

                                                <div className="flex items-center">
                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"description"}
                                                        name={"Description"}
                                                        label={"Descrição"}
                                                        ariaLabel={"Descrição"}
                                                        onChange={handleInputCancelType} />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"ordenation"}
                                                    name={"Ordenation"}
                                                    label={"Ordenação"}
                                                    ariaLabel={"Ordenação"}
                                                    onChange={handleInputCancelType} />

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