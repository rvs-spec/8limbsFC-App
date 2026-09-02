import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function base(size = 20) {
  return {
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    width: size,
    height: size,
  }
}

export function HomeIcon({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v9a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1v-9" />
    </svg>
  )
}

export function RunIcon({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <circle cx="15.2" cy="4.7" r="1.8" />
      <path d="M9 21l2.3-5.2 2.9-1.8-1-3.8-2.8.9-2 3" />
      <path d="M12.6 9.6l2.8 2 2.9-.9" />
      <path d="M8.2 12.6l-2.7 1.8" />
    </svg>
  )
}

export function WalkIcon({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <circle cx="13.4" cy="4.6" r="1.8" />
      <path d="M13.4 7.2v4l-3 2.7v6.3" />
      <path d="M13.4 11.2l3 2 1.8 5" />
      <path d="M10.4 13.9l-3.2 1.2" />
    </svg>
  )
}

export function WorkoutIcon({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M4 12h2M18 12h2M6 8v8M18 8v8M6 12h12" />
    </svg>
  )
}

export function MealIcon({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M7 3v7a2 2 0 0 0 4 0V3" />
      <path d="M9 10v11" />
      <path d="M17 3c-1.6 0-2.7 1.6-2.7 3.6S15.4 10.4 17 10.4V21" />
    </svg>
  )
}

export function NutritionIcon({ size, ...p }: IconProps) {
  return <MealIcon size={size} {...p} />
}

export function AccountIcon({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 20c0-3.6 3-6 7-6s7 2.4 7 6" />
    </svg>
  )
}

export function BackIcon({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  )
}

export function CloseIcon({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

export function CheckIcon({ size, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" width={size ?? 18} height={size ?? 18} {...p}>
      <path d="M4 12l5 5L20 6" />
    </svg>
  )
}

export function PlayIcon({ size, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size ?? 20} height={size ?? 20} {...p}>
      <path d="M8 5l11 7-11 7V5z" fill="currentColor" />
    </svg>
  )
}

export function PauseIcon({ size, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size ?? 20} height={size ?? 20} {...p}>
      <rect x="7" y="5" width="4" height="14" fill="currentColor" />
      <rect x="14" y="5" width="4" height="14" fill="currentColor" />
    </svg>
  )
}

export function CameraIcon({ size, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} width={size ?? 44} height={size ?? 44} {...p}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7l1.4-2.4h5.2L16 7" />
      <circle cx="12" cy="13.6" r="3.4" />
    </svg>
  )
}

export function ChevronRight({ size, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size ?? 14} height={size ?? 14} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" opacity={0.5} {...p}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  )
}

export function RecipeIcon({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M4 4h9v16H4z" />
      <path d="M13 4h7v16h-7" />
    </svg>
  )
}

export function IngredientIcon({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M7 3v7a2 2 0 0 0 4 0V3" />
      <path d="M9 10v11" />
    </svg>
  )
}

export function ScanIcon({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <circle cx="12" cy="13.6" r="3.2" />
    </svg>
  )
}
