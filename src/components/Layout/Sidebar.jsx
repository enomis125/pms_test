'use client'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import { FaLaptopHouse, FaUser } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { FaTruck } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaHotel } from "react-icons/fa";

const Sidebar = ({ showSidebar, setShowSidebar, children, name }) => {

    const hotelSetup = process.env.NEXT_PUBLIC_HOTEL_SETUP === "true";

    const listItems = {
        //"Dashboard": [],

        "Settings": {
            icon: <IoSettings  size={20} />,
            active: true,
            items: [
                {
                    ref: "/homepage/company", label: "Company", active: true
                },
                {
                    ref: "/homepage/chargeAccounts", label: "Charge Accounts", active: true
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
                    ref: "/homepage/hotelSetup/quartos", label: "Quartos", active: true
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
            active:true,
            items: [
                {
                    ref: "/homepage/cardex/", label: "Cardex", active: true
                },
            ]
        }
    }
    return (
        <>
            <aside className={(showSidebar ? "" : "hidden ") + "h-screen border-r border-bg-primary  overflow-hidden w-72 flex shrink-0 fixed top-0 z-40 inset-0 lg:block"} aria-label="Sidebar">
                <div className="h-full w-full no-scrollbar px-3 pb-4  bg-white text-bg-primary">
                    <Link href="/dashboard">
                        <div className="flex justify-center">
                            <div className="w-30 h-30 mt-8">
                                <Image src="/images/logo.png" alt="Logotipo" width={150} height={150} />
                            </div>
                        </div>
                    </Link>

                    <hr className="border-t border-primary-800 my-4" />

                    <br />

                    <div className="flex items-center space-x-2">
                        <Link href="/dashboard" className='flex space-x-4 align-middle ml-3'>
                            <FaUser className="text-2xl text-primary-800" />
                            <span className="text-sm text-primary-800 font-semibold">Sujeito Teste</span>
                        </Link>
                    </div>

                    <br />

                    <hr className="border-t border-primary-800 my-4" />

                    <ul className="space-y-2">
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
