import { motion } from 'framer-motion'
import { useBlueprintStore } from '../../stores/blueprintStore'
import { MOCK_BLUEPRINT } from '../../lib/mock/mockData'
import { Server, CheckCircle2 } from 'lucide-react'

export default function InfrastructurePlanner() {
  const project = useBlueprintStore((s) => s.getActiveProject())
  const infra = project?.blueprint?.infrastructure ?? MOCK_BLUEPRINT.infrastructure

  return (
    <div className="p-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs font-mono text-green-400/60 uppercase tracking-widest mb-2">Infrastructure Planner</p>
        <h1 className="font-geist font-black text-white mb-1" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.03em' }}>
          Cloud Architecture
        </h1>
        <div className="flex items-center gap-3 mt-2">
          <span className="px-3 py-1 rounded-lg font-mono text-xs uppercase" style={{ background: 'rgba(255,153,0,0.1)', border: '1px solid rgba(255,153,0,0.2)', color: '#ff9900' }}>
            {infra.provider.toUpperCase()}
          </span>
          <span className="font-inter text-white/40 text-sm">{infra.deploymentStrategy}</span>
        </div>
      </motion.div>

      {/* Services grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {infra.services.map((svc, i) => (
          <motion.div key={svc.name} className="glass-panel rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.1)' }}>
                <Server className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <div className="font-geist font-semibold text-white text-sm">{svc.name}</div>
                <div className="text-white/30 text-xs font-mono">{svc.service}</div>
              </div>
            </div>
            <p className="text-white/40 font-inter text-xs mb-3">{svc.purpose}</p>
            <div className="flex items-center justify-between">
              <span className="text-white/25 font-mono text-xs">{svc.tier}</span>
              <span className="font-geist font-bold text-green-400">${svc.monthlyEstimate}<span className="text-white/25 font-normal text-xs">/mo</span></span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monitoring */}
        <motion.div className="glass-panel rounded-2xl p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <h3 className="font-geist font-semibold text-white text-sm mb-4">Monitoring Stack</h3>
          <div className="space-y-2">
            {infra.monitoring.map((m, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-inter">
                <CheckCircle2 className="w-4 h-4 text-green-400/60 flex-shrink-0" />
                <span className="text-white/50">{m}</span>
              </div>
            ))}
          </div>
        </motion.div>
        {/* Scaling */}
        <motion.div className="glass-panel rounded-2xl p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
          <h3 className="font-geist font-semibold text-white text-sm mb-4">Scaling Strategy</h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(infra.scaling).map(([key, val]) => (
              <div key={key} className="glass rounded-xl p-3">
                <div className="text-white/30 font-mono text-xs mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                <div className="font-geist font-bold" style={{ color: val ? '#10B981' : '#6b7280' }}>{val ? 'Enabled' : 'Disabled'}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
