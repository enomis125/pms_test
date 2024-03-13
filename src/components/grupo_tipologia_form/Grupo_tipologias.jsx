
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

const ModalGT = () => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const variants = ["underlined"];

  return (
    <>
    <Button onPress={onOpen} radius="md" className="bg-transparent">Editar</Button>
    <Modal
   classNames={{
                    base: "max-h-screen",
                    wrapper: "lg:pl-72 h-screen w-full",
                    body: "h-full",
                }}
   size="full"
   isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}
>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 uppercase">Inserir grupo de tipologia</ModalHeader>
            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
              <input type="text" placeholder="Descrição" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
              <input type="text" placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
              <textarea type="textarea" placeholder="Detalhe" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
              <div>
                  <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                  <label htmlFor="link-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ativar estado</label>
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
                Editar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  </>
);
};

export default ModalGT;

