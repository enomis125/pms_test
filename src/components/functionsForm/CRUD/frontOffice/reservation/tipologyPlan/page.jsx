"use client"
import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function ReservationInsert(guestName, guestId, startDate, endDate, tipology, selectedDates) {
  const [filteredRoom, setFilteredRoom] = useState(null);
  const currentDate = new Date().toLocaleDateString('en-CA');
  const guestNumberDefault = 1;

  // Separando o nome completo em primeiro e segundo nome
  const nameParts = guestName.split(" ");
  const firstName = nameParts.length > 0 ? nameParts[0] : "";
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

  console.log("First Name:", firstName);
  console.log("Last Name:", lastName);
  console.log("Guest ID:", guestId);
  console.log("Tipology ID:", tipology);

  const initialReservationState = {
    CheckIn: startDate ? startDate : currentDate,
    CheckOut: endDate ? endDate : '',
    NightCount: '',
    GuestNumber: guestNumberDefault,
    GuestID: guestId,
    Language: '',
    Tipology: tipology,
    Room: '',
  };

  // Inserting into the client preference table
  const [reservation, setReservation] = useState(initialReservationState);

  useEffect(() => {
    setReservation(prevState => ({
      ...prevState,
      Tipology: tipology,
      GuestID: guestId
    }));
  }, [tipology, guestId]);

  useEffect(() => {
    console.log("Updated Reservation:", reservation);
  }, [reservation]);

  console.log("CARALHO: ", reservation.CheckOut);
  console.log("Reservation State on Initial Render:", reservation);
  // Atualiza o estado de firstName e lastName separadamente
  const [name, setName] = useState({
    firstName: firstName,
    lastName: lastName,
  });

  useEffect(() => {
    setName({ firstName, lastName });
  }, [firstName, lastName]);


  //preenchimento automatico do nome e do apelido atraves de autocomplete
  /*const handleClientSelect = (clientForm) => {
      setReservation({
          ...reservation,
          Name: clientForm.firstName,
          LastName: clientForm.secondName,
          GuestID: clientForm.guestProfileID
      })
  };*/

  //preenchimento automatico do país atraves de autocomplete
  const handleLanguageSelect = (language) => {
    setReservation({
      ...reservation,
      Language: language.codeNr
    });
  };

  //preenchimento automatico do país atraves de autocomplete
  const handleTipologySelect = (tipology) => {
    setReservation({
      ...reservation,
      Tipology: tipology.roomTypeID
    });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        if (reservation.Tipology && reservation.Room) {
          const response = await axios.get("/api/v1/hotel/rooms");
          const filteredRoom = response.data.response.find(room => room.label.toLowerCase() === reservation.Room.toLowerCase() && room.roomType === reservation.Tipology);

          if (filteredRoom) {
            handleSubmitReservation(true, filteredRoom); // Passa true como primeiro parâmetro se a sala for encontrada
            setFilteredRoom(filteredRoom); // Set the filteredRoom variable
          } else {
            handleSubmitReservation(false); // Passa false como primeiro parâmetro se a sala não for encontrada
            setFilteredRoom(null); // Set the filteredRoom variable to null
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, [reservation.Tipology, reservation.Room]);


  const handleInputReservation = (event) => {
    setReservation({ ...reservation, [event.target.name]: event.target.value })
  }

  // Para o número de noites aparecer ao determinar o checkin e checkout
  useEffect(() => {
    if (reservation.CheckIn && reservation.CheckOut) {
      const checkInDate = new Date(reservation.CheckIn);
      const checkOutDate = new Date(reservation.CheckOut);
      const diffTime = Math.abs(checkOutDate - checkInDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setReservation({ ...reservation, NightCount: diffDays.toString() });
    }
  }, [reservation.CheckIn, reservation.CheckOut]);

  const handleSubmitReservationForTab = (tabIndex, reservationData) => {
    axios.put(`/api/v1/frontOffice/reservations/tipologyPlan`, {
      data: {
        checkInDate: reservationData.CheckIn,
        checkOutDate: reservationData.CheckOut,
        nightCount: reservationData.NightCount,
        adultCount: reservationData.GuestNumber,
        guestNumber: reservationData.GuestID,
        roomTypeNumber: reservationData.Tipology,
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error('Erro ao enviar requisições:', error);
      });
  };

  async function handleSubmitReservation(event) {
    if (!event.isTrusted) {
      return;
    }

    event.preventDefault();

    // Verifica se todos os campos estão preenchidos
    {/*if (!reservation.CheckIn || !reservation.CheckOut || !reservation.NightCount || !reservation.GuestNumber || !reservation.Name || !reservation.LastName) {
      alert("Preencha os campos corretamente");
      return;
    }*/}

    // Envia uma solicitação para a API para cada tab
    selectedDates.forEach((dateRange, index) => {
      handleSubmitReservationForTab(index, {
        CheckIn: dateRange.start,
        CheckOut: dateRange.end,
        NightCount: reservation.NightCount,
        GuestNumber: reservation.GuestNumber,
        GuestID: reservation.GuestID,
        Tipology: reservation.Tipology,
      });
    });
  }

  return {
    handleInputReservation, handleSubmitReservation, setReservation, reservation, handleLanguageSelect, handleTipologySelect, name
  };
}
