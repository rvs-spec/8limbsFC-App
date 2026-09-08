import { create } from 'zustand'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './supabaseClient'
import { computePlan } from './plan'
import { fmtPace, fmtTime } from './format'
import { relativeDate, relativeTime, startOfTodayISO, startOfWeekISO } from './dates'
import { RUN_CAL_PER_KM, WALK_CAL_PER_KM, WORKOUT_TODAY } from './data'
import type {
  AuthStatus,
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
  authStatus: AuthStatus
  userId: string | null
  authError: string | null
  authBusy: boolean

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

  initAuth: () => void
  signUp: (email: string, password: string) => Promise<'signed-in' | 'confirm-email' | 'error'>
  signIn: (email: string, password: string) => Promise<void>
  signInWithApple: () => Promise<void>
  logout: () => Promise<void>
  deleteAccount: () => Promise<void>

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
}

const initialOnboarding: Onboarding = {
  name: '',
  heightCm: 178,
  weightKg: 80,
  age: 32,
  gender: 'male',
  goal: 'build',
  activity: 'moderate',
}

const initialRun: RunState = { status: 'idle', elapsed: 0, distance: 0 }
const initialWalk: WalkState = { status: 'idle', elapsed: 0, steps: 0, distance: 0 }
const initialNutrition = (): NutritionState => ({
  logged: { calories: 0, protein: 0, carbs: 0, fat: 0 },
  meals: [],
  showAdd: false,
  newMeal: { name: '', kcal: '', p: '', c: '', f: '' },
})
const initialWorkout = (): WorkoutState => ({
  checked: WORKOUT_TODAY.exercises.map(() => false),
  sessionsDone: 0,
  sessionsGoal: 4,
  history: [],
})
const initialFridge = (): FridgeState => ({
  ingredients: FRIDGE_SEED.map((n) => ({ name: n, checked: true })),
  capturing: false,
})

