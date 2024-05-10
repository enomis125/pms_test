"use client"
import React, { useState, useEffect } from "react";
import axios from 'axios';


export default function priceManagementInsert() {

    //inserção na tabela RateCodes
    const [priceManagement, setPriceManagement] = useState({
        RateGroup: '',
        RateCode: '',
        //SpecialRate: '',
        Hotels: ''
    })

    const handleInputPriceManagement = (event) => {
        setPriceManagement({ ...priceManagement, [event.target.name]: event.target.value })
    }
    function handleSubmitPriceManagement(event) {
        event.preventDefault()
        if (!priceManagement.RateGroup || !priceManagement.RateCode  || !priceManagement.Hotels ) {
            alert("Preencha os campos corretamente");
            return;
        }
        axios.put(`/api/v1/prices/priceManagement/`, {
            data: {
                rateGroup: priceManagement.RateGroup,
                rateCode: priceManagement.RateCode,
                //specialRate: priceManagement.SpecialRate,
                hotels: priceManagement.Hotels,
            }
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }
    return {
        handleInputPriceManagement, handleSubmitPriceManagement
    };
}

// export function priceManagementEdits(idCustomerPreferences) {
//     //edição 
//     const [valuesCustomerPreferences, setValuesCustomerPreferences] = useState({
//         id: idCustomerPreferences,
//         Descrition: '',
//         Abreviature: '',
//     })

//     useEffect(() => {
//         axios.get("/api/v1/cardex/customerPreferences/" + idCustomerPreferences)
//             .then(res => {
//                 setValuesCustomerPreferences({ ...valuesCustomerPreferences, Descrition: res.data.response.description, Abreviature: res.data.response.abreviature })
//             })
//             .catch(err => console.log(err))
//     }, [])

//     function handleUpdateCustomerPreferences(e) {
//         e.preventDefault()
//         axios.patch(`/api/v1/cardex/customerPreferences/` + idCustomerPreferences, {
//             data: {
//                 description: valuesCustomerPreferences.Descrition,
//                 abreviature: valuesCustomerPreferences.Abreviature,
//             }
//         })
//             .catch(err => console.log(err))
//     }

//     return {
//         handleUpdateCustomerPreferences, setValuesCustomerPreferences, valuesCustomerPreferences
//     };
// }
