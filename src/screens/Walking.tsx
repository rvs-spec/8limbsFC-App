import { Button } from '../components/ui'
import { BackIcon, PauseIcon, PlayIcon } from '../components/icons'
import { StepRing } from '../components/MacroRing'
import { useDistanceTracker } from '../lib/geo'
import { WALK_CAL_PER_KM, WALK_GOAL } from '../lib/data'
import { fmtTime } from '../lib/format'
import { useApp } from '../lib/store'

export function Walking() {
  const walk = useApp((s) => s.walk)
  const tickWalk = useApp((s) => s.tickWalk)
  const toggleWalkPause = useApp((s) => s.toggleWalkPause)
  const finishWalk = useApp((s) => s.finishWalk)
  const goHome = useApp((s) => s.go)

  // ~0.0008 km per step (average stride) drives both the simulated fallback
  // and the steps estimate from real GPS distance.
  useDistanceTracker(
    walk.status === 'active',
    (deltaSec, deltaKm) => tickWalk(deltaSec, deltaKm > 0 ? Math.round(deltaKm / 0.0008) : 2, deltaKm > 0 ? deltaKm : 0.0016),
    0.0016,
  )

  const pct = walk.steps / WALK_GOAL

  return (
    <div className="h-full flex flex-col">
      {walk.status === 'idle' && (
        <div className="px-3.5 pt-1 pb-1.5">
          <Button variant="icon" onClick={() => goHome('home')} aria-label="Back">
            <BackIcon />
          </Button>
        </div>
      )}
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div className="relative w-[200px] h-[200px]">
          <StepRing pct={pct} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="font-heading text-[34px]">{walk.steps.toLocaleString()}</div>
            <div className="card-meta">of {WALK_GOAL.toLocaleString()} steps</div>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="text-center">
            <div className="text-lg font-heading">{fmtTime(walk.elapsed)}</div>
            <div className="card-meta justify-center">Time</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-heading">{walk.distance.toFixed(2)} km</div>
            <div className="card-meta justify-center">Distance</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-heading">{Math.round(walk.distance * WALK_CAL_PER_KM)}</div>
            <div className="card-meta justify-center">kcal</div>
          </div>
        </div>
      </div>
      <div className="px-7 pb-8 flex justify-center items-center gap-5">
        {walk.status === 'idle' ? (
          <button
            onClick={() => useApp.getState().startWalk()}
            className="w-[78px] h-[78px] rounded-full bg-accent border-none flex items-center justify-center cursor-pointer animate-pulseRing"
          >
            <PlayIcon size={26} className="text-bg" />
          </button>
        ) : (
          <>
            <Button variant="icon" className="w-[60px] h-[60px] rounded-full" onClick={toggleWalkPause} aria-label="Pause or resume">
              {walk.status === 'paused' ? <PlayIcon /> : <PauseIcon />}
            </Button>
            <Button className="h-[60px] px-6 rounded-full" onClick={finishWalk}>
              Finish
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
