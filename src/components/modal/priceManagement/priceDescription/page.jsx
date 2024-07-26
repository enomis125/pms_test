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
} from "@nextui-org/react";
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import { Checkbox } from "@nextui-org/react";
import { FaPlus, FaMinus } from "react-icons/fa";

import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import { expansion } from "@/components/functionsForm/expansion/page";
import ModalFooterContent from "@/components/modal/modalFooterContent";
import RateCodesGroupNameAutocomplete from "@/components/functionsForm/autocomplete/rateCodes/name/page";
import priceDescriptionInsert from "@/components/functionsForm/CRUD/priceManagent/priceDescription/page";
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
    handleInputPriceDescriptionPrices,
    handleInputPriceDescriptionRooms,
    handleSubmitPriceDescription,
    handleRateNameSelect,
    handleCheckboxChange
  } = priceDescriptionInsert();

  const { toggleExpand, setIsExpanded, isExpanded } = expansion();

  const [tipologyGroup, setTipologyGroup] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [expandedInputValues, setExpandedInputValues] = useState([]);

  useEffect(() => {
    const fetchTipologyData = async () => {
      try {
        const res = await axios.get("/api/v1/hotel/tipologys");
        const filteredData = res.data.response.filter(
          (tipology) => tipology.label !== ""
        );
        setTipologyGroup(filteredData);
        setExpandedInputValues(filteredData.map(() => ({
          preco1: '', preco2: '', preco3: '', preco4: '', preco5: '', preco6: ''
        })));
      } catch (error) {
        console.error("Error fetching tipology data:", error);
      }
    };
    fetchTipologyData();
  }, []);

  useEffect(() => {
    const fetchRoomsData = async () => {
      try {
        const res = await axios.get("/api/v1/hotel/rooms");
        const filteredData = res.data.response.filter(
          (room) => room.label !== ""
        );
        setRooms(filteredData);
        setExpandedInputValues(filteredData.map(() => ({
          precoQuarto1: '', precoQuarto2: '', precoQuarto3: '', precoQuarto4: '', precoQuarto5: '', precoQuarto6: ''
        })));
      } catch (error) {
        console.error("Error fetching rooms data:", error);
      }
    };
    fetchRoomsData();
  }, []);

  const [expandedIndexes, setExpandedIndexes] = useState([]);

  const toggleExpandIndexes = (index) => {
    setExpandedIndexes(prevState =>
      prevState.includes(index)
        ? prevState.filter(i => i !== index)
        : [...prevState, index]
    );
  };

  const handleExpandedInputChangeTypology = (index, event) => {
    const { name, value } = event.target;
    setExpandedInputValues(prevState => {
      const newValuesRooms = [...prevState];
      newValuesRooms[index] = { ...newValuesRooms[index], [name]: value };
      return newValuesRooms;
    });
    handleInputPriceDescriptionPrices(index, event);
  };

  const handleExpandedInputChangeRoom = (index, event) => {
    const { name, value } = event.target;
    setExpandedInputValues(prevState => {
      const newValuesRooms = [...prevState];
      newValuesRooms[index] = { ...newValuesRooms[index], [name]: value };
      return newValuesRooms;
    });
    handleInputPriceDescriptionRooms(index, event);
  };

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
                          <p className="ml-2 w-28 text-center text-xs">Typology</p>
                          <p className="w-28 text-center text-xs">1 Person</p>
                          <p className="w-28 text-center text-xs">2 People</p>
                          <p className="w-28 text-center text-xs">3 People</p>
                          <p className="w-28 text-center text-xs">4 People</p>
                          <p className="w-28 text-center text-xs">5 People</p>
                          <p className="w-28 text-center text-xs">6 People</p>
                        </div>
                        {tipologyGroup.map((group, index) => (
                          <div key={index} className="flex flex-col gap-2">
                            <div className="flex flex-row gap-8 items-center">
                              <div className="w-2">
                                <button type="button" onClick={() => toggleExpandIndexes(index)}>
                                  {expandedIndexes.includes(index) ? <FaMinus size={10}/> : <FaPlus size={10}/>}
                                </button>
                              </div>
                              <p className="w-28 h-full my-auto">{group.name}</p>
                              <div className="w-28">
                                <InputFieldControlled
                                  type="number"
                                  name="Preco1"
                                  style={"w-30 outline-none h-10"}
                                  onChange={(event) => handleExpandedInputChangeTypology(index, event)}
                                />
                              </div>
                              <div className="w-28">
                                <InputFieldControlled
                                  type="number"
                                  name="Preco2"
                                  style={"w-30 outline-none h-10"}
                                  onChange={(event) => handleExpandedInputChangeTypology(index, event)}
                                />
                              </div>
                              <div className="w-28">
                                <InputFieldControlled
                                  type="number"
                                  name="Preco3"
                                  style={"w-30 outline-none h-10"}
                                  onChange={(event) => handleExpandedInputChangeTypology(index, event)}
                                />
                              </div>
                              <div className="w-28">
                                <InputFieldControlled
                                  type="number"
                                  name="Preco4"
                                  style={"w-30 outline-none h-10"}
                                  onChange={(event) => handleExpandedInputChangeTypology(index, event)}
                                />
                              </div>
                              <div className="w-28">
                                <InputFieldControlled
                                  type="number"
                                  name="Preco5"
                                  style={"w-30 outline-none h-10"}
                                  onChange={(event) => handleExpandedInputChangeTypology(index, event)}
                                />
                              </div>
                              <div className="w-28">
                                <InputFieldControlled
                                  type="number"
                                  name="Preco6"
                                  style={"w-30 outline-none h-10"}
                                  onChange={(event) => handleExpandedInputChangeTypology(index, event)}
                                />
                              </div>
                            </div>
                            {expandedIndexes.includes(index) && (
                              rooms.filter(room => room.roomType === group.roomTypeID).length > 0 ? (
                                rooms.filter(room => room.roomType === group.roomTypeID).map((room, roomIndex) => (
                                <div key={room.roomID} className="flex flex-row gap-8">
                                  <div className="w-2" />
                                  <p className="w-28">{room.label}</p>
                                  <div className="w-28">
                                    <InputFieldControlled
                                      type="number"
                                      name="PrecoQuarto1"
                                      style={"w-30 outline-none h-10 bg-slate-200"}
                                      value={expandedInputValues[room.roomID]?.PrecoQuarto1 ||''}
                                      onChange={(event) => handleExpandedInputChangeRoom(room.roomID, event)}
                                    />
                                  </div>
                                  <div className="w-28">
                                    <InputFieldControlled
                                      type="number"
                                      name="PrecoQuarto2"
                                      style={"w-30 outline-none h-10"}
                                      value={expandedInputValues[room.roomID]?.PrecoQuarto2 || ''}
                                      onChange={(event) => handleExpandedInputChangeRoom(room.roomID, event)}
                                    />
                                  </div>
                                  <div className="w-28">
                                    <InputFieldControlled
                                      type="number"
                                      name="PrecoQuarto3"
                                      style={"w-30 outline-none h-10"}
                                      value={expandedInputValues[room.roomID]?.PrecoQuarto3 || ''}
                                      onChange={(event) => handleExpandedInputChangeRoom(room.roomID, event)}
                                    />
                                  </div>
                                  <div className="w-28">
                                    <InputFieldControlled
                                      type="number"
                                      name="PrecoQuarto4"
                                      style={"w-30 outline-none h-10"}
                                      value={expandedInputValues[room.roomID]?.PrecoQuarto4 || ''}
                                      onChange={(event) => handleExpandedInputChangeRoom(room.roomID, event)}
                                    />
                                  </div>
                                  <div className="w-28">
                                    <InputFieldControlled
                                      type="number"
                                      name="PrecoQuarto5"
                                      style={"w-30 outline-none h-10"}
                                      value={expandedInputValues[room.roomID]?.PrecoQuarto5 || ''}
                                      onChange={(event) => handleExpandedInputChangeRoom(room.roomID, event)}
                                    />
                                  </div>
                                  <div className="w-28">
                                    <InputFieldControlled
                                      type="number"
                                      name="PrecoQuarto6"
                                      style={"w-30 outline-none h-10"}
                                      value={expandedInputValues[room.roomID]?.PrecoQuarto6 || ''}
                                      onChange={(event) => handleExpandedInputChangeRoom(room.roomID, event)}
                                    />
                                  </div>
                                </div>
                              ))
                            ): (
                              <div className="flex flex-row gap-8">
                                <div className="w-2" />
                                <p className="w-28">No rooms associated with this typology</p>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <ModalFooterContent
                        closeModal={onClose}
                        buttonColor={buttonColor}
                      />
                    </ModalFooter>
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

export default priceDescriptionForm;