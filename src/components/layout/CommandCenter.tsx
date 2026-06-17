import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '../../stores/uiStore'
import { useBlueprintStore } from '../../stores/blueprintStore'
import {
  LayoutDashboard, Plus, FolderOpen, FileText, GitBranch,
  Database, Globe, Shield, Server, DollarSign, Calendar,
  Users, TriangleAlert, BookOpen, MessageSquare,
  LogOut, ChevronLeft, ChevronRight, Cpu, Bell, Search
} from 'lucide-react'
import CommandPalette from './CommandPalette'

const navItems = [
  { id: 'home',           label: 'Intelligence Hub',        icon: LayoutDashboard, path: '/command-center' },
  { id: 'sep1',          label: '',                          icon: null, path: '', separator: true },
  { id: 'initialize',    label: 'Initialize System',         icon: Plus,           path: '/command-center/initialize' },
  { id: 'overview',      label: 'System Overview',           icon: FolderOpen,     path: '/command-center/overview' },
  { id: 'sep2',          label: '',                          icon: null, path: '', separator: true },
  { id: 'requirements',  label: 'Requirements Studio',       icon: FileText,       path: '/command-center/requirements' },
  { id: 'architecture',  label: 'Architecture Designer',     icon: GitBranch,      path: '/command-center/architecture' },
  { id: 'database',      label: 'Database Designer',         icon: Database,       path: '/command-center/database' },
  { id: 'api',           label: 'API Explorer',              icon: Globe,          path: '/command-center/api' },
  { id: 'sep3',          label: '',                          icon: null, path: '', separator: true },
  { id: 'security',      label: 'Security Center',           icon: Shield,         path: '/command-center/security' },
  { id: 'infrastructure',label: 'Infrastructure Planner',    icon: Server,         path: '/command-center/infrastructure' },
  { id: 'costs',         label: 'Cost Simulator',            icon: DollarSign,     path: '/command-center/costs' },
  { id: 'sep4',          label: '',                          icon: null, path: '', separator: true },
  { id: 'sprints',       label: 'Sprint Planner',            icon: Calendar,       path: '/command-center/sprints' },
  { id: 'team',          label: 'Engineering Corps',         icon: Users,          path: '/command-center/team' },
  { id: 'risks',         label: 'Risk Intelligence',         icon: TriangleAlert,  path: '/command-center/risks' },
  { id: 'sep5',          label: '',                          icon: null, path: '', separator: true },
  { id: 'docs',          label: 'Documentation Hub',         icon: BookOpen,       path: '/command-center/docs' },
  { id: 'chat',          label: 'CTO Intelligence',          icon: MessageSquare,  path: '/command-center/chat' },
]

export default function CommandCenter() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout, setCommandPaletteOpen } = useUIStore()
  const { sidebarOpen, toggleSidebar } = useUIStore()
  const activeProject = useBlueprintStore((s) => s.getActiveProject())

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#050816' }}>
      {/* Command Palette */}
      <CommandPalette />
      {/* Ambient background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 60% at 15% 50%, rgba(59,130,246,0.04) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 85% 30%, rgba(139,92,246,0.04) 0%, transparent 60%)
          `,
        }}
      />

      {/* Sidebar */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside
            key="sidebar"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 flex-shrink-0 flex flex-col"
            style={{
              background: 'rgba(10,15,31,0.95)',
              borderRight: '1px solid rgba(255,255,255,0.05)',
              height: '100vh',
              position: 'sticky',
              top: 0,
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            {/* Logo + neural indicator */}
            <div className="flex items-center justify-between px-6 py-6 flex-shrink-0">
              <div
                className="font-geist font-black text-white text-lg cursor-pointer"
                onClick={() => navigate('/')}
              >
                CTO<span className="gradient-text-blue">.ai</span>
              </div>
              {/* Neural activity pulse */}
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-mono text-green-400/60">ACTIVE</span>
              </div>
            </div>

            {/* Active project */}
            {activeProject && (
              <div className="mx-4 mb-4 glass-panel rounded-xl px-4 py-3">
                <div className="text-xs font-mono text-white/30 uppercase tracking-wider mb-1">Active System</div>
                <div className="font-geist font-semibold text-white text-sm truncate">{activeProject.name}</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-0.5 rounded bg-white/5">
                    <div
                      className="h-full rounded bg-blue-500"
                      style={{ width: `${activeProject.readiness}%` }}
                    />
                  </div>
                  <span className="text-xs text-blue-400/70 font-mono">{activeProject.readiness}%</span>
                </div>
              </div>
            )}

            {/* Nav items */}
            <nav className="flex-1 px-3 space-y-0.5 pb-4">
              {navItems.map((item) => {
                if ('separator' in item && item.separator) {
                  return <div key={item.id} className="my-3 h-px bg-white/5" />
                }
                const Icon = item.icon!
                const isActive = location.pathname === item.path ||
                  (item.path === '/command-center' && location.pathname === '/command-center')
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group"
                    style={{
                      background: isActive ? 'rgba(59,130,246,0.12)' : 'transparent',
                      color: isActive ? '#3B82F6' : 'rgba(255,255,255,0.4)',
                    }}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0 group-hover:text-white transition-colors" style={{ color: isActive ? '#3B82F6' : undefined }} />
                    <span className="text-sm font-inter truncate group-hover:text-white/70 transition-colors">{item.label}</span>
                    {isActive && <div className="ml-auto w-1 h-4 rounded-full bg-blue-400" />}
                  </button>
                )
              })}
            </nav>

            {/* User footer */}
            <div className="flex-shrink-0 px-4 py-4 border-t border-white/5">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-geist flex-shrink-0"
                  style={{ background: 'rgba(59,130,246,0.2)', color: '#3B82F6' }}
                >
                  {user?.name?.[0]?.toUpperCase() ?? 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white/70 text-sm font-inter truncate">{user?.name ?? 'User'}</div>
                  <div className="text-white/25 text-xs font-inter truncate">{user?.email ?? ''}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/60 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Top bar */}
        <header
          className="flex items-center justify-between px-8 py-4 flex-shrink-0"
          style={{
            background: 'rgba(5,8,22,0.8)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/60 transition-colors"
            >
              {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm font-inter">
              <span className="text-white/25">Command Center</span>
              <span className="text-white/15">/</span>
              <span className="text-white/60">
                {navItems.find((n) => n.path === location.pathname)?.label ?? 'Intelligence Hub'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Cmd+K search trigger */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="flex items-center gap-2 glass rounded-full px-4 py-2 hover:bg-white/8 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-white/30" />
              <span className="text-xs font-mono text-white/25 hidden sm:block">Search...</span>
              <kbd className="text-white/15 font-mono text-xs border border-white/10 rounded px-1.5 py-0.5 hidden sm:block">⌘K</kbd>
            </button>
            <div className="flex items-center gap-2 glass rounded-full px-4 py-2">
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs font-mono text-blue-400/80">AI Ready</span>
            </div>
            <button className="p-2 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/60 transition-colors relative">
              <Bell className="w-4 h-4" />
              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-400" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
