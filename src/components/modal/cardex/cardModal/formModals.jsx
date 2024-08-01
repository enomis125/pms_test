"use client"
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import { AiOutlineGlobal } from "react-icons/ai";
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { MdClose } from "react-icons/md";
import clientPreferencesInsert from "@/components/functionsForm/CRUD/cardex/clientPreferences/page";
import vipCodeInsert from "@/components/functionsForm/CRUD/cardex/vipCode/page";
import salutationInsert from "@/components/functionsForm/CRUD/cardex/salutation/page";
import professionInsert from "@/components/functionsForm/CRUD/cardex/profession/page";
import nationalityInsert from "@/components/functionsForm/CRUD/cardex/nationality/page";
import membersInsert from "@/components/functionsForm/CRUD/cardex/members/page";
import knowledgeMethodInsert from "@/components/functionsForm/CRUD/cardex/knowledgeMethod/page";
import doctypesInsert from "@/components/functionsForm/CRUD/cardex/doctypes/page";
import marketingInsert from "@/components/functionsForm/CRUD/cardex/marketing/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import { useTranslations } from "next-intl";




/*
os modals encontram-se identificados por numeros de 2 digitos, sendo o ultimo digito um indicador de modal ou full screen:
0 - mmodal
1 - full screen (inserir)
2 - full screen (editar)
(REMOVER AO CONCLUIR O PROJETO)
*/

