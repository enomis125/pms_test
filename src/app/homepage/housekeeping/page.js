"use client"
import React from "react";
//import do componente cartão
import Cartao from "@/components/Cards/houseKeeping/Card";
//import de icons
import { PiListPlus, PiListDashesBold } from "react-icons/pi";
import { FaBoxesStacked } from "react-icons/fa6";
import { FaBed, FaWrench, FaPencilRuler } from "react-icons/fa";


const Card = () => {
    return (
        <>
        <div className="border grid grid-cols-4 gap-4 justify-between py-5 px-5">
        <div className="">
                <Cartao counter1={"29" } title={"LIMPOS"} description={""}  listType={"#"} icon={<PiListPlus size={35} />} formTypeCard={0}/>
            </div>
            <div className="">
                <Cartao counter1={"12"} title={"VERIFICADOS"} description={""}  listType={"#"} icon={<PiListPlus size={35} />} formTypeCard={0}/>
            </div>
            <div className="">
                <Cartao counter1={"53"}  title={"SUJOS"} description={""}  listType={"#"} icon={<FaBoxesStacked size={35}/>} formTypeCard={0}/>
            </div>
            <div className="">
                <Cartao counter1={"0"} title={"FORA DE SERVIÇO"} description={""}   icon={<PiListDashesBold  size={35}/>} listType={"#"} formTypeCard={0}/>
            </div>
        </div>
        </>
    )
}
export default Card;
