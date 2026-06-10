import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useUIStore } from '../../stores/uiStore'
import { Search, LayoutDashboard, Cpu, Shield, DollarSign, GitBranch, FileText, Zap, Users, AlertTriangle, BookOpen, MessageSquare, Server } from 'lucide-react'

const commands = [
  { id: 'hub', label: 'Intelligence Hub', icon: LayoutDashboard, path: '/command-center', section: 'Navigate' },
  { id: 'init', label: 'Initialize System', icon: Zap, path: '/command-center/initialize', section: 'Navigate' },
  { id: 'overview', label: 'System Overview', icon: LayoutDashboard, path: '/command-center/overview', section: 'Navigate' },
  { id: 'arch', label: 'Architecture Designer', icon: GitBranch, path: '/command-center/architecture', section: 'Navigate' },
  { id: 'db', label: 'Database Designer', icon: Server, path: '/command-center/database', section: 'Navigate' },
  { id: 'api', label: 'API Explorer', icon: FileText, path: '/command-center/api', section: 'Navigate' },
  { id: 'security', label: 'Security Center', icon: Shield, path: '/command-center/security', section: 'Navigate' },
  { id: 'infra', label: 'Infrastructure Planner', icon: Server, path: '/command-center/infrastructure', section: 'Navigate' },
  { id: 'cost', label: 'Cost Simulator', icon: DollarSign, path: '/command-center/costs', section: 'Navigate' },
  { id: 'sprint', label: 'Sprint Planner', icon: LayoutDashboard, path: '/command-center/sprints', section: 'Navigate' },
  { id: 'team', label: 'Engineering Corps', icon: Users, path: '/command-center/team', section: 'Navigate' },
  { id: 'risk', label: 'Risk Intelligence', icon: AlertTriangle, path: '/command-center/risks', section: 'Navigate' },
  { id: 'docs', label: 'Documentation Hub', icon: BookOpen, path: '/command-center/docs', section: 'Navigate' },
  { id: 'chat', label: 'CTO Intelligence', icon: MessageSquare, path: '/command-center/chat', section: 'Navigate' },
  { id: 'new', label: 'New Blueprint', icon: Cpu, path: '/command-center/initialize', section: 'Actions' },
]

export default function CommandPalette() {
  const navigate = useNavigate()
  const { commandPaletteOpen, setCommandPaletteOpen } = useUIStore()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(!commandPaletteOpen)
        setQuery('')
        setSelected(0)
      }
      if (e.key === 'Escape') setCommandPaletteOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [commandPaletteOpen, setCommandPaletteOpen])

  useEffect(() => {
    if (commandPaletteOpen) setTimeout(() => inputRef.current?.focus(), 50)
  }, [commandPaletteOpen])

  useEffect(() => setSelected(0), [query])

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)) }
    if (e.key === 'Enter' && filtered[selected]) { navigate(filtered[selected].path); setCommandPaletteOpen(false) }
  }

  const sections = [...new Set(filtered.map((c) => c.section))]

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setCommandPaletteOpen(false)}
          />

          {/* Palette */}
          <motion.div
            className="fixed z-[201] top-[20vh] left-1/2 -translate-x-1/2 w-full max-w-xl"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="glass-panel rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(59,130,246,0.2)', boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 60px rgba(59,130,246,0.1)' }}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <Search className="w-4 h-4 text-white/30 flex-shrink-0" />
                <input
                  ref={inputRef}
                  id="command-palette-input"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Search commands..."
                  className="flex-1 bg-transparent text-white font-inter text-sm outline-none placeholder-white/25"
                />
                <kbd className="text-white/20 font-mono text-xs border border-white/10 rounded px-1.5 py-0.5">ESC</kbd>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto py-2">
                {filtered.length === 0 && (
                  <p className="text-center text-white/25 font-inter text-sm py-8">No commands found</p>
                )}
                {sections.map((section) => (
                  <div key={section}>
                    <p className="px-5 py-2 text-white/20 font-mono text-xs uppercase tracking-widest">{section}</p>
                    {filtered.filter((c) => c.section === section).map((cmd) => {
                      const Icon = cmd.icon
                      const idx = filtered.indexOf(cmd)
                      return (
                        <button
                          key={cmd.id}
                          className="w-full flex items-center gap-3 px-5 py-3 text-left transition-colors"
                          style={{
                            background: idx === selected ? 'rgba(59,130,246,0.1)' : 'transparent',
                            borderLeft: idx === selected ? '2px solid rgba(59,130,246,0.6)' : '2px solid transparent',
                          }}
                          onMouseEnter={() => setSelected(idx)}
                          onClick={() => { navigate(cmd.path); setCommandPaletteOpen(false) }}
                        >
                          <Icon className="w-4 h-4 text-white/40 flex-shrink-0" />
                          <span className="font-inter text-sm text-white/70">{cmd.label}</span>
                        </button>
                      )
                    })}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center gap-4 px-5 py-3 text-white/20 font-mono text-xs" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <span><kbd className="border border-white/10 rounded px-1">↑↓</kbd> navigate</span>
                <span><kbd className="border border-white/10 rounded px-1">↵</kbd> open</span>
                <span className="ml-auto">⌘K to toggle</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
