'use client';

import Image from 'next/image';

import { usePathname } from '@/i18n/routing';

export function DecorativeElements() {
  if (usePathname() === '/') return null;

  return (
    <div aria-hidden="true" className="pointer-events-none -z-10 w-1/2 h-1/2 hidden lg:flex absolute right-0 bottom-0 overflow-hidden">
      <Image
        src="/poligons.svg"
        alt=""
        width={450}
        height={450}
        loading="eager"
        className="absolute -z-10 bottom-[-190px] right-[-70px] opacity-50"
      />
    </div>
  );
}
