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
                <Cartao title={"GERAL"} description={""} listType={"/clientForm"} icon={<PiListPlus size={35} />} formTypeCard={0}/>
            </div>
            <div className="">
                <Cartao title={"INDIVIDUAIS"} description={""} listType={"#"} icon={<PiListPlus size={35} />} formTypeCard={0}/>
            </div>
            <div className="">
                <Cartao title={"EMPRESAS"} description={""}  listType={"#"} icon={<FaBoxesStacked size={35}/>} formTypeCard={0}/>
            </div>
            <div className="">
                <Cartao title={"AGÊNCIAS DE VIAGENS"} description={""} icon={<PiListDashesBold  size={35}/>} listType={"#"} formTypeCard={0}/>
            </div>
            <div className="">
                <Cartao title={"GRUPOS"} description={""} listType={"#"} icon={<PiListDashesBold  size={35}/>} formTypeCard={0}/>
            </div>
            <div className="">
                <Cartao title={"OUTRAS"} description={""} listType={"#"} icon={<PiListDashesBold  size={35}/>} formTypeCard={0}/>
            </div>
            
        </div>
        </>
    )
}
export default Card;
