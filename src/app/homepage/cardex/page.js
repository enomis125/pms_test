"use client"

import React from "react";
//import do componente cartão
import Cartao from "@/components/Cards/cardex/Card";
//import de icons
import { PiListPlus } from "react-icons/pi";
import { FaBoxesStacked } from "react-icons/fa6";
import { RiPlayList2Fill } from "react-icons/ri";
import {useTranslations} from 'next-intl'; 


const Card = () => {
    const t = useTranslations('Index'); 
    return (
        
        <>
        <div className="border grid grid-cols-4 gap-4 justify-between py-5 px-5">
            <div className="">
                <Cartao title={t("cardex.cardex.cardexCardSaudation")} description={""} listType={"saudacao"} icon={<PiListPlus size={35} />} formTypeCard={10}/>
            </div>
            <div className="">
                <Cartao title={t("cardex.cardex.cardexCardNationalities")} description={""} listType={"nacionalidades"} formType={"/quartos/bedrooms"} formName={"Bedrooms"} icon={<FaBoxesStacked size={35}/>} formTypeCard={20}/>
            </div>
            <div className="">
                <Cartao title={t("cardex.cardex.cardexCardKnowledgeMethods")} listType={"metodo_conhecimento"} formTypeCard={30}/>
            </div>
            <div className="">
                <Cartao title={t("cardex.cardex.cardexCardProfessions")} description={""} listType={"profissao"} icon={<RiPlayList2Fill size={35}/>} formTypeCard={40}/>
            </div>
            <div className="">
                <Cartao title={t("cardex.cardex.cardexCardIDDocuments")} description={""} listType={"documento_identificacao"} icon={<RiPlayList2Fill size={35}/>} formTypeCard={50} />
            </div>
            <div className="">
                <Cartao title={t("cardex.cardex.cardexCardLanguages")} description={""} listType={"idiomas"} icon={<RiPlayList2Fill size={35}/>} formTypeCard={50} />
            </div>
            <div className="">
                <Cartao title={t("cardex.cardex.cardexCardClientPreferences")} description={""} listType={"preferencia_cliente"} icon={<RiPlayList2Fill size={35}/>} formTypeCard={60} />
            </div>
            <div className="">
                <Cartao title={t("cardex.cardex.cardexCardMembers")} description={""} listType={"membros"} icon={<RiPlayList2Fill size={35}/>} formTypeCard={70} />
            </div>
            <div className="">
                <Cartao title={t("cardex.cardex.cardexCardMarketing")} description={""} listType={"marketing"} icon={<RiPlayList2Fill size={35}/>} formTypeCard={80} />
            </div>
            <div className="">
                <Cartao title={t("cardex.cardex.cardexCardVIPTypes")} description={""} listType={"tipos_vip"} icon={<RiPlayList2Fill size={35}/>} formTypeCard={90} />
            </div>
        </div>
        </>
    )
}
export default Card;