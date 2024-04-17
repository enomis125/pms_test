"use client"
import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function reservationInsert() {

    const currentDate = new Date().toLocaleDateString('en-CA');
    const guestNumberDefault = 1;

    //inserção na tabela client preference
    const [reservation, setReservation] = useState({
        CheckIn: currentDate, //para o checkin aparecer por default com a data atual do pc
        CheckOut: '',
        NightCount: '',
        GuestNumber: guestNumberDefault
    })

    const handleInputReservation = (event) => {
        setReservation({ ...reservation, [event.target.name]: event.target.value })
    }

    //para o nrm de noites aparecer ao detemrinar o checkin e chekout
    useEffect(() => {
        if (reservation.CheckIn && reservation.CheckOut) {
            const checkInDate = new Date(reservation.CheckIn);
            const checkOutDate = new Date(reservation.CheckOut);
            const diffTime = Math.abs(checkOutDate - checkInDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setReservation({ ...reservation, NightCount: diffDays.toString() });
        }
    }, [reservation.CheckIn, reservation.CheckOut]);

    //para o checkout aparecer apos determinar o checkin e o nrm de noites
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

        if (!reservation.CheckIn || !reservation.CheckOut || !reservation.NightCount || !reservation.GuestNumber) {
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
                    guestNumber: reservation.GuestNumber
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
        NightCount: '',
        GuestNumber: '',
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
                    NightCount: reserveResponse.data.response.nightCount,
                    GuestNumber: reserveResponse.data.response.guestNumber
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
                nightCount: valuesReserve.NightCount,
                guestNumber: valuesReserve.GuestNumber
            }
        })
            .catch(err => console.log(err))


    }

    return {
        handleUpdateReservation, setValuesReserve, valuesReserve
    };
}
