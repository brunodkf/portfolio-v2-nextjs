export function TechList({ items, label, className = '' }: { items: string[]; label?: string; className?: string }) {
  return (
    <ul aria-label={label} className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((tech) => (
        <li
          key={tech}
          className="rounded border border-fg/20 px-2 py-0.5 font-mono text-[11px] tracking-wide text-fg/80"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}
