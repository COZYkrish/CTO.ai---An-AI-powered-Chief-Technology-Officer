import { motion } from 'framer-motion'
import { useBlueprintStore } from '../../stores/blueprintStore'
import { useNavigate } from 'react-router-dom'
import EmptyBlueprintState from '../../components/ui/EmptyBlueprintState'
import { GitBranch, Database, Shield, Server, FileText, Calendar, ArrowRight, Zap } from 'lucide-react'

const artifacts = [
  { label: 'Requirements Studio', icon: FileText, path: '/command-center/requirements', color: '#3B82F6' },
  { label: 'Architecture Designer', icon: GitBranch, path: '/command-center/architecture', color: '#06B6D4' },
  { label: 'Database Designer', icon: Database, path: '/command-center/database', color: '#8B5CF6' },
  { label: 'Security Center', icon: Shield, path: '/command-center/security', color: '#F59E0B' },
  { label: 'Infrastructure Planner', icon: Server, path: '/command-center/infrastructure', color: '#10B981' },
  { label: 'Sprint Planner', icon: Calendar, path: '/command-center/sprints', color: '#6366F1' },
]

export default function SystemOverview() {
  const navigate = useNavigate()
  const project = useBlueprintStore((s) => s.getActiveProject())
  const blueprint = project?.blueprint
  
  if (!blueprint) {
    return <EmptyBlueprintState title="System Overview" />
  }
  const arch = blueprint.architecture

  const techStack = [
    ...arch.components.filter(c => c.type === 'frontend').map(c => c.technology),
    ...arch.components.filter(c => c.type === 'backend').map(c => c.technology),
    ...arch.components.filter(c => c.type === 'database').map(c => c.technology),
  ].slice(0, 8)

  return (
    <div className="p-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs font-mono text-cyan-400/60 uppercase tracking-widest mb-2">System Overview</p>
        <h1 className="font-geist font-black text-white mb-1" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '-0.03em' }}>
          {project?.name ?? 'Nexus AI Platform'}
        </h1>
        <p className="font-inter text-white/40 text-sm">{arch.pattern} · {arch.scalingStrategy?.split('.')[0]}</p>
      </motion.div>

      {/* Score cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Readiness Score', value: project?.readiness ?? 87, suffix: '%', color: '#10B981', desc: 'Production ready' },
          { label: 'Complexity Score', value: project?.complexity ?? 7, suffix: '/10', color: '#F59E0B', desc: 'Enterprise-grade' },
          { label: 'Security Score', value: blueprint.security.score, suffix: '%', color: '#8B5CF6', desc: 'Above average' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            className="glass-panel rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <p className="font-inter text-white/40 text-xs mb-3 uppercase tracking-wider">{s.label}</p>
            <div className="flex items-end gap-1 mb-3">
              <span className="font-geist font-black text-4xl" style={{ color: s.color }}>{s.value}</span>
              <span className="font-mono text-white/30 text-sm mb-1">{s.suffix}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 mb-2">
              <motion.div
                className="h-full rounded-full"
                style={{ background: s.color }}
                initial={{ width: 0 }}
                animate={{ width: `${typeof s.value === 'number' && s.suffix === '%' ? s.value : (s.value as number) * 10}%` }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 + i * 0.1 }}
              />
            </div>
            <p className="font-mono text-xs" style={{ color: s.color, opacity: 0.7 }}>{s.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Architecture rationale */}
      <motion.div className="glass-panel rounded-2xl p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-4 h-4 text-blue-400" />
          <h3 className="font-geist font-semibold text-white text-sm">Architecture Decision</h3>
        </div>
        <p className="font-inter text-white/50 text-sm leading-relaxed">{arch.rationale}</p>
      </motion.div>

      {/* Tech stack */}
      <motion.div className="glass-panel rounded-2xl p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
        <h3 className="font-geist font-semibold text-white text-sm mb-4">Recommended Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          {techStack.map((t) => (
            <span key={t} className="px-3 py-1.5 rounded-lg text-xs font-mono" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#3B82F6' }}>
              {t}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Artifact links */}
      <div>
        <h3 className="font-geist font-semibold text-white text-sm mb-4">Engineering Artifacts</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {artifacts.map((a, i) => {
            const Icon = a.icon
            return (
              <motion.button
                key={a.label}
                onClick={() => navigate(a.path)}
                className="glass-panel rounded-xl p-4 text-left hover:scale-[1.02] transition-transform group"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.07 }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: `${a.color}15` }}>
                  <Icon className="w-4 h-4" style={{ color: a.color }} />
                </div>
                <div className="font-inter text-white/60 text-xs group-hover:text-white/80 transition-colors">{a.label}</div>
                <ArrowRight className="w-3 h-3 text-white/20 mt-2 group-hover:text-white/40 transition-colors" />
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
