import { Button, Card } from '../../components/ui'
import { CheckIcon } from '../../components/icons'
import { useApp } from '../../lib/store'

export function RunSummary() {
  const lastRun = useApp((s) => s.lastRun)
  const runSummaryDone = useApp((s) => s.runSummaryDone)

  return (
    <div className="flex-1 overflow-auto no-scrollbar px-6 pt-6 pb-4 text-center">
      <div className="w-11 h-11 rounded-full border-2 border-accent text-accent flex items-center justify-center mx-auto mb-3">
        <CheckIcon />
      </div>
      <h4>Run complete</h4>
      <p className="text-text-muted text-[12.5px] mt-1">Nice work. That's {lastRun.calories} calories back.</p>
      <div
        className="relative h-[120px] my-4 rounded-lg overflow-hidden"
        style={{ background: 'linear-gradient(160deg,#1b1e30,#12131e)' }}
      >
        <svg viewBox="0 0 100 50" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <path
            d="M8,40 L20,30 L34,34 L48,18 L62,22 L78,10 L92,14"
            fill="none"
            stroke="#F9B21A"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="8" cy="40" r="3" fill="#F9B21A" />
          <circle cx="92" cy="14" r="3" fill="#F9B21A" />
        </svg>
      </div>
      <div className="grid grid-cols-2 gap-2 text-left mb-5">
        <Card className="px-3 py-2.5 gap-0.5">
          <div className="card-title text-base">{lastRun.distance} km</div>
          <div className="card-meta">Distance</div>
        </Card>
        <Card className="px-3 py-2.5 gap-0.5">
          <div className="card-title text-base">{lastRun.duration}</div>
          <div className="card-meta">Time</div>
        </Card>
        <Card className="px-3 py-2.5 gap-0.5">
          <div className="card-title text-base">{lastRun.pace}/km</div>
          <div className="card-meta">Avg pace</div>
        </Card>
        <Card className="px-3 py-2.5 gap-0.5">
          <div className="card-title text-base">{lastRun.calories} cal</div>
          <div className="card-meta">Burned</div>
        </Card>
      </div>
      <Button variant="secondary" block className="h-11 mb-2.5" onClick={runSummaryDone}>
        Log your Run
      </Button>
      <Button variant="ghost" block className="h-10" onClick={runSummaryDone}>
        Done
      </Button>
    </div>
  )
}
