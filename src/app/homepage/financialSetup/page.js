"use client"
import React from "react";
//import do componente cartão
import Cartao from "@/components/Cards/Card";
//import de icons
import { PiListPlus, PiListDashesBold } from "react-icons/pi";
import { FaBoxesStacked } from "react-icons/fa6";
import { FaBed, FaWrench, FaPencilRuler } from "react-icons/fa";


const Card = () => {
    return (
        <>
        <div className="border grid grid-cols-4 gap-4 justify-between py-5 px-5">
            <div className="">
                <Cartao title={"DEPARTAMENTOS"} description={""} listType={"departments"} icon={<PiListPlus size={35} />}/>
            </div>
            <div className="">
                <Cartao title={"GRUPOS DE CONTA"} description={""}  listType={"accountsGroups"} icon={<FaBoxesStacked size={35}/>}/>
            </div>
            <div className="">
                <Cartao title={"CONTAS DE REVENUE"} description={""} listType={"revenue_accounts"} />
            </div>
            <div className="">
                <Cartao title={"CONTAS DE PAGAMENTO"} description={""} listType={"payment_accounts"} icon={<PiListDashesBold  size={35}/>}/>
            </div>
            <div className="">
                <Cartao title={"IMPOSTOS"} description={""} listType={"taxes"} icon={<PiListDashesBold  size={35}/>}/>
            </div>
            <div className="">
                <Cartao title={"CAIXAS"} description={""} listType={"cashiers"} icon={<PiListDashesBold  size={35}/>}/>
            </div>
            <div className="">
                <Cartao title={"ANULAÇÃO DE COBRANÇAS"} description={""} listType={"void_charges"} icon={<PiListDashesBold  size={35}/>}/>
            </div>
        </div>
        </>
    )
}
export default Card;