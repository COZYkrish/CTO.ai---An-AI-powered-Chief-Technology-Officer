import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import BlurText from '../../../components/ui/BlurText'

export default function Scene02_Fragmentation() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0])
  const y = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [50, 0, -50])
  
  // Subtle parallax for tech stack "floating" effect
  const yReact = useTransform(scrollYProgress, [0, 1], [-100, 100])
  const yNode = useTransform(scrollYProgress, [0, 1], [150, -100])
  const yAWS = useTransform(scrollYProgress, [0, 1], [-50, 150])

  return (
    <section ref={ref} className="min-h-[150vh] relative flex flex-col items-center justify-center px-6 overflow-hidden">
      
      {/* Abstract floating tech labels */}
      <div className="absolute inset-0 pointer-events-none opacity-20 font-mono text-3xl font-bold">
        <motion.div style={{ y: yReact }} className="absolute top-[20%] left-[10%] text-blue-400">REACT_APP</motion.div>
        <motion.div style={{ y: yNode }} className="absolute top-[60%] right-[15%] text-green-400">NODE_ENV</motion.div>
        <motion.div style={{ y: yAWS }} className="absolute top-[80%] left-[20%] text-orange-400">AWS_LAMBDA</motion.div>
      </div>

      <motion.div style={{ opacity, y }} className="max-w-4xl mx-auto text-center relative z-10 p-10 backdrop-blur-md bg-black/40 border border-white/10 rounded-3xl">
        <h2 className="text-4xl md:text-5xl font-heading text-red-400 mb-8 tracking-tight">
          <BlurText text="The Fragmentation" />
        </h2>
        
        <div className="space-y-6 text-xl md:text-2xl text-white/80 font-body max-w-3xl mx-auto leading-relaxed">
          <p>Modern development is shattered into a thousand pieces.</p>
          <p>Your context is scattered across Jira boards, Slack channels, GitHub issues, and fragmented documentation. You hire engineers, but they need direction. You choose a tech stack, but it requires maintenance. You design an architecture, but it rots the moment code is written.</p>
          <p>The tools that were supposed to make you faster have only created a labyrinth of context switching. Your vision is being diluted by the sheer friction of execution.</p>
        </div>
      </motion.div>
    </section>
  )
}
