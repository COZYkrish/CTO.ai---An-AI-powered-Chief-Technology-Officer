import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useUIStore } from '../../../stores/uiStore'
import BlurText from '../../../components/ui/BlurText'

export default function Scene07_NewReality() {
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { isAuthenticated } = useUIStore()
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.8], [0, 1, 1])
  const y = useTransform(scrollYProgress, [0.2, 0.4, 0.8], [50, 0, 0])

  return (
    <section ref={ref} className="min-h-[100vh] relative flex flex-col items-center justify-center px-6">
      
      <motion.div style={{ opacity, y }} className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-5xl md:text-7xl font-heading text-white mb-8 tracking-tight">
          <BlurText text="The New Reality" />
        </h2>
        
        <div className="space-y-6 text-2xl md:text-3xl text-white/90 font-body max-w-3xl mx-auto leading-relaxed mb-16">
          <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Stop managing complexity. Start commanding it.</p>
          <p>The era of the fragmented workflow is over. You no longer need to translate your vision into Jira tickets. You only need to speak your intent, and watch the infrastructure rise to meet it.</p>
          <p>Reclaim your bandwidth. Reclaim your vision.</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(isAuthenticated ? '/command-center' : '/register')}
          className="relative group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-white/10 border border-white/20 rounded-full overflow-hidden hover:bg-white/20"
        >
          <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-white"></span>
          <span className="relative">Initialize Your AI CTO</span>
        </motion.button>
      </motion.div>
    </section>
  )
}
