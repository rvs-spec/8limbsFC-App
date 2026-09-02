import { Button, ScreenHeader } from '../../components/ui'
import { IngredientChips } from '../../components/IngredientChips'
import { useApp } from '../../lib/store'

export function Ingredients() {
  const go = useApp((s) => s.go)
  return (
    <div className="h-full flex flex-col">
      <ScreenHeader title="Ingredients" onBack={() => go('nutrition')} />
      <div className="flex-1 overflow-auto no-scrollbar px-5 py-2.5">
        <p className="text-text-muted text-[12.5px]">What's on hand, from your last fridge scan.</p>
        <IngredientChips />
      </div>
      <div className="px-5 pt-3.5 pb-7">
        <Button variant="secondary" block className="h-11" onClick={() => go('fridge-camera')}>
          Rescan fridge
        </Button>
      </div>
    </div>
  )
}
