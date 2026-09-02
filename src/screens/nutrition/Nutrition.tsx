import { Button, Card, Tag } from '../../components/ui'
import { MacroRing } from '../../components/MacroRing'
import { IngredientIcon, MealIcon, RecipeIcon, ScanIcon } from '../../components/icons'
import { AddMealDialog } from './AddMealDialog'
import { RUN_CAL_PER_KM, WALK_CAL_PER_KM } from '../../lib/data'
import { useApp } from '../../lib/store'

const DEFAULT_PLAN = { calories: 2400, protein: 160, carbs: 260, fat: 80 }

export function Nutrition() {
  const plan = useApp((s) => s.plan) ?? DEFAULT_PLAN
  const nutrition = useApp((s) => s.nutrition)
  const run = useApp((s) => s.run)
  const walk = useApp((s) => s.walk)
  const go = useApp((s) => s.go)
  const openAddMeal = useApp((s) => s.openAddMeal)

  const exerciseCalories = Math.round(run.distance * RUN_CAL_PER_KM + walk.distance * WALK_CAL_PER_KM)
  const caloriesRemaining = plan.calories - nutrition.logged.calories + exerciseCalories

  const macros: { key: 'protein' | 'carbs' | 'fat'; label: string; color: string }[] = [
    { key: 'protein', label: 'Protein', color: '#F9B21A' },
    { key: 'carbs', label: 'Carbs', color: '#F9B21A' },
    { key: 'fat', label: 'Fat', color: '#8a8a8a' },
  ]

  return (
    <div className="flex-1 overflow-auto no-scrollbar px-5 pt-5 pb-3">
      <h3 className="mb-0.5">Nutrition</h3>
      <div className="card-meta mb-4">
        {caloriesRemaining} calories remaining · {plan.calories} goal · {nutrition.meals.length} food · {exerciseCalories} exercise
      </div>

      <div className="flex justify-around mb-4">
        {macros.map((m) => {
          const logged = nutrition.logged[m.key]
          const target = plan[m.key]
          return (
            <div key={m.key} className="text-center">
              <MacroRing pct={target > 0 ? logged / target : 0} color={m.color} />
              <div className="text-[11.5px] mt-1.5 text-text/65">{m.label}</div>
              <div className="text-[11px] text-text-muted">
                {logged}/{target}g
              </div>
            </div>
          )
        })}
      </div>

      <Button block className="h-11 mb-3" onClick={openAddMeal}>
        + Log Food
      </Button>

      <div className="grid grid-cols-3 gap-2 mb-5">
        <Card elevated className="items-center px-1 py-2.5 gap-1.5 cursor-pointer" onClick={() => go('recipes')}>
          <RecipeIcon size={18} className="text-accent" />
          <div className="text-[11.5px]">Recipes</div>
        </Card>
        <Card elevated className="items-center px-1 py-2.5 gap-1.5 cursor-pointer" onClick={() => go('ingredients')}>
          <IngredientIcon size={18} className="text-accent" />
          <div className="text-[11.5px]">Ingredients</div>
        </Card>
        <Card elevated className="items-center px-1 py-2.5 gap-1.5 cursor-pointer" onClick={() => go('fridge-camera')}>
          <ScanIcon size={18} className="text-accent" />
          <div className="text-[11.5px]">Scan Fridge</div>
        </Card>
      </div>

      <h6 className="mb-2.5 text-text-muted">Today's meals</h6>
      <div className="flex flex-col gap-2">
        {nutrition.meals.length === 0 && <div className="card-meta">Nothing logged yet — start with breakfast.</div>}
        {nutrition.meals.map((meal, i) => (
          <Card key={i} className="flex-row items-center px-3 py-2.5">
            <div className="flex-1">
              <div className="card-title text-sm flex items-center gap-1.5">
                <MealIcon size={14} className="text-accent" /> {meal.name}
              </div>
              <div className="card-meta">
                {meal.time} · P{meal.p} C{meal.c} F{meal.f}
              </div>
            </div>
            <Tag variant="neutral">{meal.kcal} kcal</Tag>
          </Card>
        ))}
      </div>

      {nutrition.showAdd && <AddMealDialog />}
    </div>
  )
}