/** Loads everything for a signed-in user and routes to home or onboarding. */
async function hydrate(userId: string, session: Session, set: (partial: Partial<AppState>) => void) {
  const [{ data: profile, error: profileError }, { data: historyRows }, { data: workoutRows }, { data: mealRows }] =
    await Promise.all([
      supabase.from('profiles').select('*').eq('id', userId).maybeSingle(),
      supabase.from('activity_history').select('*').eq('user_id', userId).order('occurred_at', { ascending: false }).limit(30),
      supabase.from('workout_sessions').select('*').eq('user_id', userId).order('occurred_at', { ascending: false }).limit(30),
      supabase.from('meals').select('*').eq('user_id', userId).gte('logged_at', startOfTodayISO()).order('logged_at', { ascending: false }),
    ])

  if (profileError) console.error('Failed to load profile', profileError)

  const hasPlan = profile?.calories != null
  const weekStart = startOfWeekISO()
  const sessionsDone = (workoutRows ?? []).filter((w) => w.occurred_at >= weekStart).length

  const loggedTotals = (mealRows ?? []).reduce(
    (acc, m) => ({
      calories: acc.calories + m.kcal,
      protein: acc.protein + m.protein,
      carbs: acc.carbs + m.carbs,
      fat: acc.fat + m.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  )

  set({
    authStatus: 'signedIn',
    userId,
    userName: profile?.name?.trim() || session.user.email?.split('@')[0] || 'there',
    onboarding: {
      name: profile?.name ?? '',
      heightCm: profile?.height_cm ?? initialOnboarding.heightCm,
      weightKg: profile?.weight_kg ?? initialOnboarding.weightKg,
      age: profile?.age ?? initialOnboarding.age,
      gender: profile?.gender ?? initialOnboarding.gender,
      goal: profile?.goal ?? initialOnboarding.goal,
      activity: profile?.activity ?? initialOnboarding.activity,
    },
    plan: hasPlan ? { calories: profile!.calories!, protein: profile!.protein!, carbs: profile!.carbs!, fat: profile!.fat! } : null,
    notificationsOn: profile?.notifications_on ?? true,
    history: (historyRows ?? []).map((r) => ({
      type: r.type,
      date: relativeDate(r.occurred_at),
      distance: r.distance_km.toFixed(2),
      duration: fmtTime(r.duration_sec),
      calories: r.calories,
    })),
    workout: {
      checked: WORKOUT_TODAY.exercises.map(() => false),
      sessionsDone,
      sessionsGoal: profile?.sessions_goal ?? 4,
      history: (workoutRows ?? []).map((w) => ({
        name: w.name,
        date: relativeDate(w.occurred_at),
        exerciseCount: w.exercise_count,
        duration: w.duration_label,
      })),
    },
    nutrition: {
      logged: loggedTotals,
      meals: (mealRows ?? []).map((m) => ({
        name: m.name,
        time: relativeTime(m.logged_at),
        kcal: m.kcal,
        p: m.protein,
        c: m.carbs,
        f: m.fat,
      })),
      showAdd: false,
      newMeal: { name: '', kcal: '', p: '', c: '', f: '' },
    },
    screen: hasPlan ? 'home' : 'ob-1',
  })
}

export const useApp = create<AppState>()((set, get) => ({
  screen: 'ob-welcome',
  authStatus: 'loading',
  userId: null,
  authError: null,
  authBusy: false,

  onboarding: initialOnboarding,
  plan: null,
  userName: 'there',
  run: initialRun,
  walk: initialWalk,
  lastRun: { distance: '0.00', duration: '0:00', pace: '--:--', calories: 0 },
  nutrition: initialNutrition(),
  workout: initialWorkout(),
  fridge: initialFridge(),
  history: [],
  notificationsOn: true,

  initAuth: () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) hydrate(session.user.id, session, set)
      else set({ authStatus: 'signedOut', screen: 'ob-welcome' })
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        hydrate(session.user.id, session, set)
      } else {
        set({
          authStatus: 'signedOut',
          userId: null,
          screen: 'ob-welcome',
          onboarding: initialOnboarding,
          plan: null,
          userName: 'there',
          run: initialRun,
          walk: initialWalk,
          nutrition: initialNutrition(),
          workout: initialWorkout(),
          fridge: initialFridge(),
          history: [],
          notificationsOn: true,
        })
      }
    })
  },

  signUp: async (email, password) => {
    set({ authBusy: true, authError: null })
    const { data, error } = await supabase.auth.signUp({ email, password })
    set({ authBusy: false })
    if (error) {
      set({ authError: error.message })
      return 'error'
    }
    return data.session ? 'signed-in' : 'confirm-email'
  },

  signIn: async (email, password) => {
    set({ authBusy: true, authError: null })
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    set({ authBusy: false })
    if (error) set({ authError: error.message })
  },

  signInWithApple: async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'apple' })
    if (error) set({ authError: `Apple sign-in isn't set up yet (${error.message}). Use email instead.`, screen: 'auth' })
  },

  logout: async () => {
    await supabase.auth.signOut()
  },

  deleteAccount: async () => {
    const { error } = await supabase.functions.invoke('delete-account')
    if (error) {
      console.error('Failed to delete account', error)
      set({ authError: 'Could not delete your account — please try again.' })
      return
    }
    await supabase.auth.signOut()
  },

  go: (screen) => set({ screen }),

  setObField: (field, value) => set((s) => ({ onboarding: { ...s.onboarding, [field]: value } })),

  submitAboutYou: () => set((s) => ({ screen: 'ob-2', userName: s.onboarding.name.trim() || 'there' })),

  submitMeasurements: () => set({ screen: 'ob-3' }),

  buildPlan: () =>
    set((s) => {
      const plan = computePlan(s.onboarding)
      return { plan, nutrition: { ...s.nutrition, logged: { calories: 0, protein: 0, carbs: 0, fat: 0 } }, screen: 'ob-plan' }
    }),

  startMyPlan: () => {
    const { onboarding, plan, userId } = get()
    if (!plan) return
    set({ screen: 'home' })
    if (!userId) return
    supabase
      .from('profiles')
      .upsert({
        id: userId,
        name: onboarding.name.trim(),
        height_cm: onboarding.heightCm,
        weight_kg: onboarding.weightKg,
        age: onboarding.age,
        gender: onboarding.gender,
        goal: onboarding.goal,
        activity: onboarding.activity,
        calories: plan.calories,
        protein: plan.protein,
        carbs: plan.carbs,
        fat: plan.fat,
      })
      .then(({ error }) => {
        if (error) console.error('Failed to save plan', error)
      })
  },

  startRun: () => set({ run: { status: 'active', elapsed: 0, distance: 0 }, screen: 'running' }),

  tickRun: (deltaSec, deltaKm) =>
    set((s) => {
      if (s.run.status !== 'active') return {}
      return { run: { ...s.run, elapsed: s.run.elapsed + deltaSec, distance: s.run.distance + deltaKm } }
    }),

  toggleRunPause: () =>
    set((s) => ({ run: { ...s.run, status: s.run.status === 'active' ? 'paused' : 'active' } })),

  finishRun: () => {
    const distanceKm = get().run.distance
    const durationSec = Math.round(get().run.elapsed)
    const calories = Math.round(distanceKm * RUN_CAL_PER_KM)
    const distance = distanceKm.toFixed(2)
    const duration = fmtTime(durationSec)
    const pace = fmtPace(durationSec, distanceKm)

    set((s) => ({
      history: [{ type: 'Run', date: 'Today', distance, duration, calories }, ...s.history],
      lastRun: { distance, duration, pace, calories },
      run: initialRun,
      screen: 'run-summary',
    }))

    const userId = get().userId
    if (userId) {
      supabase
        .from('activity_history')
        .insert({ user_id: userId, type: 'Run', distance_km: distanceKm, duration_sec: durationSec, calories })
        .then(({ error }) => {
          if (error) console.error('Failed to save run', error)
        })
    }
  },

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

  finishWalk: () => {
    const distanceKm = get().walk.distance
    const durationSec = Math.round(get().walk.elapsed)
    const calories = Math.round(distanceKm * WALK_CAL_PER_KM)

    set((s) => ({
      history: [{ type: 'Walk', date: 'Today', distance: distanceKm.toFixed(2), duration: fmtTime(durationSec), calories }, ...s.history],
      walk: initialWalk,
      screen: 'home',
    }))

    const userId = get().userId
    if (userId) {
      supabase
        .from('activity_history')
        .insert({ user_id: userId, type: 'Walk', distance_km: distanceKm, duration_sec: durationSec, calories })
        .then(({ error }) => {
          if (error) console.error('Failed to save walk', error)
        })
    }
  },

  startWorkout: () =>
    set((s) => ({
      workout: { ...s.workout, checked: WORKOUT_TODAY.exercises.map(() => false) },
      screen: 'workout-active',
    })),

  toggleExercise: (idx) =>
    set((s) => ({
      workout: { ...s.workout, checked: s.workout.checked.map((c, i) => (i === idx ? !c : c)) },
    })),

  finishWorkout: () => {
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
    }))

    const userId = get().userId
    if (userId) {
      supabase
        .from('workout_sessions')
        .insert({
          user_id: userId,
          name: WORKOUT_TODAY.name,
          exercise_count: WORKOUT_TODAY.exercises.length,
          duration_label: WORKOUT_TODAY.duration,
        })
        .then(({ error }) => {
          if (error) console.error('Failed to save workout', error)
        })
    }
  },

  openAddMeal: () => set((s) => ({ nutrition: { ...s.nutrition, showAdd: true } })),

  closeAddMeal: () =>
    set((s) => ({
      nutrition: { ...s.nutrition, showAdd: false, newMeal: { name: '', kcal: '', p: '', c: '', f: '' } },
    })),

  addMealTotals: (name, kcal, p, c, f) => {
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
    }))

    const userId = get().userId
    if (userId) {
      supabase
        .from('meals')
        .insert({ user_id: userId, name, kcal, protein: p, carbs: c, fat: f })
        .then(({ error }) => {
          if (error) console.error('Failed to save meal', error)
        })
    }
  },

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

  resetFridgeSeed: () => set(() => ({ fridge: initialFridge() })),

  toggleNotifications: () => {
    const next = !get().notificationsOn
    set({ notificationsOn: next })
    const userId = get().userId
    if (userId) {
      supabase
        .from('profiles')
        .update({ notifications_on: next })
        .eq('id', userId)
        .then(({ error }) => {
          if (error) console.error('Failed to save notification setting', error)
        })
    }
  },
}))
