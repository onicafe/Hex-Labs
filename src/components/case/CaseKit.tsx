import { useState } from "react";
import { X } from "lucide-react";
import type { AnatomyPoint, Figure, Specs, Status } from "@/data/spillfabrikken";

// Peças das pranchas dos estudos de caso: tudo é montado com a arte real dos projetos.

const statusStyle: Record<Status, string> = {
  live: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  cancelled: "border-zinc-500/40 bg-zinc-500/10 text-zinc-300",
  proposal: "border-amber-400/40 bg-amber-400/10 text-amber-200",
};

export const StatusBadge = ({ status }: { status: { kind: Status; label: string } }) => (
  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border font-mono text-[11px] tracking-wide ${statusStyle[status.kind]}`}>
    <span className={`w-1.5 h-1.5 rounded-full ${status.kind === "live" ? "bg-emerald-300" : status.kind === "proposal" ? "bg-amber-200" : "bg-zinc-400"}`} />
    {status.label}
  </span>
);

export const ImpactStrip = ({ items, note, accent }: { items: { value: string; label: string }[]; note: string; accent: string }) => (
  <div>
    <div className="grid sm:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
      {items.map((item) => (
        <div key={item.label} className="bg-background p-6 lg:p-8">
          <p className="font-display text-4xl lg:text-5xl font-bold mb-2" style={{ color: accent }}>{item.value}</p>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.label}</p>
        </div>
      ))}
    </div>
    <p className="font-mono text-[11px] text-muted-foreground mt-3 leading-relaxed">{note}</p>
  </div>
);

export const ProcessSteps = ({ steps, accent }: { steps: { title: string; text: string }[]; accent: string }) => (
  <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
    {steps.map((step, i) => (
      <li key={step.title} className="bg-background p-6">
        <p className="font-mono text-xs mb-4" style={{ color: accent }}>{String(i + 1).padStart(2, "0")}</p>
        <h3 className="font-display text-lg font-bold text-foreground mb-2">{step.title}</h3>
        <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.text}</p>
      </li>
    ))}
  </ol>
);

/** Logotipo desenhado a partir de uma máscara: positivo, negativo e na cor do jogo. */
export const LogoTile = ({ mask, bg, fg, label }: { mask: string; bg: string; fg: string; label: string }) => (
  <figure>
    <div className="aspect-[16/10] rounded-2xl border border-white/10 p-[14%] grid" style={{ background: bg }}>
      <div
        role="img"
        aria-label={label}
        style={{
          background: fg,
          WebkitMaskImage: `url("${mask}")`,
          maskImage: `url("${mask}")`,
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    </div>
    <figcaption className="font-mono text-[11px] tracking-wide text-muted-foreground mt-3">{label}</figcaption>
  </figure>
);

export const LogoBoard = ({ mask, name, accent }: { mask: string; name: string; accent: string }) => (
  <div className="grid sm:grid-cols-3 gap-4">
    <LogoTile mask={mask} bg="#f2f2f0" fg="#111111" label={`${name}: positivo`} />
    <LogoTile mask={mask} bg="#0f0f0f" fg="#ffffff" label={`${name}: negativo`} />
    <LogoTile mask={mask} bg={accent} fg="#ffffff" label={`${name}: sobre a cor do jogo`} />
  </div>
);

export const SectionHeading = ({ index, label, title, accent }: { index: number; label: string; title: string; accent?: string }) => (
  <header className="mb-10 border-t border-border pt-6">
    <p className="font-mono text-xs tracking-[0.25em] uppercase mb-4" style={{ color: accent }}>
      {String(index).padStart(2, "0")} / {label}
    </p>
    <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground max-w-3xl">{title}</h2>
  </header>
);

export const MetaStrip = ({ items }: { items: { label: string; value: string }[] }) => (
  <dl className="grid grid-cols-2 lg:grid-cols-4 border-y border-border divide-border">
    {items.map((item, i) => (
      <div key={item.label} className={`py-6 pr-6 ${i % 2 === 1 ? "pl-6 border-l border-border" : ""} lg:pl-6 lg:first:pl-0 lg:border-l lg:first:border-l-0`}>
        <dt className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-2">{item.label}</dt>
        <dd className="font-body text-base text-foreground">{item.value}</dd>
      </div>
    ))}
  </dl>
);

const specRows: { key: keyof Specs; label: string }[] = [
  { key: "contents", label: "Conteúdo" },
  { key: "players", label: "Jogadores" },
  { key: "age", label: "Idade" },
  { key: "time", label: "Duração" },
];

export const SpecSheet = ({ specs, accent }: { specs: Specs; accent: string }) => (
  <div className="rounded-2xl border border-border overflow-hidden">
    <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-card">
      <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Ficha técnica</span>
      <span className="w-2.5 h-2.5 rounded-full" style={{ background: accent }} />
    </div>
    <table className="w-full">
      <tbody>
        {specRows
          .filter((row) => specs[row.key])
          .map((row) => (
            <tr key={row.key} className="border-b border-border last:border-0">
              <th scope="row" className="text-left font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground px-5 py-4 w-40 align-top">
                {row.label}
              </th>
              <td className="font-body text-foreground px-5 py-4">{specs[row.key]}</td>
            </tr>
          ))}
      </tbody>
    </table>
    <p className="px-5 py-3 border-t border-border font-mono text-[11px] text-muted-foreground">Fonte: verso da caixa</p>
  </div>
);

export const PaletteRow = ({ colors }: { colors: string[] }) => (
  <div>
    <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-3">Paleta</p>
    <div className="grid grid-cols-5 gap-2">
      {colors.map((c) => (
        <div key={c}>
          <div className="aspect-square rounded-xl border border-white/10" style={{ background: c }} />
          <p className="font-mono text-[11px] text-muted-foreground mt-2 uppercase">{c}</p>
        </div>
      ))}
    </div>
  </div>
);

export const useLightbox = () => {
  const [src, setSrc] = useState<string | null>(null);
  const lightbox = src ? (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-10 cursor-zoom-out"
      onClick={() => setSrc(null)}
    >
      <button className="absolute top-6 right-6 p-2 text-white/70 hover:text-white" onClick={() => setSrc(null)} aria-label="Fechar imagem">
        <X className="w-8 h-8" />
      </button>
      <img src={src} alt="Imagem ampliada" className="max-w-full max-h-[90vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
    </div>
  ) : null;
  return { open: setSrc, lightbox };
};

export const FigureGrid = ({
  figures,
  columns = 2,
  uniform = false,
  paper = false,
  contain = false,
  onOpen,
}: {
  figures: Figure[];
  columns?: 1 | 2 | 3;
  /** Recorta todas as imagens na mesma proporção, para pranchas com fotos de tamanhos diferentes. */
  uniform?: boolean;
  /** Fundo de papel claro, para arquivos técnicos. */
  paper?: boolean;
  /** Com uniform: mostra a imagem inteira em vez de recortar. */
  contain?: boolean;
  onOpen: (src: string) => void;
}) => {
  const cols = columns === 1 ? "" : columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";
  return (
    <div className={`grid gap-4 ${cols}`}>
      {figures.map((f) => (
        <figure key={f.src}>
          <button
            type="button"
            onClick={() => onOpen(f.src)}
            className={`block w-full overflow-hidden rounded-2xl border border-white/5 cursor-zoom-in ${uniform ? "aspect-[4/3]" : ""} ${paper ? "bg-[#f4f3f0] p-3 md:p-6" : "bg-card"}`}
          >
            <img
              src={f.src}
              alt={f.caption ?? ""}
              loading="lazy"
              className={`w-full transition-transform duration-700 hover:scale-[1.02] ${uniform ? `h-full ${contain ? "object-contain" : "object-cover"}` : "h-auto"}`}
            />
          </button>
          {f.caption && <figcaption className="font-mono text-[11px] tracking-wide text-muted-foreground mt-3">{f.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
};

export const Anatomy = ({ image, points, accent }: { image: string; points: AnatomyPoint[]; accent: string }) => (
  <div className="grid lg:grid-cols-[2fr_1fr] gap-8 items-start">
    <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-white">
      <img src={image} alt="Anatomia da carta" className="w-full h-auto" />
      {points.map((p, i) => (
        <span
          key={p.label}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full grid place-items-center font-mono text-xs font-bold text-white ring-4 ring-white/70 shadow-lg"
          style={{ left: `${p.x}%`, top: `${p.y}%`, background: accent }}
          aria-hidden
        >
          {i + 1}
        </span>
      ))}
    </div>
    <ol className="space-y-5">
      {points.map((p, i) => (
        <li key={p.label} className="flex gap-4">
          <span className="shrink-0 w-7 h-7 rounded-full grid place-items-center font-mono text-xs font-bold text-white" style={{ background: accent }}>
            {i + 1}
          </span>
          <div>
            <p className="font-display font-bold text-foreground">{p.label}</p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">{p.text}</p>
          </div>
        </li>
      ))}
    </ol>
  </div>
);
