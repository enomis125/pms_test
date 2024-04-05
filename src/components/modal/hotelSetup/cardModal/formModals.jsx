"use client"
import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { AiOutlineGlobal } from "react-icons/ai";
import axios from 'axios';
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { MdClose } from "react-icons/md";
import characteristicsInsert from "@/components/functionsForm/CRUD/hotel/characteristics/page";
import roomsInsert from "@/components/functionsForm/CRUD/hotel/rooms/page";
import tipologysInsert from "@/components/functionsForm/CRUD/hotel/tipology/page";
import maintenanceInsert from "@/components/functionsForm/CRUD/hotel/maintenance/page";
import typesGroupsInsert from "@/components/functionsForm/CRUD/hotel/tipologyGroup/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";

const formModals = ({
    buttonName,
    buttonIcon,
    modalHeader,
    formTypeModal
}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();


    const [caracteristics, setCaracteristics] = useState([]);

    useEffect(() => {
        const getData = () => {
            axios.get('/api/v1/hotel/caracteristicas')
                .then(res => {
                    setCaracteristics(res.data.response);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };
        getData();
    }, []);


    const [tipology, setTipology] = useState([]);

    useEffect(() => {
        const getData = () => {
            axios.get('/api/v1/hotel/tipologys')
                .then(res => {
                    setTipology(res.data.response);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };
        getData();
    }, []);

    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    const { handleInputMaintenance, handleSubmitMaintenance } = maintenanceInsert();
    const { handleInput, handleSubmit } = characteristicsInsert();
    const { handleInputRoom, handleSubmitRoom } = roomsInsert();
    const { handleSubmitTypesgroups, handleInputTypesgroups } = typesGroupsInsert();
    const { handleInputRoomtype, handleSubmitRoomtype } = tipologysInsert();


    return (
        <>

            {formTypeModal === 10 && ( //tipology group modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt ml-4" size="sm" variant="light">
                        {buttonName} {buttonIcon}
                    </Button>
                    <Modal isOpen={isOpen} hideCloseButton={true} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} className="z-50">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                        <form onSubmit={handleSubmitTypesgroups}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                                <InputFieldControlled type={"text"} id={"description"} name={"Description"} label={"Descrição"} ariaLabel={"Descrição"} />
                                                <InputFieldControlled type={"text"} id={"abreviature"} name={"Label"} label={"Abreviatura"} ariaLabel={"Abreviatura"} onChange={handleInputTypesgroups} />
                                                <InputFieldControlled type={"textarea"} id={"details"} name={"Details"} label={"Detalhes"} ariaLabel={"Detalhes"} />

                                                <div>
                                                    <input id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                                    <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ativo (estado).</label>
                                                </div>
                                                <InputFieldControlled type={"text"} id={"order"} name={"Order"} label={"Ordem"} ariaLabel={"Ordem"} style={"w-1/2"} />
                                                <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                                    <option value="0">------------</option>
                                                    <option value="1">Teste de opções</option>
                                                    <option value="2">Teste de opções</option>
                                                </select>
                                            </ModalBody>
                                        </form>
                                    </>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 20 && ( //rooms modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt ml-4" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        isDismissable={false}
                        isKeyboardDismissDisabled={true}
                        hideCloseButton={true}
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <form onSubmit={handleSubmitRoom}>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                            <InputFieldControlled type={"text"} id={"description"} name={"Description"} label={"Descrição"} ariaLabel={"Descrição"} onChange={handleInputRoom} />
                                            <InputFieldControlled type={"text"} id={"abreviature"} name={"Label"} label={"Abreviatura"} ariaLabel={"Abreviatura"} onChange={handleInputRoom} />
                                            <InputFieldControlled type={"text"} id={"roomType"} name={"RoomType"} label={"Tipo de Quarto"} ariaLabel={"Tipo de Quarto"} onChange={handleInputRoom} />
                                            <div className="w-full flex flex-col gap-4">
                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <Autocomplete
                                                        label="Selecione uma tipologia"
                                                        className="max-w-xs"
                                                    >
                                                        {tipology.map((tipology) => (
                                                            <AutocompleteItem key={tipology.roomTypeID} value={tipology.desc}>
                                                                {tipology.desc}
                                                            </AutocompleteItem>
                                                        ))}
                                                    </Autocomplete>
                                                </div>
                                            </div>
                                            <div className="flex flex-col md:flex-row justify-between">
                                                <div className="flex flex-col w-1/2">
                                                    <p className="text-sm">Ocupação Máxima</p>
                                                    <p className="text-xl">1</p>
                                                </div>
                                                <div className="flex flex-col w-1/2">
                                                    <p className="text-sm">Ordem</p>
                                                    <p className="text-xl">1</p>
                                                </div>
                                            </div>
                                            <InputFieldControlled type={"text"} id={"depHousekeeping"} name={"depHousekeeping"} label={"DEP. DE HOUSEKEEPING"} ariaLabel={"Departamento de limpeza"} />
                                            <div className="flex gap-4 items-center max-w-xs">
                                                <Button size="md">
                                                    Configuração de interfaces
                                                </Button>
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <Autocomplete
                                                        label="Selecione uma caracteristica"
                                                        className="max-w-xs"
                                                    >
                                                        {caracteristics.map((caracteristic) => (
                                                            <AutocompleteItem key={caracteristic.characteristicID} value={caracteristic.description}>
                                                                {caracteristic.description}
                                                            </AutocompleteItem>
                                                        ))}
                                                    </Autocomplete>
                                                </div>
                                            </div>
                                        </ModalBody>
                                    </form>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}


            {formTypeModal === 30 && ( //characteristics modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt ml-4" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                        <form onSubmit={handleSubmit}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                                <InputFieldControlled type={"text"} id={"abreviature"} name={"Abreviature"} label={"Abreviatura"} ariaLabel={"Abreviatura"} onChange={handleInput} />
                                                <InputFieldControlled type={"text"} id={"description"} name={"Description"} label={"Descrição"} ariaLabel={"Descrição"} onChange={handleInput} />
                                                <InputFieldControlled type={"text"} id={"details"} name={"Details"} label={"Detalhes"} ariaLabel={"Detalhes"} onChange={handleInput} />
                                            </ModalBody>
                                        </form>
                                    </>
                                </>

                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 40 && ( //tipology modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt ml-4" size="sm" variant="light">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <form onSubmit={handleSubmitRoomtype}>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                            <InputFieldControlled type={"text"} id={"description"} name={"Desc"} label={"Descrição"} ariaLabel={"Descrição"} onChange={handleInputRoomtype} />
                                            <InputFieldControlled type={"text"} id={"abreviature"} name={"Name"} label={"Abreviatura"} ariaLabel={"Abreviatura"} onChange={handleInputRoomtype} />
                                            <InputFieldControlled type={"text"} id={"details"} name={"RoomFeaturesDesc"} label={"Detalhes"} ariaLabel={"Detalhes"} onChange={handleInputRoomtype} />
                                            {/*<div className="w-full flex flex-col gap-4 mb-4">
                                                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                        <Autocomplete
                                                            variant="underlined"
                                                            defaultItems={Tipologia}
                                                            label=" Grupo Tipologia"
                                                            className="w-full"
                                                        >
                                                            {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                        </Autocomplete>
                                                    </div>
                                                </div>
                                                <div className="w-full flex flex-col gap-4 mb-4">
                                                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                        <Autocomplete
                                                            variant="underlined"
                                                            defaultItems={Caracteristicas}
                                                            label="Função"
                                                            className="w-full"
                                                        >
                                                            {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                        </Autocomplete>
                                                    </div>
                            </div>*/}
                                        </ModalBody>
                                    </form>

                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 50 && ( //Maintenance modal
                <>
                    <Button onPress={onOpen} isIconOnly className="bg-primary-100   -mt ml-4" size="sm" variant="light">
                        {buttonName}
                    </Button>

                    <Modal
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        isDismissable={false}
                        isKeyboardDismissDisabled={true}
                        hideCloseButton={true}
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <form onSubmit={handleSubmitMaintenance}>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                            <div className="flex flex-row items-center">
                                            <InputFieldControlled type={"text"} id={"description"} name={"Description"} label={"Descrição"} ariaLabel={"Descrição"} onChange={handleInputMaintenance}/>
                                            <AiOutlineGlobal className="ml-auto text-xl" />{" "}
                                            </div>
                                            <InputFieldControlled type={"text"} id={"abreviature"} name={"Abreviature"} label={"Abreviatura"} ariaLabel={"Abreviatura"} onChange={handleInputMaintenance}/>
                                            <InputFieldControlled type={"text"} id={"details"} name={"Details"} label={"Detalhes"} ariaLabel={"Detalhes"} onChange={handleInputMaintenance}/>
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
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

        </>
    );
};

export default formModals;