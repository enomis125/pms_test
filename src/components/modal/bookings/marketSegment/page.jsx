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
import marketSegmentsInsert, { marketSegmentsEdit } from "@/components/functionsForm/CRUD/bookings/marketSegments/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import { expansion } from "@/components/functionsForm/expansion/page";
import ModalFooterContent from "@/components/modal/modalFooterContent";
import {useTranslations} from 'next-intl';


const marketSegmentForm = ({
    idMarketSegment,
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

    const t = useTranslations('Index');

    const { handleInputMarketSegment, handleSubmitMarketSegment } = marketSegmentsInsert();
    const { handleUpdateMarketSegment, setValuesMarketSegment, valuesMarketSegment } = marketSegmentsEdit(idMarketSegment);
    const { toggleExpand, setIsExpanded, isExpanded } = expansion();



    return (
        <>

            {formTypeModal === 11 && ( //origens mercado insert
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
                                        <form onSubmit={handleSubmitMarketSegment}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onClick={() => { onClose(); window.location.reload(); }} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                    <Button color="transparent" variant="light" onClick={() => { onClose(); window.location.reload(); }}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"abreviature"}
                                                    name={"Abreviature"}
                                                    label={t('bookings.marketSegments.abreviature')}
                                                    ariaLabel={"Abreviatura"}
                                                    onChange={handleInputMarketSegment} />

                                                <div className="flex items-center">
                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"description"}
                                                        name={"Description"}
                                                        label={t('bookings.marketSegments.description')}
                                                        ariaLabel={"Descrição"}
                                                        onChange={handleInputMarketSegment} />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"ordenation"}
                                                    name={"Ordenation"}
                                                    label={t('bookings.marketSegments.order')}
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
                                                        {t('bookings.marketSegments.status')}
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

            {formTypeModal === 12 && ( //segmentos mercado edit
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
                                        <form onSubmit={(e) => handleUpdateMarketSegment(e)}>
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

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"abreviature"}
                                                    name={"Abreviature"}
                                                    label={t('bookings.marketSegments.abreviature')}
                                                    ariaLabel={"Abreviatura"}
                                                    value={valuesMarketSegment.Abreviature}
                                                    onChange={e => setValuesMarketSegment({ ...valuesMarketSegment, Abreviature: e.target.value })} />

                                                <div className="flex items-center">
                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"description"}
                                                        name={"Description"}
                                                        label={t('bookings.marketSegments.description')}
                                                        ariaLabel={"Descrição"}
                                                        value={valuesMarketSegment.Description}
                                                        onChange={e => setValuesMarketSegment({ ...valuesMarketSegment, Description: e.target.value })} />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"ordenation"}
                                                    name={"Ordenation"}
                                                    label={t('bookings.marketSegments.order')}
                                                    ariaLabel={"Ordenação"}
                                                    value={valuesMarketSegment.Ordenation}
                                                    onChange={e => setValuesMarketSegment({ ...valuesMarketSegment, Ordenation: e.target.value })} />

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
                                                        {t('bookings.marketSegments.status')}
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
            )}
        </>
    );
};

export default marketSegmentForm;