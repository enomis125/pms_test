"use client"

import React from "react";
//import do componente cartão
import Cartao from "@/components/Cards/cardex/Card";
//import de icons
import { PiListPlus } from "react-icons/pi";
import { FaBoxesStacked } from "react-icons/fa6";
import { RiPlayList2Fill } from "react-icons/ri";


const Card = () => {
    return (
        <>
        <div className="border grid grid-cols-4 gap-4 justify-between py-5 px-5">
            <div className="">
                <Cartao title={"TABELA DE SAUDAÇÕES"} description={""} listType={"saudacao"} icon={<PiListPlus size={35} />} formTypeCard={10}/>
            </div>
            <div className="">
                <Cartao title={"TABELA DE NACIONALIDADES"} description={""} listType={"nacionalidades"} formType={"/quartos/bedrooms"} formName={"Bedrooms"} icon={<FaBoxesStacked size={35}/>} formTypeCard={20}/>
            </div>
            <div className="">
                <Cartao title={"MÉTODOS DE CONHECIMENTO"} listType={"metodo_conhecimento"} formTypeCard={30}/>
            </div>
            <div className="">
                <Cartao title={"TABELA DE PROFISSÕES"} description={""} listType={"profissao"} icon={<RiPlayList2Fill size={35}/>} formTypeCard={40}/>
            </div>
            <div className="">
                <Cartao title={"TIPOS DOCUMENTOS DE IDENTIFICAÇÃO"} description={""} listType={"documento_identificacao"} icon={<RiPlayList2Fill size={35}/>} formTypeCard={50} />
            </div>
            <div className="">
                <Cartao title={"TABELA DE IDIOMAS"} description={""} listType={"idiomas"} icon={<RiPlayList2Fill size={35}/>} formTypeCard={50} />
            </div>
            <div className="">
                <Cartao title={"PREFERÊNCIAS DE CLIENTES"} description={""} listType={"preferencia_cliente"} icon={<RiPlayList2Fill size={35}/>} formTypeCard={60} />
            </div>
            <div className="">
                <Cartao title={"TABELA DE MEMBROS"} description={""} listType={"membros"} icon={<RiPlayList2Fill size={35}/>} formTypeCard={70} />
            </div>
            <div className="">
                <Cartao title={"TABELA DE MARKETING"} description={""} listType={"marketing"} icon={<RiPlayList2Fill size={35}/>} formTypeCard={80} />
            </div>
            <div className="">
                <Cartao title={"TIPOS DE VIP"} description={""} listType={"tipos_vip"} icon={<RiPlayList2Fill size={35}/>} formTypeCard={90} />
            </div>
        </div>
        </>
    )
}
export default Card;