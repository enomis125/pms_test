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
import { rooms } from "@/components/functionsForm/CRUD/hotel/rooms/page";
import { expansion } from "@/components/functionsForm/expansion/page";


const roomForm = ({
    idRoom,
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

    const { handleInputRoom, handleSubmitRoom, handleUpdateRoom, setValuesRoom, valuesRoom } = rooms(idRoom);
    const { toggleExpand, setIsExpanded, isExpanded } = expansion();


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
        
    return (
        <>

            {formTypeModal === 11 && ( //rooms insert
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
                                    <form onSubmit={handleSubmitRoom}>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
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

            {formTypeModal === 12 && ( //rooms edit
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
                        isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <form onSubmit={(e) => handleUpdateRoom(e)}>
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
                                        <ModalBody>
                                            <div className="w-full flex flex-col gap-4">
                                                <div
                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                >
                                                    <Input type="text" value={valuesRoom.Description} onChange={e => setValuesRoom({ ...valuesRoom, Description: e.target.value })} variant="underlined" label="Descrição" />
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                <div
                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                >
                                                    <Input type="text" value={valuesRoom.Label} onChange={e => setValuesRoom({ ...valuesRoom, Label: e.target.value })} variant="underlined" label="Abreviatura" />
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                <div
                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
                                                >
                                                    <Textarea
                                                        label="Detalhe"
                                                        value={valuesRoom.RoomType}
                                                        onChange={e => setValuesRoom({ ...valuesRoom, RoomType: e.target.value })}
                                                        disableAnimation
                                                        disableAutosize
                                                        className={{ base: "max-w-xs", input: "resize-y min-h-[40px]" }}
                                                        variant="underlined"
                                                    />
                                                </div>
                                            </div>
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
                                    <ModalFooter className="absolute bottom-0 left-0 flex flex-row text-right bg-tableFooter border border-tableFooterBorder w-full text-gray-600 text-xs">
                                        <p>Criado em {`${new Date(criado).toLocaleDateString()} : Teste`}</p>
                                        {criado !== editado && (
                                            <div>
                                                <p>Editado em {`${new Date(editado).toLocaleDateString()} : Teste`}</p>
                                            </div>
                                        )}
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

        </>
    );
};

export default roomForm;