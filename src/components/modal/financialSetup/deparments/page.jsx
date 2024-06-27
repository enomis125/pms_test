"use client"
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import { expansion } from "@/components/functionsForm/expansion/page";
import departmentInsert, { departmentEdit } from "@/components/functionsForm/CRUD/financialSetup/departments/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import ModalFooterContent from "@/components/modal/modalFooterContent";
import {useTranslations} from 'next-intl';


const departmentsForm = ({
    idDepartment,
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

    const { handleInputDepartments, handleSubmitDepartments } = departmentInsert();
    const { handleUpdateDepartments, setValuesDepartment, department } = departmentEdit(idDepartment);
    const { toggleExpand, setIsExpanded, isExpanded } = expansion();
    const t = useTranslations('Index');


    return (
        <>

            {formTypeModal === 11 && ( //department insert
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
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                        <form onSubmit={handleSubmitDepartments}>
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
                                                    label={t('financialSetup.departments.abreviature')}
                                                    ariaLabel={"Abreviatura"}
                                                    onChange={handleInputDepartments}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"description"}
                                                    name={"Description"}
                                                    label={t('financialSetup.departments.description')}
                                                    ariaLabel={"Descrição"}
                                                    onChange={handleInputDepartments}
                                                />

                                                <div>
                                                    <input id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                                    <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{t('financialSetup.departments.activeStatus')}</label>
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"order"}
                                                    name={"Order"}
                                                    label={t('financialSetup.departments.order')}
                                                    ariaLabel={"Ordem"}
                                                    onChange={handleInputDepartments}
                                                />

                                            </ModalBody>
                                        </form>
                                    </>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 12 && ( //department edit
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
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <form onSubmit={(e) => handleUpdateDepartments(e)}>
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
                                                label={t('financialSetup.departments.abreviature')}
                                                ariaLabel={"Abreviatura"}
                                                value={department.Abreviature}
                                                onChange={e => setValuesDepartment({ ...department, Abreviature: e.target.value })}
                                            />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"description"}
                                                name={"Description"}
                                                label={t('financialSetup.departments.description')}
                                                ariaLabel={"Descrição"}
                                                value={department.Description}
                                                onChange={e => setValuesDepartment({ ...department, Description: e.target.value })}
                                            />

                                            <div>
                                                <input id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                                <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{t('financialSetup.departments.activeStatus')}</label>
                                            </div>

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"order"}
                                                name={"Order"}
                                                label={t('financialSetup.departments.order')}
                                                ariaLabel={"Ordem"}
                                                value={department.Order}
                                                onChange={e => setValuesDepartment({ ...department, Order: e.target.value })}
                                            />

                                        </ModalBody>
                                    </form>
                                    <ModalFooterContent criado={criado} editado={editado} />
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}
        </>
    );
};

export default departmentsForm;