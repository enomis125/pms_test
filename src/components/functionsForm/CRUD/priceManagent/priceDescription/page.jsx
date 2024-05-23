"use client"
import React, { useState, useEffect } from "react";
import axios from 'axios';


export default function priceDescriptionInsert() {

    //inserção na tabela RateCodes
    const [priceDescription, setPriceDescription] = useState({
        Nome: '',
        RateCodeName: '',
    });

    const handleRateNameSelect = (name) => {
        setPriceDescription({
            ...priceDescription,
            RateCodeName: name.rategrpID
        });
    };

    const handleInputPriceDescription = (event) => {
        setPriceDescription({ ...priceDescription, [event.target.name]: event.target.value })
    }
    function handleSubmitPriceDescription(event) {
        event.preventDefault()
        console.log(priceDescription)
        if (!priceDescription.Nome || !priceDescription.RateCodeName ) {
            alert("Preencha os campos corretamente");
            return;
        }
        axios.put(`/api/v1/prices/priceDescription`, {
            data: {
                nome: priceDescription.Nome,
                rateCodeName: priceDescription.RateCodeName,
            }
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }
    return {
        handleInputPriceDescription, handleSubmitPriceDescription, handleRateNameSelect
    };
}

  export function priceDescriptionEdit(idPriceDescription) {
      const [valuesPriceDescription, setValuesPriceDescription] = useState({
          id: idPriceDescription,
          Nome: '',
          RateCodeName: '',
      })

      useEffect(() => {
          axios.get("/api/v1/prices/priceDescription/" + idPriceDescription)
              .then(res => {
                //console.log("TESTE TESTE TESTE", res.data.response.raterName)
                setValuesPriceDescription({ ...valuesPriceDescription, Nome: res.data.response.nome, RateCodeName: res.data.response.rateCodeName })
              })
              .catch(err => console.log(err))
      }, [])

      function handleUpdatePriceDescription(e) {
          e.preventDefault()
          axios.patch(`/api/v1/prices/priceDescription/` + idPriceDescription, {
              data: {
                Nome: valuesPriceDescription.RateCodeGroup,
                rateCodeName: valuesPriceDescription.RateCodeName,
              }
          })
              .catch(err => console.log(err))
      }

      return {
        handleUpdatePriceDescription, setValuesPriceDescription, valuesPriceDescription
      };
  }
