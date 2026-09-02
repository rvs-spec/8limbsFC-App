import { Button, Field } from '../../components/ui'
import { MEAL_PRESETS } from '../../lib/data'
import { useApp } from '../../lib/store'

export function AddMealDialog() {
  const newMeal = useApp((s) => s.nutrition.newMeal)
  const setNewMealField = useApp((s) => s.setNewMealField)
  const addMealTotals = useApp((s) => s.addMealTotals)
  const addCustomMeal = useApp((s) => s.addCustomMeal)
  const closeAddMeal = useApp((s) => s.closeAddMeal)

  return (
    <div className="dialog-backdrop" onClick={closeAddMeal}>
      <div className="dialog w-[min(320px,88%)]" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-title">Log a meal</div>
        <div className="flex flex-wrap gap-1.5">
          {MEAL_PRESETS.map((p) => (
            <button
              key={p.name}
              className="tag tag-outline cursor-pointer bg-transparent"
              onClick={() => addMealTotals(p.name, p.kcal, p.p, p.c, p.f)}
            >
              {p.name}
            </button>
          ))}
        </div>
        <div className="hr" />
        <Field label="Name">
          <input
            className="input"
            value={newMeal.name}
            onChange={(e) => setNewMealField('name', e.target.value)}
            placeholder="Custom meal"
          />
        </Field>
        <div className="flex gap-2">
          <div className="flex-1">
            <Field label="Kcal">
              <input className="input" value={newMeal.kcal} onChange={(e) => setNewMealField('kcal', e.target.value)} placeholder="0" />
            </Field>
          </div>
          <div className="flex-1">
            <Field label="Protein">
              <input className="input" value={newMeal.p} onChange={(e) => setNewMealField('p', e.target.value)} placeholder="0" />
            </Field>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <Field label="Carbs">
              <input className="input" value={newMeal.c} onChange={(e) => setNewMealField('c', e.target.value)} placeholder="0" />
            </Field>
          </div>
          <div className="flex-1">
            <Field label="Fat">
              <input className="input" value={newMeal.f} onChange={(e) => setNewMealField('f', e.target.value)} placeholder="0" />
            </Field>
          </div>
        </div>
        <div className="dialog-actions">
          <Button variant="secondary" onClick={closeAddMeal}>
            Cancel
          </Button>
          <Button onClick={addCustomMeal} disabled={!newMeal.name || !newMeal.kcal}>
            Add meal
          </Button>
        </div>
      </div>
    </div>
  )
}
