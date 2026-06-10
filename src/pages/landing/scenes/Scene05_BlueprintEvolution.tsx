import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCinematicStore } from '../../../stores/cinematicStore'
import { CheckCircle2, Loader2 } from 'lucide-react'

const generationSteps = [
  {
    id: 1, label: 'Analyzing requirements', icon: '📋',
    output: ['AI coaching personalization', 'Real-time workout tracking', 'Progress analytics', 'Social features', 'Nutrition integration'],
    color: '#3B82F6',
  },
  {
    id: 2, label: 'Generating user stories', icon: '👤',
    output: ['As a user, I want AI-generated workout plans...', 'As a coach, I want to monitor all clients...', 'As a user, I want to log via voice commands...'],
    color: '#06B6D4',
  },
  {
    id: 3, label: 'Designing architecture', icon: '🏗️',
    output: ['API Gateway → Microservices', 'Auth Service · User Service · AI Engine', 'Redis Cache · RabbitMQ Queue', 'PostgreSQL + TimescaleDB'],
    color: '#8B5CF6',
  },
  {
    id: 4, label: 'Creating database schema', icon: '🗄️',
    output: ['users (UUID, email, profile, goals)', 'workout_sessions (id, user_id, metrics)', 'ai_recommendations (id, type, content)', '12 indexes optimized for read performance'],
    color: '#6366F1',
  },
  {
    id: 5, label: 'Planning API endpoints', icon: '🔌',
    output: ['POST /auth/login', 'GET /ai/workout-plan', 'POST /workouts/sessions', 'GET /analytics/progress'],
    color: '#3B82F6',
  },
  {
    id: 6, label: 'Estimating infrastructure', icon: '☁️',
    output: ['AWS · EC2 Auto Scaling · RDS Multi-AZ', '100 users: $180/mo', '10k users: $1,215/mo', '100k users: $4,800/mo'],
    color: '#06B6D4',
  },
  {
    id: 7, label: 'Building sprint roadmap', icon: '🗓️',
    output: ['Sprint 1: Foundation + Auth', 'Sprint 2: Core features + AI', 'Sprint 4: MVP launch', 'Sprint 8: Scale ready'],
    color: '#8B5CF6',
  },
  {
    id: 8, label: 'Generating documentation', icon: '📄',
    output: ['Product Requirements Document', 'System Requirements Spec', 'API Documentation', 'Deployment Guide'],
    color: '#6366F1',
  },
]

export default function Scene05_BlueprintEvolution() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: '-10%' })
  const setCoreState = useCinematicStore((s) => s.setCoreState)
  const [activeStep, setActiveStep] = useState(-1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (isInView) {
      setCoreState('working')
      // Auto-advance steps
      setActiveStep(0)
    } else {
      setActiveStep(-1)
      setCompletedSteps([])
    }
  }, [isInView, setCoreState])

  useEffect(() => {
    if (activeStep < 0 || activeStep >= generationSteps.length) return
    timerRef.current = setTimeout(() => {
      setCompletedSteps((prev) => [...prev, activeStep])
      if (activeStep < generationSteps.length - 1) {
        setActiveStep((s) => s + 1)
      }
    }, 1600)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [activeStep])

  return (
    <section
      ref={ref}
      className="min-h-screen relative py-32"
      style={{ background: 'linear-gradient(180deg, #050816 0%, #0A0F1F 50%, #050816 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(59,130,246,0.06) 0%, transparent 60%)' }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* The idea */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-mono tracking-[0.4em] text-blue-400/60 uppercase block mb-6">
            Watch CTO.ai think
          </span>
          <div className="glass-panel rounded-2xl px-8 py-6 inline-block">
            <p className="text-white/40 text-sm font-inter mb-2 uppercase tracking-widest">The idea</p>
            <p
              className="font-geist font-bold gradient-text-blue"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}
            >
              "Build a fitness platform with AI coaching."
            </p>
          </div>
        </motion.div>

        {/* Generation steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {generationSteps.map((step, i) => {
            const isCompleted = completedSteps.includes(i)
            const isCurrent = activeStep === i
            const isVisible = isCompleted || isCurrent

            return (
              <motion.div
                key={step.id}
                className="glass-panel rounded-2xl p-6 relative overflow-hidden"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Active glow */}
                {isCurrent && (
                  <div
                    className="absolute inset-0 pointer-events-none rounded-2xl"
                    style={{
                      border: `1px solid ${step.color}30`,
                      boxShadow: `0 0 30px ${step.color}15`,
                    }}
                  />
                )}

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: `${step.color}15` }}
                  >
                    {step.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-geist font-semibold text-white/80 text-sm">
                        {step.label}
                      </span>
                      {isCurrent && (
                        <Loader2 className="w-4 h-4 text-blue-400 animate-spin flex-shrink-0" />
                      )}
                      {isCompleted && (
                        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                      )}
                    </div>

                    {/* Output lines */}
                    <div className="space-y-1.5">
                      {step.output.map((line, li) => (
                        <motion.div
                          key={li}
                          className="text-xs font-mono flex items-center gap-2"
                          style={{ color: 'rgba(255,255,255,0.4)' }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isVisible ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: li * 0.1 + 0.2, duration: 0.5 }}
                        >
                          <span style={{ color: step.color, opacity: 0.7 }}>›</span>
                          {line}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                {isCurrent && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 rounded-full"
                    style={{ background: `linear-gradient(90deg, ${step.color}, transparent)` }}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5, ease: 'linear' }}
                  />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Completion message */}
        {completedSteps.length === generationSteps.length && (
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass-panel rounded-2xl p-10 inline-block">
              <p className="text-xs font-mono tracking-[0.4em] text-green-400/70 uppercase mb-4">Blueprint Complete</p>
              <h3
                className="font-geist font-black gradient-text-full"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}
              >
                From idea to blueprint
                <br />
                in minutes.
              </h3>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
