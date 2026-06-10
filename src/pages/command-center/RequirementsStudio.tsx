import { useState } from 'react'
import { motion } from 'framer-motion'
import { useBlueprintStore } from '../../stores/blueprintStore'
import { MOCK_BLUEPRINT } from '../../lib/mock/mockData'
import { CheckCircle2, Circle, ChevronDown, ChevronRight } from 'lucide-react'

const priorityColor: Record<string, string> = {
  critical: '#ef4444', high: '#f59e0b', medium: '#3B82F6', low: '#6b7280'
}

export default function RequirementsStudio() {
  const project = useBlueprintStore((s) => s.getActiveProject())
  const req = project?.blueprint?.requirements ?? MOCK_BLUEPRINT.requirements
  const [activeTab, setActiveTab] = useState<'functional' | 'nonfunctional' | 'stories'>('functional')
  const [expandedStory, setExpandedStory] = useState<string | null>(null)

  const tabs = [
    { id: 'functional', label: 'Functional', count: req.functional.length },
    { id: 'nonfunctional', label: 'Non-Functional', count: req.nonFunctional.length },
    { id: 'stories', label: 'User Stories', count: req.userStories.length },
  ] as const

  return (
    <div className="p-8 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs font-mono text-blue-400/60 uppercase tracking-widest mb-2">Requirements Studio</p>
        <h1 className="font-geist font-black text-white" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.03em' }}>
          Product Requirements
        </h1>
      </motion.div>

      {/* Tab bar */}
      <div className="flex gap-1 glass-panel rounded-xl p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-5 py-2 rounded-lg text-sm font-inter transition-all duration-200 flex items-center gap-2"
            style={{
              background: activeTab === tab.id ? 'rgba(59,130,246,0.15)' : 'transparent',
              color: activeTab === tab.id ? '#3B82F6' : 'rgba(255,255,255,0.4)',
              border: activeTab === tab.id ? '1px solid rgba(59,130,246,0.3)' : '1px solid transparent',
            }}
          >
            {tab.label}
            <span className="text-xs font-mono opacity-60">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Functional requirements */}
      {activeTab === 'functional' && (
        <div className="space-y-3">
          {req.functional.map((r, i) => (
            <motion.div
              key={r.id}
              className="glass-panel rounded-xl p-5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-blue-400/60 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-geist font-semibold text-white text-sm">{r.title}</h3>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: `${priorityColor[r.priority]}15`, color: priorityColor[r.priority] }}>
                      {r.priority}
                    </span>
                    <span className="text-xs font-mono text-white/30">{r.category}</span>
                  </div>
                  <p className="font-inter text-white/45 text-sm leading-relaxed">{r.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Non-functional */}
      {activeTab === 'nonfunctional' && (
        <div className="space-y-3">
          {req.nonFunctional.map((r, i) => (
            <motion.div
              key={r.id}
              className="glass-panel rounded-xl p-5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: `${priorityColor[r.priority]}15`, color: priorityColor[r.priority] }}>{r.priority}</span>
                <h3 className="font-geist font-semibold text-white text-sm">{r.title}</h3>
                <span className="text-xs font-mono text-white/25 ml-auto">{r.category}</span>
              </div>
              <p className="font-inter text-white/45 text-sm">{r.description}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* User stories */}
      {activeTab === 'stories' && (
        <div className="space-y-3">
          {req.userStories.map((s, i) => (
            <motion.div
              key={s.id}
              className="glass-panel rounded-xl overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => setExpandedStory(expandedStory === s.id ? null : s.id)}
            >
              <div className="p-5 flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(59,130,246,0.1)' }}>
                  <span className="text-xs font-mono text-blue-400">{s.points}pt</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-inter text-white/70 text-sm leading-relaxed">
                    As a <span className="text-blue-400">{s.role}</span>, I want to {s.action}...
                  </p>
                </div>
                {expandedStory === s.id ? <ChevronDown className="w-4 h-4 text-white/30 flex-shrink-0" /> : <ChevronRight className="w-4 h-4 text-white/30 flex-shrink-0" />}
              </div>
              {expandedStory === s.id && (
                <div className="px-5 pb-5 border-t border-white/5 pt-4">
                  <p className="text-white/40 font-inter text-xs mb-3">Benefit: {s.benefit}</p>
                  <div className="space-y-1.5">
                    {s.acceptanceCriteria.map((ac, j) => (
                      <div key={j} className="flex items-start gap-2 text-xs font-inter text-white/35">
                        <Circle className="w-3 h-3 text-green-400/50 flex-shrink-0 mt-0.5" />
                        {ac}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
