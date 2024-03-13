import Image from "next/image";
import  hotelSoftware  from "/src/app/images/hotelSoftware.jpg";
import { FaEye } from "react-icons/fa";
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-row">
      <div className="w-8/12">
        <Image src={hotelSoftware} alt="management hotel" className="h-dvh"></Image>
      </div>
      <div className="flex flex-col justify-center p-40">
        <div className="">
            <Image src="/images/logo.png" alt="Logotipo" width={250} height={250} />
        </div>
        <p className="text-sm text-gray-600">Utilizador</p>
        <input type="text" placeholder="Insira o utilizador" className="outline-none border-b border-gray-400 px-1 py-2 font-medium"/>
        <div className="my-5">
        <p className="text-sm text-gray-600">Palavra-passe</p>
        <div className="flex flex-row items-center">
        <input type="text" placeholder="Insira a palavra-passe" className="outline-none border-b border-gray-400 px-1 py-2 font-medium"/><FaEye size={20} className="text-gray-500"/>
        </div>
        </div>
        <button className="bg-primary-600 rounded-md h-9 text-white"><Link href="/homepage">Login</Link></button>
      </div>
    </div>
  );
}