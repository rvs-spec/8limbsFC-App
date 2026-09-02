import { Button, ScreenHeader } from '../../components/ui'
import { IngredientChips } from '../../components/IngredientChips'
import { useApp } from '../../lib/store'

export function FridgeIngredients() {
  const go = useApp((s) => s.go)
  const selectedCount = useApp((s) => s.fridge.ingredients.filter((i) => i.checked).length)

  return (
    <div className="h-full flex flex-col">
      <ScreenHeader title="Detected ingredients" onBack={() => go('nutrition')} />
      <div className="flex-1 overflow-auto no-scrollbar px-5 py-2.5">
        <p className="text-text-muted text-[12.5px]">Uncheck anything you don't have.</p>
        <IngredientChips />
      </div>
      <div className="px-5 pt-3.5 pb-7">
        <Button block className="h-[46px]" onClick={() => go('fridge-results')} disabled={selectedCount === 0}>
          Find recipes ({selectedCount})
        </Button>
      </div>
    </div>
  )
}
