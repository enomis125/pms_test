"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
//import do componente cartão
import Cartao from "@/components/Cards/hotelSetup/Card";
//import de icons
import { PiListPlus } from "react-icons/pi";
import { FaBoxesStacked } from "react-icons/fa6";
import { FaBed, FaWrench, FaPencilRuler } from "react-icons/fa";

import { useTranslations } from 'next-intl';


const Card = () => {

    const [counters, setCounters] = useState([]);

    const t = useTranslations('Index');


    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`/api/v1/counters`);
                setCounters(res.data.response);
            } catch (error) {
                console.error("Erro: ", error.message);
            }
        };
        getData();
    }, []);

    // Após o estado 'counters' ser atualizado, filtramos os contadores da tabela 'rooms'
    const roomsCounters = counters.filter(counter => counter.tableName === 'rooms');
    console.log(roomsCounters)



    return (
        <>
            <div className="border grid grid-cols-4 gap-4 justify-between py-5 px-5">
                <div className="">
                    <Cartao title={t("hotel.hotel.tipologiesGroupCard")} description={t("hotel.hotel.tipologiesGroupCardDescription")} listType={"grupo_tipologia"} formName={"ModalGT"} icon={<PiListPlus size={35} />} formTypeCard={10} />
                </div>
                <div className="">
                    <Cartao title={t("hotel.hotel.tipologiesCard")} description={t("hotel.hotel.tipologiesCardDescription")} listType={"tipologia"} formType={"/quartos/bedrooms"} formName={"Bedrooms"} icon={<FaBoxesStacked size={35} />} formTypeCard={40} />
                </div>
                <div className="">
                    <Cartao title={t("hotel.hotel.roomsCard")} counter1={roomsCounters[0]?.counter} listType={"quartos"} icon={<FaBed size={35} />} formTypeCard={20} />
                </div>
                <div className="">
                    <Cartao title={t("hotel.hotel.characteristicsCard")} description={t("hotel.hotel.characteristicsCardDescription")} listType={"carateristicas"} icon={<FaPencilRuler size={35} />} formTypeCard={30} />
                </div>
                <div className="">
                    <Cartao title={t("hotel.hotel.maintenanceCard")} description={t("hotel.hotel.maintenanceCardDescription")} listType={"manutencao"} icon={<FaWrench size={35} />} formTypeCard={50} />
                </div>

            </div>
        </>
    )
}
export default Card;