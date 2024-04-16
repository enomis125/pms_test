"use client"
import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function reservationInsert() {

    //inserção na tabela client preference
    const [reservation, setReservation] = useState({
        CheckIn: '',
        CheckOut: ''
    })

    const handleInputReservation = (event) => {
        setReservation({ ...reservation, [event.target.name]: event.target.value })
    }
    async function handleSubmitReservation(event) {
        event.preventDefault()

        if (!reservation.CheckIn || !reservation.CheckOut) {
            alert("Preencha os campos corretamente");
            return;
        }

        try {
            // Envio da solicitação para criar o indivíduo
            const response = await axios.put('/api/v1/frontOffice/reservations', {
                data: {
                    checkInDate: reservation.CheckIn,
                    checkOutDate: reservation.CheckOut,
                }
            });
            //console.log(response); // Exibe a resposta do servidor no console
        } catch (error) {
            console.error('Erro ao enviar requisições:', error);
        }

    }
    return {
        handleInputReservation, handleSubmitReservation
    };
}

export function reservationEdit(idReservation) {
    //edição na tabela client preference
    const [valuesReserve, setValuesReserve] = useState({
        id: idReservation,
        CheckIn: '',
        CheckOut: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Envio da solicitação para obter os dados do indivíduo
                const reserveResponse = await axios.get("/api/v1/frontOffice/reservations/" + idReservation);
                const CheckIn = new Date(reserveResponse.data.response.checkInDate).toLocaleDateString();
                const CheckOut = new Date(reserveResponse.data.response.checkOutDate).toLocaleDateString();

                setValuesReserve({
                    ...valuesReserve,
                    CheckIn: CheckIn,
                    CheckOut: CheckOut,
                });

                //console.log(reserveResponse); // Exibe as respostas do servidor no console
            } catch (error) {
                console.error('Erro ao enviar requisições:', error);
            }
        };

        fetchData();
    }, [idReservation]);


    function handleUpdateReservation(e) {
        e.preventDefault()
        axios.patch(`/api/v1/frontOffice/reservations/` + idReservation, {
            data: {
                checkInDate: valuesReserve.CheckIn,
                checkOutDate: valuesReserve.CheckOut,
            }
        })
            .catch(err => console.log(err))


    }

    return {
        handleUpdateReservation, setValuesReserve, valuesReserve
    };
}
