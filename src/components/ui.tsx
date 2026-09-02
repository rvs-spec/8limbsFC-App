import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'
import { BackIcon } from './icons'

export function Card({
  className,
  elevated,
  onClick,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { elevated?: boolean }) {
  return (
    <div
      className={clsx('card', 'shrink-0', elevated && 'card-elev', onClick && 'cursor-pointer', className)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  )
}

type Variant = 'primary' | 'secondary' | 'ghost' | 'icon'

export function Button({
  variant = 'primary',
  block,
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; block?: boolean }) {
  return (
    <button
      className={clsx(
        'btn',
        variant === 'primary' && 'btn-primary',
        variant === 'secondary' && 'btn-secondary border',
        variant === 'ghost' && 'btn-ghost',
        variant === 'icon' && 'btn-secondary btn-icon border',
        variant !== 'icon' && 'h-11 border',
        block && 'btn-block',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export function Tag({ children, variant = 'accent', className }: { children: ReactNode; variant?: 'accent' | 'neutral' | 'outline'; className?: string }) {
  return (
    <span
      className={clsx(
        'tag',
        variant === 'accent' && 'tag-accent',
        variant === 'neutral' && 'tag-neutral',
        variant === 'outline' && 'tag-outline',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="field">
      <label>{label}</label>
      {children}
    </div>
  )
}

export function ScreenHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="flex items-center gap-2.5 px-3.5 pt-2.5 pb-1">
      <Button variant="icon" onClick={onBack} aria-label="Back">
        <BackIcon />
      </Button>
      <h4 className="m-0">{title}</h4>
    </div>
  )
}
