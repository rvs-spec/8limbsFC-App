import clsx from 'clsx'
import { Button, Card } from '../../components/ui'
import { CheckIcon } from '../../components/icons'
import { WORKOUT_TODAY } from '../../lib/data'
import { useApp } from '../../lib/store'

export function WorkoutActive() {
  const checked = useApp((s) => s.workout.checked)
  const toggleExercise = useApp((s) => s.toggleExercise)
  const finishWorkout = useApp((s) => s.finishWorkout)

  const doneCount = checked.filter(Boolean).length

  return (
    <div className="h-full flex flex-col px-5 pt-5 pb-3">
      <h3 className="mb-0.5">{WORKOUT_TODAY.name}</h3>
      <div className="card-meta mb-4">
        {doneCount} of {WORKOUT_TODAY.exercises.length} done
      </div>
      <div className="flex-1 overflow-auto no-scrollbar flex flex-col gap-2">
        {WORKOUT_TODAY.exercises.map((ex, i) => (
          <Card key={ex.name} className="flex-row items-center px-3 py-2.5 cursor-pointer" onClick={() => toggleExercise(i)}>
            <div
              className={clsx(
                'w-5 h-5 rounded-md border-[1.5px] border-accent flex-none flex items-center justify-center mr-2.5',
                checked[i] && 'bg-accent',
              )}
            >
              {checked[i] && <CheckIcon size={12} className="text-bg" />}
            </div>
            <div className="flex-1">
              <div className="card-title text-sm">{ex.name}</div>
            </div>
            <div className="card-meta">{ex.sets}</div>
          </Card>
        ))}
      </div>
      <Button block className="h-[46px] mt-3.5" onClick={finishWorkout}>
        Finish Workout
      </Button>
    </div>
  )
}
