import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBlueprintStore } from '../../stores/blueprintStore'
import EmptyBlueprintState from '../../components/ui/EmptyBlueprintState'
import { Send, Cpu, User } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const MOCK_RESPONSES: Record<string, string> = {
  default: "Based on your project's architecture, I recommend focusing on the API gateway configuration first. The microservices pattern you've chosen will scale well, but you'll want to ensure your rate limiting is in place before going to production.",
  architecture: "Your system uses a Microservices with API Gateway pattern. The key benefit is independent scaling — your AI coaching service can scale horizontally during peak usage while the auth service remains lean. I'd suggest starting with 2 EC2 instances behind the load balancer and auto-scaling from there.",
  database: "Your database schema looks solid. The TimescaleDB choice for business metrics is excellent — time-series queries will be much faster than standard PostgreSQL. Make sure to set up hypertable partitioning on the events table from day one.",
  security: "Your security score is 87/100. The main gap is threat modeling — I recommend a 2-hour architecture review session before launch. The OWASP A04 (Insecure Design) check is the one that needs attention. Want me to outline what that session should cover?",
  cost: "At your current architecture, you're looking at $1,215/month at 10k users. The biggest cost lever is the AI inference workers — switching to spot instances for non-real-time requests could save ~35%. I can generate a cost optimization plan if you'd like.",
}

function getResponse(question: string): string {
  const q = question.toLowerCase()
  if (q.includes('architect')) return MOCK_RESPONSES.architecture
  if (q.includes('database') || q.includes('schema')) return MOCK_RESPONSES.database
  if (q.includes('security') || q.includes('owasp')) return MOCK_RESPONSES.security
  if (q.includes('cost') || q.includes('price') || q.includes('money')) return MOCK_RESPONSES.cost
  return MOCK_RESPONSES.default
}

export default function CTOIntelligence() {
  const project = useBlueprintStore((s) => s.getActiveProject())
  const blueprint = project?.blueprint
  const projectName = project?.name ?? 'Nexus AI Platform'
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: `I'm your CTO Intelligence, fully loaded with context for **${projectName}**. I have access to your architecture decisions, database schema, security analysis, cost projections, and sprint roadmap.\n\nWhat do you want to think through?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input, timestamp: new Date() }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setIsTyping(true)
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 800))
    const response = getResponse(input)
    const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response, timestamp: new Date() }
    setMessages((m) => [...m, assistantMsg])
    setIsTyping(false)
  }

  const suggestions = ['How should I scale the architecture?', 'What are the biggest security risks?', 'How much will this cost at 50k users?', 'Explain the database schema choices.']

  if (!blueprint) {
    return <EmptyBlueprintState title="CTO Intelligence" />
  }

  return (
    <div className="flex flex-col h-full" style={{ maxHeight: 'calc(100vh - 73px)' }}>
      {/* Header */}
      <div className="px-8 py-5 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <p className="text-xs font-mono text-purple-400/60 uppercase tracking-widest mb-1">CTO Intelligence</p>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <h1 className="font-geist font-bold text-white">AI CTO Chat</h1>
          <span className="text-white/30 font-inter text-sm">· Loaded with {projectName} context</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto px-8 py-6 space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: msg.role === 'assistant' ? 'rgba(59,130,246,0.15)' : 'rgba(139,92,246,0.15)' }}
            >
              {msg.role === 'assistant' ? <Cpu className="w-4 h-4 text-blue-400" /> : <User className="w-4 h-4 text-purple-400" />}
            </div>
            <div
              className="glass-panel rounded-2xl px-5 py-4 max-w-2xl"
              style={{ borderColor: msg.role === 'assistant' ? 'rgba(59,130,246,0.1)' : 'rgba(139,92,246,0.1)' }}
            >
              <p className="font-inter text-white/70 text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              <p className="mt-2 font-mono text-white/20 text-xs">{msg.timestamp.toLocaleTimeString()}</p>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div className="flex gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(59,130,246,0.15)' }}>
              <Cpu className="w-4 h-4 text-blue-400" />
            </div>
            <div className="glass-panel rounded-2xl px-5 py-4 flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-400"
                  style={{ animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite` }} />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length < 3 && (
        <div className="px-8 pb-4 flex flex-wrap gap-2 flex-shrink-0">
          {suggestions.map((s) => (
            <button key={s} onClick={() => setInput(s)}
              className="px-4 py-2 rounded-full text-xs font-inter transition-all glass hover:bg-white/8"
              style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-8 pb-6 flex-shrink-0">
        <div className="flex gap-3">
          <input
            id="cto-chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about your architecture, costs, security..."
            className="flex-1 glass rounded-xl px-5 py-3.5 font-inter text-sm text-white placeholder-white/20 outline-none"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            className="btn-primary px-5 disabled:opacity-30 flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
