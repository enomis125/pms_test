'use client'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import { FaLaptopHouse, FaUser } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { FaTruck } from "react-icons/fa";
import { IoReceipt, IoStorefront  } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaHotel } from "react-icons/fa";
import { IoMdPricetags } from "react-icons/io";
import { PiUsersFourFill } from "react-icons/pi";
import { MdOutlineCleaningServices } from "react-icons/md";
import { useTranslations } from 'next-intl';

const Sidebar = ({ showSidebar, setShowSidebar, children, name }) => {
    const t = useTranslations('Index');

    const hotelSetup = process.env.NEXT_PUBLIC_HOTEL_SETUP === "true";

    const listItems = {
        //"Dashboard": [],

        "Front Office" :{
            icon: <IoStorefront size={20}/>,
            active:true,
            items: [
                {
                    ref: "/homepage/frontOffice", label: t("sidebar.frontoffice.frontOffice"), active: true
                },
                {
                    ref: "/homepage/frontOffice/client_form", label: t("sidebar.frontoffice.clientFiles"), active: true
                },
                {
                    ref: "/homepage/frontDesk", label: t("sidebar.frontoffice.frontDesk"), active: true
                },
                {
                    ref: "/homepage/frontDesk/reservations", label: t("sidebar.frontoffice.reservations"), active: true
                },
                {
                    ref: "/homepage/frontDesk/arrivals", label: t("sidebar.frontoffice.arrivals"), active: true
                },
                {
                    ref: "/homepage/frontDesk/guestlist", label: t("sidebar.frontoffice.guestList"), active: true
                },
                {
                    ref: "/homepage/frontDesk/departures", label: t("sidebar.frontoffice.departures"), active: true
                },
                {
                    ref: "/homepage/frontOffice/tipology_Plan", label: t("sidebar.frontoffice.typologiesPlan"), active: true
                },
                {
                    ref: "/homepage/frontOffice/rooms_Plan", label: t("sidebar.frontoffice.roomsPlan"), active: true

                }
            ]
        },

        "Housekeeping" :{
            icon: <MdOutlineCleaningServices size={20}/>,
            active:true,
            items: [
                {
                    ref: "/homepage/housekeeping", label: "HouseKeeping", active: true
                },
                {
                    ref: "/homepage/housekeeping/management", label: "Management", active: true
                },
                {
                    ref: "/homepage/housekeeping/lost_&_found", label: "Lost and Found", active: true
                },
                {
                    ref: "/homepage/housekeeping/attendant_sheets", label: "Attendant Sheets", active: true
                },
            ]
        },

        "Settings": {
            icon: <IoSettings  size={20} />,
            active: true,
            items: [
                {
                    ref: "/homepage/company", label: "Company", active: true
                },
                {
                    ref: "/homepage/charge_accounts", label: "Charge Accounts", active: true
                },
            ]
        },

        "Hotel Setup":{
            icon: <FaHotel  size={20} />,
            active: true,
            items: [
                {
                    ref: "/homepage/hotelSetup", label: "Hotel", active: true
                },
                {
                    ref: "/homepage/hotelSetup/grupo_tipologia", label: "Grupo Tipologias", active: true
                },
                {
                    ref: "/homepage/hotelSetup/tipologia", label: "Tipologias", active: true
                },
                {
                    ref: "/homepage/hotelSetup/quartos", label: "Rooms", active: true
                },
                {
                    ref: "/homepage/hotelSetup/carateristicas", label: "Caraterísticas", active: true
                },
                {
                    ref: "/homepage/hotelSetup/manutencao", label: "Manutenção", active: true
                },
                {
                    ref: "/homepage/false", label: "False", active: hotelSetup
                },
            ]
        },

        "Cardex Setup" :{
            icon: <PiUsersFourFill size={20}/>,
            active:true,
            items: [
                {
                    ref: "/homepage/cardex", label: "Cardex", active: true
                },
                {
                    ref: "/homepage/cardex/saudacao", label: "Saudação", active: true
                },
                {
                    ref: "/homepage/cardex/nacionalidades", label: "Nacionalidades", active: true
                },
                {
                    ref: "/homepage/cardex/metodo_conhecimento", label: "Método de Conhecimento", active: true
                },
                {
                    ref: "/homepage/cardex/profissao", label: "Profissão", active: true
                },
                {
                    ref: "/homepage/cardex/documento_identificacao", label: "Documento de Identificação", active: true
                },
                {
                    ref: "/homepage/cardex/idiomas", label: "Idiomas", active: true
                },
                {
                    ref: "/homepage/cardex/preferencia_cliente", label: "Preferências de Cliente", active: true
                },
                {
                    ref: "/homepage/cardex/membros", label: "Membros", active: true
                },
                {
                    ref: "/homepage/cardex/marketing", label: "Marketing", active: true
                },
                {
                    ref: "/homepage/cardex/tipos_vip", label: "Tipos de VIP", active: true
                },
            ]
        },

        "Booking":{
            icon: <FaCalendarAlt  size={20} />,
            active: true,
            items: [
                {
                    ref: "/homepage/bookings", label: "Booking", active: true
                },
                {
                    ref: "/homepage/bookings/estados_de_reservas", label: "Estados de reservas", active: true
                },
                {
                    ref: "/homepage/bookings/segmentos_de_mercado", label: "Segmentos de mercado", active: true
                },
                {
                    ref: "/homepage/bookings/origens_de_mercado", label: "Origens de mercado", active: true
                },
                {
                    ref: "/homepage/bookings/formas_de_conhecimento", label: "Formas de conhecimento", active: true
                },
                {
                    ref: "/homepage/bookings/motivos_de_reserva", label: "Motivos de reservas", active: true
                },
                {
                    ref: "/homepage/bookings/codigos_de_substituicao", label: " Códigos de substituição", active: true
                },
                {
                    ref: "/homepage/bookings/tabela_de_recusa", label: " Tabela de recusas", active: true
                },
                {
                    ref: "/homepage/bookings/tabela_de_transfer", label: "Tipos de PickUp", active: true
                },
                {
                    ref: "/homepage/bookings/tipos_de_mudanca_de_reservas", label: "T. Mudança de reservas", active: true
                },
                {
                    ref: "/homepage/bookings/tipos_de_cancelamento", label: "Tipos de cancelamentos", active: true
                },
            ]
        },

        "Financial Setup":{
            icon: <IoReceipt  size={20} />,
            active: true,
            items: [
                {
                    ref: "/homepage/financialSetup", label: "Financial Setup", active: true
                },
                {
                    ref: "/homepage/financialSetup/departments", label: "Departamentos", active: true
                },
                {
                    ref: "/homepage/financialSetup/accounts_groups", label: "Grupo de Contas", active: true
                },
                {
                    ref: "/homepage/financialSetup/revenue_accounts", label: "Contas de Revenue", active: true
                },
                {
                    ref: "/homepage/financialSetup/payment_accounts", label: "Contas de Pagamento", active: true
                },
                {
                    ref: "/homepage/financialSetup/taxes", label: "Impostos", active: true
                },
                {
                    ref: "/homepage/financialSetup/cashiers", label: "Caixas", active: true
                },
                {
                    ref: "/homepage/financialSetup/void_charges", label: "Anulação de Cobranças", active: true
                },
            ]
        },

        "Gestão de Preços":{
            icon: <IoMdPricetags  size={20} />,
            active: true,
            items: [
                {
                    ref: "/homepage/priceManagement/price_groups", label: "Códigos de Preços", active: true
                },
                {
                    ref: "/homepage/priceManagement/price_description", label: "Descrição de Códigos de Preços", active: true
                },
                {
                    ref: "/homepage/priceManagement/seasons", label: "Épocas", active: true
                },
                
            ]
        }
    }
    return (
        <>
            <aside className={(showSidebar ? "" : "hidden ") + "bg-white h-screen border-r border-bg-primary overflow-hidden w-72 flex shrink-0 fixed top-0 z-40 inset-0 lg:block z-100"} aria-label="Sidebar">
    <div className="h-full w-full no-scrollbar px-3 pb-4 bg-white text-bg-primary">
        <Link href="/dashboard">
            <div className="flex justify-center">
                <div className="w-30 h-30 mt-8">
                    <Image src="/images/logo.png" alt="Logotipo" width={150} height={150} />
                </div>
            </div>
        </Link>

        <hr className="border-t border-primary-800 my-4" />

        <ul className="space-y-2 h-full max-h-[calc(100vh-330px)] overflow-y-auto">
            {
                children
            }
            {
                Object.entries(listItems).map(([k, { icon, items, active }], i) =>
                    <li key={i}>
                        <Dropdown title={k} labels={items} icon={icon} active={active} />
                    </li>
                )
            }
        </ul>

        <hr className="border-t border-primary-800 my-4" />

        <br />

        <div className="flex items-center space-x-2">
            <Link href="/dashboard" className='flex space-x-4 align-middle ml-3'>
                <FaUser className="text-2xl text-primary-800" />
                <span className="text-sm text-primary-800 font-semibold">Sujeito Teste</span>
            </Link>
        </div>

        <br />
    </div>
</aside>

            <div
                className={(showSidebar ? "" : "hidden ") + "fixed inset-0 z-10 bg-gray-900/50 lg:hidden"}
                onClick={() => setShowSidebar(false)}
            />
        </>
    );
}



