"use client"
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea, Autocomplete, Divider, AutocompleteItem, ScrollShadow } from "@nextui-org/react";
import { AiOutlineGlobal } from "react-icons/ai";
import axios from 'axios';

import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { RxExit } from "react-icons/rx";


/*
os modals encontram-se identificados por numeros de 2 digitos, sendo o ultimo digito um indicador de modal ou full screen:
0 - mmodal
1 - full screen 
(REMOVER AO CONCLUIR O PROJETO)
*/

const formModals = ({ buttonName, buttonIcon, modalHeader, formTypeModal, buttonColor }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const variants = ["underlined"];


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

    //inserção na tabela carateristicas
    const [caracteristica, setCaracteristica] = useState({
        Description: '',
        Abreviature: '',
        Details: ''
    })

    const handleInput = (event) => {
        setCaracteristica({ ...caracteristica, [event.target.name]: event.target.value })
    }
    function handleSubmit(event) {
        event.preventDefault()
        if (!caracteristica.Description || !caracteristica.Abreviature || !caracteristica.Details) {
            alert("Preencha os campos corretamente");
            return;
        }
        axios.put('/api/hotel/caracteristicas', caracteristica)
            .then(response => console.log(response))
            .catch(err => console.log(err))
        /*const newcara = res.response.caracteristica;
        setCaracteristica([
            ...caracteristica,
            {
                Description: newcara.Description,
                Abreviature: newcara.Abreviature,
                Details: newcara.Details,
            },
        ]);*/
    }
    //final da inserção na tabela carateristicas

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>

            {formTypeModal === 10 && ( //Grupo de tipologias
                <>
                    <Button onPress={onOpen} color="bg-primary-100" className="w-fit">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} className="z-50">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                        <ModalHeader className="flex flex-col gap-1 uppercase">{modalHeader}</ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                            <input type="text" placeholder="Descrição" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                            <input type="text" placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                            <textarea type="textarea" placeholder="Detalhe" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
                                            <div>
                                                <input id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                                <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ativo (estado).</label>
                                            </div>
                                            <input type="text" placeholder="Ordem" className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                            <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                                <option value="0">------------</option>
                                                <option value="1">Teste de opções</option>
                                                <option value="2">Teste de opções</option>
                                            </select>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                Fechar
                                            </Button>
                                            <Button color="primary" onPress={onClose}>
                                                Teste
                                            </Button>
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

export default formModals;