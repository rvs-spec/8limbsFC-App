import { useEffect, useRef } from 'react'
import { Button } from '../../components/ui'
import { CameraIcon, CloseIcon } from '../../components/icons'
import { useApp } from '../../lib/store'

export function FridgeCamera() {
  const capturing = useApp((s) => s.fridge.capturing)
  const startFridgeCapture = useApp((s) => s.startFridgeCapture)
  const finishFridgeCapture = useApp((s) => s.finishFridgeCapture)
  const resetFridgeSeed = useApp((s) => s.resetFridgeSeed)
  const go = useApp((s) => s.go)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  function capture() {
    resetFridgeSeed()
    startFridgeCapture()
    timer.current = window.setTimeout(finishFridgeCapture, 1300)
  }

  return (
    <div className="h-full flex flex-col" style={{ background: '#0a0a0d' }}>
      <div className="px-3.5 py-1.5 flex justify-between">
        <Button variant="icon" onClick={() => go('nutrition')} className="text-white" aria-label="Close">
          <CloseIcon size={16} />
        </Button>
      </div>
      <div
        className="flex-1 relative mx-4 mb-4 rounded-lg overflow-hidden"
        style={{ background: 'radial-gradient(circle at 50% 40%, #23222f, #0a0a0d)' }}
      >
        <div className="absolute top-[18px] left-[18px] w-[26px] h-[26px] border-t-2 border-l-2 border-accent" />
        <div className="absolute top-[18px] right-[18px] w-[26px] h-[26px] border-t-2 border-r-2 border-accent" />
        <div className="absolute bottom-[18px] left-[18px] w-[26px] h-[26px] border-b-2 border-l-2 border-accent" />
        <div className="absolute bottom-[18px] right-[18px] w-[26px] h-[26px] border-b-2 border-r-2 border-accent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5" style={{ color: 'rgba(233,233,237,0.5)' }}>
          <CameraIcon size={44} />
          {capturing ? (
            <div className="text-[13px] animate-scanFade">Scanning ingredients…</div>
          ) : (
            <div className="text-[13px]">Point at your fridge shelf</div>
          )}
        </div>
      </div>
      <div className="flex justify-center pb-7">
        <button
          onClick={capture}
          disabled={capturing}
          className="w-[70px] h-[70px] rounded-full bg-transparent border-[3px] border-white flex items-center justify-center cursor-pointer disabled:opacity-60"
        >
          <div className="w-14 h-14 rounded-full bg-accent" />
        </button>
      </div>
    </div>
  )
}
