import { Button, Field } from '../../components/ui'
import { useApp } from '../../lib/store'

export function AboutYou() {
  const onboarding = useApp((s) => s.onboarding)
  const setObField = useApp((s) => s.setObField)
  const submitAboutYou = useApp((s) => s.submitAboutYou)

  return (
    <div className="h-full flex flex-col px-6 pt-6 pb-7 gap-5 overflow-auto no-scrollbar">
      <div className="card-meta">Step 1 of 3</div>
      <div>
        <h3>Let's start with you</h3>
        <p className="text-text-muted text-[12.5px] mt-1">Just your name — we keep this short.</p>
      </div>
      <div className="flex flex-col gap-3.5">
        <Field label="Full name">
          <input
            className="input"
            value={onboarding.name}
            onChange={(e) => setObField('name', e.target.value)}
            placeholder="Jaime"
          />
        </Field>
      </div>
      <Button block className="h-11 mt-auto" onClick={submitAboutYou}>
        Continue
      </Button>
    </div>
  )
}
