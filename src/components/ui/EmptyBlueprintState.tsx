import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'

interface EmptyBlueprintStateProps {
  title: string
}

export default function EmptyBlueprintState({ title }: EmptyBlueprintStateProps) {
  const navigate = useNavigate()

  return (
    <div className="p-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs font-mono text-cyan-400/60 uppercase tracking-widest mb-2">{title}</p>
        <h1 className="font-geist font-black text-white mb-1" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '-0.03em' }}>
          No Active Blueprint
        </h1>
        <p className="font-inter text-white/40 text-sm">Initialize a system to generate engineering artifacts.</p>
      </motion.div>

      <motion.div
        className="glass-panel rounded-2xl p-10 text-center mt-12"
        style={{ border: '1px dashed rgba(59,130,246,0.2)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
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
    </div>
  )
}
