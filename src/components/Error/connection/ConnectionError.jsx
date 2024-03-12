import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";
const ConnectionError = ({ message }) => {
    return (
        <div className="flex w-full -my-16 h-screen justify-center items-center top-0 bg-white overflow-clip">

            <div className="flex flex-col justify-center">
                <Image
                    src="/connectionError.svg"
                    alt="Connection Error"
                    height={400}
                    width={400}
                />
                <h1 className="flex justify-center text-[#263238] text-xl">
                    {message}
                </h1>
            </div>

        </div>

    )
}
export default ConnectionError;