import { useRef, useEffect, useCallback } from 'react'

const FADE_MS = 500
const FADE_OUT_LEAD = 0.55

interface FadingVideoProps {
  src: string
  className?: string
  style?: React.CSSProperties
}

export default function FadingVideo({ src, className = '', style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const rafRef = useRef<number | null>(null)
  const fadingOutRef = useRef(false)

  const fadeTo = useCallback((target: number, duration: number) => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)

    const video = videoRef.current
    if (!video) return

    const startOpacity = parseFloat(video.style.opacity || '0')
    const startTime = performance.now()

    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const current = startOpacity + (target - startOpacity) * progress
      video.style.opacity = String(current)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        rafRef.current = null
      }
    }

    rafRef.current = requestAnimationFrame(step)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.style.opacity = '0'

    const onLoadedData = () => {
      video.style.opacity = '0'
      fadingOutRef.current = false
      video.play().catch(() => {})
      fadeTo(1, FADE_MS)
    }

    const onTimeUpdate = () => {
      if (!fadingOutRef.current && video.duration > 0) {
        const remaining = video.duration - video.currentTime
        if (remaining <= FADE_OUT_LEAD && remaining > 0) {
          fadingOutRef.current = true
          fadeTo(0, FADE_MS)
        }
      }
    }

    const onEnded = () => {
      video.style.opacity = '0'
      setTimeout(() => {
        video.currentTime = 0
        fadingOutRef.current = false
        video.play().catch(() => {})
        fadeTo(1, FADE_MS)
      }, 100)
    }

    video.addEventListener('loadeddata', onLoadedData)
    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('ended', onEnded)

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      video.removeEventListener('loadeddata', onLoadedData)
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('ended', onEnded)
    }
  }, [fadeTo])

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      playsInline
      preload="auto"
      className={className}
      style={{ opacity: 0, ...style }}
    />
  )
}
