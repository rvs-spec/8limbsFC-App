import logo from '../../assets/logo.png'
import { Button } from '../../components/ui'
import { useApp } from '../../lib/store'

export function Welcome() {
  const go = useApp((s) => s.go)

  return (
    <div className="h-full flex flex-col justify-center px-7 pt-6 pb-10 gap-7 overflow-auto no-scrollbar">
      <div className="text-center">
        <div className="w-[180px] h-[180px] rounded-full mx-auto mb-2 overflow-hidden animate-flameFlicker">
          <img src={logo} alt="8 Limbs FC" className="w-full h-full object-cover" style={{ mixBlendMode: 'lighten' }} />
        </div>
        <div className="font-heading text-2xl tracking-[0.08em] font-bold uppercase">
          8 LIMBS <span className="text-accent">FC</span>
        </div>
        <p className="mt-2.5 text-[13px] text-text-muted">
          Run. Train. Eat.
          <br />
          One coach for all of it.
        </p>
      </div>
      <div className="flex flex-col gap-3.5">
        <Button variant="secondary" block className="h-11" onClick={() => go('ob-1')}>
          Continue with Apple
        </Button>
        <Button variant="primary" block className="h-11" onClick={() => go('ob-1')}>
          Continue with Email
        </Button>
      </div>
      <p className="text-center text-[10.5px] text-text-faint m-0">30-day free trial · No commitment · Sign in</p>
    </div>
  )
}
