export function HexIndex({ value, className = '' }: { value: number; className?: string }) {
  return (
    <span aria-hidden="true" className={`relative inline-flex size-14 shrink-0 items-center justify-center ${className}`}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full">
        <path d="M100 10 L190 55 L190 145 L100 190 L10 145 L10 55 Z" fill="none" className="stroke-cobre dark:stroke-laranja" strokeWidth="6" />
      </svg>
      <span className="font-title text-xl text-cobre dark:text-laranja">{String(value).padStart(2, '0')}</span>
    </span>
  );
}
