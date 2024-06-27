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
import { BsHouseGearFill } from "react-icons/bs";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { useTranslations } from 'next-intl';

const Sidebar = ({ showSidebar, setShowSidebar, children, name }) => {
    const t = useTranslations('Index');

    const hotelSetup = process.env.NEXT_PUBLIC_HOTEL_SETUP === "true";

    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('');


    const languages = [
        { label: 'Português', value: 'pt' },
        { label: 'Espanhol', value: 'es' },
        { label: 'Francês', value: 'fr' },
        { label: 'Inglês', value: 'en' }
    ];

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleLanguageSelect = async () => {
        const selectedLang = languages.find(lang => lang.label === selected);
        setSelectedLanguage(selectedLang ? selectedLang.value : '');
        console.log('Selected language:', selectedLang ? selectedLang.value : '');

        const setCookie = await axios.post(`/api/languageCookies`, {
            data: {
                language: selectedLang.value
            }
        })

        handleClose();

        window.location.reload(true);
    };

    const listItems = {
        //"Dashboard": [],

        frontoffice :{
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

        housekeeping :{
            icon: <BsHouseGearFill size={20}/>,
            active:true,
            items: [
                {
                    ref: "/homepage/housekeeping", label: t('sidebar.housekeeping.housekeeping'), active: true
                },
                {
                    ref: "/homepage/housekeeping/management", label: t('sidebar.housekeeping.management'), active: true
                },
                {
                    ref: "/homepage/housekeeping/lost_&_found", label: t('sidebar.housekeeping.lostAndFound'), active: true
                },
                {
                    ref: "/homepage/housekeeping/attendant_sheets", label: t('sidebar.housekeeping.attendantSheets'), active: true
                },
            ]
        },

        settings: {
            icon: <IoSettings  size={20} />,
            active: true,
            items: [
                {
                    ref: "/homepage/company", label: t('sidebar.settings.company'), active: true
                },
                {
                    ref: "/homepage/charge_accounts", label: t('sidebar.settings.chargeAccounts'), active: true
                },
            ]
        },

        hotel:{
            icon: <FaHotel  size={20} />,
            active: true,
            items: [
                {
                    ref: "/homepage/hotelSetup", label: t('sidebar.hotel.hotel'), active: true
                },
                {
                    ref: "/homepage/hotelSetup/grupo_tipologia", label: t('sidebar.hotel.tipologiesGroup'), active: true
                },
                {
                    ref: "/homepage/hotelSetup/tipologia", label: t('sidebar.hotel.tipologies'), active: true
                },
                {
                    ref: "/homepage/hotelSetup/quartos", label: t('sidebar.hotel.rooms'), active: true
                },
                {
                    ref: "/homepage/hotelSetup/carateristicas", label: t('sidebar.hotel.characteristics'), active: true
                },
                {
                    ref: "/homepage/hotelSetup/manutencao", label: t('sidebar.hotel.maintenance'), active: true
                },
                {
                    ref: "/homepage/false", label: "False", active: hotelSetup
                },
            ]
        },

        cardex :{
            icon: <PiUsersFourFill size={20}/>,
            active:true,
            items: [
                {
                    ref: "/homepage/cardex", label: t('sidebar.cardex.cardex'), active: true
                },
                {
                    ref: "/homepage/cardex/saudacao", label: t('sidebar.cardex.salutations'), active: true
                },
                {
                    ref: "/homepage/cardex/nacionalidades", label: t('sidebar.cardex.nationalities'), active: true
                },
                {
                    ref: "/homepage/cardex/metodo_conhecimento", label: t('sidebar.cardex.knowledgeMethod'), active: true
                },
                {
                    ref: "/homepage/cardex/profissao", label: t('sidebar.cardex.profession'), active: true
                },
                {
                    ref: "/homepage/cardex/documento_identificacao", label: t('sidebar.cardex.idDocument'), active: true
                },
                {
                    ref: "/homepage/cardex/idiomas", label: t('sidebar.cardex.languages'), active: true
                },
                {
                    ref: "/homepage/cardex/preferencia_cliente", label: t('sidebar.cardex.clientPreferences'), active: true
                },
                {
                    ref: "/homepage/cardex/membros", label: t('sidebar.cardex.members'), active: true
                },
                {
                    ref: "/homepage/cardex/marketing", label: t('sidebar.cardex.marketing'), active: true
                },
                {
                    ref: "/homepage/cardex/tipos_vip", label: t('sidebar.cardex.vipTypes'), active: true
                },
            ]
        },

        bookings:{
            icon: <FaCalendarAlt  size={20} />,
            active: true,
            items: [
                {
                    ref: "/homepage/bookings", label: t('sidebar.bookings.bookings'), active: true
                },
                {
                    ref: "/homepage/bookings/estados_de_reservas", label: t('sidebar.bookings.bookingStatus'), active: true
                },
                {
                    ref: "/homepage/bookings/segmentos_de_mercado", label: t('sidebar.bookings.marketSegments'), active: true
                },
                {
                    ref: "/homepage/bookings/origens_de_mercado", label: t('sidebar.bookings.marketSources'), active: true
                },
                {
                    ref: "/homepage/bookings/formas_de_conhecimento", label: t('sidebar.bookings.formsOfKnowledge'), active: true
                },
                {
                    ref: "/homepage/bookings/motivos_de_reserva", label: t('sidebar.bookings.bookingReasons'), active: true
                },
                {
                    ref: "/homepage/bookings/codigos_de_substituicao", label: t('sidebar.bookings.substitutionCodes'), active: true
                },
                {
                    ref: "/homepage/bookings/tabela_de_recusa", label: t('sidebar.bookings.cancelationReasons'), active: true
                },
                {
                    ref: "/homepage/bookings/tabela_de_transfer", label: t('sidebar.bookings.pickupTypes'), active: true
                },
                {
                    ref: "/homepage/bookings/tipos_de_mudanca_de_reservas", label: t('sidebar.bookings.bookingChangeTypes'), active: true
                },
                {
                    ref: "/homepage/bookings/tipos_de_cancelamento", label: t('sidebar.bookings.cancelationTypes'), active: true
                },
            ]
        },

        financial:{
            icon: <IoReceipt  size={20} />,
            active: true,
            items: [
                {
                    ref: "/homepage/financialSetup", label: t('sidebar.financial.financial'), active: true
                },
                {
                    ref: "/homepage/financialSetup/departments", label: t('sidebar.financial.departments'), active: true
                },
                {
                    ref: "/homepage/financialSetup/accounts_groups", label: t('sidebar.financial.accountsGroups'), active: true
                },
                {
                    ref: "/homepage/financialSetup/revenue_accounts", label: t('sidebar.financial.revenueAccounts'), active: true
                },
                {
                    ref: "/homepage/financialSetup/payment_accounts", label: t('sidebar.financial.paymentAccounts'), active: true
                },
                {
                    ref: "/homepage/financialSetup/taxes", label: t('sidebar.financial.taxes'), active: true
                },
                {
                    ref: "/homepage/financialSetup/cashiers", label: t('sidebar.financial.cashiers'), active: true
                },
                {
                    ref: "/homepage/financialSetup/void_charges", label: t('sidebar.financial.voidCharges'), active: true
                },
            ]
        },

        priceManagement:{
            icon: <IoMdPricetags  size={20} />,
            active: true,
            items: [
                {
                    ref: "/homepage/priceManagement/price_groups", label: t('sidebar.priceManagement.priceCodes'), active: true
                },
                {
                    ref: "/homepage/priceManagement/price_description", label: t('sidebar.priceManagement.priceCodesDescription'), active: true
                },
                {
                    ref: "/homepage/priceManagement/seasons", label: t('sidebar.priceManagement.seasons'), active: true
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
                        {children}
                        {Object.entries(listItems).map(([key, { icon, items, active }], index) =>
                            <li key={index}>
                                <Dropdown title={t(`sidebar.${key}.label`)} labels={items} icon={icon} active={active} />
                            </li>
                        )}
                    </ul>

                    <hr className="border-t border-primary-800 my-4" />

                    <div className="flex items-center gap-x-2">
                    <Button size="sm" className="bg-slate-200 uppercase" onClick={handleOpen}>
                            {selectedLanguage || 'Select Language'}
                        </Button>
                        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">Select Language</ModalHeader>
                                        <ModalBody>
                                            <div className="flex flex-col gap-3">
                                                <RadioGroup value={selected} onValueChange={setSelected}>
                                                    {languages.map((language) => (
                                                        <Radio key={language.value} value={language.label}>
                                                            {language.value.toUpperCase()} - {language.label}
                                                        </Radio>
                                                    ))}
                                                </RadioGroup>
                                                <p className="text-default-500 text-small">Selected: {selected}</p>
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onClick={onClose}>
                                                Close
                                            </Button>
                                            <Button color="primary" onClick={handleLanguageSelect}>
                                                Choose
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>


                    <div className="flex items-center space-x-2">
                        <Link href="/dashboard" className='flex space-x-4 align-middle ml-3'>
                            <FaUser className="text-2xl text-primary-800" />
                            <span className="text-sm text-primary-800 font-semibold">Sujeito Teste</span>
                        </Link>
                    </div>
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
