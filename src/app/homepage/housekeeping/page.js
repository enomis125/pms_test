"use client"
import React from "react";
//import do componente cartão
import Cartao from "@/components/Cards/houseKeeping/Card";
//import de icons
import { PiListPlus, PiListDashesBold } from "react-icons/pi";
import { FaBoxesStacked } from "react-icons/fa6";
import { FaBed, FaWrench, FaPencilRuler } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import {useTranslations} from 'next-intl'; 


const Card = () => {

    const t = useTranslations('Index'); 

    return (
        <>
        <div className="border grid grid-cols-4 gap-4 justify-between py-5 px-5 uppercase">
        <div className="">
                <Cartao counter1={"29" } title={t("housekeeping.housekeeping.housekeepingCardClean")} description={""}  listType={"#"} icon={<PiListPlus size={35} />}  formTypeCard={0}/>
            </div>
            <div className="">
                <Cartao counter2={"12"} title={t("housekeeping.housekeeping.housekeepingCardChecked")} description={""}  listType={"#"} icon={<PiListPlus size={35} />} formTypeCard={0}/>
            </div>
            <div className="">
                <Cartao counter3={"53"}  title={t("housekeeping.housekeeping.housekeepingCardDirty")} description={""}  listType={"#"} icon={<FaBoxesStacked size={35}/>} formTypeCard={0}/>
            </div>
            <div className="w-20px">
                <Cartao counter4={"0"} title={t("housekeeping.housekeeping.housekeepingCardOutOfService")} description={""}   icon={<PiListDashesBold  size={35}/>} listType={"#"} formTypeCard={0}/>
            </div>
        </div>
        </>
    )
}
export default Card;
