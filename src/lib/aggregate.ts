import type { HistoryEntry } from './types'

function parseDurationSec(duration: string): number {
  const [m, s] = duration.split(':').map(Number)
  return (m || 0) * 60 + (s || 0)
}

export function fmtDurationLong(totalSec: number): string {
  const h = Math.floor(totalSec / 3600)
  const m = Math.round((totalSec % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

export function summarizeRuns(history: HistoryEntry[]) {
  const runs = history.filter((h) => h.type === 'Run')
  const distance = runs.reduce((sum, r) => sum + (parseFloat(r.distance) || 0), 0)
  const time = runs.reduce((sum, r) => sum + parseDurationSec(r.duration), 0)
  return { count: runs.length, distance: distance.toFixed(1), time: fmtDurationLong(time) }
}
