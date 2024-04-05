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
import { BsArrowRight } from "react-icons/bs";

import { expansion } from "@/components/functionsForm/expansion/page";

import IndividualForm from "../individuals/page";
import CountryAutocomplete from "@/components/functionsForm/autocomplete/country/page";
import LanguageAutocomplete from "@/components/functionsForm/autocomplete/language/page";


const companyForm = ({
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

    const { toggleExpand, setIsExpanded, isExpanded } = expansion();

    //variaveis de estilo para inputs
    const inputStyle = "border-b-2 border-gray-300 px-1 h-10 outline-none text-sm::placeholder my-2"
    const sharedLineInputStyle = "w-1/2 border-b-2 border-gray-300 px-1 h-10 outline-none my-2"

    return (
        <>

            {formTypeModal === 1 && ( //individuals insert
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
                                        <div className="h-1">
                                            <IndividualForm
                                                buttonName={"Particulares"}
                                                modalHeader={"Inserir Ficha de Cliente"}
                                                modalEditArrow={<BsArrowRight size={25} />}
                                                modalEdit={"Particular"}
                                                buttonColor={"transparent"}
                                                formTypeModal={0}
                                            />
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <input type="text" placeholder="Nome" className="w-1/2 border-b-2 border-gray-300 px-1 h-10 outline-none"></input>
                                            <input type="text" placeholder="Abreviatura" className="w-30 border-b-2 border-gray-300 px-1 h-10 outline-none"></input>
                                            <input type="text" placeholder="Tipo de Ficha" className="w-30 border-b-2 border-gray-300 px-1 h-10 outline-none"></input>
                                        </div>
                                        {/*primeira linha de comboboxs */}
                                        <div className="flex flex-row justify-around gap-4">
                                            <div className="flex flex-col w-1/4">
                                                <div className="bg-tableFooter py-1">
                                                    <h4 className="pl-5 text-black-300"><b>Geral</b></h4>
                                                </div>
                                                <input type="text" placeholder="Morada" className={inputStyle}></input>
                                                <input type="text" placeholder="Código-Postal" className={inputStyle}></input>
                                                <input type="text" placeholder="Localidade" className={inputStyle}></input>
                                                <input type="text" placeholder="Estado-Região" className={inputStyle}></input>
                                                <CountryAutocomplete label="País" style={"flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 h-10 my-2"}/>
                                            </div>
                                            <div className="flex flex-col w-1/4">
                                                <div className="bg-tableFooter py-1">
                                                    <h4 className="pl-5 text-black-300"><b>Info.</b></h4>
                                                </div>
                                                <input type="text" placeholder="E-mail Geral" className={inputStyle}></input>
                                                <input type="text" placeholder="E-mail Departamento" className={inputStyle}></input>
                                                <input type="text" placeholder="Telefone Geral" className={inputStyle}></input>
                                                <input type="text" placeholder="Telemóvel Dpartamento" className={inputStyle}></input>
                                                <input type="text" placeholder="URL" className={inputStyle}></input>
                                            </div>
                                            <div className="flex flex-col w-1/4">
                                                <div className="bg-tableFooter py-1">
                                                    <h4 className="pl-5 text-black-300"><b>Contato 1</b></h4>
                                                </div>
                                                <div className="flex flex-row gap-5">
                                                    <LanguageAutocomplete label={"Idioma"} style={"flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 h-10 my-2"}/>
                                                    <input type="text" placeholder="Saudação" className={sharedLineInputStyle}></input>
                                                </div>
                                                <div className="flex flex-row gap-5">
                                                    <input type="text" placeholder="Nome" className={sharedLineInputStyle}></input>
                                                    <input type="text" placeholder="Apelido" className={sharedLineInputStyle}></input>
                                                </div>
                                                <input type="text" placeholder="Departamento" className={inputStyle}></input>
                                                <input type="text" placeholder="Telemóvel" className={inputStyle}></input>
                                                <input type="text" placeholder="E-mail" className={inputStyle}></input>
                                            </div>
                                            <div className="flex flex-col w-1/4">
                                                <div className="bg-tableFooter py-1">
                                                    <h4 className="pl-5 text-black-300"><b>Contato 2</b></h4>
                                                </div>
                                                <div className="flex flex-row gap-5">
                                                    <LanguageAutocomplete label={"Idioma"} style={"flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 h-10 my-2"}/>
                                                    <input type="text" placeholder="Saudação" className={sharedLineInputStyle}></input>
                                                </div>
                                                <div className="flex flex-row gap-5">
                                                    <input type="text" placeholder="Nome" className={sharedLineInputStyle}></input>
                                                    <input type="text" placeholder="Apelido" className={sharedLineInputStyle}></input>
                                                </div>
                                                <input type="text" placeholder="Departamento" className={inputStyle}></input>
                                                <input type="text" placeholder="Telemóvel" className={inputStyle}></input>
                                                <input type="text" placeholder="E-mail" className={inputStyle}></input>
                                            </div>
                                        </div>
                                        {/*segunda linha de comboboxs */}
                                        <div className="flex flex-row justify-around gap-4">
                                            <div className="flex flex-col w-1/4">
                                                <div className="bg-tableFooter py-1">
                                                    <h4 className="pl-5 text-black-300"><b>Marketing</b></h4>
                                                </div>
                                                <input type="text" placeholder="Códigos" className={inputStyle}></input>
                                                <input type="text" placeholder="Mercados" className={inputStyle}></input>
                                                <input type="text" placeholder="Marketing" className={inputStyle}></input>
                                                <input type="text" placeholder="Enviado em:" className={inputStyle}></input>
                                            </div>
                                            <div className="flex flex-col w-1/4">
                                                <div className="bg-tableFooter py-1">
                                                    <h4 className="pl-5 text-black-300"><b>Class. empresarial</b></h4>
                                                </div>
                                                <input type="text" placeholder="Nr. Identificação Fiscal" className={inputStyle}></input>
                                                <input type="text" placeholder="Código CAE" className={inputStyle}></input>
                                                <input type="text" placeholder="Tabelas de preços" className={inputStyle}></input>
                                                <input type="text" placeholder="Preferências de quartos" className={inputStyle}></input>
                                            </div>
                                            <div className="flex flex-col w-1/4">
                                                <div className="bg-tableFooter py-1">
                                                    <h4 className="pl-5 text-black-300"><b>Notas</b></h4>
                                                </div>
                                                <input type="text" placeholder="Obs.1." className={inputStyle}></input>
                                                <input type="text" placeholder="" className={inputStyle}></input>
                                                <input type="text" placeholder="Obs.2." className={inputStyle}></input>
                                                <input type="text" placeholder="" className={inputStyle}></input>
                                            </div>
                                            <div className="flex flex-col w-1/4">
                                                <div className="bg-tableFooter py-1">
                                                    <h4 className="pl-5 text-black-300"><b>Anexos</b></h4>
                                                </div>
                                                <input type="text" placeholder="" className={inputStyle}></input>
                                            </div>
                                        </div>
                                    </ModalBody>

                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

        </>
    );
};

export default companyForm;