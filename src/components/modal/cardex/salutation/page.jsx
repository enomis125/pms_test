"use client"
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { AiOutlineGlobal } from "react-icons/ai";
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import salutationInsert, { salutationEdit } from "@/components/functionsForm/CRUD/cardex/salutation/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import { expansion } from "@/components/functionsForm/expansion/page";


const salutationForm = ({
    idSalutation,
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

    const { handleInputSalutation, handleSubmitSalutation } = salutationInsert();
    const { handleUpdateSalutation, setValuesSalutation, valuesSalutation } = salutationEdit(idSalutation);

    const { toggleExpand, setIsExpanded, isExpanded } = expansion();



    return (
        <>

            {formTypeModal === 11 && ( //salutation status insert
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
                                        <form onSubmit={handleSubmitSalutation}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">

                                                <div className="flex items-center">
                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"abreviature"}
                                                        name={"Abreviature"}
                                                        label={"Abreviatura"}
                                                        ariaLabel={"Abreviatura"}
                                                        onChange={handleInputSalutation} />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"description"}
                                                    name={"Description"}
                                                    label={"Descrição"}
                                                    ariaLabel={"Descrição"}
                                                    onChange={handleInputSalutation} />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"treat"}
                                                    name={"Treat"}
                                                    label={"Tratamento"}
                                                    ariaLabel={"Tratamento"}
                                                    onChange={handleInputSalutation} />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"gender"}
                                                    name={"Gender"}
                                                    label={"Trat.Pessoal"}
                                                    ariaLabel={"Trat.Pessoal"}
                                                    onChange={handleInputSalutation} />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"title"}
                                                    name={"Title"}
                                                    label={"Titulo"}
                                                    ariaLabel={"Titulo"}
                                                    onChange={handleInputSalutation} />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"ordenation"}
                                                    name={"Ordenation"}
                                                    label={"Ordenação"}
                                                    ariaLabel={"Ordenação"}
                                                    onChange={handleInputSalutation} />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"nameSuff"}
                                                    name={"NameSuff"}
                                                    label={"Nome-Suffix"}
                                                    ariaLabel={"Nome-Suffix"}
                                                    onChange={handleInputSalutation} />

                                                <div className="flex flex-row justify-left items-center">
                                                    <label className="mr-10">Tipo</label>
                                                    <div className="flex flex-row justify-center items-center mr-10">
                                                        <label className="mr-2">Nome</label>
                                                        <input type="radio" name="Gender" value="name"></input>
                                                    </div>
                                                    <div className="flex flex-row justify-center items-center mr-10">
                                                        <label className="mr-2">Primeiro Nome</label>
                                                        <input type="radio" name="FistName" value="name"></input>
                                                    </div>
                                                    <div className="flex flex-row justify-center items-center">
                                                        <label className="mr-2">Sem ext.</label>
                                                        <input type="radio" name="NoExt" value="name"></input>
                                                    </div>
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

            {formTypeModal === 12 && ( //salutation edit
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
                        isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} scrollBehavior="inside">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                        <form onSubmit={(e) => handleUpdateSalutation(e)}>
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

                                            <div className="flex items-center">
                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"abreviature"}
                                                        name={"Abreviature"}
                                                        label={"Abreviatura"}
                                                        ariaLabel={"Abreviatura"}
                                                        value={valuesSalutation.Abreviature}
                                                        onChange={e => setValuesSalutation({ ...valuesSalutation, Abreviature: e.target.value })} />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"description"}
                                                    name={"Description"}
                                                    label={"Descrição"}
                                                    ariaLabel={"Descrição"}
                                                    value={valuesSalutation.Description}
                                                    onChange={e => setValuesSalutation({ ...valuesSalutation, Description: e.target.value })} />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"treat"}
                                                    name={"Treat"}
                                                    label={"Tratamento"}
                                                    ariaLabel={"Tratamento"}
                                                     />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"gender"}
                                                    name={"Gender"}
                                                    label={"Trat.Pessoal"}
                                                    ariaLabel={"Trat.Pessoal"}
                                                    value={valuesSalutation.Gender}
                                                    onChange={e => setValuesSalutation({ ...valuesSalutation, Gender: e.target.value })} />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"title"}
                                                    name={"Title"}
                                                    label={"Titulo"}
                                                    ariaLabel={"Titulo"}
                                                    value={valuesSalutation.Title}
                                                    onChange={e => setValuesSalutation({ ...valuesSalutation, Title: e.target.value })} />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"ordenation"}
                                                    name={"Ordenation"}
                                                    label={"Ordenação"}
                                                    ariaLabel={"Ordenação"}
                                                    value={valuesSalutation.Ordenation}
                                                    onChange={e => setValuesSalutation({ ...valuesSalutation, Ordenation: e.target.value })} />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"nameSuff"}
                                                    name={"NameSuff"}
                                                    label={"Nome-Suffix"}
                                                    ariaLabel={"Nome-Suffix"}
                                                    onChange={handleInputSalutation} />

                                                <div className="flex flex-row justify-left items-center">
                                                    <label className="mr-10">Tipo</label>
                                                    <div className="flex flex-row justify-center items-center mr-10">
                                                        <label className="mr-2">Nome</label>
                                                        <input type="radio" value="name"></input>
                                                    </div>
                                                    <div className="flex flex-row justify-center items-center mr-10">
                                                        <label className="mr-2">Primeiro Nome</label>
                                                        <input type="radio" value="name"></input>
                                                    </div>
                                                    <div className="flex flex-row justify-center items-center">
                                                        <label className="mr-2">Sem ext.</label>
                                                        <input type="radio" value="name"></input>
                                                    </div>
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

export default salutationForm;