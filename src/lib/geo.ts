import { useEffect, useRef, useState } from 'react'

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export type TrackMode = 'gps' | 'simulated'

/**
 * Drives a run/walk session: a 1s timer always ticks elapsed time; distance
 * comes from real GPS (haversine between successive fixes) when geolocation
 * permission is granted and fixes are arriving, otherwise falls back to a
 * fixed per-second simulated pace so the feature still works on desktop or
 * without location permission.
 */
export function useDistanceTracker(
  active: boolean,
  onTick: (deltaSec: number, deltaKm: number) => void,
  simulatedKmPerSec: number,
) {
  const [mode, setMode] = useState<TrackMode>('simulated')
  const onTickRef = useRef(onTick)
  onTickRef.current = onTick
  const lastFix = useRef<{ lat: number; lon: number; t: number } | null>(null)
  const lastGpsAt = useRef(0)

  useEffect(() => {
    if (!active) return

    const timer = setInterval(() => {
      const usingGps = Date.now() - lastGpsAt.current < 8000
      onTickRef.current(1, usingGps ? 0 : simulatedKmPerSec)
    }, 1000)

    let watchId: number | null = null
    if ('geolocation' in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords
          const now = Date.now()
          if (lastFix.current) {
            const d = haversineKm(lastFix.current.lat, lastFix.current.lon, latitude, longitude)
            // Ignore GPS jitter: only count plausible movement (>1m, <60 km/h).
            const dtHr = (now - lastFix.current.t) / 3_600_000
            if (d > 0.001 && (dtHr <= 0 || d / dtHr < 60)) {
              onTickRef.current(0, d)
              lastGpsAt.current = now
              setMode('gps')
            }
          }
          lastFix.current = { lat: latitude, lon: longitude, t: now }
        },
        () => {
          // permission denied or unavailable — simulated fallback keeps running
        },
        { enableHighAccuracy: true, maximumAge: 2000, timeout: 8000 },
      )
    }

    return () => {
      clearInterval(timer)
      if (watchId !== null) navigator.geolocation.clearWatch(watchId)
      lastFix.current = null
    }
  }, [active, simulatedKmPerSec])

  return mode
}
