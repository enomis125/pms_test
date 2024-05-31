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
  Tabs,
  Tab,
} from "@nextui-org/react";
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";

import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";

import { expansion } from "@/components/functionsForm/expansion/page";
import ModalFooterContent from "@/components/modal/modalFooterContent";
import PriceManagementGroupAutocomplete from "@/components/functionsForm/autocomplete/priceManagent/page";
import RateCodesGroupCodeAutocomplete from "@/components/functionsForm/autocomplete/rateCodes/groupCode/page";
import RateCodesGroupNameAutocomplete from "@/components/functionsForm/autocomplete/rateCodes/name/page";
import priceDescriptionInsert from "@/components/functionsForm/CRUD/priceManagent/priceDescription/page";
import { priceDescriptionEdit } from "@/components/functionsForm/CRUD/priceManagent/priceDescription/page";

const priceDescriptionForm = ({
  idPriceDescription,
  buttonName,
  buttonIcon,
  modalHeader,
  editIcon,
  modalEditArrow,
  modalEdit,
  formTypeModal,
  buttonColor,
  priceGroupFill,
  criado,
  editado,
  editor,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { handleInputPriceDescription, handleSubmitPriceDescription, handleRateGroupSelect, handleRateNameSelect  } =
    priceDescriptionInsert();
  const {
    handleUpdatePriceDescription, setValuesPriceDescription, valuesPriceDescription
  } = priceDescriptionEdit(idPriceDescription);
  const { toggleExpand, setIsExpanded, isExpanded } = expansion();

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
            scrollBehavior="inside"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <form onSubmit={handleSubmitPriceDescription}>
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
                    <ModalBody className="flex flex-col mx-5 my-5 space-y-8 overflow-y-auto" style={{ maxHeight: '80vh' }}>
                      <Tabs aria-label="Options" items={2}>
                        <Tab key="Detalhes" title="Detalhes">
                          <div className="space-y-4">
                            <div className="flex flex-row gap-8">
                              <InputFieldControlled
                                type={"text"}
                                id={"mudar"}
                                name={"mudar"}
                                label={"Referencia"}
                                style={"w-30 outline-none h-10 bg-slate-100"}
                                onChange={handleInputPriceDescription}
                              />

                              <InputFieldControlled
                                type={"text"}
                                id={"nome"}
                                name={"Nome"}
                                label={"Nome"}
                                style={"w-30 outline-none h-10"}
                                onChange={handleInputPriceDescription}
                              />

                              <RateCodesGroupNameAutocomplete
                                label={"Grupo"}
                                style={""}
                                onChange={handleRateNameSelect}
                              />
                            </div>

                            <div className="flex flex-row gap-8">
                              <div className="w-30 outline-none h-10">
                                <Checkbox value="">Fora da Validade</Checkbox>
                              </div>
                              <InputFieldControlled
                                type={"date"}
                                id={"mudar"}
                                name={"mudar"}
                                label={"Inicio"}
                                style={"w-30 outline-none h-10 bg-slate-100"}
                                onChange={handleInputPriceDescription}
                              />

                              <InputFieldControlled
                                type={"date"}
                                id={"mudar"}
                                name={"mudar"}
                                label={"Fim"}
                                style={"w-30 outline-none h-10 bg-slate-100"}
                                onChange={handleInputPriceDescription}
                              />
                            </div>

                            <div className="flex flex-row gap-8">
                              <InputFieldControlled
                                type={"number"}
                                id={"mudar"}
                                name={"mudar"}
                                label={"Min. noites"}
                                style={"w-30 outline-none h-10 bg-slate-100"}
                                onChange={handleInputPriceDescription}
                              />

                              <InputFieldControlled
                                type={"number"}
                                id={"mudar"}
                                name={"mudar"}
                                label={"Max. noites"}
                                style={"w-30 outline-none h-10 bg-slate-100"}
                                onChange={handleInputPriceDescription}
                              />

                              <InputFieldControlled
                                type={"number"}
                                id={"mudar"}
                                name={"mudar"}
                                label={"Min. ocupação"}
                                style={"w-30 outline-none h-10 bg-slate-100"}
                                onChange={handleInputPriceDescription}
                              />

                              <InputFieldControlled
                                type={"number"}
                                id={"mudar"}
                                name={"mudar"}
                                label={"Max. ocupação"}
                                style={"w-30 outline-none h-10 bg-slate-100"}
                                onChange={handleInputPriceDescription}
                              />
                            </div>

                            <div className="flex flex-row gap-8">
                              <InputFieldControlled
                                type={"text"}
                                id={"mudar"}
                                name={"mudar"}
                                label={"Dispon. em Hotel Grupo"}
                                style={"w-30 outline-none h-10 bg-slate-100"}
                                onChange={handleInputPriceDescription}
                              />

                              <InputFieldControlled
                                type={"text"}
                                id={"mudar"}
                                name={"mudar"}
                                label={"Dispon. apenas em Hotel Especifico"}
                                style={"w-30 outline-none h-10 bg-slate-100"}
                                onChange={handleInputPriceDescription}
                              />
                            </div>

                            <div className="flex flex-row gap-8">
                              <InputFieldControlled
                                type={"text"}
                                id={"mudar"}
                                name={"mudar"}
                                label={"Valida TQ (1)"}
                                style={"w-30 outline-none h-10 bg-slate-100"}
                                onChange={handleInputPriceDescription}
                              />

                              <InputFieldControlled
                                type={"text"}
                                id={"mudar"}
                                name={"mudar"}
                                label={"Valida TQ (2)"}
                                style={"w-30 outline-none h-10 bg-slate-100"}
                                onChange={handleInputPriceDescription}
                              />
                            

                            <InputFieldControlled
                              type={"text"}
                              id={"mudar"}
                              name={"mudar"}
                              label={"Valida TQ (3)"}
                              style={"w-30 outline-none h-10 bg-slate-100"}
                              onChange={handleInputPriceDescription}
                            />

                            <InputFieldControlled
                              type={"text"}
                              id={"mudar"}
                              name={"mudar"}
                              label={"Valida TQ (4)"}
                              style={"w-30 outline-none h-10 bg-slate-100"}
                              onChange={handleInputPriceDescription}
                            />

                            <InputFieldControlled
                              type={"text"}
                              id={"mudar"}
                              name={"mudar"}
                              label={"Valida TQ (5)"}
                              style={"w-30 outline-none h-10 bg-slate-100"}
                              onChange={handleInputPriceDescription}
                            />
                          </div>

                          <div className="flex flex-row gap-8">
                              <InputFieldControlled
                                type={"text"}
                                id={"mudar"}
                                name={"mudar"}
                                label={"Quarto"}
                                style={"w-30 outline-none h-10 bg-slate-100"}
                                onChange={handleInputPriceDescription}
                              />
                            </div>

                            <div className="flex flex-row gap-8">
                              <p>Não Disponivel na Chegada</p>
                              <Checkbox value="">SEG</Checkbox>
                              <Checkbox value="">TER</Checkbox>
                              <Checkbox value="">QUA</Checkbox>
                              <Checkbox value="">QUI</Checkbox>
                              <Checkbox value="">SEX</Checkbox>
                              <Checkbox value="">SAB</Checkbox>
                              <Checkbox value="">DOM</Checkbox>
                            </div>

                            <div className="flex flex-row gap-8">
                              <InputFieldControlled
                                type={"text"}
                                id={"mudar"}
                                name={"mudar"}
                                label={"CL"}
                                style={"w-30 outline-none h-10 bg-slate-100"}
                                onChange={handleInputPriceDescription}
                              />
                            </div>
                            
                            <div className="flex flex-row gap-8">
                              <InputFieldControlled
                                type={"text"}
                                id={"mudar"}
                                name={"mudar"}
                                label={"Texto (Int.)"}
                                style={"w-30 outline-none h-10 bg-slate-100"}
                                onChange={handleInputPriceDescription}
                              />
                            </div>

                            <div className="flex flex-row gap-8">
                              <InputFieldControlled
                                type={"text"}
                                id={"mudar"}
                                name={"mudar"}
                                label={"Numero Package"}
                                style={"w-30 outline-none h-10 bg-slate-100"}
                                onChange={handleInputPriceDescription}
                              />
                              <Checkbox value="">Package por Fatura</Checkbox>
                            </div>
                          </div>
                        </Tab>
                        <Tab key="tabelas" title="Tabelas">
                          <p>teste</p>
                          <p>teste</p>
                          <p>teste</p>
                          <p>teste</p>
                          <p>teste</p>
                          <p>teste</p>
                        </Tab>
                      </Tabs>
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
                  <form onSubmit={(e) => handleUpdatePriceManagement(e)}>
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
                      <div className="flex flex-row gap-8">
                        <InputFieldControlled
                          type={"text"}
                          id={"RateGroup"}
                          name={"RateGroup"}
                          label={"Rate Group"}
                          style={"w-30 outline-none h-10 bg-slate-100"}
                          value={valuesPriceManagement.RateGroup}
                          onChange={(e) =>
                            setValuesPriceManagement({
                              ...valuesPriceManagement,
                              RateGroup: e.target.value,
                            })
                          }
                        />

                        <InputFieldControlled
                          type={"number"}
                          id={"RateCode"}
                          name={"RateCode"}
                          label={"Rate Code"}
                          style={"w-30 outline-none h-10 bg-slate-100"}
                          value={valuesPriceManagement.RateCode}
                          onChange={(e) =>
                            setValuesPriceManagement({
                              ...valuesPriceManagement,
                              RateCode: e.target.value,
                            })
                          }
                        />

                        <InputFieldControlled
                          type={"text"}
                          id={"Type"}
                          name={"Type"}
                          label={"Type"}
                          style={"w-30 outline-none h-10"}
                          onChange={handleInputPriceDescription}
                        />
                      </div>
                      <InputFieldControlled
                        type={"text"}
                        id={"text1"}
                        name={"Text1"}
                        label={"Text 1"}
                        style={"w-full outline-none h-10"}
                        onChange={handleInputPriceDescription}
                      />

                      <div className="flex flex-row gap-8">
                        <InputFieldControlled
                          type={"number"}
                          id={"sortOrder"}
                          name={"sortOrder"}
                          label={"Sort Order"}
                          style={"w-30 outline-none h-10"}
                          onChange={handleInputPriceDescription}
                        />
                      </div>
                      <CheckboxGroup label="Virtual Rate">
                        <Checkbox value="">Base Rate</Checkbox>
                      </CheckboxGroup>

                      <div className="flex flex-row gap-8">
                        <InputFieldControlled
                          type={"text"}
                          id={"Surcharge"}
                          name={"Surcharge"}
                          label={"Surcharge (%)"}
                          style={"w-30 outline-none h-10"}
                          onChange={handleInputPriceDescription}
                        />

                        <InputFieldControlled
                          type={"text"}
                          id={"plusMinor"}
                          name={"plusMinor"}
                          label={"+/-"}
                          style={"w-30 outline-none h-10"}
                          onChange={handleInputPriceDescription}
                        />

                        <PriceManagementGroupAutocomplete
                          label={"Round To"}
                          style={""}
                          onChange={(value) => handleSelect(value)}
                        />
                      </div>
                      <div className="flex flex-row gap-8">
                        <CheckboxGroup label="Options">
                          <Checkbox value="">Special Rate</Checkbox>
                        </CheckboxGroup>
                        <CheckboxGroup label="Options">
                          <Checkbox value="">
                            Hide in Rate Availability
                          </Checkbox>
                        </CheckboxGroup>
                      </div>
                      <div className="flex flex-row gap-4">
                        <InputFieldControlled
                          type={"text"}
                          id={"hotels"}
                          name={"Hotels"}
                          label={"Hotels"}
                          style={"w-30 outline-none h-10 bg-slate-100"}
                          value={valuesPriceManagement.Hotels}
                          onChange={(e) =>
                            setValuesPriceManagement({
                              ...valuesPriceManagement,
                              Hotels: e.target.value,
                            })
                          }
                        />

                        <PriceManagementGroupAutocomplete
                          label={"Routing Code"}
                          style={""}
                          onChange={(value) => handleSelect(value)}
                        />
                        <PriceManagementGroupAutocomplete
                          label={"Target"}
                          style={""}
                          onChange={(value) => handleSelect(value)}
                        />
                      </div>

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

export default priceDescriptionForm;
