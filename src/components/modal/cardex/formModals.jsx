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


/*
os modals encontram-se identificados por numeros de 2 digitos, sendo o ultimo digito um indicador de modal ou full screen:
0 - mmodal
1 - full screen (inserir)
2 - full screen (editar)
(REMOVER AO CONCLUIR O PROJETO)
*/

const formModals = ({ idVipcode, idMarketing, idMember, idCustomerPreferences,
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


    //inserção na tabela vipcode
    const [vipcode, setVipcode] = useState({
        description: '',
    })

    const handleInputVipcode = (event) => {
        setVipcode({ ...vipcode, [event.target.name]: event.target.value })
    }
    function handleSubmitVipcode(event) {
        event.preventDefault()
        if (!vipcode.Description) {
            alert("Preencha os campos corretamente");
            return;
        }
        axios.put('/api/v1/cardex/vipcode', {
            data: {
                description: vipcode.Description,
            }
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }
    //edição na tabela vipcode
    const [valuesVipcode, setValuesVipcode] = useState({
        id: idVipcode,
        Descrition: '',
    })

    useEffect(() => {
        axios.get("/api/v1/cardex/vipcode/" + idVipcode)
            .then(res => {
                setValuesVipcode({ ...valuesVipcode, Descrition: res.data.response.description })
            })
            .catch(err => console.log(err))
    }, [])

    function handleUpdateVipcode(e) {
        e.preventDefault()
        axios.patch(`/api/v1/cardex/vipcode/` + idVipcode, {
            data: {
                description: valuesVipcode.Descrition,
            }
        })
            .catch(err => console.log(err))
    }

    //inserção na tabela marketing
    const [marketing, setMarketing] = useState({
        description: '',
        abreviature: '',
    })

    const handleInputMarketing = (event) => {
        setMarketing({ ...marketing, [event.target.name]: event.target.value })
    }
    function handleSubmitMarketing(event) {
        event.preventDefault()
        if (!marketing.Description || !marketing.Abreviature) {
            alert("Preencha os campos corretamente");
            return;
        }
        axios.put('/api/v1/cardex/marketing', {
            data: {
                description: marketing.Description,
                abreviature: marketing.Abreviature,
            }
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }
    //edição na tabela marketing
    const [valuesMarketing, setValuesMarketing] = useState({
        id: idMarketing,
        Descrition: '',
        Abreviature: '',
    })

    useEffect(() => {
        axios.get("/api/v1/cardex/marketing/" + idMarketing)
            .then(res => {
                setValuesMarketing({ ...valuesMarketing, Descrition: res.data.response.description, Abreviature: res.data.response.abreviature })
            })
            .catch(err => console.log(err))
    }, [])

    function handleUpdateMarketing(e) {
        e.preventDefault()
        axios.patch(`/api/v1/cardex/marketing/` + idMarketing, {
            data: {
                description: valuesMarketing.Descrition,
                abreviature: valuesMarketing.Abreviature,
            }
        })
            .catch(err => console.log(err))
    }


    //inserção na tabela members
    const [member, setMember] = useState({
        description: '',
        abreviature: '',
    })

    const handleInputMember = (event) => {
        setMember({ ...member, [event.target.name]: event.target.value })
    }
    function handleSubmitMember(event) {
        event.preventDefault()
        if (!member.Description || !member.Abreviature) {
            alert("Preencha os campos corretamente");
            return;
        }
        axios.put('/api/v1/cardex/members', {
            data: {
                description: member.Description,
                abreviature: member.Abreviature,
            }
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }
    //edição na tabela members
    const [valuesMember, setValuesMember] = useState({
        id: idMember,
        Descrition: '',
        Abreviature: '',
    })

    useEffect(() => {
        axios.get("/api/v1/cardex/members/" + idMember)
            .then(res => {
                setValuesMember({ ...valuesMember, Descrition: res.data.response.description, Abreviature: res.data.response.abreviature })
            })
            .catch(err => console.log(err))
    }, [])

    function handleUpdateMember(e) {
        e.preventDefault()
        axios.patch(`/api/v1/cardex/members/` + idMember, {
            data: {
                description: valuesMember.Descrition,
                abreviature: valuesMember.Abreviature,
            }
        })
            .catch(err => console.log(err))
    }

     //inserção na tabela customerPreferences
     const [customerPreferences, setCustomerPreferences] = useState({
        description: '',
        abreviature: '',
    })

    const handleInputCustomerPreferences = (event) => {
        setCustomerPreferences({ ...customerPreferences, [event.target.name]: event.target.value })
    }
    function handleSubmitCustomerPreferences(event) {
        event.preventDefault()
        if (!customerPreferences.Description || !customerPreferences.Abreviature) {
            alert("Preencha os campos corretamente");
            return;
        }
        axios.put('/api/v1/cardex/customerPreferences', {
            data: {
                description: customerPreferences.Description,
                abreviature: customerPreferences.Abreviature,
            }
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }
    //edição na tabela members
    const [valuesCustomerPreferences, setValuesCustomerPreferences] = useState({
        id: idCustomerPreferences,
        Descrition: '',
        Abreviature: '',
    })

    useEffect(() => {
        axios.get("/api/v1/cardex/customerPreferences/" + idCustomerPreferences)
            .then(res => {
                setValuesCustomerPreferences({ ...valuesCustomerPreferences, Descrition: res.data.response.description, Abreviature: res.data.response.abreviature })
            })
            .catch(err => console.log(err))
    }, [])

    function handleUpdateCustomerPreferences(e) {
        e.preventDefault()
        axios.patch(`/api/v1/cardex/customerPreferences/` + idCustomerPreferences, {
            data: {
                description: valuesCustomerPreferences.Descrition,
                abreviature: valuesCustomerPreferences.Abreviature,
            }
        })
            .catch(err => console.log(err))
    }






    //expanção do ecra no form
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };


    return (
        <>
            {formTypeModal === 11 && ( //tipo cancelamento
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
                                    <form onSubmit={handleSubmitVipcode}>
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                            <input type="text" /*name="ShortName" onChange={handleInputVipcode}*/ placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                            <div>
                                            <input 
                                            type="text" 
                                            name="Description" 
                                            onChange={handleInputVipcode} 
                                            placeholder="Descrição" 
                                            className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4" />
                                            <AiOutlineGlobal className="ml-auto text-xl" />
                                            </div>
                                            <textarea type="textarea" /*name="Class" onChange={handleInputTransfer}*/ placeholder="Detalhe" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
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

{formTypeModal === 12 && ( //tipo cancelamento
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
                                    <form onSubmit={handleUpdateVipcode}>
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                            <input type="text" /*value={valuesTransfer.ShortName} onChange={e => setValuesTransfer({ ...valuesTransfer, ShortName: e.target.value })} name="ShortName"*/ placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                            <div>
                                            <input 
                                            type="text" 
                                            name="Description" 
                                            value={valuesVipcode.Descrition}
                                            onChange={e => setValuesVipcode({ ...valuesVipcode, Descrition: e.target.value })}
                                            placeholder="Descrição" 
                                            className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4" />
                                            <AiOutlineGlobal className="ml-auto text-xl" />
                                            </div>
                                            <textarea type="textarea" /*name="Class" value={valuesTransfer.Class} onChange={e => setValuesTransfer({ ...valuesTransfer, Class: e.target.value })}*/ placeholder="Detalhe" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
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




{formTypeModal === 21 && ( //tipo cancelamento
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
                                    <form onSubmit={handleSubmitMarketing}>
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                            <input type="text" /*name="ShortName" onChange={handleInputVipcode}*/ placeholder="Grupo" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
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

{formTypeModal === 22 && ( //tipo cancelamento
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
                                    <form onSubmit={handleUpdateMarketing}>
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                            <input type="text" /*value={valuesTransfer.ShortName} onChange={e => setValuesTransfer({ ...valuesTransfer, ShortName: e.target.value })} name="ShortName"*/ placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                            <div>
                                            <input 
                                            type="text" 
                                            name="Abreviature" 
                                            value={valuesMarketing.Abreviature}
                                            onChange={e => setValuesMarketing({ ...valuesMarketing, Abreviature: e.target.value })}
                                            placeholder="Abreviatura" 
                                            className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4" />
                                            <AiOutlineGlobal className="ml-auto text-xl" />
                                            </div>
                                            <textarea type="textarea" name="Description" value={valuesMarketing.Descrition} onChange={e => setValuesMarketing({ ...valuesMarketing, Descrition: e.target.value })} placeholder="Descrição" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
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


{formTypeModal === 31 && ( //tipo cancelamento
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
                                    <form onSubmit={handleSubmitMember}>
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                            <input type="text" /*name="ShortName" onChange={handleInputVipcode}*/ placeholder="Grupo" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
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

{formTypeModal === 32 && ( //tipo cancelamento
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
                                    <form onSubmit={handleUpdateMember}>
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                            <input type="text" /*value={valuesTransfer.ShortName} onChange={e => setValuesTransfer({ ...valuesTransfer, ShortName: e.target.value })} name="ShortName"*/ placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                            <div>
                                            <input 
                                            type="text" 
                                            name="Abreviature" 
                                            value={valuesMember.Abreviature}
                                            onChange={e => setValuesMember({ ...valuesMember, Abreviature: e.target.value })}
                                            placeholder="Abreviatura" 
                                            className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4" />
                                            <AiOutlineGlobal className="ml-auto text-xl" />
                                            </div>
                                            <textarea type="textarea" name="Description" value={valuesMember.Descrition} onChange={e => setValuesMember({ ...valuesMember, Descrition: e.target.value })} placeholder="Descrição" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
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


{formTypeModal === 41 && ( //tipo cancelamento
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
                                    <form onSubmit={handleSubmitCustomerPreferences}>
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                            <input type="text" /*name="ShortName" onChange={handleInputVipcode}*/ placeholder="Grupo" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
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

{formTypeModal === 42 && ( //tipo cancelamento
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
                                    <form onSubmit={handleUpdateCustomerPreferences}>
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                            <input type="text" /*value={valuesTransfer.ShortName} onChange={e => setValuesTransfer({ ...valuesTransfer, ShortName: e.target.value })} name="ShortName"*/ placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                            <div>
                                            <input 
                                            type="text" 
                                            name="Abreviature" 
                                            value={valuesCustomerPreferences.Abreviature}
                                            onChange={e => setValuesCustomerPreferences({ ...valuesCustomerPreferences, Abreviature: e.target.value })}
                                            placeholder="Abreviatura" 
                                            className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4" />
                                            <AiOutlineGlobal className="ml-auto text-xl" />
                                            </div>
                                            <textarea type="textarea" name="Description" value={valuesCustomerPreferences.Descrition} onChange={e => setValuesCustomerPreferences({ ...valuesCustomerPreferences, Descrition: e.target.value })} placeholder="Descrição" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
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

