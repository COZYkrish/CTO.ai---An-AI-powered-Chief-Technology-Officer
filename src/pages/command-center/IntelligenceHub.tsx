import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useBlueprintStore } from '../../stores/blueprintStore'
import { useUIStore } from '../../stores/uiStore'
import { Plus, TrendingUp, Cpu, Shield, GitBranch, ArrowRight, Zap } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts'



const quickActions = [
  { label: 'Initialize System', icon: Plus, path: '/command-center/initialize', color: '#3B82F6' },
  { label: 'Architecture Designer', icon: GitBranch, path: '/command-center/architecture', color: '#06B6D4' },
  { label: 'Security Center', icon: Shield, path: '/command-center/security', color: '#F59E0B' },
  { label: 'CTO Intelligence', icon: Cpu, path: '/command-center/chat', color: '#8B5CF6' },
]

export default function IntelligenceHub() {
  const navigate = useNavigate()
  const { user } = useUIStore()
  const { projects } = useBlueprintStore()

  const stats = [
    { label: 'Active Systems', value: projects.length, change: projects.length > 0 ? '+1 this week' : '0 this week', icon: GitBranch, color: '#3B82F6' },
    { label: 'Blueprints Generated', value: projects.filter(p => p.status === 'complete').length, change: projects.length > 0 ? 'All complete' : '0 complete', icon: Zap, color: '#06B6D4' },
    { label: 'AI Queries', value: projects.length * 5, change: '+0 today', icon: Cpu, color: '#8B5CF6' },
    { label: 'Security Score', value: projects.length > 0 && projects[0].blueprint ? `${projects[0].blueprint.security.score}%` : 'N/A', change: projects.length > 0 ? 'Current active' : '-', icon: Shield, color: '#10B981' },
  ]

  const activityData = projects.length > 0 
    ? [ { time: 'Mon', blueprints: 0 }, { time: 'Tue', blueprints: 0 }, { time: 'Wed', blueprints: 0 }, { time: 'Thu', blueprints: 0 }, { time: 'Fri', blueprints: 0 }, { time: 'Sat', blueprints: projects.length }, { time: 'Sun', blueprints: 0 } ]
    : [ { time: 'Mon', blueprints: 0 }, { time: 'Tue', blueprints: 0 }, { time: 'Wed', blueprints: 0 }, { time: 'Thu', blueprints: 0 }, { time: 'Fri', blueprints: 0 }, { time: 'Sat', blueprints: 0 }, { time: 'Sun', blueprints: 0 } ]

  const recentActivity = projects.slice(0, 5).map(p => ({
    action: p.status === 'complete' ? 'Blueprint generated' : 'Blueprint initialized',
    project: p.name,
    time: new Date(p.updatedAt).toLocaleDateString(),
    color: '#3B82F6'
  }))

  return (
    <div className="p-8 space-y-8">
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="text-xs font-mono text-blue-400/60 uppercase tracking-widest mb-2">Intelligence Hub</p>
        <h1 className="font-geist font-black text-white" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '-0.03em' }}>
          Good evening, {user?.name?.split(' ')[0] ?? 'Builder'}.
        </h1>
        <p className="mt-2 font-inter text-white/40">Your engineering intelligence is online and ready.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              className="glass-panel rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                  <Icon className="w-4 h-4" style={{ color: stat.color }} />
                </div>
                <TrendingUp className="w-3.5 h-3.5 text-green-400/60" />
              </div>
              <div className="font-geist font-black text-white text-3xl mb-1">{stat.value}</div>
              <div className="font-inter text-white/40 text-xs">{stat.label}</div>
              <div className="mt-2 font-mono text-xs" style={{ color: stat.color, opacity: 0.7 }}>{stat.change}</div>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity chart */}
        <motion.div
          className="lg:col-span-2 glass-panel rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-geist font-semibold text-white text-sm">Blueprint Activity</h3>
              <p className="text-white/30 text-xs font-inter mt-0.5">Last 7 days</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip
                contentStyle={{ background: '#0A0F1F', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, color: '#fff' }}
                labelStyle={{ color: 'rgba(255,255,255,0.4)' }}
              />
              <Area type="monotone" dataKey="blueprints" stroke="#3B82F6" fill="url(#grad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          className="glass-panel rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <h3 className="font-geist font-semibold text-white text-sm mb-5">Quick Actions</h3>
          <div className="space-y-2">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <button
                  key={action.label}
                  onClick={() => navigate(action.path)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-left transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${action.color}15` }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: action.color }} />
                  </div>
                  <span className="font-inter text-white/50 text-sm group-hover:text-white/70 transition-colors flex-1">{action.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/40 transition-colors" />
                </button>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Recent activity */}
      <motion.div
        className="glass-panel rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-geist font-semibold text-white text-sm">Recent Activity</h3>
          <button onClick={() => navigate('/command-center/overview')} className="text-xs font-inter text-blue-400/60 hover:text-blue-400 transition-colors flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="space-y-3">
          {recentActivity.length > 0 ? (
            recentActivity.map((a, i) => (
              <div key={i} className="flex items-center gap-4 py-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: a.color }} />
                <div className="flex-1 min-w-0">
                  <span className="font-inter text-white/60 text-sm">{a.action}</span>
                  <span className="text-white/30 text-sm font-inter"> · {a.project}</span>
                </div>
                <span className="text-white/20 font-mono text-xs flex-shrink-0">{a.time}</span>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-white/30 text-sm font-inter">No recent activity</div>
          )}
        </div>
      </motion.div>

      {/* CTA if no projects */}
      {projects.length === 0 && (
        <motion.div
          className="glass-panel rounded-2xl p-10 text-center"
          style={{ border: '1px dashed rgba(59,130,246,0.2)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
            <Plus className="w-5 h-5 text-blue-400" />
          </div>
          <h3 className="font-geist font-bold text-white text-lg mb-2">Initialize your first system</h3>
          <p className="font-inter text-white/40 text-sm mb-6 max-w-sm mx-auto">
            Enter an idea. Watch CTO.ai architect the complete engineering blueprint.
          </p>
          <button onClick={() => navigate('/command-center/initialize')} className="btn-primary">
            Initialize System →
          </button>
        </motion.div>
      )}
    </div>
  )
}
