import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useCinematicStore } from '../../stores/cinematicStore'
import type { CTOCoreState } from '../../types/cinematic'

const STATE_CONFIGS: Record<CTOCoreState, {
  particleCount: number
  radius: number
  speed: number
  opacity: number
  color1: THREE.Color
  color2: THREE.Color
}> = {
  dormant:    { particleCount: 800,  radius: 1.2, speed: 0.0003, opacity: 0.15, color1: new THREE.Color('#1e3a5f'), color2: new THREE.Color('#0a1628') },
  disturbed:  { particleCount: 1200, radius: 2.5, speed: 0.002,  opacity: 0.4,  color1: new THREE.Color('#3B82F6'), color2: new THREE.Color('#dc2626') },
  still:      { particleCount: 600,  radius: 1.0, speed: 0.0001, opacity: 0.1,  color1: new THREE.Color('#1e3a5f'), color2: new THREE.Color('#050816') },
  activating: { particleCount: 2000, radius: 3.0, speed: 0.005,  opacity: 0.9,  color1: new THREE.Color('#3B82F6'), color2: new THREE.Color('#8B5CF6') },
  working:    { particleCount: 2500, radius: 2.5, speed: 0.003,  opacity: 0.8,  color1: new THREE.Color('#06B6D4'), color2: new THREE.Color('#3B82F6') },
  networked:  { particleCount: 3000, radius: 3.5, speed: 0.004,  opacity: 0.85, color1: new THREE.Color('#8B5CF6'), color2: new THREE.Color('#06B6D4') },
  architecting:{ particleCount: 2800, radius: 3.2, speed: 0.0035, opacity: 0.8, color1: new THREE.Color('#6366F1'), color2: new THREE.Color('#3B82F6') },
  evolved:    { particleCount: 4000, radius: 4.0, speed: 0.006,  opacity: 1.0,  color1: new THREE.Color('#06B6D4'), color2: new THREE.Color('#8B5CF6') },
}

interface CTOCoreProps {
  className?: string
}

export default function CTOCore({ className = '' }: CTOCoreProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const animFrameRef = useRef<number>(0)
  const coreState = useCinematicStore((s) => s.coreState)
  const cursorX = useCinematicStore((s) => s.cursorX)
  const cursorY = useCinematicStore((s) => s.cursorY)

  useEffect(() => {
    if (!mountRef.current) return
    const container = mountRef.current
    const w = container.clientWidth
    const h = container.clientHeight

    // Scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100)
    camera.position.set(0, 0, 8)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Build initial particles
    buildParticles(scene, STATE_CONFIGS.dormant)

    // Animation loop
    let t = 0
    function animate() {
      animFrameRef.current = requestAnimationFrame(animate)
      t += 0.01

      if (particlesRef.current) {
        particlesRef.current.rotation.y += STATE_CONFIGS[coreState]?.speed ?? 0.0003
        particlesRef.current.rotation.x = Math.sin(t * 0.3) * 0.1
      }

      // Subtle camera parallax from cursor
      camera.position.x += (cursorX * 1.5 - camera.position.x) * 0.02
      camera.position.y += (-cursorY * 1.5 - camera.position.y) * 0.02
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    animate()

    // Resize
    const onResize = () => {
      const w2 = container.clientWidth
      const h2 = container.clientHeight
      camera.aspect = w2 / h2
      camera.updateProjectionMatrix()
      renderer.setSize(w2, h2)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update particles when core state changes
  useEffect(() => {
    if (!sceneRef.current) return
    buildParticles(sceneRef.current, STATE_CONFIGS[coreState])
  }, [coreState])

  function buildParticles(scene: THREE.Scene, config: typeof STATE_CONFIGS.dormant) {
    // Remove old
    if (particlesRef.current) {
      scene.remove(particlesRef.current)
      particlesRef.current.geometry.dispose()
    }

    const count = config.particleCount
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Spherical distribution
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = config.radius * (0.3 + Math.random() * 0.7)

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      // Lerp between two colors based on distance from center
      const t = Math.random()
      const c = config.color1.clone().lerp(config.color2, t)
      colors[i * 3]     = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b

      sizes[i] = Math.random() * 3 + 1
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: config.opacity,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const points = new THREE.Points(geometry, material)
    particlesRef.current = points
    scene.add(points)
  }

  return <div ref={mountRef} className={`w-full h-full ${className}`} />
}
