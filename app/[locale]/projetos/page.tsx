"use client";

import { Antonio } from "next/font/google";

const antonio = Antonio({
    subsets: ['latin']
});


export default function Projetos() {
    return (
        <main className="about container w-full h-svh flex items-center justify-center text-branco ">
            <div className="flex flex-col items-center">
                <h1 className={`${antonio.className} text-branco text-3xl`}>Projetos</h1>
                <span className="w-10 h-[2px] mt-2 bg-laranja block rounded"></span>
            </div>
        </main>
    )
}