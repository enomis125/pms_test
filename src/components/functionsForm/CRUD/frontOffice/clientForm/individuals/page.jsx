"use client"
import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function individualsInsert() {

     //inserção na tabela client preference
    const [individual, setIndividual] = useState({
        FirstName: '',
        LastName: '',
        Address: '',
        ZipCode: '',
        PersonalEmail: '',
        WorkEmail: ''
        Region: '',
        Country: '',
        Birthday: '',
        BirthTown: '',
        CC: ''
    })

    const handleInputIndividual = (event) => {
        setIndividual({ ...individual, [event.target.name]: event.target.value })
    }
    async function handleSubmiIndividual(event) {
        event.preventDefault()
      
        if (!individual.FirstName || !individual.LastName || !individual.Address || !individual.ZipCode || !individual.Region || !individual.Birthday || !individual.BirthTown || !individual.CC || !individual.PersonalEmail || !individual.WorkEmail ) {
            alert("Preencha os campos corretamente");
            return;
        }
      
      try {
            // Envio da solicitação para criar os emails
            const emailCreationInfo = await axios.put('/api/v1/frontOffice/clientForm/individuals/email', {
                data: {
                    personalEmail: individual.PersonalEmail,
                    professionalEmail: individual.WorkEmail,
                }
            });
            const guestEmailsID = await emailCreationInfo.data.newRecord.guestEmailsID.toString();

            // Envio da solicitação para criar o indivíduo
            const response = await axios.put('/api/v1/frontOffice/clientForm/individuals', {
                data: {
                firstName: individual.FirstName,
                secondName: individual.LastName,
                country: individual.Address,
                zipCode: individual.ZipCode,
                region: individual.Region,
                //countryAddress: individual.Country,
                birthday: individual.Birthday,
                birthTown: individual.BirthTown,
                cc: individual.CC
                email: guestEmailsID
                }
            });
            console.log(response); // Exibe a resposta do servidor no console
        } catch (error) {
            console.error('Erro ao enviar requisições:', error);
        }
      
    }
    return { 
        handleInputIndividual, handleSubmiIndividual
    };
}

export function individualsEdit(idIndividual) {
    //edição na tabela client preference
    const [valuesIndividual, setValuesIndividual] = useState({
        id: idIndividual,
        FirstName: '',
        LastName: '',
        Address: '',
        ZipCode: '',
        Region: '',
        Birthday: '',
        BirthTown: '',
        CC: ''
    })

    useEffect(() => {
        axios.get("/api/v1/frontOffice/clientForm/individuals/" + idIndividual)
            .then(res => {
                const formattedBirthday = new Date(res.data.response.birthday).toLocaleDateString();

                setValuesIndividual({ ...valuesIndividual, 
                    FirstName: res.data.response.firstName, 
                    LastName: res.data.response.secondName, 
                    Address: res.data.response.country, 
                    ZipCode: res.data.response.zipCode,
                    Region: res.data.response.region,
                    Birthday: formattedBirthday,
                    BirthTown: res.data.response.birthTown,
                    CC: res.data.response.cc
                })
            })
            .catch(err => console.log(err))
    }, [])

    function handleUpdateIndividual(e) {
        e.preventDefault()
        axios.patch(`/api/v1/frontOffice/clientForm/individuals/` + idIndividual, {
            data: {
                firstName: valuesIndividual.FirstName,
                secondName: valuesIndividual.LastName,
                country: valuesIndividual.Address,
                zipCode: valuesIndividual.ZipCode,
                region: valuesIndividual.Region,
                birthday: valuesIndividual.Birthday,
                birthTown: valuesIndividual.BirthTown,
                cc: valuesIndividual.CC
            }
        })
            .catch(err => console.log(err))
    }

    return { 
        handleUpdateIndividual, setValuesIndividual, valuesIndividual 
    };
}