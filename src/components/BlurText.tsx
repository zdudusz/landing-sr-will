import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type ElementType } from 'react'
import { PRERENDER } from '../env'

type Props = { text: string; className?: string; as?: ElementType; id?: string; delay?: number; align?: 'center' | 'left' }

// Word-by-word blur-in, started when the line enters the viewport (once).
export default function BlurText({ text, className, as: Tag = 'p', id, delay = 0, align = 'center' }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  const reduce = useReducedMotion() || PRERENDER

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect() }
    }, { threshold: 0.1 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const words = text.split(' ')
  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: align === 'left' ? 'flex-start' : 'center', rowGap: '0.1em' }}
    >
      {words.flatMap((w, i) => [
        i > 0 ? ' ' : null,
        <motion.span
          key={i}
          style={{ display: 'inline-block', marginRight: i < words.length - 1 ? '0.28em' : 0 }}
          initial={reduce ? false : { filter: 'blur(10px)', opacity: 0, y: 50 }}
          animate={inView || reduce ? { filter: 'blur(0px)', opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: delay + i * 0.1, ease: 'easeOut' }}
        >
          {w}
        </motion.span>,
      ])}
    </Tag>
  )
}
