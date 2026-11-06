export function PageFrame({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`w-full min-h-svh lg:min-h-full flex flex-col items-center justify-center pt-32 pb-16 lg:pt-28 lg:pb-24 ${className}`}>
      {children}
    </div>
  );
}

export function PageTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <h1 className="font-title text-3xl text-preto dark:text-branco">{children}</h1>
      <span aria-hidden="true" className="w-10 h-[2px] my-2 bg-cinza dark:bg-laranja block rounded" />
    </div>
  );
}
