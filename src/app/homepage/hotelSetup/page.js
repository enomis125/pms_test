"use client"
import React from "react";
//import do componente cartão
import Cartao from "@/components/Cards/Card";
//import de icons
import { PiListPlus } from "react-icons/pi";
import { FaBoxesStacked } from "react-icons/fa6";
import { FaBed, FaWrench, FaPencilRuler } from "react-icons/fa";

const Card = () => {
    return (
        <>
        <div className="border grid grid-cols-4 gap-4 justify-between py-5 px-5">
            <div className="">
                <Cartao title={"GRUPOS TIPOLOGIAS"} description={"Inserir grupos que relacionam várias tipologias de quartos"} listType={"grupo_tipologia"} formName={"ModalGT"} icon={<PiListPlus size={35} />} formTypeCard={10}/>
            </div>
            <div className="">
                <Cartao title={"TIPOLOGIAS"} description={"Inserir as tipologias que associam quartos da mesma categoria"} listType={"tipologia"} formType={"/quartos/bedrooms"} formName={"Bedrooms"} icon={<FaBoxesStacked size={35}/>} formTypeCard={40}/>
            </div>
            <div className="">
                <Cartao title={"QUARTOS"} counter1={"39"} counter2={"01"} listType={"quartos"} icon={<FaBed size={35}/>} formTypeCard={20}/>
            </div>
            <div className="">
                <Cartao title={"CARACTERÍSTICAS"} description={"Inserir lista com as várias características para cada quarto"} listType={"carateristicas"} icon={<FaPencilRuler size={35}/>} formTypeCard={30}/>
            </div>
            <div className="">
                <Cartao title={"MANUTENÇÃO"} description={""} listType={"manutencao"} icon={<FaWrench size={35}/>} formTypeCard={50} />
            </div>

        </div>
        </>
    )
}
export default Card;