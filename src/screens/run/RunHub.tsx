import { Button, Card, Tag } from '../../components/ui'
import { summarizeRuns } from '../../lib/aggregate'
import { useApp } from '../../lib/store'

export function RunHub() {
  const lastRun = useApp((s) => s.lastRun)
  const history = useApp((s) => s.history)
  const startRun = useApp((s) => s.startRun)
  const week = summarizeRuns(history)

  return (
    <div className="flex-1 overflow-auto no-scrollbar px-5 pt-5 pb-3">
      <h3 className="mb-4">Run</h3>
      <Button block className="h-[46px] mb-5" onClick={startRun}>
        Start Run
      </Button>
      <h6 className="mb-2 text-text-muted">Last run</h6>
      <Card className="mb-5">
        <div className="card-title text-sm">Run</div>
        <div className="card-meta">
          {lastRun.distance} km · {lastRun.duration} · {lastRun.pace}/km
        </div>
        <Tag variant="neutral" className="self-start mt-1">
          {lastRun.calories} cal
        </Tag>
      </Card>
      <h6 className="mb-2 text-text-muted">This week</h6>
      <div className="grid grid-cols-3 gap-2">
        <Card className="p-2.5 gap-0.5 items-center">
          <div className="card-title text-base">{week.distance} km</div>
          <div className="card-meta">Distance</div>
        </Card>
        <Card className="p-2.5 gap-0.5 items-center">
          <div className="card-title text-base">{week.count}</div>
          <div className="card-meta">Runs</div>
        </Card>
        <Card className="p-2.5 gap-0.5 items-center">
          <div className="card-title text-base">{week.time}</div>
          <div className="card-meta">Time</div>
        </Card>
      </div>
    </div>
  )
}
