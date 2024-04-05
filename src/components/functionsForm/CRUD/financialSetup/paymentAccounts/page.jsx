"use client"
import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function paymentAccountsInsert() {

     //inserção na tabela doctypes
    const [paymentAccounts, setPaymentAccounts] = useState({
        Cod: '',
        Abreviature: '',
        Description: '',
    })

    const handleInputPaymentAccounts = (event) => {
        setPaymentAccounts({ ...paymentAccounts, [event.target.name]: event.target.value })
    }
    function handleSubmitPaymentAccounts(event) {
        event.preventDefault()
        if (!paymentAccounts.Cod || !paymentAccounts.Abreviature || !paymentAccounts.Description) {
            alert("Preencha os campos corretamente");
            return;
        }
        axios.put('/api/v1/financialSetup/paymentAccounts', {
            data: {
            cod: paymentAccounts.Cod,
            description: paymentAccounts.Description,
            abreviature: paymentAccounts.Abreviature 
            }
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }
    return { 
        handleInputPaymentAccounts, handleSubmitPaymentAccounts
    };

}

export function paymentAccountsEdit(idPaymentAccounts) {
    //edição na tabela doctypes
    const [valuesPaymentAccounts, setValuesPaymentAccounts] = useState({
        id: idPaymentAccounts,
        Cod: '',
        Abreviature: '',
        Description: '',
    })

    useEffect(() => {
        axios.get("/api/v1/financialSetup/paymentAccounts/" + idPaymentAccounts)
            .then(res => {
                setValuesPaymentAccounts({ ...valuesPaymentAccounts, Cod: res.data.response.externalNumberShort, Abreviature: res.data.response.mainGroup, Description: res.data.response.name })
            })
            .catch(err => console.log(err))
    }, [])

    function handleUpdatePaymentAccounts(e) {
        e.preventDefault()
        axios.patch(`/api/v1/financialSetup/paymentAccounts/` + idPaymentAccounts, {
            data: {
                cod: valuesPaymentAccounts.Cod,
                abreviature: valuesPaymentAccounts.Abreviature,
                description: valuesPaymentAccounts.Description
            }
        })
            .catch(err => console.log(err))
    }

    return { 
        handleUpdatePaymentAccounts, setValuesPaymentAccounts, valuesPaymentAccounts 
    };
}