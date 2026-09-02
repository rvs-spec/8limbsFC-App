import { Card, Tag } from './ui'
import { RecipeIcon } from './icons'
import type { RECIPES } from '../lib/data'

const GRADIENTS = [
  'linear-gradient(135deg,#2a2410,#1c1c1c)',
  'linear-gradient(135deg,#241c10,#141414)',
  'linear-gradient(135deg,#2a1e12,#0f0f0f)',
]

export function RecipeCard({ recipe, index }: { recipe: (typeof RECIPES)[number]; index: number }) {
  return (
    <Card elevated className="p-0 overflow-hidden gap-0">
      <div
        className="w-full aspect-video flex items-center justify-center"
        style={{ background: GRADIENTS[index % GRADIENTS.length] }}
      >
        <RecipeIcon size={32} className="text-accent opacity-70" />
      </div>
      <div className="p-3">
        <div className="card-title">{recipe.name}</div>
        <div className="card-meta my-1 mb-2">
          {recipe.time} · {recipe.kcal} kcal
        </div>
        <div className="flex flex-wrap gap-1.5">
          {recipe.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
    </Card>
  )
}
