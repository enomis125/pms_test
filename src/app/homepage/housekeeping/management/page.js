"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Button, Input
} from "@nextui-org/react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { format, parseISO, isWithinInterval, isToday } from 'date-fns';

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
import { FaArrowRight, FaArrowLeft, FaArrowDown, FaRegTimesCircle } from "react-icons/fa";

import { useTranslations } from 'next-intl';
import { formatISO } from "date-fns";

export default function ManagementForm() {

    const [roomData, setRoomData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
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

                if (reservationRecord) {
                    const checkInDate = parseISO(reservationRecord.checkInDate);
                    const checkOutDate = parseISO(reservationRecord.checkOutDate);

                    if (isToday(checkInDate)) {
                        reservationStateIcon = <FaArrowLeft />;
                    } else if (isToday(checkOutDate)) {
                        reservationStateIcon = <FaArrowRight />;
                    } else if (isWithinInterval(currentDate, { start: checkInDate, end: checkOutDate })) {
                        reservationStateIcon = <FaArrowDown />;
                    } else {
                        reservationStateIcon = <FaRegTimesCircle />;
                    }
                } else {
                    if (isToday(room.checkOutDate)) {
                        reservationStateIcon = <FaRegTimesCircle />;
                    } else {
                        reservationStateIcon = <FaRegTimesCircle />;
                    }
                }

                return {
                    ...room,
                    state: housekeepingRecord ? stateOrder[housekeepingRecord.roomStatus - 1] : 'outOfService',
                    adultCount: reservationRecord ? reservationRecord.adultCount : 0,
                    reservationStateIcon,
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

            await addHousekeepingLog(roomNumber, newState); // Chama a função para adicionar o log
        } catch (error) {
            console.error("Error updating room status:", error);
        }
    };

    const filteredRoomData = roomData.filter(room =>
        `${room.label} ${room.roomtypes.desc}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                                <div className="flex flex-col justify-center items-center text-center bg-white p-2" title="NR. GUESTS">
                                    <span><IoPeopleSharp /></span>
                                </div>
                            </td>
                            <td className="h-14 border border-tableCol select-none w-[40px]">
                                <div className="flex flex-col justify-center items-center text-center bg-white p-2" title="NR. OF BEDROOMS">
                                    <span><FaBed /></span>
                                </div>
                            </td>
                            <td className="h-14 border border-tableCol select-none w-[40px]">
                                <div className="flex flex-col justify-center items-center text-center bg-white p-2" title="IN / OUT">
                                    <span><TbTransferVertical /></span>
                                </div>
                            </td>
                            <td className="h-14 border border-tableCol select-none w-[40px]">
                                <div className="flex flex-col justify-center items-center text-center bg-white p-2" title="CHANGE SHEETS">
                                    <span><MdComputer /></span>
                                </div>
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
                                        <div className="h-10 flex flex-col justify-center text-center border-2 border-white p-1.5">
                                            <span>1</span>
                                        </div>
                                    </td>
                                    {stateOrder.map((state, stateIndex) => (
                                        <Droppable droppableId={`${stateIndex}`} key={state}>
                                            {(provided, snapshot) => (
                                                <td
                                                    className={`border border-tableCol border-2 border-white rounded-lg select-none w-[150px] m-2 ${state === room.state && !snapshot.isDraggingOver ? stateColors[state] : ''}`}
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
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
        </main>
    );
}
