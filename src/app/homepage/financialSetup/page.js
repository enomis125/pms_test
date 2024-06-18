"use client"
import React from "react";
//import do componente cartão
import Cartao from "@/components/Cards/financialSetup/Card";
//import de icons
import { PiListPlus, PiListDashesBold } from "react-icons/pi";
import { FaBoxesStacked } from "react-icons/fa6";
import { FaBed, FaWrench, FaPencilRuler } from "react-icons/fa";
import {useTranslations} from 'next-intl';


const Card = () => {
    const t = useTranslations('Index');
    return (
        <>
        <div className="border grid grid-cols-4 gap-4 justify-between py-5 px-5">
            <div className="">
                <Cartao title={t('financialSetup.cards.departments')} description={""} listType={"departments"} icon={<PiListPlus size={35} />} formTypeCard={10}/>
            </div>
            <div className="">
                <Cartao title={t('financialSetup.cards.accountGroups')} description={""}  listType={"accountsGroups"} icon={<FaBoxesStacked size={35}/>} formTypeCard={20}/>
            </div>
            <div className="">
                <Cartao title={t('financialSetup.cards.revenueAccounts')} description={""} listType={"revenue_accounts"} formTypeCard={30}/>
            </div>
            <div className="">
                <Cartao title={t('financialSetup.cards.paymentAccounts')} description={""} listType={"payment_accounts"} icon={<PiListDashesBold  size={35}/>} formTypeCard={40}/>
            </div>
            <div className="">
                <Cartao title={t('financialSetup.cards.taxes')} description={""} listType={"taxes"} icon={<PiListDashesBold  size={35}/>} formTypeCard={50}/>
            </div>
            <div className="">
                <Cartao title={t('financialSetup.cards.cashiers')} description={""} listType={"cashiers"} icon={<PiListDashesBold  size={35}/>} formTypeCard={60}/>
            </div>
            <div className="">
                <Cartao title={t('financialSetup.cards.voidCharges')} description={""} listType={"void_charges"} icon={<PiListDashesBold  size={35}/>} formTypeCard={70}/>
            </div>
        </div>
        </>
    )
}
export default Card;
