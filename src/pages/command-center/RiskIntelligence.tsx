import { motion } from 'framer-motion'
import { TriangleAlert, OctagonAlert, Info } from 'lucide-react'

import EmptyBlueprintState from '../../components/ui/EmptyBlueprintState'
import { useBlueprintStore } from '../../stores/blueprintStore'

const severityConfig = {
  critical: { color: '#ef4444', Icon: OctagonAlert, label: 'Critical' },
  high: { color: '#f59e0b', Icon: TriangleAlert, label: 'High' },
  medium: { color: '#3B82F6', Icon: Info, label: 'Medium' },
  low: { color: '#6b7280', Icon: Info, label: 'Low' },
}

export default function RiskIntelligence() {
  const project = useBlueprintStore((s) => s.getActiveProject())
  const blueprint = project?.blueprint
  if (!blueprint) {
    return <EmptyBlueprintState title="Risk Intelligence" />
  }
  const risks = blueprint.risks || []
  const criticalCount = risks.filter(r => r.severity === 'critical').length
  const highCount = risks.filter(r => r.severity === 'high').length

  return (
    <div className="p-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs font-mono text-red-400/60 uppercase tracking-widest mb-2">Risk Intelligence</p>
        <h1 className="font-geist font-black text-white" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.03em' }}>Risk Analysis</h1>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Risks', value: risks.length, color: '#6366F1' },
          { label: 'Critical', value: criticalCount, color: '#ef4444' },
          { label: 'High', value: highCount, color: '#f59e0b' },
          { label: 'Mitigated', value: risks.length, color: '#10B981' },
        ].map((s, i) => (
          <motion.div key={s.label} className="glass-panel rounded-2xl p-5 text-center"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}>
            <div className="font-geist font-black text-3xl mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="font-inter text-white/40 text-xs">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Risk matrix */}
      <div className="space-y-4">
        {risks.map((risk, i) => {
          const { color, Icon, label } = severityConfig[risk.severity as keyof typeof severityConfig]
          return (
            <motion.div key={risk.name} className="glass-panel rounded-2xl p-6"
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.09 }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-3 mb-2">
                    <h3 className="font-geist font-bold text-white text-sm">{risk.name}</h3>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: `${color}15`, color }}>{label}</span>
                    <span className="text-xs font-mono text-white/25">{risk.category}</span>
                  </div>
                  <p className="font-inter text-white/45 text-sm mb-3">{risk.description}</p>
                  {/* Probability / Impact bars */}
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    {[{ label: 'Probability', value: risk.probability }, { label: 'Impact', value: risk.impact }].map(({ label: lbl, value }) => (
                      <div key={lbl}>
                        <div className="flex justify-between text-xs font-mono text-white/25 mb-1"><span>{lbl}</span><span>{Math.round(value * 100)}%</span></div>
                        <div className="h-1.5 rounded-full bg-white/5">
                          <motion.div className="h-full rounded-full" style={{ background: color }}
                            initial={{ width: 0 }} animate={{ width: `${value * 100}%` }}
                            transition={{ duration: 1, delay: i * 0.1 + 0.3 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400/60 text-xs">✓</span>
                    <p className="font-mono text-xs text-green-400/70">{risk.mitigation}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
