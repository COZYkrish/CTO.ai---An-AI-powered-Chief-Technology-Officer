import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import BlurText from '../../../components/ui/BlurText'

export default function Scene03_BreakingPoint() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Sharp transition for the dramatic pause
  const opacity = useTransform(scrollYProgress, [0.3, 0.45, 0.55, 0.7], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.95, 1, 1.05])

  return (
    <section ref={ref} className="min-h-[150vh] relative flex flex-col items-center justify-center px-6">
      
      {/* This scene fades to pure black background using CSS/Tailwind mixed with framer-motion in the LandingPage, or we can add a local dark overlay */}
      <motion.div style={{ opacity }} className="absolute inset-0 bg-black z-0" />

      <motion.div style={{ opacity, scale }} className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-heading text-white/50 mb-12 tracking-[0.2em] uppercase text-sm">
          <BlurText text="The Breaking Point" />
        </h2>
        
        <div className="space-y-8 text-2xl md:text-4xl text-white font-heading font-light max-w-3xl mx-auto leading-snug">
          <p>There is a limit to human bandwidth.</p>
          <p className="text-white/70">At some point, you stop being a visionary, and you become a bottleneck.</p>
          <p className="text-white/40 text-xl md:text-2xl mt-12">What if you didn't have to choose between writing code and steering the ship? What if the friction between "idea" and "infrastructure" could be reduced to zero?</p>
        </div>
      </motion.div>
    </section>
  )
}
