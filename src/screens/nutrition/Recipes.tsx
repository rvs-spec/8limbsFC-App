import { ScreenHeader } from '../../components/ui'
import { RecipeCard } from '../../components/RecipeCard'
import { RECIPES } from '../../lib/data'
import { useApp } from '../../lib/store'

export function Recipes() {
  const go = useApp((s) => s.go)
  return (
    <div className="h-full flex flex-col">
      <ScreenHeader title="Recipes" onBack={() => go('nutrition')} />
      <div className="flex-1 overflow-auto no-scrollbar px-5 py-2.5 flex flex-col gap-3.5">
        {RECIPES.map((r, i) => (
          <RecipeCard key={r.name} recipe={r} index={i} />
        ))}
      </div>
    </div>
  )
}
