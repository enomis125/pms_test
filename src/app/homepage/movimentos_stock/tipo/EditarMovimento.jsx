"use client"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Select,
    SelectItem
} from "@nextui-org/react";
import {
    Input,
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Pagination,
    Tooltip,

    Autocomplete,
    AutocompleteItem
} from "@nextui-org/react"
import { debounce } from 'lodash';
import React, { useState, useEffect, useCallback } from "react";

import useSWRImmutable from "swr"
import Loader from "@/components/Loader/Loader";
import axios from 'axios';
import { SearchIcon } from "@/components/svgs/SearchIcon";
import { tableClassNames } from "@/components/classnames/table";
import { parseISO } from 'date-fns';
import ConnectionError from "@/components/Error/connection/ConnectionError";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { BiCog } from 'react-icons/bi';
import { FaArrowRight, FaRegTrashAlt } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { FiTruck } from "react-icons/fi";
import { FaTimes } from 'react-icons/fa';
import { BiListCheck } from "react-icons/bi";
import { HiCheckCircle } from "react-icons/hi";
import { HiDotsVertical, HiSaveAs } from "react-icons/hi";
import { LuCheckCircle } from "react-icons/lu";
import { FaRegSave } from "react-icons/fa";
import { GoPaperAirplane } from "react-icons/go";
import { FiPrinter } from "react-icons/fi";
import { IoMdCheckboxOutline } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { TfiSave } from "react-icons/tfi";
import { tableClassNamesEditorMovimentos } from "@/components/classnames/table"
import { FaCalendarAlt } from "react-icons/fa";
import { AiOutlineExpand, AiOutlineCompress } from "react-icons/ai";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { FaExpand, FaCompress } from "react-icons/fa";
import { MdExitToApp, MdSavings } from "react-icons/md";
import { MdPlaylistAdd } from "react-icons/md";
import { Sonsie_One } from "next/font/google";
import { useSession } from "next-auth/react";
import { RxExit } from "react-icons/rx";




function formatDate(inputDate) {
    const dateObject = new Date(inputDate);
    const isoString = dateObject.toISOString();
    return isoString;
}

const calculateIva = (pValor, pPercIva, pIvaIncluido) => {
    let result = 0;
    const coefIva = pPercIva / 100;

    if (pIvaIncluido) {
        result = pValor - pValor / (coefIva + 1);
    } else {
        result = pValor * coefIva;
    }


    return result;
};

function Arredonda(Valor, Decimais) {
    const chThousandSeparatorL = '.';
    const chDecimalSeparatorL = ',';

    // Substitua o separador de milhares e decimais, se necessário
    const StrValor = Valor.toString().replace(chThousandSeparatorL, '').replace(chDecimalSeparatorL, '.');

    let RR;
    try {
        // Converter para float
        const valorFloat = parseFloat(StrValor);

        // Arredondar para o número especificado de casas decimais
        RR = valorFloat.toFixed(Decimais);
    } catch (error) {
        console.error('Erro ao arredondar o valor:', error);
        return null;
    }

    return RR;
}




const EditarMovimento = ({ movement, setMovimento, isOpen, newMovimento, onOpenChange, tipoMovimento }) => {

    if (!movement) {
        // orderId não está preenchido, você pode renderizar uma mensagem ou outro componente aqui
        return
    }


    return (
        <CarregaDadosMovimento

            movement={movement}
            setMovimento={setMovimento}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            newMovimento={newMovimento}
            tipoMovimento={tipoMovimento}

        />
    );
};

export default EditarMovimento;



