"use client"
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { useSearchParams, useRouter} from 'next/navigation';
import { usePathname } from "next/navigation";
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import { expansion } from "@/components/functionsForm/expansion/page";
import accountGroupInsert, { accountGroupsEdit } from "@/components/functionsForm/CRUD/financialSetup/accountGroups/page";


const accountGroupsForm = ({
    idAccountGroups,
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

    const { handleInputAccountGroups, handleSubmitAccountGroups } = accountGroupInsert();
    const { handleUpdateAccountGroups, setValuesAccountGroups, valuesAccountGroups } = accountGroupsEdit(idAccountGroups);
    const { toggleExpand, setIsExpanded, isExpanded } = expansion();



    return (
        <>

            {formTypeModal === 11 && ( //account groups insert
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
                                        <form onSubmit={handleSubmitAccountGroups}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                                <input type="text" name="Cod" onChange={handleInputAccountGroups} placeholder="Cod." className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                                <input type="text" name="Abreviature" onChange={handleInputAccountGroups} placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                                <input type="text" name="Description" onChange={handleInputAccountGroups} placeholder="Descrição" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                                <textarea type="textarea" name="Order" onChange={handleInputAccountGroups} placeholder="Ordem" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-10 px-4"></textarea>
                                            </ModalBody>
                                        </form>
                                    </>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 12 && ( //account groups edit
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
                                    <form onSubmit={(e) => handleUpdateAccountGroups(e)}>
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
                                            <input type="text" value={valuesAccountGroups.Cod} onChange={e => setValuesAccountGroups({ ...valuesAccountGroups, Cod: e.target.value })} placeholder="Cod." className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                            <input type="text" value={valuesAccountGroups.Abreviature} onChange={e => setValuesAccountGroups({ ...valuesAccountGroups, Abreviature: e.target.value })} placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                            <input type="text" value={valuesAccountGroups.Description} onChange={e => setValuesAccountGroups({ ...valuesAccountGroups, Description: e.target.value })} placeholder="Descrição" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                            <textarea type="textarea" value={valuesAccountGroups.Order} onChange={e => setValuesAccountGroups({ ...valuesAccountGroups, Order: e.target.value })} placeholder="Ordem" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-10 px-4"></textarea>
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

export default accountGroupsForm;