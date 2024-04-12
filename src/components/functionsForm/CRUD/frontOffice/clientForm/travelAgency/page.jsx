"use client"
import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function agencyInsert() {

    //inserção na tabela client preference
    const [agency, setAgency] = useState({
        emailContact1: '',
        emailContact2: '',
        name: '',
        abreviature: '',
        url: ''
    })

    const handleInputAgency = (event) => {
        setAgency({ ...agency, [event.target.name]: event.target.value })
    }
    async function handleSubmiAgency(event) {
        event.preventDefault()

        if (!agency.name || !agency.abreviature || !agency.url) {
            alert("Preencha os campos corretamente");
            return;
        }

        try {
            // Envio da solicitação para criar os emails
            /*const emailCreationInfo = await axios.put('/api/v1/frontOffice/clientForm/individuals/email', {
                data: {
                    personalEmail: individual.PersonalEmail,
                    professionalEmail: individual.WorkEmail,
                }
            });
            const guestEmailsID = await emailCreationInfo.data.newRecord.guestEmailsID.toString();*/


            // Envio da solicitação para criar o indivíduo
            const response = await axios.put('/api/v1/frontOffice/clientForm/travelAgency', {
                data: {
                    name: agency.name,
                    shortName: agency.abreviature,
                    websiteURL: agency.url
                }
            });
            console.log(response); // Exibe a resposta do servidor no console
        } catch (error) {
            console.error('Erro ao enviar requisições:', error);
        }

    }
    return {
        handleInputAgency, handleSubmiAgency
    };
}

export function agencyEdit(idIndividual) {
    //edição na tabela client preference
    const [valuesAgency, setValuesAgency] = useState({
        id: idIndividual,
        name: '',
        abreviature: '',
        url: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Envio da solicitação para obter os dados do indivíduo
                const agencyResponse = await axios.get("/api/v1/frontOffice/clientForm/travelAgency/" + idIndividual);

                setValuesAgency({
                    ...valuesAgency,
                    name: agencyResponse.data.response.name,
                    abreviature: agencyResponse.data.response.shortName,
                    url: agencyResponse.data.response.websiteURL,
                });

                console.log(agencyResponse); // Exibe as respostas do servidor no console
            } catch (error) {
                console.error('Erro ao enviar requisições:', error);
            }
        };

        fetchData();
    }, [idIndividual]);


    function handleUpdateTravelAgency(e) {
        e.preventDefault()
        axios.patch(`/api/v1/frontOffice/clientForm/travelAgency/` + idIndividual, {
            data: {
                name: valuesAgency.name,
                shortName: valuesAgency.abreviature,
                websiteURL: valuesAgency.url,
            }
        })

            .catch(err => console.log(err))

    }

    return {
        handleUpdateTravelAgency, setValuesAgency, valuesAgency
    };
}
