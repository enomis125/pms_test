"use client"
import React from "react";
import { Input } from "@nextui-org/react";

export default function InputFieldControlled ({ type, id, name, onChange, label, ariaLabel, style, value}) {
    
    return (
        <Input
        type={type}
        id={id}
        name={name}
        variant="underlined"
        onChange={onChange}
        label={label}
        aria-label={ariaLabel}
        className={style}
        value={value}
        />
    )
}