import React, { useState, useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import axios from 'axios';

export default function ReservationAutocomplete({ label, style, variant, onChange }) {

    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/v1/hotel/frontOffice/reservations');
                const reservationsData = response.data.response;
                setReservations(reservationsData);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={style}>
            <Autocomplete
                label={label}
                className="max-w-xs"
                variant={variant}
                onChange={(value) => {
                    onChange(value);
                }}
            >
                {reservations.map((reservation) => (
                    <AutocompleteItem key={reservation.id} value={reservation} onClick={() => onChange(reservation)}>
                        {reservation.checkInDate} - {reservation.checkOutDate}
                    </AutocompleteItem>
                ))}
            </Autocomplete>
        </div>
    );
}