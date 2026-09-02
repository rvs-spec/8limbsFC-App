import { Card, Tag } from '../components/ui'
import { MealIcon, RunIcon, WalkIcon, WorkoutIcon } from '../components/icons'
import { WORKOUT_TODAY } from '../lib/data'
import { useApp } from '../lib/store'

const DEFAULT_PLAN = { calories: 2400, protein: 160, carbs: 260, fat: 80 }

export function Home() {
  const userName = useApp((s) => s.userName)
  const plan = useApp((s) => s.plan) ?? DEFAULT_PLAN
  const nutrition = useApp((s) => s.nutrition)
  const history = useApp((s) => s.history)
  const go = useApp((s) => s.go)
  const startRun = useApp((s) => s.startRun)
  const startWalk = useApp((s) => s.startWalk)
  const openAddMeal = useApp((s) => s.openAddMeal)

  const initial = (userName || 'A')[0].toUpperCase()

  return (
    <div className="flex-1 overflow-auto no-scrollbar px-5 pt-5 pb-3">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <div className="text-[11px] tracking-[0.08em] uppercase text-accent">8 Limbs FC</div>
          <h3 className="mt-0.5">Good morning, {userName}</h3>
        </div>
        <div className="w-9 h-9 rounded-full flex-none bg-accent text-bg flex items-center justify-center text-[13px] font-heading">
          {initial}
        </div>
      </div>

      <Card className="px-3.5 py-3 gap-2 mb-5">
        <div className="card-meta">Your daily targets</div>
        <div className="grid grid-cols-4 gap-1.5">
          <div>
            <div className="card-title text-base">{plan.calories}</div>
            <div className="card-meta">kcal</div>
          </div>
          <div>
            <div className="card-title text-base">{plan.protein}g</div>
            <div className="card-meta">Protein</div>
          </div>
          <div>
            <div className="card-title text-base">{plan.carbs}g</div>
            <div className="card-meta">Carbs</div>
          </div>
          <div>
            <div className="card-title text-base">{plan.fat}g</div>
            <div className="card-meta">Fat</div>
          </div>
        </div>
      </Card>

      <h6 className="mb-2.5 text-text-muted">Start here</h6>
      <div className="grid grid-cols-2 gap-2.5 mb-5">
        <Card elevated onClick={startRun}>
          <RunIcon size={22} className="text-accent" />
          <div className="card-title text-[14.5px]">Start Run</div>
          <div className="card-meta">Live map · pace · distance</div>
        </Card>
        <Card elevated onClick={() => go('workout-hub')}>
          <WorkoutIcon size={22} className="text-accent" />
          <div className="card-title text-[14.5px]">Start Workout</div>
          <div className="card-meta">{WORKOUT_TODAY.name}</div>
        </Card>
        <Card elevated onClick={startWalk}>
          <WalkIcon size={22} className="text-accent" />
          <div className="card-title text-[14.5px]">Start Walk</div>
          <div className="card-meta">Steps · distance · calories</div>
        </Card>
        <Card
          elevated
          onClick={() => {
            go('nutrition')
            openAddMeal()
          }}
        >
          <MealIcon size={22} className="text-accent" />
          <div className="card-title text-[14.5px]">Log Meal</div>
          <div className="card-meta">
            {nutrition.logged.calories} / {plan.calories} kcal today
          </div>
        </Card>
      </div>

      <h6 className="mb-2.5 text-text-muted">Recent activity</h6>
      <div className="flex flex-col gap-2">
        {history.slice(0, 2).map((h, i) => (
          <Card key={i} className="flex-row items-center px-3 py-2.5">
            <div className="flex-1">
              <div className="card-title text-sm">
                {h.type} · {h.distance} km
              </div>
              <div className="card-meta">
                {h.date} · {h.duration}
              </div>
            </div>
            <Tag>{h.calories} kcal</Tag>
          </Card>
        ))}
        {history.length === 0 && <div className="card-meta">Nothing yet — go for a run or log a workout.</div>}
      </div>
    </div>
  )
}
