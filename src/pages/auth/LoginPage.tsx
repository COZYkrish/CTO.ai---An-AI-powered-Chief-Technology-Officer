import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { useUIStore } from '../../stores/uiStore'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import NeuralField from '../../components/three/NeuralField'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const login = useUIStore((s) => s.login)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Please fill in all fields.'); return }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    login({ id: '1', name: email.split('@')[0], email })
    navigate('/command-center')
  }

  return (
    <div className="min-h-screen flex relative" style={{ background: '#050816' }}>
      <div className="absolute inset-0 pointer-events-none">
        <NeuralField density={400} className="opacity-20" />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 80% at 30% 50%, rgba(59,130,246,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-16 relative">
        <Link to="/" className="font-geist font-black text-white text-xl">
          CTO<span className="gradient-text-blue">.ai</span>
        </Link>

        <div>
          <h2
            className="font-geist font-black text-white mb-6"
            style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', letterSpacing: '-0.04em', lineHeight: 1 }}
          >
            Your AI Chief
            <br />
            <span className="gradient-text-full">Technology Officer</span>
            <br />
            awaits.
          </h2>
          <p className="font-inter text-white/40 text-lg">
            Generate complete engineering blueprints
            <br />
            from a single idea.
          </p>

          {/* Feature hints */}
          <div className="mt-12 space-y-4">
            {['Architecture Design', 'Database Schema', 'API Specification', 'Security Analysis', 'Sprint Roadmap'].map((f, i) => (
              <motion.div
                key={f}
                className="flex items-center gap-3 text-sm font-inter text-white/40"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                {f}
              </motion.div>
            ))}
          </div>
        </div>

        <p className="text-white/15 font-inter text-xs">© 2025 CTO.ai. All rights reserved.</p>
      </div>

      {/* Right panel — form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="glass-panel rounded-3xl p-10">
            <div className="mb-8">
              <h1 className="font-geist font-bold text-white text-2xl mb-2">Welcome back</h1>
              <p className="font-inter text-white/40 text-sm">Sign in to your Command Center</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-inter text-white/50 text-xs uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="login-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full glass rounded-xl px-4 py-3 font-inter text-sm text-white placeholder-white/20 outline-none focus:border-blue-500/50 transition-colors"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="block font-inter text-white/50 text-xs uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    id="login-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full glass rounded-xl px-4 py-3 pr-12 font-inter text-sm text-white placeholder-white/20 outline-none transition-colors"
                    style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-red-400/80 text-sm font-inter">{error}</p>
              )}

              <button
                type="submit"
                id="login-submit-btn"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </span>
                ) : (
                  <>Enter Command Center <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/5 text-center">
              <p className="font-inter text-white/30 text-sm">
                No account?{' '}
                <Link to="/register" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Initialize your system
                </Link>
              </p>
            </div>
          </div>

          {/* Demo hint */}
          <p className="mt-6 text-center font-inter text-white/20 text-xs">
            Demo: any email + any password works
          </p>
        </motion.div>
      </div>
    </div>
  )
}
