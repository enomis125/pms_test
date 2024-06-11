"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function priceDescriptionInsert() {
  const dataInicioDefault = "01/01/1980";
  const dataFimDefault = new Date("01/01/2100");

  //inserção na tabela RateCodes
  const [priceDescription, setPriceDescription] = useState({
    //Linha 1
    Nome: "",
    RateCodeName: "",
    //Linha 2
    Inicio: "",
    Fim: "",
    //Linha 3
    MinNoites: "",
    MaxNoites: "",
    MinOcupacao: "",
    MaxOcupacao: "",
    //Linha 4

    //Linha 5
    Tq1: 0,
    Tq2: 0,
    Tq3: 0,
    Tq4: 0,
    Tq5: 0,
    //Linha 6
    Quarto: "",
    //Linha 7
    An1: 0,
    An2: 0,
    An3: 0,
    An4: 0,
    An5: 0,
    An6: 0,
    An7: 0,
    //Linha 8
    CL: "",
    //Linha 9
    TextoInt: "",
    //Linha 10
    NumeroPackage: "",
    //Linha 11
    Epoca: "",
    We1: 0,
    We2: 0,
    We3: 0,
    We4: 0,
    We5: 0,
    We6: 0,
    We7: 0,
    //Linha 12
    Preco1: "",
    Preco2: "",
    Preco3: "",
    Preco4: "",
    Preco5: "",
    Preco6: "",
    //Linha 13
    MinPreco1: "",
    MinPreco2: "",
    MinPreco3: "",
    MinPreco4: "",
    MinPreco5: "",
    MinPreco6: "",
    //Linha 14
    WePreco1: "",
    WePreco2: "",
    WePreco3: "",
    WePreco4: "",
    WePreco5: "",
    WePreco6: "",
    //Linha 15
    WeMinPreco1: "",
    WeMinPreco2: "",
    WeMinPreco3: "",
    WeMinPreco4: "",
    WeMinPreco5: "",
    WeMinPreco6: "",
  });

  const handleRateNameSelect = (name) => {
    setPriceDescription({
      ...priceDescription,
      RateCodeName: name.rategrpID,
    });
  };

  const handleTQ1Select = (tq1) => {
    setPriceDescription({
      ...priceDescription,
      Tq1: tq1.roomTypeID,
    });
  };
  const handleTQ2Select = (tq2) => {
    setPriceDescription({
      ...priceDescription,
      Tq2: tq2.roomTypeID,
    });
  };
  const handleTQ3Select = (tq3) => {
    setPriceDescription({
      ...priceDescription,
      Tq3: tq3.roomTypeID,
    });
  };
  const handleTQ4Select = (tq4) => {
    setPriceDescription({
      ...priceDescription,
      Tq4: tq4.roomTypeID,
    });
  };
  const handleTQ5Select = (tq5) => {
    setPriceDescription({
      ...priceDescription,
      Tq5: tq5.roomTypeID,
    });
  };

  const handleRoomsSelect = (rooms) => {
    setPriceDescription({
      ...priceDescription,
      Quarto: rooms.roomID,
    });
  };

  const handleSeasonsSelect = (seasons) => {
    setPriceDescription({
      ...priceDescription,
      Epoca: seasons.seasonID,
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
  function handleSubmitPriceDescription(event) {
    event.preventDefault();
    console.log(priceDescription);
    if (
      !priceDescription.Nome ||
      !priceDescription.RateCodeName ||
      !priceDescription.Inicio ||
      !priceDescription.Fim ||
      !priceDescription.MinNoites ||
      !priceDescription.MaxNoites ||
      !priceDescription.MinOcupacao ||
      !priceDescription.MaxOcupacao ||
      !priceDescription.Quarto ||
      !priceDescription.CL ||
      !priceDescription.TextoInt ||
      !priceDescription.NumeroPackage ||
      !priceDescription.Epoca
    ) {
      alert("Preencha os campos corretamente");
      return;
    }
    axios
      .put(`/api/v1/prices/priceDescription`, {
        data: {
          //Linha 1
          ref: priceDescription.Ref,
          nome: priceDescription.Nome,
          rateCodeName: priceDescription.RateCodeName,
          //Linha 2
          inicio: priceDescription.Inicio,
          fim: priceDescription.Fim,
          //Linha 3
          minNoites: priceDescription.MinNoites,
          maxNoites: priceDescription.MaxNoites,
          minOcupação: priceDescription.MinOcupacao,
          maxOcupação: priceDescription.MaxOcupacao,
          //Linha 4

          //Linha 5
          tq1: priceDescription.Tq1,
          tq2: priceDescription.Tq2,
          tq3: priceDescription.Tq3,
          tq4: priceDescription.Tq4,
          tq5: priceDescription.Tq5,
          //Linha 6
          quarto: priceDescription.Quarto,
          //Linha 7
          an1: priceDescription.An1,
          an2: priceDescription.An2,
          an3: priceDescription.An3,
          an4: priceDescription.An4,
          an5: priceDescription.An5,
          an6: priceDescription.An6,
          an7: priceDescription.An7,
          //Linha 8
          cl: priceDescription.CL,
          //Linha 9
          textoInt: priceDescription.TextoInt,
          //Linha 10
          numeroPackage: priceDescription.NumeroPackage,
          //Linha 11
          epoca: priceDescription.Epoca,
          we1: priceDescription.We1,
          we2: priceDescription.We2,
          we3: priceDescription.We3,
          we4: priceDescription.We4,
          we5: priceDescription.We5,
          we6: priceDescription.We6,
          we7: priceDescription.We7,
          //Linha 12
          price1: priceDescription.Preco1,
          price2: priceDescription.Preco2,
          price3: priceDescription.Preco3,
          price4: priceDescription.Preco4,
          price5: priceDescription.Preco5,
          price6: priceDescription.Preco6,
          //Linha 13
          minPrice1: priceDescription.MinPreco1,
          minPrice2: priceDescription.MinPreco2,
          minPrice3: priceDescription.MinPreco3,
          minPrice4: priceDescription.MinPreco4,
          minPrice5: priceDescription.MinPreco5,
          minPrice6: priceDescription.MinPreco6,
          //Linha 14
          wePrice1: priceDescription.WePreco1,
          wePrice2: priceDescription.WePreco2,
          wePrice3: priceDescription.WePreco3,
          wePrice4: priceDescription.WePreco4,
          wePrice5: priceDescription.WePreco5,
          wePrice6: priceDescription.WePreco6,
          //Linha15
          weMinPrice1: priceDescription.WeMinPreco1,
          weMinPrice2: priceDescription.WeMinPreco2,
          weMinPrice3: priceDescription.WeMinPreco3,
          weMinPrice4: priceDescription.WeMinPreco4,
          weMinPrice5: priceDescription.WeMinPreco5,
          weMinPrice6: priceDescription.WeMinPreco6,
        },
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }
  return {
    handleInputPriceDescription,
    handleSubmitPriceDescription,
    handleSeasonsSelect,
    handleRateNameSelect,
    priceDescription,
    setPriceDescription,
    handleRoomsSelect,
    handleTQ1Select,
    handleTQ2Select,
    handleTQ3Select,
    handleTQ4Select,
    handleTQ5Select,
    handleCheckboxChange,
  };
}

export function priceDescriptionEdit(idPriceDescription) {
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
  }, []);

  function handleUpdatePriceDescription(e) {
    e.preventDefault();
    axios
      .patch(`/api/v1/prices/priceDescription/` + idPriceDescription, {
        data: {
          Nome: valuesPriceDescription.RateCodeGroup,
          rateCodeName: valuesPriceDescription.RateCodeName,
        },
      })
      .catch((err) => console.log(err));
  }

  return {
    handleUpdatePriceDescription,
    setValuesPriceDescription,
    valuesPriceDescription,
  };
}
