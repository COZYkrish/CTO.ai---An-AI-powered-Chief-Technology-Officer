import { useState } from 'react'
import { motion } from 'framer-motion'
import { useBlueprintStore } from '../../stores/blueprintStore'
import { MOCK_BLUEPRINT } from '../../lib/mock/mockData'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts'

const tiers = [
  { key: 'users100', label: '100 users' },
  { key: 'users1k', label: '1,000 users' },
  { key: 'users10k', label: '10,000 users' },
  { key: 'users100k', label: '100,000 users' },
] as const

const COLORS = ['#3B82F6', '#06B6D4', '#8B5CF6', '#10B981']

export default function CostSimulator() {
  const project = useBlueprintStore((s) => s.getActiveProject())
  const costs = project?.blueprint?.costs ?? MOCK_BLUEPRINT.costs
  const [activeTier, setActiveTier] = useState<typeof tiers[number]['key']>('users10k')

  const tierData = costs.scenarios[activeTier]
  const barData = tierData.breakdown.map((b) => ({ name: b.category, value: b.amount }))

  return (
    <div className="p-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs font-mono text-blue-400/60 uppercase tracking-widest mb-2">Cost Simulator</p>
        <h1 className="font-geist font-black text-white mb-1" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.03em' }}>
          Infrastructure Costs
        </h1>
        <p className="font-inter text-white/40 text-sm">Scaling simulation across user tiers</p>
      </motion.div>

      {/* Tier selector */}
      <div className="flex flex-wrap gap-2">
        {tiers.map((tier) => (
          <button key={tier.key} onClick={() => setActiveTier(tier.key)}
            className="px-5 py-2.5 rounded-xl text-sm font-inter transition-all"
            style={{
              background: activeTier === tier.key ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${activeTier === tier.key ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.08)'}`,
              color: activeTier === tier.key ? '#3B82F6' : 'rgba(255,255,255,0.4)',
            }}
          >
            {tier.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total cost */}
        <motion.div className="glass-panel rounded-2xl p-8 flex flex-col justify-center"
          key={activeTier} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <p className="text-white/40 font-inter text-sm mb-2">Estimated monthly cost</p>
          <div className="font-geist font-black text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', letterSpacing: '-0.04em' }}>
            ${tierData.total.toLocaleString()}
            <span className="text-white/25 text-xl font-normal">/mo</span>
          </div>
          <p className="mt-4 font-mono text-sm text-white/30">${(tierData.total / 12).toFixed(0)}/day avg</p>
        </motion.div>

        {/* Breakdown chart */}
        <motion.div className="glass-panel rounded-2xl p-6"
          key={activeTier + 'chart'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
          <h3 className="font-geist font-semibold text-white text-sm mb-5">Cost Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData} barCategoryGap="30%">
              <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip contentStyle={{ background: '#0A0F1F', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, color: '#fff' }} formatter={(v) => [`$${v}`, 'Cost']} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {barData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.8} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* All tiers comparison */}
      <motion.div className="glass-panel rounded-2xl p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <h3 className="font-geist font-semibold text-white text-sm mb-5">Scaling Trajectory</h3>
        <div className="grid grid-cols-4 gap-4">
          {tiers.map((tier) => {
            const data = costs.scenarios[tier.key]
            const isActive = activeTier === tier.key
            return (
              <div key={tier.key} className="text-center cursor-pointer" onClick={() => setActiveTier(tier.key)}>
                <div className="font-geist font-black mb-1 transition-all" style={{ color: isActive ? '#3B82F6' : 'rgba(255,255,255,0.4)', fontSize: isActive ? '1.4rem' : '1rem' }}>
                  ${data.total.toLocaleString()}
                </div>
                <div className="font-inter text-white/30 text-xs">{tier.label}</div>
                <div className="mt-2 h-1 rounded-full" style={{ background: isActive ? '#3B82F6' : 'rgba(255,255,255,0.08)' }} />
              </div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
