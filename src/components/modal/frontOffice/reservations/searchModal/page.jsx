import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalAction } from "@nextui-org/modal";

import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";

export default function DateFilterModal({ open, onClose, onSubmit }) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit(startDate, endDate);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <ModalHeader>Selecione as Datas</ModalHeader>
            <ModalContent>
                <InputFieldControlled
                    type={"date"}
                    id={"de"}
                    name={"De"}
                    label={"De:"}
                    ariaLabel={"De:"}
                    value={startDate}
                    onChange={handleStartDateChange}
                    style={{ marginBottom: "10px" }}
                />
                <InputFieldControlled
                    type={"date"}
                    id={"ate"}
                    name={"Até"}
                    label={"Até:"}
                    ariaLabel={"Até:"}
                    value={endDate}
                    onChange={handleEndDateChange}
                    style={{ marginBottom: "10px" }}
                />
            </ModalContent>
            <ModalAction passive onClick={onClose}>
                Cancelar
            </ModalAction>
            <ModalAction onClick={handleSubmit}>Filtrar</ModalAction>
        </Modal>
    );
}
