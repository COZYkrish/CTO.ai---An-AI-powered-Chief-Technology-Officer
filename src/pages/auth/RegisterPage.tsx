import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { useUIStore } from '../../stores/uiStore'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import NeuralField from '../../components/three/NeuralField'

const steps = [
  { id: 1, title: 'Your name', subtitle: 'How should we address you?' },
  { id: 2, title: 'Your email', subtitle: 'Where we\'ll send your blueprints.' },
  { id: 3, title: 'Set password', subtitle: 'Secure your Command Center.' },
  { id: 4, title: 'Your role', subtitle: 'Help us personalize your experience.' },
]

const roles = ['Founder', 'Developer', 'Student', 'Product Manager', 'Agency', 'CTO / VP Eng']

export default function RegisterPage() {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(false)
  const login = useUIStore((s) => s.login)
  const navigate = useNavigate()

  const currentStep = steps[step]

  const handleNext = () => {
    if (step < steps.length - 1) setStep((s) => s + 1)
  }
  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1)
  }

  const handleComplete = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    login({ id: Date.now().toString(), name, email })
    navigate('/command-center')
  }

  const renderInput = () => {
    if (step === 0) return (
      <input
        autoFocus
        type="text"
        id="register-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your full name"
        className="w-full glass rounded-xl px-6 py-4 font-inter text-xl text-white placeholder-white/20 outline-none transition-colors"
        style={{ border: '1px solid rgba(255,255,255,0.1)' }}
        onKeyDown={(e) => e.key === 'Enter' && name && handleNext()}
      />
    )
    if (step === 1) return (
      <input
        autoFocus
        type="email"
        id="register-email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="w-full glass rounded-xl px-6 py-4 font-inter text-xl text-white placeholder-white/20 outline-none"
        style={{ border: '1px solid rgba(255,255,255,0.1)' }}
        onKeyDown={(e) => e.key === 'Enter' && email && handleNext()}
      />
    )
    if (step === 2) return (
      <input
        autoFocus
        type="password"
        id="register-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Minimum 8 characters"
        className="w-full glass rounded-xl px-6 py-4 font-inter text-xl text-white placeholder-white/20 outline-none"
        style={{ border: '1px solid rgba(255,255,255,0.1)' }}
        onKeyDown={(e) => e.key === 'Enter' && password.length >= 6 && handleNext()}
      />
    )
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {roles.map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className="py-3 px-4 rounded-xl text-sm font-inter transition-all duration-200"
            style={{
              background: role === r ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.04)',
              border: role === r ? '1px solid rgba(59,130,246,0.5)' : '1px solid rgba(255,255,255,0.08)',
              color: role === r ? '#3B82F6' : 'rgba(255,255,255,0.5)',
            }}
          >
            {r}
          </button>
        ))}
      </div>
    )
  }

  const canProceed = [!!name, !!email, password.length >= 6, !!role][step]

  return (
    <div className="min-h-screen flex items-center justify-center relative p-6" style={{ background: '#050816' }}>
      <div className="absolute inset-0 pointer-events-none">
        <NeuralField density={400} className="opacity-20" />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 40%, rgba(59,130,246,0.06) 0%, transparent 60%)' }}
      />

      <motion.div
        className="w-full max-w-lg relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Logo */}
        <Link to="/" className="block text-center mb-12 font-geist font-black text-white text-xl">
          CTO<span className="gradient-text-blue">.ai</span>
        </Link>

        {/* Progress */}
        <div className="flex gap-2 mb-10">
          {steps.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-0.5 rounded-full transition-all duration-500"
              style={{ background: i <= step ? '#3B82F6' : 'rgba(255,255,255,0.1)' }}
            />
          ))}
        </div>

        {/* Step content */}
        <div className="glass-panel rounded-3xl p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-xs font-mono text-blue-400/60 tracking-widest uppercase mb-3">
                Step {step + 1} of {steps.length}
              </p>
              <h1
                className="font-geist font-black text-white mb-1"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '-0.03em' }}
              >
                {currentStep.title}
              </h1>
              <p className="font-inter text-white/40 text-sm mb-8">{currentStep.subtitle}</p>
              {renderInput()}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
            {step > 0 ? (
              <button onClick={handleBack} className="flex items-center gap-2 text-white/30 hover:text-white/60 text-sm font-inter transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <Link to="/login" className="text-white/30 hover:text-white/60 text-sm font-inter transition-colors">
                Sign in instead
              </Link>
            )}

            {step < steps.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed}
                className="btn-primary flex items-center gap-2 text-sm py-2.5 px-6 disabled:opacity-30"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={!canProceed || loading}
                id="register-complete-btn"
                className="btn-primary flex items-center gap-2 text-sm py-2.5 px-6 disabled:opacity-30"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin" />
                    Initializing...
                  </>
                ) : (
                  <>Initialize System <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
