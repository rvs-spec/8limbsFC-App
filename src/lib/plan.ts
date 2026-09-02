import { ACTIVITIES, GOALS } from './data'
import type { Onboarding, Plan } from './types'

/**
 * Mifflin-St Jeor BMR, scaled by activity multiplier, shifted by the goal's
 * calorie delta. Protein is set per bodyweight (higher for the build-muscle
 * goal), fat fixed at 25% of calories, carbs fill the remainder.
 */
export function computePlan(ob: Onboarding): Plan {
  const bmr =
    ob.gender === 'male'
      ? 10 * ob.weightKg + 6.25 * ob.heightCm - 5 * ob.age + 5
      : 10 * ob.weightKg + 6.25 * ob.heightCm - 5 * ob.age - 161

  const activity = ACTIVITIES.find((a) => a.key === ob.activity) ?? ACTIVITIES[1]
  const goal = GOALS.find((g) => g.key === ob.goal) ?? GOALS[2]

  const calories = Math.round((bmr * activity.mult + goal.delta) / 10) * 10
  const protein = Math.round(ob.weightKg * (ob.goal === 'build' ? 2 : 1.8))
  const fat = Math.round((calories * 0.25) / 9)
  const carbs = Math.round((calories - protein * 4 - fat * 9) / 4)

  return { calories, protein, carbs, fat }
}
