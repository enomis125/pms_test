import React from 'react';
import { ModalFooter } from "@nextui-org/react";

const ModalFooterContent = ({ criado, editado }) => {
    return (
        <ModalFooter className="absolute bottom-0 left-0 flex flex-row text-right bg-tableFooter border border-tableFooterBorder w-full text-gray-600 text-xs">
            <p>Criado em {`${new Date(criado).toLocaleDateString()} : Teste`}</p>
            {criado !== editado && (
                <div>
                    <p>Editado em {`${new Date(editado).toLocaleDateString()} : Teste`}</p>
                </div>
            )}
        </ModalFooter>
    );
};

export default ModalFooterContent;
