"use client";

import Image from "next/image";

export default function Sobre(){
    return (
        <main className="home container w-full h-svh flex items-center justify-center">
            <Image src='/hex.svg' alt="Hexágono" className="md:w-[50%]" width={100} height={100}/>

            <div className="relative w-full flex items-center justify-center">
                    <div className={`absolute inset-0 text-branco flex flex-col items-center justify-center`}>
                    <h1 className="text-center text-[102px] leading-[100px] ">BRUNO <br /> FURTADO</h1>
                    <p className="mt-4">Desenvolvedor Frontend | UX / UI Designer</p>
                </div>
            </div>
        </main>
    )
}