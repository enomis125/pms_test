"use client"
import React from "react";
//import do componente cartão
import Cartao from "@/components/Cards/frontOffice/Card";
//import de icons
import { PiListPlus, PiListDashesBold } from "react-icons/pi";
import { FaBoxesStacked } from "react-icons/fa6";
import { FaBed, FaWrench, FaPencilRuler } from "react-icons/fa";


const Card = () => {
    return (
        <>
        <div className="border grid grid-cols-4 gap-4 justify-between py-5 px-5">
        <div className="">
                <Cartao title={"LIMPOS"} description={""} counter1={"29"} listType={"/clientForm"} icon={<PiListPlus size={35} />} formTypeCard={0}/>
            </div>
            <div className="">
                <Cartao title={"VERIFICADOS"} description={""} counter1={"12"} listType={"#"} icon={<PiListPlus size={35} />} formTypeCard={0}/>
            </div>
            <div className="">
                <Cartao title={"SUJOS"} description={""} counter1={"53"}  listType={"#"} icon={<FaBoxesStacked size={35}/>} formTypeCard={0}/>
            </div>
            <div className="">
                <Cartao title={"FORA DE SERVIÇO"} description={""}  counter1={"0"} icon={<PiListDashesBold  size={35}/>} listType={"#"} formTypeCard={0}/>
            </div>
        </div>
        </>
    )
}
export default Card;
