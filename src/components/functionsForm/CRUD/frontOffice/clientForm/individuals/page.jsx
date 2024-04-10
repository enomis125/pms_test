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
        WorkEmail: '',
        PersonalPhone: '',
        WorkPhone: '',
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
      
        if (!individual.FirstName || !individual.LastName || !individual.Address || !individual.ZipCode || !individual.Region || !individual.Birthday || !individual.BirthTown || !individual.CC || !individual.PersonalEmail || !individual.WorkEmail || !individual.PersonalPhone || !individual.WorkPhone ) {
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


            const phoneCreationInfo = await axios.put('/api/v1/frontOffice/clientForm/individuals/phone', {
                data: {
                    personalPhone: individual.PersonalPhone,
                    professionalPhone: individual.WorkPhone,
                }
            });
            const guestPhoneID = await phoneCreationInfo.data.newRecord.guestPhoneID.toString();

            
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
                cc: individual.CC,
                email: guestEmailsID,
                phoneNumber: guestPhoneID
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

export function individualsEdit(idIndividual, idEmail) {
    //edição na tabela client preference
    const [valuesIndividual, setValuesIndividual] = useState({
        id: idIndividual,
        emailID: idEmail,
        FirstName: '',
        LastName: '',
        Address: '',
        ZipCode: '',
        Region: '',
        Birthday: '',
        BirthTown: '',
        CC: ''
    })
    const [valuesEmail, setValuesEmail] = useState({
        PersonalEmail: '',
        WorkEmail: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Envio da solicitação para obter os dados do indivíduo
                const individualResponse = await axios.get("/api/v1/frontOffice/clientForm/individuals/" + idIndividual);
                const formattedBirthday = new Date(individualResponse.data.response.birthday).toLocaleDateString();
    
                setValuesIndividual({ 
                    ...valuesIndividual, 
                    FirstName: individualResponse.data.response.firstName, 
                    LastName: individualResponse.data.response.secondName, 
                    Address: individualResponse.data.response.country, 
                    ZipCode: individualResponse.data.response.zipCode,
                    Region: individualResponse.data.response.region,
                    Birthday: formattedBirthday,
                    BirthTown: individualResponse.data.response.birthTown,
                    CC: individualResponse.data.response.cc,
                });
    
                // Envio da solicitação para obter os dados de email
                const emailResponse = await axios.get("/api/v1/frontOffice/clientForm/individuals/email/" + idEmail);
                setValuesEmail({ 
                    ...valuesEmail, 
                    PersonalEmail: emailResponse.data.response.personalEmail,
                    WorkEmail: emailResponse.data.response.professionalEmail
                });
    
                console.log(individualResponse, emailResponse); // Exibe as respostas do servidor no console
            } catch (error) {
                console.error('Erro ao enviar requisições:', error);
            }
        };
    
        fetchData();
    }, [idIndividual, idEmail]);


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
        });

        axios.patch(`/api/v1/frontOffice/clientForm/individuals/email/` + idEmail, {
            data: {
                personalEmail: valuesEmail.PersonalEmail,
                professionalEmail: valuesEmail.WorkEmail,
            }
        })
            .catch(err => console.log(err))

    }

    return { 
        handleUpdateIndividual, setValuesIndividual, valuesIndividual, setValuesEmail, valuesEmail
    };
}
