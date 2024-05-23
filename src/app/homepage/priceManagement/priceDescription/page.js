"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionItem,
  Autocomplete,
  AutocompleteItem,
  Button
} from "@nextui-org/react";
import { FiPlus } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";

//imports de componentes
import PriceDescriptionForm from "@/components/modal/priceManagement/priceDescription/page";

export default function PriceManagement() {
  const [codes, setCodes] = useState([]);
  const [priceDescription, setPriceDescription] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/v1/prices/priceManagement");
      setCodes(res.data.response);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/v1/prices/priceDescription");
      setPriceDescription(res.data.response);
    };
    getData();
  }, []);

  return (
    <main>
      <div className="mt-3">
        <p className="text-xs px-6">Descrição de preços</p>
      </div>
      <div className="flex justify-between items-center mx-2">
        <Autocomplete
          label="Hotel"
          className="max-w-xs mt-2"
          defaultContent="Todos os hotéis"
        >
          <AutocompleteItem key="1" value="teste">
            teste
          </AutocompleteItem>
        </Autocomplete>
        <PriceDescriptionForm
          buttonName={"Novo"}
          buttonIcon={<FiPlus size={15} />}
          buttonColor={"primary"}
          modalHeader={"Inserir Caraterísticas"}
          modalIcons={"bg-red"}
          formTypeModal={11}
        ></PriceDescriptionForm>
      </div>
      <div className="my-3 space-y-3">
        {codes.map((code, index) => (
          <Accordion variant="splitted" key={index}>
            <AccordionItem key={code.id} title={code.raterName}>
              <div className="space-y-3 mb-3 text-left">
                <div className="space-y-2">
                  {priceDescription
                    .filter((priceDescription) => priceDescription.rateCodeID === code.rategrpID)
                    .map((priceDescription, detailIndex) => (
                      <div key={detailIndex} className="flex items-center">
                        <BsArrowRight size={20} className="mr-2" />
                        {priceDescription.rateCodeDetName}
                      </div>
                    ))}
                </div>
<PriceDescriptionForm
  buttonName={"Novo"}
  buttonColor={"transparent"}
  modalHeader={"Inserir Caracteristica"}
  modalEditArrow={<BsArrowRight size={25} />}
  formTypeModal={11}
  priceGroupFill={code.rategrpID}
/>
              </div>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </main>
  );
}
