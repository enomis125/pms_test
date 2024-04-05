"use client"
import React, { useState, useEffect } from "react";
import {Autocomplete, AutocompleteItem } from "@nextui-org/react";

import axios from 'axios';

export default function genderAutocomplete({label, style}) {

    const [genders, setGenders] = useState([]);

    useEffect(() => {
        const getData = () => {
          axios.get('/api/v1/cardex/genders')
            .then(res => {
                setGenders(res.data.response);
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
        {genders.map((genders) => (
            <AutocompleteItem key={genders.restypnrID} value={genders.restypName}>
                {genders.restypName}
            </AutocompleteItem>
        ))}
    </Autocomplete>
</div>
)
}