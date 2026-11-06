import Image from 'next/image';

interface FrameProps {
  src: string;
  alt: string;
  priority?: boolean;
  sizes: string;
  className?: string;
}

export function BrowserFrame({ src, alt, domain, priority, sizes, className = '' }: FrameProps & { domain?: string }) {
  return (
    <figure className={`overflow-hidden rounded-lg border border-fg/10 bg-preto shadow-2xl shadow-black/30 ${className}`}>
      <div aria-hidden="true" className="flex h-7 items-center gap-1.5 bg-cinza px-3">
        <span className="size-2 rounded-full bg-branco/20" />
        <span className="size-2 rounded-full bg-branco/20" />
        <span className="size-2 rounded-full bg-branco/20" />
        {domain && (
          <span className="mx-auto max-w-[60%] truncate rounded bg-preto/60 px-3 py-0.5 font-mono text-[10px] text-branco/60">
            {domain}
          </span>
        )}
      </div>
      <Image src={src} alt={alt} width={1440} height={900} sizes={sizes} priority={priority} className="block h-auto w-full" />
    </figure>
  );
}

export function PhoneFrame({ src, alt, priority, sizes, className = '' }: FrameProps) {
  return (
    <figure className={`overflow-hidden rounded-[1.6rem] border-[5px] border-cinza bg-preto shadow-2xl shadow-black/40 ${className}`}>
      <Image src={src} alt={alt} width={780} height={1688} sizes={sizes} priority={priority} className="block aspect-[390/700] h-auto w-full object-cover object-top" />
    </figure>
  );
}
