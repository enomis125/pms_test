"use client"
import React from "react";
import { Image } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginForm() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image
        src="/images/imagem-login.png"
        alt="management hotel"
        className="object-cover w-full h-full fixed inset-0"
      />
    </div>
  );
}
