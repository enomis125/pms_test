"use client"
import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { MdClose } from "react-icons/md";
import useLostAndFoundInsert , { useLostAndFoundEdit } from "@/components/functionsForm/CRUD/housekeeping/lostAndFound/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import { expansion } from "@/components/functionsForm/expansion/page";
import { RadioGroup, Radio } from "@nextui-org/react";
import {useTranslations} from 'next-intl'; 

const LostAndFoundForm = ({
    buttonName,
    buttonIcon,
    modalHeader,
    formTypeModal,
    buttonColor,
    idLostandFound,
}) => {
    const t = useTranslations('Index'); 
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { handleInputChangeLostAndFound, handleSubmitLostAndFound } = useLostAndFoundInsert();
    const { handleUpdateLostAndFound, setValuesLostAndFound, valueslostAndFound } = useLostAndFoundEdit(idLostandFound);
    const { toggleExpand, setIsExpanded, isExpanded } = expansion();


    return (
        <>
            {formTypeModal === 10 && (
                <>
                    <Button onPress={onOpen} color={buttonColor} className="w-fit">
                        {buttonName} {buttonIcon}
                    </Button>
                    <Modal
                        isOpen={isOpen}
                        hideCloseButton={true}
                        onOpenChange={onOpenChange}
                        isDismissable={false}
                        isKeyboardDismissDisabled={true}
                        className="z-50"
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <form onSubmit={handleSubmitLostAndFound}>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                            {modalHeader}
                                            <div className="flex flex-row items-center mr-5">
                                                <Button color="transparent" onPress={onClose} className="-mr-20" type="submit">
                                                    <TfiSave size={25} />
                                                </Button>
                                            </div>
                                            <div className="flex flex-row items-center">
                                                <Button color="transparent" variant="light" onPress={onClose} className="-mr-4">
                                                    <MdClose size={30} />
                                                </Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                            <div className="flex flex-col space-y-2">
                                                <InputFieldControlled
                                                    type="date"
                                                    id="date"
                                                    name="date"
                                                    label={t("housekeeping.lostandfound.new.RegistrationDate")}
                                                    ariaLabel="Registration Date"
                                                    style="w-full outline-none h-10"
                                                    onChange={handleInputChangeLostAndFound}

                                                />

                                                <InputFieldControlled
                                                    type="text"
                                                    id="isFound"
                                                    name="isFound"
                                                    label={t("housekeeping.lostandfound.new.State")}
                                                    ariaLabel="State"
                                                    style="w-full outline-none h-10"
                                                    onChange={handleInputChangeLostAndFound}
                                                />

                                                <InputFieldControlled
                                                    type="text"
                                                    id="roomNumber"
                                                    name="roomNumber"
                                                    label={t("housekeeping.lostandfound.new.Room")}
                                                    ariaLabel="Room"
                                                    style="w-full outline-none h-10 mt-2"
                                                    onChange={handleInputChangeLostAndFound}
                                                />
                                            </div>

                                            <div className="flex flex-col space-y-2">
                                                <InputFieldControlled
                                                    type="text"
                                                    id="location"
                                                    name="location"
                                                    label={t("housekeeping.lostandfound.new.Local")}
                                                    ariaLabel="Local"
                                                    style="w-full outline-none h-10"
                                                    onChange={handleInputChangeLostAndFound}
                                                />

                                                <InputFieldControlled
                                                    type="text"
                                                    id="userName"
                                                    name="userName"
                                                    label={t("housekeeping.lostandfound.new.GuestName")}
                                                    ariaLabel="Guest Name"
                                                    style="w-full outline-none h-10 mt-4"
                                                    onChange={handleInputChangeLostAndFound}
                                                />
                                            </div>

                                            <InputFieldControlled
                                                type="text"
                                                id="description"
                                                name="description"
                                                label={t("housekeeping.lostandfound.new.itemOccurrence")}
                                                ariaLabel="Item Occurrence"
                                                style="w-full outline-none h-10"
                                                onChange={handleInputChangeLostAndFound}
                                            />

                                            <div className="flex flex-col space-y-2">
                                                <InputFieldControlled
                                                    type="text"
                                                    id="foundByUser"
                                                    name="foundByUser"
                                                    label={t("housekeeping.lostandfound.new.User")}
                                                    ariaLabel="User"
                                                    style="w-full outline-none h-10"
                                                    onChange={handleInputChangeLostAndFound}
                                                />

                                                <RadioGroup
                                                    orientation="horizontal"
                                                    className="mt-2"
                                                    defaultValue="perdidos"
                                                >
                                                    <Radio value="perdidos">{t("housekeeping.lostandfound.new.radioGroup.lost")}</Radio>
                                                    <Radio value="achados">{t("housekeeping.lostandfound.new.radioGroup.found")}</Radio>
                                                    <Radio value="concluidos">{t("housekeeping.lostandfound.new.radioGroup.concluded")}</Radio>
                                                </RadioGroup>
                                            </div>
                                        </ModalBody>
                                    </form>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}
            {formTypeModal === 12 && (
                <>
                    <Button onPress={onOpen} color={buttonColor}  className="-h-3 flex justify-start -p-3">
                        {buttonName} {buttonIcon}
                    </Button>
                    <Modal
                        isOpen={isOpen}
                        hideCloseButton={true}
                        onOpenChange={onOpenChange}
                        isDismissable={false}
                        isKeyboardDismissDisabled={true}
                        className="z-50"
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <form onSubmit={(e) => handleUpdateLostAndFound(e)}>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                            {modalHeader}
                                            <div className="flex flex-row items-center mr-5">
                                                <Button color="transparent" onPress={onClose} className="-mr-20" type="submit">
                                                    <TfiSave size={25} />
                                                </Button>
                                            </div>
                                            <div className="flex flex-row items-center">
                                                <Button color="transparent" variant="light" onPress={onClose} className="-mr-4">
                                                    <MdClose size={30} />
                                                </Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                            <div className="flex flex-col space-y-2">
                                                <InputFieldControlled
                                                    type="date"
                                                    id="date"
                                                    name="date"
                                                    label={t("housekeeping.lostandfound.new.RegistrationDate")}
                                                    ariaLabel="Registration Date"
                                                    style="w-full outline-none h-10"
                                                />

                                                <InputFieldControlled
                                                    type="text"
                                                    id="isFound"
                                                    name="isFound"
                                                    label={t("housekeeping.lostandfound.new.State")}
                                                    ariaLabel="State"
                                                    style="w-full outline-none h-10"
                                                    value ={valueslostAndFound.IsFound}
                                                    onChange={e => setValuesLostAndFound({...valueslostAndFound, IsFound: e.target.value})}
                                                />

                                                <InputFieldControlled
                                                    type="text"
                                                    id="roomNumber"
                                                    name="roomNumber"
                                                    label={t("housekeeping.lostandfound.new.Room")}
                                                    ariaLabel="Room"
                                                    style="w-full outline-none h-10 mt-2"
                                                    value ={valueslostAndFound.RoomNumber}
                                                    onChange={e => setValuesLostAndFound({...valueslostAndFound, RoomNumber: e.target.value})}
                                                />
                                            </div>

                                            <div className="flex flex-col space-y-2">
                                                <InputFieldControlled
                                                    type="text"
                                                    id="location"
                                                    name="location"
                                                    label={t("housekeeping.lostandfound.new.Local")}
                                                    ariaLabel="Local"
                                                    style="w-full outline-none h-10"
                                                    value ={valueslostAndFound.Location}
                                                    onChange={e => setValuesLostAndFound({...valueslostAndFound, Location: e.target.value})}
                                                />

                                                <InputFieldControlled
                                                    type="text"
                                                    id="userName"
                                                    name="userName"
                                                    label={t("housekeeping.lostandfound.new.GuestName")}
                                                    ariaLabel="Guest Name"
                                                    style="w-full outline-none h-10 mt-4"
                                                    value ={valueslostAndFound.UserName}
                                                    onChange={e => setValuesLostAndFound({...valueslostAndFound, UserName: e.target.value})}
                                                />
                                            </div>

                                            <InputFieldControlled
                                                type="text"
                                                id="description"
                                                name="description"
                                                label={t("housekeeping.lostandfound.new.itemOccurrence")}
                                                ariaLabel="item Occurrence"
                                                style="w-full outline-none h-10"
                                                value ={valueslostAndFound.Description}
                                                onChange={e => setValuesLostAndFound({...valueslostAndFound, Description: e.target.value})}
                                            />

                                            <div className="flex flex-col space-y-2">
                                                <InputFieldControlled
                                                    type="text"
                                                    id="foundByUser"
                                                    name="foundByUser"
                                                    label={t("housekeeping.lostandfound.new.User")}
                                                    ariaLabel="User"
                                                    style="w-full outline-none h-10"
                                                    value ={valueslostAndFound.FoundByUser}
                                                onChange={e => setValuesLostAndFound({...valueslostAndFound, FoundByUser: e.target.value})}
                                                />

                                                <RadioGroup
                                                    orientation="horizontal"
                                                    className="mt-2"
                                                    defaultValue="perdidos"
                                                >
                                                    <Radio value="perdidos">{t("housekeeping.lostandfound.new.radioGroup.lost")}</Radio>
                                                    <Radio value="achados">{t("housekeeping.lostandfound.new.radioGroup.found")}</Radio>
                                                    <Radio value="concluidos">{t("housekeeping.lostandfound.new.radioGroup.concluded")}</Radio>
                                                </RadioGroup>
                                            </div>
                                        </ModalBody>
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

export default LostAndFoundForm;
