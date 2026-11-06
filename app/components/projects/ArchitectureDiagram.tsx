interface Layer {
  name: string;
  detail: string;
}

interface ArchitectureDiagramProps {
  layers: Layer[];
  variant?: 'compact' | 'full';
  caption?: string;
  label: string;
}

export function ArchitectureDiagram({ layers, variant = 'full', caption, label }: ArchitectureDiagramProps) {
  const compact = variant === 'compact';

  return (
    <figure
      aria-label={label}
      className="relative overflow-hidden rounded-lg border border-fg/10 bg-preto p-6 text-branco shadow-2xl shadow-black/30 sm:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#ededed_1px,transparent_1px),linear-gradient(90deg,#ededed_1px,transparent_1px)] [background-size:28px_28px]"
      />
      <svg aria-hidden="true" viewBox="0 0 200 200" className="pointer-events-none absolute -right-16 -top-16 size-64 opacity-30">
        <path d="M100 10 L190 55 L190 145 L100 190 L10 145 L10 55 Z" fill="none" stroke="#dfa47d" strokeWidth="1" />
      </svg>

      <ol className="relative flex flex-col">
        {layers.map((layer, index) => (
          <li key={layer.name} className="flex flex-col items-stretch">
            <div className={`flex items-center gap-4 rounded-md border border-branco/15 bg-cinza/80 backdrop-blur-sm ${compact ? 'px-4 py-2.5' : 'px-4 py-3 sm:px-5'}`}>
              <span aria-hidden="true" className="font-mono text-[10px] text-laranja/70">{String(index + 1).padStart(2, '0')}</span>
              <span className={`font-title text-laranja ${compact ? 'text-lg' : 'w-28 shrink-0 text-xl'}`}>{layer.name}</span>
              {!compact && <span className="text-xs leading-relaxed text-branco/75 sm:text-sm">{layer.detail}</span>}
            </div>
            {index < layers.length - 1 && (
              <span aria-hidden="true" className="mx-auto h-4 w-px bg-laranja/50" />
            )}
          </li>
        ))}
      </ol>

      {caption && <figcaption className="relative mt-5 text-xs leading-relaxed text-branco/60">{caption}</figcaption>}
    </figure>
  );
}
