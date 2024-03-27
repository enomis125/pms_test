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
import { characteristics } from "@/components/functionsForm/CRUD/hotel/characteristics/page";
import { rooms } from "@/components/functionsForm/CRUD/hotel/rooms/page";
import { tipologys } from "@/components/functionsForm/CRUD/hotel/tipology/page";
import { maintenance } from "@/components/functionsForm/CRUD/hotel/maintenance/page";
import { typesGroups } from "@/components/functionsForm/CRUD/hotel/tipologyGroup/page";
import { expansion } from "@/components/functionsForm/expansion/page";



/*
os modals encontram-se identificados por numeros de 2 digitos, sendo o ultimo digito um indicador de modal ou full screen:
0 - mmodal
1 - full screen (inserir)
2 - full screen (editar)
(REMOVER AO CONCLUIR O PROJETO)
*/

const formModals = ({ idCarateristics, idRoomtype, idMaintenance, idTypesgroups, idRoom,
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

    const { handleSubmitTypesgroups , handleInputTypesgroups , handleUpdateTypesgroups, valuesTypesgroups, setValuesTypesGroups } = typesGroups(idTypesgroups);
    const { handleInputMaintenance, handleSubmitMaintenance, handleUpdateMaintenance, setValuesMaintenance, valuesMaintenance } = maintenance(idMaintenance);
    const { handleInputRoomtype, handleSubmitRoomtype, handleUpdateRoomtype, setValuesRoomtype, valuesRoomtype } = tipologys(idRoomtype);
    const { handleInput , handleSubmit, handleUpdate, setValues, values } = characteristics(idCarateristics);
    const { handleInputRoom , handleSubmitRoom, handleUpdateRoom, setValuesRoom, valuesRoom } = rooms(idRoom);
    const { toggleExpand , setIsExpanded, isExpanded } = expansion();

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
                                                <input type="text" placeholder="Descrição" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                                <input type="text" name="Label" onChange={handleInputTypesgroups} placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                                <textarea type="textarea" placeholder="Detalhe" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
                                                <div>
                                                    <input id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                                    <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ativo (estado).</label>
                                                </div>
                                                <div className="flex flex-row gap-5">
                                                    <input type="text" placeholder="Ordem" className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                                    <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                                        <option value="0">------------</option>
                                                        <option value="1">Teste de opções</option>
                                                        <option value="2">Teste de opções</option>
                                                    </select>
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
                                        <ModalBody>
                                            <div className="w-full flex flex-col gap-4">
                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <Input type="text" name="Description" onChange={handleInputRoom} variant="underlined" label="Descrição" />
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <Input type="text" name="Label" onChange={handleInputRoom} variant="underlined" label="Abreviatura" />
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <Textarea
                                                        label="RoomType"
                                                        name="RoomType"
                                                        onChange={handleInputRoom}
                                                        disableAnimation
                                                        disableAutosize
                                                        className={{ base: "max-w-xs", input: "resize-y min-h-[40px]" }}
                                                        variant="underlined"
                                                    />
                                                </div>
                                            </div>
                                            {/* Adjusting the field name to match the expected name in handleInputRoom */}
                                            <div className="w-full flex flex-col gap-4">
                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <Autocomplete
                                                        variant="underlined"
                                                        defaultItems={Tipologia}
                                                        label="Tipologia"
                                                        // Adjusting the name to match the expected name in handleInputRoom
                                                        name="Tipologia"
                                                        className="w-full"
                                                    >
                                                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
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
                                            <div className="w-full flex flex-col gap-4">
                                                <div
                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
                                                >
                                                    <Textarea
                                                        label="DEP. DE HOUSEKEEPING"
                                                        disableAnimation
                                                        disableAutosize
                                                        className={{ base: "max-w-xs", input: "resize-y min-h-[10px]" }}
                                                        variant="underlined"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex gap-4 items-center max-w-xs">
                                                <Button size="md">
                                                    Configuração de interfaces
                                                </Button>
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <Autocomplete
                                                        variant="underlined"
                                                        defaultItems={Caracteristicas}
                                                        label="Caracteristicas"
                                                        className="w-full"
                                                    >
                                                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
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
                                                <Input type="text" name="Abreviature" onChange={handleInput} variant="underlined" label="Abreviatura" />
                                                <Input type="text" name="Description" onChange={handleInput} variant="underlined" label="Descrição" />
                                                <Input type="textarea" name="Details" onChange={handleInput} variant="underlined" label="Detalhe" />
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
                                        <ModalBody>
                                            <ScrollShadow hideScrollBar className="h-[400px]">
                                                <div className="w-full flex flex-col gap-5 mb-4">
                                                    <div
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" variant="underlined" name="Desc" onChange={handleInputRoomtype} label="Descrição" />
                                                    </div>
                                                </div>
                                                <div className="w-full flex flex-col gap-4 mb-4">
                                                    <div
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" variant="underlined" name="Name" onChange={handleInputRoomtype} label="Abreviatura" />
                                                    </div>
                                                </div>
                                                <div className="w-full flex flex-col gap-4 mb-4">
                                                    <div
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 bg-gray-200 "
                                                    >
                                                        <Textarea
                                                            label="Detalhe"
                                                            disableAnimation
                                                            disableAutosize
                                                            className={{ base: "max-w-xs ", input: "resize-y min-h-[40px]" }}
                                                            variant="underlined"
                                                            name="RoomFeaturesDesc" onChange={handleInputRoomtype}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full flex flex-col gap-4 mb-4">
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
                                                </div>
                                            </ScrollShadow>
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
                                                <input
                                                    type="text"
                                                    placeholder="Descrição"
                                                    className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"
                                                    name="Description" onChange={handleInputMaintenance}
                                                />
                                                <AiOutlineGlobal className="ml-auto text-xl" />{" "}
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Abreviatura"
                                                className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"
                                                name="Abreviature" onChange={handleInputMaintenance}
                                            />
                                            <textarea
                                                type="textarea"
                                                placeholder="Detalhe"
                                                className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"
                                                name="Details" onChange={handleInputMaintenance}
                                            ></textarea>
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