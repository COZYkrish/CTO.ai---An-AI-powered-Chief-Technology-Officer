import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Section12_FinalCTA() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen w-full bg-transparent flex flex-col items-center justify-center overflow-hidden px-8">
      <div className="max-w-5xl flex flex-col items-center">
        <h2 className="text-massive-2 text-white mb-6">LET'S BUILD</h2>
        <h2 className="text-massive-2 gradient-text-red mb-12">SOMETHING REAL.</h2>
        
        <p className="text-editorial text-white/60 mb-16">
          The AI Chief Technology Officer.
        </p>

        <button 
          onClick={() => navigate('/command-center')}
          className="group relative inline-flex items-center justify-center px-12 py-6 font-bebas text-3xl tracking-wide text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:border-white/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]"
        >
          <span className="relative z-10 flex items-center gap-4">
            GENERATE BLUEPRINT <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-300" />
          </span>
        </button>
      </div>
    </section>
  )
}