const CarregaDadosMovimento = ({ movement, setMovimento, isOpen, newMovimento, onOpenChange, tipoMovimento }) => {

    console.log('EditarMovimento')
    console.log('CarregaDadosMovimento')
    const [dataReady, setDataReady] = useState(false);

    const [units, setUnits] = useState(null);
    const [storages, setStorages] = useState(null);
    const [deliveries, setDeliveries] = useState(null);
    const [taxes, setTaxes] = useState(null);
    const [products, setProducts] = useState(null);
    const [suppliers, setSuppliers] = useState(null);






    const [info, setInfo] = useState([]);
    const { data: session, status } = useSession();
    const [mounted, setMounted] = useState(false);
    const [idUser, setIDUser] = useState(0);
    const [nomeuser, setNomeuser] = useState("")

    const [lista_do_movimento, setlista_do_movimento] = useState(null);
    // Definição de variáveis de estado de erro
    const [errorUnits, setErrorUnits] = useState(null);
    const [errorStorages, setErrorStorages] = useState(null);
    const [errorDeliveries, setErrorDeliveries] = useState(null);
    const [errorTaxes, setErrorTaxes] = useState(null);
    const [errorProducts, setErrorProducts] = useState(null);
    const [errorSuppliers, setErrorSuppliers] = useState(null);
    const [error, setError] = useState(null);



    useEffect(() => {
        const fetchUnits = async () => {
            try {
                const response = await axios.get("/api/generic/Units");
                const data = response.data.response;
                if (!units) {
                    setUnits(data);
                }
            } catch (error) {
                console.error('Erro ao procurar dados da API de unidades:', error);
                setErrorUnits(error);
            }
        };

        if (!units) {
            fetchUnits();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchStorages = async () => {
            try {
                const response = await axios.get("/api/generic/Storages");
                const data = response.data.response;
                if (!storages) {
                    setStorages(data);
                }
            } catch (error) {
                console.error('Erro ao procurar dados da API de armazenamento:', error);
                setErrorStorages(error);
            }
        };

        if (!storages) {
            fetchStorages();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const response = await axios.get("/api/generic/deliveries");
                const data = response.data.response;
                if (!deliveries) {
                    setDeliveries(data);
                }
            } catch (error) {
                console.error('Erro ao procurar dados da API de entregas:', error);
                setErrorDeliveries(error);
            }
        };

        if (!deliveries) {
            fetchDeliveries();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchTaxes = async () => {
            try {
                const response = await axios.get("/api/generic/taxes");
                const data = response.data.response;
                if (!taxes) {
                    setTaxes(data);
                }
            } catch (error) {
                console.error('Erro ao procurar dados da API de impostos:', error);
                setErrorTaxes(error);
            }
        };

        if (!taxes) {
            fetchTaxes();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/generic/products");
                const data = response.data.response;
                if (!products) {
                    setProducts(data);
                }
            } catch (error) {
                console.error('Erro ao procurar dados da API de produtos:', error);
                setErrorProducts(error);
            }
        };

        if (!products) {
            fetchProducts();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get("/api/suppliers");
                const data = response.data.response;
                if (!suppliers) {
                    setSuppliers(data);
                }
            } catch (error) {
                console.error('Erro ao procurar dados da API de fornecedores:', error);
                setErrorSuppliers(error);
            }
        };

        if (!suppliers) {
            fetchSuppliers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    useEffect(() => {
        if (session && status !== "loading") {
            setIDUser(session.user.id);
            setNomeuser(session.user.name)
            setMounted(true);
        }
    }, [session, status])

    console.log("Dados de unidades:", units);
    console.log("Dados de suppliers:", suppliers);

    let movement1 = 0
    movement1 = movement;

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/movements/movement?idMovement=${movement1}`);
                const data = await response.data.response;

                setlista_do_movimento(data);
            } catch (error) {
                console.error('Erro ao procurar dados da API:', error);
                setError(error);
            }
        };

        if (movement1) {
            fetchData();
        }

        return () => {
            // Cleanup function to cancel any ongoing requests when component unmounts or movement changes
            console.log('Cleanup');
        };
    }, [movement1]);

    useEffect(() => {

        if (movement && lista_do_movimento) {

            const linesWithKey = lista_do_movimento.Lines.map(line => ({
                ...line,
                key: uuidv4()
            }));
            setInfo(linesWithKey);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lista_do_movimento]);


    // Verifica se todas as requisições foram concluídas
    useEffect(() => {
        if (units && storages && deliveries && taxes && products && suppliers) {
            setDataReady(true);
        }
    }, [units, storages, deliveries, taxes, products, suppliers]);




    // Handle loading state and errors
    if (!lista_do_movimento && !error) {
        // Data is still loading
        return <p>Loading...</p>;
    }

    if (error) {
        // Error occurred while fetching data
        console.error("Error fetching order data:", error);
        return <p>Error loading order data</p>;
    }




    if (!dataReady || (lista_do_movimento && lista_do_movimento.isLoading)) {
        return <Loader />;
    }
    if (!info || !info.length) {
        return <p>Sem dados disponíveis para mostrar.</p>;

    }

    return (
        <TableComponent
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            movement={movement}
            info={info}
            lista={lista_do_movimento}
            produtos={products}
            storages={storages}
            deliveries={deliveries}
            units={units}
            suppliers={suppliers}
            tipoMovimento={tipoMovimento}
            taxes={taxes}
            setInfo={setInfo}
            state={lista_do_movimento.state}

            nomeuser={nomeuser}
        />
    );
};






const HeaderDatePicker = ({ label, selected, onChange, dateFormat }) => (
    <div className="header-item mb-2">
        <div><label className="header-label text-xs text-zinc-600">{label}</label></div>
        <div className="flex">
            <div className="relative w-32">
                <DatePicker

                    className="custom-date-picker text-sm  w-full"
                    selected={selected}
                    onChange={onChange}
                    selectsStart
                    dateFormat={dateFormat}
                // customInput={<CustomInput />} // Usa o componente customizado de input
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none mt-0">
                    <FaCalendarAlt className="text-gray-400" />
                </div>
            </div>
        </div>
    </div>
);









//
//----------------------------------------------------------------------------------------------------------------------------------
//

// const HeaderSelect = ({
//     label,
//     placeholder,
//     className,
//     labelPlacement,
//     options,
//     defaultSelectedKeys,
//     onSelectionChange,
//     valueKey,
//     labelKey,
//     defaultSelectedKey,
//     value,
//     key,
//     textvalue
// }) => {
//     // Encontrar o objeto no array options com base na ID
//     const selectedOption = options.find((option) => option[valueKey] === defaultSelectedKey);




//     return (
//         <div className="header-item lg:mr-2 mb-2 lg:mb-0">
//             {/* <label className="header-label">{label}</label> */}
//             {!options ? (
//                 <p>Carregando...</p>
//             ) : (
//                 <Autocomplete
//                     label={label}
//                     variant="underlined"
//                     className={className}
//                     placeholder={placeholder}
//                     defaultInputValue={selectedOption ? selectedOption[labelKey] : ""}
//                     defaultSelectedKey={selectedOption ? selectedOption[valueKey] : null}
//                     value={value}
//                     key={key}
//                     textvalue={textvalue}
//                     onSelectionChange={(valueKey) => {
//                         console.log("valueKey", valueKey)
//                         onSelectionChange(valueKey);
//                     }}
//                 >
//                     {options.map((option) => (
//                         <AutocompleteItem
//                             className="header-autocompleteitem"
//                             key={option[valueKey]}
//                             value={option[valueKey]}
//                         >
//                             {option[labelKey]}
//                         </AutocompleteItem>
//                     ))}
//                 </Autocomplete>
//             )}
//         </div>
//     );
// };



// const HeaderSelect = ({
//     label,
//     placeholder,
//     className,
//     labelPlacement,
//     options,
//     defaultSelectedKeys,
//     onSelectionChange,
//     valueKey,
//     labelKey,
//     defaultSelectedKey,
//     value,
//     key,
//     textvalue
// }) => {
//     // Encontrar o objeto no array options com base na ID
//     const selectedOption = options.find((option) => option[valueKey] === defaultSelectedKey);

//     return (
//         <div className="header-item lg:mr-2 mb-2 lg:mb-0">
//             {!options ? (
//                 <p>Carregando...</p>
//             ) : (
//                 <Autocomplete
//                     label={label}
//                     variant="underlined"
//                     className={className}
//                     placeholder={placeholder}
//                     defaultInputValue={selectedOption ? selectedOption[labelKey] : ""}
//                     defaultSelectedKey={selectedOption ? selectedOption[valueKey] : null}
//                     value={value}
//                     key={key}
//                     textvalue={textvalue}
//                     onSelectionChange={(selectedSupplierId) => {
//                         onSelectionChange(selectedSupplierId); // Aqui, passamos diretamente o ID do fornecedor selecionado
//                     }}
//                 >
//                     {options.map((option) => (
//                         <AutocompleteItem
//                             className="header-autocompleteitem"
//                             key={option[valueKey]}
//                             value={option[valueKey]}
//                         >
//                             {option[labelKey]}
//                         </AutocompleteItem>
//                     ))}
//                 </Autocomplete>
//             )}
//         </div>
//     );
// };


const HeaderSelect = ({
    label,
    placeholder,
    className,
    labelPlacement,
    options,
    defaultSelectedKeys,
    onSelectionChange,
    valueKey,
    labelKey,
    defaultSelectedKey,
    value,
    key,
    textvalue
}) => {
    // Encontrar o objeto no array options com base na ID
    const selectedOption = options.find((option) => option[valueKey] === defaultSelectedKey);



    return (
        <div className="header-item lg:mr-2 mb-2 lg:mb-0">
            <label className="header-label">{label}</label>
            {!options ? (
                <p>Carregando...</p>
            ) : (
                <Autocomplete
                    variant="underlined"
                    className={className}
                    placeholder={placeholder}
                    defaultInputValue={selectedOption ? selectedOption[labelKey] : ""}
                    defaultSelectedKey={selectedOption ? selectedOption[valueKey] : null}
                    value={value}
                    key={key}
                    textvalue={textvalue}
                    onSelectionChange={(valueKey) => {
                        onSelectionChange(valueKey);
                    }}
                >
                    {options.map((option) => (
                        <AutocompleteItem
                            className="header-autocompleteitem"
                            key={option[valueKey]}
                            value={option[valueKey]}
                        >
                            {option[labelKey]}
                        </AutocompleteItem>
                    ))}
                </Autocomplete>
            )}
        </div>
    );
};








const Header = ({ movementDate, setMovementDate, movementDateDoc, setMovementDateDoc, movementDateVenc,
    setMovementDateVenc, suppliers, supplierId, setSupplierId, supplierName, setSupplierName, Documentnumber, setDocumentnumber, lista }) => {
    const [selectedSupplier, setSelectedSupplier] = useState(null);

    const handleDateChange = (date, setterFunction) => {
        // Verifica se a data é válida
        if (isValidDate(date)) {
            setterFunction(date);
        } else {
            // Se a data não for válida, faça o que precisar, como exibir uma mensagem de erro
            console.log("Data inválida!");
        }
    };

    const updateSupplier = (id) => {
        const selectedSupplier = suppliers.find((supplier) => supplier.Supplier_id == id);
        setSupplierId(id);
        setSupplierName(selectedSupplier ? selectedSupplier.Name : '');
    };

    const isValidDate = (date) => {
        // Verifica se a data não é nula e é uma instância de Date válida
        // e não é igual a 29/12/1899
        return date instanceof Date && !isNaN(date) && !isDefaultDate(date);
    };

    const isDefaultDate = (date) => {
        // Verifica se a data é igual a 29/12/1899
        const defaultDate = new Date(1899, 11, 29); // 29/12/1899
        return date.getTime() === defaultDate.getTime();
    };

    const handleDocumentNumberChange = (event) => {
        setDocumentnumber(event.target.value);
    };

    return (
        <>
            <div className="flex justify-between w-full">
                <div className="grid xl:grid-cols-12 gap-4">
                    <div className='col-span-4'>
                        <Autocomplete
                            variant="underlined"
                            className={"w-96 sm"}
                            placeholder="Procurar fornecedor"
                            defaultInputValue={supplierName} // Usar supplierName como defaultInputValue
                            defaultSelectedKey={supplierId} // Usar supplierId como defaultSelectedKey
                            value={supplierName} // Usar supplierName como valor
                            onSelectionChange={(valueKey) => updateSupplier(valueKey)}
                        >
                            {suppliers.map((option) => (
                                <AutocompleteItem
                                    className="header-autocompleteitem"
                                    key={option.Supplier_id}
                                    value={option.Supplier_id} // Usar Supplier_id como valor do item
                                >
                                    {option.Name}
                                </AutocompleteItem>
                            ))}
                        </Autocomplete>
                    </div>

                    <div className='col-span-2'>
                        <Input
                            type="text"
                            variant="underlined"
                            label="Nº Documento"
                            placeholder="Nº Documento"
                            value={Documentnumber}
                            onChange={handleDocumentNumberChange}
                        />



                    </div>
                    <div className='col-span-2'>
                        <HeaderDatePicker
                            label="Data Movimento"
                            selected={isDefaultDate(movementDate) ? undefined : movementDate}
                            onChange={(date) => handleDateChange(date, setMovementDate)}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>

                    <div className='col-span-2 -ml-10'>
                        <HeaderDatePicker
                            label="Data Documento"
                            selected={movementDateDoc}
                            onChange={(date) => handleDateChange(date, setMovementDateDoc)}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>

                    <div className='col-span-2 -ml-20'>
                        <HeaderDatePicker
                            label="Data Vencimento"
                            selected={movementDateVenc}
                            onChange={(date) => handleDateChange(date, setMovementDateVenc)}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>

                    {/* <div className='col-span-2'>
                        <HeaderDatePicker


                            label="Data Movimento"
                            selected={movementDate}
                            onChange={(date) => setMovementDate(date)}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>

                    <div className='col-span-2 -ml-10'>
                        <HeaderDatePicker
                            label="Data Documento"
                            selected={movementDateDoc}
                            onChange={(date) => setMovementDateDoc(date)}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>

                    <div className='col-span-2 -ml-20'>
                        <HeaderDatePicker
                            label="Data Vencimento"
                            selected={movementDateVenc}
                            onChange={(date) => setMovementDateVenc(date)}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div> */}
                </div>

                <div className="flex space-x-1">
                    <Button
                        isIconOnly
                        size="lg"
                        className="text-gray-500"
                    >
                        <BiListCheck size={30} />
                    </Button>

                    <Button
                        size="lg"
                        isIconOnly
                        className="text-gray-500"

                    >

                        <FiTruck size={30} />
                    </Button>

                    <Button
                        className="text-gray-500"
                        isIconOnly
                        size="lg"
                    >
                        <LuCheckCircle size={30} />
                    </Button>


                    <Button
                        isIconOnly
                        size="lg"
                        className="text-blue-800"
                    >
                        <HiDotsVertical size={30} />
                    </Button>
                </div>

            </div >
        </>
    );
}


//
//----------------------------------------------------------------------------------------------------------------------------------
//


const TableComponent = ({ isOpen, onOpenChange, movement, info, lista, produtos, storages, units, suppliers, tipoMovimento, state, taxes, setInfo, nomeuser }) => {

    const [movementDate, setMovementDate] = useState(lista && lista.date ? new Date(lista.date) : new Date());
    const [movementDateDoc, setmovementDateDoc] = useState(lista && lista.datede ? new Date(lista.datede) : new Date());
    const [movementDateVenc, setmovementDateVenc] = useState(lista && lista.Duedate ? new Date(lista.Duedate) : new Date());

    const [supplierId, setSupplierId] = useState(lista && lista.Identity_id ? lista.Identity_id : 0);

    const [Documentnumber, setDocumentnumber] = useState(lista && lista.Documentnumber ? lista.Documentnumber : '');


    const [supplierName, setSupplierName] = useState(lista && lista.Entitydescription ? lista.Entitydescription : '');

    const [estado, setestado] = useState(lista && lista.State ? lista.State : 0);

    const [total, setTotal] = useState(lista && lista.Totalamount ? parseFloat(lista.Totalamount.toFixed(4)) : 0);

    const [totalIva, setTotalIva] = useState(((lista && lista.Taxamount) ?? 0).toFixed(4));
    // const [totalIva, setTotalIva] = useState(lista && lista.Taxamount ? parseFloat(lista.Taxamount.toFixed(4)) : 0);


    const [valorIncidencia, setValorIncidencia] = useState(total - totalIva);


    const [filteredProdutos, setFilteredProdutos] = useState({});
    const [searchTerms, setSearchTerms] = useState({});
    const [selectedProducts, setSelectedProducts] = useState({});

    const [deliveryId, setDeliveryId] = useState({});

    const [isMaximized, setIsMaximized] = useState(false);
    const [selValorUnitario, setSelValorUnitario] = useState(false);

    const notify = () => toast.success("Movimento editado com sucesso");
    const [isLoading, setIsLoading] = useState(false);

    const formatCurrency = useCallback((value, casasdeimais) => {
        // Arredondar para quatro casas decimais
        const roundedValue = Number(value).toFixed(casasdeimais);

        // Devolver o valor arredondado
        return roundedValue;
    }, []);
    const totalAmountini = 0
    useEffect(() => {
        console.log('lista.useEffect', lista.Identity_id)
        if (lista) {
            if (lista.Date) {
                setMovementDate(new Date(lista.Date));
            }
            if (lista.Datede) {
                setmovementDateDoc(new Date(lista.Datede));
            }
            if (lista.Duedate) {
                setmovementDateVenc(new Date(lista.Duedate));
            }
            if (lista.State) {
                setestado(lista.State);
            }

            if (lista.Totalamount) {
                setTotal(lista.Totalamount);
                setTotalIva(lista.Taxamount);
            }



            if (lista.Totalamount !== null && lista.Taxamount !== null) {
                setValorIncidencia(lista.Totalamount - (lista.Taxamount || 0));
            } else {
                setValorIncidencia(lista.Totalamount || 0);
            }

            if (lista.Identity_id !== undefined && lista.Identity_id !== null) {
                console.log('lista.Identity_id', lista.Identity_id);
                setSupplierId(lista.Identity_id);
                setSupplierName(lista.Entitydescription);
            }

            if (lista.Documentnumber !== undefined && lista.Documentnumber !== null) {

                setDocumentnumber(lista.Documentnumber);
            }
        }
    }, [lista]);


    useEffect(() => {

        if (produtos && Object.keys(searchTerms).length > 0) {
            const updatedFilteredProdutos = {};

            Object.entries(searchTerms).forEach(([orderKey, searchTerm]) => {
                if (searchTerm.length >= 3) {
                    const filtered = produtos.filter((produto) =>
                        produto.Productname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        produto.Productreference.toLowerCase().includes(searchTerm.toLowerCase())
                    );



                    updatedFilteredProdutos[orderKey] = filtered;
                }
            });


            setFilteredProdutos(updatedFilteredProdutos);
        }
    }, [searchTerms, produtos]);





    const calculateTotals = useCallback(() => {
        let LtotalIva = 0;
        let LvalorIncidencia = 0;
        let Ltotal = 0;

        var LTaxrate = 0;

        // Loop through your order items or data structure
        info.forEach((item) => {

            LTaxrate = 0;

            const selectedTax = taxes.find((tax) => tax.Tax_id == item.Tax_id);
            if (selectedTax) {

                LTaxrate = selectedTax.Taxrate
            }

            const percentagemIva = LTaxrate || 0; // Adjust as needed
            const quantidadeNumerica = parseFloat(item.Quantity) || 0;
            const valorUnitarioNumerico = parseFloat(item.Netunitprice1) || 0;
            const valorLinha = quantidadeNumerica * valorUnitarioNumerico || 0;

            Ltotal += valorLinha;

            const calculatedIva = calculateIva(valorLinha, percentagemIva, false);
            LtotalIva += calculatedIva;



        });

        LvalorIncidencia = Ltotal;
        LtotalIva = LtotalIva.toFixed(2);
        Ltotal = Ltotal + parseFloat(LtotalIva);

        setTotalIva(formatCurrency(LtotalIva, 2));
        setValorIncidencia(formatCurrency(LvalorIncidencia, 2));
        setTotal(formatCurrency(Ltotal, 2));
    }, [info, taxes, formatCurrency, setTotalIva, setValorIncidencia, setTotal]);




    useEffect(() => {
        calculateTotals();
    }, [info, calculateTotals]);




    const [movimento, setMovement] = useState([
        {
            key: uuidv4(),
            Activity_id: null,
            Amountlinebypcmperiod: null,
            Centercostdetails: null,
            Comments_line: null,
            Commentsconformityorder: null,
            Conformityorderregistdate: null,
            Conformityorderregistuser: null,
            Creditedquantity: null,
            Currentuser: null,
            DeductibleVATamount: null,
            DeductibleVATpercentage: null,
            Discount_id: null,
            Discountpercentage: null,
            Fixedtotalamount: null,
            Identity_id: null,
            Inventory_id: null,
            Launched: null,
            Line_id: null,
            Lot: null,
            Lotexpirydate: null,
            Lotorigininvoice: null,
            Lotorigininvoiceexpirydate: null,
            Lottemperature: null,
            Lottemperatureorigininvoice: null,
            Movement_id: null,
            Movementcreationpcm: null,
            Movimentacion_id: null,
            Netamount: null,
            Netunitprice: null,
            Netunitprice1: null,
            NodeductibleVATamount: null,
            NodeductibleVATpercentage: null,
            Order_id: null,
            Orderline_id: null,
            Orderprice: null,
            Orderunit_id: null,
            Origindocdescription: null,
            Originline_id: null,
            Originmovement_id: null,
            Originmovementtype_id: null,
            Parentline_id: null,
            Parentproduct_id: null,
            Pendingquantity: null,
            Periodpcm: null,
            Product_id: null,
            Productname: '',
            Productmovesstock: null,
            Productreference: null,
            Quantity: null,
            Reasonbreaks: null,
            Retention_id: null,
            Retentionpercentage: null,
            Shoppinglist_id: null,
            Shoppinglistline_id: null,
            Statusconformityorder: null,
            Storage_id: null,
            Supplierproductdescription: null,
            Supplierreference: null,
            Tax_id: null,
            Taxamount: null,
            Taxrate: null,
            Totalamount: null,
            Totalquantityorderline: null,
            Totalretention: null,
            Transaction_id: null,
            TypeArticleERP: null,
            Typeattribconformityenc: null,
            Typeconformitymanenc_id: null,
            Typeline: null,
            Unit_id: null
        }
    ])

    const adicionarLinha = () => {

        if (info.length > 0) {
            const newLineId = -1;

            setInfo((prevMovimentos) => [
                ...prevMovimentos,
                {
                    key: uuidv4(),
                    Activity_id: 0,
                    Amountlinebypcmperiod: 0,
                    Centercostdetails: [],
                    Comments_line: "",
                    Commentsconformityorder: "",
                    Conformityorderregistdate: "",
                    Conformityorderregistuser: "",
                    Creditedquantity: 0,
                    Currentuser: "",
                    DeductibleVATamount: 0,
                    DeductibleVATpercentage: 0,
                    Discount_id: 0,
                    Discountpercentage: 0,
                    Fixedtotalamount: 0,
                    Identity_id: 0,
                    Inventory_id: 0,
                    Launched: 0,
                    Line_id: newLineId,
                    Lot: "",
                    Lotexpirydate: "",
                    Lotorigininvoice: "",
                    Lotorigininvoiceexpirydate: "",
                    Lottemperature: "",
                    Lottemperatureorigininvoice: "",
                    Movement_id: { movement },
                    Movementcreationpcm: 0,
                    Movimentacion_id: 0,
                    Netamount: 0,
                    Netunitprice: 0,
                    Netunitprice1: 0,
                    NodeductibleVATamount: 0,
                    NodeductibleVATpercentage: 0,
                    Order_id: 0,
                    Orderline_id: 0,
                    Orderprice: 0,
                    Orderunit_id: 0,
                    Origindocdescription: "",
                    Originline_id: 0,
                    Originmovement_id: 0,
                    Originmovementtype_id: 0,
                    Parentline_id: 0,
                    Parentproduct_id: 0,
                    Pendingquantity: 0,
                    Periodpcm: 0,
                    Product_id: 0,
                    Productmovesstock: 0,
                    Productreference: "",
                    Productname: "",
                    Quantity: 0,
                    Reasonbreaks: "",
                    Retention_id: 0,
                    Retentionpercentage: 0,
                    Shoppinglist_id: 0,
                    Shoppinglistline_id: 0,
                    Statusconformityorder: 0,
                    Storage_id: 0,
                    Supplierproductdescription: "",
                    Supplierreference: "",
                    Tax_id: 0,
                    Taxamount: 0,
                    Taxrate: 0,
                    Totalamount: 0,
                    Totalquantityorderline: 0,
                    Totalretention: 0,
                    Transaction_id: 0,
                    TypeArticleERP: "",
                    Typeattribconformityenc: 0,
                    Typeconformitymanenc_id: 0,
                    Typeline: 0,
                    Unit_id: 0
                }
            ])
        }

    }

    const handleAddButtonClick = (keys) => {


        //  onOpenTwo(); // Certifique-se de que esta função está sendo chamada corretamente


    };



    const onInputChangeSelect = (movementKey, value,) => {


        setSearchTerms((prevSearchTerms) => ({
            ...prevSearchTerms,
            [movementKey]: value,
        }));

        setMovement((prevMovimentos) => {
            const novosMovimentos = prevMovimentos.map((movimento) => {
                if (movimento.key === movementKey) {
                    return { ...movimento, produto: value };
                } else {
                    return movimento;
                }
            });
            return novosMovimentos;
        });

        setSelectedProducts((prevSelectedProducts) => ({
            ...prevSelectedProducts,
            [movementKey]: {
                Productid: 0,
                produto: value,
            },
        }));
    };






    const onSelectionChangeUnits = (movementKey, selectedKey, selectedValue, selectedLabel) => {


        if (!isNaN(selectedKey) && Number.isInteger(selectedKey)) {
            var Unitshortname = '';

            const selectedUnit = units.find((Unit) => Unit.Unit_id == selectedKey);
            if (selectedUnit) {
                Unitshortname = selectedUnit.Unitshortname
            }
            setMovement((prevMovimentos) => {
                const novosMovimentos = prevMovimentos.map((movimento) => {
                    if (movimento.key === movementKey) {

                        movimento.Unit_id = selectedKey;

                        return {
                            ...movimento,
                            Unit_id: selectedKey
                        };
                    } else {
                        return movimento;
                    }
                });

                setInfo((prevInfo) => {
                    const novoInfo = prevInfo.map((item) => {
                        if (item.key === movementKey) {
                            return {
                                ...item,
                                Unit_id: selectedKey
                            };
                        } else {
                            return item;
                        }
                    });
                    return novoInfo;
                });
                return novosMovimentos;
            });
        }
        else {
            console.error(" onSelectionChangeUnits selectedKey não é um número inteiro válido.");
        }
    };


    const onSelectionChangeTaxes = (movementKey, selectedKey, selectedValue, selectedLabel) => {


        if (!isNaN(selectedKey) && Number.isInteger(selectedKey)) {
            var Taxdescription = '';
            const selectedTaxe = taxes.find((tax) => parseInt(tax.Tax_id, 10) === parseInt(selectedKey, 10));
            if (selectedTaxe) {
                Taxdescription = String(selectedTaxe.Taxrate)
            }

            setMovement((prevMovimentos) => {
                const novosMovimentos = prevMovimentos.map((movimento) => {
                    if (movimento.key === movementKey) {

                        movimento.Tax_id = selectedKey;

                        return {
                            ...movimento,
                            Tax_id: selectedKey
                        };
                    } else {
                        return movimento;
                    }
                });

                setInfo((prevInfo) => {
                    const novoInfo = prevInfo.map((item) => {
                        if (item.key === movementKey) {
                            return {
                                ...item,
                                Tax_id: selectedKey
                            };
                        } else {
                            return item;
                        }
                    });
                    return novoInfo;
                });
                return novosMovimentos;
            });
        }
        else {
            console.error(" onSelectionChangeTaxes selectedKey não é um número inteiro válido.");
        }
    };


    const onSelectionChangeStorage = (movementKey, selectedKey, selectedValue, selectedLabel) => {


        if (!isNaN(selectedKey) && Number.isInteger(selectedKey)) {
            var Storageshortname = '';
            const selectedStorage = storages.find((Storage) => parseInt(Storage.Storage_id, 10) === parseInt(selectedKey, 10));
            if (selectedStorage) {
                Storageshortname = selectedStorage.Storageshortname
            }

            setMovement((prevMovimentos) => {
                const novosMovimentos = prevMovimentos.map((movimento) => {
                    if (movimento.key === movementKey) {

                        movimento.Storage_id = selectedKey;

                        return {
                            ...movimento,
                            Storage_id: selectedKey
                        };
                    } else {
                        return movimento;
                    }
                });

                setInfo((prevInfo) => {
                    const novoInfo = prevInfo.map((item) => {
                        if (item.key === movementKey) {
                            return {
                                ...item,
                                Storage_id: selectedKey
                            };
                        } else {
                            return item;
                        }
                    });
                    return novoInfo;
                });
                return novosMovimentos;
            });
        }
        else {
            console.error(" onSelectionChangeStorage selectedKey não é um número inteiro válido.");
        }
    };


    const onSelectionChange = (infoKey, selectedKey, selectedValue, selectedLabel) => {
        if (!infoKey || !selectedKey) {
            console.error('infoKey or selectedKey is null or undefined.');
            return;
        }

        var Productreference = '';

        var Productname = '';
        var Averageproductprice = 0;
        var Unit_id = 0;
        var Unitshortname = 0;
        var Storage_id = 0;
        var Storageshortname = 0;
        var Tax_id = 0;
        var Taxdescription = 0;





        const selectedProduct = produtos.find((product) => product.Product_id && product.Product_id.toString() === selectedKey.toString().toLowerCase());

        if (selectedProduct) {
            Productname = selectedProduct.Productname;
            Averageproductprice = selectedProduct.Averageproductprice;

            Productreference = selectedProduct.Productreference;
            Unit_id = selectedProduct.Unit_id;
            Unitshortname = selectedProduct.Unitshortname;
            Storage_id = selectedProduct.Storage_id;
            Storageshortname = selectedProduct.Storageshortname;
            Tax_id = selectedProduct.Tax_id;
            Taxdescription = String(selectedProduct.Taxrate);



        } else {
            console.error('Selected product not found.');
        }

        // Atualizar a order
        setInfo((previnfos) => {
            const novasInfo = previnfos.map((info) => {
                if (info.key === infoKey) {
                    const novoValorUnitario = Averageproductprice
                    const novoDefaultUnit = Unit_id
                    const novoProductreference = Productreference
                    const novoDefaultUnitshortname = Unitshortname

                    const novoStorage_id = Storage_id
                    const novoStorageshortname = Storageshortname

                    const novoTax_id = Tax_id
                    const novoTaxdescription = Taxdescription

                    var valorTotal = info.Totalamount
                    var quantidade = info.Quantity

                    handleUpdateValorUnitario(infoKey, novoValorUnitario);
                    handleUpdateDefaultUnit(infoKey, novoDefaultUnit, novoDefaultUnitshortname)
                    handleUpdateDefaultStorage(infoKey, novoStorage_id, novoStorageshortname)
                    handleUpdateDefaultTax(infoKey, novoTax_id, novoTaxdescription)


                    info.Tax_id = novoTax_id;

                    info.Netunitprice1 = novoValorUnitario;

                    valorTotal = parseFloat(calcularTotal(quantidade, novoValorUnitario).toFixed(4));


                    return {
                        ...info,
                        Product_id: selectedKey,
                        Productname: Productname,
                        Productreference: Productreference,
                        Netunitprice1: Averageproductprice,
                        Storage_id: Storage_id,
                        Storageshortname: Storageshortname,
                        Tax_id: Tax_id,

                        Totalamount: valorTotal,

                    };
                } else {
                    return info;
                }
            });
            return novasInfo;
        });
    };

    //--------------inicio atualizar dados asociados ao produto selecionado------------------------//


    const handleUpdateValorUnitario = (infoKey, novoValorUnitario) => {
        // Atualizar o valor unitário no estado
        setInfo((prevInfos) => {
            const novasinfos = prevInfos.map((info) => {
                if (info.key === infoKey) {
                    return {
                        ...info,
                        Netunitprice1: novoValorUnitario,
                    };

                } else {
                    return info;
                }

            });

            return novasinfos;
        });
    };


    const handleUpdateDefaultUnit = (infoKey, novoDefaultUnit, novoDefaultUnitshortname) => {
        // Atualizar o Unidades associado ao produto no estado
        setInfo((prevInfos) => {
            const novasinfos = prevInfos.map((info) => {
                if (info.key === infoKey) {
                    return {
                        ...info,
                        Unit_id: novoDefaultUnit,
                        // Unitshortname: novoDefaultUnitshortname


                        // Unitshortname: item.Unitshortname
                    };
                } else {
                    return info;
                }
            });
            return novasinfos;
        });
    };






    const handleUpdateDefaultTax = (infoKey, novoDefaultTax, novoDefaultTaxdescription) => {
        // Atualizar o Unidades associado ao produto no estado

        setInfo((prevInfos) => {
            const novasinfos = prevInfos.map((info) => {
                if (info.key === infoKey) {
                    info.Tax_id = novoDefaultTax;
                    info.Totalamount = parseFloat(calcularTotal(info.Quantity, info.Netamount).toFixed(4));

                    return {
                        ...info,
                        Tax_id: novoDefaultTax,
                        //  Taxdescription: novoDefaultTaxdescription



                    };
                } else {
                    return info;
                }
            });
            return novasinfos;
        });
    };

    const handleUpdateDefaultStorage = (infoKey, novoStorage_id, novoStorageshortname) => {
        // Atualizar o armazém associado ao produto no estado
        setInfo((prevInfos) => {
            const novasinfos = prevInfos.map((info) => {
                if (info.key === infoKey) {
                    return {
                        ...info,
                        Storage_id: novoStorage_id,
                        Storageshortname: novoStorageshortname,

                    };
                } else {
                    return info;
                }
            });
            return novasinfos;
        });
    };


    //--------------Fim atualizar dados asociados ao produto selecionado------------------------//

    // Função para lidar com a alteração do estado `info`
    function handleInputChange1(key, event) {
        const { name, value } = event.target;

        setInfo(prevInfo => {
            const updatedInfo = prevInfo.map(item => {
                if (item.key === key) {
                    return {
                        ...item,
                        [name]: parseFloat(value) // Garante que o valor seja um número
                    };
                } else {
                    return item;
                }
            });
            return updatedInfo;
        });
    }

    const calcularTotal = (quantidade, valorUnitario) => {
        const quantidadeNumerica = parseFloat(quantidade) || 0;
        const valorUnitarioNumerico = parseFloat(valorUnitario) || 0;
        return quantidadeNumerica * valorUnitarioNumerico;
    };

    const handleInputChange = (key, event) => {
        const { name, value } = event.target;

        setInfo((prevInfo) => {
            return prevInfo.map((info) => {
                if (info.key === key) {
                    const novainfo = { ...info, [name]: value };

                    if (name === 'Quantity') {
                        if (selValorUnitario) {
                            novainfo.Totalamount = parseFloat(calcularTotal(novainfo.Quantity, novainfo.Netunitprice1).toFixed(4));
                        } else {
                            const newNetunitprice1 = parseFloat((novainfo.Totalamount / novainfo.Quantity).toFixed(4));
                            novainfo.Netunitprice1 = newNetunitprice1;
                        }
                    } else if (name === 'Netunitprice1') {
                        novainfo.Totalamount = parseFloat(calcularTotal(novainfo.Quantity, novainfo.Netunitprice1).toFixed(4));
                    }
                    else if (name === 'Totalamount') {
                        const newNetunitprice1 = parseFloat((novainfo.Totalamount / novainfo.Quantity).toFixed(4));
                        novainfo.Netunitprice1 = newNetunitprice1;
                    }

                    return novainfo;
                } else {
                    return info;
                }
            });
        });
    };





    const handleButtonSelClick = () => {

        setSelValorUnitario(prevState => !prevState);
    };

    const topContent = React.useMemo(() => {
        return (
            <>
                <div>
                    <div className="w-full bg-gray-100 h-10 mb-2 flex justify-between">
                        <div className="flex items-center space-x-2 ml-1">
                            <Button
                                className="h-4 w-34 gray text-xs     bg-gray-400"
                                variant="light"
                            >
                                Atualiza qt. existências
                            </Button>

                            <Button
                                onClick={handleButtonSelClick}
                                className={selValorUnitario ? 'bg-blue-500 text-white h-4 w-32 text-xs' : 'bg-gray-400 text-black h-4 w-32 text-xs'}
                                variant="light"
                            >
                                Valor Unitário
                            </Button>



                            <Button
                                className="h-4 w-34 gray text-xs  bg-gray-400"
                                variant="light"
                            >
                                IVA Incluído
                            </Button>

                            <Button
                                className="h-4 w-34 gray text-xs   bg-gray-400"
                                variant="light"
                            >
                                Desconto Automático
                            </Button>

                            <Button
                                isIconOnly
                                className="h-4 w-6   bg-gray-400"
                                variant="light"
                            >
                                <IoIosArrowDown />
                            </Button>
                        </div>

                        <div className="flex space-x-2 ">
                            <Button
                                isIconOnly
                                variant="light"
                            >
                                <div style={{ fontSize: '24px' }}>
                                    <GoPaperAirplane />
                                </div>


                            </Button>

                            <Button
                                isIconOnly
                                variant="light"
                            >
                                <div style={{ fontSize: '24px' }}>
                                    <FiPrinter />
                                </div>
                            </Button>
                        </div>

                    </div>

                    <Header
                        movementDate={movementDate}
                        setMovementDate={setMovementDate}
                        movementDateDoc={movementDateDoc}
                        setMovementDateDoc={setmovementDateDoc}
                        movementDateVenc={movementDateVenc}
                        setMovementDateVenc={setmovementDateVenc}
                        suppliers={suppliers}
                        supplierId={supplierId}
                        setSupplierId={setSupplierId}
                        supplierName={supplierName}
                        setSupplierName={setSupplierName}
                        Documentnumber={Documentnumber}
                        setDocumentnumber={setDocumentnumber}
                        lista={lista}
                    />
                </div>
            </>
        );
    }, [movementDate, movementDateDoc, movementDateVenc, supplierName, supplierId, suppliers, Documentnumber, lista, handleButtonSelClick, selValorUnitario])


    const getDescricaoFromStorageId = (storageId) => {

        const storage = storages.find(storage => storage.Storage_id === storageId);

        return storage ? storage.Storageshortname : ''; // Assumindo que a descrição está em um campo 'descricao'


    };

    const getDescricaoFromTaxid = (taxid) => {

        const taxe = taxes.find(taxe => taxe.Tax_id === taxid);

        return taxe ? String(taxe.Taxrate) : ''; // Assumindo que a descrição está em um campo 'descricao'


    };

    const getDescricaoFromUnitid = (unitid) => {

        const unit = units.find(unit => unit.Unit_id === unitid);

        return unit ? String(unit.Unitshortname) : ''; // Assumindo que a descrição está em um campo 'descricao'


    };

    const removerLinha = (key) => {


        // Confirmar antes de remover a linha
        const confirmRemoval = window.confirm("Tem a certeza que deseja remover a linha?");

        if (!confirmRemoval) {
            // Se o usuário cancelar, não faz nada
            return;
        }

        setInfo((prevInfos) => prevInfos.filter((info) => info.key !== key));

        lista.Lines = lista.Lines.filter((line) => line.Line_id !== key);

        // Se o array de orders ficar vazio após a remoção, adiciona uma nova linha
        if (info.length === 1) {
            adicionarLinha();
        }


    }

    // const GravaMovement = async () => {

    //     const confirmUpdate = window.confirm("Tem certeza de que deseja gravar o Movimento?");
    //     if (!confirmUpdate) {
    //         return;
    //     }

    //     if (info.length === 0) {
    //         alert("O movimento deve conter pelo menos uma linha.");
    //         return;
    //     }
    //     else {
    //         // Verificar se todas as linhas da encomenda têm valores válidos
    //         for (const linha of info) {
    //             if (linha.Storage_id <= 0 || linha.Unit_id <= 0 || linha.Productid <= 0) {
    //                 alert('Por favor, preencha todas as informações válidas nas linhas.');
    //                 return;
    //             }
    //         }




    //         // setIsLoading(true);
    //         calculateTotals();
    //         const updatedMovimento = { ...lista };


    //         // // Atualizar as datas no objeto updatedMovimento

    //         const formattedmovementDate = formatDate(movementDate)
    //         const formattedmovementDateDoc = formatDate(movementDateDoc)
    //         const formattedmovementDateVenc = formatDate(movementDateVenc)

    //         updatedMovimento.Supplier_id = supplierId;
    //         updatedMovimento.Date = formattedmovementDate;
    //         updatedMovimento.Datede = formattedmovementDateDoc;
    //         updatedMovimento.Duedate = formattedmovementDateVenc;
    //         updatedMovimento.Login = nomeuser;


    //         const selectedSupplier = suppliers.find((supplier) => supplier.Supplier_id == supplierId);
    //         if (selectedSupplier) {
    //             updatedMovimento.Entitydescription = selectedSupplier.Name;


    //         }






    //         // // Atualizar ou adicionar novas linhas
    //         updatedMovimento.Lines = info.map((infoItem) => {
    //             const existingLine = updatedMovimento.Lines.find((line) => line.Line_id === infoItem.Line_id);

    //             var Taxrate = 0

    //             if (existingLine) {


    //                 const selectedTax = taxes.find((tax) => tax.Tax_id == infoItem.Tax_id);
    //                 const totalAmount = (infoItem.Quantity * infoItem.Netunitprice1);




    //                 if (selectedTax) {

    //                     Taxrate = selectedTax.Taxrate;
    //                 } else {

    //                     console.error("Taxa não encontrada para o ID:", infoItem.Tax_id);

    //                     Taxrate = 0; // ou qualquer valor padrão desejado
    //                 }
    //                 return {
    //                     ...existingLine,


    //                     Quantity: parseFloat(infoItem.Quantity),
    //                     Netunitprice1: parseFloat(infoItem.Netunitprice1),
    //                     Netamount: parseFloat(infoItem.Netamount),
    //                     Product_id: parseInt(infoItem.Product_id),
    //                     Productname: infoItem.Productname,
    //                     Productreference: infoItem.Productreference,
    //                     Storage_id: infoItem.Storage_id,
    //                     Storageshortname: infoItem.Storageshortname,
    //                     Unit_id: infoItem.Unit_id,
    //                     Unitshortname: infoItem.Unitshortname,
    //                     Tax_id: infoItem.Tax_id,

    //                     Totalamount: totalAmount,

    //                     //   Taxdescription: String(orderItem.Taxdescription),
    //                     Taxrate: Taxrate,

    //                 };
    //             } else {
    //                 // Adicionar nova linha
    //                 const totalAmount = (infoItem.Quantity * infoItem.Netunitprice1);
    //                 return {
    //                     Movement_id: updatedMovimento.Movement_id,
    //                     Line_id: infoItem.Line_id,
    //                     Quantity: parseFloat(infoItem.Quantity),
    //                     Netunitprice1: parseFloat(infoItem.Netunitprice1),
    //                     Netamount: parseFloat(infoItem.Netamount),
    //                     Product_id: parseInt(infoItem.Product_id),
    //                     Productname: infoItem.Productname,
    //                     Productreference: infoItem.Productreference,
    //                     Storage_id: infoItem.Storage_id,
    //                     Storageshortname: infoItem.Storageshortname,
    //                     Unit_id: infoItem.Unit_id,
    //                     Unitshortname: infoItem.Unitshortname,
    //                     Tax_id: infoItem.Tax_id,

    //                     Totalamount: totalAmount,
    //                     //   Taxdescription: String(orderItem.Taxdescription),
    //                     Taxrate: Taxrate,
    //                 };
    //             }
    //         });


    //         // // Remover linhas que não existem mais em "order"
    //         updatedMovimento.Lines = updatedMovimento.Lines.filter((line) =>
    //             info.some((infoItem) => infoItem.Line_id === line.Line_id)
    //         );

    //         const numLinhas = updatedMovimento.Lines.length;
    //         const confirmGravacao = window.confirm(`Você está prestes a gravar ${numLinhas} linhas. Deseja continuar?`);
    //         if (!confirmGravacao) {
    //             return;
    //         }
    //         try {

    //             const response = await axios.post(`/api/movements/movement/`, {
    //                 info: { ...updatedMovimento },
    //             });


    //             if (response.data.result && response.data.result.length > 0 && response.data.result[0].Resultoperation === true) {

    //                 notify();
    //                 setMovement(0);
    //                 setIsLoading(false);
    //                 onOpenChange();


    //             } else {

    //                 toast.error(response.data.result[0].Response);

    //             }
    //         } catch (error) {
    //             console.error(error);
    //             alert(error)

    //             setIsLoading(false);
    //         }
    //     }
    // };



    const GravaMovement = async () => {
        alert(supplierId)
        const confirmUpdate = window.confirm("Tem certeza de que deseja gravar o Movimento?");
        if (!confirmUpdate) {
            return;
        }

        if (info.length === 0) {
            alert("O movimento deve conter pelo menos uma linha.");
            return;
        }

        // Verificar se todas as linhas da encomenda têm valores válidos
        for (const linha of info) {
            if (linha.Storage_id <= 0 || linha.Unit_id <= 0 || linha.Productid <= 0) {
                alert('Por favor, preencha todas as informações válidas nas linhas.');
                return;
            }
        }

        // Calcular totais antes de enviar
        calculateTotals();
        const updatedMovimento = { ...lista };

        // Atualizar as datas no objeto updatedMovimento
        const formattedmovementDate = formatDate(movementDate);
        const formattedmovementDateDoc = formatDate(movementDateDoc);
        const formattedmovementDateVenc = formatDate(movementDateVenc);

        updatedMovimento.Identity_id = supplierId;
        updatedMovimento.Date = formattedmovementDate;
        updatedMovimento.Datede = formattedmovementDateDoc;
        updatedMovimento.Duedate = formattedmovementDateVenc;
        updatedMovimento.Login = nomeuser;

        const selectedSupplier = suppliers.find((supplier) => supplier.Supplier_id == supplierId);
        if (selectedSupplier) {
            updatedMovimento.Entitydescription = selectedSupplier.Name;
        }

        // Atualizar ou adicionar novas linhas
        updatedMovimento.Lines = info.map((infoItem) => {
            const existingLine = updatedMovimento.Lines.find((line) => line.Line_id === infoItem.Line_id);

            var Taxrate = 0;

            if (existingLine) {
                const selectedTax = taxes.find((tax) => tax.Tax_id == infoItem.Tax_id);
                const totalAmount = (infoItem.Quantity * infoItem.Netunitprice1);

                if (selectedTax) {
                    Taxrate = selectedTax.Taxrate;
                } else {
                    console.error("Taxa não encontrada para o ID:", infoItem.Tax_id);
                    Taxrate = 0; // ou qualquer valor padrão desejado
                }

                return {
                    ...existingLine,
                    Quantity: parseFloat(infoItem.Quantity),
                    Netunitprice1: parseFloat(infoItem.Netunitprice1),
                    Netamount: parseFloat(infoItem.Netamount),
                    Product_id: parseInt(infoItem.Product_id),
                    Productname: infoItem.Productname,
                    Productreference: infoItem.Productreference,
                    Storage_id: infoItem.Storage_id,
                    Storageshortname: infoItem.Storageshortname,
                    Unit_id: infoItem.Unit_id,
                    Unitshortname: infoItem.Unitshortname,
                    Tax_id: infoItem.Tax_id,
                    Totalamount: totalAmount,
                    Taxrate: Taxrate,
                };
            } else {
                // Adicionar nova linha
                const totalAmount = (infoItem.Quantity * infoItem.Netunitprice1);
                return {
                    Movement_id: updatedMovimento.Movement_id,
                    Line_id: infoItem.Line_id,
                    Quantity: parseFloat(infoItem.Quantity),
                    Netunitprice1: parseFloat(infoItem.Netunitprice1),
                    Netamount: parseFloat(infoItem.Netamount),
                    Product_id: parseInt(infoItem.Product_id),
                    Productname: infoItem.Productname,
                    Productreference: infoItem.Productreference,
                    Storage_id: infoItem.Storage_id,
                    Storageshortname: infoItem.Storageshortname,
                    Unit_id: infoItem.Unit_id,
                    Unitshortname: infoItem.Unitshortname,
                    Tax_id: infoItem.Tax_id,
                    Totalamount: totalAmount,
                    Taxrate: Taxrate,
                };
            }
        });

        // Remover linhas que não existem mais em "order"
        updatedMovimento.Lines = updatedMovimento.Lines.filter((line) =>
            info.some((infoItem) => infoItem.Line_id === line.Line_id)
        );

        const numLinhas = updatedMovimento.Lines.length;
        const confirmGravacao = window.confirm(`Você está prestes a gravar ${numLinhas} linhas. Deseja continuar?`);
        if (!confirmGravacao) {
            return;
        }

        try {
            if (updatedMovimento.Movement_id <= 0) {
                // Se Movement for menor ou igual a 0, faça uma requisição PUT
                const response = await axios.put(`/api/movements/movement/`, {
                    info: { ...updatedMovimento },
                });

                if (response.data.result && response.data.result.length > 0 && response.data.result[0].Resultoperation === true) {
                    notify();
                    setMovement(0);
                    setIsLoading(false);
                    onOpenChange();
                } else {
                    toast.error(response.data.result[0].Response);
                }
            } else {
                // Caso contrário, faça uma requisição POST
                const response = await axios.post(`/api/movements/movement/`, {
                    info: { ...updatedMovimento },
                });

                if (response.data.result && response.data.result.length > 0 && response.data.result[0].Resultoperation === true) {
                    notify();
                    setMovement(0);
                    setIsLoading(false);
                    onOpenChange();
                } else {
                    toast.error(response.data.result[0].Response);
                }
            }
        } catch (error) {
            console.error(error);
            alert(error)
            setIsLoading(false);
        }
    };



    const toggleMaximized = () => {
        setIsMaximized(!isMaximized);
    };

    return (
        <>
            <>

                <Modal
                    isDismissable={false}
                    scrollBehavior="inside"
                    size="full"
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    closeButtonProps={{ color: 'red' }}
                    backdrop="transparent"
                    classNames={{
                        base: "max-h-screen overflow-hidden",
                        wrapper: isMaximized ? "fixed inset-0 z-50 overflow-y-auto lg:pl-100 h-screen w-full" : "lg:pl-72 h-screen w-full",
                        body: "h-full"
                    }}
                >




                    <ModalContent>



                        {(onClose) => {

                            return (
                                <>

                                    <ModalHeader
                                        className="bg-primary-600 h-15"
                                    >
                                        <div className="w-full flex justify-between mr-4">


                                            <p className="text-white flex items-center space-x-2">

                                                <div>{tipoMovimento}</div>
                                                <div><FaArrowRight /></div>
                                                <div>ID:</div>
                                                {movement !== -1 && <div>{movement}</div>}
                                                {movement !== -1 && <div className="text-white">{Number(estado) === 0 ? "[pendente]" : "[concluído]"}</div>}
                                            </p>


                                            {/* <p className="text-white flex items-center space-x-2"> <div>{tipoMovimento}</div> <div><FaArrowRight /></div> <div>ID: {movement}</div>  <div className="text-white">{state == 0 ? "[pendente]" : "[concluído]"}</div> </p> */}
                                            <div className="flex space-x-2">
                                                <Button
                                                    isIconOnly
                                                    variant="light"
                                                    className="text-white"
                                                    onPress={() => GravaMovement()}
                                                >
                                                    <TfiSave size={25} />
                                                </Button>

                                                {/* Conteúdo do seu modal */}
                                                <Tooltip label={isMaximized ? 'Restaurar' : 'Maximizar'}>
                                                    <Button
                                                        isIconOnly
                                                        variant="light"
                                                        className="text-white"
                                                        onClick={toggleMaximized}
                                                    >


                                                        {isMaximized ? <AiOutlineCompress size={27} /> : <AiOutlineExpand size={27} />}
                                                    </Button>
                                                </Tooltip>




                                                <Button
                                                    isIconOnly
                                                    variant="light"
                                                    className="text-white"
                                                    onClick={() => {
                                                        onClose();
                                                    }}
                                                >
                                                    <RxExit size={27} />
                                                </Button>
                                            </div>
                                        </div>

                                    </ModalHeader>
                                    <ModalBody>

                                        <Table
                                            topContent={topContent}
                                            removeWrapper
                                            classNames={{
                                                ...tableClassNamesEditorMovimentos
                                            }}

                                        >

                                            <TableHeader

                                            >


                                                <TableColumn style={{ width: '0.5%' }}>

                                                    <Button size={'sm'} onPress={handleAddButtonClick} variant="light" className="px-1 py-2">
                                                        <MdPlaylistAdd size={25} onPress={handleAddButtonClick} />
                                                    </Button>
                                                </TableColumn>

                                                {/* <TableColumn style={{ width: '2%' }}>+</TableColumn> */}


                                                <TableColumn style={{ width: '1%' }}>{'Cod.'.toUpperCase()}</TableColumn>
                                                <TableColumn style={{ width: '20%' }}>{'Produto'.toUpperCase()}</TableColumn>
                                                <TableColumn style={{ width: '5%' }}>{'Ref.'.toUpperCase()}</TableColumn>
                                                <TableColumn style={{ width: '10%' }}>{'Armazém'.toUpperCase()}</TableColumn>
                                                <TableColumn style={{ width: '1%' }}>{'Quantidade'.toUpperCase()}</TableColumn>
                                                <TableColumn style={{ width: '7%' }}>{'Unidade'.toUpperCase()}</TableColumn>

                                                <TableColumn style={{ width: '5%' }}>{'Valor Unit.'.toUpperCase()}</TableColumn>
                                                <TableColumn style={{ width: '8%', textAlign: 'center' }}>{'IVA'.toUpperCase()}</TableColumn>
                                                <TableColumn style={{ width: '5%' }}>{'Desconto'.toUpperCase()}</TableColumn>
                                                <TableColumn style={{ width: '5%' }}>{'Valor Total'.toUpperCase()}</TableColumn>

                                                <TableColumn style={{ width: '2%' }}><BiCog size={20} /></TableColumn>

                                            </TableHeader>

                                            <TableBody>

                                                {info.map((item) => {

                                                    return (
                                                        <TableRow key={item.key}>
                                                            <TableCell className="text-center">
                                                                <button type="button" onClick={adicionarLinha} className="font-bold">
                                                                    +
                                                                </button>
                                                            </TableCell>
                                                            <TableCell>

                                                                {item.Product_id}


                                                            </TableCell>


                                                            <TableCell>
                                                                <Autocomplete

                                                                    variant="underlined"
                                                                    allowsCustomValue
                                                                    defaultInputValue={item.Productname}
                                                                    defaultSelectedKey={item.Product_id}
                                                                    value={item.Productname}
                                                                    key={item.Product_id}
                                                                    textvalue={item.Productname}
                                                                    onSelectionChange={(key, value, textvalue) =>
                                                                        onSelectionChange(item.key, key, value, textvalue)
                                                                    }
                                                                    onInputChange={(value) => onInputChangeSelect(item.key, value)}
                                                                >
                                                                    {filteredProdutos[item.key] ? (
                                                                        filteredProdutos[item.key].map((produto) => (
                                                                            <AutocompleteItem
                                                                                key={produto.Product_id}
                                                                                value={produto.Productname}
                                                                                textvalue={produto.Productname}

                                                                            >

                                                                                {produto.Productname}
                                                                            </AutocompleteItem>
                                                                        ))
                                                                    ) : (
                                                                        <AutocompleteItem value="" textvalue="">
                                                                            Sem dados disponíveis
                                                                        </AutocompleteItem>
                                                                    )}
                                                                </Autocomplete>
                                                            </TableCell>

                                                            <TableCell>

                                                            </TableCell>
                                                            <TableCell>

                                                                <Autocomplete

                                                                    variant="underlined"
                                                                    allowsCustomValue
                                                                    defaultInputValue={getDescricaoFromStorageId(item.Storage_id)}
                                                                    defaultSelectedKey={item.Unit_id}
                                                                    value={getDescricaoFromStorageId(item.Storage_id)}
                                                                    key={item.Storage_id}
                                                                    //textvalue={item.Storageshortname}
                                                                    textvalue={getDescricaoFromStorageId(item.Storage_id)}
                                                                    onSelectionChange={(key, value, textvalue) =>

                                                                        onSelectionChangeStorage(item.key, parseInt(key), value, textvalue)
                                                                    }
                                                                >
                                                                    {storages.map((Storage) => (
                                                                        <AutocompleteItem key={Storage.Storage_id} value={Storage.Storageshortname}>
                                                                            {Storage.Storageshortname}
                                                                        </AutocompleteItem>
                                                                    ))}
                                                                </Autocomplete>
                                                            </TableCell>


                                                            <TableCell>
                                                                <Input
                                                                    variant="underlined"
                                                                    type="number"
                                                                    name="Quantity"
                                                                    value={typeof item.Quantity === 'number' ? item.Quantity.toFixed(4) : item.Quantity}
                                                                    //onChange={(event) => handleInputChangeDebounced(item.key, event)} // Use `handleInputChangeDebounced` aqui
                                                                    onChange={(event) => handleInputChange(item.key, event)}
                                                                    style={{ textAlign: 'right' }}  // Alinha o texto à direita
                                                                />
                                                            </TableCell>


                                                            <TableCell>
                                                                {units && units.length > 0 ? (
                                                                    <Autocomplete
                                                                        variant="underlined"
                                                                        allowsCustomValue
                                                                        defaultInputValue={getDescricaoFromUnitid(item.Unit_id)}
                                                                        defaultSelectedKey={item.Unit_id}
                                                                        defaultKey={item.Unit_id}
                                                                        value={getDescricaoFromUnitid(item.Unit_id)}
                                                                        key={item.Tax_id}
                                                                        textvalue={getDescricaoFromUnitid(item.Unit_id)}
                                                                        onSelectionChange={(key, value, textvalue) =>
                                                                            onSelectionChangeUnits(item.key, parseInt(key), value, textvalue)
                                                                        }
                                                                    >
                                                                        {units.map((Unit) => (
                                                                            <AutocompleteItem key={Unit.Unit_id} value={Unit.Unitshortname}  >
                                                                                {Unit.Unitshortname}
                                                                            </AutocompleteItem>
                                                                        ))}
                                                                    </Autocomplete>
                                                                ) : (
                                                                    <p>No Units available</p>
                                                                )}
                                                            </TableCell>





                                                            <TableCell>
                                                                <Input
                                                                    readOnly={!selValorUnitario}
                                                                    variant="underlined"
                                                                    type="number"
                                                                    name="Netunitprice1"

                                                                    value={typeof item.Netunitprice1 === 'number' ? item.Netunitprice1.toFixed(4) : item.Netunitprice1}
                                                                    onChange={(event) => handleInputChange(item.key, event)}
                                                                    style={{ textAlign: 'right' }}  // Alinha o texto à direita
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                {taxes && taxes.length > 0 ? (
                                                                    <Autocomplete
                                                                        variant="underlined"
                                                                        allowsCustomValue
                                                                        defaultInputValue={getDescricaoFromTaxid(item.Tax_id)}
                                                                        defaultSelectedKey={item.Tax_id}
                                                                        defaultKey={item.Tax_id}
                                                                        value={getDescricaoFromTaxid(item.Tax_id)}
                                                                        key={item.Tax_id}
                                                                        textvalue={getDescricaoFromTaxid(item.Tax_id)}
                                                                        onSelectionChange={(key, value, textvalue) =>
                                                                            onSelectionChangeTaxes(item.key, parseInt(key), value, textvalue)
                                                                        }
                                                                    >
                                                                        {taxes.map((Tax) => (
                                                                            <AutocompleteItem key={Tax.Tax_id} value={Tax.Taxrate}>
                                                                                {Tax.Taxrate}
                                                                            </AutocompleteItem>
                                                                        ))}
                                                                    </Autocomplete>
                                                                ) : (
                                                                    <p>No taxes available</p>
                                                                )}
                                                            </TableCell>

                                                            <TableCell></TableCell>
                                                            <TableCell>
                                                                <Input
                                                                    readOnly={selValorUnitario}
                                                                    variant="underlined"
                                                                    type="number"
                                                                    name="Totalamount"
                                                                    value={typeof item.Totalamount === 'number' ? item.Totalamount.toFixed(4) : item.Totalamount}
                                                                    onChange={(event) => handleInputChange(item.key, event)}
                                                                    style={{ textAlign: 'right' }}  // Alinha o texto à direita
                                                                />
                                                            </TableCell>

                                                            <TableCell>
                                                                <button type="button" onClick={() => removerLinha(item.key)}>
                                                                    < FaRegTrashAlt size={15} />
                                                                </button>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>

                                        </Table>

                                    </ModalBody>
                                    <ModalFooter
                                        className="bg-gray-400 h-30"
                                    >
                                        <div className="bg-white w-full h-auto px-4 py-2 flex justify-end items-center">
                                            <div className="flex flex-col items-end mr-7">
                                                <div className="text-xs mb-2 text-gray-400">Incidência</div>
                                                <div className="flex items-center">
                                                    <div className=" text-xl text-primary-700">{formatCurrency(valorIncidencia, 2)}</div>
                                                    <div className=" text-xl text-primary-700 ml-1">€</div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end mr-7">
                                                <div className="text-xs mb-2 text-gray-400 ">Total IVA</div>
                                                <div className="flex items-center">
                                                    <div className="text-xl text-primary-700">{formatCurrency(totalIva, 2)}</div>
                                                    <div className=" text-xl text-primary-700  ml-1">€</div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end">
                                                <div className="text-xs mb-2 text-gray-400">Total</div>
                                                <div className="flex items-center">
                                                    <div className=" text-xl text-primary-700">{formatCurrency(total, 2)}</div>
                                                    <div className="text-xl text-primary-700 ml-1">€</div>
                                                </div>
                                            </div>
                                        </div>

                                    </ModalFooter>
                                </>
                            );

                        }}
                    </ModalContent>
                </Modal>
            </>
        </>
    );
}



