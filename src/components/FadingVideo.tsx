import { useEffect, useRef, useState, type CSSProperties } from 'react'

type Props = { src: string | string[]; className?: string; style?: CSSProperties; poster?: string }

const FADE_IN = 500
const FADE_OUT = 550

// A muted background video that fades in on load, fades out before its end and loops (or cycles a list).
export default function FadingVideo({ src, className, style, poster }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const list = Array.isArray(src) ? src : [src]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    let raf = 0
    let fadingOut = false

    const fade = (from: number, to: number, ms: number) => {
      cancelAnimationFrame(raf)
      const start = performance.now()
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / ms)
        v.style.opacity = String(from + (to - from) * t)
        if (t < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }

    const onLoaded = () => { fadingOut = false; fade(0, 1, FADE_IN) }
    const onTime = () => {
      if (!fadingOut && v.duration && v.duration - v.currentTime <= FADE_OUT / 1000) {
        fadingOut = true
        fade(Number(v.style.opacity || 1), 0, FADE_OUT)
      }
    }
    const onEnded = () => {
      if (list.length > 1) { setIndex(i => (i + 1) % list.length); return }
      v.currentTime = 0
      void v.play()
      fadingOut = false
      fade(0, 1, FADE_IN)
    }

    v.style.opacity = '0'
    v.addEventListener('loadeddata', onLoaded)
    v.addEventListener('timeupdate', onTime)
    v.addEventListener('ended', onEnded)
    return () => {
      cancelAnimationFrame(raf)
      v.removeEventListener('loadeddata', onLoaded)
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('ended', onEnded)
    }
  }, [list.length, index])

  return (
    <video
      ref={ref}
      key={list[index]}
      className={className}
      style={{ opacity: 0, ...style }}
      src={list[index]}
      poster={poster}
      autoPlay
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  )
}
