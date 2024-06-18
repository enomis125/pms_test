"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Button, Input
} from "@nextui-org/react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { IoPeopleSharp } from "react-icons/io5";
import { FaBed, FaXmark, FaCheck, FaCheckDouble } from "react-icons/fa6";
import { TbTransferVertical } from "react-icons/tb";
import { MdComputer, MdOutlineTouchApp } from "react-icons/md";
import { ImWrench } from "react-icons/im";
import { GiBroom } from "react-icons/gi";
import { IoFilter } from "react-icons/io5";
import { RxFrame } from "react-icons/rx";
import { HiRefresh } from "react-icons/hi";

export default function ManagementForm() {

    const [roomTypeState, setRoomTypeState] = useState([]);

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

    useEffect(() => {
        const getData = async () => {
            try {
                const resTipologies = await axios.get(`/api/v1/hotel/rooms`);
                const tipologies = resTipologies.data.response;
                setRoomTypeState(tipologies);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getData();
    }, []);

    const onDragEnd = async (result) => {
        if (!result.destination) return;

        const newStateIndex = parseInt(result.destination.droppableId);
        const roomTypeIndex = parseInt(result.draggableId);
        const newRoomTypes = [...roomTypeState];
        newRoomTypes[roomTypeIndex].state = stateOrder[newStateIndex];

        console.log("newRoomTypes:", newRoomTypes); // Verifica o estado de newRoomTypes

        // Atualiza o estado local
        setRoomTypeState(newRoomTypes);

        try {
            const roomNumber = newRoomTypes[roomTypeIndex].roomID;
            const roomStatus = stateValues[stateOrder[newStateIndex]];

            console.log("Room Status:", roomStatus);
            console.log("Room Number:", roomNumber);

            // Realiza o PUT request para atualizar o estado na base de dados
            await axios.put(`/api/v1/housekeeping/management`, {
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
                    <p className='text-ml text-white px-4'><b>Management Rooms</b></p>
                    <div className='flex items-center gap-5 mr-4'>
                        <Button className=" bg-gradient-to-tr from-gray-50 to-gray-50 text-black shadow-lg justify-center" startContent={<RxFrame />}>Bulk</Button>
                        <Button className="  bg-gradient-to-tr from-gray-50 to-gray-50 text-black shadow-lg justify-center" startContent={<IoFilter />}>Filter</Button>
                    </div>
                </div>
            </div>
            <table className='w-[100%] bg-tableCol'>
                <thead>
                    <tr>
                        <th className='w-[15%] bg-tableCol text-left px-4'><Input type="text" placeholder="Filter Rooms" startContent={<HiRefresh />} /></th>
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
                        <td className={`h-14 border-tableCol select-none w-[150px]`}>
                            <div className='flex  items-center justify-center text-center bg-white border border-grey p-2 rounded-lg'>
                                <ImWrench />
                                <span className='ml-2 text-sm'>Out Of Service</span>
                            </div>
                        </td>
                        <td className={`h-14 border-tableCol select-none w-[150px]`}>
                            <div className='flex  items-center justify-center text-center bg-white border border-grey p-2 rounded-lg'>
                                <FaXmark />
                                <span className='ml-2 text-sm'>Dirty</span>
                            </div>
                        </td>
                        <td className={`h-14 border-tableCol select-none w-[150px]`}>
                            <div className='flex  items-center justify-center text-center bg-white border border-grey p-2 rounded-lg'>
                                <MdOutlineTouchApp />
                                <span className='ml-2 text-sm'>Touched</span>
                            </div>
                        </td>
                        <td className={`h-14 border-tableCol select-none w-[150px]`}>
                            <div className='flex  items-center justify-center text-center bg-white border border-grey p-2 rounded-lg'>
                                <GiBroom />
                                <span className='ml-2 text-sm'>Cleaning</span>
                            </div>
                        </td>
                        <td className={`h-14 border-tableCol select-none w-[150px]`}>
                            <div className='flex  items-center justify-center text-center bg-white border border-grey p-2 rounded-lg'>
                                <FaCheck />
                                <span className='ml-2 text-sm'>Checked</span>
                            </div>
                        </td>
                        <td className={`h-14 border-tableCol select-none w-[150px]`}>
                            <div className='flex items-center justify-center text-center bg-white border border-grey p-2 rounded-lg mr-3'>
                                <FaCheckDouble />
                                <span className='ml-2 text-sm'>Clean</span>
                            </div>
                        </td>
                    </tr>
                </thead>
                <DragDropContext onDragEnd={onDragEnd}>
                    <tbody className="">
                        {roomTypeState.map((roomType, roomTypeIndex) => (
                            <tr key={roomType.roomTypeID}>
                                <td className='flex flex-col max-w-45 text-xs w-full h-10 justify-between items-left border-b-2 bg-white p-1'>
                                    <span className="font-bold">{roomType.label}</span>
                                    <span>{roomType.roomtypes.desc}</span>
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
                                <td className={`border-tableCol select-none w-[40px]`}>
                                    <div className='flex flex-col justify-center text-center border-2 border-white p-1.5'>
                                        <span>1</span>
                                    </div>
                                </td>
                                {stateOrder.map((state, stateIndex) => (
                                    <Droppable droppableId={`${stateIndex}`} key={state}>
                                        {(provided) => (
                                            <td
                                                className={`border-tableCol border-2 border-white rounded-lg select-none w-[150px] m-2 ${state === roomType.state ? stateColors[state] : ''}`}
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            >
                                                {state === roomType.state ? (
                                                    <Draggable draggableId={`${roomTypeIndex}`} index={roomTypeIndex}>
                                                        {(provided) => (
                                                            <div
                                                                className='flex flex-col items-left text-xs justify-between text-left p-1 '
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <span className="font-bold">{roomType.label}</span>
                                                                <span>{roomType.roomtypes.desc}</span>
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
