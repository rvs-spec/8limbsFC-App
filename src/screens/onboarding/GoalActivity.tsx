import clsx from 'clsx'
import { Button, Card } from '../../components/ui'
import { ACTIVITIES, GOALS } from '../../lib/data'
import { useApp } from '../../lib/store'

export function GoalActivity() {
  const onboarding = useApp((s) => s.onboarding)
  const setObField = useApp((s) => s.setObField)
  const buildPlan = useApp((s) => s.buildPlan)

  return (
    <div className="h-full flex flex-col px-6 pt-6 pb-7 gap-4 overflow-auto no-scrollbar">
      <div className="card-meta">Step 3 of 3</div>
      <div>
        <h3>What are you training for?</h3>
        <p className="text-text-muted text-[12.5px] mt-1">Pick the one that matters most right now.</p>
      </div>
      <div className="flex flex-col gap-2">
        {GOALS.map((g) => (
          <Card
            key={g.key}
            elevated={onboarding.goal === g.key}
            className="py-3 px-3.5 gap-0.5"
            onClick={() => setObField('goal', g.key)}
          >
            <div className="card-title text-sm">{g.name}</div>
            <div className="card-meta">{g.desc}</div>
          </Card>
        ))}
      </div>
      <div className="card-meta mt-1.5">Activity level</div>
      <div className="flex gap-2">
        {ACTIVITIES.map((a) => (
          <button
            key={a.key}
            className={clsx('btn h-[38px] flex-1 text-[12.5px] border', onboarding.activity === a.key ? 'btn-primary' : 'btn-secondary')}
            onClick={() => setObField('activity', a.key)}
          >
            {a.name}
          </button>
        ))}
      </div>
      <Button block className="h-11 mt-auto" onClick={buildPlan}>
        Build My Plan
      </Button>
    </div>
  )
}
