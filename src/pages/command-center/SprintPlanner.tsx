import { motion } from 'framer-motion'
import { useBlueprintStore } from '../../stores/blueprintStore'
import EmptyBlueprintState from '../../components/ui/EmptyBlueprintState'
import { Calendar, Flag } from 'lucide-react'

const taskTypeColor: Record<string, string> = { feature: '#3B82F6', infra: '#10B981', bug: '#ef4444', docs: '#8B5CF6', testing: '#F59E0B' }

export default function SprintPlanner() {
  const project = useBlueprintStore((s) => s.getActiveProject())
  const blueprint = project?.blueprint
  if (!blueprint || !blueprint.roadmap) {
    return <EmptyBlueprintState title="Sprint Planner" />
  }
  const roadmap = blueprint.roadmap

  return (
    <div className="p-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs font-mono text-indigo-400/60 uppercase tracking-widest mb-2">Sprint Planner</p>
        <h1 className="font-geist font-black text-white mb-1" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.03em' }}>Execution Plan</h1>
        <p className="font-inter text-white/40 text-sm">{roadmap?.totalSprints || 0} sprints · {roadmap?.sprintDuration || 0} weeks each · {(roadmap?.totalSprints || 0) * (roadmap?.sprintDuration || 0)} weeks total</p>
      </motion.div>

      {/* Milestones */}
      <motion.div className="glass-panel rounded-2xl p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
        <h3 className="font-geist font-semibold text-white text-sm mb-4 flex items-center gap-2"><Flag className="w-4 h-4 text-blue-400" /> Milestones</h3>
        <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
          {(roadmap?.milestones || []).map((m, i) => (
            <div key={i} className="glass rounded-xl px-5 py-4 min-w-[180px]">
              <div className="font-mono text-xs text-blue-400/60 mb-1">Sprint {m.sprint}</div>
              <div className="font-geist font-bold text-white text-sm mb-1">{m.name}</div>
              <div className="font-inter text-white/35 text-xs">{m.description}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Sprint cards */}
      <div className="space-y-6">
        {(roadmap?.sprints || []).map((sprint, i) => (
          <motion.div key={sprint.number} className="glass-panel rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 + 0.2 }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(59,130,246,0.1)', color: '#3B82F6' }}>Sprint {sprint.number}</span>
                  <h3 className="font-geist font-bold text-white">{sprint.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {(sprint?.goals || []).map((g) => (
                    <span key={g} className="text-xs text-white/35 font-inter">· {g}</span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="font-geist font-bold text-white/60">{sprint.estimatedDays}</div>
                <div className="text-white/25 font-mono text-xs">days</div>
              </div>
            </div>
            <div className="space-y-2">
              {(sprint?.tasks || []).map((task) => (
                <div key={task.id} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/3 transition-colors">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: taskTypeColor[task.type] }} />
                  <span className="font-inter text-white/60 text-sm flex-1">{task.title}</span>
                  <span className="font-mono text-white/25 text-xs">{task.assignee}</span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded" style={{ background: `${taskTypeColor[task.type]}15`, color: taskTypeColor[task.type] }}>
                    {task.points}pt
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
