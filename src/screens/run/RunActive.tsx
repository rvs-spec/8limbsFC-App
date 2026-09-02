import { Button } from '../../components/ui'
import { PauseIcon, PlayIcon } from '../../components/icons'
import { useDistanceTracker } from '../../lib/geo'
import { LOOP_KM, MAP_WAYPOINTS, RUN_CAL_PER_KM } from '../../lib/data'
import { fmtPace, fmtTime } from '../../lib/format'
import { useApp } from '../../lib/store'

function dotPosition(distance: number) {
  const frac = ((distance % LOOP_KM) / LOOP_KM) * (MAP_WAYPOINTS.length - 1)
  const i0 = Math.floor(frac)
  const i1 = Math.min(i0 + 1, MAP_WAYPOINTS.length - 1)
  const t = frac - i0
  const p0 = MAP_WAYPOINTS[i0] ?? MAP_WAYPOINTS[0]
  const p1 = MAP_WAYPOINTS[i1] ?? MAP_WAYPOINTS[0]
  return {
    left: (p0[0] + (p1[0] - p0[0]) * t).toFixed(1),
    top: (p0[1] + (p1[1] - p0[1]) * t).toFixed(1),
  }
}

export function RunActive() {
  const run = useApp((s) => s.run)
  const tickRun = useApp((s) => s.tickRun)
  const toggleRunPause = useApp((s) => s.toggleRunPause)
  const finishRun = useApp((s) => s.finishRun)

  const mode = useDistanceTracker(run.status === 'active', tickRun, 0.0032)
  const dot = dotPosition(run.distance)
  const pace = fmtPace(run.elapsed, run.distance)

  return (
    <div className="h-full flex flex-col">
      <div
        className="relative h-[250px] m-3.5 rounded-lg overflow-hidden flex-none"
        style={{ background: 'linear-gradient(160deg,#1b1e30,#12131e)' }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(233,233,237,0.06) 0 1px, transparent 1px 26px), repeating-linear-gradient(90deg, rgba(233,233,237,0.06) 0 1px, transparent 1px 26px)',
          }}
        />
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <path
            d="M12,78 L8,55 L18,30 L40,15 L62,10 L82,20 L90,42 L85,65 L68,82 L45,88 L25,85 L12,78"
            fill="none"
            stroke="#d99a12"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </svg>
        <div
          className="absolute w-3.5 h-3.5 rounded-full bg-accent transition-[left,top] duration-500"
          style={{ left: `${dot.left}%`, top: `${dot.top}%`, transform: 'translate(-50%,-50%)', boxShadow: '0 0 0 4px rgba(249,178,26,0.3)' }}
        />
        <div className="absolute top-2.5 left-3 text-[10.5px] tracking-[0.08em] uppercase text-text-muted">
          Live route {mode === 'gps' ? '· GPS' : ''}
        </div>
      </div>

      <div className="px-5 text-center mb-4">
        <div className="text-[11px] tracking-[0.08em] uppercase text-text-muted">Distance</div>
        <div className="font-heading text-[48px] leading-none my-1">
          {run.distance.toFixed(2)}
          <span className="text-xl text-text-muted"> km</span>
        </div>
        <div className="flex justify-center gap-7 mt-3">
          <div>
            <div className="text-lg font-heading">{fmtTime(run.elapsed)}</div>
            <div className="card-meta justify-center">Time</div>
          </div>
          <div>
            <div className="text-lg font-heading">{pace}</div>
            <div className="card-meta justify-center">Pace /km</div>
          </div>
          <div>
            <div className="text-lg font-heading">{Math.round(run.distance * RUN_CAL_PER_KM)}</div>
            <div className="card-meta justify-center">kcal</div>
          </div>
        </div>
      </div>

      <div className="mt-auto px-7 pb-5 flex justify-center items-center gap-5">
        <Button variant="icon" className="w-[60px] h-[60px] rounded-full" onClick={toggleRunPause} aria-label="Pause or resume">
          {run.status === 'paused' ? <PlayIcon /> : <PauseIcon />}
        </Button>
        <Button className="h-[60px] px-6 rounded-full" onClick={finishRun}>
          Finish Run
        </Button>
      </div>
    </div>
  )
}
