import type { Activity, Goal } from './types'

export const GOALS: { key: Goal; name: string; desc: string; delta: number }[] = [
  { key: 'lose', name: 'Lose Weight', desc: 'Steady deficit, keep the muscle', delta: -500 },
  { key: 'maintain', name: 'Maintain Weight', desc: 'Hold steady where you are', delta: 0 },
  { key: 'build', name: 'Build Muscle', desc: 'Slight surplus, higher protein', delta: 250 },
  { key: 'performance', name: 'Improve Performance', desc: 'Fuel for the training volume', delta: 150 },
]

export const ACTIVITIES: { key: Activity; name: string; mult: number }[] = [
  { key: 'light', name: 'Light', mult: 1.375 },
  { key: 'moderate', name: 'Moderate', mult: 1.55 },
  { key: 'active', name: 'Active', mult: 1.725 },
]

export const MEAL_PRESETS = [
  { name: 'Protein Shake', kcal: 220, p: 35, c: 8, f: 4 },
  { name: 'Chicken & Rice', kcal: 520, p: 42, c: 55, f: 12 },
  { name: 'Greek Yogurt Bowl', kcal: 310, p: 22, c: 34, f: 9 },
  { name: 'Salmon & Veg', kcal: 480, p: 38, c: 18, f: 26 },
]

export const FRIDGE_SEED = ['Eggs', 'Spinach', 'Bell Pepper', 'Cheddar Cheese', 'Chicken Breast', 'Greek Yogurt', 'Broccoli', 'Brown Rice']

export const RECIPES = [
  { name: 'Spinach & Cheddar Frittata', time: '20 min', kcal: 390, tags: ['Eggs', 'Spinach', 'Cheddar Cheese'] },
  { name: 'Chicken & Broccoli Stir-fry', time: '25 min', kcal: 520, tags: ['Chicken Breast', 'Broccoli', 'Brown Rice'] },
  { name: 'Bell Pepper Yogurt Bowl', time: '10 min', kcal: 280, tags: ['Bell Pepper', 'Greek Yogurt'] },
]

export const WORKOUT_TODAY = {
  name: 'Upper Body Strength',
  duration: '35 min',
  exercises: [
    { name: 'Bench Press', sets: '4×8' },
    { name: 'Incline Dumbbell Press', sets: '3×10' },
    { name: 'Seated Row', sets: '4×10' },
    { name: 'Lateral Raise', sets: '3×12' },
  ],
}

export const WALK_GOAL = 10000
export const RUN_CAL_PER_KM = 65
export const WALK_CAL_PER_KM = 50

export const MAP_WAYPOINTS: [number, number][] = [
  [12, 78], [8, 55], [18, 30], [40, 15], [62, 10], [82, 20], [90, 42], [85, 65], [68, 82], [45, 88], [25, 85], [12, 78],
]
export const LOOP_KM = 1.35
