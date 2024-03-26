"use client"
import React, { useState, useEffect } from "react";
import axios from 'axios';

export function rooms(idRoom){

    //inserção na tabela rooms
    const [room, setRoom] = useState({
        Label: '',
        RoomType: '',
        Description: ''
    })

    const handleInputRoom = (event) => {
        setRoom({ ...room, [event.target.name]: event.target.value })
    }
    function handleSubmitRoom(event) {
        event.preventDefault()
        if (!room.Label || !room.RoomType || !room.Description) {
            alert("Preencha os campos corretamente");
            return;
        }
        axios.put('/api/v1/hotel/rooms', {
            data: {
                Label: room.Label,
                RoomType: room.RoomType,
                Description: room.Description
            }
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
            console.log(room.Label)
    }
    //edição na tabela rooms
    const [valuesRoom, setValuesRoom] = useState({
        id: idRoom,
        Label: '',
        RoomType: '',
        Description: ''
    })

    useEffect(() => {
        axios.get("/api/v1/hotel/rooms/" + idRoom)
            .then(res => {
                setValuesRoom({ ...valuesRoom, Label: res.data.response.label, RoomType: res.data.response.roomType, Description: res.data.response.description })
            })
            .catch(err => console.log(err))
    }, [])

    function handleUpdateRoom(e) {
        e.preventDefault()
        axios.patch(`/api/v1/hotel/rooms/` + idRoom, {
            data: {
                label: valuesRoom.Label,
                roomType: valuesRoom.RoomType,
                description: valuesRoom.Description
            }
        })
            .catch(err => console.log(err))
    }

    return { handleInputRoom , handleSubmitRoom, handleUpdateRoom, setValuesRoom, valuesRoom };
}