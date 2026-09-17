export function StoryArt({ id }: { id: string }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface">
      <svg viewBox="0 0 640 240" className="h-auto w-full" aria-hidden="true">
        {id === "hejnal" || id === "wieze" ? <TowersArt /> : null}
        {id === "smok" ? <DragonArt /> : null}
        {id === "lajkonik" ? <HorseArt /> : null}
        {id === "golebie" ? <PigeonArt /> : null}
        {id === "rynek" ? <SquareArt /> : null}
      </svg>
    </div>
  );
}

function TowersArt() {
  return (
    <g>
      <rect width="640" height="240" fill="var(--color-bg)" />
      <rect x="210" y="70" width="70" height="170" fill="var(--color-primary)" />
      <polygon points="210,70 245,18 280,70" fill="var(--color-fg)" />
      <rect x="238" y="88" width="14" height="16" fill="var(--color-surface)" />
      <rect x="320" y="110" width="62" height="130" fill="var(--color-primary)" opacity="0.72" />
      <polygon points="320,110 351,68 382,110" fill="var(--color-fg)" />
      <rect x="0" y="220" width="640" height="20" fill="var(--color-border)" />
    </g>
  );
}

function DragonArt() {
  return (
    <g>
      <rect width="640" height="240" fill="var(--color-bg)" />
      <path d="M80 200 C 140 120 220 90 310 130 C 360 154 400 140 430 100" fill="none" stroke="var(--color-primary)" strokeWidth="14" />
      <circle cx="440" cy="92" r="18" fill="var(--color-fg)" />
      <rect x="480" y="40" width="120" height="180" fill="var(--color-map-earth)" />
      <rect x="0" y="210" width="640" height="30" fill="var(--color-map-built)" />
    </g>
  );
}

function HorseArt() {
  return (
    <g>
      <rect width="640" height="240" fill="var(--color-bg)" />
      <rect x="220" y="120" width="180" height="70" fill="var(--color-primary)" />
      <circle cx="250" cy="200" r="18" fill="var(--color-fg)" />
      <circle cx="370" cy="200" r="18" fill="var(--color-fg)" />
      <rect x="380" y="70" width="70" height="70" fill="var(--color-fg)" />
      <polygon points="450,70 510,90 450,110" fill="var(--color-primary)" />
    </g>
  );
}

function PigeonArt() {
  return (
    <g>
      <rect width="640" height="240" fill="var(--color-bg)" />
      <rect x="180" y="70" width="280" height="90" fill="var(--color-border)" />
      <circle cx="160" cy="190" r="16" fill="var(--color-muted)" />
      <circle cx="220" cy="198" r="12" fill="var(--color-muted)" />
      <circle cx="300" cy="188" r="18" fill="var(--color-muted)" />
      <circle cx="380" cy="196" r="14" fill="var(--color-muted)" />
      <rect x="0" y="208" width="640" height="32" fill="var(--color-map-built)" />
    </g>
  );
}

function SquareArt() {
  return (
    <g>
      <rect width="640" height="240" fill="var(--color-bg)" />
      <rect x="90" y="40" width="460" height="170" fill="none" stroke="var(--color-fg)" strokeWidth="3" />
      <rect x="240" y="90" width="160" height="70" fill="var(--color-primary)" />
      <line x1="90" y1="125" x2="550" y2="125" stroke="var(--color-border)" strokeWidth="2" />
    </g>
  );
}
