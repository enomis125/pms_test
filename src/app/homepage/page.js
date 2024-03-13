"use client"
import React, { useEffect, useState } from "react";
import axios from 'axios';

const Homepage = (pagina) => {

    const [caracteristics, setCaracteristics] = useState([]);

    useEffect(() => {
      const getData = async () => {
        const response = await axios.put('/api/hotel/caracteristicas', {
            description: "Pedro",
            abreviature: "ped",
            details: "This is a pedro"
        })
        console.log(response.data);
      };
      getData();
    }, []);


    return (
        <>
            {/* <ul>
            {caracteristics.map((caracteristic, index) => (
                <li key={index}>{caracteristic.description}</li>
            ))}
            </ul> */}
        </>
    )
}

export default Homepage;