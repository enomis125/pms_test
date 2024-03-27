'use client'

import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Divider, Button, Tooltip } from '@nextui-org/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";
import { BiCog } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { MdTableRows } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { LuPlus } from "react-icons/lu";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import FormModals from "@/components/modal/cardex/formModals";



const Cartao = ({ title, description, counter1, counter2, icon, listType, formTypeCard}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();


  const createQueryString = (name, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    return params.toString();
  };

  const handleCardClick = () => {
    router.push(pathname + "/" + ('listType', listType))
  };


  return (
    <div className="w-full h-full" data-listType={listType}
      style={{ cursor: 'pointer' }} // Adiciona esta linha para definir o estilo do cursor
    >
      <Card className="w-full h-full">
        <CardHeader className="flex gap-3">
          <div className="flex w-full justify-between">

            <div className="flex flex-col border-slate-100">
              <label className="text-xl font-semibold">{title}</label>
            </div>

            <div  className="flex gap-3 items-center">


                  <Button
                   isIconOnly
                    size="sm"
                    variant="light"
                    className="bg-primary-100   -mt"
                    onPress={handleCardClick}
                  ><MdTableRows size={18} />
                  </Button>
                {/* </Tooltip> */}

                {/* <Tooltip
                  placement="bottom"
                  className="bg-primary-100"

                  content="Inserir"
                  delay={500}> */}

                  <FormModals 
                  buttonName = {<LuPlus size={20} />} 
                  modalHeader={"Inserir " + title.toLowerCase()} 
                  formTypeModal={formTypeCard}/>
                {/* </Tooltip> */}


            </div>

          </div>

        </CardHeader>
        <CardBody>
          <div className="my-4 h-6 flex">
            <div className="w-4/5">
                <div className="text-xs">{description}</div>
                <div className="flex text-4xl font-bold justify-center space-x-6">
                    <div className="text-emerald-800">{counter1}</div>
                    <div className="text-slate-800">{counter2}</div>
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