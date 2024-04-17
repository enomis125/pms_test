"use client"
import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function reservationInsert() {

    const currentDate = new Date().toLocaleDateString('en-CA');

    //inserção na tabela client preference
    const [reservation, setReservation] = useState({
        CheckIn: currentDate,
        CheckOut: '',
        NightCount: ''
    })

    const handleInputReservation = (event) => {
        setReservation({ ...reservation, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        if (reservation.CheckIn && reservation.CheckOut) {
            const checkInDate = new Date(reservation.CheckIn);
            const checkOutDate = new Date(reservation.CheckOut);
            const diffTime = Math.abs(checkOutDate - checkInDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setReservation({ ...reservation, NightCount: diffDays.toString() });
        }
    }, [reservation.CheckIn, reservation.CheckOut]);

    useEffect(() => {
        if (reservation.CheckIn && reservation.NightCount) {
            const checkInDate = new Date(reservation.CheckIn);
            const checkOutDate = new Date(checkInDate.getTime() + (parseInt(reservation.NightCount) * 24 * 60 * 60 * 1000));
            const checkOutDateString = checkOutDate.toISOString().split('T')[0];
            setReservation({ ...reservation, CheckOut: checkOutDateString });
        }
    }, [reservation.CheckIn, reservation.NightCount]);

    async function handleSubmitReservation(event) {
        event.preventDefault()

        if (!reservation.CheckIn || !reservation.CheckOut || !reservation.NightCount) {
            alert("Preencha os campos corretamente");
            return;
        }

        try {
            // Envio da solicitação para criar o indivíduo
            const response = await axios.put('/api/v1/frontOffice/reservations', {
                data: {
                    checkInDate: reservation.CheckIn,
                    checkOutDate: reservation.CheckOut,
                    nightCount: reservation.NightCount,
                }
            });
            //console.log(response); // Exibe a resposta do servidor no console
        } catch (error) {
            console.error('Erro ao enviar requisições:', error);
        }

    }
    return {
        handleInputReservation, handleSubmitReservation, reservation
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
