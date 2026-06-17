import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useBlueprintStore } from '../../stores/blueprintStore'
import { generateBlueprint } from '../../lib/gemini'
import { GENERATION_STEPS } from '../../lib/mock/mockData'
import { CheckCircle, Loader2, ArrowRight, Sparkles } from 'lucide-react'
import BlueprintExplosion from '../../components/cinematic/BlueprintExplosion'

const wizardSteps = ['Idea', 'Details', 'Generate', 'Complete']

interface WizardStep {
  id: string
  label: string
  agentId: string
  delay: number
  status: 'pending' | 'running' | 'complete'
}

export default function InitializeSystem() {
  const navigate = useNavigate()
  const { addProject, updateGenerationStep, setIsGenerating, setGenerationSteps, setBlueprint } = useBlueprintStore()
  const [wizardStep, setWizardStep] = useState(0)
  const [idea, setIdea] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')
  const [currentStepLabel, setCurrentStepLabel] = useState('')
  const [steps, setSteps] = useState<WizardStep[]>(GENERATION_STEPS.map(s => ({ ...s, status: 'pending' as const })))
  const [projectId, setProjectId] = useState('')
  const [showExplosion, setShowExplosion] = useState(false)
  const [completedProjectName, setCompletedProjectName] = useState('')

  const handleGenerate = async () => {
    setGenerating(true)
    setWizardStep(2)

    const id = Date.now().toString()
    setProjectId(id)
    const project = {
      id,
      name: name || idea.slice(0, 40),
      description,
      idea,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'generating' as const,
      complexity: 7,
      readiness: 0,
      techStack: { frontend: [], backend: [], database: [], infrastructure: [], security: [] },
      blueprint: null,
    }
    addProject(project)

    const stepsCopy = GENERATION_STEPS.map(s => ({ ...s, status: 'pending' as const }))
    setSteps(stepsCopy)
    setGenerationSteps(stepsCopy)
    setIsGenerating(true)

    try {
      let completedCount = 0
      const blueprint = await generateBlueprint(
        idea,
        (stepId) => {
          completedCount++
          setSteps((prev) => prev.map((s) => s.id === stepId ? { ...s, status: 'complete' as const } : s))
          updateGenerationStep(stepId, 'complete')
          const pct = Math.round((completedCount / GENERATION_STEPS.length) * 100)
          useBlueprintStore.getState().updateProject(id, { readiness: pct })
        },
        (msg) => setCurrentStepLabel(msg)
      )

      setBlueprint(id, blueprint)
      setIsGenerating(false)
      setGenerating(false)
      // Trigger the signature explosion moment
      setCompletedProjectName(name || idea.slice(0, 40))
      setShowExplosion(true)
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'An error occurred during AI generation. Please check your API key.')
      setIsGenerating(false)
      setGenerating(false)
      setWizardStep(1)
    }
  }

  return (
    <div className="p-8">
      <BlueprintExplosion
        isVisible={showExplosion}
        projectName={completedProjectName}
        onComplete={() => { setShowExplosion(false); setWizardStep(3) }}
      />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs font-mono text-purple-400/60 uppercase tracking-widest mb-2">Initialize System</p>
        <h1 className="font-geist font-black text-white mb-8" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '-0.03em' }}>
          What are you building?
        </h1>
      </motion.div>

      {/* Progress */}
      <div className="flex items-center gap-3 mb-10">
        {wizardSteps.map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono transition-all duration-500"
                style={{
                  background: i < wizardStep ? '#22c55e20' : i === wizardStep ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${i < wizardStep ? '#22c55e40' : i === wizardStep ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.1)'}`,
                  color: i < wizardStep ? '#22c55e' : i === wizardStep ? '#3B82F6' : 'rgba(255,255,255,0.2)',
                }}
              >
                {i < wizardStep ? '✓' : i + 1}
              </div>
              <span className="font-inter text-xs" style={{ color: i === wizardStep ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)' }}>{s}</span>
            </div>
            {i < wizardSteps.length - 1 && <div className="w-8 h-px" style={{ background: i < wizardStep ? '#22c55e30' : 'rgba(255,255,255,0.08)' }} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 0: Idea */}
        {wizardStep === 0 && (
          <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-2xl">
            <div className="glass-panel rounded-2xl p-8">
              <label className="block font-inter text-white/50 text-xs uppercase tracking-wider mb-3">Your idea</label>
              <textarea
                id="idea-input"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="e.g. Build a SaaS platform with AI forecasting and team collaboration features..."
                rows={5}
                className="w-full glass rounded-xl px-5 py-4 font-inter text-white placeholder-white/20 outline-none resize-none text-base leading-relaxed"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              />
              <p className="mt-3 text-white/25 font-inter text-xs">Be as specific as you want. CTO.ai works better with more context.</p>
              <div className="mt-6 flex justify-end">
                <button onClick={() => idea.trim() && setWizardStep(1)} disabled={!idea.trim()} className="btn-primary flex items-center gap-2 disabled:opacity-30">
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 1: Details */}
        {wizardStep === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-2xl">
            <div className="glass-panel rounded-2xl p-8 space-y-6">
              <div>
                <label className="block font-inter text-white/50 text-xs uppercase tracking-wider mb-3">System name (optional)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Nexus AI Platform"
                  className="w-full glass rounded-xl px-5 py-3 font-inter text-white placeholder-white/20 outline-none"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                />
              </div>
              <div>
                <label className="block font-inter text-white/50 text-xs uppercase tracking-wider mb-3">Additional context (optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Target audience, scale expectations, budget constraints, preferred tech stack..."
                  rows={3}
                  className="w-full glass rounded-xl px-5 py-3 font-inter text-white placeholder-white/20 outline-none resize-none"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                />
              </div>
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-inter text-sm">
                  {error}
                </div>
              )}
              <div className="flex justify-between">
                <button onClick={() => setWizardStep(0)} className="btn-ghost text-sm py-2.5 px-5">← Back</button>
                <button onClick={handleGenerate} className="btn-primary flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Generate Blueprint
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Generating */}
        {wizardStep === 2 && (
          <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
            <div className="glass-panel rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                <span className="font-geist font-semibold text-white">CTO.ai is architecting your system...</span>
              </div>
              {currentStepLabel && (
                <p className="text-blue-400/60 font-mono text-xs mb-6">{currentStepLabel}</p>
              )}
              <div className="space-y-3">
                {steps.map((s) => (
                  <div key={s.id} className="flex items-center gap-3">
                    {s.status === 'complete' ? (
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    ) : s.status === 'running' ? (
                      <Loader2 className="w-4 h-4 text-blue-400 animate-spin flex-shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-white/10 flex-shrink-0" />
                    )}
                    <span className="font-inter text-sm" style={{ color: s.status === 'complete' ? 'rgba(255,255,255,0.6)' : s.status === 'running' ? '#3B82F6' : 'rgba(255,255,255,0.2)' }}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Complete */}
        {wizardStep === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl">
            <div className="glass-panel rounded-2xl p-10 text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="font-geist font-black text-white text-2xl mb-2" style={{ letterSpacing: '-0.03em' }}>Blueprint Complete</h2>
              <p className="font-inter text-white/40 text-sm mb-8">Your complete engineering blueprint has been generated. All 9 artifacts are ready.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={() => navigate('/command-center/overview')} className="btn-primary">
                  View Blueprint →
                </button>
                <button onClick={() => { setWizardStep(0); setIdea(''); setName(''); setDescription('') }} className="btn-ghost">
                  New System
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
