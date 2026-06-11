import { useState } from 'react'
import { motion } from 'framer-motion'
import { useBlueprintStore } from '../../stores/blueprintStore'
import EmptyBlueprintState from '../../components/ui/EmptyBlueprintState'
import { Download, BookOpen, FileText, Code, Rocket } from 'lucide-react'

const docTabs = [
  { id: 'prd', label: 'PRD', icon: FileText, color: '#3B82F6' },
  { id: 'srs', label: 'SRS', icon: BookOpen, color: '#8B5CF6' },
  { id: 'readme', label: 'README', icon: Code, color: '#10B981' },
  { id: 'apiDocs', label: 'API Docs', icon: Code, color: '#06B6D4' },
  { id: 'deploymentGuide', label: 'Deployment', icon: Rocket, color: '#F59E0B' },
] as const

type DocKey = typeof docTabs[number]['id']

export default function DocumentationHub() {
  const project = useBlueprintStore((s) => s.getActiveProject())
  const blueprint = project?.blueprint
  if (!blueprint) {
    return <EmptyBlueprintState title="Documentation Hub" />
  }
  const docs = blueprint.documentation
  const [activeDoc, setActiveDoc] = useState<DocKey>('prd')

  const activeTab = docTabs.find((t) => t.id === activeDoc)!
  const content = docs[activeDoc]

  const handleExport = (format: 'md' | 'txt') => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeDoc}.${format}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-8 space-y-6 h-full flex flex-col">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-shrink-0">
        <p className="text-xs font-mono text-purple-400/60 uppercase tracking-widest mb-2">Documentation Hub</p>
        <div className="flex items-center justify-between">
          <h1 className="font-geist font-black text-white" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.03em' }}>
            Engineering Docs
          </h1>
          <div className="flex gap-2">
            <button onClick={() => handleExport('md')} className="flex items-center gap-2 btn-ghost py-2 px-4 text-sm">
              <Download className="w-3.5 h-3.5" /> Markdown
            </button>
            <button onClick={() => handleExport('txt')} className="btn-primary py-2 px-4 text-sm flex items-center gap-2">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>
        </div>
      </motion.div>

      {/* Doc tabs */}
      <div className="flex flex-wrap gap-2 flex-shrink-0">
        {docTabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button key={tab.id} onClick={() => setActiveDoc(tab.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-inter transition-all"
              style={{
                background: activeDoc === tab.id ? `${tab.color}15` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${activeDoc === tab.id ? `${tab.color}40` : 'rgba(255,255,255,0.08)'}`,
                color: activeDoc === tab.id ? tab.color : 'rgba(255,255,255,0.4)',
              }}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Content viewer */}
      <motion.div
        key={activeDoc}
        className="flex-1 glass-panel rounded-2xl p-8 overflow-auto"
        style={{ border: `1px solid ${activeTab.color}15` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <pre
          className="font-mono text-sm text-white/60 whitespace-pre-wrap leading-relaxed"
          style={{ fontFamily: 'Geist Mono, monospace' }}
        >
          {content}
        </pre>
      </motion.div>
    </div>
  )
}
