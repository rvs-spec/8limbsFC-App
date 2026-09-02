import { Button, Card } from '../../components/ui'
import { WORKOUT_TODAY } from '../../lib/data'
import { useApp } from '../../lib/store'

export function WorkoutHub() {
  const workout = useApp((s) => s.workout)
  const startWorkout = useApp((s) => s.startWorkout)

  return (
    <div className="flex-1 overflow-auto no-scrollbar px-5 pt-5 pb-3">
      <h3 className="mb-4">Workout</h3>
      <Card elevated className="mb-4">
        <div className="card-meta">Today's workout</div>
        <div className="card-title">{WORKOUT_TODAY.name}</div>
        <div className="card-meta">
          {WORKOUT_TODAY.exercises.length} exercises · about {WORKOUT_TODAY.duration}
        </div>
        <div className="flex flex-col gap-1 my-1.5">
          {WORKOUT_TODAY.exercises.map((ex) => (
            <div key={ex.name} className="flex justify-between text-[12.5px]">
              <span>{ex.name}</span>
              <span className="text-text-muted">{ex.sets}</span>
            </div>
          ))}
        </div>
        <Button className="h-10 mt-1.5" onClick={startWorkout}>
          Start Workout
        </Button>
      </Card>

      <h6 className="mb-2 text-text-muted">This week</h6>
      <Card className="flex-row items-center justify-between px-3.5 py-3 mb-5">
        <div className="card-title text-sm">
          {workout.sessionsDone} of {workout.sessionsGoal} sessions done
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: workout.sessionsGoal }, (_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: i < workout.sessionsDone ? '#F9B21A' : '#2a2a2a' }}
            />
          ))}
        </div>
      </Card>

      <h6 className="mb-2 text-text-muted">History</h6>
      <div className="flex flex-col gap-2">
        {workout.history.map((w, i) => (
          <Card key={i} className="flex-row items-center px-3 py-2.5">
            <div className="flex-1">
              <div className="card-title text-sm">{w.name}</div>
              <div className="card-meta">
                {w.date} · {w.exerciseCount} exercises · {w.duration}
              </div>
            </div>
          </Card>
        ))}
        {workout.history.length === 0 && <div className="card-meta">No workouts logged yet.</div>}
      </div>
    </div>
  )
}
