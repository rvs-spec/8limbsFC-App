import type { Screen } from '../lib/types'
import { useApp } from '../lib/store'
import { AccountIcon, HomeIcon, NutritionIcon, RunIcon, WorkoutIcon } from './icons'

const RUN_SCREENS: Screen[] = ['run-hub', 'running', 'run-summary']
const WORKOUT_SCREENS: Screen[] = ['workout-hub', 'workout-active']

export function TabBar() {
  const screen = useApp((s) => s.screen)
  const go = useApp((s) => s.go)

  const tabs: { key: string; label: string; icon: typeof HomeIcon; active: boolean; onClick: () => void }[] = [
    { key: 'home', label: 'Home', icon: HomeIcon, active: screen === 'home', onClick: () => go('home') },
    { key: 'run', label: 'Run', icon: RunIcon, active: RUN_SCREENS.includes(screen), onClick: () => go('run-hub') },
    { key: 'workout', label: 'Workout', icon: WorkoutIcon, active: WORKOUT_SCREENS.includes(screen), onClick: () => go('workout-hub') },
    { key: 'nutrition', label: 'Nutrition', icon: NutritionIcon, active: screen === 'nutrition', onClick: () => go('nutrition') },
    { key: 'account', label: 'Account', icon: AccountIcon, active: screen === 'account', onClick: () => go('account') },
  ]

  return (
    <div
      className="flex border-t border-divider bg-bg px-2 pt-2"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 20px)' }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={tab.onClick}
          className="flex-1 flex flex-col items-center gap-1 py-1"
          style={{ color: tab.active ? '#F9B21A' : 'rgba(244,241,234,0.55)' }}
        >
          <tab.icon size={20} />
          <span className="text-[10.5px]">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}
