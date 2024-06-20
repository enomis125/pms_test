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
import { BsArrowRight, BsDot } from "react-icons/bs";
import { VscCollapseAll } from "react-icons/vsc";

//imports de componentes
import PriceDescriptionForm from "@/components/modal/priceManagement/priceDescription/page";

export default function PriceManagement() {
  const [codes, setCodes] = useState([]);
  const [priceDescription, setPriceDescription] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set());

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

  const handleCloseAll = () => {
    setSelectedKeys(new Set());
  };

  const today = new Date();

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
        <div className="flex flex-row gap-4">
          <Button onClick={handleCloseAll} color="error">
            <VscCollapseAll size={25} />
          </Button>
          <PriceDescriptionForm
            buttonName={"Novo"}
            buttonIcon={<FiPlus size={15} />}
            buttonColor={"primary"}
            modalHeader={"Inserir Detalhe"}
            modalIcons={"bg-red"}
            formTypeModal={11}
          />
        </div>
      </div>
      <div className="my-3 space-y-3">
        <Accordion
          variant="splitted"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          selectionMode="multiple"
        >
          {codes.map((code) => (
            <AccordionItem key={code.id} title={code.raterName}>
              <div className="space-y-3 mb-3 text-left">
                <div className="space-y-2">
                {priceDescription
  .filter(priceDescription => priceDescription.rateCodeID === code.rategrpID)
  .sort((a, b) => new Date(b.validFrom) - new Date(a.validFrom))  // Sort by validFrom date in descending order
  .map((priceDescription, detailIndex) => {
    const validFrom = new Date(priceDescription.validFrom);
    const validUntil = new Date(priceDescription.validUntil);

    var font;
    console.log(validFrom);
    if (validFrom && validUntil) {
      if (today < validFrom && today < validUntil) {
        font = "font-normal";
      } else if (today >= validFrom && today <= validUntil) {
        font = "font-bold";
      } else if (today >= validFrom && today >= validUntil) {
        font = "line-through";
      }
    }

    return (
      <div key={detailIndex} className={`flex items-center ${font}`}>
        <BsDot size={20} className={`mr-2`} />
        {priceDescription.rateCodeDetName}
      </div>
    );
  })}

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
          ))}
        </Accordion>
      </div>
    </main>
  );
}
