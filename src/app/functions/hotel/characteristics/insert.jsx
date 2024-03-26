import React, { useState, useEffect } from "react";
import axios from 'axios';

export function insertRoom(){
    //inserção na tabela tipology group
    const [roomtypesgroups, setRoomtypesgroups] = useState({
        Label: '',
    })

    const handleInputTypesgroups = (event) => {
        setRoomtypesgroups({ ...roomtypesgroups, [event.target.name]: event.target.value })
    }
    function handleSubmitTypesgroups(event) {
        event.preventDefault()
        if (!roomtypesgroups.Label) {
            alert("Preencha os campos corretamente");
            return;
        }
        axios.put('/api/v1/hotel/tipologyGroup', {
            data: {
                label: roomtypesgroups.Label,
            }
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    return {handleInputTypesgroups , handleSubmitTypesgroups};
}