import { motion } from 'framer-motion'
import { useBlueprintStore } from '../../stores/blueprintStore'
import { MOCK_BLUEPRINT } from '../../lib/mock/mockData'
import { Shield, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'

const severityColor: Record<string, string> = { critical: '#ef4444', high: '#f59e0b', medium: '#3B82F6', low: '#6b7280' }
const statusIcon = { pass: CheckCircle2, fail: XCircle, warning: AlertTriangle }
const statusColor = { pass: '#10B981', fail: '#ef4444', warning: '#f59e0b' }

export default function SecurityCenter() {
  const project = useBlueprintStore((s) => s.getActiveProject())
  const sec = project?.blueprint?.security ?? MOCK_BLUEPRINT.security

  const scoreColor = sec.score >= 80 ? '#10B981' : sec.score >= 60 ? '#f59e0b' : '#ef4444'

  return (
    <div className="p-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs font-mono text-yellow-400/60 uppercase tracking-widest mb-2">Security Center</p>
        <h1 className="font-geist font-black text-white" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.03em' }}>Security Intelligence</h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score */}
        <motion.div className="glass-panel rounded-2xl p-8 flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
          <div className="relative w-28 h-28 mb-4">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              <motion.circle
                cx="50" cy="50" r="40" fill="none"
                stroke={scoreColor} strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - sec.score / 100) }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div>
                <div className="font-geist font-black text-3xl" style={{ color: scoreColor }}>{sec.score}</div>
                <div className="text-white/30 font-mono text-xs">/ 100</div>
              </div>
            </div>
          </div>
          <div className="font-geist font-semibold text-white">Security Score</div>
          <div className="font-mono text-xs mt-1" style={{ color: scoreColor }}>
            {sec.score >= 80 ? 'Strong' : sec.score >= 60 ? 'Moderate' : 'Needs Work'}
          </div>
        </motion.div>

        {/* Threat Matrix */}
        <motion.div className="lg:col-span-2 glass-panel rounded-2xl p-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
          <h3 className="font-geist font-semibold text-white text-sm mb-5 flex items-center gap-2">
            <Shield className="w-4 h-4 text-yellow-400" /> Threat Analysis
          </h3>
          <div className="space-y-4">
            {sec.threats.map((t, i) => (
              <motion.div key={t.name} className="glass rounded-xl p-4"
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.08 }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: severityColor[t.severity] }} />
                  <span className="font-geist font-semibold text-white text-sm flex-1">{t.name}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: `${severityColor[t.severity]}15`, color: severityColor[t.severity] }}>
                    {t.severity}
                  </span>
                </div>
                <p className="text-white/35 font-inter text-xs mb-2">{t.description}</p>
                <p className="font-mono text-xs" style={{ color: '#10B981', opacity: 0.7 }}>✓ {t.mitigation}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* OWASP */}
      <motion.div className="glass-panel rounded-2xl p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <h3 className="font-geist font-semibold text-white text-sm mb-5">OWASP Top 10 Checks</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sec.owaspChecks.map((check, i) => {
            const Icon = statusIcon[check.status]
            return (
              <motion.div key={check.id} className="glass rounded-xl p-4"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.06 }}>
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 flex-shrink-0" style={{ color: statusColor[check.status] }} />
                  <span className="font-mono text-xs text-white/30">{check.id}</span>
                  <span className="font-inter text-white/70 text-xs ml-1">{check.name}</span>
                </div>
                <p className="text-white/30 font-inter text-xs">{check.recommendation}</p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
