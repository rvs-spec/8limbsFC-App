import { Button, ScreenHeader } from '../../components/ui'
import { RecipeCard } from '../../components/RecipeCard'
import { RECIPES } from '../../lib/data'
import { useApp } from '../../lib/store'

export function FridgeResults() {
  const go = useApp((s) => s.go)
  return (
    <div className="h-full flex flex-col">
      <ScreenHeader title="Recipes for you" onBack={() => go('fridge-ingredients')} />
      <div className="flex-1 overflow-auto no-scrollbar px-5 py-2.5 flex flex-col gap-3.5">
        {RECIPES.map((r, i) => (
          <RecipeCard key={r.name} recipe={r} index={i} />
        ))}
      </div>
      <div className="px-5 pt-3.5 pb-7">
        <Button variant="secondary" block className="h-[46px]" onClick={() => go('nutrition')}>
          Done
        </Button>
      </div>
    </div>
  )
}
