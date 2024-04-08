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

import CompanyForm from "../companys/page";
import CountryAutocomplete from "@/components/functionsForm/autocomplete/country/page";
import LanguageAutocomplete from "@/components/functionsForm/autocomplete/language/page";
//import GenderAutocomplete from "@/components/functionsForm/autocomplete/gender/page";

import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";

const individualForm = ({
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

            {formTypeModal === 0 && ( //individuals insert
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
                                            <CompanyForm
                                                buttonName={"Empresas"}
                                                modalHeader={"Inserir Ficha de Cliente"}
                                                modalEditArrow={<BsArrowRight size={25} />}
                                                modalEdit={"Empresa"}
                                                buttonColor={"transparent"}
                                                formTypeModal={1}
                                            />
                                        </div>
                                        <div className="flex flex-row justify-between items-center">
                                            <InputFieldControlled
                                                type={"text"}
                                                id={"name"}
                                                name={"Name"}
                                                label={"Nome"}
                                                ariaLabel={"Nome"}
                                                style={"w-1/3 border-b-2 border-gray-300 px-1 h-10 outline-none"}
                                            />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"surname"}
                                                name={"Surname"}
                                                label={"Apelido"}
                                                ariaLabel={"Apelido"}
                                                style={"w-30 border-b-2 border-gray-300 px-1 h-10 outline-none"}
                                            />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"salutation"}
                                                name={"Salutation"}
                                                label={"Saudação"}
                                                ariaLabel={"Saudação"}
                                                style={"w-30 border-b-2 border-gray-300 px-1 h-10 outline-none"}
                                            />

                                            <LanguageAutocomplete label={"Idioma"} style={""} />
                                        </div>
                                        {/*primeira linha de comboboxs */}
                                        <div className="flex flex-row justify-around gap-4">
                                            <div className="flex flex-col w-1/5">
                                                <div className="bg-tableFooter py-1">
                                                    <h4 className="pl-5 text-black-300"><b>Endereço</b></h4>
                                                </div>
                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"address"}
                                                    name={"Address"}
                                                    label={"Morada"}
                                                    ariaLabel={"Morada"}
                                                    style={inputStyle}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"zipCode"}
                                                    name={"ZipCode"}
                                                    label={"Código-Postal"}
                                                    ariaLabel={"Código-Postal"}
                                                    style={inputStyle}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"local"}
                                                    name={"Local"}
                                                    label={"Localidade"}
                                                    ariaLabel={"Localidade"}
                                                    style={inputStyle}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"region"}
                                                    name={"Region"}
                                                    label={"Estado-Região"}
                                                    ariaLabel={"Estado-Região"}
                                                    style={inputStyle}
                                                />

                                                <div className="w-full flex flex-col gap-4">
                                                    <CountryAutocomplete label="País" style={"flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 h-10 my-2"} />
                                                </div>
                                            </div>
                                            <div className="flex flex-col w-1/5">
                                                <div className="bg-tableFooter py-1">
                                                    <h4 className="pl-5 text-black-300"><b>Contatos</b></h4>
                                                </div>
                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"personalEmail"}
                                                    name={"PersonalEmail"}
                                                    label={"E-mail Pessoal"}
                                                    ariaLabel={"E-mail Pessoal"}
                                                    style={inputStyle}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"workEmail"}
                                                    name={"WorkEmail"}
                                                    label={"E-mail Trabalho"}
                                                    ariaLabel={"E-mail Trabalho"}
                                                    style={inputStyle}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"personalPhone"}
                                                    name={"PersonalPhone"}
                                                    label={"Telemóvel Pessoal"}
                                                    ariaLabel={"Telemóvel Pessoal"}
                                                    style={inputStyle}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"workPhone"}
                                                    name={"WorkPhone"}
                                                    label={"Telemóvel Trabalho"}
                                                    ariaLabel={"Telemóvel Trabalho"}
                                                    style={inputStyle}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"house"}
                                                    name={"House"}
                                                    label={"Casa"}
                                                    ariaLabel={"Casa"}
                                                    style={inputStyle}
                                                />

                                            </div>
                                            <div className="flex flex-col w-1/5">
                                                <div className="bg-tableFooter py-1">
                                                    <h4 className="pl-5 text-black-300"><b>Dados Pessoais</b></h4>
                                                </div>
                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"birthday"}
                                                    name={"Birthday"}
                                                    label={"Data de Nascimento"}
                                                    ariaLabel={"Data de Nascimento"}
                                                    style={inputStyle}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"birthdayLocal"}
                                                    name={"BirthdayLocal"}
                                                    label={"Local de Nascimento"}
                                                    ariaLabel={"Local de Nascimento"}
                                                    style={inputStyle}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"natural"}
                                                    name={"Natural"}
                                                    label={"Naturalidade"}
                                                    ariaLabel={"Naturalidade"}
                                                    style={inputStyle}
                                                />

                                                <CountryAutocomplete label="Nacionalidade" style={"flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 h-10 my-2"} />
                                                {/*<GenderAutocomplete label="Género" style={"flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 h-10 my-2"}/>*/}
                                            </div>
                                            <div className="flex flex-col w-1/5">
                                                <div className="bg-tableFooter py-1">
                                                    <h4 className="pl-5 text-black-300"><b>Informação Adicional</b></h4>
                                                </div>
                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"citizenCard"}
                                                    name={"CC"}
                                                    label={"Cartão de Cidadão"}
                                                    ariaLabel={"Cartão de Cidadão"}
                                                    style={inputStyle}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"issuedOn"}
                                                    name={"IssuedOn"}
                                                    label={"Emitido em:"}
                                                    ariaLabel={"Emitido em:"}
                                                    style={inputStyle}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"expiredOn"}
                                                    name={"ExperiedOn"}
                                                    label={"Expira em:"}
                                                    ariaLabel={"Expira em:"}
                                                    style={inputStyle}
                                                />

                                                <CountryAutocomplete label="País de emissão" style={"flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 h-10 my-2"} />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"fiscalNumber"}
                                                    name={"FiscalNumber"}
                                                    label={"Nr. Identificação fiscal"}
                                                    ariaLabel={"Nr. Identificação fiscal"}
                                                    style={inputStyle}
                                                />

                                            </div>
                                            <div className="flex flex-col w-1/5">
                                                <div className="bg-tableFooter py-1">
                                                    <h4 className="pl-5 text-black-300"><b>Dados Faturação</b></h4>
                                                </div>
                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"company"}
                                                    name={"Company"}
                                                    label={"Empresa"}
                                                    ariaLabel={"Empresa"}
                                                    style={inputStyle}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"fiscalNumber"}
                                                    name={"FiscalNumber"}
                                                    label={"Nr. Identificação fiscal"}
                                                    ariaLabel={"Nr. Identificação fiscal"}
                                                    style={inputStyle}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"address"}
                                                    name={"Address"}
                                                    label={"Morada"}
                                                    ariaLabel={"Morada"}
                                                    style={inputStyle}
                                                />

                                                <div className="flex flex-row gap-5">
                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"zipCode"}
                                                        name={"ZipCode"}
                                                        label={"Cod.-Postal"}
                                                        ariaLabel={"Cod.-Postal"}
                                                        style={sharedLineInputStyle}
                                                    />

                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"local"}
                                                        name={"Local"}
                                                        label={"Localidade"}
                                                        ariaLabel={"Localidade"}
                                                        style={sharedLineInputStyle}
                                                    />

                                                </div>
                                                <CountryAutocomplete label="País" style={"flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 h-10 my-2"} />
                                            </div>
                                        </div>
                                        {/*segunda linha de comboboxs */}
                                        <div className="flex flex-row justify-around gap-4">
                                            <div className="flex flex-col w-1/5">
                                                <div className="bg-tableFooter py-1">
                                                    <h4 className="pl-5 text-black-300"><b>Marketing</b></h4>
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"code"}
                                                    name={"Code"}
                                                    label={"Códigos"}
                                                    ariaLabel={"Códigos"}
                                                    style={inputStyle}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"market"}
                                                    name={"Market"}
                                                    label={"Mercados"}
                                                    ariaLabel={"Mercados"}
                                                    style={inputStyle}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"marketing"}
                                                    name={"Marketing"}
                                                    label={"Marketing"}
                                                    ariaLabel={"Marketing"}
                                                    style={inputStyle}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"sentOn"}
                                                    name={"SentOn"}
                                                    label={"Enviado em:"}
                                                    ariaLabel={"Enviado em:"}
                                                    style={inputStyle}
                                                />

                                            </div>
                                            <div className="flex flex-col w-1/5">
                                                <div className="bg-tableFooter py-1">
                                                    <h4 className="pl-5 text-black-300"><b>Class. empresarial</b></h4>
                                                </div>
                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"vipCode"}
                                                    name={"VIPCode"}
                                                    label={"Código VIP"}
                                                    ariaLabel={"Código VIP"}
                                                    style={inputStyle}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"profession"}
                                                    name={"Profession"}
                                                    label={"Profissão"}
                                                    ariaLabel={"Profissão"}
                                                    style={inputStyle}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"PriceTable"}
                                                    name={"PriceTable"}
                                                    label={"Tabelas de preços"}
                                                    ariaLabel={"Tabelas de preços"}
                                                    style={inputStyle}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"roomPreference"}
                                                    name={"RoomPreference"}
                                                    label={"Preferências de quartos"}
                                                    ariaLabel={"Preferências de quartos"}
                                                    style={inputStyle}
                                                />

                                            </div>
                                            <div className="flex flex-col w-1/5">
                                                <div className="bg-tableFooter py-1">
                                                    <h4 className="pl-5 text-black-300"><b>Membros</b></h4>
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"process"}
                                                    name={"Process"}
                                                    label={"Processo"}
                                                    ariaLabel={"Processo"}
                                                    style={inputStyle}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"subscription"}
                                                    name={"Subscription"}
                                                    label={"Subscrição"}
                                                    ariaLabel={"Subscrição"}
                                                    style={inputStyle}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"admittedOn"}
                                                    name={"AdmittedOn"}
                                                    label={"Admitido em:"}
                                                    ariaLabel={"Admitido em:"}
                                                    style={inputStyle}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"experiedOn"}
                                                    name={"ExperiedOn"}
                                                    label={"Expira em:"}
                                                    ariaLabel={"Expira em:"}
                                                    style={inputStyle}
                                                />

                                            </div>
                                            <div className="flex flex-col w-1/5">
                                                <div className="bg-tableFooter py-1">
                                                    <h4 className="pl-5 text-black-300"><b>Notas</b></h4>
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"observation1"}
                                                    name={"Observation1"}
                                                    label={"Obs.1."}
                                                    ariaLabel={"Obs.1."}
                                                    style={inputStyle}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={""}
                                                    name={""}
                                                    label={""}
                                                    ariaLabel={""}
                                                    style={inputStyle}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"observation2"}
                                                    name={"Observation2"}
                                                    label={"Obs.2."}
                                                    ariaLabel={"Obs.2."}
                                                    style={inputStyle}
                                                />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={""}
                                                    name={""}
                                                    label={""}
                                                    ariaLabel={""}
                                                    style={inputStyle}
                                                />

                                            </div>
                                            <div className="flex flex-col w-1/5">
                                                <div className="bg-tableFooter py-1">
                                                    <h4 className="pl-5 text-black-300"><b>Anexos</b></h4>
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={""}
                                                    name={""}
                                                    label={""}
                                                    ariaLabel={""}
                                                    style={inputStyle}
                                                />

                                            </div>
                                        </div>
                                    </ModalBody>

                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 1 && ( //individuals insert
                <>
                    <Button onPress={onOpen} color={buttonColor} className="-h-3 flex justify-start -p-3">
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
                                            <CompanyForm
                                                buttonName={"Empresas"}
                                                modalHeader={"Inserir Ficha de Cliente"}
                                                modalEditArrow={<BsArrowRight size={25} />}
                                                modalEdit={"Empresa"}
                                                buttonColor={"transparent"}
                                                formTypeModal={1}
                                            />
                                        </div>
                                        <div className="flex flex-row justify-between items-center">
                                            <input type="text" placeholder="Nome" className="w-1/3 border-b-2 border-gray-300 px-1 h-10 outline-none"></input>
                                            <input type="text" placeholder="Apelido" className="w-30 border-b-2 border-gray-300 px-1 h-10 outline-none"></input>
                                            <input type="text" placeholder="Saudação" className="w-30 border-b-2 border-gray-300 px-1 h-10 outline-none"></input>
                                            <LanguageAutocomplete label={"Idioma"} />
                                        </div>
                                        {/*primeira linha de comboboxs */}
                                        <div className="flex flex-row justify-around gap-4">
                                            <div className="flex flex-col w-1/5">
                                                <div className="bg-tableFooter py-1">
                                                    <h4 className="pl-5 text-black-300"><b>Endereço</b></h4>
                                                </div>
                                                <input type="text" placeholder="Morada" className={inputStyle}></input>
                                                <input type="text" placeholder="Código-Postal" className={inputStyle}></input>
                                                <input type="text" placeholder="Localidade" className={inputStyle}></input>
                                                <input type="text" placeholder="Estado-Região" className={inputStyle}></input>
                                                <div className="w-full flex flex-col gap-4">
                                                    <CountryAutocomplete label="País" style={"flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 h-10 my-2"} />
                                                </div>
                                            </div>
                                            <div className="flex flex-col w-1/5">
                                                <div className="bg-tableFooter py-1">
                                                    <h4 className="pl-5 text-black-300"><b>Contatos</b></h4>
                                                </div>
                                                <input type="text" placeholder="E-mail Pessoal" className={inputStyle}></input>
                                                <input type="text" placeholder="E-mail Trabalho" className={inputStyle}></input>
                                                <input type="text" placeholder="Telemóvel Pessoal" className={inputStyle}></input>
                                                <input type="text" placeholder="Telemóvel Trabalho" className={inputStyle}></input>
                                                <input type="text" placeholder="Casa" className={inputStyle}></input>
                                            </div>
                                            <div className="flex flex-col w-1/5">
                                                <div className="bg-tableFooter py-1">
                                                    <h4 className="pl-5 text-black-300"><b>Dados Pessoais</b></h4>
                                                </div>
                                                <input type="text" placeholder="Data de Nascimento" className={inputStyle}></input>
                                                <input type="text" placeholder="Local de Nascimento" className={inputStyle}></input>
                                                <input type="text" placeholder="Naturalidade" className={inputStyle}></input>
                                                <CountryAutocomplete label="Nacionalidade" style={"flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 h-10 my-2"} />
                                                {/*<GenderAutocomplete label="Género" style={"flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 h-10 my-2"}/>*/}
                                            </div>
                                            <div className="flex flex-col w-1/5">
                                                <div className="bg-tableFooter py-1">
                                                    <h4 className="pl-5 text-black-300"><b>Informação Adicional</b></h4>
                                                </div>
                                                <input type="text" placeholder="Cartão de Cidadão" className={inputStyle}></input>
                                                <input type="text" placeholder="Emitido em:" className={inputStyle}></input>
                                                <input type="text" placeholder="Expira em:" className={inputStyle}></input>
                                                <CountryAutocomplete label="País de emissão" style={"flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 h-10 my-2"} />
                                                <input type="text" placeholder="Nr. Identificação fiscal" className={inputStyle}></input>
                                            </div>
                                            <div className="flex flex-col w-1/5">
                                                <div className="bg-tableFooter py-1">
                                                    <h4 className="pl-5 text-black-300"><b>Dados Faturação</b></h4>
                                                </div>
                                                <input type="text" placeholder="Empresa" className={inputStyle}></input>
                                                <input type="text" placeholder="Nr. Identificação fiscal" className={inputStyle}></input>
                                                <input type="text" placeholder="Morada" className={inputStyle}></input>
                                                <div className="flex flex-row gap-5">
                                                    <input type="text" placeholder="Código-Postal" className={sharedLineInputStyle}></input>
                                                    <input type="text" placeholder="Localidade" className={sharedLineInputStyle}></input>
                                                </div>
                                                <CountryAutocomplete label="País" style={"flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 h-10 my-2"} />
                                            </div>
                                        </div>
                                        {/*segunda linha de comboboxs */}
                                        <div className="flex flex-row justify-around gap-4">
                                            <div className="flex flex-col w-1/5">
                                                <div className="bg-tableFooter py-1">
                                                    <h4 className="pl-5 text-black-300"><b>Marketing</b></h4>
                                                </div>
                                                <input type="text" placeholder="Códigos" className={inputStyle}></input>
                                                <input type="text" placeholder="Mercados" className={inputStyle}></input>
                                                <input type="text" placeholder="Marketing" className={inputStyle}></input>
                                                <input type="text" placeholder="Enviado em:" className={inputStyle}></input>
                                            </div>
                                            <div className="flex flex-col w-1/5">
                                                <div className="bg-tableFooter py-1">
                                                    <h4 className="pl-5 text-black-300"><b>Class. empresarial</b></h4>
                                                </div>
                                                <input type="text" placeholder="Código VIP" className={inputStyle}></input>
                                                <input type="text" placeholder="Profissão" className={inputStyle}></input>
                                                <input type="text" placeholder="Tabelas de preços" className={inputStyle}></input>
                                                <input type="text" placeholder="Preferências de quartos" className={inputStyle}></input>
                                            </div>
                                            <div className="flex flex-col w-1/5">
                                                <div className="bg-tableFooter py-1">
                                                    <h4 className="pl-5 text-black-300"><b>Membros</b></h4>
                                                </div>
                                                <input type="text" placeholder="Processo" className={inputStyle}></input>
                                                <input type="text" placeholder="Subscrição" className={inputStyle}></input>
                                                <input type="text" placeholder="Admitido em:" className={inputStyle}></input>
                                                <input type="text" placeholder="Expira em:" className={inputStyle}></input>
                                            </div>
                                            <div className="flex flex-col w-1/5">
                                                <div className="bg-tableFooter py-1">
                                                    <h4 className="pl-5 text-black-300"><b>Notas</b></h4>
                                                </div>
                                                <input type="text" placeholder="Obs.1." className={inputStyle}></input>
                                                <input type="text" placeholder="" className={inputStyle}></input>
                                                <input type="text" placeholder="Obs.2." className={inputStyle}></input>
                                                <input type="text" placeholder="" className={inputStyle}></input>
                                            </div>
                                            <div className="flex flex-col w-1/5">
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

export default individualForm;