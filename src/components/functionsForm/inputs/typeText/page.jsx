"use client"
import React from "react";

export default function InputFieldControlled({ type, id, name, onChange, label, ariaLabel, style, value }) {

    return (
        <div>
            <p className="text-xs">{label}</p>
            <input
                type={type}
                id={id}
                name={name}
                className={`${style} border-b border-neutral-100`}
                onChange={onChange}
                placeholder="-"
                aria-label={ariaLabel}
                value={value}
            />
        </div>
    )
}