import type { ReactElement } from 'react'
import { TabBar } from './components/TabBar'
import { useApp } from './lib/store'
import type { Screen } from './lib/types'

import { Welcome } from './screens/onboarding/Welcome'
import { AboutYou } from './screens/onboarding/AboutYou'
import { Measurements } from './screens/onboarding/Measurements'
import { GoalActivity } from './screens/onboarding/GoalActivity'
import { PlanSummary } from './screens/onboarding/PlanSummary'
import { Home } from './screens/Home'
import { RunHub } from './screens/run/RunHub'
import { RunActive } from './screens/run/RunActive'
import { RunSummary } from './screens/run/RunSummary'
import { Walking } from './screens/Walking'
import { WorkoutHub } from './screens/workout/WorkoutHub'
import { WorkoutActive } from './screens/workout/WorkoutActive'
import { Nutrition } from './screens/nutrition/Nutrition'
import { Recipes } from './screens/nutrition/Recipes'
import { Ingredients } from './screens/nutrition/Ingredients'
import { FridgeCamera } from './screens/nutrition/FridgeCamera'
import { FridgeIngredients } from './screens/nutrition/FridgeIngredients'
import { FridgeResults } from './screens/nutrition/FridgeResults'
import { Account } from './screens/Account'

const SCREENS: Record<Screen, () => ReactElement | null> = {
  'ob-welcome': Welcome,
  'ob-1': AboutYou,
  'ob-2': Measurements,
  'ob-3': GoalActivity,
  'ob-plan': PlanSummary,
  home: Home,
  'run-hub': RunHub,
  running: RunActive,
  'run-summary': RunSummary,
  walking: Walking,
  'workout-hub': WorkoutHub,
  'workout-active': WorkoutActive,
  nutrition: Nutrition,
  recipes: Recipes,
  ingredients: Ingredients,
  'fridge-camera': FridgeCamera,
  'fridge-ingredients': FridgeIngredients,
  'fridge-results': FridgeResults,
  account: Account,
}

const TAB_SCREENS: Screen[] = [
  'home',
  'run-hub',
  'running',
  'run-summary',
  'workout-hub',
  'workout-active',
  'nutrition',
  'account',
]

function App() {
  const screen = useApp((s) => s.screen)
  const ScreenComponent = SCREENS[screen]

  return (
    <div className="h-screen w-full flex flex-col bg-bg text-text font-body overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <ScreenComponent />
      </div>
      {TAB_SCREENS.includes(screen) && <TabBar />}
    </div>
  )
}

export default App
