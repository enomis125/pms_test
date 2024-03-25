import React, {useEffect, useState} from 'react';

export const caracteristicaOption = () => {
    const [caracteristicas, setCaracteristicas] = useState([]);

    useEffect(() => {
        axios.get('/api/v1/hotel/caracteristicas')
            .then(res => {
                const caracteristicaOption = res.data.response.map(item => ({ value: item.characteristicID, label: item.description }));
                setCaracteristicas(data);
                console.log(caracteristicaOption)
            })
            .catch(err => console.log(err));
    }, []);

    return caracteristicas;
}
