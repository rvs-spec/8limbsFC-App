import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { computePlan } from './plan'
import { fmtPace, fmtTime } from './format'
import { RUN_CAL_PER_KM, WALK_CAL_PER_KM, WORKOUT_TODAY } from './data'
import type {
  FridgeState,
  HistoryEntry,
  LastRun,
  NutritionState,
  Onboarding,
  Plan,
  RunState,
  Screen,
  WalkState,
  WorkoutState,
} from './types'

const FRIDGE_SEED = ['Eggs', 'Spinach', 'Bell Pepper', 'Cheddar Cheese', 'Chicken Breast', 'Greek Yogurt', 'Broccoli', 'Brown Rice']

interface AppState {
  screen: Screen
  onboarding: Onboarding
  plan: Plan | null
  userName: string
  run: RunState
  walk: WalkState
  lastRun: LastRun
  nutrition: NutritionState
  workout: WorkoutState
  fridge: FridgeState
  history: HistoryEntry[]
  notificationsOn: boolean

  go: (screen: Screen) => void
  setObField: <K extends keyof Onboarding>(field: K, value: Onboarding[K]) => void
  submitAboutYou: () => void
  submitMeasurements: () => void
  buildPlan: () => void
  startMyPlan: () => void

  startRun: () => void
  tickRun: (deltaSec: number, deltaKm: number) => void
  toggleRunPause: () => void
  finishRun: () => void
  runSummaryDone: () => void

  startWalk: () => void
  tickWalk: (deltaSec: number, deltaSteps: number, deltaKm: number) => void
  toggleWalkPause: () => void
  finishWalk: () => void

  startWorkout: () => void
  toggleExercise: (idx: number) => void
  finishWorkout: () => void

  openAddMeal: () => void
  closeAddMeal: () => void
  addMealTotals: (name: string, kcal: number, p: number, c: number, f: number) => void
  setNewMealField: (field: keyof NutritionState['newMeal'], value: string) => void
  addCustomMeal: () => void

  startFridgeCapture: () => void
  finishFridgeCapture: () => void
  toggleIngredient: (idx: number) => void
  resetFridgeSeed: () => void

  toggleNotifications: () => void
  logout: () => void
  deleteAccount: () => void
}

const initialOnboarding: Onboarding = {
  name: '',
  email: '',
  heightCm: 178,
  weightKg: 80,
  age: 32,
  gender: 'male',
  goal: 'build',
  activity: 'moderate',
}

const initialRun: RunState = { status: 'idle', elapsed: 0, distance: 0 }
const initialWalk: WalkState = { status: 'idle', elapsed: 0, steps: 0, distance: 0 }

