// Wireframe técnico da carta do Kryptert, redesenhado a partir do gabarito de produção
// (63 × 88 mm, cantos R3, sangria de 3 mm). Unidades do SVG em milímetros.

const LINE = "#d4d4d8";
const MUTED = "#71717a";
const BLEED = "#3fb37f";

type Zone = { x: number; y: number; w: number; h: number; label: string; rx?: number };

const front: Zone[] = [
  { x: 7, y: 13, w: 40, h: 22, label: "Frase cifrada" },
  { x: 3, y: 79.5, w: 57, h: 5.5, label: "Assinatura", rx: 1.5 },
];

const back: Zone[] = [
  { x: 18.25, y: -3, w: 26.7, h: 11.2, label: "Aba", rx: 2.5 },
  { x: 5, y: 19, w: 53, h: 16, label: "Resposta" },
  { x: -3, y: 50.6, w: 69, h: 7.7, label: "Dica" },
  { x: 10, y: 61.5, w: 43, h: 9.6, label: "Comentário" },
  { x: 26.5, y: 79, w: 10, h: 12, label: "Selo", rx: 2.5 },
];

const Card = ({ ox, title, zones, accent, solid }: { ox: number; title: string; zones: Zone[]; accent: string; solid?: boolean }) => (
  <g transform={`translate(${ox} 16)`}>
    {/* sangria */}
    <rect x={-3} y={-3} width={69} height={94} fill={solid ? accent : "none"} fillOpacity={solid ? 0.12 : 0} stroke={BLEED} strokeWidth={0.35} strokeDasharray="2 1.2" />
    {/* corte */}
    <rect x={0} y={0} width={63} height={88} rx={3} fill="none" stroke={LINE} strokeWidth={0.45} />
    {zones.map((z) => (
      <g key={z.label}>
        <rect x={z.x} y={z.y} width={z.w} height={z.h} rx={z.rx ?? 0.8} fill={accent} fillOpacity={0.22} stroke={accent} strokeWidth={0.3} />
        <text x={z.x + z.w / 2} y={z.y + z.h / 2 + 0.9} textAnchor="middle" fontSize={2.5} fontFamily="ui-monospace, monospace" fill="#fafafa">
          {z.label}
        </text>
      </g>
    ))}
    {/* cota de largura */}
    <line x1={0} y1={-7} x2={63} y2={-7} stroke={MUTED} strokeWidth={0.25} />
    <line x1={0} y1={-8.5} x2={0} y2={-5.5} stroke={MUTED} strokeWidth={0.25} />
    <line x1={63} y1={-8.5} x2={63} y2={-5.5} stroke={MUTED} strokeWidth={0.25} />
    <text x={31.5} y={-8.6} textAnchor="middle" fontSize={2.6} fontFamily="ui-monospace, monospace" fill={LINE}>63 mm</text>
    {/* cota de altura */}
    <line x1={-7} y1={0} x2={-7} y2={88} stroke={MUTED} strokeWidth={0.25} />
    <line x1={-8.5} y1={0} x2={-5.5} y2={0} stroke={MUTED} strokeWidth={0.25} />
    <line x1={-8.5} y1={88} x2={-5.5} y2={88} stroke={MUTED} strokeWidth={0.25} />
    <text x={-8.8} y={44} textAnchor="middle" fontSize={2.6} fontFamily="ui-monospace, monospace" fill={LINE} transform="rotate(-90 -8.8 44)">88 mm</text>
    <text x={31.5} y={97.5} textAnchor="middle" fontSize={2.8} fontFamily="ui-monospace, monospace" fill={accent} letterSpacing={0.6}>{title}</text>
  </g>
);

const CardBlueprint = ({ accent }: { accent: string }) => (
  <figure>
    <div className="rounded-2xl border border-border overflow-hidden" style={{ background: "#0b0f14" }}>
      <svg viewBox="0 0 210 122" className="w-full h-auto" role="img" aria-label="Wireframe técnico da carta, frente e verso, 63 por 88 milímetros">
        <defs>
          <pattern id="bp-grid" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M5 0H0V5" fill="none" stroke="#1f2937" strokeWidth="0.2" />
          </pattern>
        </defs>
        <rect width="210" height="122" fill="url(#bp-grid)" />
        <Card ox={22} title="FRENTE" zones={front} accent={accent} solid />
        <Card ox={115} title="VERSO" zones={back} accent={accent} />
        {/* chamadas */}
        <g fontFamily="ui-monospace, monospace" fontSize={2.4} fill={MUTED}>
          <path d="M178 16 L184 10 L207 10" fill="none" stroke={MUTED} strokeWidth={0.25} />
          <text x={207} y={9} textAnchor="end">cantos R3</text>
          <path d="M181 70 L187 76 L207 76" fill="none" stroke={BLEED} strokeWidth={0.25} />
          <text x={207} y={79.5} textAnchor="end" fill={BLEED}>sangria 3 mm</text>
        </g>
      </svg>
    </div>
    <figcaption className="font-mono text-[11px] tracking-wide text-muted-foreground mt-3">
      Redesenhado para o portfólio a partir do gabarito de produção: 63 × 88 mm, cantos R3 e sangria de 3 mm. As posições
      das áreas foram medidas no arquivo original.
    </figcaption>
  </figure>
);

export default CardBlueprint;
