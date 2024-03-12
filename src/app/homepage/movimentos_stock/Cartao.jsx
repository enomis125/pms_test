'use client'


import { Card, CardHeader, CardBody, Divider, Button, Tooltip } from '@nextui-org/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";
import { BiCog } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { MdTableRows } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { LuPlus } from "react-icons/lu";
import { MdOutlineAddCircleOutline } from "react-icons/md";
const Cartao = ({ title, Movementtype_id, Editable }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();


  const createQueryString = (name, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    return params.toString();
  };

  const handleCardClick = () => {
    router.push(pathname + "/tipo" + '?' + createQueryString('Movementtype_id', Movementtype_id))
  };

  return (
    <div className="w-full h-full" data-movementtype-id={Movementtype_id}
      style={{ cursor: 'pointer' }} // Adiciona esta linha para definir o estilo do cursor
    >
      <Card className="w-full h-full">
        <CardHeader className="flex gap-3">
          <div className="flex w-full justify-between">

            <div className="flex flex-col border-slate-100 px-2">
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


                  <Button
                    isIconOnly 
                    size="sm"
                    variant="light"
                    className="bg-primary-100   -mt"
             
                    isDisabled={!Editable}
                  
                  ><LuPlus size={20} />
                  </Button>
                {/* </Tooltip> */}
            

            </div>

          </div>

        </CardHeader>
        <CardBody>
          <div className="my-4 h-6">
            <Divider />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Cartao;
