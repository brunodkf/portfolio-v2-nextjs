"use client";

import { useTranslations } from 'next-intl';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Home() {

  const { theme, setTheme } = useTheme();
  const [colorLine, setColorLine] = useState('#dfa47d');

  useEffect(() => {
    theme === 'light' ? setColorLine('#1e1e1e') : setColorLine('#dfa47d')
  }, [theme])


  const t = useTranslations('HomePage')

  return (
    <main className="home container w-full h-svh flex items-center justify-center">

      <div className="relative w-full flex items-center justify-center">

        <motion.svg
          width="600"
          height="600"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ strokeDashoffset: 300 }}
          animate={{ strokeDashoffset: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <motion.path
            d="M100 10 L190 55 L190 145 L100 190 L10 145 L10 55 Z"
            stroke={colorLine}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="150"
            strokeDashoffset="300"
            filter="drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.1))"
            animate={{
              strokeDashoffset: [80, 0, 900],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.svg>

        <div className={`font-title absolute inset-0 text-cinza dark:text-branco flex flex-col items-center justify-center`}>
          <h1 className="text-center text-[80px] md:text-[102px] leading-[80px] md:leading-[100px] ">BRUNO <br /> FURTADO</h1>
          <p className="mt-4">{t("Subtitle")}</p>
        </div>
      </div>


    </main>
  );
}
