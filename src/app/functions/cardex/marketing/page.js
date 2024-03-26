"use client"
import React, { useState, useEffect } from "react";
import axios from 'axios';

export function marketing(idMarketing) {

    //inserção na tabela marketing
    const [marketing, setMarketing] = useState({
        Description: '',
        Abreviature: '',
    })

    const handleInputMarketing = (event) => {
        setMarketing({ ...marketing, [event.target.name]: event.target.value })
    }
    function handleSubmitMarketing(event) {
        event.preventDefault()
        if (!marketing.Description || !marketing.Abreviature) {
            alert("Preencha os campos corretamente");
            return;
        }
        axios.put('/api/v1/cardex/marketing', {
            data: {
                description: marketing.Description,
                abreviature: marketing.Abreviature,
            }
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }
    //edição na tabela marketing
    const [valuesMarketing, setValuesMarketing] = useState({
        id: idMarketing,
        Descrition: '',
        Abreviature: '',
    })

    useEffect(() => {
        axios.get("/api/v1/cardex/marketing/" + idMarketing)
            .then(res => {
                setValuesMarketing({ ...valuesMarketing, Descrition: res.data.response.description, Abreviature: res.data.response.abreviature })
            })
            .catch(err => console.log(err))
    }, [])

    function handleUpdateMarketing(e) {
        e.preventDefault()
        axios.patch(`/api/v1/cardex/marketing/` + idMarketing, {
            data: {
                description: valuesMarketing.Descrition,
                abreviature: valuesMarketing.Abreviature,
            }
        })
            .catch(err => console.log(err))
    }

    return { handleInputMarketing, handleSubmitMarketing, handleUpdateMarketing, setValuesMarketing, valuesMarketing };
}