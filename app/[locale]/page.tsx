import { useTranslations } from 'next-intl';

import HomeAnimation from '../components/HomeAnimation';

export default function Home() {

  const t = useTranslations('HomePage')

  return (
    <main className="home container w-full h-svh flex items-center justify-center">

      <div className="relative w-full flex items-center justify-center">

        <HomeAnimation />

        <div className={`font-title absolute inset-0 text-cinza dark:text-branco flex flex-col items-center justify-center`}>
          <h1 className="text-center text-[80px] md:text-[102px] leading-[80px] md:leading-[100px] ">BRUNO <br /> FURTADO</h1>
          <p className="mt-4">{t("Subtitle")}</p>
        </div>
        
      </div>

    </main>
  );
}
