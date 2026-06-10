import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface NeuralFieldProps {
  className?: string
  density?: number
}

export default function NeuralField({ className = '', density = 800 }: NeuralFieldProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return
    const container = mountRef.current
    const w = container.clientWidth
    const h = container.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)
    camera.position.z = 30

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(1)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Background star field
    const positions = new Float32Array(density * 3)
    const colorsArr = new Float32Array(density * 3)
    const palette = [
      new THREE.Color('#3B82F6'),
      new THREE.Color('#06B6D4'),
      new THREE.Color('#8B5CF6'),
      new THREE.Color('#ffffff'),
    ]

    for (let i = 0; i < density; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 100
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100
      const c = palette[Math.floor(Math.random() * palette.length)]
      colorsArr[i * 3]     = c.r
      colorsArr[i * 3 + 1] = c.g
      colorsArr[i * 3 + 2] = c.b
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colorsArr, 3))

    const mat = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const stars = new THREE.Points(geo, mat)
    scene.add(stars)

    let frame = 0
    function animate() {
      frame = requestAnimationFrame(animate)
      stars.rotation.y += 0.00015
      stars.rotation.x += 0.00008
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const w2 = container.clientWidth
      const h2 = container.clientHeight
      camera.aspect = w2 / h2
      camera.updateProjectionMatrix()
      renderer.setSize(w2, h2)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [density])

  return <div ref={mountRef} className={`w-full h-full ${className}`} />
}
