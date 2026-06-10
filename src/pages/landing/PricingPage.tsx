import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Check, Zap, Building2, Rocket } from 'lucide-react'

const plans = [
  {
    name: 'Founder',
    price: 0,
    period: 'forever',
    tagline: 'Start thinking like a CTO',
    icon: Zap,
    color: '#06B6D4',
    features: [
      '3 blueprints per month',
      'Requirements & architecture',
      'Basic database design',
      'Community support',
      'Export to Markdown',
    ],
    cta: 'Start free',
    featured: false,
  },
  {
    name: 'Builder',
    price: 49,
    period: 'month',
    tagline: 'Ship faster, build smarter',
    icon: Rocket,
    color: '#3B82F6',
    features: [
      'Unlimited blueprints',
      'Full 9-module blueprint suite',
      'React Flow architecture diagrams',
      'Cost simulation & roadmapping',
      'API spec generation',
      'Security threat analysis',
      'Export PDF, Markdown, JSON',
      'Priority support',
    ],
    cta: 'Start building',
    featured: true,
  },
  {
    name: 'CTO',
    price: 199,
    period: 'month',
    tagline: 'Enterprise-grade technical leadership',
    icon: Building2,
    color: '#8B5CF6',
    features: [
      'Everything in Builder',
      'Team collaboration (up to 10)',
      'Custom AI model fine-tuning',
      'Private blueprint library',
      'White-label reports',
      'SLA & dedicated support',
      'SSO & SAML',
      'Audit logs',
    ],
    cta: 'Contact sales',
    featured: false,
  },
]

export default function PricingPage() {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen relative flex flex-col"
      style={{ background: '#050816' }}
    >
      {/* Aurora */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -5%, rgba(59,130,246,0.12) 0%, transparent 60%)',
        }}
      />

      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 relative z-10">
        <button
          onClick={() => navigate('/')}
          className="font-geist font-black text-white text-lg tracking-tight"
        >
          CTO<span className="gradient-text-blue">.ai</span>
        </button>
        <div className="flex gap-3">
          <button onClick={() => navigate('/login')} className="btn-ghost py-2 px-5 text-sm">
            Sign In
          </button>
          <button onClick={() => navigate('/register')} className="btn-primary py-2 px-5 text-sm">
            Get Started
          </button>
        </div>
      </nav>

      {/* Header */}
      <div className="relative z-10 text-center pt-16 pb-20 px-6">
        <motion.p
          className="text-xs font-mono text-blue-400/60 uppercase tracking-widest mb-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        >
          Pricing
        </motion.p>
        <motion.h1
          className="font-geist font-black text-white mb-5"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', letterSpacing: '-0.04em', lineHeight: 1 }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        >
          Invest in your idea.<br />
          <span className="gradient-text-blue">Not in consultants.</span>
        </motion.h1>
        <motion.p
          className="font-inter text-white/40 text-lg max-w-xl mx-auto"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        >
          A senior CTO costs $250,000/year. CTO.ai gives you the same strategic clarity for a fraction of the price.
        </motion.p>
      </div>

      {/* Plans */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, i) => {
          const Icon = plan.icon
          return (
            <motion.div
              key={plan.name}
              className="glass-panel rounded-2xl p-8 flex flex-col relative"
              style={{
                border: plan.featured ? `1px solid ${plan.color}40` : undefined,
                boxShadow: plan.featured ? `0 0 80px ${plan.color}15` : undefined,
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 + 0.3 }}
            >
              {plan.featured && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-mono font-bold"
                  style={{ background: plan.color, color: '#050816' }}
                >
                  Most popular
                </div>
              )}

              {/* Icon + name */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${plan.color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color: plan.color }} />
                </div>
                <div>
                  <div className="font-geist font-bold text-white">{plan.name}</div>
                  <div className="text-white/30 font-inter text-xs">{plan.tagline}</div>
                </div>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="font-geist font-black text-white" style={{ fontSize: '3rem', letterSpacing: '-0.04em' }}>
                    {plan.price === 0 ? 'Free' : `$${plan.price}`}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-white/30 font-inter text-sm">/{plan.period}</span>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: plan.color }} />
                    <span className="font-inter text-white/55 text-sm">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => navigate(plan.price === 0 ? '/register' : '/register')}
                className={plan.featured ? 'btn-primary w-full text-center' : 'btn-ghost w-full text-center'}
                style={plan.featured ? { background: `linear-gradient(135deg, ${plan.color}, #6366F1)` } : {}}
              >
                {plan.cta}
              </button>
            </motion.div>
          )
        })}
      </div>

      {/* Bottom note */}
      <p className="text-center font-inter text-white/25 text-sm pb-12 relative z-10">
        All plans include a 14-day free trial. No credit card required.
      </p>
    </div>
  )
}
