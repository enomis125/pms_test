"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Button, Input
} from "@nextui-org/react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { format, parseISO, isSameDay } from 'date-fns';

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

import { useTranslations } from 'next-intl';

export default function ManagementForm() {

    const [roomData, setRoomData] = useState([]);
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
            const currentDate = format(new Date(), 'yyyy-MM-dd');

            const [resRooms, resHousekeeping, resReservations] = await Promise.all([
                axios.get(`/api/v1/hotel/rooms`),
                axios.get(`/api/v1/housekeeping/management/`),
                axios.get(`/api/v1/frontOffice/reservations/`)
            ]);

            const rooms = resRooms.data.response;
            const housekeeping = resHousekeeping.data;
            const reservations = resReservations.data.response;

            //Filter date 
            const filteredReservations = reservations.filter(reservation =>
            isSameDay(parseISO(reservation.checkInDate), currentDate)
        );

            const combinedData = rooms.map(room => {
                const housekeepingRecord = housekeeping.find(h => h.roomNumber === room.roomID);
                const reservationRecord = filteredReservations.find(r => r.roomNumber === parseInt(room.label));

                return {
                    ...room,
                    state: housekeepingRecord ? stateOrder[housekeepingRecord.roomStatus - 1] : 'outOfService',
                    adultCount: reservationRecord ? reservationRecord.adultCount : 0
                };
            });

            console.log('Combined Data:', combinedData);

            setRoomData(combinedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onDragEnd = async (result) => {
        if (!result.destination) return;

        const newStateIndex = parseInt(result.destination.droppableId);
        const roomTypeIndex = parseInt(result.draggableId);
        const newRoomData = [...roomData];
        newRoomData[roomTypeIndex].state = stateOrder[newStateIndex];

        setRoomData(newRoomData);

        try {
            const roomNumber = newRoomData[roomTypeIndex].roomID;
            const roomStatus = stateValues[stateOrder[newStateIndex]];

            await axios.patch(`/api/v1/housekeeping/management/${roomNumber}`, {
                data: {
                    roomNumber,
                    roomStatus,
                }
            });

        } catch (error) {
            console.error("Error updating room status:", error);
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
            <table className='w-[100%] bg-tableCol'>
                <thead>
                    <tr>
                        <th className='w-[15%] bg-tableCol text-left px-4'><Input type="text" placeholder={t("housekeeping.management.managementFilterRooms")} startContent={<HiRefresh />} /></th>
                        <td className={`h-14 border-tableCol select-none w-[40px] `}>
                            <div className='flex flex-col justify-center items-center text-center bg-white p-2'>
                                <span><IoPeopleSharp /></span>
                            </div>
                        </td>
                        <td className={`h-14 border-tableCol select-none w-[40px] `}>
                            <div className='flex flex-col justify-center items-center text-center bg-white p-2 '>
                                <span><FaBed /></span>
                            </div>
                        </td>
                        <td className={`h-14 border-tableCol select-none w-[40px] `}>
                            <div className='flex flex-col justify-center items-center text-center bg-white p-2'>
                                <span><TbTransferVertical /></span>
                            </div>
                        </td>
                        <td className={`h-14 border-tableCol select-none w-[40px]`}>
                            <div className='flex flex-col  justify-center items-center text-center bg-white p-2'>
                                <span><MdComputer /></span>
                            </div>
                        </td>
                        {stateOrder.map((state, stateIndex) => (
                            <td className={`h-14 border-tableCol select-none w-[150px]`} key={stateIndex}>
                                <div className='flex items-center justify-center text-center bg-white border border-grey p-2 rounded-lg'>
                                    {state === 'outOfService' && <ImWrench />}
                                    {state === 'dirty' && <FaXmark />}
                                    {state === 'touched' && <MdOutlineTouchApp />}
                                    {state === 'cleaning' && <GiBroom />}
                                    {state === 'checked' && <CgSearchFound size={20} />}
                                    {state === 'clean' && <FaCheck />}
                                    <span className='ml-2 text-sm uppercase'>{t(`housekeeping.management.managementTable${state.charAt(0).toUpperCase() + state.slice(1)}`)}</span>
                                </div>
                            </td>
                        ))}
                    </tr>
                </thead>
                <DragDropContext onDragEnd={onDragEnd}>
                    <tbody>
                        {roomData.map((room, roomIndex) => (
                            <tr key={room.roomID}>
                                <td className='flex flex-col max-w-45 text-xs w-full h-10 justify-between items-left border-b-2 bg-white p-1'>
                                    <span className="font-bold">{room.label}</span>
                                    <span>{room.roomtypes.desc}</span>
                                </td>
                                <td className={`border-tableCol select-none w-[40px]`}>
                                    <div className='flex flex-col justify-center text-center border-2 border-white p-1.5'>
                                        <span>{room.adultCount}</span>
                                    </div>
                                </td>
                                <td className={`border-tableCol select-none w-[40px]`}>
                                    <div className='flex flex-col justify-center text-center border-2 border-white p-1.5'>
                                        <span>1</span>
                                    </div>
                                </td>
                                <td className={`border-tableCol select-none w-[40px]`}>
                                    <div className='flex flex-col justify-center text-center border-2 border-white p-1.5'>
                                        <span>1</span>
                                    </div>
                                </td>
                                <td className={`border-tableCol select-none w-[40px]`}>
                                    <div className='flex flex-col justify-center text-center border-2 border-white p-1.5'>
                                        <span>1</span>
                                    </div>
                                </td>
                                {stateOrder.map((state, stateIndex) => (
                                    <Droppable droppableId={`${stateIndex}`} key={state}>
                                        {(provided) => (
                                            <td
                                                className={`border-tableCol border-2 border-white rounded-lg select-none w-[150px] m-2 ${state === room.state ? stateColors[state] : ''}`}
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            >
                                                {state === room.state ? (
                                                    <Draggable draggableId={`${roomIndex}`} index={roomIndex}>
                                                        {(provided) => (
                                                            <div
                                                                className='flex flex-col items-left text-xs justify-between text-left p-1 '
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
        </main>
    );
}
