import { useEffect, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCinematicStore } from '../../stores/cinematicStore'
import { useUIStore } from '../../stores/uiStore'
import { ReactLenis, useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CursorSpotlight from '../../components/layout/CursorSpotlight'

import Section01_Manifesto from './sections/Section01_Manifesto'
import Section02_Reality from './sections/Section02_Reality'
import Section03_Cost from './sections/Section03_Cost'
import Section05_MeetCTO from './sections/Section05_MeetCTO'
import Section09_RealityCards from './sections/Section09_RealityCards'
import Section12_FinalCTA from './sections/Section12_FinalCTA'

gsap.registerPlugin(ScrollTrigger)

// Cinematic Elements
import FilmGrain from '@/components/cinematic/FilmGrain'
import AmbientDust from '@/components/cinematic/AmbientDust'
import MagneticElement from '@/components/cinematic/MagneticElement'
import FadingVideo from '@/components/ui/FadingVideo'

const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4'

export default function LandingPage() {
  const setCursor = useCinematicStore((s) => s.setCursor)
  const navigate = useNavigate()
  const isAuthenticated = useUIStore((s) => s.isAuthenticated)

  useEffect(() => {
    // Refresh ScrollTrigger once the page loads to ensure accurate pin spacing
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)

    const onMove = (e: MouseEvent) => {
      setCursor(
        (e.clientX / window.innerWidth - 0.5) * 2,
        (e.clientY / window.innerHeight - 0.5) * 2
      )
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [setCursor])

  const navLinks = [
    { label: 'Manifesto', id: 'manifesto' },
    { label: 'Platform', id: 'platform' }
  ]

  const scrollTo = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <ReactLenis root options={{ lerp: 0.05 }}>
      <div className="relative bg-transparent text-white w-full">
        <FilmGrain />
        <AmbientDust />
        <CursorSpotlight />

        {/* ── Sticky Editorial Navbar ── */}
        <motion.nav
          className="fixed top-8 left-0 right-0 z-50 px-8 lg:px-16 mix-blend-difference"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <MagneticElement intensity={0.2}>
              <div className="text-white font-bebas text-3xl tracking-widest cursor-pointer" onClick={() => scrollTo('top')}>
                CTO.ai
              </div>
            </MagneticElement>

            {/* Center nav links */}
            <div className="hidden md:flex items-center gap-12">
              {navLinks.map((link) => (
                <MagneticElement key={link.id} intensity={0.3}>
                  <span
                    onClick={() => scrollTo(link.id)}
                    className="text-sm font-medium text-white/70 font-inter cursor-pointer hover:text-white uppercase tracking-widest transition-colors"
                  >
                    {link.label}
                  </span>
                </MagneticElement>
              ))}
            </div>

            {/* Right Action */}
            <MagneticElement intensity={0.3}>
              <button
                onClick={() => navigate(isAuthenticated ? '/command-center' : '/login')}
                className="text-sm font-bold text-white font-inter cursor-pointer hover:text-red-400 uppercase tracking-widest transition-colors"
              >
                Launch CTO.ai
              </button>
            </MagneticElement>
          </div>
        </motion.nav>

        {/* ── Fixed Background Videos ── */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-black">
          <FadingVideo
            src={HERO_VIDEO}
            className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top opacity-100"
            style={{ width: '120%', height: '120%' }}
          />
        </div>

        {/* ── Cinematic Manifesto Sections ── */}
        <div className="relative z-10">
          <Section01_Manifesto />
          <Section02_Reality />
          <Section03_Cost />
          <Section05_MeetCTO />
          <Section09_RealityCards />
          <Section12_FinalCTA />
        </div>
      </div>
    </ReactLenis>
  )
}
