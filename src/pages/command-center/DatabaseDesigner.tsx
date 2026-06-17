import { useState } from 'react'
import { motion } from 'framer-motion'
import { useBlueprintStore } from '../../stores/blueprintStore'
import EmptyBlueprintState from '../../components/ui/EmptyBlueprintState'
import { ChevronDown, ChevronRight } from 'lucide-react'

const columnTypeColor: Record<string, string> = {
  UUID: '#8B5CF6', VARCHAR: '#3B82F6', TEXT: '#06B6D4',
  BOOLEAN: '#10B981', TIMESTAMPTZ: '#F59E0B', JSONB: '#EC4899', ENUM: '#6366F1',
}

export default function DatabaseDesigner() {
  const project = useBlueprintStore((s) => s.getActiveProject())
  const blueprint = project?.blueprint
  if (!blueprint) {
    return <EmptyBlueprintState title="Database Designer" />
  }
  const db = blueprint.database
  const [expanded, setExpanded] = useState<string>(db?.tables?.[0]?.name ?? '')

  return (
    <div className="p-8 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs font-mono text-purple-400/60 uppercase tracking-widest mb-2">Database Designer</p>
        <h1 className="font-geist font-black text-white mb-1" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.03em' }}>
          {db?.type || 'Database'}
        </h1>
        <p className="font-inter text-white/40 text-sm">{db?.tables?.length || 0} tables · {db?.relationships?.length || 0} relationships · {db?.indexes?.length || 0} indexes</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tables */}
        <div className="space-y-3">
          <h3 className="font-geist font-semibold text-white text-sm mb-4">Tables</h3>
          {(db?.tables || []).map((table, i) => (
            <motion.div
              key={table.name}
              className="glass-panel rounded-xl overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => setExpanded(expanded === table.name ? '' : table.name)}
            >
              <div className="flex items-center gap-3 px-5 py-4">
                <div className="w-2 h-2 rounded-full bg-purple-400/60" />
                <span className="font-mono text-white/80 text-sm font-semibold">{table.name}</span>
                <span className="text-white/30 text-xs font-mono ml-auto">{table?.columns?.length || 0} cols</span>
                {expanded === table.name ? <ChevronDown className="w-4 h-4 text-white/30" /> : <ChevronRight className="w-4 h-4 text-white/30" />}
              </div>
              {expanded === table.name && (
                <div className="border-t border-white/5">
                  <table className="w-full text-xs font-mono">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left px-5 py-2 text-white/30">Column</th>
                        <th className="text-left px-3 py-2 text-white/30">Type</th>
                        <th className="text-left px-3 py-2 text-white/30">Attr</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(table?.columns || []).map((col) => (
                        <tr key={col.name} className="border-b border-white/5 last:border-0 hover:bg-white/2">
                          <td className="px-5 py-2 text-white/70">{col.name}</td>
                          <td className="px-3 py-2">
                            <span className="px-2 py-0.5 rounded text-xs" style={{
                              background: `${columnTypeColor[col.type.split('(')[0]] ?? '#3B82F6'}15`,
                              color: columnTypeColor[col.type.split('(')[0]] ?? '#3B82F6',
                            }}>
                              {col.type.split('(')[0]}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-white/30">
                            {col.primaryKey && <span className="text-yellow-400/70 mr-1">PK</span>}
                            {col.foreignKey && <span className="text-cyan-400/70 mr-1">FK</span>}
                            {col.unique && <span className="text-purple-400/70">UQ</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Relationships + Indexes */}
        <div className="space-y-6">
          <div>
            <h3 className="font-geist font-semibold text-white text-sm mb-4">Relationships</h3>
            <div className="space-y-2">
              {(db?.relationships || []).map((rel, i) => (
                <motion.div key={i} className="glass-panel rounded-xl px-5 py-4 flex items-center gap-4 text-xs font-mono"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }}>
                  <span className="text-white/60">{rel.from}</span>
                  <div className="flex-1 h-px bg-purple-400/20 relative">
                    <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded-full text-xs bg-void border border-purple-400/20 text-purple-400/70 whitespace-nowrap">
                      {rel.type}
                    </span>
                  </div>
                  <span className="text-white/60">{rel.to}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-geist font-semibold text-white text-sm mb-4">Indexes</h3>
            <div className="space-y-2">
              {(db?.indexes || []).map((idx, i) => (
                <motion.div key={i} className="glass-panel rounded-xl px-5 py-4"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-white/60 text-xs">{idx.name}</span>
                    {idx.unique && <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(139,92,246,0.1)', color: '#8B5CF6' }}>UNIQUE</span>}
                  </div>
                  <p className="text-white/30 text-xs font-mono">{idx.table} ({(idx?.columns || []).join(', ')})</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
