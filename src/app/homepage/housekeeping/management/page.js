"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Button, Input,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Tooltip,
    Select,
    Textarea,
    SelectItem
} from "@nextui-org/react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { format, parseISO, isWithinInterval, isToday, formatISO , differenceInDays } from 'date-fns';

import { IoPeopleSharp } from "react-icons/io5";
import { FaBed, FaXmark, FaCheck } from "react-icons/fa6";
import { TbTransferVertical } from "react-icons/tb";
import { MdComputer, MdOutlineTouchApp } from "react-icons/md";
import { ImWrench } from "react-icons/im";
import { GiBroom } from "react-icons/gi";
import { IoFilter } from "react-icons/io5";
import { RxFrame } from "react-icons/rx";
import { HiRefresh } from "react-icons/hi";
import { CgSearchFound } from "react-icons/cg";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaArrowRight, FaArrowLeft, FaArrowDown, FaRegTimesCircle } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { IoSyncCircleOutline } from "react-icons/io5";
import { MdCheck } from "react-icons/md";

import { useTranslations } from 'next-intl';

export default function ManagementForm() {
    const [roomData, setRoomData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({
        roomStatus: '',
        reason: '',
        text: '',
        date: '',
        user1: '',
        change: '',
        user2: '',
        refNumber: '',
        text2: '',
        document: '',
        priority: false,
        roomNumber: ''
    });

    const getCurrentTimestamp = () => formatISO(new Date());
    const t = useTranslations('Index');

    const stateOrder = ['outOfService', 'dirty', 'touched', 'cleaning', 'checked', 'clean'];

    const stateColors = {
        outOfService: 'bg-neutral-300',
        dirty: 'bg-red-600',
        touched: 'bg-orange-400',
        cleaning: 'bg-yellow-300',
        checked: 'bg-cyan-400',
        clean: 'bg-lime-400',
    };
    const stateValues = {
        outOfService: 1,
        dirty: 2,
        touched: 3,
        cleaning: 4,
        checked: 5,
        clean: 6
    };

    const determineLinenChangeIcon = (checkInDate, checkOutDate) => {
        const currentDate = new Date();
        
        // Verifique se as datas são válidas
        if (!checkInDate || !checkOutDate) return <MdCheck />;
    
        const reservationStart = parseISO(checkInDate);
        const reservationEnd = parseISO(checkOutDate);
    
        // Verifique se as datas foram analisadas corretamente
        if (isNaN(reservationStart.getTime()) || isNaN(reservationEnd.getTime())) {
            console.warn('Invalid date values:', checkInDate, checkOutDate);
            return <MdCheck />;
        }
    
        const daysBetween = differenceInDays(reservationEnd, reservationStart);
        const daysSinceCheckIn = differenceInDays(currentDate, reservationStart);
    
        if (isWithinInterval(currentDate, { start: reservationStart, end: reservationEnd })) {
            if (daysBetween <= 7) {
                // Reserva até uma semana: troca de lençóis a cada 2 dias
                return daysSinceCheckIn % 2 === 0 ? <IoSyncCircleOutline /> : <MdCheck />;
            } else if (daysBetween <= 30) {
                // Reserva até 1 mês: troca de lençóis a cada 4 dias
                return daysSinceCheckIn % 4 === 0 ? <IoSyncCircleOutline /> : <MdCheck />;
            }
        }
    
        return <MdCheck />; // Caso contrário, não é necessário trocar lençóis
    };
    
    const fetchData = async () => {
        try {
            const currentDate = new Date();
            const formattedCurrentDate = format(currentDate, 'yyyy-MM-dd');
    
            const resRoomTypes = await axios.get(`/api/v1/hotel/tipologys`);
            const roomTypes = resRoomTypes.data.response;
    
            const [resRooms, resHousekeeping, resReservations] = await Promise.all([
                axios.get(`/api/v1/hotel/rooms`),
                axios.get(`/api/v1/housekeeping/management/`),
                axios.get(`/api/v1/frontOffice/reservations/`)
            ]);
    
            const rooms = resRooms.data.response;
            const housekeeping = resHousekeeping.data;
            const reservations = resReservations.data.response;
    
            const filteredReservations = reservations.filter(reservation =>
                isWithinInterval(currentDate, {
                    start: parseISO(reservation.checkInDate),
                    end: parseISO(reservation.checkOutDate)
                })
            );
    
            const combinedData = rooms.map(room => {
                const housekeepingRecord = housekeeping.find(h => h.roomNumber === room.roomID);
                const reservationRecord = filteredReservations.find(r => r.roomNumber === parseInt(room.label));
    
                const roomType = roomTypes.find(rt => rt.roomTypeID === room.roomType);
    
                let reservationStateIcon;
                let linenChangeIcon = <MdCheck />; // Valor padrão
    
                if (reservationRecord) {
                    const checkInDate = reservationRecord.checkInDate;
                    const checkOutDate = reservationRecord.checkOutDate;
    
                    if (checkInDate && checkOutDate) {
                        const parsedCheckInDate = parseISO(checkInDate);
                        const parsedCheckOutDate = parseISO(checkOutDate);
    
                        if (isNaN(parsedCheckInDate.getTime()) || isNaN(parsedCheckOutDate.getTime())) {
                            reservationStateIcon = <FaMinus />;
                        } else {
                            if (isToday(parsedCheckInDate)) {
                                reservationStateIcon = <FaArrowRight />;
                            } else if (isToday(parsedCheckOutDate)) {
                                reservationStateIcon = <FaArrowLeft />;
                            } else if (isWithinInterval(currentDate, { start: parsedCheckInDate, end: parsedCheckOutDate })) {
                                reservationStateIcon = <MdOutlineAccessTime />;
                            } else {
                                reservationStateIcon = <FaMinus />;
                            }
    
                            linenChangeIcon = determineLinenChangeIcon(checkInDate, checkOutDate);
                        }
                    } else {
                        reservationStateIcon = <FaMinus />;
                    }
                } else {
                    if (room.checkOutDate && isToday(parseISO(room.checkOutDate))) {
                        reservationStateIcon = <FaArrowLeft />;
                    } else {
                        reservationStateIcon = <FaMinus />;
                    }
                }
    
                return {
                    ...room,
                    state: housekeepingRecord ? stateOrder[housekeepingRecord.roomStatus - 1] : 'outOfService',
                    adultCount: reservationRecord ? reservationRecord.adultCount : 0,
                    reservationStateIcon,
                    linenChangeIcon,
                    numBeds: roomType ? roomType.numBeds : 0
                };
            });
    
            setRoomData(combinedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    const addHousekeepingLog = async (roomNumber, roomState) => {
        const currentTime = new Date();
        const formattedDate = format(currentTime, 'yyyy-MM-dd');
        const formattedTime = format(currentTime, 'HH:mm:ss');

        try {
            await axios.put('/api/v1/logs', {
                roomNumber,
                roomState,
                timestamp: `${formattedDate}T${formattedTime}`,
            });
        } catch (error) {
            console.error('Error creating housekeeping log:', error);
        }
    };

    const onDragEnd = async (result) => {
        if (!result.destination) return;

        const { source, destination, draggableId } = result;

        if (source.droppableId === destination.droppableId) return;

        const roomIndex = parseInt(draggableId);
        const newState = stateOrder[parseInt(destination.droppableId)];

        const newRoomData = roomData.map((room, index) => {
            if (index === roomIndex) {
                return {
                    ...room,
                    state: newState
                };
            }
            return room;
        });

        setRoomData(newRoomData);

        try {
            const roomNumber = newRoomData[roomIndex].roomID;
            const roomStatus = stateValues[newState];

            await axios.patch(`/api/v1/housekeeping/management/${roomNumber}`, {
                data: {
                    roomNumber,
                    roomStatus,
                }
            });

            await addHousekeepingLog(roomNumber, newState);
        } catch (error) {
            console.error("Error updating room status:", error);
        }
    };

    const filteredRoomData = roomData.filter(room =>
        `${room.label} ${room.roomtypes.desc}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleOutOfServiceClick = (roomIndex) => {
        const roomNumber = roomData[roomIndex].roomID;
        setModalData(prevState => ({
            ...prevState,
            roomNumber: roomNumber
        }));
        setModalVisible(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setModalData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAdd = async () => {
        try {

            const response = await axios.put('/api/v1/housekeeping/maintenanceRooms', {
                data: modalData
            });

            console.log('Response from PUT request:', response.data);


            closeModal();
        } catch (error) {
            console.error('Error adding maintenance room:', error);

        }
    };


    return (
        <main>
            <div className='bg-primary-600 py-5 max-h-16'>
                <div className='flex justify-between'>
                    <p className='text-ml text-white px-4'><b>{t("housekeeping.management.managementTitle")}</b></p>
                    <div className='flex items-center gap-5 mr-4'>
                        <Button className=" bg-gradient-to-tr from-gray-50 to-gray-50 text-black shadow-lg justify-center" startContent={<RxFrame />}>{t("housekeeping.management.managementTitleButtonBulk")}</Button>
                        <Button className="  bg-gradient-to-tr from-gray-50 to-gray-50 text-black shadow-lg justify-center" startContent={<IoFilter />}>{t("housekeeping.management.managementTitleButtonFilter")}</Button>
                    </div>
                </div>
            </div>
            <div className="">
                <table className="w-full table-fixed bg-tableCol">
                    <thead>
                        <tr>
                            <th className="w-[15%] bg-tableCol text-left px-4">
                                <Input
                                    type="text"
                                    placeholder={t("housekeeping.management.managementFilterRooms")}
                                    startContent={<HiRefresh />}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </th>
                            <td className="h-14 border border-tableCol select-none w-[40px]">
                                <Tooltip
                                    content={
                                        <div className="px-1 py-2">
                                            <div className="text-small font-bold">NR. GUESTS</div>
                                            <div className="text-tiny">Number of people in the room on reservation</div>
                                        </div>
                                    }
                                >
                                    <div className="flex flex-col justify-center items-center text-center bg-white p-2">
                                        <span><IoPeopleSharp /></span>
                                    </div>
                                </Tooltip>
                            </td>
                            <td className="h-14 border border-tableCol select-none w-[40px]">
                                <Tooltip
                                    content={
                                        <div className="px-1 py-2">
                                            <div className="text-small font-bold">NR. OF BEDROOMS</div>
                                            <div className="text-tiny">Number of beds in the room</div>
                                        </div>
                                    }
                                >
                                    <div className="flex flex-col justify-center items-center text-center bg-white p-2">
                                        <span><FaBed /></span>
                                    </div>
                                </Tooltip>
                            </td>
                            <td className="h-14 border border-tableCol select-none w-[40px]">
                                <Tooltip
                                    content={
                                        <div className="px-1 py-2">
                                            <div className="text-small font-bold">IN / OUT</div>
                                            <div className="text-tiny pb-4">Status of reserves</div>
                                            <div className="text-tiny pb-2"><FaArrowRight /> Check In</div>
                                            <div className="text-tiny pb-2"><FaArrowLeft /> Check Out</div>
                                            <div className="text-tiny pb-2"><MdOutlineAccessTime /> Stay</div>
                                            <div className="text-tiny pb-2"><FaMinus /> No reservation</div>
                                        </div>
                                    }
                                >
                                    <div className="flex flex-col justify-center items-center text-center bg-white p-2">
                                        <span><TbTransferVertical /></span>
                                    </div>
                                </Tooltip>
                            </td>
                            <td className="h-14 border border-tableCol select-none w-[40px]">
                                <Tooltip
                                    content={
                                        <div className="px-1 py-2">
                                            <div className="text-small font-bold">CHANGE SHEETS</div>
                                            <div className="text-tiny">Changing sheets</div>
                                        </div>
                                    }
                                >
                                    <div className="flex flex-col justify-center items-center text-center bg-white p-2">
                                        <span><MdComputer /></span>
                                    </div>
                                </Tooltip>
                            </td>
                            {stateOrder.map((state, stateIndex) => (
                                <td className="h-14 border border-tableCol select-none w-[150px]" key={stateIndex}>
                                    <div className="flex items-center justify-center text-center bg-white border border-grey p-2 rounded-lg">
                                        {state === 'outOfService' && <ImWrench />}
                                        {state === 'dirty' && <FaXmark />}
                                        {state === 'touched' && <MdOutlineTouchApp />}
                                        {state === 'cleaning' && <GiBroom />}
                                        {state === 'checked' && <CgSearchFound size={20} />}
                                        {state === 'clean' && <FaCheck />}
                                        <span className="text-sm uppercase">{t(`housekeeping.management.managementTable${state.charAt(0).toUpperCase() + state.slice(1)}`)}</span>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    </thead>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <tbody>
                            {filteredRoomData.map((room, roomIndex) => (
                                <tr key={room.roomID}>
                                    <td className='flex flex-col max-w-45 text-xs w-full h-10 justify-between items-left border-b-2 bg-white p-1'>
                                        <span className="font-bold">{room.label}</span>
                                        <span>{room.roomtypes.desc}</span>
                                    </td>
                                    <td className="border border-tableCol select-none w-[40px]">
                                        <div className="h-10 flex flex-col justify-center text-center border-2 border-white p-1.5">
                                            <span>{room.adultCount}</span>
                                        </div>
                                    </td>
                                    <td className="border border-tableCol select-none w-[40px]">
                                        <div className="h-10 flex flex-col justify-center text-center border-2 border-white p-1.5">
                                            <span>{room.numBeds}</span>
                                        </div>
                                    </td>
                                    <td className="border border-tableCol select-none w-[40px]">
                                        <div className="h-10 flex flex-col content-center justify-center text-center border-2 border-white p-2.5">
                                            <span>{room.reservationStateIcon}</span>
                                        </div>
                                    </td>
                                    <td className="border border-tableCol select-none w-[40px]">
                                    <div className="h-10 flex flex-col content-center justify-center text-center border-2 border-white p-2.5">
                                            <span>{room.linenChangeIcon}</span>
                                        </div>
                                    </td>
                                    {stateOrder.map((state, stateIndex) => (
                                        <Droppable droppableId={`${stateIndex}`} key={state}>
                                            {(provided, snapshot) => (
                                                <td
                                                    className={`border border-tableCol border-2 border-white rounded-lg select-none w-[150px] m-2 ${state === room.state && !snapshot.isDraggingOver ? stateColors[state] : ''}`}
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                    onClick={() => state === 'outOfService' && handleOutOfServiceClick(roomIndex)}
                                                >
                                                    {state === room.state ? (
                                                        <Draggable draggableId={`${roomIndex}`} index={roomIndex}>
                                                            {(provided, snapshot) => (
                                                                <div
                                                                    className={`flex flex-col items-left text-xs justify-between text-left p-1 ${snapshot.isDragging ? stateColors[room.state] : ''}`}
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    <span className="font-bold">{room.label}</span>
                                                                    <span>{room.roomtypes.desc}</span>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ) : null}
                                                    {provided.placeholder}
                                                </td>
                                            )}
                                        </Droppable>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </DragDropContext>
                </table>
            </div>

            <Modal isOpen={modalVisible} onClose={closeModal}>
                <ModalContent className="max-w-lg">
                    <ModalHeader>New Work Task</ModalHeader>
                    <ModalBody>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <Select
                                    label="Priority"
                                    name="priority"
                                    value={modalData.priority}
                                    onChange={handleChange}
                                >
                                    <SelectItem value="High">High</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="Low">Low</SelectItem>
                                </Select>
                            </div>
                            <div className="col-span-1">
                                <Select
                                    label="Status"
                                    name="status"
                                    value={modalData.status}
                                    onChange={handleChange}
                                >
                                    <SelectItem value="Open">Open</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Closed">Closed</SelectItem>
                                </Select>
                            </div>
                            <div className="col-span-1">
                                <Select
                                    label="Location Type"
                                    name="locationType"
                                    value={modalData.locationType}
                                    onChange={handleChange}
                                >
                                    <SelectItem value="All">All</SelectItem>

                                </Select>
                            </div>
                            <div className="col-span-1">
                                <Select
                                    label="Location"
                                    name="location"
                                    value={modalData.location}
                                    onChange={handleChange}
                                >
                                    <SelectItem value="">Location *</SelectItem>
                                </Select>
                            </div>
                            <div className="col-span-1">
                                <Select
                                    label="Room Status"
                                    name="roomStatus"
                                    value={modalData.roomStatus}
                                    onChange={handleChange}
                                >
                                </Select>
                            </div>
                            <div className="col-span-1">
                                <Input
                                    label="Reason"
                                    placeholder="State the reason"
                                    name="reason"
                                    value={modalData.reason}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-span-2">
                                <Textarea
                                    label="Description"
                                    placeholder="Enter description"
                                    name="description"
                                    value={modalData.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-span-2">
                                <Select
                                    label="Assignee"
                                    name="assignee"
                                    value={modalData.assignee}
                                    onChange={handleChange}
                                >
                                </Select>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={closeModal}>Close</Button>
                        <Button onClick={handleAdd}>Add</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </main>
    );
}
