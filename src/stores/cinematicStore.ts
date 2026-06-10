import { create } from 'zustand'
import type { SceneId, CTOCoreState } from '../types/cinematic'

interface CinematicStore {
  // Scroll state
  scrollProgress: number
  activeScene: SceneId
  
  // CTO Core state
  coreState: CTOCoreState
  coreIntensity: number // 0-1
  
  // Camera
  cameraProgress: number
  
  // Effects
  cursorX: number
  cursorY: number
  isReducedMotion: boolean
  
  // Actions
  setScrollProgress: (progress: number) => void
  setActiveScene: (scene: SceneId) => void
  setCoreState: (state: CTOCoreState) => void
  setCoreIntensity: (intensity: number) => void
  setCameraProgress: (progress: number) => void
  setCursor: (x: number, y: number) => void
}

export const useCinematicStore = create<CinematicStore>((set) => ({
  scrollProgress: 0,
  activeScene: 'scene01_idea',
  coreState: 'dormant',
  coreIntensity: 0.1,
  cameraProgress: 0,
  cursorX: 0,
  cursorY: 0,
  isReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,

  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setActiveScene: (scene) => set({ activeScene: scene }),
  setCoreState: (state) => set({ coreState: state }),
  setCoreIntensity: (intensity) => set({ coreIntensity: intensity }),
  setCameraProgress: (progress) => set({ cameraProgress: progress }),
  setCursor: (cursorX, cursorY) => set({ cursorX, cursorY }),
}))
