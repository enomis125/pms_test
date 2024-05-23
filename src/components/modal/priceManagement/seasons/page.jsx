"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tabs, Tab
} from "@nextui-org/react";
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";

import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";

import { expansion } from "@/components/functionsForm/expansion/page";
import ModalFooterContent from "@/components/modal/modalFooterContent";
import seasonsInsert from "@/components/functionsForm/CRUD/priceManagent/seasons/page";
import { seasonsEdit } from "@/components/functionsForm/CRUD/priceManagent/seasons/page";

const seasonsForm = ({
  idSeasons,
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
  editor,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { handleInputSeasons, handleSubmitSeasons } =
    seasonsInsert();
  const {
    handleUpdateSeasons,
    setValuesSeasons,
    valuesSeasons,
  } = seasonsEdit(idSeasons);
  const { toggleExpand, setIsExpanded, isExpanded } = expansion();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getUTCFullYear();
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      {formTypeModal === 11 && ( //tipology insert
        <>
          <Button onPress={onOpen} color={buttonColor} className="w-fit">
            {buttonName} {buttonIcon}
          </Button>
          <Modal
            classNames={{
              base: "max-h-screen",
              wrapper: isExpanded
                ? "w-full h-screen"
                : "lg:pl-72 h-screen w-full",
              body: "h-full",
            }}
            size="full"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            hideCloseButton={true}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <form onSubmit={handleSubmitSeasons}>
                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                      {modalHeader}
                      <div className="flex flex-row items-center mr-5">
                        <Button
                          color="transparent"
                          onPress={onClose}
                          className="-mr-5"
                          type="submit"
                        >
                          <TfiSave size={25} />
                        </Button>
                        <Button
                          color="transparent"
                          className="-mr-5"
                          onClick={toggleExpand}
                        >
                          <LiaExpandSolid size={30} />
                        </Button>
                        <Button
                          color="transparent"
                          variant="light"
                          onPress={onClose}
                        >
                          <MdClose size={30} />
                        </Button>
                      </div>
                    </ModalHeader>
                    <ModalBody className="flex flex-col mx-5 my-5 space-y-8">

                        <InputFieldControlled
                          type={"text"}
                          id={"SortNo"}
                          name={"SortNo"}
                          label={"Número de Ordem"}
                          style={"w-30 outline-none h-10 bg-slate-100"}
                          onChange={handleInputSeasons}
                        />

                        <InputFieldControlled
                          type={"text"}
                          id={"Desc"}
                          name={"Desc"}
                          label={"Descrição"}
                          style={"w-30 outline-none h-10 bg-slate-100"}
                          onChange={handleInputSeasons}
                        />
                        
                        <InputFieldControlled
                          type={"date"}
                          id={"StartDate"}
                          name={"StartDate"}
                          label={"Data de Inicio"}
                          style={"w-30 outline-none h-10 bg-slate-100"}
                          onChange={handleInputSeasons}
                        />

                        <InputFieldControlled
                          type={"date"}
                          id={"EndDate"}
                          name={"EndDate"}
                          label={"Data de Fim"}
                          style={"w-30 outline-none h-10 bg-slate-100"}
                          onChange={handleInputSeasons}
                        />
                    </ModalBody>
                  </form>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}

      {formTypeModal === 12 && ( //tipology edit
        <>
          <Button
            fullWidth={true}
            size="md"
            onPress={onOpen}
            color={buttonColor}
            className="-h-3 flex justify-start -p-3"
          >
            {buttonName} {buttonIcon}
          </Button>
          <Modal
            classNames={{
              base: "max-h-screen",
              wrapper: isExpanded
                ? "w-full h-screen"
                : "lg:pl-72 h-screen w-full",
              body: "h-full",
            }}
            size="full"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            hideCloseButton={true}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <form onSubmit={(e) => handleUpdateSeasons(e)}>
                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                      <div className="flex flex-row justify-start gap-4">
                        {editIcon} {modalHeader} {modalEditArrow} {modalEdit}
                      </div>
                      <div className="flex flex-row items-center mr-5">
                        <Button
                          color="transparent"
                          onPress={onClose}
                          className="-mr-5"
                          type="submit"
                        >
                          <TfiSave size={25} />
                        </Button>
                        <Button
                          color="transparent"
                          className="-mr-5"
                          onClick={toggleExpand}
                        >
                          <LiaExpandSolid size={30} />
                        </Button>
                        <Button
                          color="transparent"
                          variant="light"
                          onPress={onClose}
                        >
                          <MdClose size={30} />
                        </Button>
                      </div>
                    </ModalHeader>
                    <ModalBody className="flex flex-col mx-5 my-5 space-y-8">

                      <InputFieldControlled
                          type={"text"}
                          id={"SortNo"}
                          name={"SortNo"}
                          label={"Número de Ordem"}
                          style={"w-30 outline-none h-10 bg-slate-100"}
                          value={valuesSeasons.SortNo}
                          onChange={e => setValuesSeasons({ ...valuesSeasons, SortNo: e.target.value })}
                        />

                        <InputFieldControlled
                          type={"text"}
                          id={"Desc"}
                          name={"Desc"}
                          label={"Descrição"}
                          style={"w-30 outline-none h-10 bg-slate-100"}
                          value={valuesSeasons.Desc}
                          onChange={e => setValuesSeasons({ ...valuesSeasons, Desc: e.target.value })}
                        />
                        
                        <InputFieldControlled
                          type={"date"}
                          id={"StartDate"}
                          name={"StartDate"}
                          label={"Data de Inicio"}
                          style={"w-30 outline-none h-10 bg-slate-100"}
                          value={formatDate(valuesSeasons.StartDate)}
                          onChange={e => setValuesSeasons({ ...valuesSeasons, StartDate: e.target.value })}
                        />

                        <InputFieldControlled
                          type={"date"}
                          id={"EndDate"}
                          name={"EndDate"}
                          label={"Data de Fim"}
                          style={"w-30 outline-none h-10 bg-slate-100"}
                          value={formatDate(valuesSeasons.EndDate)}
                          onChange={e => setValuesSeasons({ ...valuesSeasons, EndDate: e.target.value })}
                        />


                    </ModalBody>
                  </form>
                  <ModalFooterContent criado={criado} editado={editado} />
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default seasonsForm;
