import clsx from 'clsx'
import { CheckIcon } from './icons'
import { useApp } from '../lib/store'

export function IngredientChips() {
  const ingredients = useApp((s) => s.fridge.ingredients)
  const toggleIngredient = useApp((s) => s.toggleIngredient)

  return (
    <div className="flex flex-wrap gap-2 mt-2.5">
      {ingredients.map((ing, i) => (
        <div
          key={ing.name}
          onClick={() => toggleIngredient(i)}
          className={clsx(
            'tag cursor-pointer select-none flex items-center gap-1.5',
            ing.checked ? 'tag-accent' : 'tag-neutral',
          )}
          style={{ opacity: ing.checked ? 1 : 0.4 }}
        >
          <CheckIcon size={12} />
          {ing.name}
        </div>
      ))}
    </div>
  )
}
