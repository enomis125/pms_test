"use client"
import React from "react";
//import do componente cartão
import Cartao from "@/components/Cards/frontOffice/Card";
//import de icons
import { PiListPlus, PiListDashesBold } from "react-icons/pi";
import { FaBoxesStacked } from "react-icons/fa6";
import { FaBed, FaWrench, FaPencilRuler } from "react-icons/fa";
import { useTranslations } from 'next-intl';


const Card = () => {
  const t = useTranslations('Index');

    return (
        <>
        <div className="border grid grid-cols-4 gap-4 justify-between py-5 px-5">
        <div className="">
                <Cartao title={t("frontOffice.frontOffice.generalCard")} description={""} listType={"/clientForm"} icon={<PiListPlus size={35} />} formTypeCard={0}/>
            </div>
            <div className="">
                <Cartao title={t("frontOffice.frontOffice.individualCard")} description={""} listType={"#"} icon={<PiListPlus size={35} />} formTypeCard={0}/>
            </div>
            <div className="">
                <Cartao title={t("frontOffice.frontOffice.businessCard")} description={""}  listType={"#"} icon={<FaBoxesStacked size={35}/>} formTypeCard={0}/>
            </div>
            <div className="">
                <Cartao title={t("frontOffice.frontOffice.travelAgencyCard")} description={""} icon={<PiListDashesBold  size={35}/>} listType={"#"} formTypeCard={0}/>
            </div>
            <div className="">
                <Cartao title={t("frontOffice.frontOffice.groupsCard")} description={""} listType={"#"} icon={<PiListDashesBold  size={35}/>} formTypeCard={0}/>
            </div>
            <div className="">
                <Cartao title={t("frontOffice.frontOffice.othersCard")} description={""} listType={"#"} icon={<PiListDashesBold  size={35}/>} formTypeCard={0}/>
            </div>
            
        </div>
        </>
    )
}
export default Card;
