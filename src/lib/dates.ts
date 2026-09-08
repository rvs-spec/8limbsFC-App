export function startOfTodayISO(): string {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d.toISOString()
}

export function startOfWeekISO(): string {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  const day = (d.getDay() + 6) % 7 // Monday = 0
  d.setDate(d.getDate() - day)
  return d.toISOString()
}

/** "Today" / "Yesterday" / "3 days ago" / a short date further back. */
export function relativeDate(iso: string): string {
  const then = new Date(iso)
  const startOfThen = new Date(then)
  startOfThen.setHours(0, 0, 0, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const days = Math.round((today.getTime() - startOfThen.getTime()) / 86_400_000)

  if (days <= 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  return then.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

/** "Now" / "9:41 AM" for same-day entries, else a short date. */
export function relativeTime(iso: string): string {
  const then = new Date(iso)
  const diffMs = Date.now() - then.getTime()
  if (diffMs < 60_000) return 'Now'
  const startOfThen = new Date(then)
  startOfThen.setHours(0, 0, 0, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (startOfThen.getTime() === today.getTime()) {
    return then.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
  }
  return relativeDate(iso)
}
