
import React from "react";
import { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Textarea,
    Divider,
    Autocomplete, AutocompleteItem, colorVariants,
} from "@nextui-org/react"

const Bedrooms = () => {
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
    return (
        <>

                <Button className="max-w-fit" onPress={onOpen}>
                    Inserir Quarto
                </Button>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    isDismissable={false}
                    isKeyboardDismissDisabled={true}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="">Inserir Quarto</ModalHeader>
                                <ModalBody>
                                    <div className="w-full flex flex-col gap-4">
                                        {variants.map((variant) => (
                                            <div
                                                key={variant}
                                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                            >
                                                <Input type="Descrição" variant={variant} label="Descrição" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full flex flex-col gap-4">
                                        {variants.map((variant) => (
                                            <div
                                                key={variant}
                                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                            >
                                                <Input type="Abreviatura" variant={variant} label="Abreviatura" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full flex flex-col gap-4">
                                        {variants.map((variant) => (
                                            <div
                                                key={variant}
                                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
                                            >
                                                <Textarea
                                                    label="Detalhe"
                                                    disableAnimation
                                                    disableAutosize
                                                    className={{ base: "max-w-xs", input: "resize-y min-h-[40px]" }}
                                                    variant={variant}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full flex flex-col gap-4">
                                        {variants.map((variant) => (
                                            <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                <Autocomplete
                                                    variant={variant}
                                                    defaultItems={Tipologia}
                                                    label="Tipologia"
                                                    className="w-full"
                                                >
                                                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                </Autocomplete>
                                            </div>
                                        ))}
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
                                        {variants.map((variant) => (
                                            <div
                                                key={variant}
                                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
                                            >
                                                <Textarea
                                                    label="DEP. DE HOUSEKEEPING"
                                                    disableAnimation
                                                    disableAutosize
                                                    className={{ base: "max-w-xs", input: "resize-y min-h-[10px]" }}
                                                    variant={variant}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-4 items-center max-w-xs">
                                        <Button size="md">
                                            Configuração de interfaces
                                        </Button>
                                    </div>
                                    <div className="w-full flex flex-col gap-4">
                                        {variants.map((variant) => (
                                            <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                <Autocomplete
                                                    variant={variant}
                                                    defaultItems={Caracteristicas}
                                                    label="Caracteristicas"
                                                    className="w-full"
                                                >
                                                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                </Autocomplete>
                                            </div>
                                        ))}
                                    </div>

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={onClose}>
                                        Action
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </>
            );
};

export default Bedrooms;