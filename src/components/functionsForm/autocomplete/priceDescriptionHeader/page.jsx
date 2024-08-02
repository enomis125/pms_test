"use client"
import React, { useState, useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

import axios from 'axios';

export default function headerAutocomplete({ label, style, onChange}) {

    const [priceHeader, setPriceHeader] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get('/api/v1/prices/priceDescriptionHeader');
                const filteredData = res.data.response.filter(header => header.descriptionName !== "");
                setPriceHeader(filteredData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getData();
    }, []);

    return (
        <div className={style}>
            <Autocomplete
                label={label}
                className="max-w-xs"
                variant="underlined"
                onChange={(value) => {
                    onChange(value);
                    //console.log("Selected value: ", value);
                }}
            >
                {priceHeader.map((header) => (
                    <AutocompleteItem key={header.priceDescriptionHeaderID} value={header} onClick={() => onChange(header)}>
                        {header.descriptionName}
                    </AutocompleteItem>
                ))}
            </Autocomplete>
        </div>
    );
}

