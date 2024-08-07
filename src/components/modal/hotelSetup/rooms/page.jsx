"use client";
import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import axios from 'axios';
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import roomsInsert, { roomsEdit } from "@/components/functionsForm/CRUD/hotel/rooms/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";

import { expansion } from "@/components/functionsForm/expansion/page";
import ModalFooterContent from "@/components/modal/modalFooterContent";

import CaracteristicsAutocomplete from "@/components/functionsForm/autocomplete/caracteristic/page";
import TipologyAutocomplete from "@/components/functionsForm/autocomplete/tipology/page";

import { useTranslations } from 'next-intl';

const RoomForm = ({
  idRoom,
  idRoomType,
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
  isOpen,
  onOpen,
  onOpenChange,
  onClose,
}) => {

  const { handleInputRoom, handleSubmitRoom, handleCaracteristicSelect, handleTipologySelect } = roomsInsert();
  const { handleUpdateRoom, setValuesRoom, valuesRoom } = roomsEdit(idRoom, idRoomType);

  const { toggleExpand, setIsExpanded, isExpanded } = expansion();

  const t = useTranslations('Index');

  useEffect(() => {
    if (formTypeModal === 12 && idRoom) {
      // Fetch the room data based on idRoom and setValuesRoom accordingly
      // This ensures that the edit form is pre-populated with the correct data
      axios.get(`/api/rooms/${idRoom}`)
        .then(response => {
          setValuesRoom(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the room data!", error);
        });
    }
  }, [idRoom, formTypeModal, setValuesRoom]);

    return (
        <>

            {formTypeModal === 11 && ( //rooms insert
                <>
                    <Modal
                        isOpen={isOpen}
                        hideCloseButton={true}
                        onOpenChange={onOpenChange}
                        isDismissable={false}
                        isKeyboardDismissDisabled={true}
                        className="z-50"
                        size="xl"
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <form onSubmit={handleSubmitRoom}>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                            {modalHeader}
                                            <div className='flex flex-row items-center'>
                                                <Button color="transparent" onClick={() => { onClose(); window.location.reload(); }} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" variant="light" onClick={() => { onClose(); window.location.reload(); }}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8 overflow-y-auto" style={{ maxHeight: '80vh' }}>
                                            <InputFieldControlled
                                                type={"text"}
                                                id={"description"}
                                                name={"Description"}
                                                label={t("hotel.rooms.descriptionLabel")}
                                                ariaLabel={"Description"}
                                                style={"w-full outline-none h-10"}
                                                onChange={handleInputRoom} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"abreviature"}
                                                name={"Label"}
                                                label={t("hotel.rooms.shortnameLabel")}
                                                ariaLabel={"Short Name"}
                                                style={"w-full outline-none h-10"}
                                                onChange={handleInputRoom} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"roomType"}
                                                name={"RoomType"}
                                                label={t("hotel.rooms.roomTypeLabel")}
                                                ariaLabel={"Room Type"}
                                                style={"w-full outline-none h-10"} />

                                            <div className="w-full flex flex-col gap-4">
                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <TipologyAutocomplete
                                                        label={t("hotel.rooms.selectTipologyLabel")}
                                                        style={""}
                                                        onChange={(value) => handleTipologySelect(value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col md:flex-row justify-between">
                                                <div className="flex flex-col w-1/2">
                                                    <p className="text-sm">{t("hotel.rooms.maxOccupationLabel")}</p>
                                                    <p className="text-xl">1</p>
                                                </div>
                                                <div className="flex flex-col w-1/2">
                                                    <p className="text-sm">{t("hotel.rooms.orderLabel")}</p>
                                                    <p className="text-xl">1</p>
                                                </div>
                                            </div>

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"depHousekeeping"}
                                                name={"depHousekeeping"}
                                                label={t("hotel.rooms.housekeepingDeptLabel")}
                                                style={"w-full outline-none h-10"}

                                                ariaLabel={"Housekeeping Department"} />

                                            <div className="flex gap-4 items-center max-w-xs">
                                                <Button size="md">
                                                {t("hotel.rooms.interfaceConfigLabel")}
                                                </Button>
                                            </div>

                                            <div className="w-full flex flex-col gap-4">
                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <CaracteristicsAutocomplete
                                                        label={t("hotel.rooms.selectCharacteristicLabel")}
                                                        style={""}
                                                        onChange={(value) => handleCaracteristicSelect(value)}
                                                    />
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
                    <Modal
                        isOpen={isOpen}
                        hideCloseButton={true}
                        onOpenChange={onClose}
                        isDismissable={false}
                        isKeyboardDismissDisabled={true}
                        className="z-50"
                        size="xl"
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <form onSubmit={(e) => handleUpdateRoom(e)}>
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                            <div className="flex flex-row justify-start gap-4">
                                                {editIcon} {modalHeader} {modalEditArrow} {modalEdit}
                                            </div>
                                            <div className='flex flex-row items-center'>
                                                <Button color="transparent" onClick={() => { onClose(); window.location.reload(); }} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" variant="light" onClick={() => { onClose(); window.location.reload(); }}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8 overflow-y-auto" style={{ maxHeight: '80vh' }}>
                                            <InputFieldControlled
                                                type={"text"}
                                                id={"description"}
                                                name={"Description"}
                                                label={t("hotel.rooms.descriptionLabel")}
                                                ariaLabel={"Description"}
                                                style={"w-full outline-none h-10"}
                                                value={valuesRoom.Description}
                                                onChange={e => setValuesRoom({ ...valuesRoom, Description: e.target.value })} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"abreviature"}
                                                name={"Label"}
                                                label={t("hotel.rooms.shortnameLabel")}
                                                ariaLabel={"Short Name"}
                                                style={"w-full outline-none h-10"}
                                                value={valuesRoom.Label}
                                                onChange={e => setValuesRoom({ ...valuesRoom, Label: e.target.value })} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"roomType"}
                                                name={"RoomType"}
                                                label={t("hotel.rooms.roomTypeLabel")}
                                                ariaLabel={"Room Type"}
                                                style={"w-full outline-none h-10"}
                                                value={valuesRoom.RoomType}
                                                onChange={e => setValuesRoom({ ...valuesRoom, RoomType: e.target.value })} />

                                            <div className="w-full flex flex-col gap-4">
                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <TipologyAutocomplete
                                                        label={t("hotel.rooms.selectTipologyLabel")}
                                                        style={""}
                                                        onChange={(value) => handleTipologySelect(value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col md:flex-row justify-between">
                                                <div className="flex flex-col w-1/2">
                                                    <p className="text-sm">{t("hotel.rooms.maxOccupationLabel")}</p>
                                                    <p className="text-xl">1</p>
                                                </div>
                                                <div className="flex flex-col w-1/2">
                                                    <p className="text-sm">{t("hotel.rooms.orderLabel")}</p>
                                                    <p className="text-xl">1</p>
                                                </div>
                                            </div>

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"depHousekeeping"}
                                                name={"depHousekeeping"}
                                                label={t("hotel.rooms.housekeepingDeptLabel")}
                                                style={"w-full outline-none h-10"}
                                                ariaLabel={"Housekeeping Department"} />

                                            <div className="flex gap-4 items-center max-w-xs">
                                                <Button size="md">
                                                {t("hotel.rooms.interfaceConfigLabel")}
                                                </Button>
                                            </div>

                                            <div className="w-full flex flex-col gap-4">

                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <CaracteristicsAutocomplete
                                                        label={t("hotel.rooms.selectCharacteristicLabel")}
                                                        style={""}
                                                        onChange={(value) => handleCaracteristicSelect(value)}
                                                    />
                                                </div>
                                            </div>
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

export default RoomForm;