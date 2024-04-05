"use client"
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { AiOutlineGlobal } from "react-icons/ai";
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import nationalityInsert, { nationalityEdit } from "@/components/functionsForm/CRUD/cardex/nationality/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import { expansion } from "@/components/functionsForm/expansion/page";


const nationalityForm = ({
    idNacionality,
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

    const { handleInputNacionality, handleSubmitNacionality } = nationalityInsert();
    const { handleUpdateNationality, setValuesNationality, valuesNacionality } = nationalityEdit(idNacionality);

    const { toggleExpand, setIsExpanded, isExpanded } = expansion();



    return (
        <>

            {formTypeModal === 11 && ( //Nationality insert
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
                        isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} scrollBehavior="inside">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                        <form onSubmit={handleSubmitNacionality}>
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
                                                        id={"Fo"}
                                                        name={"Fo"}
                                                        label={"Detalhes"}
                                                        ariaLabel={"Detalhes"}
                                                        onChange={handleInputNacionality} />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"nation"}
                                                    name={"Nation"}
                                                    label={"País"}
                                                    ariaLabel={"País"}
                                                    onChange={handleInputNacionality} />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"nationality"}
                                                    name={"Nationality"}
                                                    label={"Nacionalidade"}
                                                    ariaLabel={"Nacionalidade"}
                                                    onChange={handleInputNacionality} />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"statnr"}
                                                    name={"Statnr"}
                                                    label={"Número de Estatísticas"}
                                                    ariaLabel={"Número de Estatísticas"}
                                                    onChange={handleInputNacionality} />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"group"}
                                                    name={"Group"}
                                                    label={"Grupo"}
                                                    ariaLabel={"Grupo"}
                                                    onChange={handleInputNacionality} />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"ordenation"}
                                                    name={"Ordenation"}
                                                    label={"Ordenação"}
                                                    ariaLabel={"Ordenação"}
                                                    onChange={handleInputNacionality} />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"isocode"}
                                                    name={"Isocode"}
                                                    label={"Código ISO"}
                                                    ariaLabel={"Código ISO"}
                                                    onChange={handleInputNacionality} />

                                            </ModalBody>
                                        </form>
                                    </>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 12 && ( //Nationality edit
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
                                        <form onSubmit={(e) => handleUpdateNationality(e)}>
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
                                                        id={"Fo"}
                                                        name={"Fo"}
                                                        label={"Detalhes"}
                                                        ariaLabel={"Detalhes"}
                                                        value={valuesNacionality.Fo}
                                                        onChange={e => setValuesNationality({ ...valuesNacionality, Fo: e.target.value })} />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"nation"}
                                                    name={"Nation"}
                                                    label={"País"}
                                                    ariaLabel={"País"}
                                                    value={valuesNacionality.Nation}
                                                    onChange={e => setValuesNationality({ ...valuesNacionality, Nation: e.target.value })} />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"nationality"}
                                                    name={"Nationality"}
                                                    label={"Nacionalidade"}
                                                    ariaLabel={"Nacionalidade"}
                                                    value={valuesNacionality.Nationality}
                                                    onChange={e => setValuesNationality({ ...valuesNacionality, Nationality: e.target.value })} />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"statnr"}
                                                    name={"Statnr"}
                                                    label={"Número de Estatísticas"}
                                                    ariaLabel={"Número de Estatísticas"}
                                                    value={valuesNacionality.Statnr}
                                                    onChange={e => setValuesNationality({ ...valuesNacionality, Statnr: e.target.value })} />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"group"}
                                                    name={"Group"}
                                                    label={"Grupo"}
                                                    ariaLabel={"Grupo"}
                                                    value={valuesNacionality.Group}
                                                    onChange={e => setValuesNationality({ ...valuesNacionality, Group: e.target.value })} />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"ordenation"}
                                                    name={"Ordenation"}
                                                    label={"Ordenação"}
                                                    ariaLabel={"Ordenação"}
                                                    value={valuesNacionality.Ordenation}
                                                    onChange={e => setValuesNationality({ ...valuesNacionality, Ordenation: e.target.value })} />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"isocode"}
                                                    name={"Isocode"}
                                                    label={"Código ISO"}
                                                    ariaLabel={"Código ISO"}
                                                    value={valuesNacionality.Isocode}
                                                    onChange={e => setValuesNationality({ ...valuesNacionality, Isocode: e.target.value })} />

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

export default nationalityForm;