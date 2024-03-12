"use client"
import React, { useState } from 'react';
import Tabela_Movements from './Tabela';
import { useSession } from "next-auth/react";
import { useSearchParams, usePathname } from 'next/navigation';
import { useDisclosure } from "@nextui-org/react";
import EditarMovimento from './EditarMovimento';

export default function Lista() {
    const searchParams = useSearchParams();
    let id = searchParams.get('Movementtype_id');
    id = String(id);

    const [newMovement, setNewMovement] = useState(false);
    const [movement, setMovement] = useState(null);
    const [tipoMovimento, setTipoMovimento] = useState("");
    const [state, setState] = useState()

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const edit = useDisclosure();
    const criar = useDisclosure();

    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/login");
        },
    });

    return (


        
        <div className="my-12 mx-2">
            <Tabela_Movements
                Movementtype_id={id}
                movement={movement}
                setMovement={setMovement}
                newMovement={newMovement}
                setNewMovement={setNewMovement}
                onOpenChange={edit.onOpen}
                onOpenCriar={criar.onOpen}
                isOpen={edit.isOpen}
                tipoMovimento={tipoMovimento}
                setTipoMovimento={setTipoMovimento}
                setState={setState}
                state={state}
            />
            {newMovement ? (
                <EditarMovimento
                tipoMovimento={tipoMovimento}
                movement={-1}
                setMovement={setMovement}
                isOpen={criar.isOpen}
                newMovement={newMovement}
                onOpenChange={criar.onOpenChange}
                />
            ) : (
                <EditarMovimento
                    tipoMovimento={tipoMovimento}
                    movement={movement}
                    setMovement={setMovement}
                    isOpen={edit.isOpen}
                    newMovement={newMovement}
                    onOpenChange={edit.onOpenChange}
                />
            )}
        </div>
    );
}


