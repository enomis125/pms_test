"use client"
import React from "react";
//import do componente cartão
import Cartao from "@/components/Cards/frontOffice/frontDesk/Card";
//import de icons
import { PiAirplaneLandingFill, PiAirplaneTakeoffFill  } from "react-icons/pi";
import { FaCalendarAlt, FaBed } from "react-icons/fa";
import { useTranslations } from 'next-intl';

const Card = () => {

  const t = useTranslations('Index');

    return (
        <>
        <div className="border grid grid-cols-4 gap-4 justify-between py-5 px-5">
            <div className="">
                <Cartao title={t("frontOffice.frontDesk.frontDesk.reservations")} description={""} listType={"/reservations"} formName={"ModalRes"} icon={<FaCalendarAlt size={35} />} formTypeCard={0}/>
            </div>
            <div className="">
                <Cartao title={t("frontOffice.frontDesk.frontDesk.arrivals")} description={""} listType={"/arrivals"} formType={""} formName={""} icon={<PiAirplaneLandingFill size={35}/>} formTypeCard={0}/>
            </div>
            <div className="">
                <Cartao title={t("frontOffice.frontDesk.frontDesk.guestList")} description={""} listType={"/guestlist"} icon={<FaBed  size={45}/>} formTypeCard={0}/>
            </div>
            <div className="">
                <Cartao title={t("frontOffice.frontDesk.frontDesk.departures")} description={""} listType={"/departures"} icon={<PiAirplaneTakeoffFill size={35}/>} formTypeCard={0} />
            </div>
        </div>
        </>
    )
}
export default Card;