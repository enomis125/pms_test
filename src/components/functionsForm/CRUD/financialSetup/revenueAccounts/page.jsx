"use client"
import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function revenueAccountInsert() {

     //inserção na tabela client preference
    const [revenueAccount, setRevenueAccounts] = useState({
        Cod: '',
        Abreviature: '',
        Details: '',
        AccountGroup: '',
        Taxes: ''
    })

    //preenchimento automatico do nome e do apelido atraves de autocomplete
    const handleSelect = (accountGroups) => {
        //console.log("ID do guestProfile selecionado:", clientForm.firstName);
        //console.log("ID do guestProfile selecionado:", clientForm.secondName);

        setRevenueAccounts({
            ...revenueAccount,
            AccountGroup: accountGroups.accountsGroupsID,
        })
    };
    
    const handleSelectTaxes = (taxes) => {
        //console.log("ID do guestProfile selecionado:", clientForm.firstName);
        //console.log("ID do guestProfile selecionado:", clientForm.secondName);

        setRevenueAccounts({
            ...revenueAccount,
            Taxes: taxes.taxesID,
        })
    };
    
    const handleInputRevenueAccounts = (event) => {
        setRevenueAccounts({ ...revenueAccount, [event.target.name]: event.target.value })
    }
    function handleSubmitRevenueAccounts(event) {
        event.preventDefault()
        if (!revenueAccount.Cod || !revenueAccount.Abreviature || !revenueAccount.Details ) {
            alert("Preencha os campos corretamente");
            return;
        }
        axios.put('/api/v1/financialSetup/revenueAccounts', {
            data: {
                Cod: revenueAccount.Cod,
                Abreviature: revenueAccount.Abreviature,
                Details: revenueAccount.Details,
                AccountGroup: revenueAccount.AccountGroup.toString(),
                Taxes: revenueAccount.Taxes
            }
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }
    return { 
        handleInputRevenueAccounts, handleSubmitRevenueAccounts, handleSelect, handleSelectTaxes
    };
}

export function revenueAccountsEdit(idRevenueAccount) {
    //edição na tabela client preference
    const [valuesRevenueAccounts, setValuesRevenueAccounts] = useState({
        id: idRevenueAccount,
        Cod: '',
        Abreviature: '',
        Details: '',
        AccountGroup: ''
    })

    useEffect(() => {
        axios.get("/api/v1/financialSetup/revenueAccounts/" + idRevenueAccount)
            .then(res => {
                setValuesRevenueAccounts({ ...valuesRevenueAccounts, Cod: res.data.response.name, Abreviature: res.data.response.abreviature, Details: res.data.response.details, AccountGroup: res.data.response.accountsGroupsID })
            })
            .catch(err => console.log(err))
    }, [])

    function handleUpdateRevenueAccount(e) {
        e.preventDefault()
        axios.patch(`/api/v1/financialSetup/revenueAccounts/` + idRevenueAccount, {
            data: {
                Cod: valuesRevenueAccounts.Cod,
                Abreviature: valuesRevenueAccounts.Abreviature,
                Details: valuesRevenueAccounts.Details,
                AccountGroup: valuesRevenueAccounts.AccountGroup
            }
        })
            .catch(err => console.log(err))
    }

    return { 
        handleUpdateRevenueAccount, setValuesRevenueAccounts, valuesRevenueAccounts 
    };
}