export const useApp = create<AppState>()(
  persist(
    (set, get) => ({
      screen: 'ob-welcome',
      onboarding: initialOnboarding,
      plan: null,
      userName: 'there',
      run: initialRun,
      walk: initialWalk,
      lastRun: { distance: '5.20', duration: '27:41', pace: "5'19\"", calories: 342 },
      nutrition: {
        logged: { calories: 0, protein: 0, carbs: 0, fat: 0 },
        meals: [],
        showAdd: false,
        newMeal: { name: '', kcal: '', p: '', c: '', f: '' },
      },
      workout: {
        checked: WORKOUT_TODAY.exercises.map(() => false),
        sessionsDone: 2,
        sessionsGoal: 4,
        history: [
          { name: 'Lower body strength', date: 'Yesterday', exerciseCount: 5, duration: '22 min' },
          { name: 'Full body circuit', date: 'Monday', exerciseCount: 7, duration: '40 min' },
        ],
      },
      fridge: {
        ingredients: FRIDGE_SEED.map((n) => ({ name: n, checked: true })),
        capturing: false,
      },
      history: [
        { type: 'Run', date: 'Yesterday', distance: '5.20', duration: '28:14', calories: 412 },
        { type: 'Walk', date: '2 days ago', distance: '3.10', duration: '34:02', calories: 190 },
      ],
      notificationsOn: true,

      go: (screen) => set({ screen }),

      setObField: (field, value) => set((s) => ({ onboarding: { ...s.onboarding, [field]: value } })),

      submitAboutYou: () =>
        set((s) => ({ screen: 'ob-2', userName: s.onboarding.name.trim() || 'there' })),

      submitMeasurements: () => set({ screen: 'ob-3' }),

      buildPlan: () =>
        set((s) => {
          const plan = computePlan(s.onboarding)
          return { plan, nutrition: { ...s.nutrition, logged: { calories: 0, protein: 0, carbs: 0, fat: 0 } }, screen: 'ob-plan' }
        }),

      startMyPlan: () => set({ screen: 'home' }),

      startRun: () => set({ run: { status: 'active', elapsed: 0, distance: 0 }, screen: 'running' }),

      tickRun: (deltaSec, deltaKm) =>
        set((s) => {
          if (s.run.status !== 'active') return {}
          return { run: { ...s.run, elapsed: s.run.elapsed + deltaSec, distance: s.run.distance + deltaKm } }
        }),

      toggleRunPause: () =>
        set((s) => ({ run: { ...s.run, status: s.run.status === 'active' ? 'paused' : 'active' } })),

      finishRun: () =>
        set((s) => {
          const distance = s.run.distance.toFixed(2)
          const duration = fmtTime(s.run.elapsed)
          const pace = fmtPace(s.run.elapsed, s.run.distance)
          const calories = Math.round(s.run.distance * RUN_CAL_PER_KM)
          return {
            history: [{ type: 'Run', date: 'Today', distance, duration, calories }, ...s.history],
            lastRun: { distance, duration, pace, calories },
            run: initialRun,
            screen: 'run-summary',
          }
        }),

      runSummaryDone: () => set({ screen: 'run-hub' }),

      startWalk: () => set({ walk: { status: 'active', elapsed: 0, steps: 0, distance: 0 }, screen: 'walking' }),

      tickWalk: (deltaSec, deltaSteps, deltaKm) =>
        set((s) => {
          if (s.walk.status !== 'active') return {}
          return {
            walk: {
              ...s.walk,
              elapsed: s.walk.elapsed + deltaSec,
              steps: s.walk.steps + deltaSteps,
              distance: s.walk.distance + deltaKm,
            },
          }
        }),

      toggleWalkPause: () =>
        set((s) => ({ walk: { ...s.walk, status: s.walk.status === 'active' ? 'paused' : 'active' } })),

      finishWalk: () =>
        set((s) => ({
          history: [
            {
              type: 'Walk',
              date: 'Today',
              distance: s.walk.distance.toFixed(2),
              duration: fmtTime(s.walk.elapsed),
              calories: Math.round(s.walk.distance * WALK_CAL_PER_KM),
            },
            ...s.history,
          ],
          walk: initialWalk,
          screen: 'home',
        })),

      startWorkout: () =>
        set((s) => ({
          workout: { ...s.workout, checked: WORKOUT_TODAY.exercises.map(() => false) },
          screen: 'workout-active',
        })),

      toggleExercise: (idx) =>
        set((s) => ({
          workout: { ...s.workout, checked: s.workout.checked.map((c, i) => (i === idx ? !c : c)) },
        })),

      finishWorkout: () =>
        set((s) => ({
          workout: {
            ...s.workout,
            sessionsDone: Math.min(s.workout.sessionsDone + 1, s.workout.sessionsGoal),
            history: [
              { name: WORKOUT_TODAY.name, date: 'Today', exerciseCount: WORKOUT_TODAY.exercises.length, duration: WORKOUT_TODAY.duration },
              ...s.workout.history,
            ],
          },
          screen: 'workout-hub',
        })),

      openAddMeal: () => set((s) => ({ nutrition: { ...s.nutrition, showAdd: true } })),

      closeAddMeal: () =>
        set((s) => ({
          nutrition: { ...s.nutrition, showAdd: false, newMeal: { name: '', kcal: '', p: '', c: '', f: '' } },
        })),

      addMealTotals: (name, kcal, p, c, f) =>
        set((s) => ({
          nutrition: {
            ...s.nutrition,
            showAdd: false,
            newMeal: { name: '', kcal: '', p: '', c: '', f: '' },
            logged: {
              calories: s.nutrition.logged.calories + kcal,
              protein: s.nutrition.logged.protein + p,
              carbs: s.nutrition.logged.carbs + c,
              fat: s.nutrition.logged.fat + f,
            },
            meals: [{ name, time: 'Now', kcal, p, c, f }, ...s.nutrition.meals],
          },
        })),

      setNewMealField: (field, value) =>
        set((s) => ({ nutrition: { ...s.nutrition, newMeal: { ...s.nutrition.newMeal, [field]: value } } })),

      addCustomMeal: () => {
        const m = get().nutrition.newMeal
        if (!m.name || !m.kcal) return
        get().addMealTotals(m.name, parseInt(m.kcal) || 0, parseInt(m.p) || 0, parseInt(m.c) || 0, parseInt(m.f) || 0)
      },

      startFridgeCapture: () => set((s) => ({ fridge: { ...s.fridge, capturing: true } })),

      finishFridgeCapture: () => set((s) => ({ fridge: { ...s.fridge, capturing: false }, screen: 'fridge-ingredients' })),

      toggleIngredient: (idx) =>
        set((s) => ({
          fridge: {
            ...s.fridge,
            ingredients: s.fridge.ingredients.map((ing, i) => (i === idx ? { ...ing, checked: !ing.checked } : ing)),
          },
        })),

      resetFridgeSeed: () =>
        set(() => ({ fridge: { ingredients: FRIDGE_SEED.map((n) => ({ name: n, checked: true })), capturing: false } })),

      toggleNotifications: () => set((s) => ({ notificationsOn: !s.notificationsOn })),

      logout: () => set({ screen: 'ob-welcome' }),

      deleteAccount: () =>
        set({
          screen: 'ob-welcome',
          onboarding: initialOnboarding,
          plan: null,
          userName: 'there',
          run: initialRun,
          walk: initialWalk,
          nutrition: {
            logged: { calories: 0, protein: 0, carbs: 0, fat: 0 },
            meals: [],
            showAdd: false,
            newMeal: { name: '', kcal: '', p: '', c: '', f: '' },
          },
          workout: {
            checked: WORKOUT_TODAY.exercises.map(() => false),
            sessionsDone: 0,
            sessionsGoal: 4,
            history: [],
          },
          fridge: { ingredients: FRIDGE_SEED.map((n) => ({ name: n, checked: true })), capturing: false },
          history: [],
        }),
    }),
    { name: '8limbsfc-state' },
  ),
)
