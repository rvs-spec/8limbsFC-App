import { Button, Card } from '../../components/ui'
import { GOALS } from '../../lib/data'
import { useApp } from '../../lib/store'

export function PlanSummary() {
  const onboarding = useApp((s) => s.onboarding)
  const plan = useApp((s) => s.plan)
  const startMyPlan = useApp((s) => s.startMyPlan)

  if (!plan) return null
  const goalLabel = (GOALS.find((g) => g.key === onboarding.goal) ?? GOALS[2]).name.toLowerCase()

  return (
    <div className="h-full flex flex-col px-6 pt-6 pb-7 gap-5 overflow-auto no-scrollbar">
      <div className="card-meta">Your plan</div>
      <div>
        <h3>Your daily targets</h3>
        <p className="text-text-muted text-[12.5px] mt-1">Based on your height, weight and goal — {goalLabel}.</p>
      </div>
      <Card elevated className="items-center p-5">
        <div className="font-heading text-[44px]">{plan.calories}</div>
        <div className="card-meta">calories a day</div>
      </Card>
      <div className="grid grid-cols-3 gap-2">
        <Card className="p-3 gap-0.5 items-center">
          <div className="card-title text-base">{plan.protein}g</div>
          <div className="card-meta">Protein</div>
        </Card>
        <Card className="p-3 gap-0.5 items-center">
          <div className="card-title text-base">{plan.carbs}g</div>
          <div className="card-meta">Carbs</div>
        </Card>
        <Card className="p-3 gap-0.5 items-center">
          <div className="card-title text-base">{plan.fat}g</div>
          <div className="card-meta">Fat</div>
        </Card>
      </div>
      <p className="text-text-muted text-[11.5px]">
        Runs, walks and workouts add calories back as you train. You can change any of this later in Account.
      </p>
      <Button block className="h-11 mt-auto" onClick={startMyPlan}>
        Start My Plan
      </Button>
    </div>
  )
}
