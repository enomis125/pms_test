"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PriceDescriptionInsert() {
  const dataInicioDefault = "01/01/1980";
  const dataFimDefault = new Date("01/01/2100");

  //inserção na tabela RateCodes
  const [priceDescription, setPriceDescription] = useState({
    //Linha 1
    Ref: "",
    Nome: "",
    RateCodeName: "",
    //Linha 2
    Valid: 0,
    Inicio: "",
    Fim: "",
    Property: "",
    Ventilation: "",
    BillText: "",
    RevenueAccount: "",
    /*Preco1: "",
    Preco2: "",
    Preco3: "",
    Preco4: "",
    Preco5: "",
    Preco6: "",*/
  });

  const handleRateNameSelect = (name) => {
    setPriceDescription({
      ...priceDescription,
      RateCodeName: name.rategrpID,
    });
  };

  const handleInputPriceDescription = (event) => {
    setPriceDescription({
      ...priceDescription,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckboxChange = (event) => {
    setPriceDescription({
      ...priceDescription,
      [event.target.name]: +event.target.checked,
    });
  };

  const handleSubmitPriceDescription = async (event) => {
    event.preventDefault();
    console.log(priceDescription);
    if (
      !priceDescription.Ref ||
      !priceDescription.Nome ||
      !priceDescription.RateCodeName ||
      !priceDescription.Inicio ||
      !priceDescription.Fim ||
      !priceDescription.Property ||
      !priceDescription.Ventilation ||
      !priceDescription.BillText ||
      !priceDescription.RevenueAccount
    ) {
      alert("Preencha os campos corretamente");
      return;
    }

    
      const headerCreationInfo = await axios.put('/api/v1/prices/priceDescriptionHeader', {
        data: {
          ref: priceDescription.Ref,
          descriptionName: priceDescription.Nome,
          priceCode: priceDescription.RateCodeName,
          valid: priceDescription.Valid,
          validFrom: priceDescription.Inicio,
          validUntil: priceDescription.Fim,
          property: priceDescription.Property,
          ventilation: priceDescription.Ventilation,
          billText: priceDescription.BillText,
          revenueAccount: priceDescription.RevenueAccount,
        },
      });
      const headerCreationID = headerCreationInfo.data.newRecord.headerCreationID.toString();
/*
      await axios.put('/api/v1/prices/priceDescriptionPrice', {
        data: {
          priceDescriptionID: headerCreationID,
          price1: priceDescription.Preco1,
          price2: priceDescription.Preco2,
          price3: priceDescription.Preco3,
          price4: priceDescription.Preco4,
          price5: priceDescription.Preco5,
          price6: priceDescription.Preco6,
        },
      });*/

    
  };

  return {
    handleInputPriceDescription,
    handleSubmitPriceDescription,
    handleRateNameSelect,
    handleCheckboxChange,
  };
}
/*
export function PriceDescriptionEdit(idPriceDescription) {
  const [valuesPriceDescription, setValuesPriceDescription] = useState({
    id: idPriceDescription,
    Nome: "",
    RateCodeName: "",
  });

  useEffect(() => {
    axios
      .get("/api/v1/prices/priceDescription/" + idPriceDescription)
      .then((res) => {
        //console.log("TESTE TESTE TESTE", res.data.response.raterName)
        setValuesPriceDescription({
          ...valuesPriceDescription,
          Nome: res.data.response.nome,
          RateCodeName: res.data.response.rateCodeName,
        });
      })
      .catch((err) => console.log(err));
  }, [idPriceDescription, valuesPriceDescription]);

  const handleUpdatePriceDescription = (e) => {
    e.preventDefault();
    axios
      .patch(`/api/v1/prices/priceDescription/` + idPriceDescription, {
        data: {
          Nome: valuesPriceDescription.Nome,
          rateCodeName: valuesPriceDescription.RateCodeName,
        },
      })
      .catch((err) => console.log(err));
  };

  return {
    handleUpdatePriceDescription,
    setValuesPriceDescription,
    valuesPriceDescription,
  };
}*/