const Dropdown = ({ title, labels, icon, active }) => {
    const pathname = usePathname()
    const router = useRouter();

    const actives = []
    labels.forEach((label) => {
        if (pathname != "/") actives.push(pathname.includes(label.ref))
    })
    const isActive = actives.some((val) => { return val == true })
    const [isOpen, setIsOpen] = useState(isActive)

    return (
        <>
            <header
                className={(isActive ? "text-primary-800 bg-primary-600" : "text-primary-800") + " flex items-center justify-between cursor-pointer p-1 pr-2 rounded-lg hover:bg-primary-600 hover:text-primary-800 transition ease-in-out duration-150"}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="ml-2 flex items-center">
                    {active ? icon && <span className="mr-2">{icon}</span> : null}
                    {active ? title && <h2 className="text-lg font-semibold">{title}</h2> : null}
                </div>
                {active ? ((isOpen) ? <IoIosArrowDown /> : <IoIosArrowForward />) : null}
            </header>

            <ul title={title} className={(isOpen) ? "my-2 " : "hidden" + " mb-2 "}>
                {labels.map(({ ref, label, active }, index) => {
                    const linkIsActive = pathname.includes(ref);
                    const disabled = !active && ref !== "/";

                    return (
                        <li
                            key={index}
                            className={(linkIsActive ? "text-primary-800 font-bold bg-primary-600" : "text-primary-800") + "  ml-2 my-1 p-2 text-sm  rounded-lg cursor-pointer hover:bg-primary-600 hover:text-primary-800 active:ring transition ease-in-out duration-150"}
                            onClick={() => !disabled && router.push(ref)}
                            style={{ opacity: disabled ? 0.5 : 1, cursor: disabled ? "not-allowed" : "pointer" }}
                        >
                            {!disabled ? label : null}
                            {disabled && (
                                <span className="ml-2 text-red-500"></span>
                            )}
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default Sidebar;
