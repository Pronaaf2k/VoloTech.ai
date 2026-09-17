import type { ReactNode } from "react";

type Kind = "services" | "work" | "process" | "support";

export function HeroAside({ kind, children }: { kind: Kind; children: ReactNode }) {
  return <div className="hero-aside"><div className="page-illustration" aria-hidden="true"><svg viewBox="0 0 400 220" fill="none">
    <defs>
      <linearGradient id={`panel-${kind}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="var(--surface)" /><stop offset="1" stopColor="var(--bg)" /></linearGradient>
      <linearGradient id={`orange-${kind}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ffb477" /><stop offset="1" stopColor="#e65b23" /></linearGradient>
    </defs>
    {kind === "services" ? <g strokeLinejoin="round">
      {[52, 26, 0].map((y, i) => <g key={y} transform={`translate(0 ${y})`}><path d="M82 93 206 34 329 91 204 154Z" fill={i === 2 ? `url(#orange-${kind})` : `url(#panel-${kind})`} stroke={i === 2 ? "var(--accent)" : "var(--line)"} /><path d="M82 93v10l122 61 125-63V91l-125 63Z" fill="var(--surface)" stroke="var(--line)" /></g>)}
      <path d="m171 81-22 12 22 11m65-23 22 12-22 11m-25-29-17 36" stroke="#54220e" strokeWidth="3" strokeLinecap="round" />
    </g> : null}
    {kind === "work" ? <g strokeLinejoin="round">
      <path d="M79 155h65l36-39h91" stroke="var(--accent)" strokeWidth="2" strokeDasharray="5 6" />
      <rect x="116" y="40" width="204" height="124" rx="9" fill={`url(#panel-${kind})`} stroke="var(--line)" />
      <path d="M116 65h204" stroke="var(--line)" /><circle cx="131" cy="53" r="3" fill="var(--accent)" /><circle cx="143" cy="53" r="3" fill="var(--line)" />
      <rect x="134" y="83" width="69" height="62" rx="4" fill={`url(#orange-${kind})`} />
      <path d="M220 89h78m-78 15h56m-56 22h70m-70 14h43" stroke="var(--muted)" strokeWidth="3" strokeLinecap="round" />
      <rect x="62" y="93" width="61" height="108" rx="9" fill="var(--bg)" stroke="var(--muted)" /><path d="M82 104h20" stroke="var(--line)" strokeWidth="3" strokeLinecap="round" />
      <rect x="71" y="119" width="43" height="46" rx="4" fill={`url(#orange-${kind})`} /><path d="M73 178h36m-36 9h24" stroke="var(--muted)" strokeWidth="2" />
    </g> : null}
    {kind === "process" ? <g strokeLinejoin="round">
      <path d="m66 158 80-49 86 29 98-76" stroke="var(--accent)" strokeWidth="2" strokeDasharray="5 6" />
      {[[66, 146], [146, 98], [232, 126], [330, 51]].map(([x, y], i) => <g key={x} transform={`translate(${x} ${y})`}>
        <path d="m-30 0 30-17L30 0v22L0 40-30 22Z" fill={`url(#panel-${kind})`} stroke="var(--line)" />
        <path d="m-30 0 30-17L30 0 0 18Z" fill={i === 3 ? `url(#orange-${kind})` : "var(--surface)"} stroke={i === 3 ? "var(--accent)" : "var(--line)"} />
        <path d="M0 18v22" stroke="var(--line)" />
        {i === 3 ? <path d="m-9 0 6 5L10-4" stroke="#54220e" strokeWidth="2.5" strokeLinecap="round" /> : <circle cy="1" r="4" fill="var(--accent)" />}
      </g>)}
    </g> : null}
    {kind === "support" ? <g>
      <rect x="85" y="37" width="230" height="139" rx="12" fill={`url(#panel-${kind})`} stroke="var(--line)" />
      <path d="M103 68h194M103 95h194M103 122h194M103 149h194M140 54v105M181 54v105M222 54v105M263 54v105" stroke="var(--line)" opacity=".35" />
      <path d="M101 119h41l16-27 19 48 21-68 22 47h36l15-22 13 22h14" stroke={`url(#orange-${kind})`} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M178 176v17h44v-17m-63 22h82" stroke="var(--muted)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="312" cy="158" r="26" fill="var(--surface)" stroke="var(--accent)" /><path d="m300 158 8 8 16-18" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </g> : null}
  </svg></div>{children}</div>;
}
