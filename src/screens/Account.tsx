import { ChevronRight } from '../components/icons'
import { useApp } from '../lib/store'

const DEFAULT_PLAN = { calories: 2400, protein: 160, carbs: 260, fat: 80 }

export function Account() {
  const userName = useApp((s) => s.userName)
  const plan = useApp((s) => s.plan) ?? DEFAULT_PLAN
  const notificationsOn = useApp((s) => s.notificationsOn)
  const toggleNotifications = useApp((s) => s.toggleNotifications)
  const logout = useApp((s) => s.logout)
  const deleteAccount = useApp((s) => s.deleteAccount)

  const initial = (userName || 'A')[0].toUpperCase()

  const rows: { label: string; value: string; onClick?: () => void }[] = [
    { label: 'Personal Information', value: '' },
    { label: 'Goals', value: `${plan.calories} cal/day` },
    { label: 'Macros', value: `${plan.protein}P · ${plan.carbs}C · ${plan.fat}F` },
    { label: 'Notifications', value: notificationsOn ? 'On' : 'Off', onClick: toggleNotifications },
    { label: 'Subscription', value: 'Trial · 30 days left' },
    { label: 'Payment', value: '' },
  ]

  return (
    <div className="flex-1 overflow-auto no-scrollbar px-5 pt-5 pb-3">
      <div className="flex items-center gap-3.5 mb-5">
        <div className="w-14 h-14 rounded-full flex-none bg-accent text-bg flex items-center justify-center text-[19px] font-heading">
          {initial}
        </div>
        <div>
          <h4>{userName}</h4>
          <div className="card-meta">8 Limbs FC · Member since 2026</div>
        </div>
      </div>

      <div className="card p-0 overflow-hidden mb-4">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`flex items-center justify-between px-3.5 py-3.5 cursor-pointer ${i > 0 ? 'border-t border-divider' : ''}`}
            onClick={row.onClick}
          >
            <div className="text-[13.5px]">{row.label}</div>
            <div className="flex items-center gap-1.5">
              <span className="card-meta">{row.value}</span>
              <ChevronRight />
            </div>
          </div>
        ))}
      </div>

      <div className="card p-0 overflow-hidden mb-5">
        <div className="px-3.5 py-3.5 cursor-pointer text-[13.5px]" onClick={logout}>
          Log out
        </div>
        <div
          className="px-3.5 py-3.5 border-t border-divider text-[13.5px] text-text-faint cursor-pointer"
          onClick={() => {
            if (window.confirm('Delete your account and all local data? This cannot be undone.')) deleteAccount()
          }}
        >
          Delete account
        </div>
      </div>
      <p className="text-center text-[11px] text-text-faint">8 Limbs FC 1.0 · Phase 1 MVP</p>
    </div>
  )
}
