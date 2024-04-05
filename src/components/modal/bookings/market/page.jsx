"use client"
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { AiOutlineGlobal } from "react-icons/ai";
import { useSearchParams, useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import marketInsert, { marketEdit } from "@/components/functionsForm/CRUD/bookings/market/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import { expansion } from "@/components/functionsForm/expansion/page";


const marketForm = ({
    idMarket,
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

    const { handleInputMarket, handleSubmitMarket } = marketInsert();
    const { handleUpdateMarket, setValuesMarket, valuesMarket } = marketEdit(idMarket);
    const { toggleExpand, setIsExpanded, isExpanded } = expansion();



    return (
        <>

            {formTypeModal === 11 && ( // mercado insert
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
                                        <form onSubmit={handleSubmitMarket}>
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

            {formTypeModal === 12 && ( //origens mercado edit
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
                                    <>
                                        <form onSubmit={(e) => handleUpdateMarket(e)}>
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
                                                    id={"abreviature"}
                                                    name={"Abreviature"}
                                                    label={"Abreviatura"}
                                                    ariaLabel={"Abreviatura"}
                                                    value={valuesMarket.Abreviature}
                                                    onChange={e => setValuesMarket({ ...valuesMarket, Abreviature: e.target.value })} />

                                                <div className="flex items-center">
                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"description"}
                                                        name={"Description"}
                                                        label={"Descrição"}
                                                        ariaLabel={"Descrição"}
                                                        value={valuesMarket.Description}
                                                        onChange={e => setValuesMarket({ ...valuesMarket, Description: e.target.value })} />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"ordenation"}
                                                    name={"Ordenation"}
                                                    label={"Ordenação"}
                                                    ariaLabel={"Ordenação"}
                                                    value={valuesMarket.Ordenation}
                                                    onChange={e => setValuesMarket({ ...valuesMarket, Ordenation: e.target.value })} />

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
                                        <ModalFooter className="absolute bottom-0 left-0 flex flex-row text-right bg-tableFooter border border-tableFooterBorder w-full text-gray-600 text-xs">
                                            <p>Criado em {`${new Date(criado).toLocaleDateString()} : Teste`}</p>
                                            {criado !== editado && (
                                                <div>
                                                    <p>Editado em {`${new Date(editado).toLocaleDateString()} : Teste`}</p>
                                                </div>
                                            )}
                                        </ModalFooter>
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

export default marketForm;