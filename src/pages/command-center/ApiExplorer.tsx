import { useState } from 'react'
import { motion } from 'framer-motion'
import { useBlueprintStore } from '../../stores/blueprintStore'
import { MOCK_BLUEPRINT } from '../../lib/mock/mockData'
import { ChevronDown, ChevronRight, Lock, Unlock } from 'lucide-react'

const methodColors: Record<string, string> = {
  GET: '#10B981', POST: '#3B82F6', PUT: '#F59E0B', DELETE: '#EF4444', PATCH: '#8B5CF6',
}

export default function ApiExplorer() {
  const project = useBlueprintStore((s) => s.getActiveProject())
  const api = project?.blueprint?.apis ?? MOCK_BLUEPRINT.apis
  const [expanded, setExpanded] = useState<string | null>(null)
  const [activeTag, setActiveTag] = useState('All')

  const allTags = ['All', ...Array.from(new Set(api.endpoints.flatMap((e) => e.tags)))]
  const filtered = activeTag === 'All' ? api.endpoints : api.endpoints.filter((e) => e.tags.includes(activeTag))

  return (
    <div className="p-8 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs font-mono text-indigo-400/60 uppercase tracking-widest mb-2">API Explorer</p>
        <h1 className="font-geist font-black text-white mb-1" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.03em' }}>API Specification</h1>
        <div className="flex items-center gap-4 mt-2">
          <span className="font-mono text-white/30 text-xs">{api.baseUrl}</span>
          <span className="px-2 py-0.5 rounded font-mono text-xs" style={{ background: 'rgba(59,130,246,0.1)', color: '#3B82F6' }}>v{api.version}</span>
          <span className="px-2 py-0.5 rounded font-mono text-xs" style={{ background: 'rgba(139,92,246,0.1)', color: '#8B5CF6' }}>{api.authentication}</span>
        </div>
      </motion.div>

      {/* Tag filter */}
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <button key={tag} onClick={() => setActiveTag(tag)}
            className="px-4 py-1.5 rounded-full text-xs font-inter transition-all"
            style={{
              background: activeTag === tag ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${activeTag === tag ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.08)'}`,
              color: activeTag === tag ? '#3B82F6' : 'rgba(255,255,255,0.4)',
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Endpoints */}
      <div className="space-y-3">
        {filtered.map((ep, i) => (
          <motion.div
            key={ep.id}
            className="glass-panel rounded-xl overflow-hidden cursor-pointer"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            onClick={() => setExpanded(expanded === ep.id ? null : ep.id)}
          >
            <div className="flex items-center gap-4 px-5 py-4">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md w-16 text-center flex-shrink-0"
                style={{ background: `${methodColors[ep.method]}15`, color: methodColors[ep.method] }}>
                {ep.method}
              </span>
              <code className="font-mono text-white/70 text-sm flex-1 truncate">{ep.path}</code>
              {ep.auth ? <Lock className="w-3.5 h-3.5 text-yellow-400/60 flex-shrink-0" /> : <Unlock className="w-3.5 h-3.5 text-white/20 flex-shrink-0" />}
              <div className="flex gap-1 flex-shrink-0">
                {ep.tags.map((t) => <span key={t} className="text-xs text-white/25 font-mono">{t}</span>)}
              </div>
              {expanded === ep.id ? <ChevronDown className="w-4 h-4 text-white/30 flex-shrink-0" /> : <ChevronRight className="w-4 h-4 text-white/30 flex-shrink-0" />}
            </div>
            {expanded === ep.id && (
              <div className="border-t border-white/5 px-5 py-4 space-y-4">
                <p className="font-inter text-white/50 text-sm">{ep.description}</p>
                {ep.requestBody && (
                  <div>
                    <p className="text-xs font-mono text-white/30 uppercase tracking-wider mb-2">Request Body</p>
                    <pre className="text-xs font-mono text-green-400/70 bg-black/20 rounded-xl p-4 overflow-auto">
                      {JSON.stringify(ep.requestBody, null, 2)}
                    </pre>
                  </div>
                )}
                <div>
                  <p className="text-xs font-mono text-white/30 uppercase tracking-wider mb-2">Responses</p>
                  <div className="space-y-2">
                    {ep.responses.map((r) => (
                      <div key={r.status} className="flex items-start gap-3 text-xs font-mono">
                        <span className="px-2 py-0.5 rounded" style={{
                          background: r.status < 300 ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                          color: r.status < 300 ? '#10B981' : '#EF4444',
                        }}>{r.status}</span>
                        <span className="text-white/40">{r.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
