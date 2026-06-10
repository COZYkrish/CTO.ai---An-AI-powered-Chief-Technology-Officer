import { motion } from 'framer-motion'
import { Users } from 'lucide-react'

const roles = [
  { title: 'Full-Stack Engineer', count: 2, priority: 'critical', skills: ['React', 'Node.js', 'PostgreSQL', 'REST APIs'], salary: '$110k–$140k', color: '#3B82F6' },
  { title: 'AI/ML Engineer', count: 1, priority: 'critical', skills: ['Python', 'TensorFlow', 'FastAPI', 'MLOps'], salary: '$130k–$160k', color: '#8B5CF6' },
  { title: 'DevOps Engineer', count: 1, priority: 'high', skills: ['AWS', 'Docker', 'Terraform', 'CI/CD'], salary: '$100k–$130k', color: '#10B981' },
  { title: 'Product Designer', count: 1, priority: 'high', skills: ['Figma', 'UX Research', 'Design Systems'], salary: '$90k–$120k', color: '#06B6D4' },
  { title: 'QA Engineer', count: 1, priority: 'medium', skills: ['Cypress', 'Jest', 'API testing', 'Performance'], salary: '$75k–$100k', color: '#F59E0B' },
]

const priorityColor: Record<string, string> = { critical: '#ef4444', high: '#f59e0b', medium: '#3B82F6' }

export default function EngineeringCorps() {
  const totalTeam = roles.reduce((a, r) => a + r.count, 0)

  return (
    <div className="p-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs font-mono text-cyan-400/60 uppercase tracking-widest mb-2">Engineering Corps</p>
        <h1 className="font-geist font-black text-white mb-1" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.03em' }}>Team Blueprint</h1>
        <p className="font-inter text-white/40 text-sm">{totalTeam} recommended hires across {roles.length} roles</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {roles.map((role, i) => (
          <motion.div key={role.title} className="glass-panel rounded-2xl p-6"
            style={{ border: `1px solid ${role.color}15` }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${role.color}15` }}>
                <Users className="w-5 h-5" style={{ color: role.color }} />
              </div>
              <div className="text-right">
                <div className="font-geist font-black text-white text-2xl">{role.count}</div>
                <div className="text-white/30 font-mono text-xs">headcount</div>
              </div>
            </div>
            <h3 className="font-geist font-bold text-white mb-1">{role.title}</h3>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: `${priorityColor[role.priority]}15`, color: priorityColor[role.priority] }}>
                {role.priority}
              </span>
              <span className="text-white/30 font-mono text-xs">{role.salary}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {role.skills.map((skill) => (
                <span key={skill} className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: `${role.color}10`, color: role.color, opacity: 0.8 }}>
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div className="glass-panel rounded-2xl p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <h3 className="font-geist font-semibold text-white text-sm mb-5">Hiring Timeline Recommendation</h3>
        <div className="space-y-3">
          {[
            { phase: 'Month 1–2', roles: ['Full-Stack Engineers (×2)'], note: 'Core product development' },
            { phase: 'Month 3', roles: ['AI/ML Engineer'], note: 'AI coaching engine' },
            { phase: 'Month 4–5', roles: ['DevOps Engineer', 'QA Engineer'], note: 'Scale & reliability' },
            { phase: 'Month 6', roles: ['Product Designer'], note: 'UX refinement for growth' },
          ].map((phase, i) => (
            <div key={i} className="flex gap-6 text-sm font-inter">
              <span className="text-blue-400/70 font-mono text-xs w-24 flex-shrink-0 pt-0.5">{phase.phase}</span>
              <div>
                <div className="text-white/60">{phase.roles.join(', ')}</div>
                <div className="text-white/25 text-xs mt-0.5">{phase.note}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
