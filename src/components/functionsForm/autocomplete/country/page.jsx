"use client"
import React, { useState, useEffect } from "react";
import {Autocomplete, AutocompleteItem } from "@nextui-org/react";

import axios from 'axios';

export default function countryAutocomplete({label, style}) {

    const [nationalities, setNationalities] = useState([]);

    useEffect(() => {
        const getData = () => {
          axios.get('/api/v1/cardex/nationalities')
            .then(res => {
                setNationalities(res.data.response);
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
        };
        getData();
      }, []);

return (
    <div className={style}>
    <Autocomplete
        label={label}
        className="max-w-xs"
        variant="underlined"
    >
        {nationalities.map((nationalities) => (
            <AutocompleteItem key={nationalities.codeNr} value={nationalities.land}>
                {nationalities.land}
            </AutocompleteItem>
        ))}
    </Autocomplete>
</div>
)
}