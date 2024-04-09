"use client"
import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function individualsInsert() {

     //inserção na tabela client preference
    const [individual, setIndividual] = useState({
        FirstName: '',
        LastName: '',
        Address: '',
        ZipCode: '',
        Country: ''
    })

    const handleInputIndividual = (event) => {
        setIndividual({ ...individual, [event.target.name]: event.target.value })
    }
    function handleSubmiIndividual(event) {
        event.preventDefault()
        if (!individual.FirstName || !individual.LastName || !individual.Address || !individual.ZipCode || !individual.Country) {
            alert("Preencha os campos corretamente");
            return;
        }
        axios.put('/api/v1/frontOffice/clientForm/individuals', {
            data: {
                firstName: individual.FirstName,
                secondName: individual.LastName,
                country: individual.Address,
                zipCode: individual.ZipCode,
                countryAddress: individual.Country
            }
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }
    return { 
        handleInputIndividual, handleSubmiIndividual
    };
}

export function individualsEdit(idIndividual) {
    //edição na tabela client preference
    const [valuesIndividual, setValuesIndividual] = useState({
        id: idIndividual,
        FirstName: '',
        LastName: '',
        Address: '',
        ZipCode: ''
    })

    useEffect(() => {
        axios.get("/api/v1/frontOffice/clientForm/individuals/" + idIndividual)
            .then(res => {
                setValuesIndividual({ ...valuesIndividual, FirstName: res.data.response.firstName, LastName: res.data.response.secondName, Address: res.data.response.country, ZipCode: res.data.response.zipCode })
            })
            .catch(err => console.log(err))
    }, [])

    function handleUpdateIndividual(e) {
        e.preventDefault()
        axios.patch(`/api/v1/frontOffice/clientForm/individuals/` + idIndividual, {
            data: {
                firstName: valuesIndividual.FirstName,
                secondName: valuesIndividual.LastName,
                country: valuesIndividual.Address,
                zipCode: valuesIndividual.ZipCode,
            }
        })
            .catch(err => console.log(err))
    }

    return { 
        handleUpdateIndividual, setValuesIndividual, valuesIndividual 
    };
}