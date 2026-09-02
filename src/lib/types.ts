export type Screen =
  | 'ob-welcome'
  | 'ob-1'
  | 'ob-2'
  | 'ob-3'
  | 'ob-plan'
  | 'home'
  | 'run-hub'
  | 'running'
  | 'run-summary'
  | 'walking'
  | 'workout-hub'
  | 'workout-active'
  | 'nutrition'
  | 'recipes'
  | 'ingredients'
  | 'fridge-camera'
  | 'fridge-ingredients'
  | 'fridge-results'
  | 'account'

export type Gender = 'male' | 'female'
export type Goal = 'lose' | 'maintain' | 'build' | 'performance'
export type Activity = 'light' | 'moderate' | 'active'

export interface Onboarding {
  name: string
  email: string
  heightCm: number
  weightKg: number
  age: number
  gender: Gender
  goal: Goal
  activity: Activity
}

export interface Plan {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export type TrackStatus = 'idle' | 'active' | 'paused'

export interface RunState {
  status: TrackStatus
  elapsed: number
  distance: number
}

export interface WalkState {
  status: TrackStatus
  elapsed: number
  steps: number
  distance: number
}

export interface LastRun {
  distance: string
  duration: string
  pace: string
  calories: number
}

export interface HistoryEntry {
  type: 'Run' | 'Walk'
  date: string
  distance: string
  duration: string
  calories: number
}

export interface WorkoutHistoryEntry {
  name: string
  date: string
  exerciseCount: number
  duration: string
}

export interface WorkoutState {
  checked: boolean[]
  sessionsDone: number
  sessionsGoal: number
  history: WorkoutHistoryEntry[]
}

export interface Meal {
  name: string
  time: string
  kcal: number
  p: number
  c: number
  f: number
}

export interface NewMealDraft {
  name: string
  kcal: string
  p: string
  c: string
  f: string
}

export interface NutritionState {
  logged: { calories: number; protein: number; carbs: number; fat: number }
  meals: Meal[]
  showAdd: boolean
  newMeal: NewMealDraft
}

export interface FridgeIngredient {
  name: string
  checked: boolean
}

export interface FridgeState {
  ingredients: FridgeIngredient[]
  capturing: boolean
}
