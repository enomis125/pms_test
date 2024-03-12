'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useState } from 'react'
import Cartao from './Cartao';
import Loader from "@/components/Loader/Loader";
import { useSession } from "next-auth/react";
import ConnectionError from '@/components/Error/connection/ConnectionError'
import useSWRImmutable from 'swr/immutable'

const Movimenttypes = ({ params }) => {
    const { id } = params
    const fetcher = (url, id) => axios.get(url).then((res) => res.data.response)

    const Movimenttype = useSWRImmutable([`/api/movements/types/`, id], ([url, id]) => fetcher(url, id))


    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/login");
        },
    });


    if (status === "loading") {

        return (<Loader />);
    }

    const user_name_page = session.user.name;

    if (Movimenttype.isLoading) return <Loader />
    if (Movimenttype.error) return <ConnectionError message={"Não foi possível carregar os Tipos de movimentos"} />



    return (
        <div className="my-6 mx-12 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center">
            {Movimenttype.data.map((Moviment) => (
                Moviment.Shortcutmenu === true ? (
                    <Cartao
                        key={Moviment.Movementtype_id}
                        title={Moviment.Description}
                        Movementtype_id={Moviment.Movementtype_id}
                        Editable={Moviment.Editable}
                    />
                ) : null
            ))}
        </div>
    );
}

export default Movimenttypes;



