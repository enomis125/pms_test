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
import transferInsert, { transferEdit } from "@/components/functionsForm/CRUD/bookings/transfers/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import { expansion } from "@/components/functionsForm/expansion/page";
import ModalFooterContent from "@/components/modal/modalFooterContent";



const transferForm = ({
    idTransfer,
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

    const { handleInputTransfer, handleSubmitTransfer } = transferInsert();
    const { handleUpdateTransfer, setValuesTransfer, valuesTransfer } = transferEdit(idTransfer);
    const { toggleExpand, setIsExpanded, isExpanded } = expansion();



    return (
        <>

            {formTypeModal === 11 && ( //transfers insert
                <>
                    <Button onPress={onOpen} color={buttonColor} className="w-fit">
                        {buttonName} {buttonIcon}
                    </Button>
                    <Modal
                        isOpen={isOpen}
                        hideCloseButton={true}
                        onOpenChange={onOpenChange}
                        isDismissable={false}
                        isKeyboardDismissDisabled={true}
                        className="z-50"
                        size="xl"
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                        <form onSubmit={handleSubmitTransfer}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center'>
                                                    <Button color="transparent" onClick={() => { onClose(); window.location.reload(); }} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onClick={() => { onClose(); window.location.reload(); }}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"shortName"}
                                                    name={"shortName"}
                                                    label={t("bookings.pickUp.abreviature")}
                                                    ariaLabel={"Abreviatura"}
                                                    onChange={handleInputTransfer} />

                                                <div className="flex items-center">
                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"name"}
                                                        name={"name"}
                                                        label={t("bookings.pickUp.description")}
                                                        ariaLabel={"Descrição"}
                                                        onChange={handleInputTransfer} />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"class"}
                                                    name={"class"}
                                                    label={t("bookings.pickUp.details")}
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
                                                        {t("bookings.pickUp.status")}
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
            )
            }

            {
                formTypeModal === 12 && ( //transfers edit
                    <>
                       <Button fullWidth={true} size="md" onPress={onOpen} color={buttonColor} className="-h-3 flex justify-start -p-3">
                        {buttonName} {buttonIcon}
                    </Button>
                    <Modal
                        isOpen={isOpen}
                        hideCloseButton={true}
                        onOpenChange={onOpenChange}
                        isDismissable={false}
                        isKeyboardDismissDisabled={true}
                        className="z-50"
                        size="xl"
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                        <form onSubmit={(e) => handleUpdateTransfer(e)}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                                    <div className="flex flex-row justify-start gap-4">
                                                        {editIcon} {modalHeader} {modalEditArrow} {modalEdit}
                                                    </div>
                                                    <div className='flex flex-row items-center'>
                                                        <Button color="transparent" onClick={() => { onClose(); window.location.reload(); }} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                        <Button color="transparent" variant="light" onClick={() => { onClose(); window.location.reload(); }}><MdClose size={30} /></Button>
                                                    </div>
                                                </ModalHeader>
                                                <ModalBody className="flex flex-col mx-5 my-5 space-y-8">

                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"shortName"}
                                                        name={"shortName"}
                                                        label={t("bookings.pickUp.abreviature")}
                                                        ariaLabel={"Abreviatura"}
                                                        value={valuesTransfer.ShortName}
                                                        onChange={e => setValuesTransfer({ ...valuesTransfer, ShortName: e.target.value })} />


                                                    <div className="flex items-center">
                                                        <InputFieldControlled
                                                            type={"text"}
                                                            id={"name"}
                                                            name={"Name"}
                                                            label={t("bookings.pickUp.description")}
                                                            ariaLabel={"Descrição"}
                                                            value={valuesTransfer.Name}
                                                            onChange={e => setValuesTransfer({ ...valuesTransfer, Name: e.target.value })} />
                                                        <AiOutlineGlobal className="ml-auto text-xl" />
                                                    </div>

                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"class"}
                                                        name={"Class"}
                                                        label={t("bookings.pickUp.details")}
                                                        ariaLabel={"Detalhes"}
                                                        value={valuesTransfer.Class}
                                                        onChange={e => setValuesTransfer({ ...valuesTransfer, Class: e.target.value })} />

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
                                                            {t("bookings.pickUp.status")}
                                                        </label>
                                                    </div>
                                                </ModalBody>
                                            </form>
                                            <ModalFooterContent criado={criado} editado={editado} />
                                        </>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </>
                )
            }
        </>
    );
};

export default transferForm;