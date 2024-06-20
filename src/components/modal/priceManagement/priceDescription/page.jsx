"use client";
import React, { useEffect, useState } from "react";
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
// imports de icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";

import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";

import { expansion } from "@/components/functionsForm/expansion/page";
import ModalFooterContent from "@/components/modal/modalFooterContent";
import PriceManagementGroupAutocomplete from "@/components/functionsForm/autocomplete/priceManagent/page";
import RateCodesGroupNameAutocomplete from "@/components/functionsForm/autocomplete/rateCodes/name/page";
import TipologyAutocomplete from "@/components/functionsForm/autocomplete/tipology/page";
import RoomsAutocomplete from "@/components/functionsForm/autocomplete/rooms/page";
import SeasonsAutocomplete from "@/components/functionsForm/autocomplete/seasons/page";
import priceDescriptionInsert from "@/components/functionsForm/CRUD/priceManagent/priceDescription/page";
import { priceDescriptionEdit } from "@/components/functionsForm/CRUD/priceManagent/priceDescription/page";
import axios from 'axios';

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

  const {
    handleInputPriceDescription,
    handleSubmitPriceDescription,
    handleRateNameSelect,
    handleCheckboxChange
  } = priceDescriptionInsert();
  /*const {
    handleUpdatePriceDescription,
    setValuesPriceDescription,
    valuesPriceDescription,
  } = priceDescriptionEdit(idPriceDescription);*/
  const { toggleExpand, setIsExpanded, isExpanded } = expansion();

  const [tipologyGroup, setTipologyGroup] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/v1/hotel/tipologys");
        const filteredData = res.data.response.filter(
          (tipologyGroup) => tipologyGroup.label !== ""
        );
        setTipologyGroup(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  return (
    <>
      {formTypeModal === 11 && ( // tipology insert
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
                          onClick={() => { onClose(); /*window.location.reload();*/ }}
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
                          onClick={() => { onClose(); window.location.reload(); }}
                        >
                          <MdClose size={30} />
                        </Button>
                      </div>
                    </ModalHeader>
                    <ModalBody
                      className="flex flex-col mx-5 my-5 space-y-8 overflow-y-auto"
                      style={{ maxHeight: "80vh" }}
                    >
                      <div className="space-y-4">
                        <div className="flex flex-row gap-8">
                          <InputFieldControlled
                            type={"text"}
                            id={"ref"}
                            name={"Ref"}
                            label={"Reference"}
                            style={"w-30 outline-none h-10"}
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
                          <div className="w-30 outline-none h-full my-auto">
                            <Checkbox value="" name="Valid" onChange={handleCheckboxChange}>Fora da Validade</Checkbox>
                          </div>
                          <InputFieldControlled
                            type={"date"}
                            id={"inicio"}
                            name={"Inicio"}
                            label={"Inicio"}
                            style={"w-30 outline-none h-10"}
                            onChange={handleInputPriceDescription}
                          />

                          <InputFieldControlled
                            type={"date"}
                            id={"fim"}
                            name={"Fim"}
                            label={"Fim"}
                            style={"w-30 outline-none h-10"}
                            onChange={handleInputPriceDescription}
                          />
                        </div>

                        <div className="flex flex-row gap-8">
                          <InputFieldControlled
                            type={"number"}
                            id={"property"}
                            name={"Property"}
                            label={"Property"}
                            style={"w-30 outline-none h-10"}
                            onChange={handleInputPriceDescription}
                          />

                          <InputFieldControlled
                            type={"number"}
                            id={"ventilation"}
                            name={"Ventilation"}
                            label={"Ventilation"}
                            style={"w-30 outline-none h-10"}
                            onChange={handleInputPriceDescription}
                          />

                          <InputFieldControlled
                            type={"number"}
                            id={"billText"}
                            name={"BillText"}
                            label={"Bill Text"}
                            style={"w-30 outline-none h-10"}
                            onChange={handleInputPriceDescription}
                          />

                          <InputFieldControlled
                            type={"number"}
                            id={"revenueAccount"}
                            name={"RevenueAccount"}
                            label={"Revenue Account"}
                            style={"w-30 outline-none h-10"}
                            onChange={handleInputPriceDescription}
                          />
                        </div>
                        <div className="flex flex-row gap-8">
                          <p className="w-28 text-center text-xs">Typology</p>
                          <p className="w-28 text-center text-xs">1 Person</p>
                          <p className="w-28 text-center text-xs">2 People</p>
                          <p className="w-28 text-center text-xs">3 People</p>
                          <p className="w-28 text-center text-xs">4 People</p>
                          <p className="w-28 text-center text-xs">5 People</p>
                          <p className="w-28 text-center text-xs">6 People</p>
                        </div>
                        {tipologyGroup.map((tipologyGroup) => (
                      <div className="flex flex-row gap-8">
                        <p className="w-28 h-full my-auto">{tipologyGroup.name}</p>
                        <InputFieldControlled
                          type={"text"}
                          id={"preco1"}
                          name={"Preco1"}
                          //label={"Preço 1"}
                          style={"w-28 outline-none h-10 bg-slate-100"}
                          onChange={handleInputPriceDescription}
                        />
                        <InputFieldControlled
                          type={"text"}
                          id={"preco2"}
                          name={"Preco2"}
                          //label={"Preço 2"}
                          style={"w-28 outline-none h-10 bg-slate-100"}
                          onChange={handleInputPriceDescription}
                        />
                        <InputFieldControlled
                          type={"text"}
                          id={"preco3"}
                          name={"Preco3"}
                          //label={"Preço 3"}
                          style={"w-28 outline-none h-10 bg-slate-100"}
                          onChange={handleInputPriceDescription}
                        />
                        <InputFieldControlled
                          type={"text"}
                          id={"preco4"}
                          name={"Preco4"}
                          //label={"Preço 4"}
                          style={"w-28 outline-none h-10 bg-slate-100"}
                          onChange={handleInputPriceDescription}
                        />
                        <InputFieldControlled
                          type={"text"}
                          id={"preco5"}
                          name={"Preco5"}
                          //label={"Preço 5"}
                          style={"w-28 outline-none h-10 bg-slate-100"}
                          onChange={handleInputPriceDescription}
                        />
                        <InputFieldControlled
                          type={"text"}
                          id={"preco6"}
                          name={"Preco6"}
                          //label={"Preço 6"}
                          style={"w-28 outline-none h-10 bg-slate-100"}
                          onChange={handleInputPriceDescription}
                        />
                      </div>
                        ))}
                      </div>
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
                          onClick={() => { onClose(); window.location.reload(); }}
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
                          onClick={() => { onClose(); window.location.reload(); }}
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
