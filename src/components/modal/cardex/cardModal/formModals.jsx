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
import { vipCode } from "@/components/functionsForm/CRUD/cardex/vipCode/page";
import { marketing } from "@/components/functionsForm/CRUD/cardex/marketing/page";
import { members } from "@/components/functionsForm/CRUD/cardex/members/page";
import { doctypes } from "@/components/functionsForm/CRUD/cardex/doctypes/page";
import { clientPreferences } from "@/components/functionsForm/CRUD/cardex/clientPreferences/page";
import { knowledgeMethod } from "@/components/functionsForm/CRUD/cardex/knowledgeMethod/page";
import { profession } from "@/components/functionsForm/CRUD/cardex/profession/page";
import { nationality } from "@/components/functionsForm/CRUD/cardex/nationality/page";
import { salutation } from "@/components/functionsForm/CRUD/cardex/salutation/page";
import { expansion } from "@/components/functionsForm/expansion/page";


/*
os modals encontram-se identificados por numeros de 2 digitos, sendo o ultimo digito um indicador de modal ou full screen:
0 - mmodal
1 - full screen (inserir)
2 - full screen (editar)
(REMOVER AO CONCLUIR O PROJETO)
*/

const formModals = ({ idSalutation, idNacionality, idProfession, idKnowledgeMethod, idDoctypes, idCustomerPreferences, idMember, idMarketing, idVipcode,
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
    const { handleInputSalutation , handleSubmitSalutation, handleUpdateSalutation, setValuesSalutation, valuesSalutation } = salutation(idSalutation);
    const { handleInputNacionality, handleSubmitNacionality, handleUpdateNationality, setValuesNationality, valuesNacionality } = nationality(idNacionality);
    const { handleInputProfession, handleSubmitProfession, handleUpdateProfession, setValuesProffesion, valuesProfession } = profession(idProfession);
    const { handleInputKnowledgeMethod, handleSubmitKnowledgeMethod, handleUpdateKnowledgeMethod, setValuesKnowledgeMethod, valuesKnowledgeMethod } = knowledgeMethod(idKnowledgeMethod);
    const { handleInputDoctypes, handleSubmitDoctypes, handleUpdateDoctypes, setValuesDoctypes, valuesDoctypes } = doctypes(idDoctypes);
    const { handleInputCustomerPreferences, handleSubmitCustomerPreferences, handleUpdateCustomerPreferences, setValuesCustomerPreferences, valuesCustomerPreferences } = clientPreferences(idCustomerPreferences);
    const { handleInputMember, handleSubmitMember, handleUpdateMember, setValuesMember, valuesMember } = members(idMember);
    const { handleInputMarketing, handleSubmitMarketing, handleUpdateMarketing, setValuesMarketing, valuesMarketing } = marketing(idMarketing);
    const { handleInputVipcode, handleSubmitVipcode, handleUpdateVipcode, setValuesVipcode, valuesVipcode } = vipCode(idVipcode);
    
    return (
        <>

            {formTypeModal === 10 && ( //salutation status modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} className="z-50">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                    <form onSubmit={handleSubmitSalutation}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                                <div className="flex flex-row items-center justify-center">
                                                    <input type="text" name="Abreviature" onChange={handleInputSalutation} placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-10 px-4"></input>
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="Description"
                                                    onChange={handleInputSalutation}
                                                    placeholder="Descrição"
                                                    className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4" />
                                                <input type="text" name="Treat" onChange={handleInputSalutation} placeholder="Tratamento" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
                                                <input type="text" name="Gender" onChange={handleInputSalutation} placeholder="Trat.Pessoal" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
                                                <input type="text" name="Title" onChange={handleInputSalutation} placeholder="Titulo" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
                                                <input type="text" name="Ordenation" onChange={handleInputSalutation} placeholder="Ordenação" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
                                                <input type="text" name="NameSuff" onChange={handleInputSalutation} placeholder="Nome-Suffix" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
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

            {formTypeModal === 20 && ( //Nationality modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} className="z-50">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                    <form onSubmit={handleSubmitNacionality}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                                <div className="flex flex-row items-center justify-center">
                                                    <input type="text" name="Fo" onChange={handleInputNacionality} placeholder="Detalhes" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-10 px-4"></input>
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="Nation"
                                                    onChange={handleInputNacionality}
                                                    placeholder="País"
                                                    className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4" />
                                                <input type="text" name="Nationality" onChange={handleInputNacionality} placeholder="Nacionalidade" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
                                                <input type="text" name="Statnr" onChange={handleInputNacionality} placeholder="Número de Estatísticas" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
                                                <input type="text" name="Group" onChange={handleInputNacionality} placeholder="Grupo" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
                                                <input type="text" name="Ordenation" onChange={handleInputNacionality} placeholder="Ordenação" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
                                                <input type="text" name="Isocode" onChange={handleInputNacionality} placeholder="Código ISO" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
                                            </ModalBody>
                                        </form>
                                    </>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}


            {formTypeModal === 30 && ( //knowledge modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} className="z-50">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                    <form onSubmit={handleSubmitKnowledgeMethod}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                                <input type="text" placeholder="Grupo" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="Abreviature"
                                                        onChange={handleInputKnowledgeMethod}
                                                        placeholder="Abreviatura"
                                                        className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4" />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>
                                                <textarea type="textarea" name="Description" onChange={handleInputKnowledgeMethod} placeholder="Descrição" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
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


            {formTypeModal === 40 && ( //profession modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                    <form onSubmit={handleSubmitProfession}>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                            <Input type="text" name="Group" onChange={handleInputProfession} variant="underlined" label="Grupo" />
                                            <Input type="text" name="Abreviature" onChange={handleInputProfession} variant="underlined" label="Abreviatura" />
                                            <Input type="textarea" name="Description" onChange={handleInputProfession} variant="underlined" label="Descrição" />
                                        </ModalBody>
                                    </form>
                                    </>
                                </>

                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 50 && ( //doctypes modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                    <form onSubmit={handleSubmitDoctypes}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                                <input type="text" placeholder="Grupo" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="ShortName"
                                                        onChange={handleInputDoctypes}
                                                        placeholder="Abreviatura"
                                                        className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4" />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>
                                                <textarea type="textarea" name="Name" onChange={handleInputDoctypes} placeholder="Descrição" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
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


            {formTypeModal === 60 && ( //client preference modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                    <form onSubmit={handleSubmitCustomerPreferences}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                                <input type="text" placeholder="Grupo" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="Abreviature"
                                                        onChange={handleInputCustomerPreferences}
                                                        placeholder="Abreviatura"
                                                        className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4" />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>
                                                <textarea type="textarea" name="Description" onChange={handleInputCustomerPreferences} placeholder="Descrição" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
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


            {formTypeModal === 70 && ( //members modal
                <>
                   <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                    <form onSubmit={handleSubmitMember}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                                <input type="text" placeholder="Grupo" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="Abreviature"
                                                        onChange={handleInputMember}
                                                        placeholder="Abreviatura"
                                                        className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4" />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>
                                                <textarea type="textarea" name="Description" onChange={handleInputMember} placeholder="Descrição" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
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


            {formTypeModal === 80 && ( //marketing modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                    <form onSubmit={handleSubmitMarketing}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                                <input type="text" placeholder="Grupo" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="Abreviature"
                                                        onChange={handleInputMarketing}
                                                        placeholder="Abreviatura"
                                                        className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4" />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>
                                                <textarea type="textarea" name="Description" onChange={handleInputMarketing} placeholder="Descrição" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
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

            {formTypeModal === 90 && ( //vip code modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                    <form onSubmit={handleSubmitVipcode}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                                <input type="text" placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="Description"
                                                        onChange={handleInputVipcode}
                                                        placeholder="Descrição"
                                                        className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4" />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>
                                                <textarea type="textarea" placeholder="Detalhe" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
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