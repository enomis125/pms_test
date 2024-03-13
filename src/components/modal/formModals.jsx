"use client"
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea, Autocomplete, Divider, AutocompleteItem, ScrollShadow} from "@nextui-org/react";
import { AiOutlineGlobal } from "react-icons/ai";
 

const formModals = ({buttonName, modalHeader, formTypeModal}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
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
 
{formTypeModal === 1 && (
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
 
 {formTypeModal === 2 && (
        <>
          <Button onPress={onOpen} color="bg-primary-100" className="w-fit">
            {buttonName}
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
                                <ModalHeader className="">{modalHeader}</ModalHeader>
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
      )}
 
 
{formTypeModal === 3 && (
        <>
          <Button onPress={onOpen} color="bg-primary-100" className="w-fit">
            {buttonName}
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
            <ModalContent>
              {(onClose) => (
                  <>
              <ModalHeader className="flex flex-col gap-1 uppercase">{modalHeader}</ModalHeader>
              <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                <input type="text" placeholder="Descrição" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                <input type="text" placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                <textarea type="textarea" placeholder="Detalhe" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
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
              )}
            </ModalContent>
          </Modal>
        </>
      )}
 
 
{formTypeModal === 4 && (
        <>
          <Button onPress={onOpen} color="bg-primary-100" className="w-fit">
            {buttonName}
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
            <ModalContent>
              {(onClose) => (
                  <>
              <ModalHeader className="flex flex-col gap-1 uppercase">{modalHeader}</ModalHeader>
              <ModalBody>
                                <ScrollShadow hideScrollBar className="h-[400px]">
                                    <div className="w-full flex flex-col gap-5 mb-4">
                                        {variants.map((variant) => (
                                            <div
                                                key={variant}
                                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                            >
                                                <Input type="Descrição" variant={variant} label="Descrição" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full flex flex-col gap-4 mb-4">
                                        {variants.map((variant) => (
                                            <div
                                                key={variant}
                                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                            >
                                                <Input type="Abreviatura" variant={variant} label="Abreviatura" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full flex flex-col gap-4 mb-4">
                                        {variants.map((variant) => (
                                            <div
                                                key={variant}
                                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 bg-gray-200 "
                                            >
                                                <Textarea
                                                    label="Detalhe"
                                                    disableAnimation
                                                    disableAutosize
                                                    className={{ base: "max-w-xs ", input: "resize-y min-h-[40px]" }}
                                                    variant={variant}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full flex flex-col gap-4 mb-4">
                                        {variants.map((variant) => (
                                            <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                <Autocomplete
                                                    variant={variant}
                                                    defaultItems={Tipologia}
                                                    label=" Grupo Tipologia"
                                                    className="w-full"
                                                >
                                                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                </Autocomplete>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full flex flex-col gap-4 mb-4">
                                        {variants.map((variant) => (
                                            <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                <Autocomplete
                                                    variant={variant}
                                                    defaultItems={Caracteristicas}
                                                    label="Função"
                                                    className="w-full"
                                                >
                                                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                </Autocomplete>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollShadow>
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
      )}
 
 {formTypeModal === 5 && (
<>
<Button onPress={onOpen} color="bg-primary-100" radius="md">
            {buttonName}
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
<ModalHeader className="flex flex-col gap-1 uppercase">
                    {modalHeader}
</ModalHeader>
<ModalBody className="flex flex-col mx-5 my-5 space-y-8">
<div className="flex flex-row items-center">
<input
                        type="text"
                        placeholder="Descrição"
                        className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"
                      />
<AiOutlineGlobal className="ml-auto text-xl" />{" "}
</div>
<input
                      type="text"
                      placeholder="Abreviatura"
                      className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"
                    />
<textarea
                      type="textarea"
                      placeholder="Detalhe"
                      className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"
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
<ModalFooter className="flex justify-between items-center"></ModalFooter>
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