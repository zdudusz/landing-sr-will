import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

// The page's background, fixed behind every section:
// 1. the Sr. Will lion as a large watermark that turns and grows a little with the scroll;
// 2. a pair of scissors that cuts along a dashed line across the screen as the page goes down,
//    its blades snipping open and shut, the line behind it gone.

type Pt = { x: number; y: number }

function pathPoint(t: number, w: number, h: number): Pt {
  // a slow S across the screen, from top left to bottom right
  const x = -0.08 * w + t * 1.16 * w
  const y = h * (0.18 + 0.64 * t) + Math.sin(t * Math.PI * 2) * h * 0.1
  return { x, y }
}

function Scissors({ open }: { open: number }) {
  // drawn pointing right, pivot at 0,0; `open` is the half angle between the blades
  return (
    <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <g transform={`rotate(${-open})`}>
        <path d="M-6 -3 L74 -3 Q80 0 74 2 L-6 3" fill="currentColor" fillOpacity="0.18" />
        <path d="M-6 0 L-26 -14" />
        <circle cx="-36" cy="-20" r="12" />
      </g>
      <g transform={`rotate(${open})`}>
        <path d="M-6 3 L74 3 Q80 0 74 -2 L-6 -3" fill="currentColor" fillOpacity="0.18" />
        <path d="M-6 0 L-26 14" />
        <circle cx="-36" cy="20" r="12" />
      </g>
      <circle cx="0" cy="0" r="3.5" fill="currentColor" />
    </g>
  )
}

export default function BackgroundFX() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.4 })

  const [size, setSize] = useState({ w: 1440, h: 900 })
  useEffect(() => {
    const on = () => setSize({ w: window.innerWidth, h: window.innerHeight })
    on()
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])

  // lion: a slow growth and drift over the whole page
  const lionScale = useTransform(p, [0, 1], [1, 1.18])
  const lionY = useTransform(p, [0, 1], ['4%', '-4%'])

  // scissors: position, heading and blade angle from the scroll
  const [state, setState] = useState({ t: 0 })
  useMotionValueEvent(p, 'change', v => setState({ t: v }))
  const t = reduce ? 0.35 : state.t
  const at = pathPoint(t, size.w, size.h)
  const ahead = pathPoint(Math.min(1, t + 0.002), size.w, size.h)
  const heading = (Math.atan2(ahead.y - at.y, ahead.x - at.x) * 180) / Math.PI
  const open = reduce ? 14 : 4 + Math.abs(Math.sin(t * Math.PI * 26)) * 20

  const d = useMemo(() => {
    const pts: string[] = []
    for (let i = 0; i <= 120; i++) {
      const q = pathPoint(i / 120, size.w, size.h)
      pts.push(`${i ? 'L' : 'M'}${q.x.toFixed(1)} ${q.y.toFixed(1)}`)
    }
    return pts.join(' ')
  }, [size.w, size.h])
  const scale = size.w < 768 ? 0.9 : 1.6

  return (
    <div className="bg-fx" aria-hidden="true">
      <motion.img
        src="img/leao.png"
        alt=""
        className="bg-fx__lion"
        style={reduce ? undefined : { scale: lionScale, y: lionY }}
      />
      <svg className="bg-fx__cut" width={size.w} height={size.h} viewBox={`0 0 ${size.w} ${size.h}`}>
        {/* the line still to cut */}
        <path d={d} pathLength={1} fill="none" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.5" strokeDasharray="0.006 0.006" />
        {/* the part already cut: the ground shows through */}
        <path d={d} pathLength={1} fill="none" stroke="#000" strokeWidth="4" strokeDasharray={`${t} 1`} />
        <g transform={`translate(${at.x} ${at.y}) rotate(${heading}) scale(${scale})`} className="bg-fx__scissors">
          <Scissors open={open} />
        </g>
      </svg>
    </div>
  )
}