const formModals = ({
    buttonName,
    modalHeader,
    formTypeModal,
}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const t = useTranslations('Index'); // Fetch translations

    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    //funções de inserir e editar
    const { handleInputCustomerPreferences, handleSubmitCustomerPreferences } = clientPreferencesInsert();
    const { handleInputDoctypes, handleSubmitDoctypes } = doctypesInsert();
    const { handleInputKnowledgeMethod, handleSubmitKnowledgeMethod } = knowledgeMethodInsert();
    const { handleInputMarketing, handleSubmitMarketing } = marketingInsert();
    const { handleInputMember, handleSubmitMember } = membersInsert();
    const { handleInputNacionality, handleSubmitNacionality } = nationalityInsert();
    const { handleInputProfession, handleSubmitProfession } = professionInsert();
    const { handleInputSalutation, handleSubmitSalutation } = salutationInsert();
    const { handleInputVipcode, handleSubmitVipcode } = vipCodeInsert();



    return (
        <>

            {formTypeModal === 10 && ( //salutation status modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} size="xl" onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} className="z-50">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                        <form onSubmit={handleSubmitSalutation}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                                {t('cardex.salutations.new.modalInsertHeader')}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                                <div className="flex items-center">
                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"abreviature"}
                                                        name={"Abreviature"}
                                                        label={t("cardex.salutations.new.labelAbreviature")}
                                                        ariaLabel={t("cardex.salutations.new.labelAbreviature")}
                                                        onChange={handleInputSalutation} />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>
                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"description"}
                                                    name={"Description"}
                                                    label={t("cardex.salutations.new.labelDescription")}
                                                    ariaLabel={t("cardex.salutations.new.labelDescription")}
                                                    onChange={handleInputSalutation} />
                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"treat"}
                                                    name={"Treat"}
                                                    label={t("cardex.salutations.new.labelTreat")}
                                                    ariaLabel={t("cardex.salutations.new.labelTreat")}
                                                    onChange={handleInputSalutation} />
                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"gender"}
                                                    name={"Gender"}
                                                    label={t("cardex.salutations.new.labelGender")}
                                                    ariaLabel={t("cardex.salutations.new.labelGender")}
                                                    onChange={handleInputSalutation} />
                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"title"}
                                                    name={"Title"}
                                                    label={t("cardex.salutations.new.labelTitle")}
                                                    ariaLabel={t("cardex.salutations.new.labelTitle")}
                                                    onChange={handleInputSalutation} />
                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"ordenation"}
                                                    name={"Ordenation"}
                                                    label={t("cardex.salutations.new.labelOrdenation")}
                                                    ariaLabel={t("cardex.salutations.new.labelOrdenation")}
                                                    onChange={handleInputSalutation} />
                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"nameSuff"}
                                                    name={"NameSuff"}
                                                    label={t("cardex.salutations.new.labelNameSuff")}
                                                    ariaLabel={t("cardex.salutations.new.labelNameSuff")}
                                                    onChange={handleInputSalutation} />
                                                <div className="flex flex-row justify-left items-center">
                                                    <label>{t("cardex.salutations.new.labelType")}</label>
                                                    <div className="flex flex-row justify-center items-center">
                                                        <label>{t("cardex.salutations.new.radioName")}</label>
                                                        <input type="radio" name="type" value="name" onChange={handleInputSalutation} />
                                                    </div>
                                                    <div className="flex flex-row justify-center items-center">
                                                        <label>{t("cardex.salutations.new.radioFirstName")}</label>
                                                        <input type="radio" name="type" value="firstName" onChange={handleInputSalutation} />
                                                    </div>
                                                    <div className="flex flex-row justify-center items-center">
                                                        <label>{t("cardex.salutations.new.radioNoExt")}</label>
                                                        <input type="radio" name="type" value="noExt" onChange={handleInputSalutation} />
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
                    <Modal isOpen={isOpen} size="xl" onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} className="z-50">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                        <form onSubmit={handleSubmitNacionality}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                                {t('cardex.nationalities.new.modalInsertHeader')}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                                <div className="flex items-center">
                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"Fo"}
                                                        name={"Fo"}
                                                        label={t("cardex.nationalities.new.labelFo")}
                                                        ariaLabel={t("cardex.nationalities.new.labelFo")}
                                                        onChange={handleInputNacionality} />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>
                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"nation"}
                                                    name={"Nation"}
                                                    label={t("cardex.nationalities.new.labelNation")}
                                                    ariaLabel={t("cardex.nationalities.new.labelNation")}
                                                    onChange={handleInputNacionality} />
                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"nationality"}
                                                    name={"Nationality"}
                                                    label={t("cardex.nationalities.new.labelNationality")}
                                                    ariaLabel={t("cardex.nationalities.new.labelNationality")}
                                                    onChange={handleInputNacionality} />
                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"statnr"}
                                                    name={"Statnr"}
                                                    label={t("cardex.nationalities.new.labelStatnr")}
                                                    ariaLabel={t("cardex.nationalities.new.labelStatnr")}
                                                    onChange={handleInputNacionality} />
                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"group"}
                                                    name={"Group"}
                                                    label={t("cardex.nationalities.new.labelGroup")}
                                                    ariaLabel={t("cardex.nationalities.new.labelGroup")}
                                                    onChange={handleInputNacionality} />
                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"ordenation"}
                                                    name={"Ordenation"}
                                                    label={t("cardex.nationalities.new.labelOrdenation")}
                                                    ariaLabel={t("cardex.nationalities.new.labelOrdenation")}
                                                    onChange={handleInputNacionality} />
                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"isocode"}
                                                    name={"Isocode"}
                                                    label={t("cardex.nationalities.new.labelIsocode")}
                                                    ariaLabel={t("cardex.nationalities.new.labelIsocode")}
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


            {formTypeModal === 30 && ( //knowledge modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} size="xl" onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} className="z-50">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                        <form onSubmit={handleSubmitKnowledgeMethod}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                                {t('cardex.knowledgemethod.new.modalInsertHeader')}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"group"}
                                                    name={"Group"}
                                                    label={t("cardex.knowledgemethod.new.labelGroup")}
                                                    ariaLabel={t("cardex.knowledgemethod.new.labelGroup")}
                                                    onChange={handleInputKnowledgeMethod} />

                                                <div className="flex items-center">
                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"abreviature"}
                                                        name={"Abreviature"}
                                                        label={t("cardex.knowledgemethod.new.labelAbreviature")}
                                                        ariaLabel={t("cardex.knowledgemethod.new.labelAbreviature")}
                                                        onChange={handleInputKnowledgeMethod} />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"description"}
                                                    name={"Description"}
                                                    label={t("cardex.knowledgemethod.new.labelDescription")}
                                                    ariaLabel={t("cardex.knowledgemethod.new.labelDescription")}
                                                    onChange={handleInputKnowledgeMethod} />

                                                <div>
                                                    <input
                                                        id="link-checkbox"
                                                        type="checkbox"
                                                        value=""
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    />
                                                    <label
                                                        htmlFor="link-checkbox"
                                                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                    >
                                                        {t("cardex.knowledgemethod.new.labelEstado")}
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
                    <Modal isOpen={isOpen} size="xl" onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                        <form onSubmit={handleSubmitProfession}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                                {t('cardex.profession.new.modalInsertHeader')}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"group"}
                                                    name={"Group"}
                                                    label={t("cardex.profession.new.labelGroup")}
                                                    ariaLabel={t("cardex.profession.new.labelGroup")}
                                                    onChange={handleInputProfession} />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"abreviature"}
                                                    name={"Abreviature"}
                                                    label={t("cardex.profession.new.labelAbreviature")}
                                                    ariaLabel={t("cardex.profession.new.labelAbreviature")}
                                                    onChange={handleInputProfession} />

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"description"}
                                                    name={"Description"}
                                                    label={t("cardex.profession.new.labelDescription")}
                                                    ariaLabel={t("cardex.profession.new.labelDescription")}
                                                    onChange={handleInputProfession} />

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
                    <Modal isOpen={isOpen} size="xl" onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                        <form onSubmit={handleSubmitDoctypes}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                                {t('cardex.idDocument.new.modalInsertHeader')}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"group"}
                                                    name={"Group"}
                                                    label={t("cardex.idDocument.new.labelGroup")}
                                                    ariaLabel={t("cardex.idDocument.new.labelGroup")} />

                                                <div className="flex items-center">
                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"shortName"}
                                                        name={"ShortName"}
                                                        label={t("cardex.idDocument.new.labelAbreviature")}
                                                        ariaLabel={t("cardex.idDocument.new.labelAbreviature")}
                                                        onChange={handleInputDoctypes} />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"name"}
                                                    name={"Name"}
                                                    label={t("cardex.idDocument.new.labelDescription")}
                                                    ariaLabel={t("cardex.idDocument.new.labelDescription")}
                                                    onChange={handleInputDoctypes} />

                                                <div>
                                                    <input
                                                        id="link-checkbox"
                                                        type="checkbox"
                                                        value=""
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    />
                                                    <label
                                                        htmlFor="link-checkbox"
                                                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                    >
                                                        {t("cardex.idDocument.new.labelStatus")}
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
                    <Modal isOpen={isOpen} size="xl" onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                        <form onSubmit={handleSubmitCustomerPreferences}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                                {t('cardex.clientPreferences.new.modalInsertHeader')}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"group"}
                                                    name={"Group"}
                                                    label={t("cardex.clientPreferences.new.labelGroup")}
                                                    ariaLabel={t("cardex.clientPreferences.new.labelGroup")} />

                                                <div className="flex items-center">
                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"abreviature"}
                                                        name={"Abreviature"}
                                                        label={t("cardex.clientPreferences.new.labelAbreviature")}
                                                        ariaLabel={t("cardex.clientPreferences.new.labelAbreviature")}
                                                        onChange={handleInputCustomerPreferences} />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"description"}
                                                    name={"Description"}
                                                    label={t("cardex.clientPreferences.new.labelDescription")}
                                                    ariaLabel={t("cardex.clientPreferences.new.labelDescription")}
                                                    onChange={handleInputCustomerPreferences} />

                                                <div>
                                                    <input
                                                        id="link-checkbox"
                                                        type="checkbox"
                                                        value=""
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    />
                                                    <label
                                                        htmlFor="link-checkbox"
                                                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                    >
                                                        {t("cardex.clientPreferences.new.labelStatus")}
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
                    <Modal isOpen={isOpen} size="xl" onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                        <form onSubmit={handleSubmitMember}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                                {t('cardex.members.new.modalInsertHeader')}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"group"}
                                                    name={"Group"}
                                                    label={t("cardex.members.new.labelGroup")}
                                                    ariaLabel={t("cardex.members.new.labelGroup")} />

                                                <div className="flex items-center">
                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"abreviature"}
                                                        name={"Abreviature"}
                                                        label={t("cardex.members.new.labelAbreviature")}
                                                        ariaLabel={t("cardex.members.new.labelAbreviature")}
                                                        onChange={handleInputMember} />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"description"}
                                                    name={"Description"}
                                                    label={t("cardex.members.new.labelDescription")}
                                                    ariaLabel={t("cardex.members.new.labelDescription")}
                                                    onChange={handleInputMember} />

                                                <div>
                                                    <input
                                                        id="link-checkbox"
                                                        type="checkbox"
                                                        value=""
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    />
                                                    <label
                                                        htmlFor="link-checkbox"
                                                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                    >
                                                        {t("cardex.members.new.labelStatus")}
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
                    <Modal isOpen={isOpen} size="xl" onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                        <form onSubmit={handleSubmitMarketing}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                                {t('cardex.marketing.new.modalInsertHeader')}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"group"}
                                                    name={"Group"}
                                                    label={t("cardex.marketing.new.labelGroup")}
                                                    ariaLabel={t("cardex.marketing.new.labelGroup")} />

                                                <div className="flex items-center">
                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"abreviature"}
                                                        name={"Abreviature"}
                                                        label={t("cardex.marketing.new.labelAbreviature")}
                                                        ariaLabel={t("cardex.marketing.new.labelAbreviature")}
                                                        onChange={handleInputMarketing} />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"description"}
                                                    name={"Description"}
                                                    label={t("cardex.marketing.new.labelDescription")}
                                                    ariaLabel={t("cardex.marketing.new.labelDescription")}
                                                    onChange={handleInputMarketing} />

                                                <div>
                                                    <input
                                                        id="link-checkbox"
                                                        type="checkbox"
                                                        value=""
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    />
                                                    <label
                                                        htmlFor="link-checkbox"
                                                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                    >
                                                        {t("cardex.marketing.new.labelStatus")}
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
                    <Modal isOpen={isOpen} size="xl" onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                        <form onSubmit={handleSubmitVipcode}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                                {t('cardex.viptypes.new.modalInsertHeader')}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"abreviature"}
                                                    name={"Abreviature"}
                                                    label={t("cardex.viptypes.new.labelAbreviature")}
                                                    ariaLabel={t("cardex.viptypes.new.labelAbreviature")}
                                                    onChange={handleInputVipcode}
                                                />

                                                <div className="flex items-center">
                                                    <InputFieldControlled
                                                        type={"text"}
                                                        id={"description"}
                                                        name={"Description"}
                                                        label={t("cardex.viptypes.new.labelDescription")}
                                                        ariaLabel={t("cardex.viptypes.new.labelDescription")}
                                                        onChange={handleInputVipcode}
                                                    />
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>

                                                <InputFieldControlled
                                                    type={"text"}
                                                    id={"details"}
                                                    name={"Details"}
                                                    label={t("cardex.viptypes.new.labelDetails")}
                                                    ariaLabel={t("cardex.viptypes.new.labelDetails")}
                                                    onChange={handleInputVipcode}
                                                />

                                                <div>
                                                    <input
                                                        id="link-checkbox"
                                                        type="checkbox"
                                                        value=""
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    />
                                                    <label
                                                        htmlFor="link-checkbox"
                                                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                    >
                                                        {t("cardex.viptypes.new.labelStatus")}
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