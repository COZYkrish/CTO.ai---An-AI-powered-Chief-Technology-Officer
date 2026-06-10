import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: '#050816' }}
    >
      {/* Aurora */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 60%)',
        }}
      />

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* 404 number */}
        <div
          className="font-geist font-black text-white mb-4 select-none"
          style={{
            fontSize: 'clamp(8rem, 20vw, 18rem)',
            letterSpacing: '-0.06em',
            lineHeight: 1,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          404
        </div>

        <p className="font-geist font-black text-white mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', letterSpacing: '-0.03em' }}>
          This page doesn't exist.<br />
          <span className="gradient-text-blue">Yet.</span>
        </p>

        <p className="font-inter text-white/35 text-sm mb-10 max-w-xs mx-auto">
          Even the best CTOs hit dead ends. The difference is knowing when to pivot.
        </p>

        <div className="flex gap-3 justify-center">
          <button onClick={() => navigate(-1)} className="btn-ghost py-2.5 px-6 text-sm">
            ← Go back
          </button>
          <button onClick={() => navigate('/')} className="btn-primary py-2.5 px-6 text-sm">
            Home
          </button>
        </div>
      </motion.div>
    </div>
  )
}
