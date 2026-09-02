const R = 26
const CIRC = 2 * Math.PI * R

export function MacroRing({ pct, color, size = 66 }: { pct: number; color: string; size?: number }) {
  const clamped = Math.min(Math.max(pct, 0), 1)
  const dash = `${(CIRC * clamped).toFixed(1)} ${CIRC.toFixed(1)}`
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 64 64" width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="32" cy="32" r={R} fill="none" stroke="#1c1c1c" strokeWidth="6" />
        <circle
          cx="32"
          cy="32"
          r={R}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={dash}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-heading text-xs">
        {Math.round(clamped * 100)}%
      </div>
    </div>
  )
}

export function StepRing({ pct, size = 200 }: { pct: number; size?: number }) {
  const r = 42
  const circ = 2 * Math.PI * r
  const clamped = Math.min(Math.max(pct, 0), 1)
  const dash = `${(circ * clamped).toFixed(1)} ${circ.toFixed(1)}`
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx="50" cy="50" r={r} fill="none" stroke="#1c1c1c" strokeWidth="8" />
      <circle cx="50" cy="50" r={r} fill="none" stroke="#F9B21A" strokeWidth="8" strokeLinecap="round" strokeDasharray={dash} />
    </svg>
  )
}
