import clsx from 'clsx'
import { Button, Field } from '../../components/ui'
import { useApp } from '../../lib/store'

export function Measurements() {
  const onboarding = useApp((s) => s.onboarding)
  const setObField = useApp((s) => s.setObField)
  const submitMeasurements = useApp((s) => s.submitMeasurements)

  return (
    <div className="h-full flex flex-col px-6 pt-6 pb-7 gap-5 overflow-auto no-scrollbar">
      <div className="card-meta">Step 2 of 3</div>
      <div>
        <h3>Your measurements</h3>
        <p className="text-text-muted text-[12.5px] mt-1">Used once, to work out your calorie target.</p>
      </div>
      <div className="flex gap-2.5">
        <div className="flex-1">
          <Field label="Height (cm)">
            <input
              className="input"
              type="number"
              value={onboarding.heightCm}
              onChange={(e) => setObField('heightCm', parseInt(e.target.value) || 0)}
            />
          </Field>
        </div>
        <div className="flex-1">
          <Field label="Weight (kg)">
            <input
              className="input"
              type="number"
              value={onboarding.weightKg}
              onChange={(e) => setObField('weightKg', parseInt(e.target.value) || 0)}
            />
          </Field>
        </div>
      </div>
      <div className="w-1/2">
        <Field label="Age">
          <input
            className="input"
            type="number"
            value={onboarding.age}
            onChange={(e) => setObField('age', parseInt(e.target.value) || 0)}
          />
        </Field>
      </div>
      <div className="flex gap-2">
        <button
          className={clsx('btn h-10 flex-1 border', onboarding.gender === 'female' ? 'btn-primary' : 'btn-secondary')}
          onClick={() => setObField('gender', 'female')}
        >
          Female
        </button>
        <button
          className={clsx('btn h-10 flex-1 border', onboarding.gender === 'male' ? 'btn-primary' : 'btn-secondary')}
          onClick={() => setObField('gender', 'male')}
        >
          Male
        </button>
      </div>
      <Button block className="h-11 mt-auto" onClick={submitMeasurements}>
        Continue
      </Button>
    </div>
  )
}
