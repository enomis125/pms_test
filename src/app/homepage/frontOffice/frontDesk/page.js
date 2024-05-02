"use client"
import React from "react";
//import do componente cartão
import Cartao from "@/components/Cards/frontOffice/frontDesk/Card";
//import de icons
import { PiListPlus } from "react-icons/pi";
import { FaBoxesStacked } from "react-icons/fa6";
import { FaBed, FaWrench, FaPencilRuler } from "react-icons/fa";
import { BiListMinus } from "react-icons/bi";
import { BiListPlus } from "react-icons/bi";
import { PiAirplaneLandingFill, PiAirplaneTakeoffFill  } from "react-icons/pi";


const Card = () => {
    return (
        <>
        <div className="border grid grid-cols-4 gap-4 justify-between py-5 px-5">
            <div className="">
                <Cartao title={"RESERVAS"} description={""} listType={""} formName={""} icon={<PiListPlus size={35} />} formTypeCard={0}/>
            </div>
            <div className="">
                <Cartao title={"CHEGADAS"} description={""} listType={""} formType={""} formName={""} icon={<PiAirplaneLandingFill size={35}/>} formTypeCard={0}/>
            </div>
            <div className="">
                <Cartao title={"LISTA DE HOSPEDES"} description={""} listType={""} icon={<BiListPlus size={45}/>} formTypeCard={0}/>
            </div>
            <div className="">
                <Cartao title={"PARTIDAS"} description={""} listType={""} icon={<PiAirplaneTakeoffFill size={35}/>} formTypeCard={0} />
            </div>
        </div>
        </>
    )
}
export default Card;