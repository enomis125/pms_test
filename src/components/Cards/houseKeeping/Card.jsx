'use client'

import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Button } from '@nextui-org/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";
import { MdTableRows } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import FormModals from "@/components/modal/hotelSetup/cardModal/formModals";

const Cartao = ({ title, description, counter1, counter2, counter3, counter4, icon, listType, formTypeCard, extraicon }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const createQueryString = (name, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    return params.toString();
  };

  const handleCardClick = () => {
    router.push(pathname + "/" + ('listType', listType));
  };

  return (
    <div className="w-full h-full" data-listType={listType} style={{ cursor: 'pointer' }}>
      <Card className="w-full h-full">
        <CardHeader className="flex gap-3">
          <div className="flex w-full justify-between">
            <div className="flex flex-col border-slate-100">
            <div className="text-emerald-800 text-[60px] ml-20 font-bold">{counter1}</div>
              <div className="text-lime-500 text-[60px] ml-20 font-bold">{counter2}</div>
              <div className="text-red-600 text-[60px] ml-20 font-bold">{counter3}</div>
              <div className="text-stone-600 text-[60px] ml-20 font-bold">{counter4}</div>
            </div>
            <div className="flex justify-end items-center gap-2">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className="bg-primary-100"
                onPress={handleCardClick}
              >
                <MdTableRows size={18} />
              </Button>

              <div className="flex items-center space-x-2">
                <FormModals 
                  buttonName={<LuPlus size={20} />} 
                  modalHeader={"Inserir " + title.toLowerCase()} 
                  formTypeModal={formTypeCard}
                />
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  className="bg-primary-100"
                >
                  <FiPlus size={20} />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="my-4 h-6 flex">
            <div className="w-4/5">
              <div className="text-xs">{description}</div>
              <div className="flex text-xl font-bold justify-center mr-28">
                <label className="text-xl font-semibold">{title}</label>
              </div>
            </div>
            <div className="w-1/5 text-gray-400 flex justify-center">
              {icon}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Cartao;