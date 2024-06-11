import React, { useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function ConfirmBox() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    onOpen(); // Abre o modal quando o componente é montado
  }, [onOpen]);

  const handleAction = () => {
    if (selectedCells.length > 0) {
      // Store the reservation in the array
      // ...
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} size="sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p> 
                  enomis
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleAction}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
