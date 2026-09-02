export function fmtTime(sec: number): string {
  const s = Math.max(0, Math.round(sec))
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${String(r).padStart(2, '0')}`
}

export function fmtPace(elapsedSec: number, distanceKm: number): string {
  if (distanceKm <= 0) return '--:--'
  return fmtTime(elapsedSec / distanceKm)
}
