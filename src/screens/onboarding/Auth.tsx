import { useState } from 'react'
import { Button, Field } from '../../components/ui'
import { useApp } from '../../lib/store'

export function Auth() {
  const [mode, setMode] = useState<'signup' | 'login'>('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmSent, setConfirmSent] = useState(false)
  const authError = useApp((s) => s.authError)
  const authBusy = useApp((s) => s.authBusy)
  const signUp = useApp((s) => s.signUp)
  const signIn = useApp((s) => s.signIn)
  const go = useApp((s) => s.go)

  async function submit() {
    if (mode === 'signup') {
      const result = await signUp(email, password)
      if (result === 'confirm-email') setConfirmSent(true)
    } else {
      await signIn(email, password)
    }
  }

  if (confirmSent) {
    return (
      <div className="h-full flex flex-col px-6 pt-6 pb-7 gap-4 text-center justify-center">
        <h3>Check your email</h3>
        <p className="text-text-muted text-[12.5px]">
          We sent a confirmation link to <span className="text-text">{email}</span>. Follow it, then come back and
          log in.
        </p>
        <Button
          variant="secondary"
          block
          className="h-11 mt-4"
          onClick={() => {
            setConfirmSent(false)
            setMode('login')
          }}
        >
          Back to log in
        </Button>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col px-6 pt-6 pb-7 gap-5 overflow-auto no-scrollbar">
      <button className="card-meta text-left" onClick={() => go('ob-welcome')}>
        ← Back
      </button>
      <div>
        <h3>{mode === 'signup' ? 'Create your account' : 'Welcome back'}</h3>
        <p className="text-text-muted text-[12.5px] mt-1">
          {mode === 'signup' ? 'Takes a minute — then your plan.' : 'Log in to pick up where you left off.'}
        </p>
      </div>
      <div className="flex flex-col gap-3.5">
        <Field label="Email address">
          <input
            className="input"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@8limbsfc.com"
          />
        </Field>
        <Field label="Password">
          <input
            className="input"
            type="password"
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
          />
        </Field>
      </div>
      {authError && <p className="text-[12px] text-red-400 m-0">{authError}</p>}
      <Button block className="h-11 mt-auto" disabled={authBusy || !email || password.length < 8} onClick={submit}>
        {authBusy ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Log in'}
      </Button>
      <button
        className="card-meta text-center"
        onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
      >
        {mode === 'signup' ? 'Already have an account? Log in' : "New here? Create an account"}
      </button>
    </div>
  )
}
