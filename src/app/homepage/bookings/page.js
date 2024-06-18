"use client"
import React from "react";
//import do componente cartão
import Cartao from "@/components/Cards/bookings/Card";
//import de icons
import { PiListPlus, PiListDashesBold } from "react-icons/pi";
import { FaBoxesStacked } from "react-icons/fa6";
import { FaBed, FaWrench, FaPencilRuler } from "react-icons/fa";


const Card = () => {
    return (
        <>
        <div className="border grid grid-cols-4 gap-4 justify-between py-5 px-5">
            <div className="">
                <Cartao title={"ESTADOS DE RESERVAS"} description={""} listType={"estados_de_reservas"} icon={<PiListPlus size={35} />} formTypeCard={10}/>
            </div>
            <div className="">
                <Cartao title={"SEGMENTOS DE MERCADO"} description={""}  listType={"segmentos_de_mercado"} icon={<FaBoxesStacked size={35}/>} formTypeCard={20}/>
            </div>
            <div className="">
                <Cartao title={"ORIGENS DE MERCADO"} description={""} listType={"origens_de_mercado"}  formTypeCard={30}/>
            </div>
            <div className="">
                <Cartao title={"FORMAS DE CONHECIMENTO"} description={""} listType={"formas_de_conhecimento"} icon={<PiListDashesBold  size={35}/>} formTypeCard={40}/>
            </div>
            <div className="">
                <Cartao title={"MOTIVOS DE RESERVAS"} description={""} listType={"motivos_de_reserva"} icon={<PiListDashesBold  size={35}/>} formTypeCard={50}/>
            </div>
            <div className="">
                <Cartao title={"CÓDIGOS DE SUBSTITUIÇÃO"} description={""} listType={"codigos_de_substituicao"} icon={<PiListDashesBold  size={35}/>} formTypeCard={60}/>
            </div>
            <div className="">
                <Cartao title={"TABELA DE RECUSAS"} description={""} listType={"tabela_de_recusa"} icon={<PiListDashesBold  size={35}/>} formTypeCard={70}/>
            </div>
            <div className="">
                <Cartao title={"TIPOS DE TRANSFER (?)"} description={""} listType={"tabela_de_transfer"} icon={<PiListDashesBold  size={35}/>} formTypeCard={80}/>
            </div>
            <div className="">
                <Cartao title={"TIPOS DE MUDANÇA DE RESERVAS"} description={""} listType={"tipos_de_mudanca_de_reservas"} icon={<PiListDashesBold  size={35}/>} formTypeCard={90}/>
            </div>
            <div className="">
                <Cartao title={"TIPOS DE CANCELAMENTOS"} description={""} listType={"tipos_de_cancelamento"} icon={<PiListDashesBold  size={35}/>} formTypeCard={100}/>
            </div>
        </div>
        </>
    )
}
export default Card;